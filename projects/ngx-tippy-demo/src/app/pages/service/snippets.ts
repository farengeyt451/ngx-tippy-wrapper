const IMPORT_SERVICE = `import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({ ... })
export class DemoComponent implements OnInit {
  constructor(private readonly tippyService: NgxTippyService) {}
  ...
}`;

const CHANGES = `import { Subscription } from 'rxjs';
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
}`;

const CHANGES_INTERFACE = `interface InstancesChanges {
  name: string;
  reason: InstanceChangeReason;
  instance: NgxTippyInstance;
}

  type InstanceChangeReason =
  "clearDelayTimeouts"
  | "destroy"
  | "disable"
  | "enable"
  | "hide"
  | "hideWithInteractivity"
  | "setContent"
  | "setProps"
  | "show"
  | "unmount"
  | "setInstance"
}`;

export const SNIPPETS = {
  import: {
    snippet: IMPORT_SERVICE,
    languages: ['typescript'],
  },
  changes: {
    snippet: CHANGES,
    languages: ['typescript'],
  },
  changes_interface: {
    snippet: CHANGES_INTERFACE,
    languages: ['typescript'],
  },
};
