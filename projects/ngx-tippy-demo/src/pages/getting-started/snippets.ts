const INSTALLATION_SN = `npm i ngx-tippy-wrapper --save`;
const IMPORTING_1_SN = `import { NgxTippyModule } from 'ngx-tippy-wrapper';`;
const IMPORTING_2_SN = `@NgModule({
  imports: [
    ...,
    NgxTippyModule
  ],
  ...
})`;
const IMPORTING_CSS_SN = `@import 'tippy.js/dist/tippy.css';`;
const IMPORTING_CSS_THEMES_SN = `/** Themes */
@import 'tippy.js/themes/light-border.css';
@import 'tippy.js/themes/light.css';
@import 'tippy.js/themes/material.css';
@import 'tippy.js/themes/translucent.css';`;
const IMPORTING_CSS_ANIM_SN = `/** Animations */
@import 'tippy.js/dist/backdrop.css';
@import 'tippy.js/animations/perspective.css';
@import 'tippy.js/animations/perspective-extreme.css';
@import 'tippy.js/animations/perspective-subtle.css';
@import 'tippy.js/animations/scale.css';
@import 'tippy.js/animations/scale-extreme.css';
@import 'tippy.js/animations/scale-subtle.css';
@import 'tippy.js/animations/shift-away.css';
@import 'tippy.js/animations/shift-away-extreme.css';
@import 'tippy.js/animations/shift-away-subtle.css';
@import 'tippy.js/animations/shift-toward.css';
@import 'tippy.js/animations/shift-toward-extreme.css';
@import 'tippy.js/animations/shift-toward-subtle.css';`;
const IMPORTING_CSS_ARROW_SN = `/** Arrow */
@import 'tippy.js/dist/svg-arrow.css';`;
const IMPORTING_CSS_NG_SN = `"architect": {
  "build": {
    ...,
    "options": {
    ...,
    "styles": [..., "./node_modules/tippy.js/dist/tippy.css"]
  };`;

export const SNIPPETS = {
  installation: {
    snippet: INSTALLATION_SN,
    languages: [],
  },
  importing_1: {
    snippet: IMPORTING_1_SN,
    languages: ['typescript'],
  },
  importing_2: {
    snippet: IMPORTING_2_SN,
    languages: ['typescript'],
  },
  css: {
    snippet: IMPORTING_CSS_SN,
    languages: ['css'],
  },
  themes: {
    snippet: IMPORTING_CSS_THEMES_SN,
    languages: ['css'],
  },
  anim: {
    snippet: IMPORTING_CSS_ANIM_SN,
    languages: ['css'],
  },
  arrow: {
    snippet: IMPORTING_CSS_ARROW_SN,
    languages: ['css'],
  },
  css_ng: {
    snippet: IMPORTING_CSS_NG_SN,
    languages: ['json'],
  },
};
