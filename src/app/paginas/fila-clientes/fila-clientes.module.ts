import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilaClientesPageRoutingModule } from './fila-clientes-routing.module';

import { FilaClientesPage } from './fila-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilaClientesPageRoutingModule
  ],
  declarations: [FilaClientesPage]
})
export class FilaClientesPageModule {}
