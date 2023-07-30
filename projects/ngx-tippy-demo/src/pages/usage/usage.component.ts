import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageComponent implements OnInit, AfterViewInit {
  public readonly snippets = SNIPPETS;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
