const PROPS_TEMPLATE_SN = `<button
  ngxTippy="Tooltip content"
  [tippyProps]="{
    arrow: false,
    placement: 'right'
  }"
>
  Button
</button>`;

const PROPS_COMPONENT_SN = `<button
  ngxTippy="Tooltip content"
  [tippyProps]="tippyProps"
>
  Button
</button>`;

const PROPS_COMPONENT_2_SN = `import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class PropsComponent {
  public readonly tippyProps: NgxTippyProps = {
    arrow: false,
    placement: 'right',
    followCursor: true,
    plugins: [followCursor],
    offset: [-20, 20],
  };
}`;

const PROPS_DEFAULT = `import { NGX_TIPPY_CONFIG } from 'ngx-tippy-wrapper';

@Component({
  providers: [
    {
      provide: NGX_TIPPY_CONFIG,
      useValue: {
        delay: [0, 500],
        theme: 'light',
        arrow: false,
      },
    }
  ]
})
export class DemoComponent {
}`;

export const SNIPPETS = {
  props_template: {
    snippet: PROPS_TEMPLATE_SN,
    languages: ['html'],
  },
  props_component: {
    snippet: PROPS_COMPONENT_SN,
    languages: ['html'],
  },
  props_component_2: {
    snippet: PROPS_COMPONENT_2_SN,
    languages: ['typescript'],
  },
  props_default: {
    snippet: PROPS_DEFAULT,
    languages: ['typescript'],
  },
};
