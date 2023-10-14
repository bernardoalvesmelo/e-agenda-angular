import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { EditarTarefaComponent } from "./editar-tarefa/editar-tarefa.component";
import { ExcluirTarefaComponent } from "./excluir-tarefa/excluir-tarefa.component";
import { InserirTarefaComponent } from "./inserir-tarefa/inserir-tarefa.component";
import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { FormsTarefaViewModel } from "./models/tarefa/forms-tarefa.view-model";
import { ListarTarefaViewModel } from "./models/tarefa/listar-tarefa.view-model";
import { VisualizarTarefaViewModel } from "./models/tarefa/visualizar-tarefa.view-model";
import { TarefasService } from "./services/tarefas.service";
import { ConcluirItensTarefaComponent } from "./concluir-itens-tarefa/concluir-itens-tarefa.component";


const listarTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefasService).selecionarTodos();
};

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarTarefaCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: {tarefas: listarTarefasResolver}
  },
  {
    path: 'inserir',
    component: InserirTarefaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: {tarefa: formsTarefaResolver}
  },
  {
    path: 'concluir-itens-tarefa/:id',
    component: ConcluirItensTarefaComponent,
    resolve: {tarefa: formsTarefaResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: {tarefa: visualizarTarefaResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TarefasRoutingModule {

}
