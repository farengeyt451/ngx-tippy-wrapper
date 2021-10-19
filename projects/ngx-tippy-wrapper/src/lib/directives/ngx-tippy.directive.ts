import { isPlatformServer } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import tippy from 'tippy.js';
import { NgxTippyContent, NgxTippyInstance, NgxTippyProps, TippyHTMLElement, ViewRef } from '../interfaces';
import { NgxTippyService, NgxViewService } from '../services';
import { setTemplateVisible } from '../utils';

// Increasing integer for generating unique ids
let nextUniqueID: number = 0;

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit, OnDestroy {
  @Input() ngxTippy?: NgxTippyContent;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() tippyClassName?: string;

  private tippyInstance: NgxTippyInstance | undefined;
  private uniqueID: string = `tippy-${++nextUniqueID}`;
  private cachedInstances = new Map();

  constructor(
    private tippyEl: ElementRef,
    private renderer: Renderer2,
    private ngxTippyService: NgxTippyService,
    private ngxViewService: NgxViewService,
    @Inject(PLATFORM_ID) private platform: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    this.initTippy();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handleChanges(changes);
  }

  ngOnDestroy() {
    this.destroyTippy();
  }

  /**
   * Tooltip initialize
   * Content can be directly passed through `ngxTippy` selector
   */
  private initTippy() {
    const tippyTarget: TippyHTMLElement = this.tippyEl.nativeElement;

    if (this.ngxTippy === null || this.ngxTippy === undefined) return;

    const tippyName = this.tippyUniqueIdentifier;
    const viewRef = this.ngxViewService.getViewRefInstance(this.ngxTippy, tippyName);
    const tippyElement = viewRef.getElement();

    tippy(tippyTarget, { ...(this.tippyProps || {}), ...(tippyElement && { content: tippyElement }) });

    setTemplateVisible(tippyElement, this.renderer);
    this.setTippyInstance({ tippyTarget, tippyName, viewRef });
    this.setClassName(this.tippyInstance, this.tippyClassName);
    this.writeInstancesToStorage(this.tippyInstance, tippyName);
  }

  private setTippyInstance({
    tippyTarget,
    tippyName,
    viewRef,
  }: {
    tippyTarget: TippyHTMLElement;
    tippyName: string;
    viewRef: ViewRef;
  }) {
    this.tippyInstance = { ...tippyTarget._tippy, tippyName, viewRef };
  }

  private setClassName(tippyInstance: NgxTippyInstance | undefined, className: string | undefined) {
    if (!className || !tippyInstance) return;
    const classNames = className.split(' ');

    classNames.length &&
      classNames.forEach(className => {
        this.renderer.addClass(tippyInstance.popper.firstElementChild, className);
      });
  }

  /**
   * To manipulate tooltips, write all instances to storage
   * `tippyName` used as unique key
   * If `tippyName` does not provided - it will be generated using `tippyInstance.id`
   *
   * @param tippyInstance { NgxTippyInstance }
   */
  private writeInstancesToStorage(tippyInstance: NgxTippyInstance | undefined, tippyName: string) {
    tippyInstance && this.ngxTippyService.setInstance(tippyName, tippyInstance);
  }

  private handleChanges({ tippyName, ngxTippy, tippyProps, tippyClassName }: SimpleChanges) {
    tippyName && !tippyName.firstChange && this.handleNameChanges(tippyName);
    ngxTippy && !ngxTippy.firstChange && this.handleContentChanges(ngxTippy);
    tippyProps && !tippyProps.firstChange && this.handlePropsChanges(tippyProps);
    tippyClassName && !tippyClassName.firstChange && this.handleClassChanges(tippyClassName);
  }

  private handleNameChanges({ previousValue, currentValue }: SimpleChange) {
    const tippyInstances = this.cachedTippyInstances();
    if (!tippyInstances || !this.tippyInstance) return;

    this.deleteEntryInStorage(tippyInstances, previousValue);
    tippyInstances.set(currentValue, this.tippyInstance);
  }

  private handleContentChanges({ currentValue }: SimpleChange) {
    const tippyInstances = this.cachedTippyInstances();

    if (this.tippyInstance) {
      this.ngxTippyService.setContent(this.tippyUniqueIdentifier, currentValue);
    } else {
      this.initTippy();
    }

    if (tippyInstances && this.tippyInstance && currentValue === null) {
      this.clearInstance({ tippyInstance: this.tippyInstance, tippyInstances });
      this.resetIDCounter();
    }
  }

  private handlePropsChanges({ currentValue }: SimpleChange) {
    this.ngxTippyService.setProps(this.tippyUniqueIdentifier, currentValue);
  }

  private handleClassChanges({ currentValue }: SimpleChange) {
    this.setClassName(this.tippyInstance, currentValue);
  }

  private get tippyUniqueIdentifier(): string {
    return this.tippyName || this.uniqueID;
  }

  private cachedTippyInstances(): Map<string, NgxTippyInstance> | null {
    const tippyInstances = this.ngxTippyService.getInstances();

    if (this.cachedInstances.has(tippyInstances)) {
      return this.cachedInstances.get(tippyInstances);
    } else {
      this.cachedInstances.set(tippyInstances, tippyInstances);
      return tippyInstances;
    }
  }

  private destroyTippy() {
    const tippyInstances = this.cachedTippyInstances();
    const tippyInstance = this.tippyInstance;

    if (!tippyInstance || !tippyInstances) return;

    this.clearInstance({ tippyInstance, tippyInstances });
    this.resetIDCounter();
    this.resetLocalInstance();
    this.clearCachedInstances();
  }

  private clearInstance({
    tippyInstance,
    tippyInstances,
  }: {
    tippyInstance: NgxTippyInstance;
    tippyInstances: Map<string, NgxTippyInstance>;
  }) {
    const { tippyName } = tippyInstance;
    this.clearViewRef(tippyInstance);
    this.destroyTippyInstance(tippyInstance);
    this.deleteEntryInStorage(tippyInstances, tippyName);
  }

  private resetIDCounter() {
    nextUniqueID = 0;
  }

  private clearViewRef(tippyInstance: NgxTippyInstance) {
    tippyInstance.viewRef?.destroy();
  }

  private destroyTippyInstance(tippyInstance: NgxTippyInstance) {
    tippyInstance.destroy();
  }

  private deleteEntryInStorage(tippyInstances: Map<string, NgxTippyInstance>, tippyName: string) {
    tippyInstances.delete(tippyName);
  }

  private resetLocalInstance() {
    this.tippyInstance = undefined;
  }

  private clearCachedInstances() {
    this.cachedInstances.clear();
  }
}
