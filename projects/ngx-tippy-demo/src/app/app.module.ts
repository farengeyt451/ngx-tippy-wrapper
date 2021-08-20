import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTippyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
