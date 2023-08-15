import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedComponent } from '../not-supported.component';

describe('NotSupportedComponent', () => {
  let component: NotSupportedComponent;
  let fixture: ComponentFixture<NotSupportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotSupportedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
