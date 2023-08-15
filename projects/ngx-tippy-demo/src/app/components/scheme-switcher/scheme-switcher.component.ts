import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { takeUntil } from 'rxjs';

@Component({
  selector: 't-demo-scheme-switcher',
  templateUrl: './scheme-switcher.component.html',
  styleUrls: ['./scheme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SchemeSwitcherComponent implements OnInit {
  protected readonly Schemes = Schemes;
  protected readonly schemesList = Object.values(Schemes).map(scheme => scheme.toLowerCase());
  protected tSchemes: NgxTippyProps = {
    arrow: false,
    theme: 'light',
    animation: 'shift-toward',
    offset: [0, 20],
  };

  constructor(protected readonly schemeService: SchemeService, private destroy$: DestroyService) {}

  ngOnInit() {
    this.listenForSchemeChanges();
  }

  protected onSchemeSelect(scheme: Schemes) {
    this.schemeService.toggleScheme(scheme);
  }

  protected onSystemSchemeToggle() {
    this.schemeService.toggleSystemScheme();
  }

  private listenForSchemeChanges() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      this.updateTippyTheme(scheme);
    });
  }

  private updateTippyTheme(selectedScheme: string) {
    this.tSchemes = {
      ...this.tSchemes,
      theme: selectedScheme === Schemes.Dark ? 'light' : 'dark',
    };
  }
}
