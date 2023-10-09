export class ListarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: string;

  constructor(
    id: string,
    descricao: string,
    valor: number,
    data: Date,
    formaPagamento: string,
  ) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.formaPagamento = formaPagamento;
  }
}
