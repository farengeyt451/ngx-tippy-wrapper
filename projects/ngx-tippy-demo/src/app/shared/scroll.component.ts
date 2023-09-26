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
          console.log(`🚀 Scrolling to:`, anchor);
          this.scroller.scrollToAnchor(anchor);
        }, 100);
    });
  }
}
