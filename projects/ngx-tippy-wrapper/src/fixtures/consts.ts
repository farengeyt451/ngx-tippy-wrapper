export const serviceSpy = jasmine.createSpyObj('NgxTippyService', [
  'setInstance',
  'getInstance',
  'getInstances',
  'show',
  'hide',
  'hideWithInteractivity',
  'disable',
  'enable',
  'setProps',
  'setContent',
  'setTriggerTarget',
  'unmount',
  'clearDelayTimeouts',
  'destroy',
  'setDefaultProps',
  'showAll',
  'hideAll',
]);

export const TOOLTIP_CONTENT_DIV = '.tippy-content';
export const TOOLTIP_ROOT_DIV = 'div[data-tippy-root]';
export const TOOLTIP_BOX_DIV = '.tippy-box';
export const TOOLTIP_ARROW_DIV = '.tippy-arrow';
export const COLOR_WHITE = 'rgb(255, 255, 255)';
