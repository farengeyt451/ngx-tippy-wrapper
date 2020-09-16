import { TestBed, ComponentFixture, getTestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import {
  DebugElement,
  NO_ERRORS_SCHEMA,
  OnInit,
  Component,
  ViewChild,
  ViewContainerRef,
  Compiler,
  NgModule,
} from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NgxTippyService } from '../lib/ngx-tippy.service';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';

const commonStyles = [
  `
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
  `,
];

/** Wrapper component */
@Component({
  selector: 'tippy-test',
  template: `<div #container></div>`,
})
class TestInlineComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(private compiler: Compiler) {}

  ngOnInit() {}

  public addComponent(template: string, styles: string[], properties: any = {}) {
    @Component({ template, styles })
    class TemplateComponent {}

    @NgModule({ declarations: [TemplateComponent, NgxTippyDirective] })
    class TemplateModule {}

    const moduleComponentFactories = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = moduleComponentFactories.componentFactories.find(
      (component) => component.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    Object.assign(component.instance, properties);
  }
}

fdescribe('Directive: NgxTippyDirective', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestInlineComponent>;
  let component: TestInlineComponent;
  let tooltipDebugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [TestInlineComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestInlineComponent);
        component = fixture.componentInstance;
      });
  });

  it('Should create wrapper component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy('Wrapper component does not created');
  });

  it('Should create tooltip', () => {
    component.addComponent(
      `
      <div class="test">
        <button
          class="test__btn"
          ngxTippy
          data-tippy-content="Tooltip content"
          [tippyProps]="{
            appendTo: 'parent'
          }"
        >
          Element with tooltip
        </button>
      `,
      commonStyles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));

    expect(tooltip).toBeTruthy('Tooltip does not created');
  });

  it('Should apply content passed from data attribute', () => {
    component.addComponent(
      `
      <div class="test">
        <button
          class="test__btn"
          ngxTippy
          data-tippy-content="Tooltip content from data attribute"
          [tippyProps]="{
            appendTo: 'parent'
          }"
        >
          Element with tooltip
        </button>
      `,
      commonStyles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));

    expect(tooltipContent.nativeElement.textContent).toBe('Tooltip content from data attribute');
  });

  it('Should apply props passed from data attribute', fakeAsync(() => {
    component.addComponent(
      `
      <div class="test">
        <button
          class="test__btn"
          ngxTippy
          data-tippy-content="Tooltip content"
          [tippyProps]="{
            appendTo: 'parent',
            arrow: false,
            duration: 500
          }"
        >
          Element with tooltip
        </button>
      `,
      commonStyles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    fixture.detectChanges();
    let tooltipDuration: string;
    setTimeout(() => {
      tooltipDuration = tippyBox.nativeElement.style.transitionDuration;
    }, 500);
    tick(500);

    expect(tooltipDuration).toBeTruthy('Transition duration is not set');
    expect(tooltipDuration).toBe('500ms', 'Wrong transition duration value');
  }));

  it('Should apply class names', () => {
    component.addComponent(
      `
      <div class="test">
        <button
          class="test__btn"
          ngxTippy
          data-tippy-content="Tooltip content"
          [tippyProps]="{
            appendTo: 'parent'
          }"
          tippyClassName="custom another-class"
        >
          Element with tooltip
        </button>
      `,
      commonStyles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tippyBoxWithClasses = fixture.debugElement.query(By.css('.tippy-box.custom.another-class'));
    expect(tippyBoxWithClasses).toBeTruthy('Classes were not applied');
  });
});

// xdescribe('Directive: NgxTippyDirective', () => {
//   let injector: TestBed;
//   let fixture: ComponentFixture<TestComponent>;
//   let component: TestComponent;
//   let tooltipDebugEl: DebugElement;
//   let tippyService: NgxTippyService;
//   const tippyName = 'unit-test';

//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       declarations: [TestComponent, NgxTippyDirective],
//       schemas: [NO_ERRORS_SCHEMA],
//       providers: [NgxTippyService],
//     })
//       .compileComponents()
//       .then(() => {
//         injector = getTestBed();
//         fixture = injector.createComponent(TestComponent);
//         component = fixture.componentInstance;
//         tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
//         tippyService = injector.get(NgxTippyService);
//       });
//   });

//   it('Should create wrapper component', () => {
//     expect(component).toBeTruthy('Wrapper component does not created');
//   });

//   it('Should create tooltip element on mouse hover', () => {
//     fixture.detectChanges();

//     tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

//     fixture.detectChanges();

//     const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));

//     expect(tooltip).toBeTruthy('Tooltip does not created');
//   });

//   it('Should apply props from component', () => {
//     component.setProps({
//       arrow: false,
//       theme: 'light',
//     });

//     fixture.detectChanges();

//     tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

//     fixture.detectChanges();

//     const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
//     const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
//     const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

//     expect(tooltipArrow).toBeNull('Tooltip must be without arrow');
//     expect(tooltipBgColor).toBe('rgb(255, 255, 255)', 'Background color must be white');
//   });
// });
