import { Component, ComponentRef, NgModule, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTippyDirective } from '../../lib/ngx-tippy.directive';
import { NgxTippyProps } from '../../lib/ngx-tippy.interfaces';

interface TemplateTooltipComponent {
  props?: NgxTippyProps;
  content?: string;
  onTemplateClick?: (event: MouseEvent) => void;
}

/** Wrapper testing component */
@Component({
  selector: 'wrapper',
  template: `<div #container></div>`,
})
export class TestInlineComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(public viewContainerRef: ViewContainerRef) {}

  public addComponent(template: string, styles: string[], properties: TemplateTooltipComponent = {}) {
    @Component({ template, styles })
    class TemplateComponent implements TemplateTooltipComponent {}

    @NgModule({ declarations: [TemplateComponent, NgxTippyDirective] })
    class TemplateModule {}

    this.clearContainerRef(this.viewContainerRef);

    const component = this.createComponent<TemplateComponent>({
      vcRef: this.viewContainerRef,
      component: TemplateComponent,
    });

    this.setComponentProps<TemplateComponent>({ component, properties });
  }

  private setComponentProps<T extends TemplateTooltipComponent>({
    component,
    properties,
  }: {
    component: ComponentRef<T>;
    properties: TemplateTooltipComponent;
  }) {
    Object.assign(component.instance, properties);
  }

  private createComponent<T>({ vcRef, component }: { vcRef: ViewContainerRef; component: Type<T> }): ComponentRef<T> {
    return vcRef.createComponent(component);
  }

  private clearContainerRef(vcRef: ViewContainerRef) {
    vcRef.clear();
  }
}
