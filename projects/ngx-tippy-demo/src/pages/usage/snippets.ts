const BASIC_USAGE_SN = `<button ngxTippy="Tooltip content">Button</button>`;
const TIPPY_NAME_SN = `<button
  ngxTippy="Tooltip content"
  tippyName="lunar_lobster"
>
  Button
</button>`;

const TIPPY_PROPS_SN = `<button
  ngxTippy="Tooltip content"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>`;

const TIPPY_CLASS_HTML_SN = `<button
  ngxTippy="Tooltip content"
  tippyClassName="custom-class"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>`;

const TIPPY_CLASS_CSS_SN = `
.tippy-box[data-theme~=light].custom-class {
  color: #44c596;
}

.tippy-box[data-theme~=dark].custom-class {
  background-color: #44c596;
  color: #222;

  .tippy-arrow {
    color: #44c596;
  }
}`;

const TIPPY_CONTEXT_SN = `<button
  [ngxTippy]="tooltipTemplate"
  tippyName="kinetic_kudu"
  [tippyContext]="{ data: { foo: 'bar' }}"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>

<ng-template
  #tooltipTemplate
  let-name
  let-data="data"
>
  <div>Content via <b>ng-template</b></div>
  <div><b>name:</b> {{ name }}</div>
  <div><b>data:</b> {{ data.foo }}</div>
</ng-template>`;

const TIPPY_CONDITION_SN = `<input
  [(ngModel)]="userEmail"
  [ngxTippy]="userEmail ? null : 'Email is required'"
  [tippyProps]="{
    placement: 'right',
    trigger: 'mouseenter click'
  }"
>`;

export const SNIPPETS = {
  basic_usage: {
    snippet: BASIC_USAGE_SN,
    languages: ['html'],
  },
  t_name: {
    snippet: TIPPY_NAME_SN,
    languages: ['html'],
  },
  t_props: {
    snippet: TIPPY_PROPS_SN,
    languages: ['html'],
  },
  t_class_html: {
    snippet: TIPPY_CLASS_HTML_SN,
    languages: ['html'],
  },
  t_class_css: {
    snippet: TIPPY_CLASS_CSS_SN,
    languages: ['css'],
  },
  t_context: {
    snippet: TIPPY_CONTEXT_SN,
    languages: ['html'],
  },
  t_condition: {
    snippet: TIPPY_CONDITION_SN,
    languages: ['html'],
  },
};
