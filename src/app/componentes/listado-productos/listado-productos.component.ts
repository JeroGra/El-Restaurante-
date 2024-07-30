import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { PushNotificationService } from 'src/app/servicios/push-notification.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
})
export class ListadoProductosComponent  implements OnInit {

  @Input() productos:any
  @Input() numeroMesa:any
  @Output() pedidoFinalizado = new EventEmitter<any>();
  productosAPedir:any = []
  importeTotal:number = 0;
  tiempoMaximo = 0;
  mostrarPedido:boolean = false
  loading:boolean = false;
  pedidoFormato: any= {};
  cliente:any
  soloCocinero:boolean = false;
  soloBartender:boolean = false;

  constructor(private bdSrv:BaseDatosService,private pushSrv:PushNotificationService) { }

  ngOnInit() {
    this.cliente = this.bdSrv.Getlog()
    if(this.cliente)
    {
      console.log("Cliente es valido")
      console.info(this.cliente)
    }
    else{
      console.log("Cliente es nulo")
    }
  }

  AgregarProductoAlPedido(producto:any)
  {
    this.productosAPedir.push(producto);
    this.tiempoMaximo += producto.duracion
    this.ActualizarImporte();
  }

  QuitarProductoDelPedido(producto:any)
  {
    let index;
    index = this.productosAPedir.find((prod:any) => prod.uid == producto.uid)
    if (index) {
      this.tiempoMaximo -= producto.duracion
      this.productosAPedir.splice(index, 1);
    }
    this.ActualizarImporte()
  }

  ActualizarImporte(){
    this.importeTotal = 0
    this.productosAPedir.forEach((prod:any) => {
      this.importeTotal = this.importeTotal + parseFloat(prod.precio)
    });
  }

  AgruparProductos(pedido: any[]): any[] {
    const productosAgrupados:any = [];

    pedido.forEach((producto) => {
      const productoExistente = productosAgrupados.find((p:any) => p.nombre === producto.nombre);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        productosAgrupados.push({
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        });
      }
    });

    return productosAgrupados;
  }

  CambiarVista(menu:string){
    if(menu === "pedir")
    {
      this.mostrarPedido = false
    }
    else{
      this.mostrarPedido = true
    }
  }

  async FinalizarPedido()
  {
    try {
      this.loading = true;

      const productosCocinero = this.productosAPedir.filter((producto:any) => producto.tipo === "Comida" || producto.tipo === "Postre");
      const productosBartender = this.productosAPedir.filter((producto:any) => producto.tipo === "Bebida");

      if (productosBartender.length > 0 && productosCocinero.length > 0) {
        this.soloCocinero = true;
        this.soloBartender = true;
      }
      else if (productosBartender.length > 0 && productosCocinero.length == 0) {
        this.soloBartender = true;
      }
      else {
        this.soloCocinero = true;
      }
      this.pedidoFormato = {
        productos: this.productosAPedir,
        estado: "revision",
        total: this.importeTotal,
        mesa: this.numeroMesa,
        tiempoPreparacion: this.tiempoMaximo,
        comienzo: new Date(),
        propina: 0,
        descuentoJuego: 0,
        jugo: false,
        porcentajePropina: 0,
        uidCliente: this.cliente.uid,
        soloCocinero: this.soloCocinero,
        soloBartender: this.soloBartender,
        cocinaOk: false,
        bartenderOk: false,
        uid:"",
        realizoEncuesta:false,
        cargoPropina:false
      };

      this.bdSrv.SubirPedido(this.pedidoFormato).then(() => {
        this.pushSrv.MesaNotificacionAMozo(`[Mesa: ${this.numeroMesa}] Realizó un pedido`,"Revise el listado de pedidos").subscribe((res) => {console.log(res)})
        this.pedidoFinalizado.emit(this.pedidoFormato)
        this.loading = false;
      })
    } catch (error) {
      console.log('Error en hacer el pedido:', error);
    }
    finally{
      this.mostrarPedido = false;
      this.soloCocinero = false;
      this.soloBartender = false;
      this.productosAPedir = [];
      this.importeTotal = 0;
      this.pedidoFormato = {};
    }
  }

  onSwipe(swiper:any){
    if (!swiper.isEnd) {
      swiper.allowSlideNext = true;
    }
    if (!swiper.isBeginning) {
      swiper.allowSlidePrev = true;
    }
  }
}
