import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedTooltipsComponent } from '../grouped-tooltips.component';

describe('GroupedTooltipsComponent', () => {
  let component: GroupedTooltipsComponent;
  let fixture: ComponentFixture<GroupedTooltipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupedTooltipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupedTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
