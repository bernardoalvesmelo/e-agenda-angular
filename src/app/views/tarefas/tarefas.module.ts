import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { CardTarefaComponent } from './shared/card-tarefa/card-tarefa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefasService } from './services/tarefas.service';
import { TarefasRoutingModule } from './tarefas-routing.module';

import 'src/app/extensions/form-group.extension';
import { ConcluirItensTarefaComponent } from './concluir-itens-tarefa/concluir-itens-tarefa.component';

@NgModule({
  declarations: [
    InserirTarefaComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent,
    ListarTarefasComponent,
    CardTarefaComponent,
    ConcluirItensTarefaComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NgbModule, 
    TarefasRoutingModule],
  providers: [TarefasService],
})
export class TarefasModule { }
