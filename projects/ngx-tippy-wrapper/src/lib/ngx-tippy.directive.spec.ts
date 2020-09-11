import { TestBed, ComponentFixture, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxTippyService } from './ngx-tippy.service';
import { By } from '@angular/platform-browser';
import { TestComponent } from '../test-component/test/test.component';

fdescribe('Directive: NgxTippyDirective', () => {
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

  it('Should create tooltip element on hover', () => {
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
    console.log(tippyBox);

    expect(tooltipArrow).toBeNull('Tooltip must be without arrow');
  });
});
