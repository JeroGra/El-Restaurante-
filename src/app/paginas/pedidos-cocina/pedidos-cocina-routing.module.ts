import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosCocinaPage } from './pedidos-cocina.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosCocinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosCocinaPageRoutingModule {}
