import { ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { ViewRef } from '../interfaces';

interface Args<C> {
  component: Type<C>;
  viewContainerRef: ViewContainerRef;
}

export class CompRef<T> implements ViewRef {
  private compRef: ComponentRef<T> | null;

  constructor(private args: Args<T>) {
    this.compRef = this.args.viewContainerRef.createComponent<T>(this.args.component);
  }

  detectChanges() {
    this.compRef?.changeDetectorRef.detectChanges();
    return this;
  }

  getElement<T extends Element>(): T {
    return this.compRef?.location.nativeElement;
  }

  destroy() {
    this.compRef?.destroy();
    this.compRef = null;
  }
}
