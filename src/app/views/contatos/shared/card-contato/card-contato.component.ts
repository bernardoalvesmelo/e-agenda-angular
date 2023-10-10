import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatoViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
  @Input({required: true}) contato: ListarContatoViewModel;

  @Output() onfavoritoSelecionado: EventEmitter<ListarContatoViewModel>;

  constructor() {
    this.contato = new ListarContatoViewModel(
      '', 
      '', 
      '', 
      '', 
      ''
    );

    this.onfavoritoSelecionado = new EventEmitter();
  }

    mudarFavorito() {
      this.contato.favorito = !this.contato.favorito;
      this.onfavoritoSelecionado.emit(this.contato);
    }
}
