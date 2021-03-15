import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { createSingleton } from 'tippy.js';
import { NgxTippyProps } from './ngx-tippy.interfaces';
import { NgxTippyService } from './ngx-tippy.service';

/**
 * Implementing singleton case - single tippy element that takes the place of an array of regular tippy instances
 */
@Component({
  selector: 'ngx-tippy-singleton',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class NgxTippySingletonComponent implements AfterViewInit, OnDestroy {
  @Input() tippyProps?: NgxTippyProps;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private ngxTippyService: NgxTippyService) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  ngOnDestroy() {}

  setTooltips() {
    const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    const tooltips: HTMLElement[] = Array.from(contentWrapperNativeEl.querySelectorAll('[data-singleton]'));

    this.initTippy(tooltips);
  }

  initTippy(tooltips: HTMLElement[]) {
    const tippyInstances = tippy(tooltips);
    const singleton = createSingleton(tippyInstances, this.tippyProps);
  }
}

// TODO:
// 1. singleton methods
// 2. singleton destroy
// 3. event delegation
// 4. ng-template
// 5. lightweight token
