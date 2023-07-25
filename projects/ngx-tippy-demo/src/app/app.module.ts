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
  TuiLinkModule,
  TuiModeModule,
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { TuiBadgeModule, TuiInputModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { CodeComponent } from '../components/code';
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
    CodeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HighlightModule,
    NgxTippyModule,
    TuiLinkModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiInputModule,
    TuiLetModule,
    TuiModeModule,
    TuiRootModule,
    TuiSvgModule,
    TuiThemeNightModule,
    TuiBadgeModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          json: () => import('highlight.js/lib/languages/json'),
        },
        themePath: 'assets/themes/default.css',
      },
    },
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
