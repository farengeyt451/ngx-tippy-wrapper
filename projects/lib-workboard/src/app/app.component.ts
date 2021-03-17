import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { NgxSingletonProps, NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  singleton: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
    overrides: ['arrow', 'theme'],
  };

  tippy: NgxTippyProps = {
    arrow: false,
    theme: 'dark',
  };

  tippyCustom: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  constructor(private tippyService: NgxTippyService) {}

  ngAfterViewInit(): void {
    console.log(this.tippyService.getInstances());
  }
}
