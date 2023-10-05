import { Component, OnInit } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoLocal } from '../models/compromisso-tipoLocal.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit{
  compromissoVM!: VisualizarCompromissoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private compromissoService: CompromissosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) {
    this.compromissoVM = new VisualizarCompromissoViewModel(
      '',
      '',
      '',
      TipoLocal.Presencial,
      '',
      new Date(),
      new Date(),
      new Date(),
      null
    );
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.compromissoService
      .selecionarCompromissoCompletoPorId(this.idSelecionado)
      .subscribe({ 
        next: (res: VisualizarCompromissoViewModel) => this.compromissoVM = res,
        error: (err: Error) => this.processarFalha(err)
      });
    }

  gravar() {
    this.compromissoService.excluir(this.idSelecionado!).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso() {
    this.toastService.success(
      'Compromisso excluído com sucesso.',
      'Sucesso'
    );

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
