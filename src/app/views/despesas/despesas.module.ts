import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDespesaComponent } from './shared/card-despesa/card-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasModule } from '../categorias/categorias.module';
import { DespesasService } from './services/despesas.service';
import { DespesasRoutingModule } from './despesas-routing.module';
import { DetalhesDespesaComponent } from './despesa-detalhes/detalhes-despesa.component';

import 'src/app/extensions/form-group.extension';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CardDespesaComponent,
    ListarDespesasComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent,
    InserirDespesaComponent,
    DetalhesDespesaComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule, 
    DespesasRoutingModule,
    CategoriasModule
  ],
  providers: [
    DespesasService,
  ]
})
export class DespesasModule { }
