import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { SNIPPETS } from './snippets';

@Component({
  selector: 'app-grouped-tooltips',
  templateUrl: './grouped-tooltips.component.html',
  styleUrls: ['./grouped-tooltips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedTooltipsComponent implements OnInit {
  public readonly snippets = SNIPPETS;
  public readonly groupedProps: NgxTippyProps = {
    arrow: false,
    placement: 'top',
  };

  constructor() {}

  ngOnInit(): void {}
}
