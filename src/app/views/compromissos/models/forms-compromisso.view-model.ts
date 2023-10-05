import { TipoLocal } from "./compromisso-tipoLocal.enum";

export class FormsCompromissoViewModel {
  
  assunto: string;
  tipoLocal: TipoLocal;
  link: string;
  local: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  contatoId: string | null;

  constructor(
    assunto: string,
    tipoLocal: TipoLocal,
    link: string,
    local: string,
    data: Date,
    horaInicio: Date,
    horaTermino: Date,
    contatoId: string | null,
  ) {
    this.assunto = assunto;
    this.tipoLocal = tipoLocal;
    this.link = link;
    this.local = local;
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.contatoId = contatoId;
  }
}
