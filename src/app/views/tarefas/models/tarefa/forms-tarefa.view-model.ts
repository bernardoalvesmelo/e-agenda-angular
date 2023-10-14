import { FormsCompletoItemTarefaViewModel } from "../Item-tarefa/forms-completo-item-tarefa.view-model";
import { FormsItemTarefaViewModel } from "../Item-tarefa/forms-item-tarefa.view-model";
import { PrioridadeTarefa } from "./prioridade-tarefa.enum";

export class FormsTarefaViewModel {
  titulo: string;
  prioridade: PrioridadeTarefa;
  itens: FormsItemTarefaViewModel[];

  constructor(
    titulo: string,
    prioridade: PrioridadeTarefa,
    itens?: FormsItemTarefaViewModel[],
  ) {
    this.titulo = titulo;
    this.prioridade = prioridade;

    this.itens = itens ?? [];
  }
}