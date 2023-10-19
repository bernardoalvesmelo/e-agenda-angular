import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExibirCarregamentoService {
  private apiContador = 0;
  private estaCarregandoSubject = new BehaviorSubject<boolean>(false);
  estaCarregando$ = this.estaCarregandoSubject.asObservable();

  constructor() { }

  //versão funcional
  /*
  mostrarCarregamento() {
    if (this.apiContador === 0) {
      this.estaCarregandoSubject.next(true);
    }
    this.apiContador++;
  }

  ocultarCarregamento() {
    this.apiContador--;
    if (this.apiContador === 0) {
      this.estaCarregandoSubject.next(false);
    }
  }

  */
  //Para testes 
  mostrarCarregamento() {
    this.estaCarregandoSubject.next(true);
    this.apiContador++;
  }

  ocultarCarregamento() {
    this.apiContador--;
    setTimeout(()=> {
     this.estaCarregandoSubject.next(false)
    }, 1000)
  }
}