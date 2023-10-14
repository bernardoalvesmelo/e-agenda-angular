export class ListarTarefaViewModel {
  id: string;
  titulo: string;
  dataCriacao: Date;
  prioridade: string;
  situacao: string;

  constructor(
    id: string,
    titulo: string,
    dataCricacao: Date,
    prioridade: string,
    situacao: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.dataCriacao = dataCricacao;
    this.prioridade = prioridade;
    this.situacao = situacao;
  }
}