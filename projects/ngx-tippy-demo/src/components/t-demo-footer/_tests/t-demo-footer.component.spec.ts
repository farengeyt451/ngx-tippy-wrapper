import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TDemoFooterComponent } from '../t-demo-footer.component';

describe('TDemoFooterComponent', () => {
  let component: TDemoFooterComponent;
  let fixture: ComponentFixture<TDemoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
