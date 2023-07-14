import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDemoSocialComponent } from '../t-demo-social.component';

describe('TDemoSocialComponent', () => {
  let component: TDemoSocialComponent;
  let fixture: ComponentFixture<TDemoSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoSocialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
