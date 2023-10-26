import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, filter, map, tap, throwError } from 'rxjs';
import { FormsTarefaViewModel } from '../models/tarefa/forms-tarefa.view-model';
import { ListarTarefaViewModel } from '../models/tarefa/listar-tarefa.view-model';
import { VisualizarTarefaViewModel } from '../models/tarefa/visualizar-tarefa.view-model';
import { isNgTemplate } from '@angular/compiler';
import { FormsCompletoTarefaViewModel } from '../models/tarefa/forms-completo-tarefa.view-model';


@Injectable()
export class TarefasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient) {}

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http.post<any>(
      this.endpoint, tarefa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, tarefa: FormsCompletoTarefaViewModel) {
    return this.http
      .put<any>(this.endpoint + id, tarefa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id)
    .pipe(catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTarefasPendentes(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
      map(dados => [...dados].filter(d => d.situacao == 'Pendente')),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTarefasConcluidas(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
      map(dados => [...dados].filter(d => d.situacao == 'Concluído')),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }
  
  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTarefaCompletoPorId(
    id: string
  ): Observable<VisualizarTarefaViewModel> {
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