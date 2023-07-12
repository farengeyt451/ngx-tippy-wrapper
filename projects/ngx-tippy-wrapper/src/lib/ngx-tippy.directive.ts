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
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import tippy from 'tippy.js';
import {
  NgxTippyContent,
  NgxTippyContext,
  NgxTippyInstance,
  NgxTippyProps,
  TippyHTMLElement,
  ViewRef,
} from './ngx-tippy.interfaces';
import { NgxTippyService, NgxViewService } from './services';
import { setTemplateVisible } from './utils';

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit, OnDestroy {
  @Input() ngxTippy?: NgxTippyContent;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() tippyClassName?: string;
  @Input() tippyContext?: NgxTippyContext;

  private tippyInstance: NgxTippyInstance | undefined;
  private cachedInstances = new Map();

  constructor(
    private tippyEl: ElementRef,
    private renderer: Renderer2,
    private ngxTippyService: NgxTippyService,
    private ngxViewService: NgxViewService,
    private viewContainerRef: ViewContainerRef,
    @Inject(PLATFORM_ID) private platform: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    this.ngxViewService.viewContainerRef = this.viewContainerRef;
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

    const viewRef = this.ngxViewService.getViewRefInstance(this.ngxTippy, this.tippyName, this.tippyContext);
    const tippyElement = viewRef.getElement();

    const tInstance = tippy(tippyTarget, {
      ...(this.tippyProps || {}),
      ...(tippyElement && { content: tippyElement }),
    });

    this.tippyName = this.tippyName || `tippy-${tInstance.id}`;

    setTemplateVisible(tippyElement, this.renderer);
    this.setTippyInstance({ tippyTarget, tippyName: this.tippyName, viewRef });
    this.setClassName(this.tippyInstance, this.tippyClassName);
    this.writeInstancesToStorage(this.tippyInstance, this.tippyName);
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

  private removeClassName(tippyInstance: NgxTippyInstance | undefined, className: string | undefined) {
    if (!className || !tippyInstance) return;
    const classNames = className.split(' ');

    classNames.length &&
      classNames.forEach(className => {
        this.renderer.removeClass(tippyInstance.popper.firstElementChild, className);
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

  private handleChanges({ tippyName, ngxTippy, tippyProps, tippyClassName, tippyContext }: SimpleChanges) {
    tippyName && !tippyName.firstChange && this.handleNameChanges(tippyName);
    ngxTippy && !ngxTippy.firstChange && this.handleContentChanges(ngxTippy);
    tippyProps && !tippyProps.firstChange && this.handlePropsChanges(tippyProps);
    tippyClassName && !tippyClassName.firstChange && this.handleClassChanges(tippyClassName);
    tippyContext && !tippyContext.firstChange && this.handleContextChanges(tippyContext);
  }

  private handleNameChanges({ previousValue, currentValue }: SimpleChange) {
    const tippyInstances = this.cachedTippyInstances();
    if (!tippyInstances || !this.tippyInstance) return;

    this.deleteEntryInStorage(tippyInstances, previousValue);
    this.tippyInstance = { ...this.tippyInstance, tippyName: currentValue };
    tippyInstances.set(currentValue, this.tippyInstance);
  }

  private handleContentChanges({ currentValue }: SimpleChange) {
    if (this.tippyInstance && this.tippyName) {
      this.ngxTippyService.setContent(this.tippyName, currentValue);

      if (currentValue === null || currentValue === undefined) {
        this.ngxTippyService.disable(this.tippyName);
      } else {
        this.ngxTippyService.enable(this.tippyName);
      }
    } else {
      this.initTippy();
    }
  }

  private handlePropsChanges({ currentValue }: SimpleChange) {
    this.tippyName && this.ngxTippyService.setProps(this.tippyName, currentValue);
  }

  private handleClassChanges({ previousValue, currentValue }: SimpleChange) {
    this.removeClassName(this.tippyInstance, previousValue);
    this.setClassName(this.tippyInstance, currentValue);
  }

  private handleContextChanges({ currentValue }: SimpleChange) {
    if (this.tippyInstance && this.tippyName && this.ngxTippy) {
      this.ngxTippyService.setContent(this.tippyName, this.ngxTippy, currentValue);
    } else {
      this.initTippy();
    }
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

  private clearViewRef(tippyInstance: NgxTippyInstance) {
    tippyInstance.viewRef?.destroy && tippyInstance.viewRef.destroy();
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
