import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PREFERS_LIGHT } from '@constants';
import { Schemes } from '@interfaces';
import { WINDOW } from '@tokens';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

const PREFERRED_SCHEME_KEY = 'preferred_scheme';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private scheme$!: BehaviorSubject<string>;

  constructor(@Inject(WINDOW) private readonly window: Window, @Inject(DOCUMENT) private readonly document: Document) {
    this.listenForSchemeChanges();
  }

  public getScheme$(): Observable<string> {
    return this.scheme$.asObservable();
  }

  public getPreferredScheme(): Promise<string> {
    return new Promise((resolve, reject) => {
      const scheme = this.getSystemScheme();
      if (scheme) {
        this.setSchemeClass(scheme);
        this.initSchemeSubject(scheme);
        resolve(scheme);
      } else {
        reject('Error occurs while loading scheme');
      }
    });
  }

  private getSystemScheme(): string | null {
    const storedScheme = this.getSchemeFromLocalStorage();
    const preferredScheme = this.getMatchedScheme(this.window.matchMedia(PREFERS_LIGHT).matches);

    if (storedScheme && storedScheme === preferredScheme) {
      return storedScheme;
    } else {
      return this.storeSchemeToLocalStorage(preferredScheme);
    }
  }

  private initSchemeSubject(scheme: string): void {
    this.scheme$ = new BehaviorSubject(scheme);
  }

  private emitSchemeChanges(scheme: string): void {
    this.scheme$.next(scheme);
  }

  private getSchemeFromLocalStorage(): string | null {
    return this.window.localStorage.getItem(PREFERRED_SCHEME_KEY);
  }

  private storeSchemeToLocalStorage(scheme: Schemes): string {
    this.window.localStorage.setItem(PREFERRED_SCHEME_KEY, scheme);
    return scheme;
  }

  private getMatchedScheme(isMatched: boolean): Schemes {
    return isMatched ? Schemes.Light : Schemes.Dark;
  }

  private listenForSchemeChanges(): void {
    const schemeChanges$ = fromEvent<MediaQueryListEvent>(this.window.matchMedia(PREFERS_LIGHT), 'change');

    schemeChanges$.subscribe(event => {
      const systemScheme = this.getMatchedScheme(event.matches);
      this.emitSchemeChanges(systemScheme);
    });
  }

  private setSchemeClass(scheme: string): void {
    this.document.body.classList.toggle(scheme);
  }
}
