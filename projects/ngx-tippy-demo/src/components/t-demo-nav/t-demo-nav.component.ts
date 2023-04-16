import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-nav',
  templateUrl: './t-demo-nav.component.html',
  styleUrls: ['./t-demo-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
