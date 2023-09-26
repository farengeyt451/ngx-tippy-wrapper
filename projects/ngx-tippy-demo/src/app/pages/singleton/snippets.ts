const SINGLETON_TEMPLATE_SN = `<ngx-tippy-singleton
  [singletonProps]="singletonProps"
  singletonName="eoan_ermine"
>
  <button
    *ngFor="let item of [0, 1, 2, 3]"
    ngxTippy="Tooltip content"
    data-tippy-singleton
  >
    Singleton
  </button>
</ngx-tippy-singleton>`;

const SINGLETON_COMPONENT_SN = `import { NgxSingletonProps } from 'ngx-tippy-wrapper';
import { followCursor } from 'tippy.js';

@Component({
  ...
})
class SingletonComponent {
  public readonly singletonProps: NgxSingletonProps = {
    arrow: false,
    placement: 'right',
    followCursor: true,
    plugins: [followCursor],
    offset: [-20, 20],
  };
}`;

const SINGLETON_OVER_TEMPLATE_SN = `<ngx-tippy-singleton
  [singletonProps]="singletonOverriddenProps"
>
  <button
    ngxTippy="Tooltip content"
    data-tippy-singleton
  >
    Singleton
  </button>

  <button
    ngxTippy
    data-tippy-singleton
    data-tippy-arrow="false"
    data-tippy-content="New tooltip content"
  >
    Singleton
  </button>

  <button
    ngxTippy
    data-tippy-singleton
    data-tippy-placement="right"
    data-tippy-content="Another tooltip content"
  >
    Singleton
  </button>
</ngx-tippy-singleton>`;

const SINGLETON_OVER_COMPONENT_SN = `import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class SingletonComponent {
  public readonly singletonOverriddenProps: NgxSingletonProps = {
    overrides: ['arrow', 'placement'],
  };
}`;

const SINGLETON_SMOOTH_COMPONENT_SN = `import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class SingletonComponent {
  public readonly smoothTransitions: NgxSingletonProps = {
    arrow: false,
    placement: 'top',
    moveTransition: 'transform 0.4s cubic-bezier(.22,.68,0,1.71)',
  };
}`;

const SINGLETON_PROG_TEMPLATE_SN = `<ngx-tippy-singleton singletonName="groovy_gorilla">
  <button
    ngxTippy="Tooltip content 🌥️"
    data-tippy-singleton
  >
    Singleton
  </button>

  <button
    ngxTippy="Tooltip content 🌔"
    data-tippy-singleton
  >
    Singleton
  </button>

  <button
    ngxTippy="Tooltip content 🌕"
    tippyName="edgy_eft"
    data-tippy-singleton
  >
    Singleton
  </button>
</ngx-tippy-singleton>

// Show first child
<button (click)="showTooltip(0)">
  Show first tooltip
</button>

// Show child instance at given index
<button (click)="showTooltip(1)">
  Show second tooltip
</button>

// Show child with tippyName
<button (click)="showTooltip('edgy_eft')">
  Show third tooltip
</button>
`;

const SINGLETON_PROG_COMPONENT_SN = `import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class SingletonComponent {

  constructor(private readonly tippyService: NgxTippyService) {}

  public showTooltip(id?: string | number) {
    this.tippyService.getSingletonInstance('groovy_gorilla')?.show(id);
  }
}`;

export const SNIPPETS = {
  singleton_template_sn: {
    snippet: SINGLETON_TEMPLATE_SN,
    languages: ['html'],
  },
  singleton_component_sn: {
    snippet: SINGLETON_COMPONENT_SN,
    languages: ['typescript'],
  },
  singleton_over_template_sn: {
    snippet: SINGLETON_OVER_TEMPLATE_SN,
    languages: ['html'],
  },
  singleton_over_component_sn: {
    snippet: SINGLETON_OVER_COMPONENT_SN,
    languages: ['typescript'],
  },
  singleton_smooth_component_sn: {
    snippet: SINGLETON_SMOOTH_COMPONENT_SN,
    languages: ['typescript'],
  },
  singleton_prog_template_sn: {
    snippet: SINGLETON_PROG_TEMPLATE_SN,
    languages: ['html'],
  },
  singleton_prog_component_sn: {
    snippet: SINGLETON_PROG_COMPONENT_SN,
    languages: ['typescript'],
  },
};
