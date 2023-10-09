import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit{
  categorias: ListarCategoriaViewModel[];

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService,  
  ) {
    this.categorias = [];
  }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['categorias'])).subscribe({
      next: (res: ListarCategoriaViewModel[]) => this.categorias = res,
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
