import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css'],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[];

  constructor(
    private contatosService: ContatosService,
    private toastService: ToastrService,  
  ) {
    this.contatos = [];
  }

  ngOnInit(): void {
    this.contatosService.selecionarTodos().subscribe({
      next: (res: ListarContatoViewModel[]) => this.contatos = res,
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
