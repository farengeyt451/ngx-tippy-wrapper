import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestroyService, SchemeService } from '@services';
import { HighlightLoader } from 'ngx-highlightjs';
import { takeUntil } from 'rxjs';
import { Schemes } from '../../interfaces/schemes.enum';

const DARK_THEME = 'assets/themes/github-dark.css';
const LIGHT_THEME = 'assets/themes/github.css';

@Component({
  selector: 't-demo-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CodeComponent implements OnInit {
  @Input() snippet!: string;
  @Input() language!: string;

  code = `<span
  ngxTippy
  data-tippy-content="Tooltip content"
  [tippyProps]="tippyProps"
>
  Element with tooltip
</span>`;

  constructor(
    private readonly hljsLoader: HighlightLoader,
    protected readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.listenSchemeChanges();
  }

  private listenSchemeChanges() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe((scheme: string) => {
      if (scheme === Schemes.Dark) {
        this.hljsLoader.setTheme(DARK_THEME);
      } else {
        this.hljsLoader.setTheme(LIGHT_THEME);
      }
    });
  }
}
