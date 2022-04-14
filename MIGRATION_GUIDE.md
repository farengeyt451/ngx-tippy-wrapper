## Migration Guide

- From version 2.x.x to version 3.x.x

### Grouped tooltips

1. In order to pass common props use `[groupedProps]` instead of `[tippyProps]`
2. For each tooltip within `ngx-tippy-group` component you should pass `data-tippy-grouped` attribute instead of `data-tippy`

### Singleton

What's new:

1. Singletons supports methods to control them [programmatically](https://github.com/atomiks/tippyjs/releases/tag/v6.3.0)
2. For singleton children `tippyInstances` are now being created, so on `singleton.destroy()` - the `tippyInstances` [will not be destroyed also](https://atomiks.github.io/tippyjs/v6/addons/#destroy)

Migration steps:

1. In order to pass singleton props use `singletonProps` instead of `tippyProps`
2. Now you can also pass `singletonName` for control each `singleton` instance manually
3. Pass `ngxTippy` directive for each `ngx-tippy-singleton` child
4. Attribute `data-singleton` does not need now

- From version 3.x.x to version 4.x.x

What's new:

1. Pass content via ng-template
2. Pass component as tooltip template
3. Auto update tooltip content, properties, name and class names (passed through `ngxTippy` directive)
4. Update dependencies
5. Fix `singleton` initialization condition

Migration steps:

1. Instead `setTriggerTarget` method from service, set `triggerTarget` via properties
2. Pass `data-tippy-singleton` attribute for each child tooltip within `ngx-tippy-singleton` component
