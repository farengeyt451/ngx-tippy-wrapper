import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Schemes } from '@interfaces';

@Component({
  selector: 't-demo-header',
  templateUrl: './t-demo-header.component.html',
  styleUrls: ['./t-demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoHeaderComponent implements OnInit {
  @Output() selectedScheme = new EventEmitter<Schemes>();

  public Schemes = Schemes;

  constructor() {}

  public ngOnInit(): void {}

  public onSchemeSelect(scheme: Schemes) {
    this.selectedScheme.emit(scheme);
  }
}
