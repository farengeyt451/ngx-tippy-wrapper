import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiRootModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { TDemoContentComponent } from '../components/t-demo-content/t-demo-content.component';
import { TDemoFooterComponent } from '../components/t-demo-footer';
import { TDemoHeaderComponent } from '../components/t-demo-header';
import { TDemoNavComponent } from '../components/t-demo-nav';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TDemoHeaderComponent, TDemoNavComponent, TDemoFooterComponent, TDemoContentComponent],
  imports: [
    BrowserModule,
    NgxTippyModule,
    TuiRootModule,
    TuiSvgModule,
    TuiButtonModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
