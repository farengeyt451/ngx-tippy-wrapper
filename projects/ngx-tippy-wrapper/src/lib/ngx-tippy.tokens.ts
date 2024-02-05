import { InjectionToken } from '@angular/core';
import { messagesDict, tippyFakeInstance } from './consts';
import { NgxTippyProps } from './ngx-tippy.interfaces';

export const NGX_TIPPY_MESSAGES = new InjectionToken<{ [key: string]: string }>('NGX_TIPPY_MESSAGES', {
  providedIn: 'root',
  factory: () => messagesDict,
});
export const TIPPY_FAKE_INSTANCE = new InjectionToken<object>('TIPPY_FAKE_INSTANCE', {
  providedIn: 'root',
  factory: () => tippyFakeInstance,
});

export const NGX_TIPPY_CONFIG = new InjectionToken<NgxTippyProps>('NGX_TIPPY_CONFIG', {
  providedIn: 'root',
  factory: () => ({}),
});
