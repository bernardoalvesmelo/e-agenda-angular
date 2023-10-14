import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarTarefaViewModel } from '../models/tarefa/listar-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit{
  tarefas: ListarTarefaViewModel[];
  tipoListagem: 'todos' | 'pendentes' | 'concluidos';

  constructor(
    private tarefasService: TarefasService,
    private route: ActivatedRoute,
    private toastService: ToastrService,  
  ) {
    this.tarefas = [];
    this.tipoListagem = 'todos';
  }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['tarefas'])).subscribe({
      next: (res: ListarTarefaViewModel[]) => this.tarefas = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  mudarListagem(tipo: 'todos' | 'pendentes' | 'concluidos') {
    this.tipoListagem = tipo;
    switch(this.tipoListagem) {
      case 'todos':
        this.selecionarTodos();
        break;
      case 'pendentes':
        this.selecionarTarefasPendentes();
        break;
      case 'concluidos':
        this.selecionarTarefasConcluidas();
        break;
    }
  }

  selecionarTodos() {
    this.tarefasService.selecionarTodos().subscribe({
      next: (res: ListarTarefaViewModel[]) =>{
         this.tarefas = res;
        this.tipoListagem = 'todos';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarTarefasPendentes() {
    this.tarefas = [];
    this.tarefasService.selecionarTarefasPendentes().subscribe({
      next: (res: ListarTarefaViewModel[]) =>{
         this.tarefas = res;
        this.tipoListagem = 'pendentes';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarTarefasConcluidas() {
    this.tarefas = [];
    this.tarefasService.selecionarTarefasConcluidas().subscribe({
      next: (res: ListarTarefaViewModel[]) =>{
         this.tarefas = res;
        this.tipoListagem = 'concluidos';
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
