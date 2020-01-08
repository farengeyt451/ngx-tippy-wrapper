import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import tippy, { hideAll } from 'tippy.js';
import { NgxTippyInstance, NgxTippyProps, NgxTippyContent } from './ngx-tippy.interfaces';

@Injectable()
export class NgxTippyService {
  private tippyInstances = new Map();
  private tippyInstances$ = new BehaviorSubject(new Map());
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // ** Working with storage **
  setTippyInstances(name: string, state: NgxTippyInstance) {
    this.tippyInstances.set(name, state);
    this.emitInstancesChange();
  }

  getTippyInstance(name: string): NgxTippyInstance | null {
    return this.tippyInstances.has(name) ? this.tippyInstances.get(name) : null;
  }

  getAllTippyInstances(): Map<string, NgxTippyInstance> {
    return this.tippyInstances;
  }

  // ** Working with tippy methods **
  showTippy(name: string, transitionDuration?: number) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).show(transitionDuration);
  }

  hideTippy(name: string, transitionDuration?: number) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).hide(transitionDuration);
  }

  disableTippy(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).disable();
  }

  enableTippy(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).enable();
  }

  setTippyProps(name: string, tippyProps: NgxTippyProps) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).setProps(tippyProps);
  }

  setTippyContent(name: string, tippyContent: NgxTippyContent) {
    if (!this.tippyInstances.has(name)) return;
    this.setTippyTemplateVisible(tippyContent);
    this.tippyInstances.get(name).setContent(tippyContent);
  }

  destroyTippyInstance(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).destroy();
    this.tippyInstances.delete(name);
    this.emitInstancesChange();
  }

  setDefaultProps(tippyProps: NgxTippyProps) {
    tippy.setDefaultProps(tippyProps);
  }

  showAllTippies(transitionDuration?: number) {
    this.tippyInstances.forEach((tippyInstance: NgxTippyInstance) => {
      tippyInstance.show(transitionDuration);
    });
  }

  hideAllTippies(hideImmediately?: boolean) {
    hideAll(hideImmediately ? { duration: 0 } : {});
  }

  hideAllTippiesExcept(names: Array<string>, transitionDuration?: number) {
    Array.from(this.tippyInstances).forEach(tippyInstance => {
      !names.includes(tippyInstance[0]) && tippyInstance[1].hide(transitionDuration);
    });
  }

  // ** Service methods **
  private emitInstancesChange() {
    this.tippyInstances$.next(this.tippyInstances);
  }

  get tippyInstancesChanges() {
    return this.tippyInstances$;
  }

  setTippyTemplateVisible(tippyContent: NgxTippyContent) {
    if (typeof tippyContent === 'string') return;
    this.renderer.setStyle(tippyContent, 'display', 'block');
  }
}
