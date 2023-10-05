import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
  ) {
    this.idSelecionado = '';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe({
      next: (res: FormsContatoViewModel) => this.form.patchValue(res),
      error: (err: Error) => this.processarFalha(err)
    });

  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  get email() {
    return this.form.get('email');
  }


  gravar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.warning(
        `Contato não pode ser editado com campos inválidos.`,
        'Aviso'
      );
      return;
    }

    this.contatoVM = this.form.value;

    this.contatoService.editar(this.idSelecionado!, this.contatoVM).subscribe({
      next: (res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastService.success(
      `Contato ${contato.nome} editado com sucesso.`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
