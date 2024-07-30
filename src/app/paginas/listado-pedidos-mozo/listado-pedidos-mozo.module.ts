import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPedidosMozoPageRoutingModule } from './listado-pedidos-mozo-routing.module';

import { ListadoPedidosMozoPage } from './listado-pedidos-mozo.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPedidosMozoPageRoutingModule
  ],
  declarations: [ListadoPedidosMozoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListadoPedidosMozoPageModule {}
