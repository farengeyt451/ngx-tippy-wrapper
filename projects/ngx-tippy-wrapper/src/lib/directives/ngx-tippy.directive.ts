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
  SimpleChanges,
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

    const tippyName = this.tippyName || this.uniqueID;
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
    this.resetLocalInstance();
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

  private handleChanges(changes: SimpleChanges) {
    const tippyNameChanges = changes.tippyName;
    const ngxTippyChanges = changes.ngxTippy;
    const tippyPropsChanges = changes.tippyProps;
    const tippyClassChanges = changes.tippyClassName;

    tippyNameChanges && !tippyNameChanges.firstChange && this.handleNameChanges(changes);
    ngxTippyChanges && !ngxTippyChanges.firstChange && this.handleContentChanges(changes);
    tippyPropsChanges && !tippyPropsChanges.firstChange && this.handlePropsChanges(changes);
    tippyClassChanges && !tippyClassChanges.firstChange && this.handleClassChanges(changes);
  }

  private handleNameChanges({ tippyName: { previousValue, currentValue } }: SimpleChanges) {
    const tippyInstances = this.ngxTippyService.getInstances();
    const tippyInstance = this.tippyInstance;

    if (!tippyInstances || !tippyInstance) return;

    this.deleteEntryInStorage(tippyInstances, previousValue);
    tippyInstances.set(currentValue, tippyInstance);
  }

  private handleContentChanges({ ngxTippy: { currentValue } }: SimpleChanges) {
    const tippyInstances = this.ngxTippyService.getInstances();
    const tippyInstance = this.tippyInstance;

    if (tippyInstance) {
      this.ngxTippyService.setContent(this.tippyName || this.uniqueID, currentValue);
    } else {
      this.initTippy();
    }

    if (tippyInstances && tippyInstance && currentValue === null) {
      this.clearInstance({ tippyInstance, tippyInstances });
      this.resetIDCounter();
    }
  }

  private handlePropsChanges({ tippyProps: { currentValue } }: SimpleChanges) {
    this.ngxTippyService.setProps(this.tippyName || this.uniqueID, currentValue);
  }

  private handleClassChanges({ tippyClassName: { currentValue } }: SimpleChanges) {
    this.setClassName(this.tippyInstance, currentValue);
  }

  private destroyTippy() {
    const tippyInstances = this.ngxTippyService.getInstances();
    const tippyInstance = this.tippyInstance;

    if (!tippyInstance || !tippyInstances) return;

    this.clearInstance({ tippyInstance, tippyInstances });
    this.resetIDCounter();
  }
}
