import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriasService } from '../services/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriasService,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastService.warning(erro);
      }

      return;
    }

    this.categoriaVM = this.form.value;

    this.categoriaService.inserir(this.categoriaVM).subscribe({
      next: (res: FormsCategoriaViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastService.success(
      `Categoria ${categoria.titulo} inserida com sucesso.`,
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
