import { ApplicationRef, Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { NgxTippyTemplate, ViewRef } from '../ngx-tippy.interfaces';
import { CompRef, isComponent, isTemplateRef, TplRef } from '../utils';

@Injectable({ providedIn: 'root' })
export class NgxViewService {
  constructor(private appRef: ApplicationRef, private viewContainerRef: ViewContainerRef) {}

  getViewRefInstance(content: NgxTippyTemplate, tippyName?: string): ViewRef {
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
      };
    }

    return viewRef;
  }

  private createTemplate<C>(tpl: TemplateRef<any>, context: C) {
    return new TplRef<C>({
      tpl,
      context,
      appRef: this.appRef,
    });
  }

  private createComponent<C>(component: Type<C>) {
    return new CompRef<C>({
      component,
      viewContainerRef: this.viewContainerRef,
    });
  }
}
