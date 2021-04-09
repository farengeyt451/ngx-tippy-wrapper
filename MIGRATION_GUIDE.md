## Migration Guide

- From version 2.x.x to version 3.x.x

### Grouped tooltips

1. In order to pass common props use `[groupedProps]` instead of `[tippyProps]`
2. For each tooltip within `ngx-tippy-group` component you should pass `data-tippy-grouped` attribute instead of `data-tippy`

### Singleton

Whats new:

1. Singletons supports methods to control them [programmatically](https://github.com/atomiks/tippyjs/releases/tag/v6.3.0)
2. For singleton children `tippyInstances` are now being created, so on `singleton.destroy()` - the `tippyInstances` [will not be destroyed also](https://atomiks.github.io/tippyjs/v6/addons/#destroy)

Migration steps:

1. In order to pass singleton props use `singletonProps` instead of `tippyProps`
2. Now you can also pass `singletonName` for control each `singleton` instance manually
3. Pass `ngxTippy` directive for each `ngx-tippy-singleton` child
4. Attribute `data-singleton` does not need now
