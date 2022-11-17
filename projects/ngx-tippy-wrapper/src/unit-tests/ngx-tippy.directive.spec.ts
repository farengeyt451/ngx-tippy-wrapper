import { DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { WrapperComponent } from '../fixtures/components';
import {
  COLOR_WHITE,
  PLATFORMS,
  serviceSpy,
  TOOLTIP_ARROW_DIV,
  TOOLTIP_BOX_DIV,
  TOOLTIP_CONTENT_DIV,
  TOOLTIP_ROOT_DIV,
} from '../fixtures/consts';
import { messagesDict, tippyFakeInstance } from '../lib/consts';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from '../lib/ngx-tippy.tokens';
import { NgxTippyService } from '../lib/services';

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

  beforeEach(() => {
    const tippyServiceSpy = serviceSpy;

    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [WrapperComponent, NgxTippyDirective],
      providers: [
        { provide: NgxTippyService, useValue: tippyServiceSpy },
        {
          provide: TIPPY_FAKE_INSTANCE,
          useValue: tippyFakeInstance,
        },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    }).compileComponents();
  });

  describe('Platform BROWSER', () => {
    beforeEach(() => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: PLATFORMS.Browser });

      injector = getTestBed();
      fixture = injector.createComponent(WrapperComponent);
      component = fixture.componentInstance;
      tippyService = injector.inject(NgxTippyService);
    });

    it('should create WrapperComponent', () => {
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

    it('should show tooltip on click', () => {
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
            [attr.data-tippy-content]="'${content}'"
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
      const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
      expect(tooltipContent.nativeElement.textContent).toBe(content);
    });

    it('should set content passed through inline properties', () => {
      // Arrange
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
              content: '${content}'
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
            content,
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

    it('should set content passed through directive', () => {
      // Arrange
      const content = 'Directly passed string';
      component.createInnerComponent(
        `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="'${content}'"
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
      const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
      expect(tooltipContent.nativeElement.innerText).toBe(content);
    });

    it('should set content as template passed through directive', () => {
      // Arrange
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

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

      fixture.detectChanges();

      // Assert
      const {
        nativeElement: { firstChild: tooltipContent },
      } = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));

      expect(tooltipContent.children.length).toBeGreaterThan(0);
      expect(tooltipContent.firstChild).toBeInstanceOf(HTMLElement);
      expect(tooltipContent.firstChild.nodeName).toBe('P');
      expect(tooltipContent.lastChild).toBeInstanceOf(HTMLElement);
      expect(tooltipContent.lastChild.nodeName).toBe('BUTTON');
    });

    it('should set template passed through directive reference', () => {
      // Arrange
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

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));

      fixture.detectChanges();

      // Assert
      const tooltipContent = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
      const templateWrapper = tooltipContent.query(By.css('div'));
      const templateAction = tooltipContent.query(By.css('button'));

      expect(templateWrapper).toBeTruthy();
      expect(templateWrapper.nativeElement).toHaveClass('template');

      expect(templateAction).toBeTruthy();
      expect(templateAction.nativeElement).toHaveClass('template__action');

      spyOn(console, 'log');
      templateAction.nativeElement.dispatchEvent(createMouseEvent('click'));

      expect(console.log).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should set class names', () => {
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
            tippyClassName="custom another-class"
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
      const tippyBoxWithClasses = fixture.debugElement.query(By.css('.tippy-box.custom.another-class'));
      expect(tippyBoxWithClasses).toBeTruthy();
      expect(tippyBoxWithClasses.nativeElement).toHaveClass('custom');
      expect(tippyBoxWithClasses.nativeElement).toHaveClass('another-class');
    });

    it('should reassign class names', () => {
      // Arrange
      const className = 'awesome-class secondary';
      const classNameUpd = 'updated-class primary';
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
            [tippyClassName]="className"
          >
            Element with tooltip
          </button>
        </div>
      `,
        {
          className,
        }
      );

      // Act
      let tippyBoxWithClasses!: DebugElement;

      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

      fixture.detectChanges();

      // Assert
      tippyBoxWithClasses = fixture.debugElement.query(By.css('.awesome-class.secondary'));
      expect(tippyBoxWithClasses).toBeTruthy();

      // Act
      component.updateClasses(classNameUpd);
      fixture.detectChanges();

      // Assert
      tippyBoxWithClasses = fixture.debugElement.query(By.css('.updated-class.primary'));
      expect(tippyBoxWithClasses).toBeTruthy();
    });

    it('should reassign tippy name', () => {
      // Arrange
      const initName = 'awesome-name';
      const updatedName = 'updated-name';
      const getName = () => tooltipDebugEl.attributes['ng-reflect-tippy-name'];

      component.createInnerComponent(
        `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy
            [tippyName]="tippyName"
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
        {
          tippyName: initName,
        }
      );

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

      fixture.detectChanges();

      // Assert
      expect(getName()).toBe(initName);

      // Act
      component.updateName(updatedName);
      fixture.detectChanges();

      // Assert
      expect(getName()).toBe(updatedName);
    });

    it('should reassign content', () => {
      // Arrange
      const initContent = 'Initial tooltip';
      const updatedContent = 'Updated tooltip';
      const name = 't-set-content';

      component.createInnerComponent(
        `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="ngxTippy"
            tippyName="${name}"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
        {
          ngxTippy: initContent,
        }
      );

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

      fixture.detectChanges();

      // Assert
      const {
        nativeElement: { textContent },
      } = fixture.debugElement.query(By.css(TOOLTIP_CONTENT_DIV));
      expect(textContent).toBe(initContent);

      // Act
      component.updateContent(updatedContent);
      fixture.detectChanges();

      // Assert
      expect(tippyService.setContent).toHaveBeenCalledWith(name, updatedContent);
    });

    it('should disable and clear instance', () => {
      // Arrange
      const initContent = 'Initial tooltip';
      const name = 't-clear';

      component.createInnerComponent(
        `
        <div class="test">
          <button
            class="test__btn"
            [ngxTippy]="ngxTippy"
            tippyName="${name}"
            [tippyProps]="{
              appendTo: 'parent',
              trigger: 'click'
            }"
          >
            Element with tooltip
          </button>
        </div>
      `,
        {
          ngxTippy: initContent,
        }
      );

      tippyService.getInstances.and.returnValue(new Map().set(name, tippyFakeInstance));

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

      fixture.detectChanges();

      component.updateContent(null);

      fixture.detectChanges();

      // Assert
      const tooltip = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV));
      expect(tooltip).toBeNull();
    });

    it('should reassign props', () => {
      // Arrange
      const common: NgxTippyProps = {
        appendTo: 'parent',
        trigger: 'click',
      };

      const initProps: NgxTippyProps = {
        ...common,
        arrow: false,
        theme: 'light',
      };
      const updatedProps: NgxTippyProps = {
        ...common,
        arrow: true,
        theme: 'dark',
      };
      const name = 't-props';

      component.createInnerComponent(
        `
        <div class="test">
          <button
            class="test__btn"
            ngxTippy="Tooltip content"
            tippyName="${name}"
            [tippyProps]="props"
          >
            Element with tooltip
          </button>
        </div>
      `,
        {
          props: initProps,
        }
      );

      // Act
      fixture.detectChanges();

      tooltipDebugEl = fixture.debugElement.query(By.directive(NgxTippyDirective));
      tooltipDebugEl.nativeElement.dispatchEvent(createMouseEvent('click'));

      fixture.detectChanges();

      component.updateProps(updatedProps);

      fixture.detectChanges();

      // Assert
      expect(tippyService.setProps).toHaveBeenCalled();
      expect(tippyService.setProps).toHaveBeenCalledWith(name, updatedProps);
    });
  });

  describe('Platform SERVER', () => {
    beforeEach(() => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: PLATFORMS.Server });

      injector = getTestBed();
      fixture = injector.createComponent(WrapperComponent);
      component = fixture.componentInstance;
      tippyService = injector.inject(NgxTippyService);
    });

    it('should NOT init tooltips if platform server', () => {
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
      const { nativeElement } = fixture.debugElement.query(By.css(TOOLTIP_ROOT_DIV)) || {};
      expect(nativeElement).toBeFalsy();
    });
  });
});
