import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Schemes } from '../../interfaces/schemes.enum';
import { SchemeService } from '../../services/scheme-service';

@Component({
  selector: 't-demo-scheme-switcher',
  templateUrl: './t-demo-scheme-switcher.component.html',
  styleUrls: ['./t-demo-scheme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoSchemeSwitcherComponent implements OnInit {
  public Schemes = Schemes;

  constructor(public readonly schemeService: SchemeService) {}

  ngOnInit(): void {}

  public onSchemeSelect(scheme: Schemes) {
    this.schemeService.toggleScheme(scheme);
  }

  public onSystemSchemeToggle() {
    this.schemeService.toggleSystemScheme();
  }
}
