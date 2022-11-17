import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  COLOR_WHITE,
  groupStyles,
  groupTemplate,
  PLATFORMS,
  TOOLTIP_ARROW_DIV,
  TOOLTIP_BOX_DIV,
  TOOLTIP_GROUP,
  TOOLTIP_ROOT_DIV,
} from '../fixtures/consts';
import { NgxTippyGroupComponent } from '../lib/components';
import { messagesDict } from '../lib/consts';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NGX_TIPPY_MESSAGES } from '../lib/ngx-tippy.tokens';

@Component({
  template: groupTemplate,
  styles: [groupStyles],
})
class TestWrapperComponent {
  props: NgxTippyProps = {
    appendTo: 'parent',
    arrow: false,
    placement: 'bottom',
    theme: 'light',
    trigger: 'click',
  };
}

describe('Component: NgxTippyGroupComponent (wrapped)', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestWrapperComponent, NgxTippyGroupComponent],
      providers: [
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
        { provide: PLATFORM_ID, useValue: PLATFORMS.Browser },
      ],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create wrapper component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should render all grouped elements', () => {
    // Arrange
    const groupEls = debugEl.queryAll(By.css(TOOLTIP_GROUP));

    // Assert
    expect(groupEls).toBeTruthy();
    expect(groupEls.length).toBe(3);
  });

  it('should show tooltips on click', () => {
    // Arrange
    const groupEls = debugEl.queryAll(By.css(TOOLTIP_GROUP));

    // Act
    groupEls.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('click'));
    });

    fixture.detectChanges();

    // Assert
    const tooltips = fixture.debugElement.queryAll(By.css(TOOLTIP_ROOT_DIV));

    expect(tooltips).toBeTruthy();
    expect(tooltips.length).toBe(3);
  });

  it('should apply properties', fakeAsync(() => {
    // Arrange
    const groupEls = debugEl.queryAll(By.css(TOOLTIP_GROUP));
    let dataPlacement!: string;

    // Act
    groupEls.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('click'));
    });

    fixture.detectChanges();

    // Assert
    const tooltipArrow = fixture.debugElement.queryAll(By.css(TOOLTIP_ARROW_DIV));
    const tippyBox = fixture.debugElement.queryAll(By.css(TOOLTIP_BOX_DIV));
    const { backgroundColor } = getComputedStyle(tippyBox[1].nativeElement);

    expect(tooltipArrow[0]).toBeUndefined();
    expect(backgroundColor).toBe(COLOR_WHITE);

    setTimeout(() => {
      dataPlacement = tippyBox[2].nativeElement.dataset.placement;
    }, 0);

    tick(0);

    expect(dataPlacement).toBeTruthy();
  }));
});

describe('Component: NgxTippyGroupComponent', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<NgxTippyGroupComponent>;
  let component: NgxTippyGroupComponent;
  let debugEl: DebugElement;
  let platform: Object;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippyGroupComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: PLATFORMS.Server },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(NgxTippyGroupComponent);
        platform = fixture.debugElement.injector.get(PLATFORM_ID);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create NgxTippyGroupComponent', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should init tooltips only if platform browser', () => {
    // Arrange
    spyOn(component, 'setTooltips');
    spyOn(component, 'initTippy');

    // Act
    component.ngAfterViewInit();

    // Assert
    expect(component.setTooltips).toHaveBeenCalledTimes(0);
  });

  it('should throw error when children instances not found', () => {
    // Assert
    expect(() => component['setTooltips']()).toThrowError(component['messagesDict'].childrenInstancesNotFoundGrouped);
  });
});
