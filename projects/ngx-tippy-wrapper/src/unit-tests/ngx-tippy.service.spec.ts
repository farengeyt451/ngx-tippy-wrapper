import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import { fakeInstance } from '../fixtures/tippy-instance.fixture';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { DevModeService, NgxTippyService } from '../lib/ngx-tippy.service';

describe('Service: NgxTippyWrapperService - Instance exist ', () => {
  let injector: TestBed;
  let tippyService: NgxTippyService;
  let tippyInstance: any;
  let tippySingletonInstance: any;
  const tippyName = 'unit-test';
  const tippySingletonName = 's-test';
  const nameTypedWithMistake = 'unit-tst';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTippyService],
    });

    injector = getTestBed();
    tippyService = injector.inject(NgxTippyService);
    tippyService.setInstance(tippyName, fakeInstance as any);
    tippyService.setSingletonInstance(tippySingletonName, fakeInstance as any);
    tippyInstance = tippyService.getInstance(tippyName);
    tippySingletonInstance = tippyService.getSingletonInstance(tippySingletonName);
  });

  it('Should create service', () => {
    expect(tippyService).toBeTruthy('Service does not created');
  });

  it('Should throw error isDevMode = true', () => {
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);

    expect(() => tippyService['throwError']('Error')).toThrowError('Error');
  });

  it('Should not throw error isDevMode = false', () => {
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(false);

    expect(() => tippyService['throwError']('Err')).not.toThrow();
  });

  it('Should set new instance and emit change', () => {
    tippyService.instancesChanges.subscribe(data => {
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

  it('Should return singleton instance, if right singleton name passed', () => {
    expect(tippySingletonInstance).toBeTruthy('Instance not found');
    expect(tippySingletonInstance.id).toBe(0, 'Instance has wrong ID');
  });

  it('Should return <Map> of all instances', () => {
    const instances = tippyService.getInstances();

    expect(instances).toBeTruthy('Instances not found');
    expect(instances?.size).toBeGreaterThan(0, 'Got less then one instance');
  });

  it('Should return <Map> of all singleton instances', () => {
    const instances = tippyService.getSingletonInstances();

    expect(instances).toBeTruthy('Instances not found');
    expect(instances?.size).toBeGreaterThan(0, 'Got less then one instance');
  });

  it('Should emit change on: hideWithInteractivity', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('hideWithInteractivity', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });
    tippyService.hideWithInteractivity(tippyName, {} as any);
  });

  it('Should throw error on: hideWithInteractivity, if wrong name passed', () => {
    expect(() => tippyService.hideWithInteractivity(nameTypedWithMistake, {} as any)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('Should emit changes on: setProps', () => {
    tippyService.instancesChanges.subscribe(data => {
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

    expect(() => tippyService.setProps(nameTypedWithMistake, props)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('Should emit changes on: setContent', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBe('setContent', 'Wrong reason emitted');
      expect(data.instance).toBeTruthy('Data does not contain tippy instance');
      expect(data.name).toBeTruthy('Data does not contain tippy name');
      expect(data.name).toBe(tippyName);
    });

    tippyService.setContent(tippyName, 'New content');
  });

  it('Should throw error on: setContent, if wrong name passed', () => {
    expect(() => tippyService.setContent(nameTypedWithMistake, 'New content')).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('Should emit changes on: setTriggerTarget', () => {
    tippyService.instancesChanges.subscribe(data => {
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

    expect(() => tippyService.setTriggerTarget(nameTypedWithMistake, setTriggerTarget)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('Should throw error on: setInstance, if name already exist', () => {
    expect(() => tippyService.setInstance(tippyName, fakeInstance as any)).toThrowError(
      `Instance with name '${tippyName}' already exist, please pick unique [tippyName]`
    );
  });

  it('Should throw error on: setSingletonInstance, if name already exist', () => {
    expect(() => tippyService.setSingletonInstance(tippySingletonName, fakeInstance as any)).toThrowError(
      `Singleton instance with name '${tippySingletonName}' already exist, please pick unique [singletonName]`
    );
  });

  ['show', 'hide', 'disable', 'enable', 'unmount', 'clearDelayTimeouts'].forEach(method => {
    it(`Should emit changes, on: ${method}`, () => {
      tippyService.instancesChanges.subscribe(data => {
        expect(data).toBeTruthy('No data emitted');
        expect(data.reason).toBe(method, 'Wrong reason emitted');
        expect(data.instance).toBeTruthy('Data does not contain tippy instance');
        expect(data.name).toBeTruthy('Data does not contain tippy name');
        expect(data.name).toBe(tippyName);
      });

      (tippyService as any)[method](tippyName);
    });

    it(`Should emit changes, on: showAll`, fakeAsync(() => {
      tippyService.instancesChanges.subscribe(data => {
        expect(data).toBeTruthy('No data emitted');
        expect(data.reason).toBe('show', 'Wrong reason emitted');
        expect(data.instance).toBeTruthy('Data does not contain tippy instance');
        expect(data.name).toBeTruthy('Data does not contain tippy name');
        expect(data.name).toBe(tippyName);
      });

      tippyService.showAll();
    }));

    it(`Should throw error on: ${method}, if wrong name passed`, () => {
      expect(() => (tippyService as any)[method](nameTypedWithMistake)).toThrowError(
        `Instance with name '${nameTypedWithMistake}' does not exist`
      );
    });
  });

  it('Should call hideAll with arguments', () => {
    const props = {
      duration: 100,
      excludeName: 'unit-test',
    };
    spyOn(tippyService, 'hideAll').and.callThrough();
    tippyService.hideAll(props);
    expect(tippyService.hideAll).toHaveBeenCalled();
    expect(tippyService.hideAll).toHaveBeenCalledWith(props);
  });

  it('Should call setDefaultProps', () => {
    const props = {
      arrow: false,
    };
    spyOn(tippyService, 'setDefaultProps').and.callThrough();
    tippyService.setDefaultProps(props);
    expect(tippyService.setDefaultProps).toHaveBeenCalled();
    expect(tippyService.setDefaultProps).toHaveBeenCalledWith(props);
    expect(tippyService.setDefaultProps).toHaveBeenCalledTimes(1);
  });

  it('Should destroy tooltip, delete instance and emit changes', () => {
    tippyService.instancesChanges.subscribe(data => {
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
    expect(() => tippyService.destroy(nameTypedWithMistake)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('Should emit changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy('No data emitted');
      expect(data.reason).toBeTruthy('No data reason emitted');
      expect(data.reason).toBe('show');
      expect(data.instance).toBeUndefined('Instance emitted');
      expect(data.name).toBeTruthy('No data name instance emitted');
      expect(data.name).toBe('test');
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: fakeInstance as any,
    });
  });
});

describe('Service: NgxTippyWrapperService - No instances exist', () => {
  let injector: TestBed;
  let tippyService: NgxTippyService;
  let tippyInstance: any;
  let tippySingletonInstance: any;
  const tippyName = 'unit-test';
  const tippySingletonName = 's-test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTippyService],
    });

    injector = getTestBed();
    tippyService = injector.inject(NgxTippyService);
    tippyInstance = tippyService.getInstance(tippyName);
    tippySingletonInstance = tippyService.getSingletonInstance(tippySingletonName);
  });

  it('Should return null if wrong tippy name passed', () => {
    expect(tippyInstance).toBeNull('Instance should not be found');
  });

  it('Should return null if wrong singleton name passed', () => {
    expect(tippySingletonInstance).toBeNull('Singleton instance should not be found');
  });

  it('Should return null if no instances set', () => {
    const instances = tippyService.getInstances();

    expect(instances).toBeNull('Instances should not be found');
  });

  it('Should return null if no singleton instances set', () => {
    const instances = tippyService.getSingletonInstances();

    expect(instances).toBeNull('Singleton instances should not be found');
  });
});
