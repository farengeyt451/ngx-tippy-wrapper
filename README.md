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

## Demo

[Example application](https://s8q4n.csb.app/)

[Code playground](https://codesandbox.io/s/ngx-tippy-wrapper-s8q4n)

## Recommended versions to use

- **Angular 14, 15, 16**: 6.x.x
- **Angular 13**: 5.x.x
- **Angular 12**: 4.x.x
- **Angular 9, 10, 11** 3.x.x
- **Angular 8**: 2.x.x

## Installation

Install from npm:

```js
npm i ngx-tippy-wrapper --save
```

## Before upgrade

[Migration guide](./MIGRATION_GUIDE.md)

## Importing

Import `NgxTippyModule`:

```ts
import { NgxTippyModule } from 'ngx-tippy-wrapper';
```

Then in your main or feature module:

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

## Usage

### Basic usage

Apply `ngxTippy` directive for element and pass content through `data-tippy-content` attribute:

```html
<button
  ngxTippy
  data-tippy-content="Tooltip content"
>
  Element with tooltip
</button>
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
<!-- prettier-ignore-end -->

Or pass `props` from component:

```html
<span
  ngxTippy
  data-tippy-content="Tooltip content"
  [tippyProps]="tippyProps"
>
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

### Implemented props

| Prop name        | Type          | Example                                                                            |
| ---------------- | ------------- | ---------------------------------------------------------------------------------- |
| `tippyProps`     | NgxTippyProps | [tippyProps]="{ arrow: false, placement: 'bottom' }"                               |
| `tippyName`      | string        | tippyName="awesomeName"                                                            |
| `tippyClassName` | string        | tippyClassName="new-class" <br> _or_ <br> tippyClassName="new-class another-class" |
| `tippyContext`   | NgxTippyContext           | [tippyContext]="{ aKey: 'something' }" |

`tippyProps` - [list of all props](https://atomiks.github.io/tippyjs/v6/all-props/)

`tippyName` - name for tippy instance, required for accessing and control specific instance

`tippyClassName` - add custom class to the `tippy-box` element, support multiple classes passed as words separated by space

`tippyContext` - A way to bind any context you want to the template when using `ng-template`

### Initializing on condition

In some cases tooltip should be initialized conditionally. For example in case optional `@Input` property passed or not. So, if tooltip should be disabled on some conditions - you can explicitly pass `null` or `undefined` through `ngxTippy` directive.

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, AfterViewInit {
  @Input() inputContent?: string;
}
```

```html
<button
  class="t-demo__btn"
  [ngxTippy]="someCondition ? 'Content' : null"
>
  Element with tooltip
</button>

or

<button
  class="t-demo__btn"
  [ngxTippy]="inputContent"
>
  Element with tooltip
</button>
```

### Applying content

#### You can pass tooltip content through:

1. **`data` attribute**:

```html
<button
  ngxTippy
  data-tippy-content="Tooltip content"
>
  Element with tooltip
</button>
```

2. **`content` prop** :

```html
<button
  ngxTippy
  [tippyProps]="{
    allowHTML: true,
    content: '<p>Tooltip <strong>HTML</strong> content</p>'
  }"
>
  Element with tooltip
</button>
```

3. **passing content directly:**

```html
<button ngxTippy="'Directly passed content'">Element with tooltip</button>
```

&nbsp;&nbsp;&nbsp; 3.1 **passing some variable directly\*:**

```html
<button ngxTippy="content">Element with tooltip</button>
```

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, AfterViewInit {
  content: string = 'Tooltip content';

  setNewContentForTooltip() {
    this.content = 'Tooltip content'
  }
}
```

_\*Tooltip content updates automatically_

4. **`setContent()*` method** :

```html
<button
  ngxTippy
  tippyName="content"
>
  Element with tooltip
</button>
```

---

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, AfterViewInit {
  boundContent: string = 'Bound tooltip content';

  constructor(private tippyService: NgxTippyService) {}

  ...

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.tippyService.setContent('content', this.boundContent);
  }
}
```

\*_For this method `tippyName` should be defined_

\*_This method can be used for dynamic applying content at any time, not only in lifecycle hooks_

5. **`tippyProps`**:

```html
<button
  ngxTippy
  [tippyProps]="tippyProps"
>
  Element with tooltip
</button>
```

---

```ts
...
@Component({ ... })
export class DemoComponent implements OnInit {
  tippyProps: NgxTippyProps = { ... }

  ...

  ngOnInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.tippyProps.content = 'Initial tooltip content'
  }
}
```

6. **`ng-template`**:

```html
<button [ngxTippy]="tooltipTemplate" [tippyContext]="{ item: { name: 'test' }}">Element with tooltip</button>

<ng-template
  #tooltipTemplate
  let-name
  let-item="item"
>
  {{ name | json }}
  <h2>Content via ng-template, item's name = {{ item.name }}</h2>
</ng-template>
```

_\*You can get `tippyName` using outlet context_

7. **`HTML template`**

```html
<button [ngxTippy]="template">Element with tooltip</button>

<template #template>
  <h2>HTML template</h2>
