const BASIC_USAGE_SN = `<button ngxTippy="Tooltip content">Button</button>`;
const TIPPY_NAME_SN = `<button
  ngxTippy="Tooltip content"
  tippyName="t-usage-page"
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
};
