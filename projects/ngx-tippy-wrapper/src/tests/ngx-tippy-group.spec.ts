import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxTippyGroupComponent } from '../lib/ngx-tippy-group.component';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';

@Component({
  template: `
    <div class="tippy-group">
      <ngx-tippy-group [tippyProps]="props">
        <div class="tippy-group__items">
          <button class="tippy-group__item" data-grouped data-tippy-content="Tooltip content">Group</button>

          <button class="tippy-group__item" data-grouped data-tippy-content="Tooltip content">Group</button>

          <button class="tippy-group__item" data-grouped data-tippy-content="Tooltip content">Group</button>
        </div>
      </ngx-tippy-group>
    </div>
  `,
  styles: [
    `
      .tippy-group {
        position: relative;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        padding: 40px;
        background-color: #f9f8f5;
        font-family: 'Open Sans', sans-serif;
      }

      .tippy-group__item {
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

      .tippy-group__items .tippy-group__item:not(:first-child) {
        margin-left: 10px;
      }
    `,
  ],
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

describe('Component: NgxTippyGroupComponent', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  let fixtureGroupComponent: ComponentFixture<NgxTippyGroupComponent>;
  let groupComponent: NgxTippyGroupComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NgxTippyGroupComponent, TestWrapperComponent],
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

  it('Should create NgxTippyGroupComponent component', () => {
    fixtureGroupComponent = injector.createComponent(NgxTippyGroupComponent);
    groupComponent = fixtureGroupComponent.componentInstance;
    expect(groupComponent).toBeTruthy('Component does not created');
  });

  it('Should create wrapper test component', () => {
    expect(component).toBeTruthy('Component does not created');
  });

  it('Should render all grouped elements', () => {
    const groupEls = debugEl.queryAll(By.css('button[data-grouped]'));

    expect(groupEls).toBeTruthy('Group items does not created');
    expect(groupEls.length).toBe(3, 'Unexpected number of elements');
  });

  it('Should show tooltips on click', () => {
    const groupEls = debugEl.queryAll(By.css('button[data-grouped]'));
    groupEls.forEach((el) => {
      el.nativeElement.dispatchEvent(new MouseEvent('click'));
    });
    fixture.detectChanges();
    const tooltips = fixture.debugElement.queryAll(By.css('div[data-tippy-root]'));

    expect(tooltips).toBeTruthy('Tooltip items does not created');
    expect(tooltips.length).toBe(3, 'Unexpected number of tooltips');
  });

  it('Should apply props', fakeAsync(() => {
    const groupEls = debugEl.queryAll(By.css('button[data-grouped]'));
    groupEls.forEach((el) => {
      el.nativeElement.dispatchEvent(new MouseEvent('click'));
    });
    fixture.detectChanges();

    const tooltipArrow = fixture.debugElement.queryAll(By.css('.tippy-arrow'));
    const tippyBox = fixture.debugElement.queryAll(By.css('.tippy-box'));
    const tooltipBgColor = getComputedStyle(tippyBox[1].nativeElement).backgroundColor;

    expect(tooltipArrow[0]).toBeUndefined('Tooltip rendered with arrows');
    expect(tooltipBgColor).toBe('rgb(255, 255, 255)', 'Background color must be white');

    let dataPlacement: string;
    setTimeout(() => {
      dataPlacement = tippyBox[2].nativeElement.dataset.placement;
      console.log('log: dataPlacement', dataPlacement);
    }, 0);
    tick(0);

    expect(dataPlacement).toBe('bottom', 'Tooltip does not placed bottom');
  }));
});
