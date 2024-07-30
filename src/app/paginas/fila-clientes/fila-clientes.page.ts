import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/clases/cliente';
import { Mesa } from 'src/app/clases/mesa';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { EmailService } from 'src/app/servicios/email.service';
import { PushNotificationService } from 'src/app/servicios/push-notification.service';

@Component({
  selector: 'app-fila-clientes',
  templateUrl: './fila-clientes.page.html',
  styleUrls: ['./fila-clientes.page.scss'],
})
export class FilaClientesPage {

  list : Cliente[] = []
  cliente : Cliente = new Cliente
  listOfAll : Cliente[] = []
  estado_clientes = "Clientes En Fila"
  clientes_fila = true
  clientes_mesa = false

  seleccionar_mesa = false

  listMesa : Mesa[] = []
  listOfAllMesas : Mesa[] = []


  constructor(private bd : BaseDatosService, private toastController : ToastController, private email : EmailService,  private push_notification : PushNotificationService) {
    this.bd.TraerClientes().subscribe((clientes : any) => {
      this.listOfAll = clientes as Array<Cliente>
      this.ClientesEnFila()
      this.bd.TraerMesas().subscribe((clientes : any) => {
        this.listOfAllMesas = clientes as Array<Mesa>
        this.MesasLibres()

      })
    })
      
   }

   Clientes(){
    this.bd.TraerClientes().subscribe((clientes : any) => {
      this.listOfAll = clientes as Array<Cliente>
    })
   }

   Mesas(){
    this.bd.TraerMesas().subscribe((mesas : any) => {
      this.listOfAllMesas = mesas as Array<Mesa>
    })
   }

   MesasLibres(){
    this.listMesa = []
    this.listOfAllMesas.forEach((mesa : Mesa) => {
      if(mesa.cliente_uid === "") {
        this.listMesa.push(mesa)
      }
    })
   }

   ClientesEnFila() {
      this.list = []
      this.listOfAll.forEach((cli : Cliente) => {
        if(cli.enFila) {
          this.list.push(cli)
        }
      })
      this.clientes_fila = true
      this.clientes_mesa = false
      this.estado_clientes = "Clientes En Fila" 

      this.DesSelect()

   }

   ClientesConMesa() {
      this.list = []
      this.listOfAll.forEach((cli : Cliente) => {
        if(cli.mesa_asignada !== 0) {
          this.list.push(cli)
        }
      });
      this.clientes_fila = false
      this.clientes_mesa = true
      this.estado_clientes = "Clientes Con Mesa" 

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

   //Una vez seleccionado el cliente se clikea, nos lleva a seleccionar una mesa de la lista
   AsignarMesa(){
    if(this.cliente.uid !== " ") {
        this.seleccionar_mesa = true
    } else {
      this.presentToast("middle","ERROR! Seleccione un Cliente!","warning")
    }
   }

   //Se confirma la seleccion y se enlaza una mesa con un cliente
   Asignar(mesa : Mesa){
      this.cliente.mesa_asignada = mesa.numero
      this.cliente.enFila = false
      mesa.cliente_uid = this.cliente.uid;
      this.bd.ModificarCliente(this.cliente)
      this.bd.ModificarMesa(mesa)

      //SE notifica al cliente si esta su token
      if(this.cliente.token_mensajes !== null || this.cliente.token_mensajes !== ""){
        this.push_notification.MesaAsignada(this.cliente.token_mensajes,this.cliente.mesa_asignada).subscribe(response => console.log(response))
      }

      this.presentToast('middle',"Mesa Asiganda a Cliente!","success")
      this.Cancelar()
   }

   Cancelar()
   {
    this.seleccionar_mesa = false
    this.DesSelect()
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
