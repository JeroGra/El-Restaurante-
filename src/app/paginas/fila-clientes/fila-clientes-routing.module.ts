import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilaClientesPage } from './fila-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: FilaClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilaClientesPageRoutingModule {}
