import { InjectionToken, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Content, DefaultProps, Instance, Props } from 'tippy.js';

type ExcludeFunctionPropertyNames<T> = {
  [Key in keyof T]: T[Key] extends Function ? never : Key;
}[keyof T];

interface _ViewOptions {
  vcr?: ViewContainerRef | undefined;
}

export interface NgxTippyProps extends Partial<Props> {}

export interface NgxTippyDefaultProps extends Partial<DefaultProps> {}

export interface NgxSingletonProps extends Partial<Props> {
  overrides?: Array<keyof NgxTippyProps>;
}

export interface NgxTippyInstance extends Instance {
  isChildrenOfSingleton?: boolean;
}

export interface NgxTippySingletonInstance extends NgxTippyInstance {
  setInstances(instances: Instance<any>[]): void;
  show(singletonTarget?: string | Instance | number): void;
  showNext(): void;
  showPrevious(): void;
}

export type NgxTippyContent = NgxTippyTemplate | TemplateRef<any> | Type<any>;

export type NgxTippyTemplate = Content | null | undefined;

export interface NgxHideAllOptions {
  duration?: number;
  excludeName?: string;
}

export type InstanceChangeReason =
  | 'setInstance'
  | 'show'
  | 'hide'
  | 'hideWithInteractivity'
  | 'disable'
  | 'enable'
  | 'setProps'
  | 'setContent'
  | 'setTriggerTarget'
  | 'unmount'
  | 'clearDelayTimeouts'
  | 'destroy';

export interface InstancesChanges {
  name: string;
  reason: InstanceChangeReason;
  instance: NgxTippyInstance;
}

export interface TippyHTMLElement extends HTMLElement {
  _tippy: Instance;
}

export interface ViewRef {
  getElement(): Element | null;
  detectChanges(): void;
  destroy(): void;
}

export type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>;

export interface CompViewOptions extends _ViewOptions {
  injector?: Injector | undefined;
}

export interface TemplateViewOptions extends _ViewOptions {
  context?: Record<string, any> | undefined;
}

export type ViewOptions = _ViewOptions & CompViewOptions & TemplateViewOptions;

export const TIPPY_REF = new InjectionToken('TIPPY_REF');
