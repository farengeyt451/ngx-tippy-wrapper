import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent implements OnInit {
  public readonly snippets = SNIPPETS;

  constructor() {}

  ngOnInit() {}
}
