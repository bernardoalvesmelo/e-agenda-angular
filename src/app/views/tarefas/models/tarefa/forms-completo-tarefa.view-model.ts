import { FormsCompletoItemTarefaViewModel } from "../Item-tarefa/forms-completo-item-tarefa.view-model";
import { PrioridadeTarefa } from "./prioridade-tarefa.enum";

export class FormsCompletoTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefa;
  itens: FormsCompletoItemTarefaViewModel[];

  constructor(
    id: string,
    titulo: string,
    prioridade: PrioridadeTarefa,
    itens?: FormsCompletoItemTarefaViewModel[],
  ) {
    this.id = id;
    this.titulo = titulo;
    this.prioridade = prioridade;

    this.itens = itens ?? [];
  }
}