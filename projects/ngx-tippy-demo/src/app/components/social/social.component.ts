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
      key: 'heart',
      link: null,
      routerLink: '/sponsor',
    },
    {
      key: 'linkedin',
      link: 'https://www.linkedin.com/in/alexander-kislov',
      routerLink: null,
    },
    {
      key: 'github',
      link: 'https://github.com/farengeyt451',
      routerLink: null,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
