import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversorHoras'
})
export class ConversorHorasPipe implements PipeTransform {

  horas:string[]=["8:10 - 9:05","9:05 - 10:00","10:00 - 10:55","11:25 - 12:20","12:20 - 13:15","13:15 - 14:10"];
  transform(value: any, ...args: any[]): any {
    return this.horas[value];
  }
}

