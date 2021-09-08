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

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() ngxTippy?: NgxTippyContent;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() tippyClassName?: string;

  private tippyInstance!: NgxTippyInstance;
  private viewRef: ViewRef | undefined;

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
    this.clearViewRef();
  }

  /**
   * Tooltip initialize
   * Content can be directly passed through `ngxTippy` selector
   */
  private initTippy() {
    const tippyTarget: TippyHTMLElement = this.tippyEl.nativeElement;
    const tippyTemplate = this.ngxViewService.setTippyTemplate(this.ngxTippy);

    if (tippyTemplate === null || tippyTemplate === undefined) return;

    tippy(tippyTarget, { ...(this.tippyProps || {}), ...(tippyTemplate && { content: tippyTemplate }) });

    setTemplateVisible(tippyTemplate, this.renderer);
    this.setTippyInstance(tippyTarget, tippyTemplate);
  }

  private setTippyInstance(tippyTarget: TippyHTMLElement, tippyTemplate: any) {
    this.tippyInstance = tippyTarget._tippy;
    this.setClassName(this.tippyInstance);
    this.writeInstancesToStorage(this.tippyInstance);
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
  private writeInstancesToStorage(tippyInstance: NgxTippyInstance) {
    this.ngxTippyService.setInstance(this.tippyName || `tippy-${tippyInstance.id}`, tippyInstance);
  }

  private clearInstance() {
    const instances = this.ngxTippyService.getInstances();

    if (instances && this.tippyInstance) {
      const tippyName = this.tippyName || `tippy-${this.tippyInstance.id}`;

      this.destroyTippyInstance(tippyName);
      this.deleteEntryInStorage(instances, tippyName);
    }
  }

  private clearViewRef() {
    this.viewRef?.destroy();
  }

  private destroyTippyInstance(tippyName: string) {
    this.ngxTippyService.destroy(tippyName);
  }

  private deleteEntryInStorage(instances: Map<string, NgxTippyInstance>, tippyName: string) {
    instances.delete(tippyName);
  }
}
