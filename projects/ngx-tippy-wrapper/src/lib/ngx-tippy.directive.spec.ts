import { TestBed, ComponentFixture, getTestBed } from '@angular/core/testing';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxTippyService } from './ngx-tippy.service';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <button class="t-demo__btn" ngxTippy data-tippy-content="Tooltip content">Element with tooltip</button> `,
})
class TestComponent {}

let injector: TestBed;
let component: TestComponent;
let fixture: ComponentFixture<TestComponent>;
let el: DebugElement;
let service: NgxTippyService;

fdescribe('Directive: NgxTippyDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NgxTippyDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [NgxTippyService],
    });
    injector = getTestBed();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.directive(NgxTippyDirective));
    service = injector.get(NgxTippyService);
    fixture.detectChanges();
  });

  it('Should create wrapper component', () => {
    console.log(component);

    expect(component).toBeTruthy();
  });

  it('Should hover', () => {
    console.log(service.getInstances());
    expect(component).toBeTruthy();
  });
});
