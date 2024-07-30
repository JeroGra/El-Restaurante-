import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEncuestasPage } from './ver-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: VerEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEncuestasPageRoutingModule {}
