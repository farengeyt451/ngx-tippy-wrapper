import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { WINDOW } from '@ng-web-apis/common';
import { BreakpointService, DestroyService, SchemeService } from '@services';
import { fromEvent, takeUntil, throttleTime } from 'rxjs';
import { MOBILE_LG } from '../constants/is-mobile.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AppComponent implements OnInit {
  protected Schemes = Schemes;
  protected isMobile!: boolean;
  private readonly bodyClassList!: DOMTokenList;

  constructor(
    @Inject(WINDOW) readonly window: Window,
    protected readonly schemeService: SchemeService,
    private readonly breakpointService: BreakpointService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.bodyClassList = this.window.document.body.classList;
  }

  ngOnInit(): void {
    this.initResizeSub();
    this.listenForSchemeChange();
    this.checkIsMobile();
  }

  private listenForSchemeChange() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      this.toggleBodyClass(scheme as Schemes);
    });
  }

  private toggleBodyClass(scheme: Schemes) {
    this.bodyClassList.remove(scheme === Schemes.Dark ? Schemes.Light : Schemes.Dark);
    this.bodyClassList.add(scheme);
  }

  private checkIsMobile() {
    this.isMobile = this.breakpointService.isMatches(MOBILE_LG);
    this.cdr.markForCheck();
  }

  private initResizeSub() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), throttleTime(100))
      .subscribe(() => {
        this.checkIsMobile();
      });
  }
}
