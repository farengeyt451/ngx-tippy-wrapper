import { TemplateRef } from '@angular/core';

export const isTemplateRef = (value: any): value is TemplateRef<any> => value instanceof TemplateRef;
