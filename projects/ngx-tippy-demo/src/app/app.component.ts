import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { WINDOW } from '@ng-web-apis/common';
import { DestroyService, SchemeService } from '@services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AppComponent implements OnInit {
  protected Schemes = Schemes;
  private readonly bodyClassList!: DOMTokenList;

  constructor(
    @Inject(WINDOW) readonly window: Window,
    protected readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService
  ) {
    this.bodyClassList = this.window.document.body.classList;
  }

  ngOnInit(): void {
    this.listenForSchemeChange();
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
}
