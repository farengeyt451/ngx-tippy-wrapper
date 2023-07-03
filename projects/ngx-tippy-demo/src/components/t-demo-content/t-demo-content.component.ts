import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-content',
  templateUrl: './t-demo-content.component.html',
  styleUrls: ['./t-demo-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
