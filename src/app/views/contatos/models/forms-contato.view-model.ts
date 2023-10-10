export class FormsContatoViewModel {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
  favorito: boolean;

  constructor(
    nome: string,
    email: string,
    telefone: string,
    cargo: string,
    empresa: string,
    favorito?: boolean
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;

    this.favorito = favorito ?? false;
  }
}
