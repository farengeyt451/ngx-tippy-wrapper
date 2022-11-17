import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  COLOR_GREY,
  COLOR_WHITE,
  commonStyles,
  PLATFORMS,
  singletonTemplate,
  templateOverridden,
  TOOLTIP_ARROW_DIV,
  TOOLTIP_BOX_DIV,
  TOOLTIP_ROOT_DIV,
  TOOLTIP_SINGLETON,
} from '../fixtures/consts';
import { NgxTippySingletonComponent } from '../lib/components';
import { messagesDict } from '../lib/consts';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NgxSingletonProps, NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NGX_TIPPY_MESSAGES } from '../lib/ngx-tippy.tokens';
import { NgxTippyService } from '../lib/services';

const baseProps: NgxTippyProps = {
  appendTo: 'parent',
  arrow: false,
  theme: 'light',
  moveTransition: 'transform 0.2s ease-out',
  placement: 'top',
};

@Component({
  template: singletonTemplate,
  styles: [commonStyles],
})
class TestWrapperComponent {
  singletonProps = baseProps;
}

@Component({
  template: templateOverridden,
  styles: [commonStyles],
})
class TestWrapperOverriddenComponent {
  singletonProps: NgxSingletonProps = {
    ...baseProps,
    overrides: ['arrow', 'theme', 'placement'],
  };

  overriddenProps: NgxTippyProps = {
    arrow: true,
    theme: 'dark',
    placement: 'bottom',
  };
}

describe('Component: NgxTippySingletonComponent', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let injector: TestBed;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippyDirective, NgxTippySingletonComponent, TestWrapperComponent],
      providers: [
        NgxTippyService,
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
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

  it('should create wrapper test component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should render all grouped elements', () => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));

    // Assert
    expect(singletonItems).toBeTruthy();
    expect(singletonItems.length).toBe(3);
  });

  it('should show tooltips on hover', () => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));

    // Act
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();

    // Assert
    const tooltips = fixture.debugElement.queryAll(By.css(TOOLTIP_ROOT_DIV));

    expect(tooltips).toBeTruthy();
    expect(tooltips.length).toBe(1);
  });

  it('should apply properties', fakeAsync(() => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));
    let dataPlacement!: string;

    // Act
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });

    fixture.detectChanges();

    // Assert
    const tooltipArrow = fixture.debugElement.query(By.css(TOOLTIP_ARROW_DIV));
    const tippyBox = fixture.debugElement.query(By.css(TOOLTIP_BOX_DIV));
    const { backgroundColor } = getComputedStyle(tippyBox.nativeElement);

    expect(tooltipArrow).toBeNull();
    expect(backgroundColor).toBe(COLOR_WHITE);

    setTimeout(() => {
      dataPlacement = tippyBox.nativeElement.dataset.placement;
    }, 0);

    tick(0);

    expect(dataPlacement).toBe('top');
  }));
});

describe('Component: NgxTippySingletonComponent (overridden)', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestWrapperOverriddenComponent>;
  let component: TestWrapperOverriddenComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippyDirective, NgxTippySingletonComponent, TestWrapperOverriddenComponent],
      providers: [
        NgxTippyService,
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        injector = getTestBed();
        fixture = injector.createComponent(TestWrapperOverriddenComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create wrapper test component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should render all grouped elements', () => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));

    // Assert
    expect(singletonItems).toBeTruthy();
    expect(singletonItems.length).toBe(3);
  });

  it('should show tooltips on hover', () => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));

    // Act
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });

    fixture.detectChanges();

    // Assert
    const tooltips = fixture.debugElement.queryAll(By.css(TOOLTIP_ROOT_DIV));

    expect(tooltips).toBeTruthy();
    expect(tooltips.length).toBe(1);
  });

  it('should apply props', fakeAsync(() => {
    // Arrange
    const singletonItems = debugEl.queryAll(By.css(TOOLTIP_SINGLETON));
    let dataPlacement!: string;

    // Act
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });

    fixture.detectChanges();

    // Assert
    const tooltipArrow = fixture.debugElement.query(By.css(TOOLTIP_ARROW_DIV));
    const tippyBox = fixture.debugElement.query(By.css(TOOLTIP_BOX_DIV));
    const { backgroundColor } = getComputedStyle(tippyBox.nativeElement);

    expect(tooltipArrow).toBeTruthy();
    expect(backgroundColor).toBe(COLOR_GREY);

    setTimeout(() => {
      dataPlacement = tippyBox.nativeElement.dataset.placement;
    }, 0);

    tick(0);

    expect(dataPlacement).toBeTruthy();
  }));
});

describe('Component: NgxTippySingletonComponent', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<NgxTippySingletonComponent>;
  let component: NgxTippySingletonComponent;
  let debugEl: DebugElement;
  let platform: Object;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippySingletonComponent],
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
        fixture = injector.createComponent(NgxTippySingletonComponent);
        platform = fixture.debugElement.injector.get(PLATFORM_ID);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create NgxTippySingletonComponent component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should throw error when children instances not found', () => {
    // Assert
    expect(() => component['setSingleton']()).toThrowError(
      component['messagesDict'].childrenInstancesNotFoundSingleton
    );
  });

  it('should not call originalShowFn with tippy name', () => {
    // Arrange
    const showSpyFn = jasmine.createSpy('show', () => {});
    const singletonInstance = component['extendShowFn']({ show: showSpyFn } as any);

    // Act
    singletonInstance.show('test');

    // Assert
    expect(showSpyFn).toHaveBeenCalledTimes(0);
  });

  it('should call originalShowFn without tippy name', () => {
    // Arrange
    const showSpyFn = jasmine.createSpy('show', () => {});
    const singletonInstance = component['extendShowFn']({ show: showSpyFn } as any);

    // Act
    singletonInstance.show();

    // Assert
    expect(showSpyFn).toHaveBeenCalled();
    expect(showSpyFn).toHaveBeenCalledTimes(1);
  });

  it('should init tooltips only if platform browser', () => {
    // Arrange
    spyOn<any>(component, 'setSingleton');
    spyOn<any>(component, 'initTippySingletonEntry');

    // Act
    component.ngAfterViewInit();

    // Assert
    expect(component['setSingleton']).toHaveBeenCalledTimes(0);
  });
});
