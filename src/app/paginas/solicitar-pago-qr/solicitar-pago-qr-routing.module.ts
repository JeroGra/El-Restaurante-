import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarPagoQrPage } from './solicitar-pago-qr.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarPagoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarPagoQrPageRoutingModule {}
