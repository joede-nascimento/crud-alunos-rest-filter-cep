import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simNao'
})
export class SimNaoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == true){
      return 'Sim'
    }
    if(value == false){
      return 'Não'
    }

    return value;
  }

}
