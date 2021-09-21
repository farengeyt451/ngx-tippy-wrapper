import { ApplicationRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { ViewRef } from '../interfaces';

interface CustomTmlRefArgs<C> {
  tpl: TemplateRef<C>;
  context: C;
  appRef: ApplicationRef;
}

export class TplRef<C> implements ViewRef {
  private viewRef: EmbeddedViewRef<{}> | null;
  private element!: Element | null;

  constructor(private args: CustomTmlRefArgs<C>) {
    this.viewRef = this.args.tpl.createEmbeddedView(this.args.context || ({} as C));
    this.viewRef.detectChanges();
    this.args.appRef?.attachView(this.viewRef);
  }

  detectChanges() {
    this.viewRef?.detectChanges();
  }

  getElement(): Element | null {
    if (!this.viewRef) return null;

    const rootNodes = this.viewRef.rootNodes;

    if (rootNodes.length === 1 && rootNodes[0] === Node.ELEMENT_NODE) {
      this.element = rootNodes[0];
    } else {
      this.element = document.createElement('div');
      this.element.append(...rootNodes);
    }

    return this.element;
  }

  destroy() {
    console.log('TemplateRef Destroy');

    if (!this.viewRef) return;

    if (this.viewRef.rootNodes[0] !== 1) {
      this.element?.parentNode?.removeChild(this.element);
      this.element = null;
    }

    this.viewRef.destroy();
    this.viewRef = null;
  }
}
