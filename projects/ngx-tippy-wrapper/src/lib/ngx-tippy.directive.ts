import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import tippy from 'tippy.js';
import { NgxTippyContent, NgxTippyInstance, NgxTippyProps, TippyHTMLElement, ViewRef } from './interfaces';
import { NgxTippyService, NgxViewService } from './services';
import { setTemplateVisible } from './utils';

// Increasing integer for generating unique ids
let nextUniqueId: number = 0;

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() ngxTippy?: NgxTippyContent;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() tippyClassName?: string;

  private tippyInstance!: NgxTippyInstance;
  private uniqueId: string = `tippy-${++nextUniqueId}`;

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

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.clearInstance();
    this.resetIDCounter();
  }

  /**
   * Tooltip initialize
   * Content can be directly passed through `ngxTippy` selector
   */
  private initTippy() {
    const tippyTarget: TippyHTMLElement = this.tippyEl.nativeElement;

    if (this.ngxTippy === null || this.ngxTippy === undefined) return;

    const tippyName = this.tippyName || this.uniqueId;
    const viewRef = this.ngxViewService.getViewRefInstance(this.ngxTippy, tippyName);
    const tippyElement = viewRef.getElement();

    tippy(tippyTarget, { ...(this.tippyProps || {}), ...(tippyElement && { content: tippyElement }) });

    setTemplateVisible(tippyElement, this.renderer);

    this.setTippyInstance({ tippyTarget, tippyName, viewRef });
    this.setViewRef(viewRef);
    this.setClassName(this.tippyInstance);
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

  private setViewRef(viewRef: ViewRef) {
    this.tippyInstance.viewRef = viewRef;
  }

  private setClassName(tippyInstance: NgxTippyInstance) {
    if (!this.tippyClassName) return;
    const classNames = this.tippyClassName.split(' ');

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
  private writeInstancesToStorage(tippyInstance: NgxTippyInstance, tippyResolvedName: string) {
    this.ngxTippyService.setInstance(tippyResolvedName, tippyInstance);
  }

  private clearInstance() {
    const instances = this.ngxTippyService.getInstances();

    if (instances && this.tippyInstance) {
      const tippyName = this.tippyInstance.tippyName || '';

      this.clearViewRef(this.tippyInstance);
      this.destroyTippyInstance(tippyName);
      this.deleteEntryInStorage(instances, tippyName);
    }
  }

  private resetIDCounter() {
    nextUniqueId = 0;
  }

  private clearViewRef(tippyInstance: NgxTippyInstance) {
    tippyInstance.viewRef?.destroy();
  }

  private destroyTippyInstance(tippyName: string) {
    this.ngxTippyService.destroy(tippyName);
  }

  private deleteEntryInStorage(instances: Map<string, NgxTippyInstance>, tippyName: string) {
    instances.delete(tippyName);
  }
}
