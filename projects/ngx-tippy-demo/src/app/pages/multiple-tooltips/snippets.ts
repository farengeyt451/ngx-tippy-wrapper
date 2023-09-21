const MULTIPLE_TEMPLATE = `
<div
  ngxTippy="Left tooltip content"
  [tippyProps]="{
    placement: 'left',
    delay: [50, 100],
    animation: 'shift-toward'
  }"
>
  <div
    ngxTippy="Right tooltip content"
    [tippyProps]="{
      placement: 'right',
      delay: [100, 150],
      animation: 'shift-toward'
    }"
  >
    <button
      ngxTippy="Top tooltip content"
      [tippyProps]="{
        placement: 'top',
        delay: [200, 250],
        animation: 'shift-toward'
      }"
    >
      Button
    </button>
  </div>
</div>
`;

export const SNIPPETS = {
  multiple: {
    snippet: MULTIPLE_TEMPLATE,
    languages: ['html'],
  },
};
