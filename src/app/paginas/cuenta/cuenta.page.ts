import { Component, OnInit } from '@angular/core';
import { QrService } from 'src/app/servicios/qr.service';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { Pedido } from 'src/app/clases/pedido';
import { NavController } from '@ionic/angular';
import { PushNotificationService } from 'src/app/servicios/push-notification.service';
import { Cliente } from 'src/app/clases/cliente';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {

  mostrarCuenta = true;
  mostrarPropina = false;
  pedido:Pedido = new Pedido()
  propinaCargada:boolean = false;
  descuentosJuegos:number = 0;
  totalFinal:number = 0;

  constructor(public qr : QrService,private bdSrv:BaseDatosService,private navCtrl:NavController,private pushSrv:PushNotificationService,private toastCtrl:ToastController) {
    const pedidoString = localStorage.getItem("pedido");
    const pedido = pedidoString ? JSON.parse(pedidoString) : null;
    if(pedido != null)
      {
        this.pedido = pedido
        this.bdSrv.TraerPedidoPorUid(this.pedido.uid).subscribe((res:any) => {
          console.log(res)
          if(res.length != 0)
          {
            res.forEach((pe : Pedido) => {
              if(pe.estado !== "finalizado") {
                this.pedido = pe
                this.propinaCargada = this.pedido.cargoPropina;
                this.descuentosJuegos = ((this.pedido.total * this.pedido.descuentoJuego)/100)
                this.totalFinal = (this.pedido.total + this.pedido.propina) - this.descuentosJuegos;
              }
              else{
                localStorage.removeItem("pedido")
                let user = this.bdSrv.Getlog()
                user.mesa_asignada = 0;
                this.bdSrv.ActualizarLog(user as Cliente)
                this.navCtrl.navigateRoot(['/home'])
              }
          });
          }
        })
      }
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

  AgregarPropina(porcentajePropina:number)
  {
    const propinaTotal = (this.pedido.total * porcentajePropina) / 100;
    this.bdSrv.CargarPropinaPedido(this.pedido,porcentajePropina,propinaTotal,true)
    this.pedido.porcentajePropina = porcentajePropina
    this.pedido.propina = propinaTotal
    localStorage.setItem("pedido",JSON.stringify(this.pedido))
    this.propinaCargada = true; 
    this.presentToast("middle","¡Muchas gracias por valorar la atención!","primary")
  }

  async ScanPropina(){
      try {
        await this.qr.StartScan()
        console.log(this.qr.scanResult)
        let rtObject = JSON.parse(this.qr.scanResult)
        console.log(rtObject)
        if(rtObject.propina && !this.propinaCargada)
        {
          this.AgregarPropina(rtObject.cantidad)
        }
        else{
          if(this.qr.scanResult == "pago"){
            this.Pagar()
          }
          else{
            this.presentToast("middle","¡Codigo de QR incorrecto!","danger")
          }
        }
      } 
      catch(error) {
        console.log(error)
      }
  }

  Pagar()
  {
    this.bdSrv.ModificarEstadoPedido(this.pedido,"pendiente-pago")
    this.pedido.estado = "pendiente-pago"
  }

  async presentToast(position : 'top' | 'middle', message = "", color = "danger"){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      color : color,
      cssClass:"my-toast"
    });

    await toast.present()
  }

}
