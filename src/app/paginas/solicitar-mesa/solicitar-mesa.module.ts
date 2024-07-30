import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarMesaPageRoutingModule } from './solicitar-mesa-routing.module';

import { SolicitarMesaPage } from './solicitar-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarMesaPageRoutingModule
  ],
  declarations: [SolicitarMesaPage]
})
export class SolicitarMesaPageModule {}
