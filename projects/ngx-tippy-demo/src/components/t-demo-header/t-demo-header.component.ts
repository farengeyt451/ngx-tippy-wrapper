import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 't-demo-header',
  templateUrl: './t-demo-header.component.html',
  styleUrls: ['./t-demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TDemoHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
