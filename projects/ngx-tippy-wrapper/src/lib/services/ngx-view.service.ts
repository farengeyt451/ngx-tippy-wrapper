import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { TemplateViewOptions } from '../interfaces';
import { CompRef, TplRef } from '../utils';

@Injectable({ providedIn: 'root' })
export class NgxViewService {
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {}

  createTemplate<C>(tpl: TemplateRef<C>, options: TemplateViewOptions = {}) {
    return new TplRef({
      appRef: this.appRef,
      tpl,
      context: options.context,
    });
  }

  createComponent<C>(component: Type<C>, options: any = {}) {
    return new CompRef<C>({
      component,
      vcr: options.vcr,
      injector: options.injector || this.injector,
      appRef: this.appRef,
      resolver: this.resolver,
    });
  }
}
