import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerEncuestasPageRoutingModule } from './ver-encuestas-routing.module';
import { VerEncuestasPage } from './ver-encuestas.page';
//----> Graficos (Apex Charts)
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEncuestasPageRoutingModule,
    NgApexchartsModule,
  ],
  declarations: [VerEncuestasPage]
})
export class VerEncuestasPageModule {}
