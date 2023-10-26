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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    TarefasRoutingModule,
  
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,    
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,],
  providers: [TarefasService],
})
export class TarefasModule { }
