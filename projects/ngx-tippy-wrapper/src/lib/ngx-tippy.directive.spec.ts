import { TestBed, ComponentFixture, getTestBed } from '@angular/core/testing';
import { NgxTippyDirective } from './ngx-tippy.directive';
import { Component, DebugElement } from '@angular/core';

@Component({
  template: ` <button class="t-demo__btn" ngxTippy data-tippy-content="Tooltip content">Element with tooltip</button> `,
})
class TestComponent {}

let injector: TestBed;
let component: TestComponent;
let fixture: ComponentFixture<TestComponent>;
let el: DebugElement;

fdescribe('Directive: NgxTippyDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NgxTippyDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    console.log('log: TestComponent -> el', el);

    injector = getTestBed();
  });

  it('Should create wrapper component', () => {
    console.log(component);

    expect(component).toBeTruthy();
  });
});
