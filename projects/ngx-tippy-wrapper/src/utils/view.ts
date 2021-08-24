import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';
import {
  CompViewOptions,
  isComponent,
  isString,
  isTemplateRef,
  NgxTippyContent,
  TemplateViewOptions,
  ViewRef,
  _ViewOptions,
} from '../lib/ngx-tippy.interfaces';
import { TplRef } from './template-ref';

@Injectable({ providedIn: 'root' })
export class ViewService {
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {}

  // createComponent<C>(component: Type<C>, options: CompViewOptions = {}) {
  //   return new CompRef<C>({
  //     component,
  //     vcr: options.vcr,
  //     injector: options.injector || this.injector,
  //     appRef: this.appRef,
  //     resolver: this.resolver,
  //   });
  // }

  createTemplate<C>(tpl: TemplateRef<C>, options: TemplateViewOptions = {}) {
    return new TplRef({
      vcr: options.vcr,
      appRef: this.appRef,
      tpl,
      context: options.context,
    });
  }

  createView(
    content: NgxTippyContent,
    viewOptions: _ViewOptions & CompViewOptions & TemplateViewOptions = {}
  ): ViewRef | undefined {
    if (isTemplateRef(content)) {
      return this.createTemplate(content, viewOptions);
    } else if (isComponent(content)) {
      return;
      // return this.createComponent(content, viewOptions);
    } else if (isString(content)) {
      return;
      // return new StringRef(content);
    } else {
      throw 'Type of content is not supported';
    }
  }
}
