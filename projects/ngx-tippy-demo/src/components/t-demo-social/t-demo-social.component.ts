import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-social',
  templateUrl: './t-demo-social.component.html',
  styleUrls: ['./t-demo-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TDemoSocialComponent implements OnInit {
  protected readonly socials = [
    {
      key: 'linkedin',
      link: 'https://www.linkedin.com/in/alexander-kislov',
    },
    {
      key: 'github',
      link: 'https://github.com/farengeyt451',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
