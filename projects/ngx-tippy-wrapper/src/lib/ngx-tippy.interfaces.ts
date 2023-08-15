import { TemplateRef, Type } from '@angular/core';
import { Content, DefaultProps, Instance, Props } from 'tippy.js';
import { messagesDict } from './consts';

export interface NgxTippyProps extends Partial<Props> {}

export interface NgxTippyDefaultProps extends Partial<DefaultProps> {}

export interface NgxSingletonProps extends Partial<Props> {
  overrides?: Array<keyof NgxTippyProps>;
}

export interface NgxTippyInstance extends Instance {
  tippyName: string;
  viewRef?: ViewRef;
}

export interface NgxTippySingletonInstance extends Omit<NgxTippyInstance, 'tippyName'> {
  setInstances(instances: Instance<any>[]): void;
  show(singletonTarget?: string | Instance | number): void;
  showNext(): void;
  showPrevious(): void;
}

export type NgxTippyContent = NgxTippyTemplate | null | undefined;

export type NgxTippyTemplate = Content | TemplateRef<any> | Type<any>;

export type NgxTippyContext = Record<string, any>;

export interface NgxTippyHideAllOptions {
  duration?: number;
  excludeName?: string;
}

export enum InstanceChangeReasonEnum {
  SetInstance = 'setInstance',
  Show = 'show',
  Hide = 'hide',
  HideWithInteractivity = 'hideWithInteractivity',
  Disable = 'disable',
  Enable = 'enable',
  SetProps = 'setProps',
  SetContent = 'setContent',
  Unmount = 'unmount',
  ClearDelayTimeouts = 'clearDelayTimeouts',
  Destroy = 'destroy',
}

export type InstanceChangeReason = `${InstanceChangeReasonEnum}`;

export interface InstancesChanges {
  name: string;
  reason: InstanceChangeReason;
  instance: NgxTippyInstance;
}

export interface TippyHTMLElement extends HTMLElement {
  _tippy: Instance;
}

export interface ViewRef {
  getElement(): Content | null;
  detectChanges?(): void;
  destroy?(): void;
}

export type NgxTippyMessagesDict = typeof messagesDict;

export type NgxTippyMessagesTypes = keyof typeof messagesDict;

export enum NgxTippyNamesEnum {
  TippyName = 'tippyName',
  SingletonName = 'singletonName',
}
