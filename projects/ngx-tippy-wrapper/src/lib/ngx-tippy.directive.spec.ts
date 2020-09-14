import { TestBed, ComponentFixture, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { NgxTippyService } from './ngx-tippy.service';
import { TestComponent } from '../test-component/test';
import { TestInlineComponent } from '../test-component/test-inline';

fdescribe('Directive (inline test): NgxTippyDirective', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestInlineComponent>;
  let component: TestInlineComponent;
  let tooltipDebugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestInlineComponent, NgxTippyDirective],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestInlineComponent);
        component = fixture.componentInstance;
        tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      });
  });

  it('Should create wrapper component', () => {
    expect(component).toBeTruthy('Wrapper component does not created');
  });

  it('Should create tooltip', () => {
    fixture.detectChanges();
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));
    expect(tooltip).toBeTruthy('Tooltip does not created');
  });

  it('Should apply content using data attribute', () => {
    fixture.detectChanges();
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltipContent.nativeElement.textContent).toBe('Tooltip content from data attribute');
  });

  it('Should apply props using data attribute', fakeAsync(() => {
    fixture.detectChanges();
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    fixture.detectChanges();
    let tooltipDuration: string;
    setTimeout(() => {
      tooltipDuration = tippyBox.nativeElement.style.transitionDuration;
    }, 0);
    flush();
    expect(tooltipDuration).toBeTruthy('Transition duration is not set');
    expect(tooltipDuration).toBe('500ms', 'Wrong transition duration value');
  }));

  it('Should apply props using tippyProps binding', () => {
    fixture.detectChanges();
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    expect(tooltipArrow).toBeNull('Tooltip must be without arrow');
  });
});

describe('Directive: NgxTippyDirective', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let tooltipDebugEl: DebugElement;
  let tippyService: NgxTippyService;
  const tippyName = 'unit-test';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NgxTippyDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [NgxTippyService],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestComponent);
        component = fixture.componentInstance;
        tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
        tippyService = injector.get(NgxTippyService);
      });
  });

  it('Should create wrapper component', () => {
    expect(component).toBeTruthy('Wrapper component does not created');
  });

  it('Should create tooltip element on mouse hover', () => {
    fixture.detectChanges();

    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

    fixture.detectChanges();

    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));

    expect(tooltip).toBeTruthy('Tooltip does not created');
  });

  it('Should apply props from component', () => {
    component.setProps({
      arrow: false,
      theme: 'light',
    });

    fixture.detectChanges();

    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

    fixture.detectChanges();

    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

    expect(tooltipArrow).toBeNull('Tooltip must be without arrow');
    expect(tooltipBgColor).toBe('rgb(255, 255, 255)', 'Background color must be white');
  });
});
