import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgxTippyProps } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.interfaces';
import { NgxTippyService } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.service';
import {
  animateFill,
  roundArrow,
  followCursor,
  inlinePositioning,
} from '../../projects/ngx-tippy-wrapper/node_modules/tippy.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('tippyTemplate', { read: ElementRef, static: true }) tippyTemplate: ElementRef;
  title = 'ng-tippy-wrapper';

  bindedContent: string = 'Binded content';
  bindedHTMLContent: string = '<p>Binded <strong>HTML</strong> content</p>';

  tippyProps: NgxTippyProps = {
    animation: 'shift-away',
    arrow: roundArrow,
    content: '<p>Binded <strong>HTML</strong> content</p>',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 30,
    interactiveDebounce: 75,
    plugins: [animateFill, followCursor, inlinePositioning],
    theme: 'light',
    trigger: 'click',
  };

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

  constructor(private ngxTippyService: NgxTippyService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.ngxTippyService.setTippyContent('content', this.tippyTemplate.nativeElement.innerHTML);
  }

  onClick(e, i) {
    console.log(e, i);
  }
}
