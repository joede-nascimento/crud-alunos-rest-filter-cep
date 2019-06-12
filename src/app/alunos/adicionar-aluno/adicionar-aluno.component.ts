import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { EstadoBr } from '../estado-br';
import { AlunoService } from './../aluno.service';

@Component({
  selector: 'app-adicionar-aluno',
  templateUrl: './adicionar-aluno.component.html',
  styleUrls: ['./adicionar-aluno.component.css']
})
export class AdicionarAlunoComponent implements OnInit {

  formulario: FormGroup;
  estados: EstadoBr[];
  aluno: any = {};
  msg: string = '';
  nomeAluno: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService
    ) { }

  ngOnInit() {

    this.buscaEstados();
    
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      curso: [null,Validators.required],
      idade: [null, Validators.required],
      deficiente: [null],
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });

  }


  buscaCep(){
    this.alunoService.getCep(this.formulario.get('cep').value).subscribe(
      data => {
        this.aluno = data;
        this.formulario.patchValue({
          rua: this.aluno.logradouro,
          bairro: this.aluno.bairro,
          cidade: this.aluno.localidade,
          estado: this.aluno.uf
        });
      }
    );
  }

  mostraErro(campo){
    return campo.invalid && campo.touched
  }

  adicionarAluno(){
    this.alunoService.criarAluno(this.formulario.value)
    .subscribe(
      data => {
        this.nomeAluno = this.formulario.get('nome').value;
        this.msg = 'success';

      },
      error => {
        console.error(error);
        this.nomeAluno = '';
        this.msg = 'error';
      }
    );
  }

  buscaEstados(){
    this.alunoService.getEstadosBr().subscribe(
      data => {
        this.estados = data
      }
    );
  }

}
