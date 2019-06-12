import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlunosRoutingModule } from './alunos-routing.module';
import { ListarAlunosComponent } from './listar-alunos/listar-alunos.component';
import { AdicionarAlunoComponent } from './adicionar-aluno/adicionar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { HttpClientModule } from '@angular/common/http';
import { PesquisarPipe } from '../pesquisar.pipe';
import { SimNaoPipe } from '../sim-nao.pipe';

@NgModule({
  declarations: [
    ListarAlunosComponent, 
    AdicionarAlunoComponent, 
    EditarAlunoComponent,
    PesquisarPipe,
    SimNaoPipe
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AlunosModule { }
