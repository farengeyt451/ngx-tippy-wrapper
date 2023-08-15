import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { SchemeService } from '@services';

@Component({
  selector: 't-demo-not-supported',
  templateUrl: './not-supported.component.html',
  styleUrls: ['./not-supported.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotSupportedComponent implements OnInit {
  protected Schemes = Schemes;

  constructor(protected readonly schemeService: SchemeService) {}

  ngOnInit() {}
}
