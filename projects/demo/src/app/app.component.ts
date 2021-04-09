import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { NgxTippyProps, InstancesChanges, NgxSingletonProps } from 'ngx-tippy-wrapper';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { Subscription } from 'rxjs';
import { followCursor, animateFill } from 'tippy.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tippyTemplatePassElement', { read: ElementRef, static: false }) tippyTemplatePassElement: ElementRef;
  @ViewChild('templatePassInnerHTML', { read: ElementRef, static: false }) templatePassInnerHTML: ElementRef;
  @Input() inputContent?: string;

  public readonly title = 'ngx-tippy-demo';
  public readonly bindedContent: string = 'Binded tooltip content';

  private instancesChanges$: Subscription;

  public baseProps: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  fromComponent: NgxTippyProps = { ...this.baseProps, arrow: false, placement: 'bottom' };

  binding: NgxTippyProps = { ...this.baseProps, content: this.bindedContent };

  bindedProp: NgxTippyProps = { ...this.baseProps, placement: 'bottom' };

  templateRef: NgxTippyProps = {
    ...this.baseProps,
    allowHTML: true,
    appendTo: 'parent',
    interactive: true,
    interactiveBorder: 50,
  };

  passElement: NgxTippyProps = this.templateRef;

  passInnerHTML: NgxTippyProps = this.templateRef;

  plugin: NgxTippyProps = { ...this.baseProps, followCursor: true, plugins: [followCursor] };

  animateFill: NgxTippyProps = { animateFill: true, plugins: [animateFill] };

  manualControl: NgxTippyProps = {
    allowHTML: true,
    animation: 'shift-away',
    content: 'Tooltip content',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 50,
    theme: 'light',
    trigger: 'manual',
  };

  grouped: NgxTippyProps = this.templateRef;

  singletonProps: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  singletonOverrides: NgxSingletonProps = { ...this.singletonProps, overrides: ['arrow', 'placement'] };
  singletonTransitions: NgxSingletonProps = {
    ...this.singletonProps,
    theme: 'dark',
    moveTransition: 'transform 0.4s ease',
  };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.setContentForTooltipBindedProp();
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.setContentForTooltip();
    this.setContentForTooltipPassElement();
    this.setContentForTooltipInnerHTML();
    this.initManualControl();
    this.initManualSingletonControl();
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }

  setContentForTooltip() {
    this.tippyService.setContent('set-content', this.bindedContent);
  }

  setContentForTooltipBindedProp() {
    this.bindedProp.content = 'Initial tooltip content';
  }

  setContentForTooltipPassElement() {
    const template = this.tippyTemplatePassElement.nativeElement;
    this.tippyService.setContent('pass-element', template);
  }

  setContentForTooltipInnerHTML() {
    const template = this.templatePassInnerHTML.nativeElement;
    this.tippyService.setContent('inner-html', template.innerHTML);
  }

  initManualControl() {
    setTimeout(() => {
      this.tippyService.show('manual-control');
    }, 4000);

    setTimeout(() => {
      this.tippyService.setContent('manual-control', 'New tooltip content');
    }, 8000);

    setTimeout(() => {
      this.tippyService.setContent('manual-control', 'Another new content and props');
      this.tippyService.setProps('manual-control', {
        theme: 'material',
        arrow: false,
      });
    }, 10000);

    setTimeout(() => {
      this.tippyService.hide('manual-control');
    }, 12000);

    setTimeout(() => {
      this.tippyService.destroy('manual-control');
    }, 14000);
  }

  subToInstancesChanges() {
    this.instancesChanges$ = this.tippyService.instancesChanges.subscribe((changes: InstancesChanges) => {
      if (changes.name === 'manual-control') {
        console.warn('subToInstancesChanges -> changes', changes);
      }
    });
  }

  initManualSingletonControl() {
    const mainPageSingleton = this.tippyService.getSingletonInstance('main-page');

    mainPageSingleton.show(2);

    setTimeout(() => {
      mainPageSingleton.show('s-child');
    }, 2000);

    setTimeout(() => {
      mainPageSingleton.showPrevious();
    }, 4000);

    setTimeout(() => {
      mainPageSingleton.hide();
    }, 6000);
  }

  onTemplateClick(event: MouseEvent) {
    console.log('onTemplateClick -> event', event);
  }
}
