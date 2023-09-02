import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DestroyService } from '@services';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { InstancesChanges } from 'projects/ngx-tippy-wrapper/src/public-api';
import { takeUntil, timer } from 'rxjs';
import { SNIPPETS } from './snippets';
@Component({
  selector: 't-demo-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ServiceComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly snippets = SNIPPETS;
  public readonly discoDingo = 'disco_dingo';
  public readonly cosmicCuttlefish = 'cosmi_cuttlefish';
  public readonly yakketyYak = 'yakkety_yak';

  public changesdiscoDingo!: InstancesChanges;
  public changesCosmicCuttlefish!: InstancesChanges;
  public changesYakketyYak!: InstancesChanges;

  constructor(
    private readonly tippyService: NgxTippyService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subToInstancesChanges();
  }

  ngAfterViewInit() {
    this.startShowdiscoDingo();
    this.startShowCosmicCuttlefish();
    this.startShowYakketyYak();
  }

  ngOnDestroy() {
    this.tippyService.getInstance(this.discoDingo)?.destroy();
    this.tippyService.getInstance(this.cosmicCuttlefish)?.destroy();
    this.tippyService.getInstance(this.yakketyYak)?.destroy();
  }

  private startShowdiscoDingo() {
    timer(1000, 16000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tippyService.show(this.discoDingo);

        setTimeout(() => {
          this.tippyService.getInstance(this.discoDingo) &&
            this.tippyService.setProps(this.discoDingo, { arrow: false });
        }, 3000);

        setTimeout(() => {
          this.tippyService.getInstance(this.discoDingo) &&
            this.tippyService.setProps(this.discoDingo, { placement: 'right', offset: [-20, -80] });
        }, 6000);

        setTimeout(() => {
          this.tippyService.getInstance(this.discoDingo) &&
            this.tippyService.setProps(this.discoDingo, {
              content: 'Something new',
              animation: 'scale',
            });
        }, 9000);

        setTimeout(() => {
          this.tippyService.getInstance(this.discoDingo) && this.tippyService.hide(this.discoDingo);
        }, 12000);

        setTimeout(() => {
          this.tippyService.getInstance(this.discoDingo) &&
            this.tippyService.setProps(this.discoDingo, { placement: 'left', offset: [0, 20], arrow: true });
        }, 13000);
      });
  }

  private startShowCosmicCuttlefish() {
    timer(3000, 20000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tippyService.show(this.cosmicCuttlefish);

        setTimeout(() => {
          this.tippyService.getInstance(this.cosmicCuttlefish) &&
            this.tippyService.setProps(this.cosmicCuttlefish, {
              content: '😄',
            });
        }, 9000);

        setTimeout(() => {
          this.tippyService.getInstance(this.cosmicCuttlefish) && this.tippyService.hide(this.cosmicCuttlefish);
        }, 15000);
      });
  }

  private startShowYakketyYak() {
    timer(5000, 15000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tippyService.show(this.yakketyYak);

        setTimeout(() => {
          this.tippyService.getInstance(this.yakketyYak) && this.tippyService.disable(this.yakketyYak);
        }, 5000);

        setTimeout(() => {
          this.tippyService.getInstance(this.yakketyYak) && this.tippyService.enable(this.yakketyYak);
        }, 8000);
      });
  }

  subToInstancesChanges() {
    this.tippyService.instancesChanges.pipe(takeUntil(this.destroy$)).subscribe((changes: InstancesChanges) => {
      console.log(`⭐ Changes:`, changes);
      if (changes.name === this.discoDingo) {
        this.changesdiscoDingo = changes;
      }

      if (changes.name === this.cosmicCuttlefish) {
        this.changesCosmicCuttlefish = changes;
      }

      if (changes.name === this.yakketyYak) {
        this.changesYakketyYak = changes;
      }

      this.cdr.markForCheck();
    });
  }
}
