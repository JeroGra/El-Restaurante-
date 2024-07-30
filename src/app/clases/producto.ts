export class Producto {
    descripcion: string;
    duracion: number;
    fotos: {
        path1: string;
        path2: string;
        path3: string;
    };
    nombre: string;
    precio: number;
    tipo: "Postre" | "Comida" | "Bebida";
    uid: string;

    constructor() {
        this.descripcion = "";
        this.duracion = 0;
        this.fotos = {
            path1: "",
            path2: "",
            path3: ""
        };
        this.nombre = "";
        this.precio = 0;
        this.tipo = "Comida";
        this.uid = "";
    }
}
