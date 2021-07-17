import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTippyGroupComponent } from './ngx-tippy-group.component';
import { NgxTippySingletonComponent } from './ngx-tippy-singleton.component';
import { NgxTippyDirective } from './ngx-tippy.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  providers: [],
})
export class NgxTippyModule {}
