import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { followCursor } from 'tippy.js';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropsComponent implements OnInit {
  public readonly snippets = SNIPPETS;

  public readonly tippyProps: NgxTippyProps = {
    arrow: false,
    placement: 'right',
    followCursor: true,
    plugins: [followCursor],
    offset: [-20, 20],
  };

  constructor() {}

  ngOnInit() {}
}
