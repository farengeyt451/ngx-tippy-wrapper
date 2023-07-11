import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { Schemes } from '../interfaces/schemes.enum';
import { SchemeService } from '../services/scheme-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  value = 'Hello!';
  isDark!: any;
  isSystem!: boolean;

  readonly change$ = this.schemeService;

  constructor(
    // @Inject(TuiNightThemeService) readonly night$: Observable<boolean>,
    public readonly schemeService: SchemeService
  ) {}

  ngOnInit() {
    this.schemeService.scheme$
      .pipe(
        tap(s => {
          console.log('night$', s);
          this.isDark = s === Schemes.Dark ? true : false;
        })
      )
      .subscribe();

    this.schemeService.isSystemScheme$
      .pipe(
        tap(s => {
          console.log(`🚀 isSystem:`, s);
          this.isSystem = s;
        })
      )
      .subscribe();
  }
}
