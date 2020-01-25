import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import tippy, { hideAll } from 'tippy.js';
import { NgxTippyInstance, NgxTippyProps, NgxTippyContent } from './ngx-tippy.interfaces';

@Injectable()
export class NgxTippyService {
  private tippyInstances: Map<string, NgxTippyInstance> = new Map();
  private tippyInstances$ = new BehaviorSubject(new Map());
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Working with storage
   */

  /**
   * Write tippy instances to storage
   *
   * @param name { string } name of tippy instance
   * @param state { state } tippy instance
   */
  setTippyInstances(name: string, state: NgxTippyInstance) {
    this.tippyInstances.set(name, state);
    this.emitInstancesChange();
  }

  /**
   * Get specific tippy instance
   *
   * @param name { string } name of tippy instance
   * @returns { NgxTippyInstance | null } specific tippy instance or null
   */
  getTippyInstance(name: string): NgxTippyInstance | null {
    return this.tippyInstances.has(name) ? this.tippyInstances.get(name) : null;
  }

  /**
   * Get all tippy instances from storage
   *
   * @returns { Map<string, NgxTippyInstance> } all tippy instances
   */
  getAllTippyInstances(): Map<string, NgxTippyInstance> {
    return this.tippyInstances;
  }

  /**
   * Working with tippy methods
   */

  /**
   * Programmatically show the tippy
   *
   * @param name { string } name of tippy instance
   * @param transitionDuration { number } animation duration in ms
   */
  showTippy(name: string, transitionDuration?: number) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).show(transitionDuration);
  }

  /**
   * Programmatically hide the tippy
   *
   * @param name { string } name of tippy instance
   * @param transitionDuration { number } animation duration in ms
   */
  hideTippy(name: string, transitionDuration?: number) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).hide(transitionDuration);
  }

  /**
   * Prevent a tippy from showing or hiding
   *
   * @param name { string } name of tippy instance
   */
  disableTippy(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).disable();
  }

  /**
   * Re-enable a tippy
   *
   * @param name { string } name of tippy instance
   */
  enableTippy(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).enable();
  }

  /**
   * Update any tippy props
   *
   * @param name { string } name of tippy instance
   * @param tippyProps { NgxTippyProps } new props
   */
  setTippyProps(name: string, tippyProps: NgxTippyProps) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).setProps(tippyProps);
  }

  /**
   * Update the content for tippy
   *
   * @param name { string } name of tippy instance
   * @param tippyContent { NgxTippyContent } new content
   */
  setTippyContent(name: string, tippyContent: NgxTippyContent) {
    if (!this.tippyInstances.has(name)) return;
    this.setTippyTemplateVisible(tippyContent);
    this.tippyInstances.get(name).setContent(tippyContent);
  }

  /**
   * Destroy and clean up the tippy instance
   *
   * @param name { string } name of tippy instance
   */
  destroyTippyInstance(name: string) {
    this.tippyInstances.has(name) && this.tippyInstances.get(name).destroy();
    this.tippyInstances.delete(name);
    this.emitInstancesChange();
  }

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
   *
   * @param transitionDuration { number } animation duration in ms
   */
  showAllTippies(transitionDuration?: number) {
    this.tippyInstances.forEach((tippyInstance: NgxTippyInstance) => {
      tippyInstance.show(transitionDuration);
    });
  }

  /**
   * Hide all visible tippies
   *
   * @param hideImmediately { boolean } hide tippy without animation
   */
  hideAllTippies(hideImmediately?: boolean) {
    hideAll(hideImmediately ? { duration: 0 } : {});
  }

  /**
   * Hide all tippies except some, passed as array
   *
   * @param names { Array<string> } array of tippies, which do not need to hide
   * @param transitionDuration { number } animation duration in ms
   */
  hideAllTippiesExcept(names: Array<string>, transitionDuration?: number) {
    Array.from(this.tippyInstances).forEach(tippyInstance => {
      !names.includes(tippyInstance[0]) && tippyInstance[1].hide(transitionDuration);
    });
  }

  /**
   * Subscription to change of tippy instances
   *
   * @returns { Observable<Map<string, NgxTippyInstance>> } observable of tippy instances change
   */
  get tippyInstancesChanges(): Observable<Map<string, NgxTippyInstance>> {
    return this.tippyInstances$.asObservable();
  }

  /**
   * Service methods
   */
  private emitInstancesChange() {
    this.tippyInstances$.next(this.tippyInstances);
  }

  private setTippyTemplateVisible(tippyContent: NgxTippyContent) {
    if (typeof tippyContent === 'string') return;
    this.renderer.setStyle(tippyContent, 'display', 'block');
  }
}
