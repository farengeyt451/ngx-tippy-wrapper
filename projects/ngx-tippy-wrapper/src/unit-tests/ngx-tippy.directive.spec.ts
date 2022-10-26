import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { TestInlineComponent } from '../fixtures/components';
import { styles } from '../fixtures/styles';
import { messagesDict, tippyFakeInstance } from '../lib/fixtures';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from '../lib/ngx-tippy.tokens';
import { NgxTippyService } from '../lib/services';

describe('Directive: NgxTippyDirective', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestInlineComponent>;
  let component: TestInlineComponent;
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
      declarations: [TestInlineComponent],
      providers: [
        { provide: NgxTippyService, useValue: tippyServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
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
        fixture = injector.createComponent(TestInlineComponent);
        component = fixture.componentInstance;
        tippyService = injector.inject(NgxTippyService);
      });
  });

  it('should create wrapper component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not init tooltip', () => {
    component.addComponent(
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
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltip).toBeNull();
  });

  it('should destroy tooltip in case component destruction', () => {
    component.addComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="'Value'"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      styles
    );

    fixture.destroy();
    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    const tooltip = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltip).toBeNull();
  });

  it('should show tooltip on hover', () => {
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
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));
    expect(tooltip).toBeTruthy();
  });

  it('should show tooltip on click ', () => {
    component.addComponent(
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
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));
    expect(tooltip).toBeTruthy();
  });

  it('should set duration property', fakeAsync(() => {
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
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    let tooltipDuration!: string;

    setTimeout(() => {
      tooltipDuration = tippyBox.nativeElement.style.transitionDuration;
    }, 500);

    tick(500);

    expect(tooltipDuration).toBeTruthy();
    expect(tooltipDuration).toBe('500ms');
  }));

  it('should set properties', () => {
    component.addComponent(
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
      styles,
      {
        props: {
          appendTo: 'parent',
          arrow: false,
          theme: 'light',
        },
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

    expect(tooltipArrow).toBeNull();
    expect(tooltipBgColor).toBe('rgb(255, 255, 255)');
  });

  it('should set content passed through data attribute', () => {
    component.addComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            data-tippy-content="Tooltip content passed through data attribute"
            [tippyProps]="{
              appendTo: 'parent'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltipContent.nativeElement.textContent).toBe('Tooltip content passed through data attribute');
  });

  it('should set content passed through inline properties', () => {
    component.addComponent(
      `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            [tippyProps]="{
              appendTo: 'parent',
              allowHTML: true,
              content: '<p>Tooltip <strong>HTML</strong> content</p>'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    const tooltipContentInnerHTML = tooltipContent.nativeElement.innerHTML;
    expect(tooltipContentInnerHTML).toContain('<p>');
    expect(tooltipContentInnerHTML).toBe('<p>Tooltip <strong>HTML</strong> content</p>');
  });

  it('should set content passed through binding', () => {
    const content = 'Content from component';
    component.addComponent(
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
      styles,
      {
        props: {
          appendTo: 'parent',
          content: content,
        },
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltipContent.nativeElement.innerText).toBe(content);
  });
  it('should set content passed through ngxTippy directive', () => {
    const content = 'Directly passed string';

    component.addComponent(
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
      styles,
      {
        content,
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    expect(tooltipContent.nativeElement.innerText).toBe(content);
  });

  it('should set template passed through ngxTippy directive', () => {
    component.addComponent(
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
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content')).nativeElement.firstChild;
    expect(tooltipContent.children.length).toBeGreaterThan(0);
    expect(tooltipContent.firstChild).toBeInstanceOf(HTMLElement);
    expect(tooltipContent.firstChild.nodeName).toBe('P');
    expect(tooltipContent.lastChild).toBeInstanceOf(HTMLElement);
    expect(tooltipContent.lastChild.nodeName).toBe('BUTTON');
  });

  it('should call getInstance method', () => {
    component.addComponent(
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
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    tippyService.getInstance.and.returnValue(tippyFakeInstance);
    const instance = tippyService.getInstance('tippy-content');

    expect(tippyService.getInstance).toHaveBeenCalledTimes(1);
    expect(tippyService.getInstance).toHaveBeenCalledWith('tippy-content');
    expect(instance).toBe(tippyFakeInstance);
  });

  it('should call setProps method', () => {
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
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    tippyService.setProps('tippy-content', 'New props');
    expect(tippyService.setProps).toHaveBeenCalledTimes(1);
    expect(tippyService.setProps).toHaveBeenCalledWith('tippy-content', 'New props');
  });

  it('should set template passed through directive reference', () => {
    component.addComponent(
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
      styles,
      {
        onTemplateClick(event: MouseEvent) {
          console.log(event);
        },
      }
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltipContent = fixture.debugElement.query(By.css('.tippy-content'));
    const templateWrapper = tooltipContent.query(By.css('div'));
    const templateAction = tooltipContent.query(By.css('button'));

    expect(templateWrapper).toBeTruthy();
    expect(templateWrapper.nativeElement).toHaveClass('template');

    expect(templateAction).toBeTruthy();
    expect(templateAction.nativeElement).toHaveClass('template__action');

    spyOn(console, 'log');
    templateAction.nativeElement.dispatchEvent(new MouseEvent('click'));

    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it('should set class names', () => {
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
        </div>
      `,
      styles
    );

    fixture.detectChanges();
    tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
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
  styles: styles,
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
    tooltipDebugEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('div[data-tippy-root]'));
    expect(tooltip).toBeNull();
  });
});
