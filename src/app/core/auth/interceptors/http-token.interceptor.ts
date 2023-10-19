import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-store.service';
import { ExibirCarregamentoService } from '../../exibir-carregamento/services/exibir-carregamento.service';
import { map, tap } from 'rxjs';


export const httpTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn) => {

    console.log('chamada');

  const exibirCarregamentoService = inject(ExibirCarregamentoService);

  exibirCarregamentoService.mostrarCarregamento();

  const token = inject(LocalStorageService).obterDadosLocaisSalvos()?.chave;

  const requestModificada = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(requestModificada).pipe(
    tap(() => exibirCarregamentoService.ocultarCarregamento())
  );
};