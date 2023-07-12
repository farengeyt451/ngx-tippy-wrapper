import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { InstancesChanges, NgxSingletonProps, NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';
import { Subscription } from 'rxjs';
import { animateFill, followCursor } from 'tippy.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tippyTemplatePassElement', { read: ElementRef, static: false })
  tippyTemplatePassElement!: ElementRef;
  @ViewChild('templatePassInnerHTML', { read: ElementRef, static: false })
  templatePassInnerHTML!: ElementRef;
  @Input() inputContent?: string;

  data: any = { a: 24 };
  public readonly title = 'ngx-tippy-demo';
  public isHidden: boolean = false;
  public readonly boundContent: string = 'Bound tooltip content';

  private instancesChanges$!: Subscription;

  public baseProps: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  public templateContext = {
    foo: 'bar',
  };

  public fromComponent: NgxTippyProps = { ...this.baseProps, arrow: false, placement: 'bottom' };

  public binding: NgxTippyProps = { ...this.baseProps, content: this.boundContent };

  public bindedProp: NgxTippyProps = { ...this.baseProps, placement: 'bottom' };

  public templateRef: NgxTippyProps = {
    ...this.baseProps,
    allowHTML: true,
    appendTo: 'parent',
    interactive: true,
    interactiveBorder: 50,
  };

  public ngTemplateRef: NgxTippyProps = {
    ...this.baseProps,
    allowHTML: true,
    appendTo: 'parent',
    trigger: 'click',
  };

  public passElement: NgxTippyProps = this.templateRef;

  public passInnerHTML: NgxTippyProps = this.templateRef;

  public plugin: NgxTippyProps = { ...this.baseProps, followCursor: true, plugins: [followCursor] };

  public animateFill: NgxTippyProps = { animateFill: true, plugins: [animateFill] };

  public manualControl: NgxTippyProps = {
    allowHTML: true,
    animation: 'shift-away',
    content: 'Tooltip content',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 50,
    theme: 'light',
    trigger: 'manual',
  };

  public grouped: NgxTippyProps = this.templateRef;

  public singletonProps: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  public singletonOverrides: NgxSingletonProps = {
    ...this.singletonProps,
    overrides: ['arrow', 'placement'],
  };

  public singletonTransitions: NgxSingletonProps = {
    ...this.singletonProps,
    theme: 'dark',
    moveTransition: 'transform 0.4s ease',
  };

  public singletonManual: NgxSingletonProps = {
    ...this.singletonTransitions,
    theme: 'dark',
    moveTransition: 'transform 0.4s ease',
    trigger: 'manual',
  };

  constructor(public tippyService: NgxTippyService) {}

  ngOnInit() {
    setTimeout(() => {
      this.data = { b: 14 };
    }, 5000);
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
    this.tippyService.setContent('set-content', this.boundContent);
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
      this.templateContext = {
        foo: 'dynamic',
      };
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
        console.info('🚀 subToInstancesChanges -> changes', changes);
      }
    });
  }

  initManualSingletonControl() {
    const mainPageSingleton = this.tippyService.getSingletonInstance('main-page');

    mainPageSingleton?.show(2);

    setTimeout(() => {
      mainPageSingleton?.show('s-child');
    }, 2000);

    setTimeout(() => {
      mainPageSingleton?.showPrevious();
    }, 4000);

    setTimeout(() => {
      mainPageSingleton?.hide();
    }, 6000);
  }

  onTemplateClick(event: MouseEvent) {
    console.log('onTemplateClick -> event', event);
  }
}
