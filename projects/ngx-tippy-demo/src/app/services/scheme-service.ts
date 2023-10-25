import { Inject, Injectable } from '@angular/core';
import { PREFERS_LIGHT } from '@constants';
import { Schemes } from '@interfaces';
import { LOCAL_STORAGE, WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

const PREFERRED_SCHEME_KEY = 'preferred_scheme';
const IS_SYSTEM_SCHEME_KEY = 'is_system_scheme';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private _scheme$!: BehaviorSubject<string>;
  private _isSystemScheme$!: BehaviorSubject<boolean>;

  constructor(
    @Inject(WINDOW) private readonly window: Window,
    @Inject(LOCAL_STORAGE) private readonly storage: Storage
  ) {
    this.listenForSchemeChanges();
  }

  public getPreferredScheme(): Promise<{ scheme: string; isSystemSchemeFlag: boolean }> {
    return new Promise((resolve, reject) => {
      const scheme = this.getSystemScheme();
      const isSystemScheme = this.getIsSystemSchemeFlag();

      if (scheme && isSystemScheme) {
        const isSystemSchemeFlag = isSystemScheme === `true` ? true : false;
        this.initSchemeSubject(scheme);
        this.initIsSystemSchemeSubject(isSystemSchemeFlag);
        resolve({ scheme, isSystemSchemeFlag });
      } else {
        reject('Error occurs while loading scheme');
      }
    });
  }

  public get scheme$(): Observable<string> {
    return this._scheme$.asObservable();
  }

  public get isSystemScheme$(): Observable<boolean> {
    return this._isSystemScheme$.asObservable();
  }

  public toggleScheme(scheme: Schemes) {
    if (scheme === Schemes.Dark) {
      this.storeSchemeToLocalStorage(Schemes.Dark);
      this.emitSchemeChanges(Schemes.Dark);
    }

    if (scheme === Schemes.Light) {
      this.storeSchemeToLocalStorage(Schemes.Light);
      this.emitSchemeChanges(Schemes.Light);
    }

    this.storage.setItem(IS_SYSTEM_SCHEME_KEY, `false`);
    this.emitIsSystemSchemeChanges(false);
  }

  public toggleSystemScheme() {
    const isSystemScheme = this.storage.getItem(IS_SYSTEM_SCHEME_KEY);

    if (isSystemScheme === `true`) {
      this.storage.setItem(IS_SYSTEM_SCHEME_KEY, `false`);
      this.emitIsSystemSchemeChanges(false);
    } else {
      this.storage.setItem(IS_SYSTEM_SCHEME_KEY, `true`);
      this.emitIsSystemSchemeChanges(true);

      const preferredScheme = this.getMatchedScheme(this.window.matchMedia(PREFERS_LIGHT).matches);
      this.storeSchemeToLocalStorage(preferredScheme);
      this.emitSchemeChanges(preferredScheme);
    }
  }

  private listenForSchemeChanges() {
    const schemeChanges$ = fromEvent<MediaQueryListEvent>(this.window.matchMedia(PREFERS_LIGHT), 'change');

    schemeChanges$.subscribe(event => {
      const isSystemScheme = this.storage.getItem(IS_SYSTEM_SCHEME_KEY);

      if (isSystemScheme && isSystemScheme === `true`) {
        const systemScheme = this.getMatchedScheme(event.matches);

        this.storeSchemeToLocalStorage(systemScheme);
        this.emitSchemeChanges(systemScheme);
      }
    });
  }

  private getSystemScheme(): string | null {
    const storedScheme = this.storage.getItem(PREFERRED_SCHEME_KEY);
    const preferredScheme = this.getMatchedScheme(this.window.matchMedia(PREFERS_LIGHT).matches);
    console.log(`🚀 ~ preferredScheme:`, preferredScheme);

    if (storedScheme) {
      return storedScheme;
    } else {
      this.storeSchemeToLocalStorage(preferredScheme);
      return preferredScheme;
    }
  }

  private getIsSystemSchemeFlag(): string | null {
    const isSystemScheme = this.storage.getItem(IS_SYSTEM_SCHEME_KEY);

    if (!isSystemScheme) {
      this.storage.setItem(IS_SYSTEM_SCHEME_KEY, `true`);
    }

    return this.storage.getItem(IS_SYSTEM_SCHEME_KEY);
  }

  private initSchemeSubject(scheme: string) {
    this._scheme$ = new BehaviorSubject(scheme);
  }

  private initIsSystemSchemeSubject(isSystem: boolean) {
    this._isSystemScheme$ = new BehaviorSubject(isSystem);
  }

  private emitSchemeChanges(scheme: string) {
    this._scheme$.next(scheme);
  }

  private emitIsSystemSchemeChanges(isSystem: boolean) {
    this._isSystemScheme$.next(isSystem);
  }

  private storeSchemeToLocalStorage(scheme: Schemes) {
    this.storage.setItem(PREFERRED_SCHEME_KEY, scheme);
  }

  private getMatchedScheme(isMatched: boolean): Schemes {
    return isMatched ? Schemes.Light : Schemes.Dark;
  }
}
