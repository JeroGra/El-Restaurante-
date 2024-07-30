import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Plugins, Capacitor } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../clases/cliente';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService  {

  mi_token : string | any
  notificacion : any


  private urlApi = "https://api-push-messaging-el-restaurante.onrender.com/";

  constructor(private htpp : HttpClient) { }


  private readonly CHANNEL_ID = 'el_restaurante_notificaciones'; // Nombre del canal personalizado

  //#region API ENVIAR MENSAJES

  public NuevoCliente(cliente : Cliente | null = null) : Observable<any> {

      let mns_default = "Se Registro un nuevo Cliente!"

      let message = {
           title : "",
            Body : "Un cliente nuevo se registro"
      }
      console.log(cliente)
      if(cliente !== null){
          message.title += `[${cliente.nombre}] Se Registro como nuevo Cliente!` 
      } else {
        message.title += mns_default 
      }

      return this.htpp.post<any>(`${this.urlApi}notify-admins`,message);
  }

  public ClienteIngresaLocal(cliente : Cliente | null = null, tipo_empleado  : string = "Metre") : Observable<any> {
    let mns_default = "Un CLiente Ingreso al Local"

    let message = {
         title : "",
          Body : "Un cliente ingreso al local",
          tipo : tipo_empleado
    }

    if(cliente !== null){
        message.title += `[${cliente.nombre}, ${cliente.apellido}] Ingreso al Local!` 
    } else {
      message.title += mns_default 
    }

    return this.htpp.post<any>(`${this.urlApi}notify-employes-type`,message);
  }

  public ClienteIngresaLocalAdmins(cliente : Cliente | null = null) : Observable<any> {
    let mns_default = "Un CLiente Ingreso al Local"

    let message = {
         title : "",
          Body : "Un cliente ingreso al local",
    }

    if(cliente !== null){
        message.title += `[${cliente.nombre}, ${cliente.apellido}] Ingreso al Local!` 
    } else {
      message.title += mns_default 
    }

    return this.htpp.post<any>(`${this.urlApi}notify-admins`,message);
  }

  public MesaAsignada(token : string, mesa : any) : Observable<any> {

    let message = {
         title : `Se le asignó la Mesa ${mesa}, escanee el QR`,
          Body : "Un cliente ingresó al local",
          token : token
    }

    return this.htpp.post<any>(`${this.urlApi}notify`,message);
  }

  public MensajePagoRealizado(token : string) : Observable<any> {

    let message = {
        title : `¡Su pago fue validado con exito!`,
        Body : "Un cliente ingresó al local",
        token : token
    }

    return this.htpp.post<any>(`${this.urlApi}notify`,message);
  }

  //By Juli, encapsulo la notificacion de chat y realizar pedido para el mozo
  public MesaNotificacionAMozo(title:string,body:string): Observable<any>{
    let message = {
      title: title,
      Body: body,
      tipo:"Mozo"
    }

    return this.htpp.post<any>(`${this.urlApi}notify-employes-type`,message);
  }

  //By Juli, creo dos metodos de notificacion para bartender y cocinero
  //Ya que un pedido puede ser preparado por un cocinero o bartender
  public NuevoPedidoCocineros(title:string,body:string): Observable<any>{
    let message = {
      title: title,
      Body: body,
      tipo:"Cocinero"
    }

    return this.htpp.post<any>(`${this.urlApi}notify-employes-type`,message);
  }

  public NuevoPedidoBartender(title:string,body:string): Observable<any>{
    let message = {
      title: title,
      Body: body,
      tipo:"Bartender"
    }

    return this.htpp.post<any>(`${this.urlApi}notify-employes-type`,message);
  }

  //#endregion  

  async addListeners(){

    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      // guarda el token en el local storage
      localStorage.setItem("token_device",token.value)
    }).then((token : any) => {
      console.log(token.value)
      this.mi_token = token.value
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    }).then((notification : any) => {
      this.notificacion = notification
      console.log(this.notificacion)
     // this.showLocalNotification(notification.title, notification.body)
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });

  }

  async registerNotifications(){

  // let permStatus = await PushNotifications.checkPermissions();

  // if (permStatus.receive === 'prompt') {
  //   permStatus = await PushNotifications.requestPermissions();
  // }

  // if (permStatus.receive !== 'granted') {
  //   throw new Error('User denied permissions!');
  // }

  // EL DISPOSITIVO TIENE SOLO UN TOKEN PODEMOS AGREGARLO A UNA BD PARA RELACIONARLO A UN USUARIO
  await PushNotifications.register();



  } 

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }


  // private async showLocalNotification(title: string, body: string) {
  //   if ('Notification' in window) {
  //         const { LocalNotifications } = Plugins;
  //         await LocalNotifications['schedule']({
  //           notifications: [
  //             {
  //               title,
  //               body,
  //               id: Date.now(), // Identificador único de la notificación
  //               schedule: { at: new Date(Date.now() + 1000) }, // Programar para mostrar la notificación en 1 segundo
  //               channelId: this.CHANNEL_ID // Especificar el canal personalizado
  //             }
  //           ]
  //         });
  //   }
  // }

}
