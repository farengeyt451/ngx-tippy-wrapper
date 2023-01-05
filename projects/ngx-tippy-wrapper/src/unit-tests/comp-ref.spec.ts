import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { CompRef } from '../lib/utils';

const TEMPLATE = `<p>Content SPEC</p>`;

@Component({
  selector: 'viewRef-injector',
  template: TEMPLATE,
})
class TestWrapperComponent {
  constructor(public viewRef: ViewContainerRef) {}

  getViewRef() {
    return this.viewRef;
  }
}

describe('Utils: CompRef', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let injector: TestBed;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestWrapperComponent],
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

  it('should detect changes AND return class instance', () => {
    // Arrange
    const testComponent = TestWrapperComponent;
    const compRef = new CompRef<any>({ component: testComponent, viewContainerRef: component.viewRef });
    const detectChangesSpy = spyOn<any>(compRef['compRef']?.changeDetectorRef, 'detectChanges');

    // Act
    const ref = compRef.detectChanges();

    // Assert
    expect(ref).toBeInstanceOf(CompRef);
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it('should return content', () => {
    // Arrange
    const testComponent = TestWrapperComponent;
    const compRef = new CompRef<any>({ component: testComponent, viewContainerRef: component.viewRef });

    // Act
    const el = compRef.getElement();

    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.innerHTML).toBe(TEMPLATE);
  });

  it('should check destroy ref', () => {
    // Arrange
    const testComponent = TestWrapperComponent;
    const compRef = new CompRef<any>({ component: testComponent, viewContainerRef: component.viewRef });
    const destroySpy = spyOn<any>(compRef['compRef'], 'destroy');

    // Act
    compRef.destroy();

    // Assert
    expect(destroySpy).toHaveBeenCalled();
    expect(compRef['compRef']).toBeNull();
  });
});
