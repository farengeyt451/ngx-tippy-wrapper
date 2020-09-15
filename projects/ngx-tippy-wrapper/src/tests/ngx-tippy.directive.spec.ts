import { TestBed, ComponentFixture, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, OnInit, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NgxTippyService } from '../lib/ngx-tippy.service';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';

const commonStyles = `
  .test {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 40px;
    background-color: #f9f8f5;
    font-family: 'Open Sans', sans-serif;
  }

  .test__btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-image: linear-gradient(120deg, #54d182 0%, #3db9f5 100%);
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    cursor: pointer;
  }
`;
/** Wrapper component for simple inline tippy test */
@Component({
  selector: 'tippy-test-inline',
  template: `
    <div class="test">
      <button
        class="test__btn"
        ngxTippy
        data-tippy-content="Tooltip content from data attribute"
        data-tippy-duration="500"
        tippyName="unit-test"
        tippyClassName="custom another-class"
        [tippyProps]="{
          appendTo: 'parent',
          arrow: false
        }"
      >
        Element with tooltip
      </button>
    </div>
  `,

  styles: [commonStyles],
})
class TestInlineComponent {}

/** Wrapper component for test tippy with bindings */
@Component({
  selector: 'tippy-test',
  template: `<div class="test">
    <button class="test__btn" ngxTippy data-tippy-content="Tooltip content" tippyName="unit-test" [tippyProps]="props">
      Element with tooltip
    </button>
  </div> `,
  styles: [commonStyles],
})
class TestComponent implements OnInit {
  props: NgxTippyProps;

  constructor() {}

  ngOnInit() {
    this.setProps({
      appendTo: 'parent',
    });
  }

  setProps(props: NgxTippyProps) {
    this.props = { ...this.props, ...props };
  }
}

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

  it('Should apply class names', () => {
    fixture.detectChanges();
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tippyBoxWithClasses = fixture.debugElement.query(By.css('.tippy-box.custom.another-class'));
    expect(tippyBoxWithClasses).toBeTruthy('Classes were not applied');
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
