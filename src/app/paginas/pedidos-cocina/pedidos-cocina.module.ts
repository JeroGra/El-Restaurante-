import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCocinaPageRoutingModule } from './pedidos-cocina-routing.module';

import { PedidosCocinaPage } from './pedidos-cocina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCocinaPageRoutingModule
  ],
  declarations: [PedidosCocinaPage]
})
export class PedidosCocinaPageModule {}
