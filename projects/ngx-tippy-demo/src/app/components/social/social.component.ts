import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 't-demo-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent implements OnInit {
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

  ngOnInit() {}
}
