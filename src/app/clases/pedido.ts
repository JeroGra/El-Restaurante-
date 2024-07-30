import { Producto } from "./producto";

export class Pedido {
    comienzo: Date;
    descuentoJuego: number;
    estado: string;
    jugo: boolean;
    mesa: number;
    porcentajePropina: number;
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
    desc20:boolean = false;
    desc10:boolean = false;
    desc15:boolean = false;
    cargoPropina:boolean = false;

    constructor() {
        this.comienzo = new Date();
        this.descuentoJuego = 0;
        this.estado = "";
        this.jugo = false;
        this.mesa = 0;
        this.porcentajePropina = 0;
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
