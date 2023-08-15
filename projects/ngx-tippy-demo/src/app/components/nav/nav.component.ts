import { ViewportScroller } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@services';
import { ScrollComponent } from '@shared';

@Component({
  selector: 't-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class NavComponent extends ScrollComponent implements OnInit, AfterViewInit {
  public isSubListExpanded: boolean = true;

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly scroller: ViewportScroller,
    protected readonly destroy$: DestroyService
  ) {
    super(activatedRoute, scroller);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.scrollToAnchorOnInit();
  }
}
