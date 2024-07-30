import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { Camera,CameraResultType } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString,getStorage } from '@angular/fire/storage';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.component.html',
  styleUrls: ['./encuesta-cliente.component.scss'],
})
export class EncuestaClienteComponent {

  loading:boolean = false;
  @Input() pedidoRecibido:any;
  @Output() encuestaCompletada:any = new EventEmitter<any>();
  public forma!: FormGroup;
  respuesta: any = {}
  valorCheckBox:string = "";
  fotosTomadas:any[] = [];
  fotos_urls: any[] = [];
  cantImagenes:number = 0;

  constructor(private fb:FormBuilder,private bd:BaseDatosService,private toastCtrl:ToastController) {
    this.forma = this.fb.group({
      'atencion': ['1', [Validators.required]],
      'comentario': [''],
      'puntuacion_app': ['', [Validators.required]],
      'volverias': ['0', [Validators.required]],
      'comida': ['', [Validators.required]]
    });
   }
  

  async EnviarEncuesta()
  {
    this.loading = true
    if(this.cantImagenes <= 3)
    {
      for (let index = 0; index < this.fotosTomadas.length; index++) {
        const foto_url = await this.SubirFotoEncuesta(this.fotosTomadas[index]);
        this.fotos_urls.push(foto_url)
      }
    }

    this.respuesta =
    {
      uid:"",
      atencion: this.forma.get('atencion')!.value,
      comentario: this.forma.get('comentario')!.value,
      puntuacion_app: this.forma.get('puntuacion_app')!.value,
      volverias: this.forma.get('volverias')!.value,
      comida: this.forma.get('comida')!.value,
      fotos:this.fotos_urls,
      fecha:new Date(),
      cliente: this.bd.Getlog()
    }

    this.bd.SubirEncuesta(this.respuesta,"encuestas-clientes").then(() => {
      this.loading = false;
      this.presentToast("middle","¡Gracias por completar la encuesta!","primary")
      this.pedidoRecibido.realizoEncuesta = true;
      this.encuestaCompletada.emit(this.pedidoRecibido)
    }).catch((err) => {
      console.log(err)
      this.loading = false;
    })

    console.log(this.respuesta);
  }



  onCheckboxChange(value: string) {
    this.valorCheckBox = this.valorCheckBox === value ? '' : value;
    this.forma.get('comida')?.setValue(this.valorCheckBox);
  }

  formato(value:number){
    return value;
  }

  async TomarFoto()
  {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        promptLabelPhoto: 'Elegir de la galeria',
        promptLabelPicture: 'Sacar foto',
        promptLabelHeader: 'Foto',
        resultType: CameraResultType.DataUrl
      }).then((result) => {
        if (this.cantImagenes < 3) {
          this.cantImagenes++;
          this.fotosTomadas.push(result.dataUrl);
          console.log(this.cantImagenes);
        }
      }, (err) => {
        console.info(err)
      })
  }

  async SubirFotoEncuesta(foto:any)
  {
    var url: string = "";
    const storage = getStorage();

    const storageRef = await ref(
      storage,
      `imagenes/encuestas/encuestas-clientes/${moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}`
    );
    await uploadString(storageRef, foto, 'data_url').then(async (snapshot) => {
      await getDownloadURL(storageRef).then((downloadUrl) => {
        url = downloadUrl;
      });
    });
    return url;
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
