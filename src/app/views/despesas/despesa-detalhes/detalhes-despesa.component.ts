import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Component({
  selector: 'app-detalhes-despesa',
  templateUrl: './detalhes-despesa.component.html',
  styleUrls: ['./detalhes-despesa.component.css']
})
export class DetalhesDespesaComponent {
  despesaVM!: VisualizarDespesaViewModel;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService,
  ) {
    this.despesaVM = new VisualizarDespesaViewModel(
      '',
      '',
      0,
      new Date(),
      0,
      []
    );
  }

  ngOnInit(): void {

    this.route.data.pipe(map(res => res['despesa']))
      .subscribe({
        next: (res: VisualizarDespesaViewModel) => this.despesaVM = res,
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
