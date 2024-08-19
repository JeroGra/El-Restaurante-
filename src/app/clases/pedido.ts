import { Producto } from "./producto";

export class Pedido {
    fecha_finalizado: Date;
    estado: string;
    mesa: number;
    productos: Array<Producto>; 
    propina: number;
    soloBartender: boolean;
    soloCocinero: boolean;
    bartenderOk: boolean;
    cocinaOk: boolean;
    tiempoPreparacion: number;
    total: number;
    uid: string;
    uidCliente: string;
    realizoEncuesta:boolean;

    constructor() {
        this.fecha_finalizado = new Date();
        this.estado = "";
        this.mesa = 0;
        this.productos = [];
        this.propina = 0;
        this.soloBartender = false;
        this.soloCocinero = false;
        this.cocinaOk = false
        this.bartenderOk = false;
        this.tiempoPreparacion = 0;
        this.total = 0;
        this.uid = "";
        this.uidCliente = "";
        this.realizoEncuesta = false;
    }
}
