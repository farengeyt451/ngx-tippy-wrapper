import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeComponent } from '@components/code';
import { DemoComponent } from '@components/demo';
import { FooterComponent } from '@components/footer';
import { HeaderComponent } from '@components/header';
import { NavComponent } from '@components/nav';
import { SchemeSwitcherComponent } from '@components/scheme-switcher';
import { SocialComponent } from '@components/social';
import { AppContentComponent } from '@pages/app-content';
import { ContentComponent } from '@pages/content';
import { DemoPageComponent } from '@pages/demo-page';
import { GettingStartedComponent } from '@pages/getting-started';
import { NotSupportedComponent } from '@pages/not-supported';
import { PropsComponent } from '@pages/props';
import { ServiceComponent } from '@pages/service';
import { UsageComponent } from '@pages/usage';
import { SchemeService } from '@services';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiExpandModule,
  TuiLinkModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiBadgeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiRadioLabeledModule,
} from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultOrderKeyvaluePipe } from './pipes';

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
    UsageComponent,
    DemoComponent,
    NotSupportedComponent,
    PropsComponent,
    AppContentComponent,
    ServiceComponent,
    DemoPageComponent,
    DefaultOrderKeyvaluePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HighlightModule,
    NgxTippyModule,
    ReactiveFormsModule,
    TuiAccordionModule,
    TuiAlertModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiExpandModule,
    TuiIslandModule,
    TuiInputModule,
    TuiLetModule,
    TuiLinkModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiRootModule,
    TuiSvgModule,
    TuiThemeNightModule,
    TuiRadioLabeledModule,
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
