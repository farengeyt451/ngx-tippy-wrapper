<div align="center">
  <img src="https://github.com/atomiks/tippy.js-react/raw/master/logo.png" alt="Logo" height="105">
</div>

<div align="center">
  <h1>Angular wrapper for Tippy.js</h1>
</div>

## Angular 8+ wrapper for [Tippy.js](https://github.com/atomiks/tippyjs/)

## Demo

Example application: [https://ngx-tippy-wrapper.stackblitz.io](https://ngx-tippy-wrapper.stackblitz.io)

StackBlitz example: [https://stackblitz.com/edit/ngx-tippy-wrapper](https://stackblitz.com/edit/ngx-tippy-wrapper)

## Installation

Install from npm:

```js
npm i ngx-tippy-wrapper --save
```

## Importing

Import NgxTippyModule:

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
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
```

Import base style file to your main style file:

```ts
@import 'tippy.js/dist/tippy.css'
```

or angular.json:

```ts
"architect": {
"build": {
  ...,
  "options": {
    ...,
    "styles": ["./node_modules/tippy.js/dist/tippy.css", ...]
  }
```

## Using

### Basic usage

Apply directive for element and pass content through attribute:

```html
<span ngxTippy data-tippy-content="Tooltip">
  Tippy
</span>
```

#### Applying props

You can appply props with input binding

In template:

```html
<span
  ngxTippy
  data-tippy-content="Tooltip with props"
  [tippyProps]="{
    arrow: false,
    placement: 'bottom'
  }"
>
  Tippy
</span>
```

In component:

```html
<span ngxTippy data-tippy-content="Tooltip with props" [tippyProps]="tippyProps">
  Tippy
</span>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({
  ...
})
export class DemoComponent implements OnInit {
  tippyProps: NgxTippyProps = {
    trigger: 'click',
    allowHTML: true
  };
  ...
}
```

#### All props

| Prop name  | Prop type     | Example                                              |
| ---------- | ------------- | ---------------------------------------------------- |
| tippyProps | NgxTippyProps | [tippyProps]="{ arrow: false, placement: 'bottom' }" |
| tippyName  | string        | [tippyName]="'awesomeName'"                          |
| classNames | Array<string> | [classNames]="['customClass', 'nextClass']"          |

**tippyProps** - [list of all props](https://atomiks.github.io/tippyjs/all-props/)

**tippyName** - name for tippy instance, required for accessing and control specific instance

**classNames** - add custom classes to the tippy element, same as `theme` prop, but without adding `-theme` as a suffix
