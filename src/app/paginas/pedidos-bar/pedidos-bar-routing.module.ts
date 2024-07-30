import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosBarPage } from './pedidos-bar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosBarPageRoutingModule {}
