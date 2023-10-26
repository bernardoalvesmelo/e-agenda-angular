import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Injectable()
export class DespesasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(
    private http: HttpClient) {}

  public inserir(despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel> {
    return this.http.post<any>(
      this.endpoint, despesa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, despesa: FormsDespesaViewModel) {
    return this.http
      .put<any>(this.endpoint + id, despesa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id)
    .pipe(catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarDespesasAntigas(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<any>(this.endpoint + 'antigas')
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarDespesasDoMes(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<any>(this.endpoint + 'ultimos-30-dias')
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarDespesaCompletaPorId(
    id: string
  ): Observable<VisualizarDespesaViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id
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

}