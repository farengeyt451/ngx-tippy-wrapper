import { TestBed } from '@angular/core/testing';

import { DemoService } from './demo.service';

describe('DemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemoService = TestBed.get(DemoService);
    expect(service).toBeTruthy();
  });
});
