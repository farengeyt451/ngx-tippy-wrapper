import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TUI_SANITIZER, TuiAlertModule, TuiButtonModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { TDemoHeaderComponent } from '../components/t-demo-header';
import { TDemoNavComponent } from '../components/t-demo-nav';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TDemoHeaderComponent, TDemoNavComponent],
  imports: [
    BrowserModule,
    NgxTippyModule,
    TuiRootModule,
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
