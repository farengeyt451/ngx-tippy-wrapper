import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDemoSchemeSwitcherComponent } from '../t-demo-scheme-switcher.component';

describe('TDemoSchemeSwitcherComponent', () => {
  let component: TDemoSchemeSwitcherComponent;
  let fixture: ComponentFixture<TDemoSchemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoSchemeSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoSchemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
