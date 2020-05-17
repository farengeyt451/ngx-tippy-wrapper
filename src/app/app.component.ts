import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  NgxTippyProps,
  NgxHideAllOptions,
  InstancesChanges,
  NgxSingletonProps,
} from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.interfaces';
import { NgxTippyService } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.service';
import {
  animateFill,
  roundArrow,
  followCursor,
  inlinePositioning,
} from '../../projects/ngx-tippy-wrapper/node_modules/tippy.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tippyTemplate', { read: ElementRef, static: false }) tippyTemplate: ElementRef;
  title = 'ng-tippy-wrapper';

  bindedContent: string = 'Binded content';
  bindedHTMLContent: string = '<p>Binded <strong>HTML</strong> content</p>';

  // tippyProps: NgxTippyProps = {
  //   animation: 'shift-away',
  //   arrow: roundArrow,
  //   content: '<p>Binded <strong>HTML</strong> content</p>',
  //   hideOnClick: false,
  //   interactive: true,
  //   interactiveBorder: 30,
  //   interactiveDebounce: 75,
  //   plugins: [animateFill, followCursor, inlinePositioning],
  //   theme: 'light',
  //   trigger: 'click',
  // };

  tippyContent: NgxTippyProps = {
    animation: 'shift-away',
    arrow: roundArrow,
    interactive: true,
    allowHTML: true,
    interactiveBorder: 30,
    interactiveDebounce: 75,
    // hideOnClick: false,
    plugins: [animateFill, followCursor, inlinePositioning],
    theme: 'light',
    trigger: 'click',
  };

  singleton: NgxSingletonProps = {
    animation: 'shift-away',
    arrow: roundArrow,
    interactive: true,
    allowHTML: true,
    interactiveBorder: 30,
    interactiveDebounce: 75,
    plugins: [animateFill, followCursor, inlinePositioning],
    theme: 'light',
    moveTransition: 'transform 0.2s ease-out',
    overrides: ['arrow', 'placement'],
  };

  constructor(private ngxTippyService: NgxTippyService) {}

  ngOnInit() {
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.setContentForTooltip();
    // this.ngxTippyService.disable('content');
    this.ngxTippyService.show('content');
    setTimeout(() => {
      this.ngxTippyService.destroy('content');
    }, 3000);
  }

  setContentForTooltip() {
    this.ngxTippyService.setContent('content', this.tippyTemplate.nativeElement.innerHTML);
  }

  onClick(e, i) {}

  hideAll() {
    const options: NgxHideAllOptions = {
      duration: 0,
    };
    this.ngxTippyService.hideAll(options);
  }

  instancesChanges$: Subscription;

  subToInstancesChanges() {
    this.instancesChanges$ = this.ngxTippyService.instancesChanges.subscribe((changes: InstancesChanges) => {
      console.log(changes);
    });
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }
}
