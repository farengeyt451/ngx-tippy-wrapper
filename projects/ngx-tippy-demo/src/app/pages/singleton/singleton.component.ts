import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { NgxSingletonProps, NgxTippyService } from 'ngx-tippy-wrapper';
import { takeUntil } from 'rxjs';
import { followCursor } from 'tippy.js';
import { SNIPPETS } from './snippets';

@Component({
  selector: 'app-singleton',
  templateUrl: './singleton.component.html',
  styleUrls: ['./singleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SingletonComponent implements AfterViewInit {
  public readonly snippets = SNIPPETS;
  public isShowDemo: boolean = true;

  public singletonProps: NgxSingletonProps = {
    arrow: false,
    placement: 'right',
    followCursor: true,
    plugins: [followCursor],
    offset: [-20, 20],
  };

  public smoothTransitions: NgxSingletonProps = {
    arrow: false,
    placement: 'top',
    moveTransition: 'transform 0.4s cubic-bezier(.22,.68,0,1.71)',
  };

  public singletonOverriddenProps: NgxSingletonProps = {
    overrides: ['arrow', 'placement'],
  };

  constructor(
    private readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef,
    private readonly tippyService: NgxTippyService
  ) {}

  ngAfterViewInit() {
    this.listenForSchemeChange();
  }

  public showTooltip(id: string | number) {
    this.tippyService.getSingletonInstance('groovy_gorilla')?.show(id);
  }

  private listenForSchemeChange() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      const theme = scheme === Schemes.Dark ? 'light' : 'dark';
      this.singletonProps = {
        ...this.singletonProps,
        theme,
      };

      this.singletonOverriddenProps = {
        ...this.singletonOverriddenProps,
        theme,
      };

      this.smoothTransitions = {
        ...this.smoothTransitions,
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
