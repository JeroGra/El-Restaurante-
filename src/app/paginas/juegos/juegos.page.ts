import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage {

  pedido:any
  mostrarJuegos:boolean = true
  mostrarJuego10:any = false;
  mostrarJuego15:any = false;
  mostrarJuego20:any = false;
  Desc20Aplicado:boolean = false
  Desc10Aplicado:boolean = false
  Desc15Aplicado:boolean = false
  descuentoTotal:number = 0;

  constructor(private bdSrv:BaseDatosService) { 
    const pedidoString = localStorage.getItem('pedido');
    console.log(pedidoString)
    const pedido = pedidoString ? JSON.parse(pedidoString) : null;
    this.bdSrv.TraerPedidoPorUid(pedido.uid).subscribe((ped:any) => {
      ped.forEach((e:any) => {
        this.pedido = e as Pedido
        this.descuentoTotal = this.pedido.descuentoJuego
        console.info(this.pedido)
        if(this.pedido.desc10)
          this.Desc10Aplicado = true;
        if(this.pedido.desc15)
          this.Desc15Aplicado = true;
        if(this.pedido.desc20)
          this.Desc20Aplicado = true;
      });
    })
  }

  Jugar10Descuento(){
    this.mostrarJuegos = false;
    this.mostrarJuego20 = false;
    this.mostrarJuego15 = false;
    this.mostrarJuego10 = true;
  }

  Jugar15Descuento(){
    this.mostrarJuegos = false;
    this.mostrarJuego10 = false;
    this.mostrarJuego20 = false;
    this.mostrarJuego15 = true;
  }

  Jugar20Descuento(){
    this.mostrarJuegos = false;
    this.mostrarJuego10 = false;
    this.mostrarJuego15 = false;
    this.mostrarJuego20 = true;
  }

  //Los componentes hijos emitiran un evento que se manejaran aca
  AgregarDescuento($event:any)
  {
    this.pedido.descuentoJuego += $event
    switch ($event) {
      case 20:
        this.pedido.desc20 = true
        this.Desc20Aplicado = true
        break;
      case 15:
        this.pedido.desc15 = true
        this.Desc15Aplicado = true
        break;
      case 10:
        this.pedido.desc10 = true
        this.Desc10Aplicado = true
        break;
    }
    localStorage.setItem("pedido",JSON.stringify(this.pedido))
    this.bdSrv.AgregarDescuentoJuego(this.pedido)
  }

  CerrarJuego($event:any)
  {
    this.mostrarJuego10 = false;
    this.mostrarJuego15 = false;
    this.mostrarJuego20 = false;
    this.mostrarJuegos = true;
  }

  YaJugo($event:any)
  {
    switch ($event) {
      case 20:
        this.pedido.desc20 = true
        this.Desc20Aplicado = true
        break;
      case 15:
        this.pedido.desc15 = true
        this.Desc15Aplicado = true
        break;
      case 10:
        this.pedido.desc10 = true
        this.Desc10Aplicado = true
        break;
    }
    localStorage.setItem("pedido",JSON.stringify(this.pedido))
    this.bdSrv.AgregarDescuentoJuego(this.pedido)
  }
}
