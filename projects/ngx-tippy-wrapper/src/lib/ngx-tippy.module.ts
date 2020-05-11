import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxTippySingletonComponent } from './ngx-tippy-singleton.component';
import { NgxTippyGroup } from './ngx-tippy-group.component';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { NgxTippyService } from './ngx-tippy.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippySingletonComponent, NgxTippyDirective],
  exports: [NgxTippyDirective, NgxTippyGroup, NgxTippySingletonComponent],
  providers: [NgxTippyService],
})
export class NgxTippyModule {}
