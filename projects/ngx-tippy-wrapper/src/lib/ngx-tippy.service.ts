import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import tippy, { hideAll } from 'tippy.js';
import {
  NgxTippyInstance,
  NgxTippyProps,
  NgxTippyContent,
  NgxHideAllOptions,
  InstancesChanges,
  InstanceChangeReason,
} from './ngx-tippy.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgxTippyService {
  private tippyInstances: Map<string, NgxTippyInstance> = new Map();
  private tippyInstances$ = new Subject<InstancesChanges>();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.createRenderer(rendererFactory);
  }

  /**
   * Working with storage
   */

  /**
   * Write tippy instances to storage
   *
   * @param name { string } name of tippy instance
   * @param state { NgxTippyInstance } tippy instance
   */
  setInstance(name: string, state: NgxTippyInstance) {
    console.log('log: NgxTippyService -> setInstance -> state', state);
    this.tippyInstances.set(name, state);
    this.emitInstancesChange('setInstance', name);
  }

  /**
   * Get specific tippy instance
   *
   * @param name { string } name of tippy instance
   * @returns { NgxTippyInstance | null } specific tippy instance or null
   */
  getInstance(name: string): NgxTippyInstance | null {
    return this.tippyInstances.has(name) ? this.tippyInstances.get(name) : null;
  }

  /**
   * Get all tippy instances from storage
   *
   * @returns { Map<string, NgxTippyInstance> | null } all tippy instances or null
   */
  getInstances(): Map<string, NgxTippyInstance> | null {
    return this.tippyInstances.size ? this.tippyInstances : null;
  }

  /**
   * Working with tippy instance methods
   */

  /**
   * Programmatically show the tippy
   *
   * @param name { string } name of tippy instance
   */
  show(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).show();
    this.emitInstancesChange('show', name);
  }

  /**
   * Programmatically hide the tippy
   *
   * @param name { string } name of tippy instance
   */
  hide(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).hide();
    this.emitInstancesChange('hide', name);
  }

  /**
   * Will hide the tippy only if the cursor is outside of the tippy's interactive region
   * This allows you to programmatically hook into interactive behavior upon a mouseleave event if implementing custom event listeners
   *
   * @param name { string } name of tippy instance
   * @param name { mouseEvent } pass the mouse event object in from your event listener
   */
  hideWithInteractivity(name: string, mouseEvent: MouseEvent) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).hideWithInteractivity(mouseEvent);
    this.emitInstancesChange('hideWithInteractivity', name);
  }

  /**
   * Prevent a tippy from showing or hiding
   *
   * @param name { string } name of tippy instance
   */
  disable(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).disable();
    this.emitInstancesChange('disable', name);
  }

  /**
   * Re-enable a tippy
   *
   * @param name { string } name of tippy instance
   */
  enable(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).enable();
    this.emitInstancesChange('enable', name);
  }

  /**
   * Update any tippy props
   *
   * @param name { string } name of tippy instance
   * @param tippyProps { NgxTippyProps } new props
   */
  setProps(name: string, tippyProps: NgxTippyProps) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).setProps(tippyProps);
    this.emitInstancesChange('setProps', name);
  }

  /**
   * Update the content for tippy
   *
   * @param name { string } name of tippy instance
   * @param tippyContent { NgxTippyContent } new content
   */
  setContent(name: string, tippyContent: NgxTippyContent) {
    if (!this.tippyInstances.has(name)) return;

    this.setTemplateVisible(tippyContent);
    this.tippyInstances.get(name).setContent(tippyContent);
    this.emitInstancesChange('setContent', name);
  }

  /**
   * The element(s) that the trigger event listeners are added to
   * Allows you to separate the tippy's positioning from its trigger source
   *
   * @param name { string } name of tippy instance
   * @param triggerTarget { Element | Element[] } element(s) that the trigger tooltip
   */
  setTriggerTarget(name: string, triggerTarget: Element | Element[]) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).setProps({ triggerTarget });
    this.emitInstancesChange('setTriggerTarget', name);
  }

  /**
   * Unmount the tippy from the DOM
   *
   * @param name { string } name of tippy instance
   */
  unmount(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).unmount();
    this.emitInstancesChange('unmount', name);
  }

  /**
   * Clears the instances delay timeouts
   *
   * @param name { string } name of tippy instance
   */
  clearDelayTimeouts(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).clearDelayTimeouts();
    this.emitInstancesChange('clearDelayTimeouts', name);
  }

  /**
   * Permanently destroy and clean up the tippy instance
   *
   * @param name { string } name of tippy instance
   */
  destroy(name: string) {
    if (!this.tippyInstances.has(name)) return;

    this.tippyInstances.get(name).destroy();
    this.emitInstancesChange('destroy', name);
    this.tippyInstances.delete(name);
  }

  /** Working with tippy static methods */

  /**
   * Set the default props for each new tippy instance
   *
   * @param tippyProps { NgxTippyProps } default props
   */
  setDefaultProps(tippyProps: NgxTippyProps) {
    tippy.setDefaultProps(tippyProps);
  }

  /**
   * Show all tippies
   */
  showAll() {
    this.tippyInstances.forEach((tippyInstance: NgxTippyInstance) => {
      tippyInstance.show();
    });
  }

  /**
   * Hide all tippies or hide all except a particular one
   * Additional hide them with duration
   *
   * @param { NgxHideAllOptions } [options] - additional hiding options
   */
  hideAll(options?: NgxHideAllOptions) {
    const exclude =
      options && this.tippyInstances.has(options.excludeName) && this.tippyInstances.get(options.excludeName);
    const duration = options && options.duration;

    hideAll({ duration, exclude });
  }

  /**
   * Subscription to change of tippy instances
   *
   * @returns { Observable<InstancesChanges> } observable of tippy instances change
   */
  get instancesChanges(): Observable<InstancesChanges> {
    return this.tippyInstances$.asObservable();
  }

  /**
   * Service methods
   */

  private emitInstancesChange(reason: InstanceChangeReason, name: string) {
    const instance = this.tippyInstances.get(name);

    this.tippyInstances$.next({ name, reason, instance });
  }

  private setTemplateVisible(tippyContent: NgxTippyContent) {
    if (typeof tippyContent === 'string') return;

    this.renderer.setStyle(tippyContent, 'display', 'block');
  }

  private createRenderer(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
}
