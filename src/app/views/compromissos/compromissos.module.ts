import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { CompromissosService } from './services/compromissos.service';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { CardCompromissoComponent } from './shared/card-compromisso/card-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';



@NgModule({
  declarations: [
    ListarCompromissosComponent,
    InserirCompromissoComponent,
    ExcluirCompromissoComponent,
    CardCompromissoComponent,
    EditarCompromissoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,
  ],
  providers: [
    CompromissosService,
  ]
})
export class CompromissosModule { }
