import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversorDia'
})
export class ConversorDiaPipe implements PipeTransform {

  dias: string[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  transform(value: number, ...args: number[]): any {
    return this.dias[value];
  }

}
