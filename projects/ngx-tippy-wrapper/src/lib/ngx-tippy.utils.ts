import { Renderer2 } from '@angular/core';
import { NgxTippyContent } from './ngx-tippy.interfaces';

/**
 * Set display: "block" for content wrapper element
 *
 * @param tippyContent  { NgxTippyContent }
 * @param renderer { Renderer2 }
 */
export function setTemplateVisible(tippyContent: NgxTippyContent, renderer: Renderer2) {
  tippyContent instanceof Element && renderer.setStyle(tippyContent, 'display', 'block');
}
