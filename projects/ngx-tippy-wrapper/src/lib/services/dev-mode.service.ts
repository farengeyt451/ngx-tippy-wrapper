import { Injectable, isDevMode } from '@angular/core';

interface isDevMode {
  isDevMode: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class DevModeService implements isDevMode {
  public isDevMode() {
    return isDevMode();
  }
}
