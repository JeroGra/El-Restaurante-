import { Injectable } from '@angular/core';
import { Firestore, documentId, updateDoc, } from '@angular/fire/firestore';
import { getDocs,setDoc,doc,addDoc,collection,deleteDoc,query,where,orderBy } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Cliente } from '../clases/cliente';
import { Usuario } from '../clases/usuario';
import { Administrador } from '../clases/administrador';
import { Empleado } from '../clases/empleado';
import { Mesa } from '../clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {
  
  public log = false
  public userLogUid = ""
  public userType = ""
  public userRol = ""
  public userMesa = 0
  public usuarioLogueado:any

  constructor(private firestore : Firestore) {}

  //#region ////////////////// CLIENTE ////////////////////////

    // Trae un cliente por DNI
    async TraerClientePorUid(uid : string) {
      let data:any;
      const q = query(collection(this.firestore, 'clientes'), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }

    // Trae uno o mas clientes si estan en Fila de Espera
    async TraerClientesEnFila() {
      let data:any;
      const q = query(collection(this.firestore, 'clientes'), where("enFila", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }

    // Trae TODOS los Clientes
    TraerClientes() {
      const coleccion = collection(this.firestore, 'clientes')
      return collectionData(coleccion);
    }



    // Registra en la base de datos un Cliente
    AltaCliente(cliente : Cliente)
    {
      const coleccion = collection(this.firestore, 'clientes')
      const documento = doc(coleccion);
      const uid = documento.id;
      cliente.uid = uid
      setDoc(documento, JSON.parse(JSON.stringify(cliente)));

      let user = new Usuario(uid,cliente.correo,cliente.clave,cliente.perfil)

      this.AltaUsuario(user)
    }

    // Modifica el campo "aprobado" de un cliente en TRUE
    ModificarAprobarCliente(uid : string)
    {
      const coleccion = collection(this.firestore, 'clientes')
      const documento = doc(coleccion, uid)
      updateDoc(documento,{
        aprobado:true
      });
    }

    // Modifica "enFila" de un cliente segun lo que se pase (TRUE o FALSE)
    ModificarFilaCliente(uid : string, enFila : boolean)
    {
      const coleccion = collection(this.firestore, 'clientes')
      const documento = doc(coleccion, uid)
      updateDoc(documento,{
        enFila:enFila
      });
    }

    // Modifica todo un CLiente
    ModificarCliente(cliente : Cliente)
    {
      const coleccion = collection(this.firestore, 'clientes')
      const documento = doc(coleccion, cliente.uid);
      updateDoc(documento, JSON.parse(JSON.stringify(cliente)));
    }

    ModificarClienteMesa(uidCliente:string,numeroMesa:number)
    {
      const coleccion = collection(this.firestore, 'clientes')
      const documento = doc(coleccion, uidCliente);
      updateDoc(documento,{
        mesa_asignada:numeroMesa
      });
    }

  //#endregion 

  
  //#region ////////////////// EMPLEADO - DUEÑO ////////////////////////

    // Trae un Empleado por DNI
    async TraerEmpleadoPorUid(uid : string) {
      let data:any;
      const q = query(collection(this.firestore, 'empleados'), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }

    // Trae uno o mas empleados por tipo
    async TraerEmpleadosPorTipo(tipo : string) {
      let data:any;
      const q = query(collection(this.firestore, 'empleados'), where("tipo", "==", tipo));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }

    async TraerAdministradoresPorUid(uid : string) {
      let data:any;
      const q = query(collection(this.firestore, 'administradores'), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }

    async TraerAdministradoresPorTipo(tipo : string) {
      let data:any;
      const q = query(collection(this.firestore, 'administradores'), where("tipo", "==", tipo));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }


    ModificarEmpleado(emp : Empleado)
    {
      const coleccion = collection(this.firestore, 'empleados')
      const documento = doc(coleccion, emp.uid);
      updateDoc(documento, JSON.parse(JSON.stringify(emp)));
    }

    ModificarAdministrador(adm : Administrador)
    {
      const coleccion = collection(this.firestore, 'administradores')
      const documento = doc(coleccion, adm.uid);
      updateDoc(documento, JSON.parse(JSON.stringify(adm)));
    }


  //#endregion

  //#region  ////////////////// USUARIO //////////////////////// 

    AltaUsuario(usuario : Usuario)
    {
      const coleccion = collection(this.firestore, 'usuarios')
      const documento = doc(coleccion);
      const id = documento.id;
      usuario.id = id
      setDoc(documento, JSON.parse(JSON.stringify(usuario)));
    }

    async TraerUsuariosPorCorreo(correo : string) {
      let data:any;
      const q = query(collection(this.firestore, 'usuarios'), where("correo", "==", correo));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }


    TraerUsuarios() {
      const coleccion = collection(this.firestore, 'usuarios')
      return collectionData(coleccion);
    }

  

  //#endregion

  //#region ////////////////// LOGIN ////////////////////////
  async LogIn(usuario : Usuario)  {
    this.log = true
    this.userLogUid = usuario.uid
    this.userType = usuario.perfil
    switch(this.userType){
      //By Juli, lo que hago es dependiendo del uid obtenido, traigo al usuario y lo seteo en el localstorage
      case "Supervisor":
      case "Propietario":
        await this.TraerAdministradoresPorUid(this.userLogUid).then((user : any) => {
          this.usuarioLogueado = user as Administrador
          this.userRol = this.usuarioLogueado.tipo
          localStorage.setItem("user",JSON.stringify(user))
        })
      break;
      case "Empleado":
        await this.TraerEmpleadoPorUid(this.userLogUid).then((user : any) => {
          this.usuarioLogueado = user as Empleado
          this.userRol = this.usuarioLogueado.tipo
          localStorage.setItem("user",JSON.stringify(user))
        })
      break;
      case "Cliente":
        await this.TraerClientePorUid(this.userLogUid).then((user : any) => {
          this.usuarioLogueado = user as Cliente
          this.userRol = this.usuarioLogueado.tipo
          localStorage.setItem("user",JSON.stringify(user))
        })
      break;
    }
  }



  ActualizarLog(user : Cliente | Administrador | Empleado){
    localStorage.setItem("user",JSON.stringify(user))
  }

  LogOut() {
    localStorage.removeItem("user")
    this.log = false
    this.userLogUid = ""
    this.userType = ""
    this.usuarioLogueado = new Usuario
  }

  Getlog(){
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user
  }

  //#endregion


  //#region  ////////////////// MESA ////////////////////////
    
    TraerMesas(){
      const coleccion = collection(this.firestore, 'mesas')
      return collectionData(coleccion);
    }

    ModificarMesa(mesa : Mesa)
    {
      const coleccion = collection(this.firestore, 'mesas')
      const documento = doc(coleccion, mesa.uid);
      return updateDoc(documento, JSON.parse(JSON.stringify(mesa)));
    }

    async TraerUnaMesaPorNumero(numero : number){
      let data:any;
      const q = query(collection(this.firestore, 'mesas'), where("numero", "==", numero));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = JSON.parse(JSON.stringify(doc.data()))
      });

      return data
    }


  //#endregion

  //#region  ////////////////// PRODUCTOS (COMIDA) ////////////////////////

    TraerProductos()
    {
      const coleccion = collection(this.firestore,'productos');
      return collectionData(coleccion);
    }

  //#endregion

  //#region  ////////////////// ENCUESTAS ////////////////////////

    //  SubirEncuesta
    // Se le pasa el tipo de encuestas que corresponda
    SubirEncuesta(encuesta:any,tipoEncuesta:string):Promise<any>
    {
      const coleccion = collection(this.firestore,tipoEncuesta)
      const documento = doc(coleccion);
      const id = documento.id;
      encuesta.uid = id;
      return setDoc(documento, JSON.parse(JSON.stringify(encuesta)));
    }

    // TraerEncuestas
    TraerEncuestas(tipoEncuesta : "encuestas-clientes")
    {
      const coleccion = collection(this.firestore,tipoEncuesta)
      return collectionData(coleccion);
    }

    ModificarEncuestaPedido(encuesta:boolean,pedido:any)
    {
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,{
        realizoEncuesta:encuesta
      });
    }

  //#endregion

  //#region  ////////////////// PEDIDOS //////////////////////// (A CONFIRMAR)

    // SubirPedido
    async SubirPedido(pedido:any)
    {
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion);
      const uid = documento.id
      pedido.uid = uid
      setDoc(documento, JSON.parse(JSON.stringify(pedido)));
    }

    EliminarPedido(pedido:any)
    {
      const coleccion = collection(this.firestore,'pedidos')
      const documento = doc(coleccion,pedido.uid)
      return deleteDoc(documento)
    }

    TraerPedidos()
    {
      const coleccion = collection(this.firestore,'pedidos');
      return collectionData(coleccion);
    }

    TraerPedidosConEstado(estado:string)
    {
      const q = query(collection(this.firestore,'pedidos'),where('estado','==',estado));
      return collectionData(q);
    }

    TraerUnPedidoPorMesa(mesa:number){
      const q = query(collection(this.firestore,'pedidos'),where('mesa','==',mesa));
      return collectionData(q)
    }

    TraerPedidoPorUid(uid:string)
    {
      const q = query(collection(this.firestore,'pedidos'),where('uid','==',uid));
      return collectionData(q)
    }

    ModificarEstadoPedido(pedido:any,estado:string){
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,{
        estado:estado
      });
    }

    CargarPropinaPedido(pedido:any,porcentajePropina:number,propina:number,cargoPropina:boolean)
    {
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,{
        porcentajePropina:porcentajePropina,
        propina:propina,
        cargoPropina:cargoPropina
      });
    }

    AgregarDescuentoJuego(pedido:any){
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,JSON.parse(JSON.stringify(pedido)));
    }

    ModificarEstadoPedidoCocina(pedido:any){
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,{
        cocinaOk:true
      });
    }

    ModificarEstadoPedidoBar(pedido:any){
      const coleccion = collection(this.firestore, 'pedidos')
      const documento = doc(coleccion, pedido.uid)
      return updateDoc(documento,{
        bartenderOk:true
      });
    }

  //#endregion

  //#region  ////////////////// CHAT ////////////////////////

    // SubirMensaje
    SubirMensaje(mensaje:any)
    {
      const coleccion = collection(this.firestore, 'chatMozos')
      const documento = doc(coleccion);
      return setDoc(documento, JSON.parse(JSON.stringify(mensaje)));
    }

    // TraerMensajes
    TraerMensajes(){
      const q = query(collection(this.firestore,'chatMozos'),orderBy('fecha','asc'));
      return collectionData(q);
    }

  //#endregion


  //Alta de empleado en firestore
  //Setea el id del empleado que hace referencia al id del registro en firestore, para no tener que setearlo a la hora de traer los registros
  // AltaEmpleado(empleado:Empleado)
  // {
  //   const coleccion = collection(this.firestore,'empleados')
  //   const documento = doc(coleccion);
  //   const id = documento.id;
  //   empleado.id = id;

  //   let usuario = {
  //     id:"",
  //     uid:id,
  //     rol:"empleado",
  //     tipo:empleado.tipo
  //   }
  //   setDoc(documento,JSON.parse(JSON.stringify(empleado)));
  //   this.AltaUsuario(usuario);
  // }

  // async TraerEmpleadoPorDNI(dni:string){
  //   let data:any;
  //   const q = query(collection(this.firestore, 'empleados'), where("dni", "==", dni));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     data = JSON.parse(JSON.stringify(doc.data()))
  //   });

  //   return data
  // }

  // TraerEmpleados(){
  //   const coleccion = collection(this.firestore,'empleados')
  //   return collectionData(coleccion);
  // }

  // //Alta de administrador en firestore
  // AltaAdministrador(administrador:Administrador)
  // {
  //   const coleccion = collection(this.firestore,'administradores')
  //   const documento = doc(coleccion);
  //   const id = documento.id;
  //   administrador.id = id;

  //   let usuario = {
  //     id:"",
  //     uid:id,
  //     rol:"administrador",
  //     tipo:administrador.tipo
  //   }
  //   setDoc(documento,JSON.parse(JSON.stringify(administrador)));
  //   this.AltaUsuario(usuario);
  // }

  // TraerAdministrador(){
  //   const coleccion = collection(this.firestore,'administradores')
  //   return collectionData(coleccion);
  // }

  // //Alta de mesas en firestore
  // AltaMesa(mesa:Mesa)
  // {
  //   const coleccion = collection(this.firestore,'mesas')
  //   const documento = doc(coleccion);
  //   const id = documento.id;
  //   mesa.id = id;
  //   setDoc(documento,JSON.parse(JSON.stringify(mesa)));
  // }

  // TraerMesas(){
  //   const coleccion = collection(this.firestore,'mesas')
  //   return collectionData(coleccion);
  // }

  // //Alta de coleccion general de usuarios
  // AltaUsuario(usuario:any)
  // {
  //   const coleccion = collection(this.firestore,'usuarios')
  //   const documento = doc(coleccion);
  //   const id = documento.id;
  //   usuario.id = id;
  //   setDoc(documento,JSON.parse(JSON.stringify(usuario)));
  // }

  // AltaCliente(cliente:Cliente)
  // {
  //   const coleccion = collection(this.firestore,'clientes')
  //   const documento = doc(coleccion);
  //   const id = documento.id;
  //   cliente.id = id;

  //   let usuario = {
  //     id:"",
  //     uid:id,
  //     rol:"cliente",
  //     tipo:cliente.tipo
  //   }
  //   setDoc(documento,JSON.parse(JSON.stringify(cliente)));
  //   this.AltaUsuario(usuario);
  // }

  // TraerClientes()
  // {
  //   const coleccion = collection(this.firestore,'clientes')
  //   return collectionData(coleccion);
  // }
}