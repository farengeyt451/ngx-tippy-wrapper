import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { NgxTippyContent, NgxTippyTemplate, TemplateViewOptions } from '../interfaces';
import { CompRef, isComponent, isTemplateRef, TplRef } from '../utils';

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

  setTippyTemplate(content: NgxTippyContent): NgxTippyTemplate | null {
    let viewRef;
    if (isTemplateRef(content)) {
      viewRef = this.createTemplate(content, {
        context: {
          $implicit: {},
        },
      });
    }

    if (isComponent(content)) {
      viewRef = this.createComponent(content);
    }

    return viewRef?.getElement() || (content as NgxTippyTemplate);
  }
}
