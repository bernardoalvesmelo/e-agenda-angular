import { VisualizarItemTarefaViewModel } from "../Item-tarefa/visualizar-item-tarefa.view-model";

export class VisualizarTarefaViewModel {
  titulo: string;
  dataCriacao: Date;
  dataConclusao: Date | null;
  quantidadeItens: number;
  percentualConcluido: number;
  prioridade: string;
  situacao: string;
  itens: VisualizarItemTarefaViewModel[];

  constructor(
    titulo: string,
    dataCricacao: Date,
    dataConclusao: Date | null,
    quantidadeItens: number,
    percentualConcluido: number,
    prioridade: string,
    situacao: string,
    itens?: VisualizarItemTarefaViewModel[]
  ) {
    this.titulo = titulo;
    this.dataCriacao = dataCricacao;
    this.dataConclusao = dataConclusao;
    this.quantidadeItens = quantidadeItens;
    this.percentualConcluido = percentualConcluido;
    this.prioridade = prioridade;
    this.situacao = situacao;

    this.itens = itens ?? [];
  }
}