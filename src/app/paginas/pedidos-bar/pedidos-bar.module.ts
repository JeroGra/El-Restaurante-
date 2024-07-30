import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosBarPageRoutingModule } from './pedidos-bar-routing.module';

import { PedidosBarPage } from './pedidos-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosBarPageRoutingModule
  ],
  declarations: [PedidosBarPage]
})
export class PedidosBarPageModule {}
