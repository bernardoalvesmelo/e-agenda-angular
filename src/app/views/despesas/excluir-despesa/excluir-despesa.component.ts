import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styleUrls: ['./excluir-despesa.component.css']
})
export class ExcluirDespesaComponent {
  despesaVM!: VisualizarDespesaViewModel;
  idSelecionado: string | null = null;

  constructor(
    private despesaService: DespesasService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['despesa']))
      .subscribe({
        next: (res: VisualizarDespesaViewModel) => this.despesaVM = res,
        error: (err: Error) => this.processarFalha(err)
      });
  }

  gravar() {
    this.despesaService.excluir(this.idSelecionado!).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso() {
    this.toastService.success(
      'Despesa excluída com sucesso.',
      'Sucesso'
    );

    this.router.navigate(['/despesas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
