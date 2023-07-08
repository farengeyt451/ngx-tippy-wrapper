import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 't-demo-header',
  templateUrl: './t-demo-header.component.html',
  styleUrls: ['./t-demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TDemoHeaderComponent implements OnInit {
  @Output() selectedScheme = new EventEmitter<Schemes>();

  public Schemes = Schemes;

  constructor(private readonly schemeService: SchemeService, private readonly destroy$: DestroyService) {}

  public ngOnInit(): void {
    this.listenForSchemeChanges();
  }

  public onSchemeSelect(scheme: Schemes) {
    this.selectedScheme.emit(scheme);
  }

  private listenForSchemeChanges() {
    this.schemeService
      .getScheme$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(scheme => {
        console.log('🌄', scheme);
      });
  }
}
