import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent {
  despesas: ListarDespesaViewModel[];
  tipoListagem: 'todos' | 'antigas' | 'mes';

  constructor(
    private despesasService: DespesasService,
    private route: ActivatedRoute,
    private toastService: ToastrService
    ) {
      this.despesas = [];
      this.tipoListagem = 'todos';
    }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['despesas'])).subscribe({
      next: (res: ListarDespesaViewModel[]) => this.despesas = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  mudarListagem(tipo: 'todos' | 'antigas' | 'mes') {
    this.tipoListagem = tipo;
    switch(this.tipoListagem) {
      case 'todos':
        this.selecionarTodos();
        break;
      case 'antigas':
        this.selecionarDespesasAntigas();
        break;
      case 'mes':
        this.selecionarDespesasDoMes();
        break;
    }
  }

  selecionarTodos() {
    this.despesasService.selecionarTodos().subscribe({
      next: (res: ListarDespesaViewModel[]) =>{
         this.despesas = res;
        this.tipoListagem = 'todos';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarDespesasAntigas() {
    this.despesas = [];
    this.despesasService.selecionarDespesasAntigas().subscribe({
      next: (res: ListarDespesaViewModel[]) =>{
         this.despesas = res;
        this.tipoListagem = 'antigas';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarDespesasDoMes() {
    this.despesas = [];
    this.despesasService.selecionarDespesasDoMes().subscribe({
      next: (res: ListarDespesaViewModel[]) =>{
         this.despesas = res;
        this.tipoListagem = 'mes';
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
