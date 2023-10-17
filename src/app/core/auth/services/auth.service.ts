import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "./local-store.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";

@Injectable()
export class AuthService {
  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';

  private endpointLogin: string = this.endpoint + 'autenticar';


constructor(
  private localStorageService: LocalStorageService,
  private http: HttpClient) {}

public registrar(usuario:  RegistrarUsuarioViewModel): Observable<TokenViewModel> {
  return this.http.post<any>(this.endpointRegistrar, usuario)
  .pipe(
    map(res => res.dados),
    tap((dados: TokenViewModel)  => this.localStorageService.salvarDadosLocaisUsuario(dados)),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
}

public login(usuario:  AutenticarUsuarioViewModel): Observable<TokenViewModel> {
  return this.http.post<any>(this.endpointLogin, usuario)
  .pipe(
    map(res => res.dados),
    tap((dados: TokenViewModel)  => this.localStorageService.salvarDadosLocaisUsuario(dados)),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
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
}