import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { NAVIGATOR } from '@ng-web-apis/common';
import { DestroyService, SchemeService } from '@services';
import { HighlightLoader } from 'ngx-highlightjs';
import { takeUntil, timer } from 'rxjs';

const DARK_THEME = 'assets/themes/github-dark.css';
const LIGHT_THEME = 'assets/themes/github.css';

@Component({
  selector: 't-demo-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.275s cubic-bezier(0.61, 1, 0.88, 1)', style({ opacity: 0.8 })),
      ]),
    ]),
  ],
})
export class CodeComponent implements OnInit {
  @Input() snippet!: string;
  @Input() languages!: string[];
  @Input() isCopyVisible?: boolean = true;

  public isCopied!: boolean;
  public isErrCopied!: boolean;

  constructor(
    private readonly hljsLoader: HighlightLoader,
    protected readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService,
    @Inject(NAVIGATOR) private readonly navigator: Navigator,
    private readonly cdr: ChangeDetectorRef
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

  copyContent() {
    if (!this.snippet) return;

    this.navigator.clipboard
      .writeText(this.snippet)
      .then(() => {
        console.log(`🌻 Content copied to clipboard ${this.snippet}`);
        this.isCopied = true;
        this.cdr.markForCheck();
      })
      .catch(err => {
        console.error(err);
        this.isErrCopied = true;
      })
      .finally(() => {
        timer(3000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.isCopied = false;
            this.cdr.markForCheck();
          });
      });
  }
}
