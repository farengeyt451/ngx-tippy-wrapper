import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
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
  @ViewChild('tippyTemplatePassInnerHTML', { read: ElementRef, static: false }) tippyTemplatePassInnerHTML: ElementRef;

  title = 'ngx-tippy-demo';
  bindedContent: string = 'Binded tooltip content';

  private instancesChanges$: Subscription;

  tippyProps: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  tippyPropsFromComponent: NgxTippyProps = { ...this.tippyProps, arrow: false, placement: 'bottom' };

  tippyPropsBinding: NgxTippyProps = { ...this.tippyProps, content: this.bindedContent };

  tippyPropsBindedProp: NgxTippyProps = { ...this.tippyProps, placement: 'bottom' };

  tippyPropsTemplateRef: NgxTippyProps = {
    ...this.tippyProps,
    allowHTML: true,
    appendTo: 'parent',
    interactive: true,
    interactiveBorder: 50,
  };

  tippyPropsPassElement: NgxTippyProps = this.tippyPropsTemplateRef;

  tippyPropsPassInnerHTML: NgxTippyProps = this.tippyPropsTemplateRef;

  tippyPropsPlugin: NgxTippyProps = { ...this.tippyProps, followCursor: true, plugins: [followCursor] };

  tippyPropsAnimateFill: NgxTippyProps = { animateFill: true, plugins: [animateFill] };

  tippyPropsManualControl: NgxTippyProps = {
    allowHTML: true,
    animation: 'shift-away',
    content: 'Tooltip content',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 50,
    theme: 'light',
    trigger: 'manual',
  };

  tippyPropsGrouped: NgxTippyProps = this.tippyPropsTemplateRef;

  tippyPropsSingleton: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  tippyPropsSingletonOverrides: NgxSingletonProps = { ...this.tippyPropsSingleton, overrides: ['arrow', 'placement'] };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.setContentForTooltipBindedProp();
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.setContentForTooltip();
    this.setContentForTooltipPassElement();
    this.setContentForTooltipInnerHTML();
    this.manualControl();
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }

  setContentForTooltip() {
    this.tippyService.setContent('set-content', this.bindedContent);
  }

  setContentForTooltipBindedProp() {
    this.tippyPropsBindedProp.content = 'Initial tooltip content';
  }

  setContentForTooltipPassElement() {
    const template = this.tippyTemplatePassElement.nativeElement;
    this.tippyService.setContent('pass-element', template);
  }

  setContentForTooltipInnerHTML() {
    const template = this.tippyTemplatePassInnerHTML.nativeElement;
    this.tippyService.setContent('inner-html', template.innerHTML);
  }

  manualControl() {
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

  onTemplateClick(event: MouseEvent) {
    console.log('onTemplateClick -> event', event);
  }
}
