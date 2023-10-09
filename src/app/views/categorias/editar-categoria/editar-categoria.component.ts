import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;
  idSelecionado: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
  ) {
    this.idSelecionado = '';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['categoria'])).subscribe({
      next: (res: FormsCategoriaViewModel) => this.form.patchValue(res),
      error: (err: Error) => this.processarFalha(err)
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

    this.categoriaService.editar(this.idSelecionado!, this.categoriaVM).subscribe({
      next: (res: FormsCategoriaViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastService.success(
      `Categoria ${categoria.titulo} editadada com sucesso.`,
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
