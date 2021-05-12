import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Pipe({
  name: 'pipetest'
})
export class PipetestPipe implements PipeTransform {

  transform(value: any, format?: string): any {
    const testMoment = moment();
    testMoment.locale('th');
    const IsNumber = value;
    const result = new Intl.NumberFormat(IsNumber);
    return result;
  }
}
