import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { TipoLocal } from "./compromisso-tipoLocal.enum";

export class VisualizarCompromissoViewModel {
  
  id: string;
  assunto: string;
  tipoLocal: TipoLocal;
  link: string;
  local: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  contato: ListarContatoViewModel | null;

  constructor(
    id: string,
    assunto: string,
    tipoLocal: TipoLocal,
    link: string,
    local: string,
    data: Date,
    horaInicio: Date,
    horaTermino: Date,
    contato: ListarContatoViewModel  | null,
  ) {
    this.id = id;
    this.assunto = assunto;
    this.tipoLocal = tipoLocal;
    this.link = link;
    this.local = local;
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.contato = contato;
  }
}
