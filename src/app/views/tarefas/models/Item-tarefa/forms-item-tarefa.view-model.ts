import { StatusItemTarefa } from "./status-item-tarefa.enum";


export class FormsItemTarefaViewModel {
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;

  constructor(
    titulo: string,
    status: StatusItemTarefa,
    concluido: boolean,
  ) {
    this.titulo = titulo;
    this.status = status;
    this.concluido = concluido;
  }
}