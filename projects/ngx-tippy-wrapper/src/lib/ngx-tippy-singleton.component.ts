import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { createSingleton } from 'tippy.js';
import {
  NgxSingletonProps,
  NgxTippyInstance,
  NgxTippySingletonInstance,
  TippyHTMLElement,
} from './ngx-tippy.interfaces';
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
  @Input() singletonProps?: NgxSingletonProps;
  @Input() singletonName?: string;
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper: ElementRef;

  private singletonInstance!: NgxTippySingletonInstance;
  private currentSingletonChildrenTippyInstances!: NgxTippyInstance[] | undefined;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private ngxTippyService: NgxTippyService) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platform)) return;
    this.setSingleton();
  }

  ngOnDestroy() {
    this.clearSingletonInstance();
  }

  /**
   * Take projected in component tooltips element
   * Take initiated tippy instances
   * Initiate `singleton addon` only for projected tooltips for current component instance
   */
  private setSingleton() {
    const contentWrapperNativeEl: HTMLElement = this.contentWrapper.nativeElement;
    const singletonTooltipIDs: number[] = Array.from(contentWrapperNativeEl.querySelectorAll('[ngxTippy]')).map(
      (el: TippyHTMLElement) => el._tippy.id
    );

    const tippyInstances: Map<string, NgxTippyInstance> | null = this.ngxTippyService.getInstances();
    const tippyInstancesSerialized: NgxTippyInstance[] | undefined = tippyInstances && [...tippyInstances.values()];

    this.currentSingletonChildrenTippyInstances =
      tippyInstancesSerialized &&
      tippyInstancesSerialized.filter((tippyInstance) => singletonTooltipIDs.includes(tippyInstance.id));

    if (this.currentSingletonChildrenTippyInstances?.length) {
      this.initTippySingleton(this.currentSingletonChildrenTippyInstances);
    } else {
      throw new Error(`No children tippy instances founded within singleton component`);
    }
  }

  private initTippySingleton(childrenSingletonInstances: NgxTippyInstance[]) {
    this.singletonInstance = createSingleton(childrenSingletonInstances, this.singletonProps);
    this.writeSingletonInstanceToStorage(this.singletonInstance);
  }

  /**
   * To manipulate singleton groups, write all instances to storage
   * `singletonName` used as unique key
   * If `singletonName` does not provided - it will be generated using id of singletonInstance
   *
   * @param tippyInstance { NgxTippySingletonInstance }
   */
  private writeSingletonInstanceToStorage(singletonInstance: NgxTippySingletonInstance) {
    const extendedSingletonInstance = this.extendShowFn(singletonInstance);

    this.ngxTippyService.setSingletonInstance(
      this.singletonName || `singleton-${singletonInstance.id}`,
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

  private clearSingletonInstance() {
    const singletonInstances = this.ngxTippyService.getSingletonInstances();

    if (singletonInstances && this.singletonInstance) {
      this.destroySingletonInstance();
      this.deleteEntryInStorage(singletonInstances);
    }
  }

  private destroySingletonInstance() {
    this.singletonInstance.destroy();
  }

  private deleteEntryInStorage(singletonInstances: Map<string, NgxTippySingletonInstance>) {
    singletonInstances.delete(this.singletonName || `singleton-${this.singletonInstance.id}`);
  }
}
