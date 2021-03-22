import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSingletonProps, NgxTippyProps, NgxTippyService, NgxTippySingletonService } from 'ngx-tippy-wrapper';

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

  tippy: NgxTippyProps = {
    arrow: false,
    theme: 'dark',
  };

  tippyCustom: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  constructor(private ngxTippySingletonService: NgxTippySingletonService, private tippyService: NgxTippyService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const singletonInstances = this.ngxTippySingletonService.getInstances();
    const firstSingletonInstances = this.ngxTippySingletonService.getInstance('first');

    firstSingletonInstances.show('sing1');

    setInterval(() => {
      firstSingletonInstances.showNext();
    }, 1000);
  }
}
