import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ExibirCarregamentoComponent } from './exibir-carregamento.component';
import { ExibirCarregamentoService } from './services/exibir-carregamento.service';

@NgModule({
  declarations: [
    ExibirCarregamentoComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ExibirCarregamentoComponent,
  ],
  providers: [
    ExibirCarregamentoService,
  ]
})
export class ExibirCarregamentoModule { }
