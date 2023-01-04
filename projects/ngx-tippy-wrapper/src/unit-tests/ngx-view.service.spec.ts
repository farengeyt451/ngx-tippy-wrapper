import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { messagesDict } from '../lib/consts';
import { NGX_TIPPY_MESSAGES } from '../lib/ngx-tippy.tokens';
import { NgxViewService } from '../lib/services';
import { TplRef } from '../lib/utils';

@Component({
  template: ` <p>Content</p> `,
})
export class TippyTemplateComponent {}

@Component({
  selector: 'template-injector',
  template: `
    <ng-template #ngTmplt>
      <p>Tooltip content</p>
    </ng-template>
  `,
  styleUrls: [],
  providers: [NgxViewService],
})
class TestWrapperComponent {
  constructor() {}

  @ViewChild('ngTmplt') template!: TemplateRef<any>;

  getNgTemplate() {
    return this.template;
  }
}

fdescribe('Component: NgxTippySingletonComponent', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let injector: TestBed;
  let component: TestWrapperComponent;
  let debugEl: DebugElement;
  let viewService: NgxViewService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestWrapperComponent],
      providers: [
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
        viewService = injector.inject(NgxViewService);

        fixture.detectChanges();
      });
  });

  it('should create wrapper test component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should return template ref [getViewRefInstance]', () => {
    // Arrange
    const ngTemplate = component.getNgTemplate();
    const vRef = viewService.getViewRefInstance(ngTemplate);

    // Assert
    expect(vRef).toBeInstanceOf(TplRef);
  });

  it('should return component ref from [getViewRefInstance]', () => {
    // Arrange
    const component = TippyTemplateComponent;

    const vRef = viewService.getViewRefInstance(component);

    // Assert
    expect(vRef).toBeInstanceOf(TplRef);
  });
});
