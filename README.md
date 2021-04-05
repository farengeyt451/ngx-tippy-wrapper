<div align="center">
  <img src="https://github.com/farengeyt451/ngx-tippy-wrapper/raw/master/images/logo.png" alt="Logo" height="105">
</div>

<div align="center">
  <h1>Angular 8+ wrapper for Tippy.js</h1>

[![Build Status](https://travis-ci.org/farengeyt451/ngx-tippy-wrapper.svg?branch=master)](https://travis-ci.org/farengeyt451/ngx-tippy-wrapper)
[![codecov](https://codecov.io/gh/farengeyt451/ngx-tippy-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/farengeyt451/ngx-tippy-wrapper)
![npm](https://img.shields.io/npm/dt/ngx-tippy-wrapper)
![GitHub](https://img.shields.io/github/license/farengeyt451/ngx-tippy-wrapper)

</div>

## Demo

[Example application](https://s8q4n.csb.app/)

[Code playground](https://codesandbox.io/s/ngx-tippy-wrapper-s8q4n)

[Run demo locally](./projects/demo/README.md)

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

## Usage

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
<!-- prettier-ignore-end -->

Or pass `props` from component:

```html
<span ngxTippy data-tippy-content="Tooltip content" [tippyProps]="tippyProps"> Element with tooltip </span>
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

`tippyProps` - [list of all props](https://atomiks.github.io/tippyjs/v6/all-props/)

`tippyName` - name for tippy instance, required for accessing and control specific instance

`tippyClassName` - add custom class to the `tippy-box` element, support multiple classes passed as words separated by space

### Initializing on condition

In some cases tooltip should be initialized conditionally. For example in case optional `@Input` property passed or not. So, if tooltip should not initialize - you can explicitly pass `null` through ngxTippy directive or bind possible `undefined` property:

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, AfterViewInit {
  @Input() inputContent?: string;
}
```

```html
<button class="t-demo__btn" [ngxTippy]="someCondition ? 'Content' : null">Element with tooltip</button>

or

<button class="t-demo__btn" [ngxTippy]="inputContent">Element with tooltip</button>
```

### Applying content

#### You can pass tooltip content through:

1. **`data` attribute**:

```html
<button ngxTippy data-tippy-content="Tooltip content">Element with tooltip</button>
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

3. **passing `string` directly:**

```html
<button ngxTippy="Directly passed content">Element with tooltip</button>
```

4. **`setContent()*` method** :

```html
<button ngxTippy tippyName="content">Element with tooltip</button>
```

---

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit, AfterViewInit {
  bindedContent: string = 'Binded tooltip content';

  constructor(private tippyService: NgxTippyService) {}

  ...

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.tippyService.setContent('content', this.bindedContent);
  }
}
```

\*_For this method `tippyName` should be defined_

\*_This method can be used for dynamic applying content at any time, not only in lifecycle hooks_

5. **`tippyProps`**:

```html
<button ngxTippy [tippyProps]="tippyProps">Element with tooltip</button>
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

6. **`template`**:

- Pass `template reference` directly

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

- Pass `element`, `element.innerHTML`

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

| Method name             | Method parameter/parameters                           | Method short description                                                            |
| ----------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| show()                  | `name`: string                                        | Programmatically show the tippy                                                     |
| hide()                  | `name`: string                                        | Programmatically hide the tippy                                                     |
| hideWithInteractivity() | `name`: string, `mouseEvent`: MouseEvent              | Will hide the tippy only if the cursor is outside of the tippy's interactive region |
| disable()               | `name`: string                                        | Temporarily prevent a tippy from showing or hiding                                  |
| enable()                | `name`: string                                        | Re-enable a tippy                                                                   |
| setProps()              | `name`: string, `tippyProps`: NgxTippyProps           | Set/update any tippy props                                                          |
| setContent()            | `name`: string, `tippyContent`: NgxTippyContent       | Set/update the content                                                              |
| setTriggerTarget()      | `name`: string, `triggerTarget`: Element \| Element[] | Set/update the trigger source                                                       |
| unmount()               | `name`: string                                        | Unmount the tippy from the DOM                                                      |
| clearDelayTimeouts()    | `name`: string                                        | Clears the instances delay timeouts                                                 |
| destroy()               | `name`: string                                        | Permanently destroy and clean up the tippy instance                                 |

---

**Static methods**

| Method name       | Method parameter/parameters   | Method short description                                                                 |
| ----------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| setDefaultProps() | `tippyProps`: NgxTippyProps   | Set the default props for each new tippy instance                                        |
| showAll()         | -                             | Show all tippies                                                                         |
| hideAll()         | `options?`: NgxHideAllOptions | Hide all tippies or hide all except a particular one, additional hide them with duration |

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
  | 'setTriggerTarget'
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

For [singleton](https://atomiks.github.io/tippyjs/v6/addons/) - provide tooltips elements within `ngx-tippy-singleton` component:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-singleton
  [singletonProps]="singleton"
  [singletonName]="'main-page'"
>
  <button ngxTippy="Tooltip content">Singleton</button>
  <button ngxTippy="Tooltip content">Singleton</button>
  <button ngxTippy="Tooltip content">Singleton</button>
</ngx-tippy-singleton>
```
<!-- prettier-ignore-end-->

Use _optional_ `[singletonProps]` for pass shared tooltips props

Use _optional_ `[singletonName]` for pass unique singleton name, need to control singletons
**programmatically**

### To overrides general `singletonProps` by the individual tippy `props`:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-singleton [singletonProps]="singletonProps">
  <button
    ngxTippy="Tooltip content"
    data-tippy-placement="bottom"
  >
    Singleton
  </button>

  <button ngxTippy="Tooltip content">Singleton</button>

  <button
    ngxTippy="Tooltip content"
    data-tippy-arrow="false"
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

  tippyProps: NgxSingletonProps = {
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

  tippyProps: NgxSingletonProps = {
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
<ngx-tippy-singleton [singletonProps]="singleton" [singletonName]="'main-page'">
  <button ngxTippy="Tooltip content">Singleton</button>

  <button ngxTippy="Tooltip content">Singleton</button>

  <button
    ngxTippy="Tooltip content"
    [tippyName]="'custom'"
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

    // Show first child in singleton
    this.tippyService.getSingletonInstance('main-page').show();

    // Show child instance at given index
    this.tippyService.getSingletonInstance('main-page').show(1);

    // Show child `[tippyName]`
    this.tippyService.getSingletonInstance('main-page').show('custom');
  }
}
```

[Documentation for v1.0.1](./docs/README-v1.01.md)
[Documentation for v2.1.0](./docs/README-v2.1.0.md)
