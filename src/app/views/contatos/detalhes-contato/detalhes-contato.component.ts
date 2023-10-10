import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes-contato',
  templateUrl: './detalhes-contato.component.html',
  styleUrls: ['./detalhes-contato.component.css']
})
export class DetalhesContatoComponent implements OnInit {
  contatoVM: VisualizarContatoViewModel;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService,
  ) {
    this.contatoVM = new VisualizarContatoViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['contato']))
      .subscribe({
        next: (res: VisualizarContatoViewModel) => this.contatoVM = res,
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
