import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class PesquisarPipe implements PipeTransform {

  transform(items: any[], campo: string, valor: string): any {
    if (!items) {
      return [];
    }
    if (!campo || !valor) {
      return items;
    }
    
    return items.filter(umItem =>
      umItem[campo].toLowerCase().includes(valor.toLowerCase())
    );
  }

}
