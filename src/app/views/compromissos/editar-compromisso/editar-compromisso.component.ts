import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent {
  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos!: ListarContatoViewModel[]; 
  idSelecionado: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissosService,
    private contatoService: ContatosService,
    private router: Router,
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.idSelecionado = '';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     assunto: new FormControl('', [Validators.required]),
     tipoLocal: new FormControl('', [Validators.required]),
     link: new FormControl('', [Validators.required]),
     local: new FormControl('', [Validators.required]),
     data: new FormControl(new Date(), [Validators.required]),
     horaInicio: new FormControl('08:00', [Validators.required]),
     horaTermino: new FormControl('09:00', [Validators.required]),
     contatoId: new FormControl(null)
    });

   
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return;

    this.compromissoService.selecionarPorId(this.idSelecionado).subscribe(res => {
      this.form.patchValue(res);
    })
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error(
        `Compromisso não pode ser inserido com campos inválidos.`,
        'Erro'
      );
      return;
    }

    this.compromissoVM = this.form.value;

    this.compromissoService.editar(this.idSelecionado!, this.compromissoVM).subscribe((res) => {
      this.toastService.success(
        `Compromisso editado com sucesso.`,
        'Sucesso'
        );

      this.router.navigate(['/compromissos/listar']);
    });
  }
}
