import { NgxTippyInstance, TippyHTMLElement, ViewRef } from '../interfaces';

export const setTippyInstance = (tippyTarget: TippyHTMLElement, tippyInstance: NgxTippyInstance, viewRef: ViewRef) => {
  tippyInstance = tippyTarget._tippy;
  tippyInstance.viewRef = viewRef;
};
