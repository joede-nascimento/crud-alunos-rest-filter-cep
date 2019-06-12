import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EstadoBr } from '../estado-br';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit {

  formulario: FormGroup;
  id: number = this.actRouter.snapshot.params.id;
  estados: EstadoBr[];
  aluno: any = {};
  msg: string = '';
  nomeAluno: string = '';


  constructor(
    private actRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alunoService: AlunoService
    ) { }

  ngOnInit() {

    this.buscaEstados();
    this.buscarUmAluno();

    this.formulario = this.formBuilder.group({
      nome: ['n1', Validators.required],
      curso: ['c1',Validators.required],
      idade: [2, Validators.required],
      deficiente: [true],
      cep: ['07991040', Validators.required],
      rua: ['r1', Validators.required],
      bairro: ['b1', Validators.required],
      cidade: ['c1', Validators.required],
      estado: ['e1', Validators.required]
    });
    
  }

  buscarUmAluno(){
    this.alunoService.getAluno(this.id)
    .subscribe(
      data => {
        this.aluno = data;
        this.formulario.patchValue({
          bairro: this.aluno.bairro,
          cep: this.aluno.cep,
          cidade: this.aluno.cidade,
          curso: this.aluno.curso,
          deficiente: this.aluno.deficiente,
          estado: this.aluno.estado,
          idade: this.aluno.id,
          rua: this.aluno.rua,
          nome: this.aluno.nome
        });
      },
      error => {
        console.error(error);
      }
    );
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
      },
      error => {
        console.error(error);
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

  mostraErro(campo){
    return campo.invalid && campo.touched
  }

  editarAluno(){
    this.alunoService.atualizarAluno(this.id, this.formulario.value)
    .subscribe(
      data => {
        this.nomeAluno = this.formulario.get('nome').value;
        this.msg = 'success';
      },
      error => {
        console.error(error);
        this.nomeAluno = '';
        this.msg = 'error'
      }
    );
  }

}
