<div align="center">
  <img src="https://github.com/farengeyt451/ngx-tippy-wrapper/raw/master/logo.png" alt="Logo" height="105">
</div>

<div align="center">
  <h1>Angular wrapper for Tippy.js</h1>
</div>

## Angular 8+ wrapper for [Tippy.js](https://github.com/atomiks/tippyjs/)

<!-- ## Demo

[Demo](https://ngx-tippy-wrapper.stackblitz.io)

[StackBlitz example](https://stackblitz.com/edit/ngx-tippy-wrapper) -->

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
    ...
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

### Applying props

You can apply props with input binding

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

Or pass props from component:

```html
<span ngxTippy data-tippy-content="Tooltip with props" [tippyProps]="tippyProps">
  Tippy
</span>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  tippyProps: NgxTippyProps = {
    trigger: 'click',
    allowHTML: true
  };
  ...
}
```

### Implemented props

| Prop name  | Prop type     | Example                                              |
| ---------- | ------------- | ---------------------------------------------------- |
| tippyProps | NgxTippyProps | [tippyProps]="{ arrow: false, placement: 'bottom' }" |
| tippyName  | string        | [tippyName]="'awesomeName'"                          |
| classNames | Array<string> | [classNames]="['customClass', 'nextClass']"          |

**tippyProps** - [list of all props](https://atomiks.github.io/tippyjs/all-props/)

**tippyName** - name for tippy instance, required for accessing and control specific instance

**classNames** - add custom classes to the tippy element, same as `theme` prop, but without adding `-theme` as a suffix

## Applying different types of content

- **String**

```html
<span ngxTippy [tippyProps]="tippyPropsWithString">
  Tippy with string content
</span>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  tippyPropsWithString: NgxTippyProps = {
    content: '<strong>Bolded content</strong>'
  };
  ...
}
```

- **Element or Element.innerHTML**

```html
<div>
  <span ngxTippy [tippyProps]="tippyContent">
    Tippy with HTML content
  </span>

  <!-- If passing element itself -->
  <div #tippyTemplate>
    <span>Some content</span>
    <h2>Caption</h2>
    <button>Action</button>
    ...
  </div>

  <!-- If passing element innerHTML -->
  <div #tippyTemplate style="display: none;">
    <span>Some content</span>
    <h2>Caption</h2>
    <button>Action</button>
    ...
  </div>
</div>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  @ViewChild('tippyTemplate', { static: true }) tippyTemplate: ElementRef;

  tippyContent: NgxTippyProps = {...};

  ngOnInit() {
    // Pass element itself
    this.tippyContent.content = this.tippyTemplate.nativeElement;

    // Pass element innerHTML
    this.tippyContent.content = this.tippyTemplate.nativeElement.innerHTML;
  }
  ...
}
```

## Methods

For accessing and control specific tippy instance you need pass `tippyName` prop

Then import NgxTippyService:

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  constructor(private tippyService: NgxTippyService) {}
  ...
}
```

Through service you can use all methods described [here](https://atomiks.github.io/tippyjs/methods/) and some additional:

### Implemented methods

| Method name                | Method parameter/parameters                 | Method short description                           |
| -------------------------- | ------------------------------------------- | -------------------------------------------------- |
| **Working with instances** |
| getTippyInstance()         | name: string                                | Get specific instance                              |
| getAllTippyInstances()     | -                                           | Get all tippy instances                            |
| **Tippy state management** |
| showTippy()                | name: string, transitionDuration?: number   | Programmatically show the tippy                    |
| hideTippy()                | name: string, transitionDuration?: number   | Programmatically hide the tippy                    |
| disableTippy()             | name: string                                | Temporarily prevent a tippy from showing or hiding |
| enableTippy()              | name: string                                | Re-enable a tippy                                  |
| setTippyProps()            | name: string, tippyProps: NgxTippyProps     | Update any tippy props                             |
| setTippyContent()          | name: string, tippyContent: NgxTippyContent | Update the content for tippy                       |
| destroyTippyInstance()     | name: string                                | Destroy and clean up the tippy instance            |
| **Static methods**         |
| setDefaultProps()          | tippyProps: NgxTippyProps                   | Set the default props for each new tippy instance  |
| showAllTippies()           | transitionDuration? :number                 | Show all tippies                                   |
| hideAllTippies()           | hideImmediately?: boolean                   | Hide all visible tippies                           |
| hideAllTippiesExcept()     | names: Array, transitionDuration?: number   | Hide all tippies except some, passed as array      |

#### Available subscription to change of tippy instances

```ts
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.tippyService.tippyInstancesChanges.subscribe(...);
  }
  ...
}
```

## Multiple tippys on a single element

For using multiple tippys on a single element - nest elements with applied directive:

<!-- prettier-ignore-start -->
```html
<div
  ngxTippy
  data-tippy-content="First tooltip"
  [tippyProps]="{
    placement: 'top'
  }"
>
  <div
    ngxTippy
    data-tippy-content="Second tooltip"
    [tippyProps]="{
      placement: 'bottom'
    }"
  >
    <div
      ngxTippy
      data-tippy-content="Third tooltip"
      [tippyProps]="{
        placement: 'right'
      }"
    >
      Tippy root element
    </div>
  </div>
</div>
```
<!-- prettier-ignore-end -->

## [Singleton](https://atomiks.github.io/tippyjs/addons/#singleton)

For singleton using - put in tippys inside ngx-tippy-singleton component:

```html
<ngx-tippy-singleton [tippyProps]="{...}">
  <button ngxTippy data-tippy-content="First tooltip">
    Button
  </button>
  <button ngxTippy data-tippy-content="Second tooltip">
    Button
  </button>
</ngx-tippy-singleton>
```
