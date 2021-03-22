import { Component, ElementRef, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { CreateSingleton, createSingleton, CreateSingletonInstance } from 'tippy.js';
import { NgxTippyProps, NgxTippyInstance, NgxTippySingletonInstance } from './ngx-tippy.interfaces';
import { NgxTippyService } from './ngx-tippy.service';
import { getChildrenSingletonInstances } from './ngx-tippy.utils';
import { NgxTippySingletonService } from './ngx-tippy-singleton.service';

/**
 * Tippy singleton - single tippy element that takes the place of an array of regular tippy instances
 */
@Component({
  selector: 'ngx-tippy-singleton',
  template: ` <ng-content></ng-content> `,
})
export class NgxTippySingletonComponent implements AfterViewInit, OnDestroy {
  @Input() tippyProps?: NgxTippyProps;
  @Input() singletonName?: string;
  // @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private ngxTippySingletonService: NgxTippySingletonService,
    private ngxTippyService: NgxTippyService
  ) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  ngOnDestroy() {}

  setTooltips() {
    const tooltips = getChildrenSingletonInstances(this.ngxTippyService.getInstances());

    if (tooltips.length) {
      this.initTippy(tooltips);
    } else {
      throw new Error(`No singleton instances founded, provide 'data-tippy-singleton' attribute`);
    }
  }

  initTippy(tooltips: NgxTippyInstance[]) {
    const singleton: NgxTippySingletonInstance = createSingleton(tooltips, this.tippyProps);
    this.writeSingletonInstanceToStorage(singleton);
  }

  /**
   * To manipulate singleton groups, write all instances to storage
   * `singletonName` used as unique key
   * If `singletonName` does not provided - it will be generated using counter
   *
   * @param tippyInstance { NgxTippySingletonInstance }
   */
  private writeSingletonInstanceToStorage(singletonInstance: NgxTippySingletonInstance) {
    const originalShowFn = singletonInstance.show;

    singletonInstance.show = (param: string | number | NgxTippyInstance) => {
      if (typeof param === 'string') {
        originalShowFn(this.ngxTippyService.getInstance(param));
      } else {
        originalShowFn(param);
      }
    };

    this.ngxTippySingletonService.setInstance(this.singletonName || `singleton-${0}}`, singletonInstance);
  }
}

// TODO:
// 1. singleton methods
// 2. singleton destroy
// 3. event delegation
// 4. ng-template
// 5. lightweight token
// 6. unit tests
