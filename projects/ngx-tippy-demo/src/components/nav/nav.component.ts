import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 't-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  public isSublistExpanded: boolean = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
}
