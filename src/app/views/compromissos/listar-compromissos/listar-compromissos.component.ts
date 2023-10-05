import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[];

  constructor(
    private compromissoService: CompromissosService,
    private toastService: ToastrService
    ) {
      this.compromissos = [];
    }

  ngOnInit(): void {
    this.compromissoService.selecionarTodos().subscribe({
      next: (res: ListarCompromissoViewModel[]) => this.compromissos = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}