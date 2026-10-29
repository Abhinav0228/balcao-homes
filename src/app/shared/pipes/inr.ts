import { Pipe, PipeTransform } from '@angular/core';
import { formatInr } from '../../core/utils/inr';

@Pipe({ name: 'inr' })
export class InrPipe implements PipeTransform {
  transform(value: number | null | undefined, digits = 2): string {
    return value == null ? '' : formatInr(value, digits);
  }
}
