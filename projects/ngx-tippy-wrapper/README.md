<div align="center">
  <img src="https://github.com/farengeyt451/ngx-tippy-wrapper/raw/master/logo.png" alt="Logo" height="105">
</div>

<div align="center">

  <h1>Angular 8+ wrapper for Tippy.js</a></h1>

[![Build Status](https://travis-ci.org/farengeyt451/ngx-tippy-wrapper.svg?branch=master)](https://travis-ci.org/farengeyt451/ngx-tippy-wrapper)
[![codecov](https://codecov.io/gh/farengeyt451/ngx-tippy-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/farengeyt451/ngx-tippy-wrapper)
![npm](https://img.shields.io/npm/dt/ngx-tippy-wrapper)
![GitHub](https://img.shields.io/github/license/farengeyt451/ngx-tippy-wrapper)

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
