import { DebugElement } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { messagesDict, tippyFakeInstance } from '../lib/consts';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from '../lib/ngx-tippy.tokens';

describe('Tokens: NgxTippyTokens', () => {
  let injector: TestBed;
  let msgDict: { [key: string]: string };
  let tFakeInstance: Object;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();

        msgDict = injector.inject(NGX_TIPPY_MESSAGES);
        tFakeInstance = injector.inject(TIPPY_FAKE_INSTANCE);
      });
  });

  it('should inject msgDict', () => {
    // Assert
    expect(msgDict).toEqual(messagesDict);
  });

  it('should inject tFakeInstance', () => {
    // Assert
    expect(tFakeInstance).toEqual(tippyFakeInstance);
  });
});
