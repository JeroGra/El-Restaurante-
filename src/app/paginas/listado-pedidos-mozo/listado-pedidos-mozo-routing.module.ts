import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPedidosMozoPage } from './listado-pedidos-mozo.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPedidosMozoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPedidosMozoPageRoutingModule {}
