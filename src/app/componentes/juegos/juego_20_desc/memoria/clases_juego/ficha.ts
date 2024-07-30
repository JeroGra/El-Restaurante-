

  export enum Fruta {

    Banana = 9,
    Cereza = 10,
    Limon = 11,
    Manzana = 12,
    Naranja = 13,
    Palta = 14,
    Pera = 15,
    Uva = 16
  
  }


  export class Ficha 
  {
    tipo : Fruta 
    imagen : String;
    imagen_atras : String;
    macheo : boolean; //guarda si hizo mach con otra ficha o no
    imagen_muestra : String; //la imagen que mostrara

    constructor(tipo : Fruta, imagen_atras : string){
        this.tipo = tipo;
        this.imagen = this.ConsultarTipo(tipo);
        this.imagen_atras = imagen_atras;
        this.macheo = false;
        this.imagen_muestra = this.imagen_atras;
    }


    private ConsultarTipo(tipo : Fruta ) : String {

        switch(tipo){


            //Frutas
            case Fruta.Banana:
                return "../../../../assets/imagenes/banana.png"

            case Fruta.Cereza:
                return "../../../../assets/imagenes/cereza.png"

            case Fruta.Limon:
                return "../../../../assets/imagenes/limon.png"

            case Fruta.Manzana:
                return "../../../../assets/imagenes/manzana.png"

            case Fruta.Naranja:
                return "../../../../assets/imagenes/naranja.png"

            case Fruta.Palta:
                return "../../../../assets/imagenes/palta.png"

            case Fruta.Pera:
                return "../../../../assets/imagenes/pera.png"

            case Fruta.Uva:
                return "../../../../assets/imagenes/uva.png"

        }
    }

    static SonIguales(x : Ficha, y : Ficha) : boolean{

        if(x.tipo === y.tipo){
            x.macheo = true;
            y.macheo = true;
        }

        return x.macheo && y.macheo;

    } 


  }

