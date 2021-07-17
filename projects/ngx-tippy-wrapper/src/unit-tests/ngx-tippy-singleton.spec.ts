import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxTippySingletonComponent } from '../lib/ngx-tippy-singleton.component';
import { NgxTippyDirective } from '../lib/ngx-tippy.directive';
import { NgxSingletonProps, NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NgxTippyService } from '../lib/ngx-tippy.service';

const template = `
  <div class="singleton">
    <ngx-tippy-singleton [singletonProps]="singletonProps">
      <div class="singleton__items">
        <button class="singleton__item" ngxTippy="First tooltip content">Singleton</button>
        <button class="singleton__item" ngxTippy="Second tooltip content">Singleton</button>
        <button class="singleton__item" ngxTippy="Third tooltip content">Singleton</button>
      </div>
    </ngx-tippy-singleton>
  </div>
`;

const templateOverridden = `
  <div class="singleton">
    <ngx-tippy-singleton [singletonProps]="singletonProps">
      <div class="singleton__items">
        <button
          class="singleton__item"
          ngxTippy="First tooltip content"
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
        <button
          class="singleton__item"
          ngxTippy="Second tooltip content"
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
        <button
          class="singleton__item"
          ngxTippy="Third tooltip content"
          [tippyProps]="overriddenProps"
        >
          Singleton
        </button>
      </div>
    </ngx-tippy-singleton>
  </div>
`;

const commonStyles = `
  .singleton {
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 40px;
    background-color: #f9f8f5;
    font-family: 'Open Sans', sans-serif;
  }

  .singleton__item {
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

  .singleton__items .singleton__item:not(:first-child) {
    margin-left: 10px;
  }
`;

@Component({
  template: template,
  styles: [commonStyles],
})
class TestWrapperComponent {
  singletonProps: NgxSingletonProps = {
    appendTo: 'parent',
    arrow: false,
    theme: 'light',
    moveTransition: 'transform 0.2s ease-out',
    placement: 'top',
  };
}

@Component({
  template: templateOverridden,
  styles: [commonStyles],
})
class TestWrapperOverriddenComponent {
  singletonProps: NgxSingletonProps = {
    appendTo: 'parent',
    arrow: false,
    theme: 'light',
    moveTransition: 'transform 0.2s ease-out',
    placement: 'top',
    overrides: ['arrow', 'theme', 'placement'],
  };

  overriddenProps: NgxTippyProps = {
    arrow: true,
    theme: 'dark',
    placement: 'bottom',
  };
}

describe('Component: NgxTippySingletonComponent (wrapped)', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippyDirective, NgxTippySingletonComponent, TestWrapperComponent],
      providers: [NgxTippyService],
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

  it('Should create wrapper test component', () => {
    expect(component).toBeTruthy('Component does not created');
  });

  it('Should render all grouped elements', () => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));

    expect(singletonItems).toBeTruthy('Group items does not created');
    expect(singletonItems.length).toBe(3, 'Unexpected number of elements');
  });

  it('Should show tooltips on hover', () => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();
    const tooltips = fixture.debugElement.queryAll(By.css('div[data-tippy-root]'));

    expect(tooltips).toBeTruthy('Tooltip items does not created');
    expect(tooltips.length).toBe(1, 'Unexpected number of tooltips');
  });

  it('Should apply props', fakeAsync(() => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();

    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

    expect(tooltipArrow).toBeNull('Tooltip rendered with arrows');
    expect(tooltipBgColor).toBe('rgb(255, 255, 255)', 'Background color must be white');

    let dataPlacement!: string;
    setTimeout(() => {
      dataPlacement = tippyBox.nativeElement.dataset.placement;
    }, 0);
    tick(0);

    expect(dataPlacement).toBe('top', 'Tooltip does not placed top');
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
      providers: [NgxTippyService],
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

  it('Should create wrapper test component', () => {
    expect(component).toBeTruthy('Component does not created');
  });

  it('Should render all grouped elements', () => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));

    expect(singletonItems).toBeTruthy('Group items does not created');
    expect(singletonItems.length).toBe(3, 'Unexpected number of elements');
  });

  it('Should show tooltips on hover', () => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();
    const tooltips = fixture.debugElement.queryAll(By.css('div[data-tippy-root]'));

    expect(tooltips).toBeTruthy('Tooltip items does not created');
    expect(tooltips.length).toBe(1, 'Unexpected number of tooltips');
  });

  it('Should apply props', fakeAsync(() => {
    const singletonItems = debugEl.queryAll(By.css('button[ngxTippy]'));
    singletonItems.forEach(el => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();

    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

    expect(tooltipArrow).toBeTruthy('Tooltip rendered without arrows');
    expect(tooltipBgColor).toBe('rgb(51, 51, 51)', 'Background color must be dark');

    let dataPlacement!: string;
    setTimeout(() => {
      dataPlacement = tippyBox.nativeElement.dataset.placement;
    }, 0);
    tick(0);

    expect(dataPlacement).toBe('bottom', 'Tooltip does not placed top');
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
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
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

  it('Should create NgxTippySingletonComponent component', () => {
    expect(component).toBeTruthy('Component does not created');
  });

  it('Should throw error when children instances not founded', () => {
    expect(() => component['setSingleton']()).toThrowError(
      `No children tippy instances founded within singleton component`
    );
  });

  it('Should call originalShowFn with tippy name', () => {
    const showSpyFn = jasmine.createSpy('show', () => {});
    const singletonInstance = component['extendShowFn']({ show: showSpyFn } as any);
    singletonInstance.show('test');

    expect(showSpyFn).toHaveBeenCalled();
    expect(showSpyFn).toHaveBeenCalledTimes(1);
  });

  it('Should call originalShowFn without tippy name', () => {
    const showSpyFn = jasmine.createSpy('show', () => {});
    const singletonInstance = component['extendShowFn']({ show: showSpyFn } as any);
    singletonInstance.show();

    expect(showSpyFn).toHaveBeenCalled();
    expect(showSpyFn).toHaveBeenCalledTimes(1);
  });

  it('Should init tooltips only if platform browser', () => {
    spyOn<any>(component, 'setSingleton');
    spyOn<any>(component, 'initTippySingleton');
    component.ngAfterViewInit();
    expect(component['setSingleton']).toHaveBeenCalledTimes(0);
    expect(component['setSingleton']).toHaveBeenCalledTimes(0);
  });
});
