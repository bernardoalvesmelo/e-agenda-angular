import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { RouterModule } from '@angular/router';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardContatoComponent } from './shared/card-contato/card-contato.component';

import 'src/app/extensions/form-group.extension';
import { ContatosRoutingModule } from './contatos-routing.module';
import { DetalhesContatoComponent } from './detalhes-contato/detalhes-contato.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [InserirContatoComponent, 
    ListarContatosComponent, 
    EditarContatoComponent, 
    ExcluirContatoComponent, 
    CardContatoComponent, DetalhesContatoComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NgbModule, 
    ContatosRoutingModule,
  
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,    
    ],
  providers: [ContatosService],
})
export class ContatosModule {}
