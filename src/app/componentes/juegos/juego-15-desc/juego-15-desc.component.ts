import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-juego-15-desc',
  templateUrl: './juego-15-desc.component.html',
  styleUrls: ['./juego-15-desc.component.scss'],
})
export class Juego15DescComponent  implements OnInit {

  @Input() descuento:any = false;
  @Output() cerrarJuego:EventEmitter<any> = new EventEmitter<any>()
  @Output() sumarDescuento:EventEmitter<any> = new EventEmitter<any>()
  @Output() finalizoJuego:EventEmitter<any> = new EventEmitter()
  juegoActivo:boolean = false
  victoria:boolean = false;
  tiempo:number = 30
  puntuacion:number = 0
  juegoFinalizado:boolean = false
  textoJuegoFinalizado:string = '¡PERDISTE!'
  opciones:any 
  a:number = 0
  b:number = 0
  operador:string = ''
  respuestaCorrecta:boolean = false
  respuestaIncorrecta:boolean = false
  textoBotonJuego:string = 'Comenzar Juego'
  yaJugo:boolean = true;
  timer:any
  primeraPartida:boolean = true;
  textoJuego = "¡Acierta un total de 10 puntos para ganar!"

  constructor(){ }

  ngOnInit(): void {
    this.GenerarCalculoMatematico()
    this.opciones = this.GenerarOpciones().sort(() => Math.random() - 0.5);
  }

  IniciarJuego()
  {
    if(this.yaJugo)
    {
      this.yaJugo = false
      this.juegoActivo = true
      this.textoBotonJuego = "Reiniciar Juego"
      this.GenerarCalculoMatematico()
      this.opciones = this.GenerarOpciones().sort(() => Math.random() - 0.5);
      this.IniciarContador()
      this.textoJuego = ""
    }
    else
    {
      this.ReiniciarJuego()
    }
  }

  ReiniciarJuego()
  {
    this.juegoFinalizado = false
    this.juegoActivo = true
    this.victoria = false
    this.puntuacion = 0
    this.tiempo = 30
    this.textoJuegoFinalizado = '¡PERDISTE!'
    this.textoJuego = "";
    this.GenerarCalculoMatematico()
    this.opciones = this.GenerarOpciones().sort(() => Math.random() - 0.5);
    this.IniciarContador()
  }

  IniciarContador()
  {
    this.timer = setInterval(() => {
      this.tiempo--
      if(this.tiempo === 0)
      {
        clearInterval(this.timer);
        this.TiempoTerminado()
      }
    },1000)
  }

  GenerarCalculoMatematico()
  {
    this.a = Math.floor(Math.random() * 100);
    this.b = Math.floor(Math.random() * 100);
    this.operador = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
  }

  GenerarOpciones()
  {
    const respuestaCorrecta = this.EvaluarOperacion();

    return [
      respuestaCorrecta,
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ];
  }

  EvaluarOperacion()
  {
    let resultado = 0

    switch (this.operador) {
      case '+':
        resultado = this.a + this.b;
        break;
      case '-':
        resultado = this.a - this.b;
        break;
    }

    return resultado;
  }

  Resolver(respuesta:number,event:Event) {
    if(this.juegoActivo)
    {
      const btn = <HTMLButtonElement>event.target;
      btn.disabled = true;
      if (respuesta === this.EvaluarOperacion()) {
        this.puntuacion++;
        this.respuestaCorrecta = true;
        setTimeout(() => {
          this.respuestaCorrecta = false;
        }, 300);
      } else {
        this.respuestaIncorrecta = true;
        setTimeout(() => {
          this.respuestaIncorrecta = false;
        }, 300);
      }

      setTimeout(() => {
        this.GenerarCalculoMatematico();
        this.opciones = this.GenerarOpciones().sort(() => Math.random() - 0.5);
      }, 400);
    }
  }

  TiempoTerminado()
  {
    this.juegoActivo = false;
    this.juegoFinalizado = true;
    if(this.puntuacion >= 10)
    {
      this.textoJuego = "¡Has ganado!"
      this.victoria = true
      if(!this.descuento)
        this.sumarDescuento.emit(15);
    }
    else
    {
      this.textoJuego = "No conseguiste los 10 puntos..."
    }

    this.finalizoJuego.emit(15)
  }

  CerrarJuego()
  {
    this.cerrarJuego.emit(15)
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
