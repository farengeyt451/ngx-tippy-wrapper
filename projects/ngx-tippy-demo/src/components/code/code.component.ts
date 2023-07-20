import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 't-demo-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {}
}
