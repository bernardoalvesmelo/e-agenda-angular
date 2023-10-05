import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { Router } from '@angular/router';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../../contatos/models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit {
  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos!: ListarContatoViewModel[];

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissosService,
    private contatoService: ContatosService,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      data: new FormControl(new Date(), [Validators.required]),
      horaInicio: new FormControl('08:00', [Validators.required]),
      horaTermino: new FormControl('09:00', [Validators.required]),
      contatoId: new FormControl(null)
    });

    this.contatoService.selecionarTodos().subscribe({
      next: (res: ListarContatoViewModel[]) => this.contatos = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.warning(
        `Compromisso não pode ser inserido com campos inválidos.`,
        'Aviso'
      );
      return;
    }

    this.compromissoVM = this.form.value;

    this.compromissoService.inserir(this.compromissoVM).subscribe({
      next: (res: FormsCompromissoViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(compromisso: FormsCompromissoViewModel) {
    this.toastService.success(
      `Compromisso ${compromisso.assunto} inserido com sucesso.`,
      'Sucesso'
    );

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }

}
