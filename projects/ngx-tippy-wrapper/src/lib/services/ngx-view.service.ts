import { ApplicationRef, Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { NgxTippyTemplate, TemplateViewOptions, ViewRef } from '../interfaces';
import { CompRef, isComponent, isTemplateRef, TplRef } from '../utils';

@Injectable({ providedIn: 'root' })
export class NgxViewService {
  public viewContainerRef!: ViewContainerRef;

  constructor(private appRef: ApplicationRef) {}

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
      viewContainerRef: this.viewContainerRef,
    });
  }

  getViewRefInstance(content: NgxTippyTemplate): ViewRef {
    let viewRef!: ViewRef;

    if (isTemplateRef(content)) {
      viewRef = this.createTemplate(content, {
        context: {
          $implicit: 'placeholder',
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
