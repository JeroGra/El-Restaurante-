import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MesaClientePageRoutingModule } from './mesa-cliente-routing.module';
import { MesaClientePage } from './mesa-cliente.page';
import { ListadoProductosComponent } from 'src/app/componentes/listado-productos/listado-productos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EncuestaClienteComponent } from 'src/app/componentes/encuesta-cliente/encuesta-cliente.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaClientePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MesaClientePage,ListadoProductosComponent,EncuestaClienteComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MesaClientePageModule {}
