import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TDemoContentComponent } from '@components/t-demo-content/t-demo-content.component';
import { TDemoFooterComponent } from '@components/t-demo-footer';
import { TDemoHeaderComponent } from '@components/t-demo-header';
import { TDemoNavComponent } from '@components/t-demo-nav';
import { TDemoSchemeSwitcherComponent } from '@components/t-demo-scheme-switcher';
import { TDemoSocialComponent } from '@components/t-demo-social';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SchemeService } from '../services/scheme-service';
import { AppComponent } from './app.component';

function initialize(SchemeService: SchemeService) {
  return () => SchemeService.getPreferredScheme();
}

@NgModule({
  declarations: [
    AppComponent,
    TDemoHeaderComponent,
    TDemoNavComponent,
    TDemoFooterComponent,
    TDemoContentComponent,
    TDemoSchemeSwitcherComponent,
    TDemoSocialComponent,
  ],
  imports: [
    BrowserModule,
    NgxTippyModule,
    TuiRootModule,
    TuiSvgModule,
    TuiButtonModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiAlertModule,
    FormsModule,
    TuiInputModule,
    TuiModeModule,
    TuiLetModule,
    TuiThemeNightModule,
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [SchemeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
