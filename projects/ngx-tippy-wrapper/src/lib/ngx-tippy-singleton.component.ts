import { Component, Input, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { createSingleton } from 'tippy.js';
import { NgxTippyService } from './ngx-tippy.service';
import { NgxTippyProps, NgxTippyInstance, NgxTippySingletonInstance, TippyHTMLElement } from './ngx-tippy.interfaces';

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
export class NgxTippySingletonComponent implements AfterViewInit {
  @Input() tippyProps?: NgxTippyProps;
  @Input() singletonName?: string;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private ngxTippyService: NgxTippyService) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setTooltips();
  }

  /**
   * Take projected in component tooltips element
   * Take initiated tippy instances
   * Initiate `singleton addon` only for projected tooltips for current component instance
   */
  private setTooltips() {
    const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    const singletonTooltipIDs: number[] = Array.from(contentWrapperNativeEl.querySelectorAll('[ngxTippy]')).map(
      (el: TippyHTMLElement) => el._tippy.id
    );

    const tippyInstances = [...this.ngxTippyService.getInstances().values()];

    const currentSingletonChildrenTippyInstances = tippyInstances.filter((tippyInstance) =>
      singletonTooltipIDs.includes(tippyInstance.id)
    );

    if (currentSingletonChildrenTippyInstances.length) {
      this.initTippySingleton(currentSingletonChildrenTippyInstances);
    } else {
      throw new Error(`No singleton instances founded`);
    }
  }

  private initTippySingleton(childrenSingletonInstances: NgxTippyInstance[]) {
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
    const extendedSingletonInstance = this.extendShowFn(singletonInstance);

    this.ngxTippyService.setSingletonInstance(
      this.singletonName || `singleton-${singletonInstance.id}}`,
      extendedSingletonInstance
    );
  }

  /**
   * Extend original `show` method
   * Purpose: manipulate tooltip state by [tippyName]
   *
   * @param singletonInstance { NgxTippySingletonInstance }
   * @returns { NgxTippySingletonInstance }
   */
  private extendShowFn(singletonInstance: NgxTippySingletonInstance): NgxTippySingletonInstance {
    const originalShowFn = singletonInstance.show;

    singletonInstance.show = (singletonInstanceIdentifier: string | number | NgxTippyInstance) => {
      if (typeof singletonInstanceIdentifier === 'string') {
        originalShowFn(this.ngxTippyService.getInstance(singletonInstanceIdentifier));
      } else {
        originalShowFn(singletonInstanceIdentifier);
      }
    };

    return singletonInstance;
  }
}
