import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import { messagesDict, tippyFakeInstance } from '../lib/fixtures';
import { NgxTippyProps } from '../lib/ngx-tippy.interfaces';
import { NGX_TIPPY_MESSAGES, TIPPY_FAKE_INSTANCE } from '../lib/ngx-tippy.tokens';
import { DevModeService, NgxTippyService } from '../lib/services';

describe('Service: NgxTippyWrapperService - Instance exist ', () => {
  let injector: TestBed;
  let tippyService: NgxTippyService;
  let tippyInstance: any;
  let NgxTippySingletonInstance: any;
  const tippyName = 'unit-test';
  const tippySingletonEntryName = 's-test';
  const nameTypedWithMistake = 'unit-tst';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxTippyService,
        {
          provide: TIPPY_FAKE_INSTANCE,
          useValue: tippyFakeInstance,
        },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    });

    injector = getTestBed();
    tippyService = injector.inject(NgxTippyService);
    tippyService.setInstance(tippyName, tippyFakeInstance as any);
    tippyService.setSingletonInstance(tippySingletonEntryName, tippyFakeInstance as any);
    tippyInstance = tippyService.getInstance(tippyName);
    NgxTippySingletonInstance = tippyService.getSingletonInstance(tippySingletonEntryName);
  });

  it('should create service', () => {
    expect(tippyService).toBeTruthy();
  });

  it('should throw error if isDevMode === true', () => {
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);

    expect(() => tippyService['throwError']('Error')).toThrowError('Error');
  });

  it('should not throw error if isDevMode === false', () => {
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(false);

    expect(() => tippyService['throwError']('Err')).not.toThrow();
  });

  it('should set new instance and emit change', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.reason).toBe('setInstance');
      expect(data.instance).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toBe(tippyName);
    });

    expect(tippyInstance).toBeTruthy('Instance does not created ');
  });

  it('should return instance', () => {
    expect(tippyInstance).toBeTruthy();
    expect(tippyInstance.id).toBe(0);
  });

  it('should return singleton instance', () => {
    expect(NgxTippySingletonInstance).toBeTruthy();
    expect(NgxTippySingletonInstance.id).toBe(0);
  });

  it('should return collection of all instances', () => {
    const instances = tippyService.getInstances();
    expect(instances).toBeTruthy();
    expect(instances?.size).toBeGreaterThan(0);
  });

  it('should return collection of all singleton instances', () => {
    const instances = tippyService.getSingletonInstances();
    expect(instances).toBeTruthy();
    expect(instances?.size).toBeGreaterThan(0);
  });

  it('should emit change on: hideWithInteractivity', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.reason).toBe('hideWithInteractivity');
      expect(data.instance).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toBe(tippyName);
    });
    tippyService.hideWithInteractivity(tippyName, {} as any);
  });

  it('should throw error on: hideWithInteractivity, if wrong name passed', () => {
    expect(() => tippyService.hideWithInteractivity(nameTypedWithMistake, {} as any)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('should emit changes on: setProps', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.reason).toBe('setProps');
      expect(data.instance).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toBe(tippyName);
    });

    const props: NgxTippyProps = {
      allowHTML: true,
      content: 'New content',
    };

    tippyService.setProps(tippyName, props);
  });

  it('should throw error on: setProps, if wrong name passed', () => {
    const props: NgxTippyProps = {
      allowHTML: true,
      content: 'New content',
    };

    expect(() => tippyService.setProps(nameTypedWithMistake, props)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('should emit changes on: setContent', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.reason).toBe('setContent');
      expect(data.instance).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toBe(tippyName);
    });

    tippyService.setContent(tippyName, 'New content');
  });

  it('should throw error on: setContent, if wrong name passed', () => {
    expect(() => tippyService.setContent(nameTypedWithMistake, 'New content')).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('should throw error on: setInstance, if name already exist', () => {
    expect(() => tippyService.setInstance(tippyName, tippyFakeInstance as any)).toThrowError(
      `Instance with name '${tippyName}' already exist, please pick unique [tippyName]`
    );
  });

  it('should throw error on: setSingletonInstance, if name already exist', () => {
    expect(() => tippyService.setSingletonInstance(tippySingletonEntryName, tippyFakeInstance as any)).toThrowError(
      `Singleton instance with name '${tippySingletonEntryName}' already exist, please pick unique [singletonName]`
    );
  });

  ['show', 'hide', 'disable', 'enable', 'unmount', 'clearDelayTimeouts'].forEach(method => {
    it(`Should emit changes, on: ${method}`, () => {
      tippyService.instancesChanges.subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.reason).toBe(method);
        expect(data.instance).toBeTruthy();
        expect(data.name).toBeTruthy();
        expect(data.name).toBe(tippyName);
      });

      (tippyService as any)[method](tippyName);
    });

    it(`should emit changes, on: showAll`, fakeAsync(() => {
      tippyService.instancesChanges.subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.reason).toBe('show');
        expect(data.instance).toBeTruthy();
        expect(data.name).toBeTruthy();
        expect(data.name).toBe(tippyName);
      });

      tippyService.showAll();
    }));

    it(`should throw error on: ${method}, if wrong name passed`, () => {
      expect(() => (tippyService as any)[method](nameTypedWithMistake)).toThrowError(
        `Instance with name '${nameTypedWithMistake}' does not exist`
      );
    });
  });

  it('should call hideAll with arguments', () => {
    const props = {
      duration: 100,
      excludeName: 'unit-test',
    };
    spyOn(tippyService, 'hideAll').and.callThrough();
    tippyService.hideAll(props);
    expect(tippyService.hideAll).toHaveBeenCalled();
    expect(tippyService.hideAll).toHaveBeenCalledWith(props);
  });

  it('should call setDefaultProps', () => {
    const props = {
      arrow: false,
    };
    spyOn(tippyService, 'setDefaultProps').and.callThrough();
    tippyService.setDefaultProps(props);
    expect(tippyService.setDefaultProps).toHaveBeenCalled();
    expect(tippyService.setDefaultProps).toHaveBeenCalledWith(props);
    expect(tippyService.setDefaultProps).toHaveBeenCalledTimes(1);
  });

  it('should destroy tooltip, delete instance and emit changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.reason).toBe('destroy');
      expect(data.instance).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toBe(tippyName);
    });

    tippyService.destroy(tippyName);

    expect(tippyService.getInstance(tippyName)).toBeNull();
  });

  it(`should throw error on: destroy, if wrong name passed`, () => {
    expect(() => tippyService.destroy(nameTypedWithMistake)).toThrowError(
      `Instance with name '${nameTypedWithMistake}' does not exist`
    );
  });

  it('should verify payload in emitted changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data).toBeTruthy();
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: tippyFakeInstance as any,
    });
  });

  it('should verify reason in emitted changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data.reason).toBeTruthy();
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: tippyFakeInstance as any,
    });
  });

  it('should verify reason `show` in emitted changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data.reason).toBe('show');
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: tippyFakeInstance as any,
    });
  });

  it('should verify name in emitted changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data.name).toBeTruthy();
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: tippyFakeInstance as any,
    });
  });

  it('should verify name `test` in emitted changes', () => {
    tippyService.instancesChanges.subscribe(data => {
      expect(data.name).toBe('test');
    });

    tippyService['emitInstancesChange']({
      name: 'test',
      reason: 'show',
      instance: tippyFakeInstance as any,
    });
  });
});

