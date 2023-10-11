import { ListarCategoriaViewModel } from "../../categorias/models/listar-categoria.view-model";
import { TipoPagamento } from "./despesa-tipoPagamento.enum";

export class FormsDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: TipoPagamento;
  categoriasSelecionadas: string[];

  constructor(
    descricao: string,
    valor: number,
    data: Date,
    formaPagamento: TipoPagamento,
    categoriasSelecionadas?: string[]
    
  ) {
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.formaPagamento = formaPagamento;

    this.categoriasSelecionadas = categoriasSelecionadas ?? [];
  }
}