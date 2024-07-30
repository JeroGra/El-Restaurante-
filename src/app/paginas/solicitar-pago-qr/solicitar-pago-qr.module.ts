import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarPagoQrPageRoutingModule } from './solicitar-pago-qr-routing.module';

import { SolicitarPagoQrPage } from './solicitar-pago-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarPagoQrPageRoutingModule
  ],
  declarations: [SolicitarPagoQrPage]
})
export class SolicitarPagoQrPageModule {}
