import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobacionClientesPageRoutingModule } from './aprobacion-clientes-routing.module';

import { AprobacionClientesPage } from './aprobacion-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprobacionClientesPageRoutingModule
  ],
  declarations: [AprobacionClientesPage]
})
export class AprobacionClientesPageModule {}
