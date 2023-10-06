import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css'],
})
export class ExcluirContatoComponent implements OnInit {
  contatoVM: VisualizarContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private contatoService: ContatosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) {
    this.contatoVM = new VisualizarContatoViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['contato']))
      .subscribe({
        next: (res: VisualizarContatoViewModel) => this.contatoVM = res,
        error: (err: Error) => this.processarFalha(err)
      });
  }

  gravar() {
    this.contatoService.excluir(this.idSelecionado!).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso() {
    this.toastService.success(
      `Contato excluído com sucesso.`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}