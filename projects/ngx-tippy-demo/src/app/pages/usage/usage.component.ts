import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { SNIPPETS } from './snippets';

@Component({
  selector: 't-demo-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageComponent implements OnInit, AfterViewInit {
  public readonly snippets = SNIPPETS;
  public readonly userEmailTippy = 'jammy_jellyfish';

  public userEmail!: string;

  constructor(private readonly tippyService: NgxTippyService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.showValidationTooltip();
  }

  private showValidationTooltip() {
    this.tippyService.show(this.userEmailTippy);
  }
}
