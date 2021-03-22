import { Renderer2 } from '@angular/core';
import { NgxTippyContent, NgxTippyInstance } from './ngx-tippy.interfaces';

/**
 * Set display: "block" for content wrapper element
 *
 * @param tippyContent  { NgxTippyContent }
 * @param renderer { Renderer2 }
 */
export function setTemplateVisible(tippyContent: NgxTippyContent, renderer: Renderer2) {
  tippyContent instanceof Element && renderer.setStyle(tippyContent, 'display', 'block');
}

/**
 * Get children singleton tippy instances from storage
 *
 * @returns { Map<string, NgxTippyInstance> | null } children singleton tippy instances
 */
export function getChildrenSingletonInstances(tippyInstances: Map<string, NgxTippyInstance>): NgxTippyInstance[] | [] {
  return [...tippyInstances.values()].filter((tippyInstance) => tippyInstance.isChildOfSingleton);
}
