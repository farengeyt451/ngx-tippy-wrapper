import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
