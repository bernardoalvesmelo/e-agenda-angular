import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private compromissoService: CompromissosService) {}

  ngOnInit(): void {
    this.compromissoService.selecionarTodos().subscribe((res) => {
      this.compromissos = res;
    });
  }
}
