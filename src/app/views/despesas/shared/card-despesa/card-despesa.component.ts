import { Component, Input } from '@angular/core';
import { ListarDespesaViewModel } from '../../models/listar-despesa.view-model';

@Component({
  selector: 'app-card-despesa',
  templateUrl: './card-despesa.component.html',
  styleUrls: ['./card-despesa.component.css']
})
export class CardDespesaComponent {
  @Input({required: true}) despesa: ListarDespesaViewModel;

  constructor() {
    this.despesa = new ListarDespesaViewModel(
      '',
      '',
      0,
      new Date(),
      ''
    );
  }
}
