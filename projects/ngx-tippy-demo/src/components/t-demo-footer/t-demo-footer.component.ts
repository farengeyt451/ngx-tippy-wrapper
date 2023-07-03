import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-footer',
  templateUrl: './t-demo-footer.component.html',
  styleUrls: ['./t-demo-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
