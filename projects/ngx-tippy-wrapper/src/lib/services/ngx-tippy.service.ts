import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import tippy, { hideAll } from 'tippy.js';
import {
  InstanceChangeReason,
  InstanceChangeReasonEnum,
  InstancesChanges,
  NgxHideAllOptions,
  NgxTippyContent,
  NgxTippyDefaultProps,
  NgxTippyInstance,
  NgxTippyProps,
  NgxTippySingletonInstance,
} from '../interfaces';
import { setTemplateVisible } from '../utils';
import { DevModeService } from './dev-mode.service';
import { NgxViewService } from './ngx-view.service';

@Injectable({
  providedIn: 'root',
})
export class NgxTippyService {
  private tippyInstances: Map<string, NgxTippyInstance> = new Map();
  private tippySingletonInstances: Map<string, NgxTippySingletonInstance> = new Map();
  private tippyInstances$ = new Subject<InstancesChanges>();
  private renderer!: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private devModeService: DevModeService,
    private ngxViewService: NgxViewService
  ) {
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
    const instance = this.tippyInstances.get(name);

    if (instance) {
      this.throwError(`Instance with name '${name}' already exist, please pick unique [tippyName]`);
    } else {
      this.tippyInstances.set(name, state);
      this.emitInstancesChange({
        name,
        reason: InstanceChangeReasonEnum.SetInstance,
        instance: state,
      });
    }
  }

  /**
   * Get specific tippy instance
   *
   * @param name { string } name of tippy instance
   * @returns { NgxTippyInstance | undefined } specific tippy instance or undefined
   */
  getInstance(name: string): NgxTippyInstance | null {
    return this.tippyInstances.has(name) ? this.tippyInstances.get(name)! : null;
  }

  /**
   * Get all tippy instances from storage
   *
   * @returns { Map<string, NgxTippyInstance> | undefined } all tippy instances or undefined
   */
  getInstances(): Map<string, NgxTippyInstance> | null {
    return this.tippyInstances.size ? this.tippyInstances : null;
  }

  /**
   * Write singleton instances to storage
   *
   * @param name { string } name of tippy instance
   * @param state { NgxTippyInstance } tippy instance
   */
  setSingletonInstance(name: string, state: NgxTippySingletonInstance) {
    if (this.tippySingletonInstances.has(name)) {
      this.throwError(`Singleton instance with name '${name}' already exist, please pick unique [singletonName]`);
    } else {
      this.tippySingletonInstances.set(name, state);
    }
  }

  /**
   * Get specific singleton tippy instance
   *
   * @param name { string } name of singleton tippy instance
   * @returns { NgxTippySingletonInstance | undefined } specific singleton tippy instance or undefined
   */
  getSingletonInstance(name: string): NgxTippySingletonInstance | undefined {
    return this.tippySingletonInstances.get(name);
  }

  /**
   * Get all singleton tippy instances
   *
   * @returns { Map<string, NgxTippyInstance> | null } all singleton tippy instances or null
   */
  getSingletonInstances(): Map<string, NgxTippySingletonInstance> | null {
    return this.tippySingletonInstances.size ? this.tippySingletonInstances : null;
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
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Show);
  }

  /**
   * Programmatically hide the tippy
   *
   * @param name { string } name of tippy instance
   */
  hide(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Hide);
  }

  /**
   * Will hide the tippy only if the cursor is outside of the tippy's interactive region
   * This allows you to programmatically hook into interactive behavior upon a mouseleave event if implementing custom event listeners
   *
   * @param name { string } name of tippy instance
   * @param name { mouseEvent } pass the mouse event object in from your event listener
   */
  hideWithInteractivity(name: string, mouseEvent: MouseEvent) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.HideWithInteractivity, mouseEvent);
  }

  /**
   * Prevent a tippy from showing or hiding
   *
   * @param name { string } name of tippy instance
   */
  disable(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Disable);
  }

  /**
   * Re-enable a tippy
   *
   * @param name { string } name of tippy instance
   */
  enable(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Enable);
  }

  /**
   * Update any tippy props
   *
   * @param name { string } name of tippy instance
   * @param tippyProps { NgxTippyProps } new props
   */
  setProps(name: string, tippyProps: NgxTippyProps) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.SetProps, tippyProps);
  }

  /**
   * Update the content for tippy
   *
   * @param name { string } name of tippy instance
   * @param tippyContent { NgxTippyContent } new content
   */
  setContent(name: string, tippyContent: NgxTippyContent) {
    const instance = this.getInstance(name);

    if (!instance) {
      this.throwErrorInstanceExist(name);
      return;
    }

    if (tippyContent) {
      const viewRef = this.ngxViewService.getViewRefInstance(tippyContent, instance.tippyName);
      const content = viewRef.getElement();

      setTemplateVisible(tippyContent, this.renderer);

      content && instance.setContent(content);
      instance.viewRef = viewRef;

      this.emitInstancesChange({
        name,
        reason: 'setContent',
        instance,
      });
    }
  }

  /**
   * Unmount the tippy from the DOM
   *
   * @param name { string } name of tippy instance
   */
  unmount(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Unmount);
  }

  /**
   * Clears the instances delay timeouts
   *
   * @param name { string } name of tippy instance
   */
  clearDelayTimeouts(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.ClearDelayTimeouts);
  }

  /**
   * Permanently destroy and clean up the tippy instance
   *
   * @param name { string } name of tippy instance
   */
  destroy(name: string) {
    this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Destroy);
  }

  /** Working with tippy static methods */

  /**
   * Set the default props for each new tippy instance
   *
   * @param tippyProps { NgxTippyDefaultProps } default props
   */
  setDefaultProps(tippyProps: NgxTippyDefaultProps) {
    tippy.setDefaultProps(tippyProps);
  }

  /**
   * Show all tippies
   */
  showAll() {
    this.tippyInstances.forEach((instance: NgxTippyInstance, name: string) => {
      instance.show();
      this.emitInstancesChange({
        name,
        reason: 'show',
        instance,
      });
    });
  }

  /**
   * Hide all tippies or hide all except a particular one
   * Additional hide them with duration
   *
   * @param { NgxHideAllOptions } [options] - additional hiding options
   */
  hideAll(options?: NgxHideAllOptions) {
    const exclude = this.getInstance(options?.excludeName || '');
    const duration = options?.duration;

    hideAll({ duration, ...exclude });
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

  private callNativeTippyMethod(name: string, method: any, arg?: any) {
    const instance = this.getInstance(name);

    if (instance) {
      instance[method as Exclude<InstanceChangeReason, 'setInstance'>](arg);

      this.emitInstancesChange({
        name,
        reason: method,
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  private emitInstancesChange({
    name,
    reason,
    instance,
  }: {
    reason: InstanceChangeReason;
    name: string;
    instance: NgxTippyInstance;
  }) {
    this.tippyInstances$.next({ name, reason, instance });
  }

  private createRenderer(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private throwErrorInstanceExist(name: string) {
    this.throwError(`Instance with name '${name}' does not exist`);
  }
  private throwError(message: string, errorConstrictor: ErrorConstructor = Error) {
    if (this.devModeService.isDevMode()) throw new errorConstrictor(message);
  }
}
