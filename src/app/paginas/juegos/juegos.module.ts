import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosPageRoutingModule } from './juegos-routing.module';

import { JuegosPage } from './juegos.page';
import { MemoriaComponent } from 'src/app/componentes/juegos/juego_20_desc/memoria/memoria.component';
import { Juego15DescComponent } from 'src/app/componentes/juegos/juego-15-desc/juego-15-desc.component';
import { Juego10DescComponent } from 'src/app/componentes/juegos/juego-10-desc/juego-10-desc.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosPageRoutingModule
  ],
  declarations: [JuegosPage,MemoriaComponent,Juego15DescComponent,Juego10DescComponent]
})
export class JuegosPageModule {}
