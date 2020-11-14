import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgxTippyProps, InstancesChanges, NgxSingletonProps } from 'ngx-tippy-wrapper';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tippyTemplateEx12', { read: ElementRef, static: false }) tippyTemplateEx12: ElementRef;
  @ViewChild('tippyTemplateEx13', { read: ElementRef, static: false }) tippyTemplateEx13: ElementRef;

  title = 'ngx-tippy-demo';
  bindedContent: string = 'Binded tooltip content';

  private instancesChanges$: Subscription;

  tippyProps: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  tippyPropsEx3: NgxTippyProps = { ...this.tippyProps, arrow: false, placement: 'bottom' };

  tippyPropsEx8: NgxTippyProps = { ...this.tippyProps, content: this.bindedContent };

  tippyPropsEx10: NgxTippyProps = { ...this.tippyProps, placement: 'bottom' };

  tippyPropsEx11: NgxTippyProps = {
    ...this.tippyProps,
    allowHTML: true,
    interactive: true,
    interactiveBorder: 50,
  };

  tippyPropsEx12: NgxTippyProps = this.tippyPropsEx11;

  tippyPropsEx13: NgxTippyProps = this.tippyPropsEx11;

  instanceEx14: NgxTippyProps = {
    allowHTML: true,
    animation: 'shift-away',
    content: 'Tooltip content',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 50,
    theme: 'light',
    trigger: 'manual',
  };

  tippyPropsEx15: NgxTippyProps = this.tippyPropsEx11;

  instanceEx17: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  instanceEx16: NgxSingletonProps = { ...this.instanceEx17, overrides: ['arrow', 'placement'] };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.setContentForTooltipEx10();
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.setContentForTooltipEx9();
    this.setContentForTooltipEx12();
    this.setContentForTooltipEx13();
    this.manualControl();
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }

  setContentForTooltipEx9() {
    this.tippyService.setContent('content-9', this.bindedContent);
  }

  setContentForTooltipEx10() {
    this.tippyPropsEx10.content = 'Initial tooltip content';
  }

  setContentForTooltipEx12() {
    const template = this.tippyTemplateEx12.nativeElement;
    this.tippyService.setContent('content-12', template);
  }

  setContentForTooltipEx13() {
    const template = this.tippyTemplateEx13.nativeElement;
    this.tippyService.setContent('content-13', template.innerHTML);
  }

  manualControl() {
    setTimeout(() => {
      this.tippyService.show('instance-14');
    }, 4000);

    setTimeout(() => {
      this.tippyService.setContent('instance-14', 'New tooltip content');
    }, 8000);

    setTimeout(() => {
      this.tippyService.setContent('instance-14', 'Another new content and props');
      this.tippyService.setProps('instance-14', {
        theme: 'material',
        arrow: false,
      });
    }, 10000);

    setTimeout(() => {
      this.tippyService.hide('instance-14');
    }, 12000);

    setTimeout(() => {
      this.tippyService.destroy('instance-14');
    }, 14000);
  }

  subToInstancesChanges() {
    this.instancesChanges$ = this.tippyService.instancesChanges.subscribe((changes: InstancesChanges) => {
      if (changes.name === 'instance-14') {
        console.log('subToInstancesChanges -> changes', changes);
      }
    });
  }

  onTemplateClick(event: MouseEvent) {
    console.log('onTemplateClick -> event', event);
  }
}
