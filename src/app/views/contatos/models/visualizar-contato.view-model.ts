import { ListarCompromissoViewModel } from "../../compromissos/models/listar-compromisso.view-model";

export class VisualizarContatoViewModel {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
    empresa: string;
    compromissos: ListarCompromissoViewModel[];
  
    constructor(
      id: string,
      nome: string,
      email: string,
      telefone: string,
      cargo: string,
      empresa: string,
      compromissos?: ListarCompromissoViewModel[],
    ) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.cargo = cargo;
      this.empresa = empresa;

      this.compromissos = compromissos ?? [];
    }
  }
  