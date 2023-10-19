import { Component, ViewEncapsulation } from '@angular/core';
import { ExibirCarregamentoService } from './services/exibir-carregamento.service';

@Component({
  selector: 'app-exibir-carregamento',
  templateUrl: './exibir-carregamento.component.html',
  styleUrls: ['./exibir-carregamento.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ExibirCarregamentoComponent {
  constructor(public carregador: ExibirCarregamentoService) { }
}
