import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ContatosService } from '../services/contatos.service';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css'],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[];
  tipoListagem: 'favoritos' | 'todos';

  constructor(
    private route: ActivatedRoute,
    private contatosService: ContatosService,
    private toastService: ToastrService,  
  ) {
    this.contatos = [];
    this.tipoListagem = 'todos';
  }

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['contatos'])).subscribe({
      next: (res: ListarContatoViewModel[]) => this.contatos = res,
      error: (err: Error) => this.processarFalha(err)
    });
  }

  mudarFavorito(contato: ListarContatoViewModel) {
    this.contatosService.selecionarPorId(contato.id).subscribe(res => {
      res.favorito = contato.favorito;
      this.contatosService.mudarFavorito(contato.id, res).subscribe(res  => {
        this.atualizarFavoritos(res);
      })
    })
  }

  atualizarFavoritos(contato: FormsContatoViewModel) {
    if(this.tipoListagem == 'todos') {
      this.selecionarTodos();
      this.toastService.success(`Contato ${contato.nome} favoritado!`);
    }

    else if(this.tipoListagem == 'favoritos') {
      this.selecionarFavoritos();
      this.toastService.success(`Contato ${contato.nome} desfavoritado!`);
    }
  }

  mudarListagem(tipo: 'favoritos' | 'todos') {
    this.tipoListagem = tipo;
    if(this.tipoListagem == 'todos') {
      this.selecionarTodos();
    }

    else if(this.tipoListagem == 'favoritos') {
      this.selecionarFavoritos();
    }
  }

  selecionarTodos() {
    this.contatosService.selecionarTodos().subscribe({
      next: (res: ListarContatoViewModel[]) =>{
         this.contatos = res;
        this.tipoListagem = 'todos';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  selecionarFavoritos() {
    this.contatos = [];
    this.contatosService.selecionarTodosFavoritos().subscribe({
      next: (res: ListarContatoViewModel[]) =>{
         this.contatos = res;
        this.tipoListagem = 'favoritos';
      },
      error: (erro: Error) => this.processarFalha(erro)
    });
  }

  processarFalha(erro: Error) {
    this.toastService.error(
      erro.message,
      'Erro'
    );
  }
}
