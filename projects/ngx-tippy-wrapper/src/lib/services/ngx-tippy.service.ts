import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import tippy, { hideAll } from 'tippy.js';
import {
  InstanceChangeReason,
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
        reason: 'setInstance',
        instance: this.tippyInstances.get(name) as NgxTippyInstance,
      });
    }
  }

  /**
   * Get specific tippy instance
   *
   * @param name { string } name of tippy instance
   * @returns { NgxTippyInstance | undefined } specific tippy instance or undefined
   */
  getInstance(name: string): NgxTippyInstance | undefined {
    return this.tippyInstances.get(name);
    // if (instance) {
    //   return instance;
    // } else {
    //   console.error(`Instance with name '${name}' does not exist`);
    //   return undefined;
    // }
  }

  /**
   * Get all tippy instances from storage
   *
   * @returns { Map<string, NgxTippyInstance> | undefined } all tippy instances or undefined
   */
  getInstances(): Map<string, NgxTippyInstance> | undefined {
    return this.tippyInstances.size ? this.tippyInstances : undefined;
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
  getSingletonInstances(): Map<string, NgxTippySingletonInstance> | undefined {
    return this.tippySingletonInstances.size ? this.tippySingletonInstances : undefined;
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
    const instance = this.getInstance(name);

    if (instance) {
      instance.show();
      this.emitInstancesChange({
        name,
        reason: 'show',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Programmatically hide the tippy
   *
   * @param name { string } name of tippy instance
   */
  hide(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.hide();
      this.emitInstancesChange({
        name,
        reason: 'hide',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Will hide the tippy only if the cursor is outside of the tippy's interactive region
   * This allows you to programmatically hook into interactive behavior upon a mouseleave event if implementing custom event listeners
   *
   * @param name { string } name of tippy instance
   * @param name { mouseEvent } pass the mouse event object in from your event listener
   */
  hideWithInteractivity(name: string, mouseEvent: MouseEvent) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.hideWithInteractivity(mouseEvent);
      this.emitInstancesChange({
        name,
        reason: 'hideWithInteractivity',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Prevent a tippy from showing or hiding
   *
   * @param name { string } name of tippy instance
   */
  disable(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.disable();
      this.emitInstancesChange({
        name,
        reason: 'disable',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Re-enable a tippy
   *
   * @param name { string } name of tippy instance
   */
  enable(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.enable();
      this.emitInstancesChange({
        name,
        reason: 'enable',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Update any tippy props
   *
   * @param name { string } name of tippy instance
   * @param tippyProps { NgxTippyProps } new props
   */
  setProps(name: string, tippyProps: NgxTippyProps) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.setProps(tippyProps);
      this.emitInstancesChange({
        name,
        reason: 'setProps',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Update the content for tippy
   *
   * @param name { string } name of tippy instance
   * @param tippyContent { NgxTippyContent } new content
   */
  setContent(name: string, tippyContent: NgxTippyContent) {
    const instance = this.getInstance(name);
    const content = this.ngxViewService.setTippyTemplate(tippyContent);

    if (instance && content) {
      setTemplateVisible(tippyContent, this.renderer);
      instance.setContent(content);
      this.emitInstancesChange({
        name,
        reason: 'setContent',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * The element(s) that the trigger event listeners are added to
   * Allows you to separate the tippy's positioning from its trigger source
   *
   * @param name { string } name of tippy instance
   * @param triggerTarget { Element | Element[] } element(s) that the trigger tooltip
   */
  setTriggerTarget(name: string, triggerTarget: Element | Element[]) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.setProps({ triggerTarget });
      this.emitInstancesChange({
        name,
        reason: 'setTriggerTarget',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Unmount the tippy from the DOM
   *
   * @param name { string } name of tippy instance
   */
  unmount(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.unmount();
      this.emitInstancesChange({
        name,
        reason: 'unmount',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Clears the instances delay timeouts
   *
   * @param name { string } name of tippy instance
   */
  clearDelayTimeouts(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.clearDelayTimeouts();
      this.emitInstancesChange({
        name,
        reason: 'clearDelayTimeouts',
        instance,
      });
    } else {
      this.throwErrorInstanceExist(name);
    }
  }

  /**
   * Permanently destroy and clean up the tippy instance
   *
   * @param name { string } name of tippy instance
   */
  destroy(name: string) {
    const instance = this.getInstance(name);

    if (instance) {
      instance.destroy();
      this.emitInstancesChange({
        name,
        reason: 'destroy',
        instance,
      });
      this.tippyInstances.delete(name);
    } else {
      this.throwErrorInstanceExist(name);
    }
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
