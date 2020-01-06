import { TestBed } from '@angular/core/testing';

import { NgxTippyWrapperService } from './ngx-tippy-wrapper.service';

describe('NgxTippyWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTippyWrapperService = TestBed.get(NgxTippyWrapperService);
    expect(service).toBeTruthy();
  });
});
