import { Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Content, DefaultProps, Instance, Props } from 'tippy.js';

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

export type NgxTippyContent = (Content | TemplateRef<any>) | null | undefined;

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

type ExcludeFunctionPropertyNames<T> = {
  [Key in keyof T]: T[Key] extends Function ? never : Key;
}[keyof T];

export type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>;
// export type Content = string | TemplateRef<any> | Type<any>;

export function isTemplateRef(value: any): value is TemplateRef<any> {
  return value instanceof TemplateRef;
}

export function isComponent(value: any): value is Type<any> {
  return typeof value === 'function';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export interface _ViewOptions {
  vcr?: ViewContainerRef | undefined;
}

export interface CompViewOptions extends _ViewOptions {
  injector?: Injector | undefined;
}

export interface TemplateViewOptions extends _ViewOptions {
  context?: Record<string, any> | undefined;
}

export type ViewOptions = _ViewOptions & CompViewOptions & TemplateViewOptions;
