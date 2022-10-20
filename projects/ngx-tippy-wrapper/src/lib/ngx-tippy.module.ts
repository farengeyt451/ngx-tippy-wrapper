import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTippyGroupComponent, NgxTippySingletonComponent } from './components';
import { NgxTippyDirective } from './ngx-tippy.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
})
export class NgxTippyModule {}
