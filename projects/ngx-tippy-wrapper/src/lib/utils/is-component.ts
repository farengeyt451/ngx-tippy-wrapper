import { Type } from '@angular/core';

export const isComponent = (value: any): value is Type<any> => typeof value === 'function';
