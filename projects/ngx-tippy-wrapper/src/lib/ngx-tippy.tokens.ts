import { InjectionToken } from '@angular/core';
import { messagesDict, tippyFakeInstance } from './consts';

export const NGX_TIPPY_MESSAGES = new InjectionToken<{ [key: string]: string }>('NGX_TIPPY_MESSAGES', {
  providedIn: 'root',
  factory: () => messagesDict,
});
export const TIPPY_FAKE_INSTANCE = new InjectionToken<object>('TIPPY_FAKE_INSTANCE', {
  providedIn: 'root',
  factory: () => tippyFakeInstance,
});
