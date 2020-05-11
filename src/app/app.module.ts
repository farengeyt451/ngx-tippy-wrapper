import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxTippyDirective } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.directive';
import { NgxTippyService } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy.service';
import { NgxTippySingletonComponent } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy-singleton.component';
import { NgxTippyGroup } from '../../projects/ngx-tippy-wrapper/src/lib/ngx-tippy-group.component';

@NgModule({
  declarations: [AppComponent, NgxTippyDirective, NgxTippySingletonComponent, NgxTippyGroup],
  imports: [BrowserModule, AppRoutingModule],
  providers: [NgxTippyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
