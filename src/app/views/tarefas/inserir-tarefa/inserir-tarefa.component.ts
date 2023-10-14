import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsTarefaViewModel } from '../models/tarefa/forms-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';
import { Router } from '@angular/router';
import { FormsItemTarefaViewModel } from '../models/Item-tarefa/forms-item-tarefa.view-model';
import { Form } from 'react-router-dom';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefaComponent implements OnInit{
  form!: FormGroup;
  formItem!: FormGroup;
  tarefaVM!: FormsTarefaViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefasService,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: this.formBuilder.array([]),
    });

    this.formItem = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
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

    this.tarefaService.inserir(this.tarefaVM).subscribe({
      next: (res: FormsTarefaViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  obterValorForm(): FormsTarefaViewModel {
    const valorForm = this.form.value;

    const itensForm: any[] = valorForm.itens;

    const itens: FormsItemTarefaViewModel[] = (itensForm.filter((c) => c.selected)
    .map((item) => new FormsItemTarefaViewModel(item.name, 1, false)));

    const novaTarefa = {
      titulo: valorForm.titulo ?? '',
      prioridade: valorForm.prioridade ?? 0,
      itens: itens ?? [],
    }

    return novaTarefa;
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

  processarSucesso(tarefa: FormsTarefaViewModel) {
    this.toastService.success(
      `Tarefa ${tarefa.titulo} inserida com sucesso.`,
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
