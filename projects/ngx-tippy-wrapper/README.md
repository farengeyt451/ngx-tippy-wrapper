<div align="center">
  <img src="https://github.com/farengeyt451/ngx-tippy-wrapper/raw/master/logo.png" alt="Logo" height="105">
</div>

<div align="center">
  <h1>Angular wrapper for Tippy.js</h1>
</div>

## Angular 8+ wrapper for [Tippy.js](https://github.com/atomiks/tippyjs/)

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

Apply directive for element and pass content through attribute:

```html
<button ngxTippy data-tippy-content="tooltip">
  Element with tooltip
</button>
```

### Applying props

You can apply props with `tippyProps` binding

In template:

```html
<span
  ngxTippy
  data-tippy-content="tooltip with props"
  [tippyProps]="{
    arrow: false,
    placement: 'bottom'
  }"
>
  Element with tooltip
</span>
```

Or pass props from component:

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

### Implemented props

| Prop name      | Prop type     | Example                                                                            |
| -------------- | ------------- | ---------------------------------------------------------------------------------- |
| tippyProps     | NgxTippyProps | [tippyProps]="{ arrow: false, placement: 'bottom' }"                               |
| tippyName      | string        | tippyName="awesomeName"                                                            |
| tippyClassName | string        | tippyClassName="new-class" <br> _or_ <br> tippyClassName="new-class another-class" |

**tippyProps** - [list of all props](https://atomiks.github.io/tippyjs/v6/all-props/)

**tippyName** - name for tippy instance, required for accessing and control specific instance

**tippyClassName** - add custom class to the `tippy-box` element, support multiple classes passed as words separated by space

## Applying content

#### You can pass content for tooltip through:

1. **`data` attribute**:

```html
<button ngxTippy data-tippy-content="Tooltip content">
  Element with tooltip
</button>
```

This attribute can be binded:

```html
<button ngxTippy [attr.data-tippy-content]="bindedContent">
  Element with tooltip
</button>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  bindedContent: string = 'Binded tooltip content';
  ...
}
```

_Content binding_ works during component initialization, if new content should be set dynamic or reset again use [setContent](#implemented-methods) method

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

3. **`setContent()` method** :

For this method `tippyName` prop should be setted

```html
<button ngxTippy tippyName="content">
  Element with tooltip
</button>
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
    this.ngxTippyService.setContent('content', this.bindedContent);
  }
}
```

4. **`tippyProps`**:

```html
<button ngxTippy [tippyProps]="tippyProps">
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

5. **`template`**:

- Pass template reference directly

```html
<span [ngxTippy]="tippyTemplate" [tippyProps]="tippyContent" tippyName="content">
  Tippy with HTML content
</span>

<div #tippyTemplate>
  <h4>Caption</h2>
  <p>Some content</p>
  <button (click)="...">Action</button>
  ...
</div>
```

- Pass `element` or `element.innerHTML`

```html
<div>
  <span ngxTippy [tippyProps]="tippyContent" tippyName="content">
    Tippy with HTML content
  </span>

  <!-- If passing element itself -->
  <div #tippyTemplate>
    <h4>Caption</h2>
    <p>Some content</p>
    <button (click)="...">Action</button>
    ...
  </div>

  <!-- If passing element innerHTML -->
  <div #tippyTemplate style="display: none;">
    <h4>Caption</h2>
    <p>Some content</p>
    ...
  </div>
</div>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements AfterViewInit {
  @ViewChild('tippyTemplate', { read: ElementRef, static: false }) tippyTemplate: ElementRef;
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

    // Pass element innerHTML
    this.ngxTippyService.setContent('content', template.innerHTML);
  }
  ...
}
```

## Methods

_For accessing and control specific tippy instance you need pass `tippyName` prop_

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

Through service you can use all methods described [here](https://atomiks.github.io/tippyjs/v6/getting-started/) and some additional:

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

#### Available subscription to changes of tippy instances

It provides information in format:

```ts
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

{
  name: string;
  reason: InstanceChangeReason;
  instance: NgxTippyInstance;
}
```

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

## Grouped tooltips

If you want to give different Tooltip content to many different elements, while only needing to initialize once with shared props use `ngx-tippy-group` component:

<!-- prettier-ignore-start -->
```html
<ngx-tippy-group [tippyProps]="tippyProps">

  <button data-tippy-content="Tooltip content">Element with tooltip</button>

  <button data-tippy-content="Tooltip content">Element with tooltip</button>

</ngx-tippy-group>
```
<!-- prettier-ignore-end -->

Also content can be binded and shared props overridden (see [customization](https://atomiks.github.io/tippyjs/v6/customization/)):

<!-- prettier-ignore-start -->
```html
<ngx-tippy-group [tippyProps]="tippyProps">
  <button [attr.data-tippy-content]="bindedContent">Element with tooltip</button>

  <button
    [attr.data-tippy-content]="bindedHTMLContent"
    data-tippy-allowHTML="true"
  >
    Element with tooltip
  </button>

  <button
    data-tippy-content="Tooltip content"
    data-tippy-arrow="false"
  >
    Element with tooltip
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
  bindedContent: string = 'Binded tooltip content';
  bindedHTMLContent: string = '<p>Binded <strong>HTML</strong> content</p>';

  tippyProps: NgxTippyProps = { ... };
  ...
}
```

## Multiple tooltips on a single element

For using multiple tippys on a single element - nest elements with applied `ngxTippy` directive:

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
      Element with tooltip
    </div>
  </div>
</div>
```
<!-- prettier-ignore-end -->

## Singleton

For [singleton](https://atomiks.github.io/tippyjs/v6/addons/) using - put in tippys inside `ngx-tippy-singleton` component:

```html
<ngx-tippy-singleton [tippyProps]="{ ... }">
  <button ngxTippy data-tippy-content="first tooltip">
    Element with tooltip
  </button>

  <button ngxTippy data-tippy-content="second tooltip">
    Element with tooltip
  </button>
</ngx-tippy-singleton>
```

To overrides general props by the individual tippy props:

```html
<ngx-tippy-singleton [tippyProps]="{ ... }">
  <button ngxTippy data-tippy-content="first tooltip" data-tippy-placement="bottom">
    Element with tooltip
  </button>

  <button ngxTippy data-tippy-content="second tooltip" data-tippy-arrow="false">
    Element with tooltip
  </button>
</ngx-tippy-singleton>
```

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
