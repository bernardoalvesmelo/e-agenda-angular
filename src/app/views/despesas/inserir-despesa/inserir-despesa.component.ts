import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarCategoriaViewModel } from '../../categorias/models/listar-categoria.view-model';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent {
  form!: FormGroup;
  despesaVM!: FormsDespesaViewModel;
  categorias!: ListarCategoriaViewModel[];

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      valor: new FormControl('', [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date(), [Validators.required]),
      formaPagamento: new FormControl('', [Validators.required]),
      categoriasSelecionadas: this.formBuilder.array([]),
    });

    this.route.data.pipe(map(res => res['categorias'])).subscribe({
      next: (res: ListarCategoriaViewModel[]) => {
        this.categorias = res;
        this.popularOpcoes();
    },
      error: (err: Error) => this.processarFalha(err)
    });
  }

  popularOpcoes() {
    const opcoesFormArray = this.form.get('categoriasSelecionadas') as FormArray;

    this.categorias.forEach((categoria) => {
      opcoesFormArray.push(this.formBuilder.group({
        id: categoria.id, 
        name: categoria.titulo,
        selected: false
      }));
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

    this.despesaVM = this.obterValorForm();

    this.despesaService.inserir(this.despesaVM).subscribe({
      next: (res: FormsDespesaViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  obterValorForm(): FormsDespesaViewModel {
    const valorForm = this.form.value;

    const categoriasForm: any[] = valorForm.categoriasSelecionadas;

    const categorias: string[] = (categoriasForm.filter((c) => c.selected)
    .map((opcao) => opcao.id));

    const novaDespesa = {
      descricao: valorForm.descricao ?? '',
      valor: valorForm.valor ?? 0,
      data: valorForm.data ?? new Date(),
      formaPagamento: valorForm.formaPagamento ?? 0,
      categoriasSelecionadas: categorias ?? [],
    }

    return novaDespesa;
  }

  processarSucesso(despesa: FormsDespesaViewModel) {
    this.toastService.success(
      `Despesa ${despesa.descricao} inserida com sucesso.`,
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
