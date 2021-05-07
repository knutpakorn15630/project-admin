import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipetest'
})
export class PipetestPipe implements PipeTransform {

  transform(value: any, IsDate: [], format: string): any {
    const date = new Date(2020, 7, 1);
    const result = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return result;
  }

}
