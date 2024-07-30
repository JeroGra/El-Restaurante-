import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/clases/cliente';
import { Usuario } from 'src/app/clases/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { EmailService } from 'src/app/servicios/email.service';

@Component({
  selector: 'app-aprobacion-clientes',
  templateUrl: './aprobacion-clientes.page.html',
  styleUrls: ['./aprobacion-clientes.page.scss'],
})
export class AprobacionClientesPage {

  list : Cliente[] = []
  cliente : Cliente = new Cliente
  listOfAll : Cliente[] = []
  estado_clientes = "Clientes Pendientes"
  clientes_pendientes = true
  clientes_denegados = false
  clientes_aceptados = false

  constructor(private bd : BaseDatosService, private toastController : ToastController, private email : EmailService) {
    this.bd.TraerClientes().subscribe((clientes : any) => {
      this.listOfAll = clientes as Array<Cliente>
      this.ClientesPendientes()
    })
      
   }

   Clientes(){
    this.bd.TraerClientes().subscribe((clientes : any) => {
      this.listOfAll = clientes as Array<Cliente>
    })
   }

   ClientesPendientes() {
      this.list = []
      this.listOfAll.forEach((cli : Cliente) => {
        if(cli.aprobado === false && cli.rechazado === false) {
          this.list.push(cli)
        }
      })
      this.clientes_pendientes = true
      this.clientes_denegados = false
      this.clientes_aceptados = false
      this.estado_clientes = "Clientes Pendientes" 

      this.DesSelect()
   }

   ClientesDenegados() {
      this.list = []
      this.listOfAll.forEach((cli : Cliente) => {
        if(cli.rechazado === true) {
          this.list.push(cli)
        }
      });
      this.clientes_pendientes = false
      this.clientes_denegados = true
      this.clientes_aceptados = false
      this.estado_clientes = "Clientes Rechazados"

      this.DesSelect()
   }

   ClientesAprobados() {
      this.list = []
      this.listOfAll.forEach((cli : Cliente) => {
        if(cli.aprobado === true && cli.rechazado === false) {
          this.list.push(cli)
        }
      });
      this.clientes_pendientes = false
      this.clientes_denegados = false
      this.clientes_aceptados = true
      this.estado_clientes = "Clientes Aprobados"

      this.DesSelect()
   }

   SelectCli(cli : Cliente) {
    if(this.cliente.uid === cli.uid){
      this.DesSelect()
    }else{
      this.cliente = cli
    }
   }

   DesSelect() {
    this.cliente = new Cliente
   }

   Aceptar(){
    if(this.cliente.uid !== " ") {
      this.cliente.aprobado = true
      this.bd.ModificarCliente(this.cliente)
      this.presentToast("middle","Cliente Aprobado","primary")
          this.email.EnviarEmailCuentaAprobada(this.cliente)
          this.DesSelect()
    } else {
      this.presentToast("middle","ERROR! Seleccione un Cliente!","warning")
    }
   }

   Rechazar(){
    if(this.cliente.uid !== " ") {
      this.cliente.rechazado = true
      this.bd.ModificarCliente(this.cliente)
      this.presentToast("middle","Cliente Rechazado","danger")
          this.email.EnviarEmailCuentaInhabilitada(this.cliente)
          this.DesSelect()
    } else {
      this.presentToast("middle","ERROR! Seleccione un Cliente!","warning")
    }
   }

   async presentToast(position:"middle", message = "", color = "danger"){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color : color,
      cssClass:"my-toast"
    });

    await toast.present();
  }

  }
