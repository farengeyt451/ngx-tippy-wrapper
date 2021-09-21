import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { NgxTippyTemplate, TemplateViewOptions, ViewRef } from '../interfaces';
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

  createComponent<C>(component: Type<C>) {
    return new CompRef<C>({
      component,
      injector: this.injector,
      appRef: this.appRef,
      resolver: this.resolver,
    });
  }

  getViewRefInstance(content: NgxTippyTemplate, tippyName: string): ViewRef {
    let viewRef!: ViewRef;

    if (isTemplateRef(content)) {
      viewRef = this.createTemplate(content, {
        context: {
          $implicit: tippyName,
        },
      });
    } else if (isComponent(content)) {
      viewRef = this.createComponent(content);
    } else {
      viewRef = {
        getElement: () => content,
        destroy: () => {},
        detectChanges: () => {},
      };
    }

    return viewRef;
  }
}
