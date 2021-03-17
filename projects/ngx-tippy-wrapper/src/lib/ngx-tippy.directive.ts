import { Directive, OnInit, ElementRef, Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { Instance } from 'tippy.js';
import { NgxTippyService } from './ngx-tippy.service';
import { NgxTippyProps, NgxTippyInstance, NgxTippyContent } from './ngx-tippy.interfaces';
import { setTemplateVisible } from './ngx-tippy.utils';

interface TippyHTMLElement extends HTMLElement {
  _tippy: Instance;
}

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit {
  @Input() ngxTippy?: NgxTippyContent | null;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() tippyClassName?: string;

  constructor(
    private tippyEl: ElementRef,
    private ngxTippyService: NgxTippyService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platform: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    this.initTippy();
  }

  /**
   * Tooltip initialize
   * Content can be directly passed through `ngxTippy` selector
   */
  private initTippy() {
    if (this.ngxTippy === null || this.ngxTippy === undefined) return;

    const tippyTarget = this.tippyEl.nativeElement;
    const tippyTemplate = this.ngxTippy;

    tippy(tippyTarget, { ...(this.tippyProps || {}), ...(tippyTemplate && { content: tippyTemplate }) });

    setTemplateVisible(tippyTemplate, this.renderer);
    this.setTippyInstance(tippyTarget);
  }

  private setTippyInstance(tippyTarget: TippyHTMLElement) {
    const tippyInstance: NgxTippyInstance = tippyTarget._tippy;

    this.setClassName(tippyInstance);
    this.setSingletonSign(tippyInstance, tippyTarget);
    this.writeInstancesToStorage(tippyInstance);
  }

  private setClassName(tippyInstance: NgxTippyInstance) {
    if (!this.tippyClassName) return;
    const classNames = this.tippyClassName.split(' ');

    classNames.length &&
      classNames.forEach((className) => {
        this.renderer.addClass(tippyInstance.popper.firstElementChild, className);
      });
  }

  private setSingletonSign(tippyInstance: NgxTippyInstance, tippyTarget: TippyHTMLElement) {
    tippyInstance.isChildrenSingleton = tippyTarget.dataset.hasOwnProperty('tippySingleton');
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
}