</template>
```

8. **`component`**:

```html
<button [ngxTippy]="component">Element with tooltip</button>
```

---

```ts
...
import { TippyTemplateComponent } from "...";
@Component({ ... })
export class DemoComponent implements OnInit {
  public component = TippyTemplateComponent;
}
```

9. **`element reference`**:

- Pass `element reference` directly

<!-- prettier-ignore-start -->
```html
<button
  [ngxTippy]="tippyTemplate"
  tippyName="content"
  [tippyProps]="tippyContent"
>
  Element with tooltip
</button>

<div #tippyTemplate>
  <h4>Caption</h4>
  <p>Some content</p>
  <button (click)="...">Action</button>
  ...
</div>
```
<!-- prettier-ignore-end -->

- Pass `element`, `element.innerHTML` using `service`

<!-- prettier-ignore-start -->
```html
<div>
  <button
    ngxTippy
    tippyName="content"
    [tippyProps]="tippyProps"
  >
    Element with tooltip
  </button>

  <!-- If passing element itself -->
  <div #tippyTemplate>
    <h4>Caption</h4>
    <p>Some content</p>
    <button (click)="...">Action</button>
    ...
  </div>

  <!-- If passing element `innerHTML` -->
  <div #tippyTemplate style="display: none;">
    <h4>Caption</h4>
    <p>Some content</p>
    ...
  </div>
</div>
```
<!-- prettier-ignore-end -->

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements AfterViewInit {
  @ViewChild('tippyTemplate', { read: ElementRef, static: true }) tippyTemplate: ElementRef;
  tippyContent: NgxTippyProps = { ... };

  constructor(private ngxTippyService: NgxTippyService) {}

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    const template = this.tippyTemplate.nativeElement;

    // Pass element itself
    this.ngxTippyService.setContent('content', template);

    // or

    // Pass element `innerHTML`
    this.ngxTippyService.setContent('content', template.innerHTML);
  }
  ...
}
```

## Methods

Import and provide `NgxTippyService`:

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  constructor(private tippyService: NgxTippyService) {}
  ...
}
```

_For accessing and control specific tippy instance `tippyName` should be defined_

Through service you can use all methods described [here](https://atomiks.github.io/tippyjs/v6/methods/) and some additional

### Implemented methods

**Get instance(s)**

| Method name    | Method parameter/parameters | Method short description |
| -------------- | --------------------------- | ------------------------ |
| getInstance()  | `name`: string              | Get specific instance    |
| getInstances() | -                           | Get all tippy instances  |

---

**Instance methods**

| Method name             | Method parameter/parameters                     | Method short description                                                            |
| ----------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| show()                  | `name`: string                                  | Programmatically show the tippy                                                     |
| hide()                  | `name`: string                                  | Programmatically hide the tippy                                                     |
| hideWithInteractivity() | `name`: string, `mouseEvent`: MouseEvent        | Will hide the tippy only if the cursor is outside of the tippy's interactive region |
| disable()               | `name`: string                                  | Temporarily prevent a tippy from showing or hiding                                  |
| enable()                | `name`: string                                  | Re-enable a tippy                                                                   |
| setProps()              | `name`: string, `tippyProps`: NgxTippyProps     | Set/update any tippy props                                                          |
| setContent()            | `name`: string, `tippyContent`: NgxTippyContent | Set/update the content                                                              |
| unmount()               | `name`: string                                  | Unmount the tippy from the DOM                                                      |
| clearDelayTimeouts()    | `name`: string                                  | Clears the instances delay timeouts                                                 |
| destroy()               | `name`: string                                  | Permanently destroy and clean up the tippy instance                                 |

---

**Static methods**

| Method name       | Method parameter/parameters        | Method short description                                                                 |
| ----------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| setDefaultProps() | `tippyProps`: NgxTippyProps        | Set the default props for each new tippy instance                                        |
| showAll()         | -                                  | Show all tippies                                                                         |
| hideAll()         | `options?`: NgxTippyHideAllOptions | Hide all tippies or hide all except a particular one, additional hide them with duration |

### Subscription for tippy instances change

```ts
...
import { Subscription } from 'rxjs';
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, OnDestroy {
  private instancesChanges$: Subscription;

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit() {
    this.subToInstancesChanges();
  }

  ngOnDestroy() {
    this.instancesChanges$ && this.instancesChanges$.unsubscribe();
  }

  subToInstancesChanges() {
    this.instancesChanges$ =
      this.ngxTippyService.instancesChanges.subscribe((changes: InstancesChanges) => { ... });
  }

  ...
}
```

It provides information in format:

```ts
{
  name: string;
  reason: InstanceChangeReason;
  instance: NgxTippyInstance;
}

type InstanceChangeReason =
  | 'setInstance'
  | 'show'
  | 'hide'
  | 'hideWithInteractivity'
  | 'disable'
  | 'enable'
  | 'setProps'
  | 'setContent'
  | 'unmount'
  | 'clearDelayTimeouts'
  | 'destroy';
