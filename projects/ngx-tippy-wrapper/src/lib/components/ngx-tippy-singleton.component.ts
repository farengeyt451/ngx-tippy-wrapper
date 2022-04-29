import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { createSingleton } from 'tippy.js';
import {
  NgxSingletonProps,
  NgxTippyInstance,
  NgxTippyMessagesDict,
  NgxTippySingletonInstance,
  TippyHTMLElement,
} from '../ngx-tippy.interfaces';
import { NGX_TIPPY_MESSAGES } from '../ngx-tippy.tokens';
import { NgxTippyService } from '../services';

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
  @ViewChild('contentWrapper', { read: ElementRef, static: false }) contentWrapper!: ElementRef;

  private singletonInstance!: NgxTippySingletonInstance;
  private currentSingletonChildrenTippyInstances!: NgxTippyInstance[] | null;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private ngxTippyService: NgxTippyService,
    @Inject(NGX_TIPPY_MESSAGES) private messagesDict: NgxTippyMessagesDict
  ) {}

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
    const singletonTooltipIDs: number[] = Array.from<TippyHTMLElement>(
      contentWrapperNativeEl.querySelectorAll('[data-tippy-singleton]')
    ).map((el: TippyHTMLElement) => el._tippy.id);

    const tippyInstances = this.ngxTippyService.getInstances();

    const tippyInstancesSerialized = tippyInstances && [...tippyInstances.values()];

    this.currentSingletonChildrenTippyInstances =
      tippyInstancesSerialized &&
      tippyInstancesSerialized.filter(tippyInstance => singletonTooltipIDs.includes(tippyInstance.id));

    if (this.currentSingletonChildrenTippyInstances?.length) {
      this.initTippySingletonEntry(this.currentSingletonChildrenTippyInstances);
    } else {
      throw new Error(this.messagesDict.childrenInstancesNotFoundSingleton);
    }
  }

  private initTippySingletonEntry(childrenSingletonInstances: NgxTippyInstance[]) {
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
        const instance = this.ngxTippyService.getInstance(singletonInstanceIdentifier);
        instance && originalShowFn(instance);
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
