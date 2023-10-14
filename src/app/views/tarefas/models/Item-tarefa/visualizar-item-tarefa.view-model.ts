export class VisualizarItemTarefaViewModel {
  titulo: string;
  situacao: string;

  constructor(
    titulo: string,
    situacao: string
  ) {
    this.titulo = titulo;
    this.situacao = situacao;
  }
}