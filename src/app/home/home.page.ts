import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Administrador } from '../clases/administrador';
import { Empleado } from '../clases/empleado';
import { BaseDatosService } from '../servicios/base-datos.service';
import { Cliente } from '../clases/cliente';
import { QrService } from '../servicios/qr.service';
import { UserAuthService } from '../servicios/user-auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Mesa } from '../clases/mesa';
import { PushNotificationService } from '../servicios/push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  usuario : any = {
    nombre : "",
    apellido : "",
    imagen : {path:""},
    dni : 0,
    cuil : 0,
    perfil : "",
    tipo : "",
    token_mensajes : ""
  }

  noUser = true
  loading = false;
  cliente : Cliente = new Cliente
  mi_token = ""

  constructor(public bd : BaseDatosService, public qr : QrService, public auth : UserAuthService, 
    private navCtrl: NavController, private toastController : ToastController, private push_notification : PushNotificationService) {
    this.loading = true;

    let user = this.bd.Getlog()
    if(user){
      console.log(this.bd.userRol)
      console.info(user)
      this.usuario = user
      this.cliente = user as Cliente
      this.noUser = false
    }

    console.log(this.usuario)

    this.mi_token = localStorage.getItem("token_device") as string
    if(!(this.mi_token === this.usuario.token_mensajes)) {
      this.usuario.token_mensajes = this.mi_token
      if(this.usuario.perfil === "Cliente") {
        this.cliente.token_mensajes = this.mi_token
        this.bd.ModificarCliente(this.cliente)
      } else if(this.usuario.perfil === "Empleado") {
        this.bd.ModificarEmpleado(this.usuario as Empleado)
      } else if(this.usuario.perfil === "Propietario" || this.usuario.perfil === "Supervisor") {
        this.bd.ModificarAdministrador(this.usuario as Administrador)
      }

      this.bd.ActualizarLog(this.usuario)
    } 

    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {}

   TraerUsuario() {
    switch(this.bd.userType){
      case "Propietario":
        this.bd.TraerAdministradoresPorUid(this.bd.userLogUid).then((user : Administrador) => {
          this.usuario = user
          this.noUser = false
        })
      break

      case "Supervisor":
        this.bd.TraerAdministradoresPorUid(this.bd.userLogUid).then((user : Administrador) => {
          this.usuario = user
          this.noUser = false
        })
      break;

      case "Empleado":
        this.bd.TraerEmpleadoPorUid(this.bd.userLogUid).then((user : Empleado) => {
          this.usuario = user
          this.noUser = false
        })
      break;

      case "Cliente":
        this.bd.TraerClientePorUid(this.bd.userLogUid).then((user : Cliente) => {
          this.usuario = user
          this.cliente = user
          this.noUser = false
        })
      break;
    }
   }

   async ScanQrLocal(){

    if(!this.cliente.enFila && this.cliente.mesa_asignada === 0) {
        // Al no estar en Fila Busca Scanear el QR de Ingreso
        await this.qr.StartScan()
        try {

          let rtobj = JSON.parse(this.qr.scanResult)
    
          if(rtobj.solicitar_mesa){
            this.cliente.enFila = true
            this.bd.ActualizarLog( this.cliente)
            this.bd.ModificarFilaCliente(this.cliente.uid,true)
            //Notifica a Metres
            this.push_notification.ClienteIngresaLocal(this.cliente).subscribe((response) => {
              console.log(response)
            })
          } else {
            if(this.qr.scanResult !== 0){
              this.presentToast("middle","No tiene mesa asignada! Ingrese a la fila")
            }
          }
        }
        catch(e) {
            this.presentToast("middle","QR Invalido!")
        }
    } else {
        // Al estar en Fila busca escanear el QR de una Mesa
        await this.qr.StartScan().then(() => {
          try {
            console.log("Por entrar a mesa asiganda")
            this.MesaAsignada(parseInt(this.qr.scanResult))
          }
          catch(e) {
              this.presentToast("middle","QR Invalido!")
          }
        })
      }
    }

    MesaAsignada(mesa: number){
    console.log(this.cliente.uid)
    this.bd.TraerClientePorUid(this.cliente.uid).then((cli) => {
      console.log(cli)
      console.log(mesa)
      this.cliente = cli as Cliente
      this.usuario = cli as Cliente
      this.bd.ActualizarLog(this.cliente)
      if(this.cliente.mesa_asignada === mesa) {     
        //Vincular la mesa y llevar al usuario al apartado de la mesa
        this.bd.TraerUnaMesaPorNumero(this.cliente.mesa_asignada).then((mesa_asing) => {
          let mesaCliente = new Mesa
          mesaCliente = mesa_asing as Mesa
          mesaCliente.cliente_uid = this.cliente.uid
          this.presentToast("middle","Mesa Vinculada! Redirigiendo...","primary",3000)
          this.bd.ModificarMesa(mesaCliente).then(() => {
            navigator.vibrate(500)
            this.navCtrl.navigateRoot(['/mesa-cliente'])
          })
        })
        //asignar usuario
        //
      } else if(this.cliente.mesa_asignada === 0){
        this.presentToast("middle","No Tiene Mesa Asiganda!")
      } else {
        this.presentToast("middle","Mesa Asignada Incorrecta!","warning")
      }
    })

   }

   SalirDeFila(){
    this.cliente.enFila = false
    this.bd.ModificarFilaCliente(this.cliente.uid,false)
  }

  VerEncuestas(){
    this.navCtrl.navigateRoot(['/ver-encuestas'])
  }

  MiMesa(){
      navigator.vibrate(500)
      this.navCtrl.navigateRoot(['/mesa-cliente'])
  }

  // Salir(){
  //   navigator.vibrate(500)
  //   this.auth.LogOut()
  //   this.bd.LogOut()
  //   this.navCtrl.navigateRoot(['/login'])
  // }


  async presentToast(position : 'top' | 'middle', message = "", color = "danger",duration = 2500){
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color : color,
      cssClass:"my-toast"
    });

    await toast.present();
  }

}
