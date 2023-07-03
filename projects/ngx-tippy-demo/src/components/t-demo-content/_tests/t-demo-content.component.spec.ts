import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TDemoContentComponent } from '../t-demo-content.component';

describe('TDemoContentComponent', () => {
  let component: TDemoContentComponent;
  let fixture: ComponentFixture<TDemoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