describe('Service: NgxTippyWrapperService - No instances exist', () => {
  let injector: TestBed;
  let tippyService: NgxTippyService;
  let tippyInstance: any;
  let NgxTippySingletonInstance: any;
  const tippyName = 'unit-test';
  const tippySingletonEntryName = 's-test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxTippyService,
        {
          provide: TIPPY_FAKE_INSTANCE,
          useValue: tippyFakeInstance,
        },
        {
          provide: NGX_TIPPY_MESSAGES,
          useValue: messagesDict,
        },
      ],
    });

    injector = getTestBed();
    tippyService = injector.inject(NgxTippyService);
    tippyInstance = tippyService.getInstance(tippyName);
    NgxTippySingletonInstance = tippyService.getSingletonInstance(tippySingletonEntryName);
  });

  it('should return null, if wrong tippy name passed', () => {
    expect(tippyInstance).toBeNull();
  });

  it('should return null, if wrong singleton name passed', () => {
    expect(NgxTippySingletonInstance).toBeNull();
  });

  it('should return null, if no instances set', () => {
    const instances = tippyService.getInstances();
    expect(instances).toBeNull();
  });

  it('should return null, if no singleton instances set', () => {
    const instances = tippyService.getSingletonInstances();
    expect(instances).toBeNull();
  });
});
