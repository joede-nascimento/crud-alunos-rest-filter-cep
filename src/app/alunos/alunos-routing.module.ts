import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarAlunosComponent } from './listar-alunos/listar-alunos.component';
import { AdicionarAlunoComponent } from './adicionar-aluno/adicionar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar' },
  { path: 'listar', component: ListarAlunosComponent },
  { path: 'adicionar', component: AdicionarAlunoComponent },
  { path: 'editar/:id', component: EditarAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
