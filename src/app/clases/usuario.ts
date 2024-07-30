export class Usuario 
{
    id : string = ""
    uid : string
    correo : string
    clave : string
    perfil : string
    token_mensajes : string = ""

    constructor(uid : string = "", correo : string = "", clave : string = "", perfil : string = "") { 
        this.uid = uid
        this.correo = correo
        this.clave = clave
        this.perfil = perfil
    }


}