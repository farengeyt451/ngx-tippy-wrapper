import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { NgxTippyProps } from './ngx-tippy.interfaces';

@Component({
  selector: 'ngx-tippy-singleton',
  template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `
})
export class NgxTippySingletonComponent implements OnInit {
  @Input() tippyProps?: NgxTippyProps;
  @ViewChild('contentWrapper', { static: true }) content: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    Array.from(this.content.nativeElement.childNodes).forEach((element: HTMLElement) => {
      element.setAttribute('data-tippy-singleton', 'true');
      element.setAttribute('data-tippy-singleton-props', JSON.stringify(this.tippyProps));
    });
  }
}
