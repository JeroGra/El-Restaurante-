import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonThumbnail, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-juego-10-desc',
  templateUrl: './juego-10-desc.component.html',
  styleUrls: ['./juego-10-desc.component.scss'],
})
export class Juego10DescComponent {
  @Input() descuento:any
  @Output() cerrarJuego:EventEmitter<any> = new EventEmitter()
  @Output() sumarDescuento:EventEmitter<any> = new EventEmitter()
  @Output() finalizoJuego:EventEmitter<any> = new EventEmitter()

  usuario: any = null;
  pattern: number[] = [];
  patronUsuario: number[] = [];
  victoria: boolean = false;
  isGameOn: boolean = false;
  isUserTurn: boolean = false;
  isGameOver: boolean = false;
  perdio: boolean = false;
  level: number = 1;
  colorActivo: number | null = null;

  private audioContext: AudioContext | null = null;

  constructor(private toastController : ToastController){
    }

  startGame() {
    this.resetearJuego();
    this.audioContext = new AudioContext();
    this.generarPatron();
    this.jugarPatron();
  }

  restartGame() {
    this.resetearJuego();
    this.level = 1;
    this.generarPatron();
    this.jugarPatron();
  }

  resetearJuego() {
    this.pattern = [];
    this.patronUsuario = [];
    this.isGameOn = true;
    this.isGameOver = false;
    this.colorActivo = null;
    this.perdio = false;
  }

  CerrarJuego()
  {
    this.cerrarJuego.emit(20)
  }

  async presentToast(position : 'top' | 'middle', message = "", color = "danger"){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color : color,
      cssClass:"my-toast"
    });

    await toast.present()
  }

  generarPatron() {
    if (this.level != 1) {
      this.presentToast("middle","Correcto!","primary");
    }
    this.pattern = Array.from({ length: this.level }, () => Math.floor(Math.random() * 4) + 1);
  }

  jugarPatron() {
    let index = 0;
    const colors = [null, 1, 2, 3, 4];

    const playNextColor = () => {
      if (index < this.pattern.length) {
        const colorAJugar = this.pattern[index];
        this.reproducirSonido(colorAJugar);
        this.colorActivo = colorAJugar;
        this.patronUsuario.push(colorAJugar);

        console.log(`Color activado: ${colorAJugar}`);

        setTimeout(() => {
          this.colorActivo = null;
          this.patronUsuario.pop();
          index++;
          playNextColor();
        }, 1000);
      } else {
        this.isUserTurn = true;
      }
    };

    playNextColor();
  }


  handleUserInput(color: number) {
    if (this.isUserTurn) {
      this.reproducirSonido(color);
      this.patronUsuario.push(color);

      if (color !== this.pattern[this.patronUsuario.length - 1]) {
        this.patronUsuario = [];
        this.isUserTurn = false;
        this.isGameOver = true;
        this.perdio = true;        
        this.presentToast("middle","¡Has perdido!","danger")
        this.finalizoJuego.emit(15)
      } else if (this.patronUsuario.length === this.pattern.length) {
        if (this.level === 5) {          
          this.isGameOn = false;
          this.isUserTurn = false;
          if(!this.descuento) {
            this.sumarDescuento.emit(10);
            this.victoria = true; 
          }          
          this.presentToast("middle","Has ganado!","primary");          
        } else {
          this.level++;
          this.generarPatron();
          this.patronUsuario = [];
          this.isUserTurn = false;
          setTimeout(() => this.jugarPatron(), 2000);
        }
      }
    }
    else{
      if(this.isGameOn)
      {
        if(this.perdio)
        {
          this.presentToast("middle","Reinicia el juego para volver a jugar","danger")
        }
        else
        {
          this.presentToast("middle","Espera a que finalice la secuencia","danger")
        }        
      }
      else
      {
        this.presentToast("middle","Debes iniciar el juego","danger")
      }
    }
  }

  reproducirSonido(color: number) {
    const audio = new Audio(`assets/simon/sonido${color}.mp3`);
    audio.play();
  }
/*
  CrearResultado() {
    let resultado = {
      juego: 'Simon',
      puntaje: this.level,
      usuario: this.usuario,
      victoria: this.victoria,
      fecha: moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
    }
    this.firestore.guardarResultado(resultado);
  }
*/
}
