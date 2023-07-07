import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Schemes } from '@interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}

  public onSelectedScheme(scheme: Schemes) {
    console.log(`🚀 ~ AppComponent ~ onselectedScheme ~ scheme:`, scheme);
  }
}
