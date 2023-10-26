import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { TarefasService } from '../services/tarefas.service';
import { FormsCompletoTarefaViewModel } from '../models/tarefa/forms-completo-tarefa.view-model';
import { FormsCompletoItemTarefaViewModel } from '../models/Item-tarefa/forms-completo-item-tarefa.view-model';


@Component({
  selector: 'app-concluir-itens-tarefa',
  templateUrl: './concluir-itens-tarefa.component.html',
  styleUrls: ['./concluir-itens-tarefa.component.css']
})
export class ConcluirItensTarefaComponent implements OnInit{
  form!: FormGroup;
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
      itens: this.formBuilder.array([]),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.idSelecionado) return;

    this.route.data.pipe(map(res => res['tarefa'])).subscribe({
      next: (res: FormsCompletoTarefaViewModel) => this.selecionarConteudo(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  selecionarConteudo(res: FormsCompletoTarefaViewModel) {
    this.tarefaVM = res;

    this.popularOpcoes();
  }

  popularOpcoes() {
    const itensFormArray = this.form.get('itens') as FormArray;
    const itens = this.tarefaVM.itens;

    itens.forEach((item) => {
      itensFormArray.push(this.formBuilder.group({
        id: item.id ?? '',
        nome: item.titulo,
        checked: item.concluido
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
    .map((item) => new FormsCompletoItemTarefaViewModel(item.id, item.nome, 0, item.checked)));

    const novaTarefa = {
      id: this.idSelecionado,
      titulo: this.tarefaVM.titulo ?? '',
      prioridade: this.tarefaVM.prioridade ?? 0,
      itens: itens ?? [],
    }

    return novaTarefa;
  }

  processarSucesso(tarefa: FormsCompletoTarefaViewModel) {
    this.toastService.success(
      `Itens de ${tarefa.titulo} concluídos com sucesso.`,
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
