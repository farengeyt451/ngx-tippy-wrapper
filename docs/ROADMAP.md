1. Publish a final ngx-tippy-wrapper@6.3.1 that only changes the README: "Maintenance mode, works on Angular 14–22. Successor: <new-name>", with a link to the migration guide.
2. Run npm deprecate ngx-tippy-wrapper "Moved to <new-name> (Floating UI based, Angular 20+)". Every install then prints that message.
3. Add a banner to the old repo and docs site, and pin an issue. Answer issue #72 with the link.
4. In the new package, write a migration page with a side-by-side mapping, for example ngxTippy → <newDirective> and tippyProps → <newProps>.
5. Consider an ng add or ng update schematic that rewrites imports.
