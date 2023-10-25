import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  selector: 't-demo-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
  constructor(public readonly tippyService: NgxTippyService) {}

  ngOnInit() {}

  ngAfterViewInit() {}
}
