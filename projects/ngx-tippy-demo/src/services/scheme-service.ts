import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PREFERS_LIGHT } from '@constants';
import { Schemes } from '@interfaces';
import { WINDOW } from '@tokens';
import { fromEvent } from 'rxjs';

const PREFERRED_SCHEME_KEY = 'preferred_scheme';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  constructor(@Inject(WINDOW) private window: Window, @Inject(DOCUMENT) private document: Document) {}

  getPreferredScheme(): Promise<string> {
    return new Promise((resolve, reject) => {
      const scheme = this.checkForSystemScheme();
      if (scheme) {
        this.setSchemeClass(scheme);
        resolve(scheme);
      } else {
        reject('Error occurs while loading scheme');
      }
    });
  }

  setSchemeClass(scheme: string): void {
    this.document.body.classList.toggle(scheme);
  }

  private checkForSystemScheme(): string {
    const storedScheme = this.getScheme();
    const preferredScheme = this.getMatchedScheme(this.window.matchMedia(PREFERS_LIGHT).matches);

    if (storedScheme && storedScheme === preferredScheme) {
      return storedScheme;
    } else {
      return this.storeScheme(preferredScheme);
    }
  }

  private getScheme(): string | null {
    return this.window.localStorage.getItem(PREFERRED_SCHEME_KEY);
  }

  private storeScheme(scheme: Schemes): string {
    this.window.localStorage.setItem(PREFERRED_SCHEME_KEY, scheme);
    return scheme;
  }

  private listenForSchemeChanges() {
    const schemeChanges$ = fromEvent<MediaQueryListEvent>(this.window.matchMedia(PREFERS_LIGHT), 'change');

    schemeChanges$.subscribe(event => {
      const selectedScheme = this.getMatchedScheme(event.matches);
      this.setSchemeClass(selectedScheme);
    });
  }

  private getMatchedScheme(isMatched: boolean): Schemes {
    return isMatched ? Schemes.Light : Schemes.Dark;
  }
}
