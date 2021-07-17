import { TestBed } from '@angular/core/testing';

import { NgxTippyWrapperService } from './ngx-tippy-wrapper.service';

describe('NgxTippyWrapperService', () => {
  let service: NgxTippyWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTippyWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