```

## Grouped tooltips

If you want to give different tooltip content to many different elements, while only needing to initialize once with shared props - use `ngx-tippy-group` component:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-group [groupedProps]="groupedProps">

  <button data-tippy-grouped data-tippy-content="Tooltip content">Element with tooltip</button>

  <button data-tippy-grouped data-tippy-content="Tooltip content">Element with tooltip</button>

</ngx-tippy-group>
```
<!-- prettier-ignore-end -->

_For each tooltip within component you should pass `data-tippy-grouped` attribute_

Also you can pass new `content` and `props` through `attribute` for every tooltip element, see [customization](https://atomiks.github.io/tippyjs/v6/customization/):

<!-- prettier-ignore-start -->
```html

<ngx-tippy-group [groupedProps]="groupedProps">
  <button
    data-tippy-grouped
    data-tippy-content="Tooltip content"
  >
    Grouped
  </button>

  <button
    data-tippy-grouped
    data-tippy-arrow="false"
    data-tippy-content="Tooltip content"
  >
    Grouped
  </button>

  <button
    data-tippy-grouped
    data-tippy-delay="[1000, 200]"
    data-tippy-content="Tooltip content"
  >
    Grouped
  </button>
</ngx-tippy-group>
```
<!-- prettier-ignore-end -->
---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  groupedProps: NgxTippyProps = { ... };
  ...
}
```

## Multiple tooltips on a single element

For multiple tooltips on a single element - use nest elements with applied `ngxTippy` directive:

<!-- prettier-ignore-start -->
```html
<div
  ngxTippy
  data-tippy-content="First tooltip content"
  [tippyProps]="{ ... }"
>
  <div
    ngxTippy
    data-tippy-content="Second tooltip content"
    [tippyProps]="{ ... }"
  >
    <button
      ngxTippy
      data-tippy-content="Third tooltip content"
      [tippyProps]="{ ... }"
    >
      Element with tooltips
    </button>
  </div>
</div>
```
<!-- prettier-ignore-end -->

## Singleton

For [singleton](https://atomiks.github.io/tippyjs/v6/addons/#singleton) - provide tooltip elements within `ngx-tippy-singleton` component:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-singleton
  [singletonProps]="singletonProps"
  singletonName="main-page"
>

  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

</ngx-tippy-singleton>
```
<!-- prettier-ignore-end-->

_For each tooltip within component you should pass `data-tippy-singleton` attribute_

Use _optional_ `singletonProps` for pass common props

Use _optional_ `singletonName` for pass unique singleton name, need to manual control specific singleton instance

**programmatically**

### Overrides props

To overrides common `singletonProps` by the individual tippy `props`:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-singleton [singletonProps]="singletonProps">
  <button
    ngxTippy="Tooltip content"
    data-tippy-placement="bottom"
    data-tippy-singleton
  >
    Singleton
  </button>

  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

  <button
    ngxTippy="Tooltip content"
    data-tippy-arrow="false"
    data-tippy-singleton
  >
    Singleton
  </button>
</ngx-tippy-singleton>
```
<!-- prettier-ignore-end -->

---

```ts
...
import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {

  singletonProps: NgxSingletonProps = {
    ...,
    overrides: ['arrow', 'placement'],
  };
  ...
}
```

### Smooth transitions

Use the `moveTransition` prop, which is the transition between moves:

```ts
...
import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {

  singletonProps: NgxSingletonProps = {
    ...,
    moveTransition: 'transform 0.4s linear',
  };
  ...
}
```

### Programmatically control singleton instance

**Get singleton instance(s)**

| Method name             | Method parameter/parameters | Method short description          |
| ----------------------- | --------------------------- | --------------------------------- |
| getSingletonInstance()  | `name`: string              | Get specific singleton instance   |
| getSingletonInstances() | -                           | Get all tippy singleton instances |

---

_You can use all methods described [here](https://atomiks.github.io/tippyjs/v6/addons/#showing-specific-tippy-instance)_

In addition for `show()` method is possible to pass child `[tippyName]` prop

<!-- prettier-ignore-start -->
```html
<ngx-tippy-singleton
  [singletonProps]="..."
  singletonName="main-page"
>
  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

  <button ngxTippy="Tooltip content" data-tippy-singleton>Singleton</button>

  <button
    ngxTippy="Tooltip content"
    [tippyName]="'custom'"
    data-tippy-singleton
  >
    Singleton
  </button>
</ngx-tippy-singleton>
```
<!-- prettier-ignore-end-->

---

```ts
...
import { NgxSingletonProps, NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {

  constructor(private tippyService: NgxTippyService) {}

  tippyProps: NgxSingletonProps = { ... };

  ngAfterViewInit() {

    // Get singleton instance by name
    const mainPageSingleton = this.tippyService.getSingletonInstance('main-page');

    // Programmatically manipulate tooltips

    // Show first child in singleton
    mainPageSingleton.show();

    // Show child instance at given index
    mainPageSingleton.show(1);

    // Show child `[tippyName]`
    mainPageSingleton.show('custom');

    ...
  }
}
```

[Documentation for v1.0.1](./docs/README-v1.01.md)

[Documentation for v2.1.0](./docs/README-v2.1.0.md)

[Documentation for v3.0.1](./docs/README-v3.0.1.md)

[Documentation for v4.0.1](./docs/README-v4.0.1.md)
