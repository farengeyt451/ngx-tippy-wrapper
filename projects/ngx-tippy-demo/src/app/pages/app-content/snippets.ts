const DATA_ATTR_SN = `<button
  ngxTippy
  data-tippy-content="Tooltip content"
>
  Button
</button>
`;

const DATA_CONTENT_PROP = `<button
  ngxTippy
  [tippyProps]="{
    allowHTML: true,
    placement: 'right',
    content: '<p>Tooltip <strong>HTML</strong> content</p>'
  }"
>
  Button
</button>`;

const DATA_DIRECTIVE_TMPL = `<button
  ngxTippy="Tooltip content"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>`;

const DATA_DIRECTIVE_COMPONENT_1 = `<button
  [ngxTippy]="content"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>`;

const DATA_DIRECTIVE_COMPONENT_2 = `@Component({
  ...
})
export class DemoComponent {
  public readonly content = 'Tooltip content';
  ...
}
`;

export const SNIPPETS = {
  data_attribute: {
    snippet: DATA_ATTR_SN,
    languages: ['html'],
  },
  data_content_prop: {
    snippet: DATA_CONTENT_PROP,
    languages: ['html'],
  },
  data_directive_tmpl: {
    snippet: DATA_DIRECTIVE_TMPL,
    languages: ['html'],
  },
  data_directive_component_1: {
    snippet: DATA_DIRECTIVE_COMPONENT_1,
    languages: ['html'],
  },
  data_directive_component_2: {
    snippet: DATA_DIRECTIVE_COMPONENT_2,
    languages: ['typescript'],
  },
};
