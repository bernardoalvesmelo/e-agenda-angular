import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

    this.contatoService
      .selecionarContatoCompletoPorId(this.idSelecionado)
      .subscribe((res) => {
        this.contatoVM = res;
      });
  }

  gravar() {
    this.contatoService.excluir(this.idSelecionado!).subscribe((res) => {
      this.toastService.success('Contato excluído com sucesso.', 'Sucesso');
      this.router.navigate(['/contatos', 'listar']);
    });
  }
}