import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[];

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService
    ) {
      this.compromissos = [];
    }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['compromissos'])).subscribe({
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
