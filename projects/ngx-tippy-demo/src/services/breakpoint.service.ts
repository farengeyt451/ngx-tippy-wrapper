import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(@Inject(WINDOW) private readonly window: Window) {}

  public isMatches(query: string) {
    return this.window.matchMedia(query).matches;
  }
}
