import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxTippyDirective } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.directive';
import { NgxTippyService } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.service';

@NgModule({
  declarations: [AppComponent, NgxTippyDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [NgxTippyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
