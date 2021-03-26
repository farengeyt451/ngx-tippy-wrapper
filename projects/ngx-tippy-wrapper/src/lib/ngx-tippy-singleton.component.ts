import { Component, Input, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { createSingleton } from 'tippy.js';
import { NgxTippyProps, NgxTippyInstance, NgxTippySingletonInstance } from './ngx-tippy.interfaces';
import { NgxTippyService } from './ngx-tippy.service';

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
  @Input() singletonName?: string;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private ngxTippyService: NgxTippyService) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  ngOnDestroy() {}

  setTooltips() {
    const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    const tooltips: number[] = Array.from(contentWrapperNativeEl.querySelectorAll('[ngxTippy]')).map(
      (el: any) => el._tippy.id
    );

    const childrenSingletonInstances = [...this.ngxTippyService.getInstances().values()];

    const filtered = childrenSingletonInstances.filter((el) => tooltips.includes(el.id));

    if (filtered.length) {
      this.initTippy(filtered);
    } else {
      throw new Error(`No singleton instances founded, check 'data-tippy-singleton' attribute`);
    }
  }

  initTippy(childrenSingletonInstances: NgxTippyInstance[]) {
    const singleton: NgxTippySingletonInstance = createSingleton(childrenSingletonInstances, this.tippyProps);
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
    console.log('log ~ writeSingletonInstanceToStorage ~ singletonInstance', singletonInstance);
    const originalShowFn = singletonInstance.show;

    singletonInstance.show = (singletonInstanceIdentifier: string | number | NgxTippyInstance) => {
      if (typeof singletonInstanceIdentifier === 'string') {
        originalShowFn(this.ngxTippyService.getInstance(singletonInstanceIdentifier));
      } else {
        originalShowFn(singletonInstanceIdentifier);
      }
    };

    this.ngxTippyService.setSingletonInstance(
      this.singletonName || `singleton-${singletonInstance.id}}`,
      singletonInstance
    );
  }
}

// TODO:
// 1. singleton methods
// 2. singleton destroy
// 2.1 interfaces
// 3. event delegation
// 4. ng-template
// 5. lightweight token
// 6. unit tests
