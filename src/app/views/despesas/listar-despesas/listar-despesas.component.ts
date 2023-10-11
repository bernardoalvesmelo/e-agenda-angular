import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent {
  despesas: ListarDespesaViewModel[];

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService
    ) {
      this.despesas = [];
    }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['despesas'])).subscribe({
      next: (res: ListarDespesaViewModel[]) => this.despesas = res,
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
