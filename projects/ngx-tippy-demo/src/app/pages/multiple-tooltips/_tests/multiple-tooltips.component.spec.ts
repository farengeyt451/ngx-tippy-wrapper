import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTooltipsComponent } from '../multiple-tooltips.component';

describe('MultipleTooltipsComponent', () => {
  let component: MultipleTooltipsComponent;
  let fixture: ComponentFixture<MultipleTooltipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleTooltipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
