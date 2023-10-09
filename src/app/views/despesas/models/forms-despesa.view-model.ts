import { ListarCategoriaViewModel } from "../../categorias/models/listar-categoria.view-model";
import { TipoPagamento } from "./despesa-tipoPagamento.enum";

export class FormsDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: TipoPagamento;
  categoriasSelecionadas: ListarCategoriaViewModel[];

  constructor(
    descricao: string,
    valor: number,
    data: Date,
    formaPagamento: TipoPagamento,
    categoriasSelecionadas?: ListarCategoriaViewModel[]
    
  ) {
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.formaPagamento = formaPagamento;

    this.categoriasSelecionadas = categoriasSelecionadas ?? [];
  }
}