import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { takeUntil } from 'rxjs';
import { SNIPPETS } from './snippets';

@Component({
  selector: 'app-grouped-tooltips',
  templateUrl: './grouped-tooltips.component.html',
  styleUrls: ['./grouped-tooltips.component.scss'],
  providers: [DestroyService],
})
export class GroupedTooltipsComponent implements AfterViewInit {
  public readonly snippets = SNIPPETS;
  public isShowDemo: boolean = false;
  public groupedProps: NgxTippyProps = {
    arrow: false,
    placement: 'top',
  };

  constructor(
    private readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.listenForSchemeChange();
  }

  private listenForSchemeChange() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      const theme = scheme === Schemes.Dark ? 'light' : 'dark';
      this.groupedProps = {
        ...this.groupedProps,
        theme,
      };

      this.isShowDemo = false;
      this.cdr.markForCheck();

      setTimeout(() => {
        this.isShowDemo = true;
        this.cdr.markForCheck();
      }, 0);
    });
  }
}
