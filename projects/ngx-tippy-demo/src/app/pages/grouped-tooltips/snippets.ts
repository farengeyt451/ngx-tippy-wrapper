const GROUPED_TEMPLATE_SN = `
<ngx-tippy-group [groupedProps]="groupedProps">
  <button
    *ngFor="let btn of [0, 1, 2, 3, 4]"
    data-tippy-grouped
    data-tippy-content="Tooltip content"
  >
    Button
  </button>
</ngx-tippy-group>
`;

const GROUPED_COMPONENT_SN = `
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  groupedProps: NgxTippyProps = {
    arrow: false,
    placement: 'top',
  };
  ...
}`;

const GROUPED_CUSTOM_TEMPLATE_SN = `
<ngx-tippy-group [groupedProps]="groupedProps">
  <button
    data-tippy-grouped
    data-tippy-content="Tooltip content"
  >
    Button
  </button>

  <button
    data-tippy-grouped
    data-tippy-arrow="true"
    data-tippy-content="New tooltip content"
  >
    Button
  </button>

  <button
    data-tippy-grouped
    data-tippy-placement="right"
    data-tippy-content="Another tooltip content"
  >
    Button
  </button>
</ngx-tippy-group>`;

export const SNIPPETS = {
  grouped_template: {
    snippet: GROUPED_TEMPLATE_SN,
    languages: ['html'],
  },
  grouped_component: {
    snippet: GROUPED_COMPONENT_SN,
    languages: ['typescript'],
  },
  grouped_custom_template: {
    snippet: GROUPED_CUSTOM_TEMPLATE_SN,
    languages: ['html'],
  },
};
