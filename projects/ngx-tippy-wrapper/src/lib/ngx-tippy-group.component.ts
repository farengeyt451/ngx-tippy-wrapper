import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { NgxTippyProps } from './ngx-tippy.interfaces';
import tippy from 'tippy.js';

/**
 * This component implements case - if need different tooltip content to many different elements, while only needing to initialize once with shared props
 */
@Component({
  selector: 'ngx-tippy-group',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class NgxTippyGroup implements AfterViewInit {
  @Input() tippyProps?: NgxTippyProps;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  setTooltips() {
    const tooltips: HTMLElement[] = Array.from(this.contentWrapper.nativeElement.childNodes);
    this.initTippy(tooltips);
  }

  initTippy(tooltips: HTMLElement[]) {
    tippy(tooltips, this.tippyProps);
  }
}
