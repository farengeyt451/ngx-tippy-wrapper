import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { takeUntil } from 'rxjs';

@Component({
  selector: 't-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class DemoComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly tippyService: NgxTippyService,
    private readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.listenForSchemeChange();
  }

  private listenForSchemeChange() {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      const tInstances = this.tippyService.getInstances();
      const theme = scheme === Schemes.Dark ? 'light' : 'dark';

      tInstances?.forEach(tInstance => tInstance.setProps({ theme }));
    });
  }
}
