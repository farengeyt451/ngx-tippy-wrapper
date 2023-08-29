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

const DATA_SET_CONTENT_TMPL = `<button
  ngxTippy
  tippyName="bionic_beaver"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>
`;

const DATA_SET_CONTENT_COMPONENT = `import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  ...
})

export class DemoComponent implements AfterViewInit {
  constructor(private readonly tippyService: NgxTippyService) {}

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.tippyService.setContent('bionic_beaver', 'Tooltip content via service');
  }
}
`;

const DATA_PROPS_TMPL = `<button
  ngxTippy
  [tippyProps]="tippyPropsContent"
>
  Button
</button>
`;

const DATA_PROPS_COMPONENT = `import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class AppContentComponent implements AfterViewInit {
  public tippyPropsContent: NgxTippyProps = {
    placement: 'right',
  };

  ngAfterViewInit() {
    this.setPropsForTooltip();
  }

  setPropsForTooltip() {
    this.tippyPropsContent = {
      ...this.tippyPropsContent,
      content: 'Tooltip content via property',
    };
  }
}
`;

const DATA_NG_TEMPLATE_TMPL = `<button
  [ngxTippy]="tooltipTemplate"
  tippyName="trusty_tahr"
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

const DATA_HTML_TEMPLATE_TPPL = `<button
  [ngxTippy]="tooltipHTMLTemplate"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>

<template #tooltipHTMLTemplate>
  ...
</template>
`;

const DATA_COMPONENT_TPPL = `<button
  [ngxTippy]="componentContent"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>
`;

const DATA_COMPONENT_COMPONENT = `@Component({
  ...
})
export class AppContentComponent {
  public readonly componentContent = DemoComponent;
}

@Component({
  template: '<span>Content as component</span>',
})
class DemoComponent {}
`;

const DATA_EL_REF_TEMPLATE = `<button
  [ngxTippy]="tippyTemplateRef"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>

<div #tippyTemplateRef>
  <h6 class="tui-text_h6">Caption</h6>
  <p class="tui-text_body-m-2">Tooltip content</p>
</div>
`;

const DATA_EL_REF_SERVICE_TMPL = `<button
  ngxTippy
  tippyName="hirsute_hippo"
  [tippyProps]="{
    placement: 'right'
  }"
>
  Button
</button>`;

const DATA_EL_REF_SERVICE_COMPONENT = `@Component({
  ...
})
export class AppContentComponent implements AfterViewInit {
  @ViewChild('templateRefService', { read: ElementRef, static: true })
  templateRefService!: ElementRef;

  constructor(private readonly tippyService: NgxTippyService) {}

  ngAfterViewInit() {
    this.setContentElFef();
  }

  setContentElFef() {
    const { nativeElement } = this.templateRefService;
    this.tippyService.setContent('hirsute_hippo', nativeElement);
  }
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
  data_set_content_template: {
    snippet: DATA_SET_CONTENT_TMPL,
    languages: ['html'],
  },
  data_set_content_component: {
    snippet: DATA_SET_CONTENT_COMPONENT,
    languages: ['typescript'],
  },
  data_tippy_props_template: {
    snippet: DATA_PROPS_TMPL,
    languages: ['html'],
  },
  data_tippy_props_component: {
    snippet: DATA_PROPS_COMPONENT,
    languages: ['typescript'],
  },
  data_ng_template: {
    snippet: DATA_NG_TEMPLATE_TMPL,
    languages: ['html'],
  },
  data_html_template: {
    snippet: DATA_HTML_TEMPLATE_TPPL,
    languages: ['html'],
  },
  data_component_template: {
    snippet: DATA_COMPONENT_TPPL,
    languages: ['html'],
  },
  data_component_component: {
    snippet: DATA_COMPONENT_COMPONENT,
    languages: ['typescript'],
  },
  data_el_ref_template: {
    snippet: DATA_EL_REF_TEMPLATE,
    languages: ['html'],
  },
  data_el_ref_service_tmpl: {
    snippet: DATA_EL_REF_SERVICE_TMPL,
    languages: ['html'],
  },
  data_el_ref_service_component: {
    snippet: DATA_EL_REF_SERVICE_COMPONENT,
    languages: ['typescript'],
  },
};
