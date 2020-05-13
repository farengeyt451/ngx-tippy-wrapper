import { Directive, OnInit, ElementRef, Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { Instance } from 'tippy.js';
import { NgxTippyService } from './ngx-tippy.service';
import { NgxTippyProps, NgxTippyInstance } from './ngx-tippy.interfaces';

interface TippyHTMLElement extends HTMLElement {
  _tippy: Instance;
}

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit {
  @Input() ngxTippy?: HTMLElement;
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

  initTippy() {
    const tippyTarget = this.tippyEl.nativeElement;
    const tippyTemplate = this.ngxTippy;

    tippy(tippyTarget, { ...this.tippyProps, ...(tippyTemplate && { content: this.ngxTippy }) });
    this.setTippyInstance(tippyTarget);
  }

  setTippyInstance(tippyTarget: TippyHTMLElement) {
    const tippyInstance: NgxTippyInstance = tippyTarget._tippy;

    this.writeInstancesToStorage(tippyInstance);
    this.setClassName(tippyInstance);
  }

  setClassName(tippyInstance: NgxTippyInstance) {
    if (!this.tippyClassName) return;
    const classNames = this.tippyClassName.split(' ');

    classNames.length > 0 &&
      classNames.forEach((className) => {
        this.renderer.addClass(tippyInstance.popper.firstElementChild, className);
      });
  }

  writeInstancesToStorage(tippyInstance: NgxTippyInstance) {
    this.ngxTippyService.setTippyInstances(this.tippyName || `tippy-${tippyInstance.id}`, tippyInstance);
  }
}
