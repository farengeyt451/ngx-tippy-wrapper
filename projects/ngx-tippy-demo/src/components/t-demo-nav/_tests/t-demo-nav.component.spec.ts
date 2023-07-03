import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TDemoNavComponent } from '../t-demo-nav.component';

describe('TDemoNavComponent', () => {
  let component: TDemoNavComponent;
  let fixture: ComponentFixture<TDemoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TDemoNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TDemoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
