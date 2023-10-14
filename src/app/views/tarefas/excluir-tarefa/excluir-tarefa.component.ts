import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { TipoLocal } from '../../compromissos/models/compromisso-tipoLocal.enum';
import { VisualizarTarefaViewModel } from '../models/tarefa/visualizar-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css']
})
export class ExcluirTarefaComponent implements OnInit{
  tarefaVM!: VisualizarTarefaViewModel;
  idSelecionado: string | null = null;

  constructor(
    private tarefaService: TarefasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) {
    this.tarefaVM = new VisualizarTarefaViewModel(
      '', 
      new Date(),
      null,
      0,
      0,
      '',
      '',
    );
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['tarefa']))
      .subscribe({
        next: (res: VisualizarTarefaViewModel) => this.tarefaVM = res,
        error: (err: Error) => this.processarFalha(err)
      });
  }

  gravar() {
    this.tarefaService.excluir(this.idSelecionado!).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso() {
    this.toastService.success(
      'Tarefa excluído com sucesso.',
      'Sucesso'
    );

    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
