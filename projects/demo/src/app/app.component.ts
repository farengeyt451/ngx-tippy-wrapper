import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgxTippyProps, InstancesChanges, NgxSingletonProps } from 'ngx-tippy-wrapper';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tippyTemplateEx10', { read: ElementRef, static: false }) tippyTemplateEx10: ElementRef;
  @ViewChild('tippyTemplateEx11', { read: ElementRef, static: false }) tippyTemplateEx11: ElementRef;

  title = 'ngx-tippy-demo';
  bindedContent: string = 'Binded tooltip content';

  private instancesChanges$: Subscription;

  tippyProps: NgxTippyProps = {
    arrow: true,
    theme: 'light',
  };

  tippyPropsEx3: NgxTippyProps = { ...this.tippyProps, arrow: false, placement: 'bottom' };

  tippyPropsEx8: NgxTippyProps = { ...this.tippyProps, placement: 'bottom' };

  tippyPropsEx9: NgxTippyProps = { ...this.tippyProps, allowHTML: true, interactive: true, interactiveBorder: 50 };

  tippyPropsEx10: NgxTippyProps = this.tippyPropsEx9;

  tippyPropsEx11: NgxTippyProps = this.tippyPropsEx9;

  instanceEx12: NgxTippyProps = {
    allowHTML: true,
    animation: 'shift-away',
    content: 'Tooltip content',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 50,
    theme: 'light',
    trigger: 'manual',
  };

  tippyPropsEx13: NgxTippyProps = this.tippyPropsEx9;

  instanceEx15: NgxSingletonProps = {
    allowHTML: true,
    animation: 'shift-away',
    interactive: true,
    interactiveBorder: 30,
    interactiveDebounce: 75,
    moveTransition: 'transform 0.2s ease-out',
    theme: 'light',
  };

  instanceEx16: NgxSingletonProps = { ...this.instanceEx15, overrides: ['arrow', 'placement'] };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.setContentForTooltipEx8();
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.setContentForTooltipEx3();
    this.setContentForTooltipEx10();
    this.setContentForTooltipEx11();
    this.manualControl();
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }

  setContentForTooltipEx3() {
    this.tippyService.setContent('content-7', this.bindedContent);
  }

  setContentForTooltipEx8() {
    this.tippyPropsEx8.content = 'Initial tooltip content';
  }

  setContentForTooltipEx10() {
    const template = this.tippyTemplateEx10.nativeElement;
    this.tippyService.setContent('content-10', template);
  }

  setContentForTooltipEx11() {
    const template = this.tippyTemplateEx11.nativeElement;
    this.tippyService.setContent('content-11', template.innerHTML);
  }

  manualControl() {
    this.tippyService.show('instance-12');

    setTimeout(() => {
      this.tippyService.setContent('instance-12', 'New tooltip content');
    }, 4000);

    setTimeout(() => {
      this.tippyService.setContent('instance-12', 'Another new content and props');
      this.tippyService.setProps('instance-12', {
        theme: 'material',
        arrow: false,
      });
    }, 6000);

    setTimeout(() => {
      this.tippyService.hide('instance-12');
    }, 8000);

    setTimeout(() => {
      this.tippyService.destroy('instance-12');
    }, 10000);
  }

  subToInstancesChanges() {
    this.instancesChanges$ = this.tippyService.instancesChanges.subscribe((changes: InstancesChanges) => {
      if (changes.name === 'instance-12') {
        console.log('subToInstancesChanges -> changes', changes);
      }
    });
  }

  onTemplateClick(event: MouseEvent) {
    console.log('onTemplateClick -> event', event);
  }
}
