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
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { ContatosModule } from '../contatos/contatos.module';

import 'src/app/extensions/form-group.extension';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';


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
    NgbModule,
    CompromissosRoutingModule,
    ContatosModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    CompromissosService,
  ]
})
export class CompromissosModule { }
