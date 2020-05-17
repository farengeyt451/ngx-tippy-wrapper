import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { createSingleton } from 'tippy.js';
import { NgxTippyProps } from './ngx-tippy.interfaces';

/**
 * This component implements case - singleton: single tippy element that takes the place of an array of regular tippy instances
 */
@Component({
  selector: 'ngx-tippy-singleton',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class NgxTippySingletonComponent implements AfterViewInit {
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
    createSingleton(tippy(tooltips), this.tippyProps);
  }
}
