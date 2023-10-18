import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "./local-store.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";

@Injectable()
export class AuthService {
  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';

  private endpointLogin: string = this.endpoint + 'autenticar';

  private endpointLogout: string = this.endpoint + 'sair';

  private usuarioAutenticado: BehaviorSubject<UsuarioTokenViewModel | undefined>;

constructor(
  private localStorageService: LocalStorageService,
  private http: HttpClient) {
    this.usuarioAutenticado = 
      new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);
  }

public obterUsuarioAutenticado() {
  return this.usuarioAutenticado.asObservable();
}

public registrar(usuario:  RegistrarUsuarioViewModel): Observable<TokenViewModel> {
  return this.http.post<any>(this.endpointRegistrar, usuario)
  .pipe(
    map(res => res.dados),
    tap((dados: TokenViewModel)  => this.localStorageService.salvarDadosLocaisUsuario(dados)),
    tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
}

public login(usuario:  AutenticarUsuarioViewModel): Observable<TokenViewModel> {
  return this.http.post<any>(this.endpointLogin, usuario)
  .pipe(
    map(res => res.dados),
    tap((dados: TokenViewModel)  => this.localStorageService.salvarDadosLocaisUsuario(dados)),
    tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
}

public logout(): Observable<any>{
  return this.http.post<any>(this.endpointLogout, {}, this.obterHeadersAutorizacao())
    .pipe(
      tap(() => this.notificarLogout()),
      tap(() => this.localStorageService.limparDadosLocais())
    );
}

public logarUsuarioSalvo(): void {
  const dados = this.localStorageService.obterDadosLocaisSalvos();

  if(!dados) return;

  const tokenEstaValido = new Date(dados.dataExpiracao) > new Date();

  if (tokenEstaValido) this.notificarLogin(dados.usuarioToken);
}

private notificarLogin(usuario: UsuarioTokenViewModel): void {
  this.usuarioAutenticado.next(usuario);
}

private notificarLogout(): void {
  this.usuarioAutenticado.next(undefined);
}

private processarErroHttp(erro: HttpErrorResponse) {
  let mensagemErro: string = '';

  switch(erro.status) {
    case 0:
      mensagemErro = 'Erro ao processar a requisição.';
      break;
    case 401:
      mensagemErro = 'Usuário não autorizado, necessário efetuar login.';
      break;
    default:
      mensagemErro = erro.error?.erros[0];
  }

  return throwError(() => new Error(mensagemErro));
}

private obterHeadersAutorizacao() {
  const token = this.localStorageService
    .obterDadosLocaisSalvos()?.chave;

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };
}
}