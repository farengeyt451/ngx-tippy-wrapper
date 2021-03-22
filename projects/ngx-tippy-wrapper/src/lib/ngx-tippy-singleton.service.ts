import { Injectable, isDevMode } from '@angular/core';
import { NgxTippySingletonInstance } from './ngx-tippy.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgxTippySingletonService {
  private tippySingletonInstances: Map<string, NgxTippySingletonInstance> = new Map();

  constructor() {}

  /**
   * Working with storage
   */

  /**
   * Write singleton instances to storage
   *
   * @param name { string } name of tippy instance
   * @param state { NgxTippyInstance } tippy instance
   */
  setInstance(name: string, state: NgxTippySingletonInstance) {
    this.tippySingletonInstances.set(name, state);
  }

  /**
   * Get specific singleton tippy instance
   *
   * @param name { string } name of singleton tippy instance
   * @returns { NgxTippySingletonInstance | null } specific singleton tippy instance or null
   */
  getInstance(name: string): NgxTippySingletonInstance | null {
    return this.tippySingletonInstances.has(name) ? this.tippySingletonInstances.get(name) : null;
  }

  /**
   * Get all singleton tippy instances
   *
   * @returns { Map<string, NgxTippyInstance> | null } all singleton tippy instances or null
   */
  getInstances(): Map<string, NgxTippySingletonInstance> | null {
    return this.tippySingletonInstances.size ? this.tippySingletonInstances : null;
  }

  /**
   * Working with singleton tippy instance methods
   */

  /**
   * Service methods
   */

  private throwError(message: string, errorConstrictor: ErrorConstructor = Error) {
    if (!isDevMode()) return;
    throw new errorConstrictor(message);
  }
}
