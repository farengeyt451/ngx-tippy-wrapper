import { KeyValuePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

const keepOrder = (a: any, b: any) => a;

@Pipe({
  name: 'defaultOrderKeyvalue',
})
export class DefaultOrderKeyvaluePipe extends KeyValuePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return super.transform(value, keepOrder);
  }
}
