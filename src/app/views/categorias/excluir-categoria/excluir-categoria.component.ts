import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit{
  categoriaVM: VisualizarCategoriaViewModel;
  idSelecionado: string | null = null;

  constructor(
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) {
    this.categoriaVM = new VisualizarCategoriaViewModel('', '');
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['categoria']))
      .subscribe({
        next: (res: VisualizarCategoriaViewModel) => this.categoriaVM = res,
        error: (err: Error) => this.processarFalha(err)
      });
  }

  gravar() {
    this.categoriaService.excluir(this.idSelecionado!).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso() {
    this.toastService.success(
      `Categoria excluída com sucesso.`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
