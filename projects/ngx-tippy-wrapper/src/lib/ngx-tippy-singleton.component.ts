import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { createSingleton } from 'tippy.js';
import { NgxTippyProps, NgxTippyInstance } from './ngx-tippy.interfaces';
import { NgxTippyService } from './ngx-tippy.service';
import { getChildrenSingletonInstances } from './ngx-tippy.utils';

/**
 * Tippy singleton - single tippy element that takes the place of an array of regular tippy instances
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

  constructor(@Inject(PLATFORM_ID) private platform: Object, private tippyService: NgxTippyService) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  ngOnDestroy() {}

  setTooltips() {
    // const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    // const tooltips: HTMLElement[] = Array.from(contentWrapperNativeEl.querySelectorAll('[data-singleton]'));
    const tooltips = getChildrenSingletonInstances(this.tippyService.getInstances());

    if (tooltips.length) {
      this.initTippy(tooltips);
    } else {
      throw new Error(`No singleton instances founded, provide 'data-tippy-singleton' attribute`);
    }
  }

  initTippy(tooltips: NgxTippyInstance[]) {
    const singleton = createSingleton(tooltips, this.tippyProps);
  }
}

// TODO:
// 1. singleton methods
// 2. singleton destroy
// 3. event delegation
// 4. ng-template
// 5. lightweight token
// 6. unit tests
