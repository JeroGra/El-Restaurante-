import { Component } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/clases/cliente';
import { FotoUsuario } from 'src/app/interfaces/foto-usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { EmailService } from 'src/app/servicios/email.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { PushNotificationService } from 'src/app/servicios/push-notification.service';
import { QrService } from 'src/app/servicios/qr.service';
import { UserAuthService } from 'src/app/servicios/user-auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage  {

  public forms : FormGroup
  private clientesBd = new Array<Cliente>;
  seSubioEnCelu: boolean = false;
  urlImagenesCel: string = "";

  /// FALTA HACER FUNCIONAR FIREBASE STORAGE, FOTO SERVICE, QUER SERVICE

  constructor(private fb : FormBuilder,private toastController : ToastController, private bd : BaseDatosService, 
    public cam : FotoService, private storage : Storage, public qr : QrService, private ruta : Router, private auth : UserAuthService, private email : EmailService, private push_notification : PushNotificationService) {
      console.log(window.screen.width);
      console.log(window.screen.height)
      this.bd.TraerClientes().subscribe((clientes)=>{
      this.clientesBd = clientes as Array<Cliente>
    })
    this.forms = this.fb.group({
      nombre : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      apellido : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      dni : ['',[
        Validators.required,
        Validators.min(5000000),
        Validators.max(99000000),
      ]],
      clave : ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]],
      correo : ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
      reclave : ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]],
    })

   }
  async presentToast(position: 'top', message = "", color = "danger"){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color : color,
      cssClass:"my-toast"
    });

    await toast.present();
  }


  fotoTomada = false;
  barraCarga = false;
  nombre:string = "";
  apellido:string = "";
  dni:number = 0;
  clave:string = "";
  correo:string = "";
  ms_loading : number = 1000
  reclave:string = "";
  
  BorrarDatos() {
    this.cam.fotos = []
    this.fotoTomada = false
    this.nombre = ""
    this.apellido = ""
    this.barraCarga = false
    this.clave = ""
    this.reclave = ""
    this.correo = ""
    this.ms_loading = 1000
  }

  Registrar(){
    this.barraCarga = true
 
    setTimeout(() => {
      if(!this.forms.invalid){
        if(this.reclave === this.clave) {
          let existe = false;
          for(let user of this.clientesBd){
              if(user.dni === this.dni){
                  existe = true;
                  break;
              }
          }
            if(!existe){
              let cliente  = new Cliente;
              cliente.nombre = this.nombre;
              cliente.apellido = this.apellido;
              cliente.dni = this.dni;
              cliente.clave = this.clave;
              cliente.correo = this.correo;
              cliente.perfil = "Cliente"
              

             

             if(this.fotoTomada) {
              this.SubirUnaImagen(cliente)
             } else {
              // Imagen Default
              let imagen = {path:"https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fusuarios%2Fcliente.png?alt=media&token=5156f6b6-679d-48da-8f71-ae5f6031cf66"}
              cliente.imagen = imagen 
              this.AltaCLiente(cliente)
             }

              /*this.bd.AltaEmpleado(empleado)
              navigator.vibrate(500);
              this.presentToast("top","Empleado registrado con exito!!","success");*/
              
            }else{
              this.barraCarga = false
              navigator.vibrate(1000);
              this.presentToast("top","ERROR!, Cliente ya existente!!");
            }
          } else {
            this.barraCarga = false
            navigator.vibrate(1000);
            this.presentToast("top","ERROR!, Las claves no son iguales!");
          }
      }else{
        this.barraCarga = false
        navigator.vibrate(1000);
        this.presentToast("top","ERROR!, Faltan datos!!");
      }
    }, 1000);
  }

  LogIn() {
    this.ruta.navigateByUrl("login")
  }

 async ScanDNI(){
    await this.qr.StartScan()
    let arrData = []
    arrData = this.qr.scanResult?.split('@');
    this.dni = parseInt(arrData[4]);
    this.nombre = this.ConvertirNombreValido( arrData[2])
    this.apellido = this.ConvertirNombreValido(arrData[1])
    }

  ConvertirNombreValido(nombre:string){
    
    let arrN = nombre.split("");
    let newArr :Array<string> = []
    let x = 0;
    arrN.forEach((char)=>{
      if(x > 0 ){
        newArr.push(char.toLowerCase())
      }else{
        newArr.push(char.toUpperCase())
      }
      x++
    })

    return newArr.join("")

  }

  TomarFoto(){
    this.cam.agregarNuevaGaleria('cliente')
    this.fotoTomada = true;
  }

  public async showActionSheet(photo: FotoUsuario, position: number) {
    const actionSheet = await this.toastController.create({

      header: 'Fotos',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',

        handler: () => {

          this.cam.deletePicture(photo, position);
          this.fotoTomada = false;
        }
      }, {

        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',

        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }


  SubirUnaImagen(cli:Cliente,index = 0)
  {
      const file =  this.cam.fotos[index]
      const imgRef = ref(this.storage,`imagenes/usuarios/${file.rutaArchivo}`);

      try{
        uploadString(imgRef,file.fotoCap,'data_url').then((rt:any)=>{

          this.seSubioEnCelu = false;

          this.TraerImagen(rt.metadata.name,cli)

        }).catch((error)=>{
          console.log(error)
        });
       }
       catch{
        this.urlImagenesCel =`imagenes/usuarios/file:/data/user/0/com.pps.Comanda/files/` //funciona
        uploadString(imgRef,file.fotoCap,'base64').then((rt:any)=>{
          this.seSubioEnCelu = true;

          this.TraerImagen(rt.metadata.name,cli)

        }).catch((error)=>{
          console.log(error)
        });
       }
  }

  TraerImagen(img:any,cli:Cliente){
  
      let imgRef = ref(this.storage,'imagenes/usuarios/'+img);

      if(this.seSubioEnCelu){
        imgRef = ref(this.storage,this.urlImagenesCel+img);
      }
  
      getDownloadURL(imgRef).then((url:any) => {
  
        console.log(url)
  
        let imagen : any = {
          path:url,
          name:img,
          dniUser:cli.dni
        }
  
        cli.imagen = imagen;
        this.AltaCLiente(cli)

    }).catch((error)=>{
      this.barraCarga = false
      this.presentToast("top","ERROR!, Fallo al obtener imagen !!" + JSON.stringify(error));
    })
  }

  AltaCLiente(cliente : Cliente) {
      this.auth.Registrar(cliente.correo,cliente.clave).then( () => {

        this.barraCarga = false
        this.presentToast("top","Cliente registrado con exito!! Espere a ser Validado","primary");
        // Envia Correo a Cliente
        this.email.EnviarEmailAprobacionPendiente(cliente)
        // Notifica a los ADMS
        this.bd.AltaCliente(cliente)
        this.push_notification.NuevoCliente(cliente).subscribe((response) => {
        })

        navigator.vibrate(500);
        this.ruta.navigateByUrl("login")
      }).catch((reason) => {
        console.log(reason)
        this.presentToast("top",this.auth.ObtenerMensajeError(reason.code));
        this.barraCarga = false
      })
  }

}
