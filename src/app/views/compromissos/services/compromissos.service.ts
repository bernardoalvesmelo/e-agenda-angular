import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';

import 'src/app/extensions/form-group.extension';
import { LocalStorageService } from 'src/app/core/auth/services/local-store.service';


@Injectable()
export class CompromissosService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/compromissos/';

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient) {}

  public inserir(compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel> {
    return this.http.post<any>(
      this.endpoint, compromisso, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, compromisso: FormsCompromissoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, compromisso, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(catchError((err: HttpErrorResponse) => this.processarErroHttp(err)))
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarCompromissosPassados(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint + 'passados/' + new Date(Date.now()).toDateString().replaceAll('/','-'), 
      this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarCompromissosDeHoje(): Observable<ListarCompromissoViewModel[]> {
    return this.http.get<any>(this.endpoint + 'hoje', this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarCompromissosFuturos(): Observable<ListarCompromissoViewModel[]> {
    const dataFutura = new Date(Date.now());
    dataFutura.setDate(dataFutura.getDate() + 1);

    return this.http
      .get<any>(this.endpoint + `futuros/${dataFutura.toDateString().replaceAll('/','-')}` +
      `=${new Date('12/12/2222').toDateString().replaceAll('/','-')}`, 
      this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarCompromissoCompletoPorId(
    id: string
  ): Observable<VisualizarCompromissoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(map((res) => res.dados),
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