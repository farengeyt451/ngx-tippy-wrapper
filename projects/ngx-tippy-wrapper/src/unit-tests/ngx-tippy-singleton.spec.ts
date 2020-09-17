import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NgxTippySingletonComponent } from '../lib/ngx-tippy-singleton.component';

@Component({
  template: `
    <div class="singleton">
      <ngx-tippy-singleton [tippyProps]="props">
        <div class="singleton__items">
          <button class="singleton__item" data-singleton data-tippy-content="First tooltip content">Singleton</button>
          <button class="singleton__item" data-singleton data-tippy-content="Second tooltip content">Singleton</button>
          <button class="singleton__item" data-singleton data-tippy-content="Third tooltip content">Singleton</button>
        </div>
      </ngx-tippy-singleton>
    </div>
  `,
  styles: [
    `
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
    `,
  ],
})
class TestWrapperComponent {
  props: NgxTippyProps = {
    appendTo: 'parent',
    arrow: false,
    theme: 'light',
    moveTransition: 'transform 0.2s ease-out',
    placement: 'top',
  };
}

describe('Component: NgxTippySingletonComponent', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  let fixtureGroupComponent: ComponentFixture<NgxTippySingletonComponent>;
  let groupComponent: NgxTippySingletonComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippySingletonComponent, TestWrapperComponent],
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

  it('Should create NgxTippySingletonComponent component', () => {
    fixtureGroupComponent = injector.createComponent(NgxTippySingletonComponent);
    groupComponent = fixtureGroupComponent.componentInstance;
    expect(groupComponent).toBeTruthy('Component does not created');
  });

  it('Should create wrapper test component', () => {
    expect(component).toBeTruthy('Component does not created');
  });

  it('Should render all grouped elements', () => {
    const singletonItems = debugEl.queryAll(By.css('button[data-singleton]'));

    expect(singletonItems).toBeTruthy('Group items does not created');
    expect(singletonItems.length).toBe(3, 'Unexpected number of elements');
  });

  it('Should show tooltips on hover', () => {
    const singletonItems = debugEl.queryAll(By.css('button[data-singleton]'));
    singletonItems.forEach((el) => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();
    const tooltips = fixture.debugElement.queryAll(By.css('div[data-tippy-root]'));

    expect(tooltips).toBeTruthy('Tooltip items does not created');
    expect(tooltips.length).toBe(1, 'Unexpected number of tooltips');
  });

  it('Should apply props', fakeAsync(() => {
    const singletonItems = debugEl.queryAll(By.css('button[data-singleton]'));
    singletonItems.forEach((el) => {
      el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    });
    fixture.detectChanges();

    const tooltipArrow = fixture.debugElement.query(By.css('.tippy-arrow'));
    const tippyBox = fixture.debugElement.query(By.css('.tippy-box'));
    const tooltipBgColor = getComputedStyle(tippyBox.nativeElement).backgroundColor;

    expect(tooltipArrow).toBeNull('Tooltip rendered with arrows');
    expect(tooltipBgColor).toBe('rgb(255, 255, 255)', 'Background color must be white');

    let dataPlacement: string;
    setTimeout(() => {
      dataPlacement = tippyBox.nativeElement.dataset.placement;
    }, 0);
    tick(0);

    expect(dataPlacement).toBe('top', 'Tooltip does not placed top');
  }));
});
