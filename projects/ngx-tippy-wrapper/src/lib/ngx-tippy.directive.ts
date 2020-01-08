import {
  Directive,
  OnInit,
  ElementRef,
  Input,
  Renderer2,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import tippy, { createSingleton } from 'tippy.js';
import { NgxTippyService } from './ngx-tippy.service';
import { NgxTippyProps, NgxTippyInstance } from './ngx-tippy.interfaces';

@Directive({
  selector: '[ngxTippy]'
})
export class NgxTippyDirective implements OnInit {
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() classNames?: Array<string>;
  tippyInstance: NgxTippyInstance;

  constructor(
    private el: ElementRef,
    private ngxTippyService: NgxTippyService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platform: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    this.initTippy();
  }

  // Init tippy and write all tippy instances
  // Prop 'tippyName' required for access to specific tippy instance
  initTippy() {
    const tippyTarget = this.el.nativeElement;
    tippy(tippyTarget, this.tippyProps);
    this.tippyInstance = tippyTarget._tippy;
    this.writeInstancesToStorage();
    this.setClassName();
    this.initTippySingleton();
  }

  initTippySingleton() {
    const instancesForSingleton = Array.from(
      this.ngxTippyService.getAllTippyInstances().values()
    ).filter((tippyInstance: NgxTippyInstance) => {
      return (tippyInstance.reference as HTMLElement).dataset.tippySingleton;
    });
    const tippySingletonProps =
      instancesForSingleton &&
      instancesForSingleton.length > 0 &&
      (instancesForSingleton[instancesForSingleton.length - 1].reference as HTMLElement).dataset
        .tippySingletonProps;
    const parsedProps = tippySingletonProps && JSON.parse(tippySingletonProps);

    createSingleton(instancesForSingleton, parsedProps);
  }

  setClassName() {
    this.classNames &&
      this.classNames.length > 0 &&
      this.classNames.forEach(className => {
        this.renderer.addClass(this.tippyInstance.popperChildren.tooltip, className);
      });
  }

  writeInstancesToStorage() {
    this.ngxTippyService.setTippyInstances(
      this.tippyName || `tippy-${this.tippyInstance.id}`,
      this.tippyInstance
    );
  }
}
