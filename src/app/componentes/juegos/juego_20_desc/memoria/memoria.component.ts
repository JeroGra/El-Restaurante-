import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cronometro } from './clases_juego/cronometro';
import { Ficha, Fruta } from './clases_juego/ficha';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent  {

  @Input() descuento:any
  @Output() cerrarJuego:EventEmitter<any> = new EventEmitter()
  @Output() sumarDescuento:EventEmitter<any> = new EventEmitter()
  @Output() finalizoJuego:EventEmitter<any> = new EventEmitter()
  cronometro : Cronometro = new Cronometro();
  fichas : Array<Ficha> = [];

  imagen_atras = "../../../../assets/imagenes/oculto_dificil.png"

  primera_ficha_select  : any = null;


  partidaIniciada = false;
  partidaTerminada = false;
  noSePreciona = false;

  //bandera primer juego
  primerPartida = true
  //bandera ganador primero juego
  primerPartidaGanada = false

  constructor() {

    let fichaBanana = new Ficha(Fruta.Banana,this.imagen_atras);
    let fichaCereza = new Ficha(Fruta.Cereza,this.imagen_atras);
    let fichaLimon = new Ficha(Fruta.Limon,this.imagen_atras);
    let fichaManzana = new Ficha(Fruta.Manzana,this.imagen_atras);
    let fichaNaranja = new Ficha(Fruta.Naranja,this.imagen_atras);
    let fichaPalta = new Ficha(Fruta.Palta,this.imagen_atras);
    let fichaPera = new Ficha(Fruta.Pera,this.imagen_atras);
    let fichaUva = new Ficha(Fruta.Uva,this.imagen_atras);
    let fichaBanana2 = new Ficha(Fruta.Banana,this.imagen_atras);
    let fichaCereza2 = new Ficha(Fruta.Cereza,this.imagen_atras);
    let fichaLimon2 = new Ficha(Fruta.Limon,this.imagen_atras);
    let fichaManzana2 = new Ficha(Fruta.Manzana,this.imagen_atras);
    let fichaNaranja2 = new Ficha(Fruta.Naranja,this.imagen_atras);
    let fichaPalta2 = new Ficha(Fruta.Palta,this.imagen_atras);
    let fichaPera2 = new Ficha(Fruta.Pera,this.imagen_atras);
    let fichaUva2 = new Ficha(Fruta.Uva,this.imagen_atras);

    
    this.fichas.push(fichaBanana);
    this.fichas.push(fichaCereza);
    this.fichas.push(fichaLimon);
    this.fichas.push(fichaManzana);
    this.fichas.push(fichaNaranja);
    this.fichas.push(fichaPalta);
    this.fichas.push(fichaPera);
    this.fichas.push(fichaUva);
    this.fichas.push(fichaBanana2);
    this.fichas.push(fichaCereza2);
    this.fichas.push(fichaLimon2);
    this.fichas.push(fichaManzana2);
    this.fichas.push(fichaNaranja2);
    this.fichas.push(fichaPalta2);
    this.fichas.push(fichaPera2);
    this.fichas.push(fichaUva2);



    this.fichas = this.MezclarFichas(this.fichas);

   }

   async ChechTimer(){
    let timerInterval = setInterval(() => {

      if(this.cronometro.seconds === 0){
        this.FinalPartida()
      }

      }, 1000);
   }



  private MezclarFichas<T>(array: T[]): T[] {
    // Crear una copia del array para no modificar el original
    const newArray = array.slice();
    
    // Aplicar el algoritmo de Fisher-Yates
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }
  

  SelecFicha(ficha_seleccioanda:Ficha){

    if(this.primera_ficha_select === null)
      {
        this.primera_ficha_select = ficha_seleccioanda;
        ficha_seleccioanda.imagen_muestra = ficha_seleccioanda.imagen;
      }
      else
      {
        ficha_seleccioanda.imagen_muestra = ficha_seleccioanda.imagen;

        if(Ficha.SonIguales(this.primera_ficha_select,ficha_seleccioanda))
          {
            this.primera_ficha_select = null;

            if(this.VerificarFinPartia())
              {
                  this.FinalPartida();
              }
            
          }
          else
          {

            this.noSePreciona = true;

            setTimeout(() => {

              this.fichas.forEach(ficha => {
                if(!ficha.macheo)
                  {
                    ficha.imagen_muestra = ficha.imagen_atras;
                  }
              });

              this.primera_ficha_select = null;
              this.noSePreciona = false;
            }, 500);

          }

      }


  }

  private VerificarFinPartia() : boolean
  {
    let fin = true;

    this.fichas.forEach(ficha => {
      if(!ficha.macheo)
        {
          fin = false;
        }
    });

    return fin;

  }

  private ReiniciarFichas()
  {
    this.fichas.forEach(ficha => {
      ficha.imagen_muestra = ficha.imagen_atras;
      ficha.macheo = false;
    });
  }

  FinalPartida()
  {

    if(this.cronometro.seconds !== 0){
      if(this.primerPartida && !this.descuento){
        this.primerPartida = false
          this.primerPartidaGanada = true
          this.sumarDescuento.emit(20)
      }
    }
    navigator.vibrate(1000);
    this.cronometro.stopTimer();
    this.partidaTerminada = true;
    this.finalizoJuego.emit(20)
  }

  ComienzoPartida()
  {
    this.partidaIniciada = true;
    this.cronometro.startTimer();
    this.ChechTimer()
  }

  Salir()
  {
    this.Reiniciar();
    navigator.vibrate(1000);
    this.cerrarJuego.emit(20);
  }

  Reiniciar()
  {
    this.ReiniciarFichas();
    this.fichas = this.MezclarFichas(this.fichas);
    this.partidaIniciada = false;
    this.partidaTerminada = false;
    this.cronometro = new Cronometro();
    this.primerPartida = false
  }

}
