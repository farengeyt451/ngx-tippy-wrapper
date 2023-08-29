import { ViewportScroller } from '@angular/common';
import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({})
export class ScrollComponent {
  constructor(protected readonly activatedRoute: ActivatedRoute, protected readonly scroller: ViewportScroller) {}

  protected scrollToAnchorOnInit() {
    this.activatedRoute.fragment.subscribe(anchor => {
      anchor &&
        setTimeout(() => {
          this.scroller.scrollToAnchor(anchor);
        }, 0);
    });
  }

  protected onFragmentNav(anchor: string) {
    console.log(`🚀 Scroll to`, anchor);
    this.scroller.scrollToAnchor(anchor);
  }
}
