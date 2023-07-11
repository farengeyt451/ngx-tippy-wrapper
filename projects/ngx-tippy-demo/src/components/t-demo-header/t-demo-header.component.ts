import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';

@Component({
  selector: 't-demo-header',
  templateUrl: './t-demo-header.component.html',
  styleUrls: ['./t-demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TDemoHeaderComponent implements OnInit {
  public Schemes = Schemes;

  constructor(private readonly schemeService: SchemeService, private readonly destroy$: DestroyService) {}

  public ngOnInit(): void {}
}
