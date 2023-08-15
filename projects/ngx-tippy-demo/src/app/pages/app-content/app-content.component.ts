import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@services';
import { ScrollComponent } from '@shared';
import { CONTENT_METHODS } from './constants';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AppContentComponent extends ScrollComponent implements OnInit {
  public readonly snippets = SNIPPETS;
  public readonly contentMethods = CONTENT_METHODS;
  public readonly content = 'Tooltip content';

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly scroller: ViewportScroller,
    protected readonly destroy$: DestroyService
  ) {
    super(activatedRoute, scroller, destroy$);
  }

  ngOnInit() {}
}
