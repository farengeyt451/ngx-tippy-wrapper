export const TOOLTIP_CONTENT_DIV = '.tippy-content';
export const TOOLTIP_SINGLETON = 'button[data-tippy-singleton]';
export const TOOLTIP_GROUP = 'button[data-tippy-grouped]';
export const TOOLTIP_ROOT_DIV = 'div[data-tippy-root]';
export const TOOLTIP_BOX_DIV = '.tippy-box';
export const TOOLTIP_ARROW_DIV = '.tippy-arrow';
export const COLOR_WHITE = 'rgb(255, 255, 255)';
export const COLOR_GREY = 'rgb(51, 51, 51)';

export enum PLATFORMS {
  Browser = 'browser',
  Server = 'server',
}

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

export const singletonTemplate = `
  <div class="singleton">
    <ngx-tippy-singleton [singletonProps]="singletonProps">
      <div class="singleton__items">
        <button class="singleton__item" data-tippy-singleton ngxTippy="First tooltip content">Singleton</button>
        <button class="singleton__item" data-tippy-singleton ngxTippy="Second tooltip content">Singleton</button>
        <button class="singleton__item" data-tippy-singleton ngxTippy="Third tooltip content">Singleton</button>
      </div>
    </ngx-tippy-singleton>
  </div>
`;

export const templateOverridden = `
  <div class="singleton">
    <ngx-tippy-singleton [singletonProps]="singletonProps">
      <div class="singleton__items">
        <button
          class="singleton__item"
          ngxTippy="First tooltip content"
          data-tippy-singleton
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
        <button
          class="singleton__item"
          ngxTippy="Second tooltip content"
          data-tippy-singleton
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
        <button
          class="singleton__item"
          ngxTippy="Third tooltip content"
          data-tippy-singleton
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
      </div>
    </ngx-tippy-singleton>
  </div>
`;

export const commonStyles = `
  .singleton {
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 40px;
    background-color: #f9f8f5;
    font-family: 'Open Sans', sans-serif;
  }

  .singleton__item {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-image: linear-gradient(120deg, #54d182 0%, #3db9f5 100%);
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    cursor: pointer;
  }

  .singleton__items .singleton__item:not(:first-child) {
    margin-left: 10px;
  }
`;

export const groupTemplate = `
    <div class="tippy-group">
      <ngx-tippy-group [groupedProps]="props">
        <div class="tippy-group__items">
          <button
            class="tippy-group__item"
            data-tippy-grouped
            data-tippy-content="Tooltip content"
          >
            Group
          </button>
          <button
            class="tippy-group__item"
            data-tippy-grouped
            data-tippy-content="Tooltip content"
          >
            Group
          </button>
          <button
            class="tippy-group__item"
            data-tippy-grouped
            data-tippy-content="Tooltip content"
          >
            Group
          </button>
        </div>
      </ngx-tippy-group>
    </div>
  `;

export const groupStyles = `
      .tippy-group {
        position: relative;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        padding: 40px;
        background-color: #f9f8f5;
        font-family: 'Open Sans', sans-serif;
      }

      .tippy-group__item {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-image: linear-gradient(120deg, #54d182 0%, #3db9f5 100%);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;
      }

      .tippy-group__items .tippy-group__item:not(:first-child) {
        margin-left: 10px;
      }
    `;
