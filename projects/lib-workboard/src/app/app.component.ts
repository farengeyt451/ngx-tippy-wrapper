import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSingletonProps, NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  singleton: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  singletonProps: NgxSingletonProps = {
    overrides: ['arrow', 'placement'],
    moveTransition: 'transform 0.4s linear',
  };

  singletonOverrides: NgxSingletonProps = { ...this.singleton, overrides: ['arrow', 'placement'] };

  groupedProps = { ...this.singleton };

  singletonDark = {
    ...this.singleton,
    theme: 'dark',
  };

  tippyOverrides: NgxTippyProps = {
    arrow: false,
    theme: 'dark',
  };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const mainPageSingleton = this.tippyService.getSingletonInstance('main-page');

    mainPageSingleton.show('custom');
  }
}
