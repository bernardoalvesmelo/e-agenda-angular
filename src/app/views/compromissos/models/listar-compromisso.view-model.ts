

export class ListarCompromissoViewModel  {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  nomeContato: string;

  constructor(
    id: string,
    assunto: string,
    data: Date,
    horaInicio: Date,
    horaTermino: Date,
    nomeContato: string,
  ) {
    this.id = id;
    this.assunto = assunto;
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.nomeContato = nomeContato;
  }
}