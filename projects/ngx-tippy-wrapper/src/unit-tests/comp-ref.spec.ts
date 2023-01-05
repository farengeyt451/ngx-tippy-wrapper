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
  let testComponent: any;
  let compRefInstance: CompRef<any>;

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

        testComponent = TestWrapperComponent;
        compRefInstance = new CompRef<any>({ component: testComponent, viewContainerRef: component.viewRef });

        fixture.detectChanges();
      });
  });

  it('should create wrapper test component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should detect changes AND return class instance', () => {
    // Arrange
    const detectChangesSpy = spyOn<any>(compRefInstance['compRef']?.changeDetectorRef, 'detectChanges');

    // Act
    const ref = compRefInstance.detectChanges();

    // Assert
    expect(ref).toBeInstanceOf(CompRef);
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it('should return content', () => {
    // Act
    const el = compRefInstance.getElement();

    // Assert
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.innerHTML).toBe(TEMPLATE);
  });

  it('should check destroy ref', () => {
    // Arrange
    const destroySpy = spyOn<any>(compRefInstance['compRef'], 'destroy');

    // Act
    compRefInstance.destroy();

    // Assert
    expect(destroySpy).toHaveBeenCalled();
    expect(compRefInstance['compRef']).toBeNull();
  });

  it('should check NULL branch for compRef', () => {
    // Arrange
    const detectChangesSpy = spyOn<any>(compRefInstance['compRef']?.changeDetectorRef, 'detectChanges');
    const destroySpy = spyOn<any>(compRefInstance['compRef'], 'destroy');

    // Act
    compRefInstance['compRef'] = null;
    compRefInstance.destroy();
    const el = compRefInstance.getElement();
    const ref = compRefInstance.detectChanges();

    // Assert
    expect(el).toBeUndefined();
    expect(destroySpy).not.toHaveBeenCalled();
    expect(detectChangesSpy).not.toHaveBeenCalled();
  });
});
