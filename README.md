<div align="center">
  <img src="https://github.com/farengeyt451/ngx-tippy-wrapper/raw/master/logo.png" alt="Logo" height="105">
</div>

<div align="center">
  <h1>Angular wrapper for Tippy.js</h1>
</div>

## Angular 8+ wrapper for [Tippy.js](https://github.com/atomiks/tippyjs/)

<!-- TODO - Demo -->

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

```json
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
  data-tippy-content="Tooltip with props"
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
<span ngxTippy data-tippy-content="tooltip text" [tippyProps]="tippyProps">
  Element with tooltip
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
<button ngxTippy data-tippy-content="tooltip content">
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

@Component({...})
export class DemoComponent implements OnInit {
  bindedContent: string = 'Binded tooltip content';
  ...
}
```

_Content binding_ works during component initialization, if new content should be set dynamic or reset again use [setTippyContent](#implemented-methods) method

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
<button ngxTippy tippyName="t-content">
  Element with tooltip
</button>
```

---

```ts
...
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit, AfterViewInit {
  bindedContent: string = 'Binded tooltip content';

  constructor(private tippyService: NgxTippyService) {}

  ...

  ngAfterViewInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.ngxTippyService.setTippyContent('t-content', this.bindedContent);
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
@Component({...})
export class DemoComponent implements OnInit {
  tippyProps: NgxTippyProps = {
    ...
  }

  ...

  ngOnInit() {
    this.setContentForTooltip();
  }

  setContentForTooltip() {
    this.tippyProps.content = 'initial tooltip content'
  }
}
```

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

## Grouped tooltips

If you want to give different tooltip content to many different elements, while only needing to initialize once with shared props:

```html
<ngx-tippy-group [tippyProps]="tippyProps">
  <button data-tippy-content="some tooltip text">Element with tooltip</button>
  <button data-tippy-content="another tooltip text">Element with tooltip</button>
</ngx-tippy-group>
```

Also content can be binded and shared props overrided (see [customization](https://atomiks.github.io/tippyjs/v6/customization/)):

```html
<ngx-tippy-group [tippyProps]="tippyProps">
  <button [attr.data-tippy-content]="bindedContent">Element with tooltip</button>
  <button [attr.data-tippy-content]="bindedHTMLContent" data-tippy-allowHTML="true">
    Element with tooltip
  </button>
  <button data-tippy-content="another tooltip text" data-tippy-arrow="false">Element with tooltip</button>
</ngx-tippy-group>
```

---

```ts
...
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({...})
export class DemoComponent implements OnInit {
  bindedContent: string = 'Binded tooltip content';
  bindedHTMLContent: string = '<p>Binded <strong>HTML</strong> content</p>';

  tippyProps: NgxTippyProps = {
    placement: 'top',
    theme: 'light',
  };
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
