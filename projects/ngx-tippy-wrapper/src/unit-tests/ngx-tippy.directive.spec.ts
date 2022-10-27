import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { WrapperComponent } from '../fixtures/components';
import { messagesDict, tippyFakeInstance } from '../lib/fixtures';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from '../lib/ngx-tippy.tokens';
import { NgxTippyService } from '../lib/services';

enum ENVS {
  Browser = 'browser',
  Server = 'server',
}

const TOOLTIP_CONTENT_DIV = '.tippy-content';
const TOOLTIP_ROOT_DIV = 'div[data-tippy-root]';
const TOOLTIP_BOX_DIV = '.tippy-box';
const TOOLTIP_ARROW_DIV = '.tippy-arrow';
const COLOR_WHITE = 'rgb(255, 255, 255)';

type MEvents =
  | 'click'
  | 'mouseenter'
  | 'mousedown'
  | 'mouseleave'
  | 'mousedown'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseout'
  | 'mouseup'
  | 'show'
  | 'contextmenu'
  | 'dblclick';

const createMouseEvent = (event: MEvents) => new MouseEvent(event);

describe('Directive: NgxTippyDirective', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<WrapperComponent>;
  let component: WrapperComponent;
  let tooltipDebugEl: DebugElement;
  let tippyService: any;

  beforeEach(async () => {
    const tippyServiceSpy = jasmine.createSpyObj('NgxTippyService', [
      'setInstance',
      'getInstance',
      'getInstances',
      'show',
      'hide',
      'hideWithInteractivity',
      'disable',
      'enable',
      'setProps',
      'setContent',
      'setTriggerTarget',
      'unmount',
      'clearDelayTimeouts',
      'destroy',
      'setDefaultProps',
      'showAll',
      'hideAll',
    ]);

    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [WrapperComponent],
      providers: [
        { provide: NgxTippyService, useValue: tippyServiceSpy },
        { provide: PLATFORM_ID, useValue: ENVS.Browser },
        {
          provide: TIPPY_FAKE_INSTANCE,
          useValue: tippyFakeInstance,
        },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(WrapperComponent);
        component = fixture.componentInstance;
        tippyService = injector.inject(NgxTippyService);
      });
  });

  it('should create wrapper component', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should NOT init tooltip', () => {
    // Arrange
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="null"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

    fixture.detectChanges();

    // Assert
    const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
    expect(tooltip).toBeNull();
  });

  it('should destroy tooltip in case component destruction', () => {
    // Arrange
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy="Tooltip value"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `
    );

    // Act
    fixture.destroy();
    fixture.detectChanges();

    // Assert
    const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
    expect(tooltip).toBeNull();
  });

  it('should show tooltip on hover', () => {
    // Arrange
    component.createInnerComponent(
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
        </div>
      `
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    // Assert
    const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
    expect(tooltip).toBeTruthy();
  });

  it('should show tooltip on click ', () => {
    // Arrange
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            data-tippy-content="Tooltip content"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

    fixture.detectChanges();

    // Assert
    const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
    expect(tooltip).toBeTruthy();
  });

  it('should set duration property', fakeAsync(() => {
    // Arrange
    component.createInnerComponent(
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
        </div>
      `
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    const tippyBox = fixture.debugElement.query(By.css(TOOLTIP_BOX_DIV));
    let tooltipDuration!: string;

    setTimeout(() => {
      tooltipDuration = tippyBox.nativeElement.style.transitionDuration;
    }, 500);

    tick(500);

    // Assert
    expect(tooltipDuration).toBeTruthy();
    expect(tooltipDuration).toBe('500ms');
  }));

  it('should set properties', () => {
    // Arrange
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            data-tippy-content="Tooltip content"
            [tippyProps]="props"
          >
            Element with tooltip
          </button>
        </div>
      `,
      {
        props: {
          appendTo: 'parent',
          arrow: false,
          theme: 'light',
        },
      }
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    // Assert
    const tippyBox = fixture.debugElement.query(By.css(TOOLTIP_BOX_DIV));
    const tooltipArrow = fixture.debugElement.query(By.css(TOOLTIP_ARROW_DIV));
    const { backgroundColor } = getComputedStyle(tippyBox.nativeElement);

    expect(tooltipArrow).toBeNull();
    expect(backgroundColor).toBe(COLOR_WHITE);
  });

  it('should set content passed through data attribute', () => {
    // Arrange
    const content = 'Tooltip content passed through data attribute';
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            [attr.data-tippy-content]="content"
            [tippyProps]="{
              appendTo: 'parent'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      {
        content,
      }
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    // Assert
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
    expect(tooltipContent.nativeElement.textContent).toBe(content);
  });

  it('should set content passed through inline properties', () => {
    const content = '<p>Tooltip <strong>HTML</strong> content</p>';
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            [tippyProps]="{
              appendTo: 'parent',
              allowHTML: true,
              content: content
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      {
        content,
      }
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    // Assert
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
    const { innerHTML } = tooltipContent.nativeElement;
    expect(innerHTML).toContain('<p>');
    expect(innerHTML).toBe(content);
  });

  it('should set content passed through binding', () => {
    // Arrange
    const content = 'Content from component';
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            [tippyProps]="props"
          >
            Element with tooltip
          </button>
        </div>
      `,
      {
        props: {
          appendTo: 'parent',
          content: content,
        },
      }
    );

    // Act
    fixture.detectChanges();

    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

    fixture.detectChanges();

    // Assert
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
    expect(tooltipContent.nativeElement.innerText).toBe(content);
  });
  it('should set content passed through ngxTippy directive', () => {
    const content = 'Directly passed string';

    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="content"
            [tippyProps]="{
              appendTo: 'parent'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      {
        content,
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
    expect(tooltipContent.nativeElement.innerText).toBe(content);
  });

  it('should set template passed through ngxTippy directive', () => {
    component.createInnerComponent(
      `
        <div #tooltipTemplate>
          <p>Directly passed content</p>
          <button>Action</button>
        </div>

        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="tooltipTemplate"
            [tippyProps]="{
              appendTo: 'parent',
              interactive: true
            }"
          >
            Element with tooltip
          </button>
        </div>
      `
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV)).nativeElement.firstChild;
    expect(tooltipContent.children.length).toBeGreaterThan(0);
    expect(tooltipContent.firstChild).toBeInstanceOf(HTMLElement);
    expect(tooltipContent.firstChild.nodeName).toBe('P');
    expect(tooltipContent.lastChild).toBeInstanceOf(HTMLElement);
    expect(tooltipContent.lastChild.nodeName).toBe('BUTTON');
  });

  it('should call getInstance method', () => {
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            tippyName="tippy-content"
            data-tippy-content="Tooltip content"
            [tippyProps]="{
              appendTo: 'parent'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();

    tippyService.getInstance.and.returnValue(tippyFakeInstance);
    const instance = tippyService.getInstance('tippy-content');

    expect(tippyService.getInstance).toHaveBeenCalledTimes(1);
    expect(tippyService.getInstance).toHaveBeenCalledWith('tippy-content');
    expect(instance).toBe(tippyFakeInstance);
  });

  it('should call setProps method', () => {
    component.createInnerComponent(
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
        </div>
      `
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();

    tippyService.setProps('tippy-content', 'New props');
    expect(tippyService.setProps).toHaveBeenCalledTimes(1);
    expect(tippyService.setProps).toHaveBeenCalledWith('tippy-content', 'New props');
  });

  it('should set template passed through directive reference', () => {
    component.createInnerComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="tippyTemplate"
            tippyName="content-9"
            [tippyProps]="{
              allowHTML: true,
              appendTo: 'parent',
              interactive: true
            }"
          >
            Element with tooltip
          </button>

          <div class="template" #tippyTemplate>
            <h4 class="template__caption">Caption</h4>
            <p class="template__description">Some content</p>
            <button class="template__action" (click)="onTemplateClick($event)">Action</button>
          </div>
        </div>
      `,
      {
        onTemplateClick(event: MouseEvent) {
          console.log(event);
        },
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
    const templateWrapper = tooltipContent.query(By.css('div'));
    const templateAction = tooltipContent.query(By.css('button'));

    expect(templateWrapper).toBeTruthy();
    expect(templateWrapper.nativeElement).toHaveClass('template');

    expect(templateAction).toBeTruthy();
    expect(templateAction.nativeElement).toHaveClass('template__action');

    spyOn(console, 'log');
    templateAction.nativeElement.dispatchEvent(createMouseEvent('click'));

    // Assert
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it('should set class names', () => {
    component.createInnerComponent(
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
        </div>
      `
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();

    const tippyBoxWithClasses = fixture.debugElement.query(By.css('.tippy-box.custom.another-class'));
    expect(tippyBoxWithClasses).toBeTruthy();
    expect(tippyBoxWithClasses.nativeElement).toHaveClass('custom');
    expect(tippyBoxWithClasses.nativeElement).toHaveClass('another-class');
  });
});

/** Wrapper component */
@Component({
  selector: 'tippy-test',
  template: `
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
    </div>
  `,
})
class TestPlatformComponent {}

describe('Directive: NgxTippyDirective - Platform test', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestPlatformComponent>;
  let component: TestPlatformComponent;
  let debugEl: DebugElement;
  let platform: Object;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestPlatformComponent, NgxTippyDirective],
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: TIPPY_FAKE_INSTANCE,
          useValue: tippyFakeInstance,
        },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestPlatformComponent);
        platform = fixture.debugElement.injector.get(PLATFORM_ID);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create TestPlatformComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should init tooltips only if platform browser', () => {
    const tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
    expect(tooltip).toBeNull();
  });
});
