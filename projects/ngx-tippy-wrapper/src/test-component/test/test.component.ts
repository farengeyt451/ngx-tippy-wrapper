import { Component, OnInit, Input } from '@angular/core';
import { NgxTippyProps } from '../../lib/ngx-tippy.interfaces';

@Component({
  selector: 'tippy-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass'],
})
export class TestComponent implements OnInit {
  props: NgxTippyProps;

  constructor() {}

  ngOnInit() {
    this.setProps({
      appendTo: 'parent',
    });
  }

  setProps(props: NgxTippyProps) {
    this.props = { ...this.props, ...props };
  }
}
