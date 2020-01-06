import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxTippyModule } from 'ngx-tippy-wrapper';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxTippyModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
