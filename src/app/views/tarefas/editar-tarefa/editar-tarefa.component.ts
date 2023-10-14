import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TarefasService } from '../services/tarefas.service';
import { map } from 'rxjs';

import { FormsCompletoItemTarefaViewModel } from '../models/Item-tarefa/forms-completo-item-tarefa.view-model';
import { FormsCompletoTarefaViewModel } from '../models/tarefa/forms-completo-tarefa.view-model';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit{
  form!: FormGroup;
  formItem!: FormGroup;
  tarefaVM!: FormsCompletoTarefaViewModel;
  idSelecionado!: string;

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) { 
    this.idSelecionado = '';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: this.formBuilder.array([]),
    });

    this.formItem = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['tarefa'])).subscribe({
      next: (res: FormsCompletoTarefaViewModel) => this.selecionarConteudo(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  selecionarConteudo(res: FormsCompletoTarefaViewModel) {
    this.form.patchValue({
      titulo: res.titulo ?? '',
      prioridade: res.prioridade ?? 0,
    });

    this.tarefaVM = res;

    this.popularOpcoes();
  }

  popularOpcoes() {
    const itensFormArray = this.form.get('itens') as FormArray;
    const itens = this.tarefaVM.itens;

    itens.forEach((item) => {
      itensFormArray.push(this.formBuilder.group({
        id: item.id,
        name: item.titulo,
        selected: true
      }));
    });
  }

  AdicionarFormItem(titulo: string) {
    const itensFormArray = this.form.get('itens') as FormArray;

    itensFormArray.push(this.formBuilder.group({ 
      name: titulo,
      selected: true
    }));

    this.formItem.get('titulo')?.setValue('');
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  campoEstaInvalidoItem(nome: string) {
    return this.formItem.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastService.warning(erro);
      }

      return;
    }

    this.tarefaVM = this.obterValorForm();

    this.tarefaService.editar(this.idSelecionado, this.tarefaVM).subscribe({
      next: (res: FormsCompletoTarefaViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  obterValorForm(): FormsCompletoTarefaViewModel {
    const valorForm = this.form.value;

    const itensForm: any[] = valorForm.itens;

    const itens: FormsCompletoItemTarefaViewModel[] = (itensForm
    .map((item) => this.mapearItem(item)));

    const novaTarefa = {
      id: this.idSelecionado,
      titulo: valorForm.titulo ?? '',
      prioridade: valorForm.prioridade ?? 0,
      itens: itens ?? [],
    }

    return novaTarefa;
  }

  mapearItem(item: any): FormsCompletoItemTarefaViewModel {
    const itemSelecionado = this.tarefaVM.itens.find(i => i.id == item.id);

    const concluido = itemSelecionado ? itemSelecionado.concluido : false;
    let status = itemSelecionado ? 0 : 1;
    status = item.selected ? status : 2;

    return new FormsCompletoItemTarefaViewModel(item.id, item.name, status, concluido);
  }

  adicionarItem() {
    if (this.formItem.invalid) {
      for (let erro of this.formItem.validate()) {
        this.toastService.warning(erro);
      }

      return;
    }

    const titulo = this.formItem.get('titulo')?.value;
    this.AdicionarFormItem(titulo);
  }

  processarSucesso(tarefa: FormsCompletoTarefaViewModel) {
    this.toastService.success(
      `Tarefa ${tarefa.titulo} editada com sucesso.`,
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
