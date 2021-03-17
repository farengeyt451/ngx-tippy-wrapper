import { Renderer2 } from '@angular/core';
import { NgxTippyContent, NgxTippyInstance } from './ngx-tippy.interfaces';

export function setTemplateVisible(tippyContent: NgxTippyContent, renderer: Renderer2) {
  tippyContent instanceof Element && renderer.setStyle(tippyContent, 'display', 'block');
}

/**
 * Get child singleton tippy instances from storage
 *
 * @returns { Map<string, NgxTippyInstance> | null } child singleton tippy instances or null
 */
export function getChildrenSingletonInstances(tippyInstances: Map<string, NgxTippyInstance>): NgxTippyInstance[] | [] {
  return [...tippyInstances.values()].filter((tippyInstance) => tippyInstance.isChildrenSingleton);
}
