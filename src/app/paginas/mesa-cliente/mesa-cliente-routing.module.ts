import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesaClientePage } from './mesa-cliente.page';


const routes: Routes = [
  {
    path: '',
    component: MesaClientePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesaClientePageRoutingModule {}
