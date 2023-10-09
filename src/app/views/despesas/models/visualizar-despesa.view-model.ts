import { TipoPagamento } from "./despesa-tipoPagamento.enum";

export class VisualizarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: TipoPagamento;
  categorias: string[];

  constructor(
    id: string,
    descricao: string,
    valor: number,
    data: Date,
    formaPagamento: TipoPagamento,
    categorias?: string[]
    
  ) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.formaPagamento = formaPagamento;

    this.categorias = categorias ?? [];
  }
}