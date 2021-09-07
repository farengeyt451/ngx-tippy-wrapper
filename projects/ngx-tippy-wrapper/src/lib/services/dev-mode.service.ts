import { Injectable, isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DevModeService {
  public isDevMode() {
    return isDevMode();
  }
}
