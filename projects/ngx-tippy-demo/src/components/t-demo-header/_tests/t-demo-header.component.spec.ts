import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDemoHeaderComponent } from '../t-demo-header.component';

describe('TDemoHeaderComponent', () => {
  let component: TDemoHeaderComponent;
  let fixture: ComponentFixture<TDemoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
