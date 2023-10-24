import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { CardCategoriaComponent } from './shared/card-categoria/card-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasService } from './services/categorias.service';

import 'src/app/extensions/form-group.extension';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    InserirCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent,
    CardCategoriaComponent,
    ListarCategoriasComponent
  ],
  imports: [
    CommonModule, 
    NgbModule,
    ReactiveFormsModule, 
    CategoriasRoutingModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [CategoriasService],
})
export class CategoriasModule { }
