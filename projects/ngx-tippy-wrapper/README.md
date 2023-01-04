<div align="center">
  <img
    src="https://raw.githubusercontent.com/farengeyt451/ngx-tippy-wrapper/master/images/logo.svg"
    alt="library logo"
    height="180"
  >
</div>

<div align="center">
  <h1>Angular wrapper for tippy.js</h1>

[![GitHub branch checks state](https://img.shields.io/github/actions/workflow/status/farengeyt451/ngx-tippy-wrapper/actions.yml?branch=master&style=for-the-badge)](https://github.com/farengeyt451/ngx-tippy-wrapper/actions/workflows/actions.yml)
[![Codecov branch](https://img.shields.io/codecov/c/github/farengeyt451/ngx-tippy-wrapper/master?style=for-the-badge)](https://app.codecov.io/gh/farengeyt451/ngx-tippy-wrapper/)
[![GitHub](https://img.shields.io/github/license/farengeyt451/ngx-tippy-wrapper?color=%235599ff&style=for-the-badge)](https://github.com/farengeyt451/ngx-tippy-wrapper/blob/master/LICENSE)

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
