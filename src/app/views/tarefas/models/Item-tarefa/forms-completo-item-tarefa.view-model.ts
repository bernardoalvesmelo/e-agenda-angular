import { StatusItemTarefa } from "./status-item-tarefa.enum";


export class FormsCompletoItemTarefaViewModel {
  id: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;

  constructor(
    id: string,
    titulo: string,
    status: StatusItemTarefa,
    concluido: boolean,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.status = status;
    this.concluido = concluido;
  }
}