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

@NgModule({
  declarations: [InserirContatoComponent, 
    ListarContatosComponent, 
    EditarContatoComponent, 
    ExcluirContatoComponent, 
    CardContatoComponent, DetalhesContatoComponent],
  imports: [CommonModule, 
    ReactiveFormsModule, 
    ContatosRoutingModule],
  providers: [ContatosService],
})
export class ContatosModule {}
