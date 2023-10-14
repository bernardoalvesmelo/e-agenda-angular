import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CompromissosService } from '../services/compromissos.service';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[];
  tipoListagem: 'todos' | 'futuros' | 'hoje' | 'passados';

  constructor(
    private compromissosService: CompromissosService,
    private route: ActivatedRoute,
    private toastService: ToastrService
    ) {
      this.compromissos = [];
      this.tipoListagem = 'todos';
    }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['compromissos'])).subscribe({
      next: (res: ListarCompromissoViewModel[]) => this.compromissos = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  mudarListagem(tipo: 'todos' | 'futuros' | 'hoje' | 'passados') {
    this.tipoListagem = tipo;
    switch(this.tipoListagem) {
      case 'todos':
        this.selecionarTodos();
        break;
      case 'passados':
        this.selecionarCompromissosPassados();
        break;
      case 'hoje':
        this.selecionarCompromissosDeHoje();
        break;
      case 'futuros':
        this.selecionarCompromissosFuturos();
        break;
    }
  }

  selecionarTodos() {
    this.compromissosService.selecionarTodos().subscribe({
      next: (res: ListarCompromissoViewModel[]) =>{
         this.compromissos = res;
        this.tipoListagem = 'todos';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarCompromissosPassados() {
    this.compromissos = [];
    this.compromissosService.selecionarCompromissosPassados().subscribe({
      next: (res: ListarCompromissoViewModel[]) =>{
         this.compromissos = res;
        this.tipoListagem = 'passados';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarCompromissosDeHoje() {
    this.compromissos = [];
    this.compromissosService.selecionarCompromissosDeHoje().subscribe({
      next: (res: ListarCompromissoViewModel[]) =>{
         this.compromissos = res;
        this.tipoListagem = 'hoje';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarCompromissosFuturos() {
    this.compromissos = [];
    this.compromissosService.selecionarCompromissosFuturos().subscribe({
      next: (res: ListarCompromissoViewModel[]) =>{
         this.compromissos = res;
        this.tipoListagem = 'futuros';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
