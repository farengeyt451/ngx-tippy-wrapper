import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor() {}

  public ngOnInit() {}
}
