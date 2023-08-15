import { ViewportScroller } from '@angular/common';
import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@services';
import { takeUntil } from 'rxjs';

@Directive({
  providers: [DestroyService],
})
export class ScrollComponent implements OnInit {
  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly scroller: ViewportScroller,
    protected readonly destroy$: DestroyService
  ) {}

  ngOnInit() {
    this.activatedRoute.fragment.pipe(takeUntil(this.destroy$)).subscribe(anchor => {
      anchor &&
        setTimeout(() => {
          this.scroller.scrollToAnchor(anchor);
        }, 0);
    });
  }

  protected onFragmentNav(anchor: string) {
    this.scroller.scrollToAnchor(anchor);
  }
}
