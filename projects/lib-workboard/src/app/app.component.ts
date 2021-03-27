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
    overrides: ['arrow', 'theme'],
  };

  singletonDark = {
    ...this.singleton,
    theme: 'dark',
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const singleton = this.tippyService.getSingletonInstance('first');

    singleton.show('sing1');

    setTimeout(() => {
      singleton.showNext();
    }, 1000);

    setTimeout(() => {
      singleton.showPrevious();
    }, 2000);

    setTimeout(() => {
      singleton.showPrevious();
    }, 3000);

    setTimeout(() => {
      singleton.hide();
    }, 4000);

    console.log(this.tippyService.getSingletonInstances());
  }
}
