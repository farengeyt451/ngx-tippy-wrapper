import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTippyWrapperComponent } from './ngx-tippy-wrapper.component';

describe('NgxTippyWrapperComponent', () => {
  let component: NgxTippyWrapperComponent;
  let fixture: ComponentFixture<NgxTippyWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTippyWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTippyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
