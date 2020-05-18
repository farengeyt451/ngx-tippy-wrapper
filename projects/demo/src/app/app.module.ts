import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTippyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
