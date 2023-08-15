import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Schemes } from '@interfaces';
import { DestroyService, SchemeService } from '@services';
import { NgxTippyInstance, NgxTippyService } from 'ngx-tippy-wrapper';
import { takeUntil } from 'rxjs';

@Component({
  selector: 't-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class DemoComponent implements OnInit, AfterViewInit {
  @ViewChild('content', { read: ElementRef }) projectedContent!: ElementRef;

  constructor(
    private readonly tippyService: NgxTippyService,
    private readonly schemeService: SchemeService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const tInstances = this.tippyService.getInstances();

    if (!tInstances) return;

    this.listenForSchemeChange(tInstances);
  }

  private listenForSchemeChange(tInstances: Map<string, NgxTippyInstance>) {
    this.schemeService.scheme$.pipe(takeUntil(this.destroy$)).subscribe(scheme => {
      const theme = scheme === Schemes.Dark ? 'light' : 'dark';
      tInstances?.forEach(tInstance => tInstance.setProps({ theme }));
    });
  }
}
