import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from '@components/content';
import { FooterComponent } from '@components/footer';
import { GettingStartedComponent } from '@components/getting-started';
import { HeaderComponent } from '@components/header';
import { NavComponent } from '@components/nav';
import { SchemeSwitcherComponent } from '@components/scheme-switcher';
import { SocialComponent } from '@components/social';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

function initialize(SchemeService: SchemeService) {
  return () => SchemeService.getPreferredScheme();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ContentComponent,
    SchemeSwitcherComponent,
    SocialComponent,
    GettingStartedComponent,
  ],
  imports: [
    AppRoutingModule,
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
