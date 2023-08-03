import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 't-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class NavComponent implements OnInit {
  public isSublistExpanded: boolean = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.pipe(takeUntil(this.destroy$)).subscribe(anchor => {
      anchor &&
        setTimeout(() => {
          this.scroller.scrollToAnchor(anchor);
        }, 0);
    });
  }

  onFragmentNav(anchor: string) {
    this.scroller.scrollToAnchor(anchor);
  }
}
