import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexFill,
  ApexTheme
} from "ng-apexcharts";
import { BaseDatosService } from 'src/app/servicios/base-datos.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptionsAtencion = {
  series: ApexAxisChartSeries ;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

export type ChartOptionsVolverias = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

export type ChartOptionsComida = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  fill: ApexFill,
  yaxis: ApexYAxis,
  stroke: ApexStroke,
  legend: ApexLegend,
  plotOptions: ApexPlotOptions
};

export type ChartOptionsPuntuacionApp = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})


export class VerEncuestasPage  {

  encuesta_cliente = {
    atencion : 0,
    volverias : true,
    calidad_comida : "Mala | Buena| Exelente",
    imagenes : [],
    comentario : "",
    puntuacion_app : "⭐"
  }

  dataAtencion : Array<number> = []
  categoriasAtencion : Array<any> = []
  data_si_volverias = 0
  data_no_volverias = 0
  data_count_comida_buena = 0
  data_count_comida_exelente = 0
  data_count_comida_mala = 0
  una_estrella = 0
  dos_estrellas = 0
  tres_estrellas = 0
  cuatro_estrellas = 0
  cinco_estrellas = 0

  encuestas : Array<any> = []

  @ViewChild("chartAtencion") chartAtencion: ChartComponent | any ;
  @ViewChild("chartVolverias") chartVolverias: ChartComponent | any;
  @ViewChild("chartComida") chartComida: ChartComponent | any;
  @ViewChild("chartPuntuacionApp") chartPuntuacionApp: ChartComponent | any;
  public chartOptionsPuntuacionApp: Partial<ChartOptionsPuntuacionApp> | undefined;
  public chartOptionsComida: Partial<ChartOptionsComida> | undefined;
  public chartOptionsAtencion: Partial<ChartOptionsAtencion> | undefined;
  public chartOptionsVolverias: Partial<ChartOptionsVolverias> | undefined;

  ver_grafico_atencion = false
  ver_grafico_volverias = false
  ver_grafico_comida = false
  ver_grafico_puntuacionApp = true
  ver_comentarios_encuestas = false

