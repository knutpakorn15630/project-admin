import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Pipe({
  name: 'pipeDate'
})
export class PipeDatePipe implements PipeTransform {
  transform(date: string, format: string): string {
    const ThaiDay = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const shortThaiMonth = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const longThaiMonth = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const inputDate = new Date(date);
    const dataDate = [
      inputDate.getDay(), inputDate.getDate(), inputDate.getMonth(), inputDate.getFullYear(), inputDate.getTime()
    ];
    const outputDateFull = [
      'วัน ' + ThaiDay[dataDate[0]],
      'ที่ ' + dataDate[1],
      'เดือน ' + longThaiMonth[dataDate[2]],
      'พ.ศ. ' + (dataDate[3] + 543)
    ];
    const outputDateShort = [
      dataDate[1],
      shortThaiMonth[dataDate[2]],
      dataDate[3] + 543
    ];
    const outputDateMedium = [
      dataDate[1],
      longThaiMonth[dataDate[2]],
      dataDate[3] + 543
    ];
    const outputDataTime = [
      dataDate[4]
    ];
    let returnDate: string;
    returnDate = outputDateMedium.join(' ');
    if (format === 'full') {
      returnDate = outputDateFull.join(' ');
    }
    if (format === 'medium') {
      returnDate = outputDateMedium.join(' ');
    }
    if (format === 'short') {
      returnDate = outputDateShort.join(' ');
    }
    if (format === 'Time') {
      returnDate = outputDataTime.join(' ');
    }
    return returnDate;
  }

}
