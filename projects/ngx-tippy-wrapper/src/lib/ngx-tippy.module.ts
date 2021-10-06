import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTippyGroupComponent, NgxTippySingletonComponent } from './components';
import { NgxTippyDirective } from './directives';
import { libMessagesDict, tippyFakeInstance } from './fixtures';
import { FAKE_INSTANCE_TOKEN, LIB_MESSAGES_TOKEN } from './tokens';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
  providers: [
    {
      provide: FAKE_INSTANCE_TOKEN,
      useValue: tippyFakeInstance,
    },
    {
      provide: LIB_MESSAGES_TOKEN,
      useValue: libMessagesDict,
    },
  ],
})
export class NgxTippyModule {}
