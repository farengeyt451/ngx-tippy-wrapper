<div align="center">
  <img src="https://raw.githubusercontent.com/farengeyt451/ngx-tippy-wrapper/master/images/logo.svg" alt="library logo" height="180">
</div>

<div align="center">
  <h1>Angular wrapper for <a href="https://atomiks.github.io/tippyjs/">Tippy.js</a></h1>

[![GitHub branch checks state](https://img.shields.io/github/checks-status/farengeyt451/ngx-tippy-wrapper/master?color=%2300ba00&label=unit-tests&logo=jasmine&style=flat-square)](https://github.com/farengeyt451/ngx-tippy-wrapper/actions)
[![GitHub branch checks state](https://img.shields.io/github/checks-status/farengeyt451/ngx-tippy-wrapper/master?color=%2300ba00&label=build&logo=github&style=flat-square)](https://github.com/farengeyt451/ngx-tippy-wrapper/actions)
[![Codecov branch](https://img.shields.io/codecov/c/gh/farengeyt451/ngx-tippy-wrapper/branch/master?color=%2300ba00&logo=codecov&style=flat-square&token=DXO20XP4F6)](https://app.codecov.io/gh/farengeyt451/ngx-tippy-wrapper/)
[![npm](https://img.shields.io/npm/dw/ngx-tippy-wrapper?color=%230879b9&logo=npm&style=flat-square)](https://www.npmjs.com/package/ngx-tippy-wrapper)
[![GitHub](https://img.shields.io/github/license/farengeyt451/ngx-tippy-wrapper?color=%230879b9&logo=MicroStrategy&style=flat-square)](https://github.com/farengeyt451/ngx-tippy-wrapper/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/ngx-tippy-wrapper?color=%230879b9&logo=Webpack&style=flat-square)](https://bundlephobia.com/package/ngx-tippy-wrapper)

</div>

## Documentation

Full documentation you can find in [repository](https://github.com/farengeyt451/ngx-tippy-wrapper)

## Demo

[Example application](https://s8q4n.csb.app/)

[Code playground](https://codesandbox.io/s/ngx-tippy-wrapper-s8q4n)

## Installation

Install from npm:

```js
npm i ngx-tippy-wrapper --save
```

## Importing

Import `NgxTippyModule`:

```ts
import { NgxTippyModule } from 'ngx-tippy-wrapper';
```

Then in your base module:

```ts
@NgModule({
    imports: [
        ...,
        NgxTippyModule
    ],
    ...
})
```

Import `tippy.css` style file to your main style file:

```css
@import 'tippy.js/dist/tippy.css';
```

or angular.json:

```ts
"architect": {
"build": {
  ...,
  "options": {
    ...,
    "styles": [..., "./node_modules/tippy.js/dist/tippy.css"]
  }
```

## Using

### Basic usage

Apply `ngxTippy` directive for element and pass content through `data-tippy-content` attribute:

```html
<button ngxTippy data-tippy-content="Tooltip content">Element with tooltip</button>
```

### Applying props

You can apply props with `tippyProps` binding

In template:

<!-- prettier-ignore-start -->
```html
<button
  ngxTippy
  data-tippy-content="Tooltip content"
  [tippyProps]="{
    arrow: false,
    placement: 'bottom'
  }"
>
  Element with tooltip
</button>
```

Or pass `props` from component:

```html
<span ngxTippy data-tippy-content="Tooltip content" [tippyProps]="tippyProps">
  Element with tooltip
</span>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  tippyProps: NgxTippyProps = {
    trigger: 'click',
    allowHTML: true,
  };
  ...
}
```
<!-- prettier-ignore-end -->
