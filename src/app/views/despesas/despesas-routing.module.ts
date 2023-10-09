import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarCategoriaViewModel } from "../categorias/models/listar-categoria.view-model";
import { CategoriasService } from "../categorias/services/categorias.service";
import { EditarDespesaComponent } from "./editar-despesa/editar-despesa.component";
import { ExcluirDespesaComponent } from "./excluir-despesa/excluir-despesa.component";
import { InserirDespesaComponent } from "./inserir-despesa/inserir-despesa.component";
import { ListarDespesasComponent } from "./listar-despesas/listar-despesas.component";
import { FormsDespesaViewModel } from "./models/forms-despesa.view-model";
import { ListarDespesaViewModel } from "./models/listar-despesa.view-model";
import { VisualizarDespesaViewModel } from "./models/visualizar-despesa.view-model";
import { DespesasService } from "./services/despesas.service";

const listarCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

const listarDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesasService).selecionarTodos();
};

const formsDespesaResolver: ResolveFn<FormsDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarDespesaCompletaPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  // Despesas
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarDespesasComponent,
    resolve: {despesas: listarDespesasResolver}
  },
  {
    path: 'inserir',
    component: InserirDespesaComponent,
    resolve: {categorias: listarCategoriasResolver}
  },
  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: {despesa: formsDespesaResolver, categorias: listarCategoriasResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesaComponent,
    resolve: {despesa: visualizarDespesaResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DespesasRoutingModule {}