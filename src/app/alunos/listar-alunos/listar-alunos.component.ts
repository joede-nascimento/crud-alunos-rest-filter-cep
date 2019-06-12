import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css']
})
export class ListarAlunosComponent implements OnInit {

  pesquisar: string;
  alunos: any = [];

  constructor(private alunoService:AlunoService) { }

  ngOnInit() {
    this.buscarAlunos();

  }

  buscarAlunos(){
    this.alunoService.getAlunos()
    .subscribe(
      data => {
        this.alunos = data;
      },
      error => console.error(error)
    );
  }

  removerAluno(id){
    this.alunoService.deleteAluno(id)
    .subscribe(
      data => {
        this.buscarAlunos();
      },
      error => console.error(error)
    );
  }

  

}
