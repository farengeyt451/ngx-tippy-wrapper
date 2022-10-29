import { Component, NgModule, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTippyDirective } from '../../lib/ngx-tippy.directive';
import { NgxTippyProps } from '../../lib/ngx-tippy.interfaces';
import { genericStyles } from '../styles/generic-styles';

interface TooltipComponentUtils extends TemplateTooltipComponent {
  updateClasses: (className: string) => void;
}

interface TemplateTooltipComponent {
  props?: NgxTippyProps;
  content?: string;
  className?: string;
  onTemplateClick?: (event: MouseEvent) => void;
}

/** Wrapper testing component */
@Component({
  selector: 'wrapper',
  template: `<div #container></div>`,
})
export class WrapperComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(public viewContainerRef: ViewContainerRef) {}
  tComponent!: any;

  public updateStyles(styles: string) {
    this.tComponent.updateClasses(styles);
  }

  public createInnerComponent(
    template: string,
    properties: TemplateTooltipComponent = {},
    styles: string[] = genericStyles
  ) {
    @Component({ template, styles })
    class TemplateComponent implements TemplateTooltipComponent {}

    @NgModule({ declarations: [TemplateComponent, NgxTippyDirective] })
    class TemplateModule {}

    this.clearContainerRef(this.viewContainerRef);
    this.tComponent = this.createComponent<TemplateComponent>({
      vcRef: this.viewContainerRef,
      component: TemplateComponent,
      properties,
    });
  }

  private createComponent<T extends TemplateTooltipComponent>({
    vcRef,
    component,
    properties,
  }: {
    vcRef: ViewContainerRef;
    component: Type<T>;
    properties: TemplateTooltipComponent;
  }): T {
    return Object.assign(vcRef.createComponent(component).instance, properties, {
      updateClasses: (styles: string) => {
        console.log(styles);
        this.tComponent['content'] = styles;
        console.log(this.tComponent['content']);
      },
    });
  }

  private clearContainerRef(vcRef: ViewContainerRef) {
    vcRef.clear();
  }
}
