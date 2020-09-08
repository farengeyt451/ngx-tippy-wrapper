import { TestBed, getTestBed } from '@angular/core/testing';
import { NgxTippyService } from './ngx-tippy.service';
import { tippyInstance } from '../fixtures/tippy-instance.fixture';
import { NgxTippyInstance } from './ngx-tippy.interfaces';

let injector: TestBed;
let tippyService: NgxTippyService;

describe('NgxTippyWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTippyService],
    });

    injector = getTestBed();
    tippyService = injector.get(NgxTippyService);
  });
  it('Should create service', () => {
    expect(tippyService).toBeTruthy();
  });
  it('Should set new instance', () => {
    tippyService.setInstance('unit-test', tippyInstance as any);

    expect(tippyService.getInstance('unit-test')).toBeTruthy();
  });
});
