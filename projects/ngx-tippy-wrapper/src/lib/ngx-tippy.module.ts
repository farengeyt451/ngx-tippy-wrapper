import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxTippySingletonComponent } from './ngx-tippy-singleton.component';
import { NgxTippyGroupComponent } from './ngx-tippy-group.component';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { NgxTippyService } from './ngx-tippy.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  providers: [NgxTippyService],
})
export class NgxTippyModule {}
