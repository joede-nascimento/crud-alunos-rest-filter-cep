import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Aluno } from './aluno';
import { environment } from './../../environments/environment';
import { EstadoBr } from './estado-br';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private urlAPI = `${environment.API}alunos`;

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno>{
    return this.http.get<Aluno>(this.urlAPI).pipe(take(1));
  }

  getAluno(id): Observable<Aluno>{
    return this.http.get<Aluno>(`${this.urlAPI}/${id}`).pipe(take(1));
  }

  criarAluno(aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.urlAPI, aluno).pipe(take(1));
  }

  atualizarAluno(id, aluno): Observable<Aluno>{
    return this.http.put<Aluno>(`${this.urlAPI}/${id}`, aluno).pipe(take(1));
  }

  deleteAluno(id){
    return this.http.delete(`${this.urlAPI}/${id}`).pipe(take(1));
  }
  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe(take(1));
  }

  getCep(campoCep){
    //Nova variável "cep" somente com dígitos.
    let cep = campoCep.replace(/\D/g, '');

    if (cep != "") {

      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(take(1));
      }
    }

  }
}

