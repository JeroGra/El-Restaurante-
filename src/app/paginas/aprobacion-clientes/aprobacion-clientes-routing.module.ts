import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprobacionClientesPage } from './aprobacion-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: AprobacionClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprobacionClientesPageRoutingModule {}
