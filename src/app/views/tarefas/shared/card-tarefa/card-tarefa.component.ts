import { Component, Input } from '@angular/core';
import { ListarTarefaViewModel } from '../../models/tarefa/listar-tarefa.view-model';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.css']
})
export class CardTarefaComponent {
  @Input({required: true}) tarefa: ListarTarefaViewModel;

  constructor() {
    this.tarefa = new ListarTarefaViewModel(
      '',
      '',
      new Date(),
      '',
      ''
    );
  }
}
