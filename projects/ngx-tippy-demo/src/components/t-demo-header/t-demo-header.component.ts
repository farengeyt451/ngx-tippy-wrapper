import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-header',
  templateUrl: './t-demo-header.component.html',
  styleUrls: ['./t-demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoHeaderComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
