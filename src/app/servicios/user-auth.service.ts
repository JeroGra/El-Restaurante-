import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,signOut,AuthErrorCodes, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

constructor(private auth:Auth) { }

SignIn(email:string,password:any)
{
  return signInWithEmailAndPassword(this.auth,email,password)
}

LogOut() {
  return signOut(this.auth);
}

Registrar(email:any, contrasenia:any)
{
  return createUserWithEmailAndPassword(this.auth,email,contrasenia);
}

ObtenerMensajeError(errorCode: string): string {

  let mensaje: string = '';

  switch (errorCode) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensaje = 'El email ya está registrado.';
      break;
    case AuthErrorCodes.USER_DELETED:
      mensaje = 'El usuario no existe.';
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensaje = 'El email no es valido.';
      break;
    case AuthErrorCodes.INVALID_PASSWORD:
      mensaje = 'La contraseña es incorrecta';
      break;
    default:
      mensaje = 'Se produjo un error';
      break;
  }
  return mensaje;
} 
}
