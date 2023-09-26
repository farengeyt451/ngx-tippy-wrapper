import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CONTENT_METHODS } from '@constants';
import { DestroyService } from '@services';
import { NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AppContentComponent implements OnInit, AfterViewInit {
  @ViewChild('templateRefService', { read: ElementRef, static: true }) templateRefService!: ElementRef;

  public readonly snippets = SNIPPETS;
  public readonly contentMethods = CONTENT_METHODS;
  public readonly content = 'Tooltip content';
  public readonly componentContent = DemoComponent;
  public tippyPropsContent: NgxTippyProps = {
    placement: 'right',
  };

  constructor(protected readonly destroy$: DestroyService, private readonly tippyService: NgxTippyService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setContentForTooltip();
    this.setPropsForTooltip();
    this.setContentElFef();
  }

  setContentForTooltip() {
    this.tippyService.setContent('bionic_beaver', 'Tooltip content via service');
  }

  setPropsForTooltip() {
    this.tippyPropsContent = {
      ...this.tippyPropsContent,
      content: 'Tooltip content via property',
    };
  }

  setContentElFef() {
    const { nativeElement } = this.templateRefService;
    this.tippyService.setContent('hirsute_hippo', nativeElement);
  }
}

@Component({
  selector: 't-template-component',
  template: ` <span>Content as component</span> `,
})
class DemoComponent {}
