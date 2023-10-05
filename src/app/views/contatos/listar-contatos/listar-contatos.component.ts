import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css'],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(private contatosService: ContatosService) {}

  ngOnInit(): void {
    this.contatosService.selecionarTodos().subscribe((res) => {
      this.contatos = res;
    });
  }
}
