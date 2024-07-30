import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FotoUsuario } from '../interfaces/foto-usuario';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class FotoService 
{
  constructor(platform: Platform) {
    this.platform = platform;
   }

  public fotos : FotoUsuario[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;

  public usuarioDeLaFoto:string = "nonUser"

  public imagenesBd :Array<any> = [];

  //Convierte un tipo de dato blob que representa un archivo a tipo de dato base64 (es una conversion de datos binarios a texto mediante ASCII)
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  
  //Lee la foto (archivo) que se encuentra en formato base64
  //EN caso de que la foto sea de flataforma hybrida lee el archivo base64 y lo retorna
  //SINO trae / busca la foto leyendola en blob para luego convertirla en base64
  private async readAsBase64(photo: Photo) {
  // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }


    //Guardar foto recibe un objeto Photo (foto) 
    //lo lee en base64
    //Escribe el archivo en el directorio de datos, el nombre del archivo es la fecha actual y el user
  private async savePicture(photo: Photo,tipoUsuario:string) {


    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
    // const dataCel = await Filesystem.getUri()

    
    //Obtiene el nombre del user logeado
    
    //this.usuarioDeLaFoto = this.userLog.perfilUsuarioLogeado
    // Write the file to the data directory
    const fileName = Date.now()+ "." + tipoUsuario + "." + photo.format;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        rutaArchivo: savedFile.uri,
        webVistaRuta: Capacitor.convertFileSrc(savedFile.uri),
        fotoCap: base64Data
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        rutaArchivo: fileName,
        webVistaRuta: photo.webPath,
        fotoCap: base64Data
      };
    }
  }

    //Agrega una galeria de fotos nueva
    //Toma la imagen capturada (activa camara o pide subida de archivo)
    //Agrega al array de fotos las fotos subidas o tomadas
    //Guarda las fotos capturadas
  public async agregarNuevaGaleria(tipoUsuario:string) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50
    });

    const savedImageFile = await this.savePicture(capturedPhoto,tipoUsuario);
    //this.fotoCapturada = capturedPhoto;
    this.fotos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.fotos),
    });
  }

  public async deletePicture(foto: FotoUsuario, position: number) {
    // Remove this photo from the Photos reference data array
    this.fotos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.fotos)
    });

    // delete photo file from filesystem
    const filename = foto.rutaArchivo
                        .substr(foto.rutaArchivo.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.fotos = (value ? JSON.parse(value) : []) as FotoUsuario[];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let foto of this.fotos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
            path: foto.rutaArchivo,
            directory: Directory.Data
        });

        // Web platform only: Load the photo as base64 data
        foto.webVistaRuta = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
}
