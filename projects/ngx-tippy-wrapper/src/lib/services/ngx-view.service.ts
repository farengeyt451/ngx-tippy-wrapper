import { ApplicationRef, Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { NgxTippyContext, NgxTippyTemplate, ViewRef } from '../ngx-tippy.interfaces';
import { CompRef, isComponent, isHTMLTemplate, isTemplateRef, TplRef } from '../utils';

@Injectable({ providedIn: 'root' })
export class NgxViewService {
  public viewContainerRef!: ViewContainerRef;

  constructor(private appRef: ApplicationRef) {}

  getViewRefInstance(content: NgxTippyTemplate, tippyName?: string, tippyContext: NgxTippyContext = {}): ViewRef {
    let viewRef!: ViewRef;

    if (isTemplateRef(content)) {
      tippyContext.$implicit = tippyName;
      viewRef = this.createTemplate(content, tippyContext);
    } else if (isComponent(content)) {
      viewRef = this.createComponent(content);
    } else if (isHTMLTemplate(content)) {
      viewRef = {
        getElement: () => content.content,
      };
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
