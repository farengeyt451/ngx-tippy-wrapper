import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTippyGroupComponent, NgxTippySingletonComponent } from './components';
import { messagesDict, tippyFakeInstance } from './fixtures';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from './ngx-tippy.tokens';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  providers: [
    {
      provide: TIPPY_FAKE_INSTANCE,
      useValue: tippyFakeInstance,
    },
    {
      provide: NGX_TIPPY_MESSAGES,
      useValue: messagesDict,
    },
  ],
})
export class NgxTippyModule {}
