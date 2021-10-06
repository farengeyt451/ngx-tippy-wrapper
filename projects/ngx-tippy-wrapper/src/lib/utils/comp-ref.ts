import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Type } from '@angular/core';
import { ExcludeFunctions, ViewRef } from '../interfaces';

interface Args<C> {
  component: Type<C>;
  injector: Injector;
  resolver: ComponentFactoryResolver;
  appRef: ApplicationRef | undefined;
}

export class CompRef<T> implements ViewRef {
  private compRef: ComponentRef<T> | null;

  constructor(private args: Args<T>) {
    const factory = this.args.resolver.resolveComponentFactory<T>(this.args.component);
    this.compRef = factory.create(this.args.injector);
    this.args.appRef?.attachView(this.compRef.hostView);
  }

  get ref() {
    return this.compRef;
  }

  setInput<K extends keyof ExcludeFunctions<T>>(input: K, value: T[K]) {
    this.compRef && (this.compRef.instance[input] = value);

    return this;
  }

  setInputs(inputs: Partial<ExcludeFunctions<T>>) {
    this.compRef &&
      Object.keys(inputs).forEach(input => {
        (this.compRef as any).instance[input] = (inputs as any)[input];
      });

    return this;
  }

  detectChanges() {
    this.compRef?.hostView.detectChanges();
    return this;
  }

  appendTo(container: Element) {
    container.appendChild(this.getElement());

    return this;
  }

  removeFrom(container: Element) {
    container.removeChild(this.getElement());

    return this;
  }

  getRawContent() {
    return this.getElement().outerHTML;
  }

  getElement<T extends Element>(): T {
    return this.compRef?.location.nativeElement;
  }

  destroy() {
    this.compRef?.destroy();
    this.compRef = null;
  }
}
