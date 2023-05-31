import { Component, DebugElement, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { messagesDict } from '../lib/consts';
import { NGX_TIPPY_MESSAGES } from '../lib/ngx-tippy.tokens';
import { NgxViewService } from '../lib/services';
import { CompRef, TplRef } from '../lib/utils';

@Component({
  template: ` <p>Tooltip SPEC</p> `,
})
class TippyTemplateComponent {}

@Component({
  selector: 'template-injector',
  template: `
    <ng-template #ngTmplt>
      <p>Tooltip SPEC</p>
    </ng-template>

    <template #tmplt>
      <p>Tooltip SPEC</p>
    </template>
  `,
  styleUrls: [],
  providers: [NgxViewService],
})
class TestWrapperComponent {
  constructor(public viewRef: ViewContainerRef) {}

  @ViewChild('ngTmplt') ngTemplate!: TemplateRef<any>;
  @ViewChild('tmplt') template!: any;

  getNgTemplate() {
    return this.ngTemplate;
  }

  getTemplate() {
    return this.template;
  }
}

describe('Service: NgxViewService', () => {
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

  it('should return template ref', () => {
    // Arrange
    const ngTemplate = component.getNgTemplate();

    // Act
    const vRef = viewService.getViewRefInstance(ngTemplate, 'test-name', { test: 'context' });

    // Assert
    expect(vRef).toBeInstanceOf(TplRef);
    expect((vRef as any).viewRef.context.$implicit).toEqual('test-name');
    expect((vRef as any).viewRef.context.test).toEqual('context');
  });

  it('should return component ref', () => {
    // Arrange
    const tippyTemplateComponent = TippyTemplateComponent;
    viewService.viewContainerRef = component.viewRef;

    // Act
    const vRef = viewService.getViewRefInstance(tippyTemplateComponent);

    // Assert
    expect(vRef).toBeInstanceOf(CompRef);
  });

  it('should return content from HTML template', () => {
    // Arrange
    const { nativeElement: template } = component.getTemplate();

    // Act
    const content = viewService.getViewRefInstance(template);

    // Assert
    expect(content.getElement()).toBeInstanceOf(DocumentFragment);
  });
});
