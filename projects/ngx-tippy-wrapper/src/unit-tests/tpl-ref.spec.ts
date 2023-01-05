import { ApplicationRef, Component, DebugElement, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { TplRef } from '../lib/utils';

const TEMPLATE = `<p>Content SPEC</p>`;

@Component({
  selector: 'template-injector',
  template: `
    <ng-template #ngTmplt>
      <p>Tooltip SPEC</p>
    </ng-template>

    <ng-template #ngTmpltMultiple>
      <p>Tooltip SPEC</p>
      <p>Tooltip SPEC</p>
    </ng-template>
  `,
})
class TestWrapperComponent {
  constructor(public viewRef: ViewContainerRef, public appRef: ApplicationRef) {}

  @ViewChild('ngTmplt') ngTemplate!: TemplateRef<any>;
  @ViewChild('ngTmpltMultiple') ngTmpltMultiple!: TemplateRef<any>;

  getNgTemplate() {
    return this.ngTemplate;
  }

  getNgTemplateMultiple() {
    return this.ngTmpltMultiple;
  }
}

describe('Utils: TplRef', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let injector: TestBed;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;
  let testComponent: any;
  let tplRefInstance: TplRef<any>;

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

        tplRefInstance = createTplRefInstance(component);
      });
  });

  it('should create wrapper test component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should detect changes AND return class instance', () => {
    // Arrange
    const detectChangesSpy = spyOn<any>(tplRefInstance['viewRef'], 'detectChanges');

    // Act
    const ref = tplRefInstance.detectChanges();

    // Assert
    expect(ref).toBeInstanceOf(TplRef);
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it('should check NULL viewRef', () => {
    // Arrange
    const detectChangesSpy = spyOn<any>(tplRefInstance['viewRef'], 'detectChanges');

    // Act
    tplRefInstance['viewRef'] = null;
    tplRefInstance.detectChanges();

    // Assert
    expect(detectChangesSpy).not.toHaveBeenCalled();
  });

  it('should check attachView call', () => {
    // Arrange
    const attachViewSpy = spyOn<any>(tplRefInstance['args']['appRef'], 'attachView');

    // Act
    tplRefInstance = createTplRefInstance(component);

    // Assert
    expect(attachViewSpy).toHaveBeenCalled();
  });

  it('should return el', () => {
    // Act
    const el = tplRefInstance.getElement();

    // Assert
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it('should NOT return el', () => {
    // Act
    tplRefInstance['viewRef'] = null;
    const ref = tplRefInstance.getElement();

    // Assert
    expect(ref).toBeNull();
  });

  it('should return wrapped el', () => {
    // Act
    tplRefInstance = createTplRefInstance(component, 'getNgTemplateMultiple');
    const el = tplRefInstance.getElement();

    // Assert
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it('should NOT return el', () => {
    // Act
    tplRefInstance['viewRef'] = null;
    const ref = tplRefInstance.getElement();

    // Assert
    expect(ref).toBeNull();
  });

  it('should destroy ref', () => {
    // Act
    tplRefInstance.destroy();

    // Assert
    expect(tplRefInstance['viewRef']).toBeNull();
  });

  it('should NOT destroy ref', () => {
    // Act
    tplRefInstance['viewRef'] = null;
    tplRefInstance.destroy();

    // Assert
    expect(tplRefInstance['viewRef']).toBeNull();
  });
});

function createTplRefInstance(
  component: TestWrapperComponent,
  templateType: 'getNgTemplate' | 'getNgTemplateMultiple' = 'getNgTemplate'
) {
  return new TplRef<any>({
    tpl: component[templateType](),
    context: {
      $implicit: 'tippyName',
    },
    appRef: component.appRef,
  });
}
