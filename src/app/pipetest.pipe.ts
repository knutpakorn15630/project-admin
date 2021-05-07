import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipetest'
})
export class PipetestPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
