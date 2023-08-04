import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-not-supported',
  templateUrl: './not-supported.component.html',
  styleUrls: ['./not-supported.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotSupportedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
