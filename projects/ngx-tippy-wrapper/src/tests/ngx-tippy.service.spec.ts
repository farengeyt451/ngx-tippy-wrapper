import { TestBed, getTestBed } from '@angular/core/testing';
import { NgxTippyService } from '../lib/ngx-tippy.service';
import { fakeInstance } from '../fixtures/tippy-instance.fixture';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';

let injector: TestBed;
let tippyService: NgxTippyService;
let tippyInstance: any;

const tippyName = 'unit-test';
const nameTypedWithMistake = 'unit-tst';

describe('Service: NgxTippyWrapperService - Instance exist ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTippyService],
    });

    injector = getTestBed();
    tippyService = injector.get(NgxTippyService);
    tippyService.setInstance(tippyName, fakeInstance as any);
    tippyInstance = tippyService.getInstance(tippyName);
  });

  it('Should create service', () => {
    expect(tippyService).toBeTruthy('Service does not created');
  });

  it('Should set new instance and emit change', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('setInstance', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    expect(tippyInstance).toBeTruthy('Instance does not created ');
  });

  it('Should return instance, if right tippy name passed', () => {
    expect(tippyInstance).toBeTruthy('Instance not found');
    expect(tippyInstance.id).toBe(0, 'Instance has wrong ID');
  });

  it('Should return <Map> of all instances', () => {
    const instances = tippyService.getInstances();

    expect(instances).toBeTruthy('Instances not found');
    expect(instances.size).toBeGreaterThan(0, 'Got less then one instance');
  });

  it('Should emit change on: hideWithInteractivity', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('hideWithInteractivity', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });
    tippyService.hideWithInteractivity(tippyName, {} as any);
  });

  it('Should throw error on: hideWithInteractivity, if wrong name passed', () => {
    try {
      tippyService.hideWithInteractivity(nameTypedWithMistake, {} as any);
    } catch (error) {
      expect(error).toBeTruthy('Error does not exist');
      expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
    }
  });

  it('Should emit changes on: setProps', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('setProps', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    const props: NgxTippyProps = {
      allowHTML: true,
      content: 'New content',
    };

    tippyService.setProps(tippyName, props);
  });

  it('Should throw error on: setProps, if wrong name passed', () => {
    const props: NgxTippyProps = {
      allowHTML: true,
      content: 'New content',
    };

    try {
      tippyService.setProps(nameTypedWithMistake, props);
    } catch (error) {
      expect(error).toBeTruthy('Error does not exist');
      expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
    }
  });

  it('Should emit changes on: setContent', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('setContent', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    tippyService.setContent(tippyName, 'New content');
  });

  it('Should throw error on: setContent, if wrong name passed', () => {
    try {
      tippyService.setContent(nameTypedWithMistake, 'New content');
    } catch (error) {
      expect(error).toBeTruthy('Error does not exist');
      expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
    }
  });

  it('Should emit changes on: setTriggerTarget', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('setTriggerTarget', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    const setTriggerTarget = document.createElement('div');
    tippyService.setTriggerTarget(tippyName, setTriggerTarget);
  });

  it('Should throw error on: setTriggerTarget, if wrong name passed', () => {
    const setTriggerTarget = document.createElement('div');
    try {
      tippyService.setTriggerTarget(nameTypedWithMistake, setTriggerTarget);
    } catch (error) {
      expect(error).toBeTruthy('Error does not exist');
      expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
    }
  });

  ['show', 'hide', 'disable', 'enable', 'unmount', 'clearDelayTimeouts'].forEach((method) => {
    it(`Should emit changes, on: ${method}`, () => {
      tippyService.instancesChanges.subscribe((data) => {
        expect(data).toBeTruthy('No data emitted');
        expect(data.reason).toBe(method, 'Wrong reason emitted');
        expect(data.instance).toBeTruthy('Data does not contain tippy instance');
        expect(data.name).toBeTruthy('Data does not contain tippy name');
        expect(data.name).toBe(tippyName);
      });

      tippyService[method](tippyName);
    });

    it(`Should throw error on: ${method}, if wrong name passed`, () => {
      try {
        tippyService[method](nameTypedWithMistake);
      } catch (error) {
        expect(error).toBeTruthy('Error does not exist');
        expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
      }
    });
  });

  it('Should destroy tooltip, delete instance and emit changes', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('destroy', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    tippyService.destroy(tippyName);

    expect(tippyService.getInstance(tippyName)).toBeNull('Instance exist, but should be deleted');
  });

  it(`Should throw error on: destroy, if wrong name passed`, () => {
    try {
      tippyService.destroy(nameTypedWithMistake);
    } catch (error) {
      expect(error).toBeTruthy('Error does not exist');
      expect(error.message).toBe(`Instance with identifier '${nameTypedWithMistake}' does not exist`);
    }
  });

  it('Should emit changes', () => {
    tippyService.instancesChanges.subscribe((data) => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBeTruthy('No data reason emitted');
      expect(data.reason).toBe('show');
      expect(data.instance).toBeUndefined('Instance emitted');
      expect(data.name).toBeTruthy('No data name instance emitted');
      expect(data.name).toBe('test');
    });

    tippyService['emitInstancesChange']('show', 'test');
  });
});

describe('Service: NgxTippyWrapperService - No instances exist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTippyService],
    });

    injector = getTestBed();
    tippyService = injector.get(NgxTippyService);
    tippyInstance = tippyService.getInstance(tippyName);
  });

  it('Should return null if wrong tippy name passed', () => {
    expect(tippyInstance).toBeNull('Instance should not be found');
  });

  it('Should return null if no instances set', () => {
    const instances = tippyService.getInstances();

    expect(instances).toBeNull('Instances should not be found');
  });
});
