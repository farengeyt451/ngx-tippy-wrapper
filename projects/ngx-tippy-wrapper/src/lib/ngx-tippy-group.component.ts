import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy from 'tippy.js';
import { NgxTippyProps } from './ngx-tippy.interfaces';

/**
 * Different tooltip content to many different elements, but only one tippy instance
 */
@Component({
  selector: 'ngx-tippy-group',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class NgxTippyGroupComponent implements AfterViewInit {
  @Input() groupedProps?: NgxTippyProps;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  setTooltips() {
    const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    const tooltips: HTMLElement[] = Array.from(contentWrapperNativeEl.querySelectorAll('[data-tippy-grouped]'));

    this.initTippy(tooltips);
  }

  initTippy(tooltips: HTMLElement[]) {
    tippy(tooltips, this.groupedProps);
  }
}
