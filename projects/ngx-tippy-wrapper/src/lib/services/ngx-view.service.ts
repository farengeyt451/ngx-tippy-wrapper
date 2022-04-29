import { ApplicationRef, Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { NgxTippyTemplate, ViewRef } from '../ngx-tippy.interfaces';
import { CompRef, isComponent, isTemplateRef, TplRef } from '../utils';

interface TemplateViewOptions {
  vcr?: ViewContainerRef | undefined;
  context?: Record<string, any> | undefined;
}

@Injectable({ providedIn: 'root' })
export class NgxViewService {
  public viewContainerRef!: ViewContainerRef;

  constructor(private appRef: ApplicationRef) {}

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

  private createTemplate<C>(tpl: TemplateRef<C>, options: TemplateViewOptions = {}) {
    return new TplRef({
      tpl,
      context: options.context,
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
