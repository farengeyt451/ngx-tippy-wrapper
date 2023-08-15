import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeSwitcherComponent } from '../scheme-switcher.component';

describe('SchemeSwitcherComponent', () => {
  let component: SchemeSwitcherComponent;
  let fixture: ComponentFixture<SchemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemeSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
