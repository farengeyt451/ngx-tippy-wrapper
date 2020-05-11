import { Component, OnInit, ElementRef, Input, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { NgxTippyProps } from './ngx-tippy.interfaces';

@Component({
  selector: 'ngx-tippy-singleton',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class NgxTippySingletonComponent implements OnInit {
  @Input() tippyProps?: NgxTippyProps;
  @ViewChild('contentWrapper', { static: true }) content: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    Array.from(this.content.nativeElement.childNodes).forEach((element: HTMLElement) => {
      element.setAttribute('data-tippy-singleton', 'true');
      this.tippyProps && element.setAttribute('data-tippy-singleton-props', JSON.stringify(this.tippyProps));
    });
  }
}

// initTippySingleton() {
//   const instancesForSingleton = Array.from(this.ngxTippyService.getAllTippyInstances().values()).filter(
//     (tippyInstance: NgxTippyInstance) => {
//       return (tippyInstance.reference as HTMLElement).dataset.tippySingleton;
//     }
//   );
//   const tippySingletonProps =
//     instancesForSingleton &&
//     instancesForSingleton.length > 0 &&
//     (instancesForSingleton[instancesForSingleton.length - 1].reference as HTMLElement).dataset.tippySingletonProps;
//   const parsedProps = tippySingletonProps && JSON.parse(tippySingletonProps);

//   createSingleton(instancesForSingleton, parsedProps);
// }
