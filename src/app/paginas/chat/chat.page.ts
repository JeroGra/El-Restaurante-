import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from 'src/app/servicios/push-notification.service';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  loading:boolean = false
  mensaje:string = ""
  chat:any;
  usuarioActual:any
  esCliente:boolean = false;
  esMozo:boolean = false;
  nombreMensaje:string = ""

  constructor(private pushSrv:PushNotificationService,private bdSrv:BaseDatosService) { 
    this.loading = true;
    this.bdSrv.TraerMensajes().subscribe((res) => {
      if(res)
      {
        this.loading = false;
        
        this.chat = res;
        console.info(this.chat)
        //this.scrollToTheLastElementByClassName();
      }
    })
  }

  ngOnInit() { 
    this.usuarioActual = this.bdSrv.Getlog()

    if(this.usuarioActual)
    {
      if(this.usuarioActual.perfil == "Empleado"){
        this.esMozo = true;
        this.nombreMensaje = this.usuarioActual.nombre
      }
      else{
        this.nombreMensaje = "Mesa " + this.usuarioActual.mesa_asignada
        this.esCliente = true;
      }

      console.info(this.usuarioActual)
    }
  }

  
  EnviarMensaje(){
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
      const nuevoMensaje =
      {
        uid: this.usuarioActual.uid,
        nombre: this.nombreMensaje,
        texto: this.mensaje,
        fecha: fecha
      }

      this.bdSrv.SubirMensaje(nuevoMensaje).then(() => {
        if(this.esCliente)
          this.pushSrv.MesaNotificacionAMozo(`[Mesa: ${this.usuarioActual.mesa_asignada}] Realizó una consulta`,"Revise la casilla de mensajes").subscribe((res) => {
            console.info(res)
          })
      })
      this.mensaje = '';
      //this.scrollToTheLastElementByClassName();
  }

  scrollToTheLastElementByClassName() {
      let elements = document.getElementsByClassName('mensajes');
      let ultimo:any = elements[(elements.length - 1)];
      let toppos = ultimo.offsetTop;
      //@ts-ignore
      document.getElementById('card-body').scrollTop = toppos;
  }

}
