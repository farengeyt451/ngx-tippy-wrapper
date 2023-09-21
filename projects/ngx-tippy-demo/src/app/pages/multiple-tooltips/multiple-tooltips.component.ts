import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SNIPPETS } from './snippets';

@Component({
  selector: 'app-multiple-tooltips',
  templateUrl: './multiple-tooltips.component.html',
  styleUrls: ['./multiple-tooltips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleTooltipsComponent implements OnInit {
  public readonly snippets = SNIPPETS;

  constructor() {}

  ngOnInit(): void {}
}
