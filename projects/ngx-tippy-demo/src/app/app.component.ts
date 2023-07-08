import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Schemes } from '@interfaces';
import { TuiNightThemeService } from '@taiga-ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  value = 'Hello!';
  constructor(@Inject(TuiNightThemeService) readonly night$: Observable<boolean>) {}

  ngOnInit() {}

  public onSelectedScheme(scheme: Schemes) {
    console.log(`🚀 ~ AppComponent ~ onselectedScheme ~ scheme:`, scheme);
  }
}