  constructor(private bd : BaseDatosService) {

    // //5 Encuestas
    // let img1_1 = "https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fproductos%2Fcomidas%2Fcarne-3.jpg?alt=media&token=10318264-2c6e-414d-9f48-1399e3dabe38" 
    // let e1 = { atencion : 100,  comida : "Exelente", volverias : true,  imagenes : new Array,  comentario : "Muy Buena Atencion y Comida",  puntuacion_app : "⭐⭐⭐⭐⭐", 
    //   cliente : { nombre:"Mari", apellido:"Test", img:"https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fusuarios%2Fcliente.png?alt=media&token=5156f6b6-679d-48da-8f71-ae5f6031cf66" } }
    // e1.imagenes.push(img1_1)
    
    // let img2_1 = "https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fproductos%2Fcomidas%2Fpapas-1.jpg?alt=media&token=431350ae-07e6-499e-aa80-8bb8450b8ed3" 
    // let img2_2 = "https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fproductos%2Fbebidas%2Fvino-3.png?alt=media&token=d8e44556-3895-4292-9b5e-729e4a4a54e0" 
    // let e2 = { atencion : 80,  comida : "Buena", volverias : true,  imagenes : new Array,  comentario : "Buena comida, Atencion Buena pero se puede mejorar",  puntuacion_app : "⭐⭐⭐⭐", 
    //   cliente : { nombre:"Pedro", apellido:"Prueba", img:"../../../assets/imagenes/icon.png" }
    //  }
    // e2.imagenes.push(img2_1)
    // e2.imagenes.push(img2_2)

    // let img3_1 = "https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fproductos%2Fbebidas%2Fagua-1.jpg?alt=media&token=68c8fca9-343d-40be-8096-ff479bd9ad31" 
    // let img3_2 = "https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fproductos%2Fpostres%2Fflan-1.jpg?alt=media&token=6c51f465-8317-49c1-9ce8-a3115b36bdb2" 
    // let img3_3 = "../../../assets/imagenes/icon.png" 
    // let e3 = { atencion : 50,  comida : "Mala", volverias : false,  imagenes : new Array,  comentario : "xd",  puntuacion : "⭐", 
    //   cliente : { nombre:"Papel Cliente", apellido:"Test", img:"https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fusuarios%2Ffile%3A%2Fdata%2Fuser%2F0%2Fcom.pps.Comanda%2Ffiles%2F1718653772334.cliente.jpeg?alt=media&token=75e27213-36a7-43f3-99e7-83b09724aab5" }
    // }
    // e3.imagenes.push(img3_1)
    // e3.imagenes.push(img3_2)
    // e3.imagenes.push(img3_3)
    
    // let e4 = { atencion : 10,  comida : "Exelente", volverias : true,  imagenes : new Array,  comentario : "Volveria solo por la comida, Atencion HORRIBLE",  puntuacion_app : "⭐⭐⭐",
    //   cliente : { nombre:"Anonimo", apellido:"Test", img:"https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fusuarios%2Fanonimo.png?alt=media&token=4d4e1cf3-96bd-4659-a055-dec54bec5be7" }
    //  }

    // let e5 = { atencion : 100,  comida : "Exelente", volverias : true,  imagenes : new Array,  comentario : "Rico",  puntuacion_app : "⭐⭐⭐⭐⭐",
    //   cliente : { nombre:"Mari", apellido:"Test", img:"https://firebasestorage.googleapis.com/v0/b/restaurante-lacomanda.appspot.com/o/imagenes%2Fusuarios%2Fcliente.png?alt=media&token=5156f6b6-679d-48da-8f71-ae5f6031cf66" }
    //  }

    // this.encuestas.push(e1)
    // this.encuestas.push(e2)
    // this.encuestas.push(e3)
    // this.encuestas.push(e4)
    // this.encuestas.push(e5)
    this.GenerarDataGraficos()
    this.bd.TraerEncuestas("encuestas-clientes").subscribe((e : any)  => {
      this.encuestas = []
      this.encuestas = e.sort((a : any, b : any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
      console.log(this.encuestas)
      // setTimeout(() => {
      //   this.GenerarDataGraficos()
      // },1000)
      this.GenerarDataGraficos()
    })
  
  }

  // Genero la data o cantidad de coincidencias en base a una "pregunta : respuesta"
  GenerarDataGraficos() {    

    let mis_encuestas : Array<any> = []
    let ocurrencia = false

    this.encuestas.forEach(enc => {
      ocurrencia = false

      if(mis_encuestas.length > 0){
        mis_encuestas.forEach(en => {
          if(en.atencion === enc.atencion){
              en.count++
              ocurrencia = true
          }
        })
      } 

      if(!ocurrencia){
        mis_encuestas.push({ atencion : enc.atencion, count : 1 })
      }

      if(enc.volverias == "1"){
        this.data_si_volverias ++
      } else {
        this.data_no_volverias ++
      }

      if(enc.comida === "Buena") {
          this.data_count_comida_buena ++
      } else if(enc.comida === "Excelente") {
          this.data_count_comida_exelente ++
      } else if (enc.comida === "Mala") {
          this.data_count_comida_mala ++
      }

      switch(enc.puntuacion_app){
        case '⭐':
          this.una_estrella ++
        break;

        case'⭐⭐':
        this.dos_estrellas ++
        break;

        case'⭐⭐⭐':
        this.tres_estrellas ++
        break;

        case'⭐⭐⭐⭐':
        this.cuatro_estrellas ++
        break;

        case'⭐⭐⭐⭐⭐':
        this.cinco_estrellas ++
        break;
      }

    });

    mis_encuestas.forEach(enc => {
      this.dataAtencion.push(enc.atencion)
      this.categoriasAtencion.push(`Clientes ${enc.count}`)
    })

    // Inserto la data y las categorias en los graficos
    this.InsertarEnGraficos()
  }

  InsertarEnGraficos() {

    this.GraficoAtencion()
    
    this.GraficoVolverias()

    this.GraficoComida()

    this.GraficoPuntuacionApp()
  }

  GraficoAtencion() {
    this.chartOptionsAtencion = {
      series: [
        {
          name: "Atencion",
          data: this.dataAtencion
        }
      ],
      chart: {
        height: 400,
        type: "bar",
        events: {

          
        },
        toolbar : {
          show : false,
        },
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"]
        },
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories:this.categoriasAtencion,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      },
    };
  }

  GraficoVolverias() {
    this.chartOptionsVolverias = {
      series: [
        {
          data: [this.data_si_volverias, this.data_no_volverias]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar:{
          show: false
        }
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: [
        "#5d95fd",
        "#ff8a46",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#000"]
        },
        formatter: function(val: string, opt: { w: { globals: { labels: { [x: string]: string; }; }; }; dataPointIndex: string | number; }) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#000"]
      },
      xaxis: {
        categories: [
          "Si",
          "No",
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        theme: "light",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    };
  }

  GraficoComida() {
    this.chartOptionsComida = {
      series: [this.data_count_comida_buena, this.data_count_comida_exelente, this.data_count_comida_mala],
        chart: {
          width: 240,
          type: 'polarArea',
          height: 1000
        },
        labels: ['Buena ' + this.data_count_comida_buena, 'Excelente ' + this.data_count_comida_exelente, 'Mala ' + this.data_count_comida_mala],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: true,
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            //    enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
    };
  }

  GraficoPuntuacionApp() {
    this.chartOptionsPuntuacionApp = {
      series: [this.una_estrella, this.dos_estrellas, this.tres_estrellas, this.cuatro_estrellas, this.cinco_estrellas],
      chart: {
        width: "105%",
        type: "pie",
      },
      labels: [
        "⭐",
        "⭐⭐",
        "⭐⭐⭐",
        "⭐⭐⭐⭐",
        "⭐⭐⭐⭐⭐",
      ],
      theme: {
        monochrome: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 350,
          options: {
            chart: {
              width: 600
            },
            legend: {
              position: "top"
            }
          }
        }
      ]
    };
  }
  
  VerEncuestas( encuest : "Atencion" | "Volverias" | "Comida" | "Puntuacion" | "Comentario"){
    switch(encuest){

      case 'Atencion':
        this.ver_grafico_atencion = true
        this.ver_comentarios_encuestas = false
        this.ver_grafico_comida = false
        this.ver_grafico_volverias = false
        this.ver_grafico_puntuacionApp = false
        break;
      case 'Volverias':
        this.ver_grafico_atencion = false
        this.ver_comentarios_encuestas = false
        this.ver_grafico_comida = false
        this.ver_grafico_volverias = true
        this.ver_grafico_puntuacionApp = false
        break;
      case 'Comida':
        this.ver_grafico_atencion = false
        this.ver_comentarios_encuestas = false
        this.ver_grafico_comida = true
        this.ver_grafico_volverias = false
        this.ver_grafico_puntuacionApp = false
        break;
      case 'Puntuacion':
        this.ver_grafico_atencion = false
        this.ver_comentarios_encuestas = false
        this.ver_grafico_comida = false
        this.ver_grafico_volverias = false
        this.ver_grafico_puntuacionApp = true
        break;
      case 'Comentario':
        this.ver_grafico_atencion = false
        this.ver_comentarios_encuestas = true
        this.ver_grafico_comida = false
        this.ver_grafico_volverias = false
        this.ver_grafico_puntuacionApp = false
        break;

    }
  }

}
