import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { init } from '@emailjs/browser';
init("hzSo4b0KykUC1Gzt2");

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {}

  EnviarEmailAprobacionPendiente(usuario:any) {
    const templateParams = {
      from_name: "TeraChads Inc",
      to_name: usuario.nombre,
      message: "Su registro fue exitoso! Aguarde a que su cuenta sea aprobada",
      reply_to:"terachadsinc@gmail.com",
      user_email:usuario.correo
    }

    emailjs.send("service_4s4082q","template_3x7h4di",templateParams).then((res) => {
      console.log('Email enviado.', res.status, res.text);
    }).catch((error) => {
      console.log('Error al enviar el email.', error.message);
    })
  }

  EnviarEmailCuentaAprobada(usuario:any) {
    const templateParams = {
      from_name: "TeraChads Inc",
      to_name: usuario.nombre,
      message: "Su cuenta ha sido habilitada! Ya puede utilizar la aplicación",
      reply_to:"terachadsinc@gmail.com",
      user_email:usuario.correo
    }

    emailjs.send("service_4s4082q","template_3x7h4di",templateParams).then((res) => {
      console.log('Email enviado.', res.status, res.text);
    }).catch((error) => {
      console.log('Error al enviar el email.', error.message);
    })
  }

  EnviarEmailCuentaInhabilitada(usuario:any) {
    const templateParams = {
      from_name: "TeraChads Inc",
      to_name: usuario.nombre,
      message: "Su cuenta no ha sido habilitada",
      reply_to:"terachadsinc@gmail.com",
      user_email:usuario.correo
    }

    emailjs.send("service_4s4082q","template_3x7h4di",templateParams).then((res) => {
      console.log('Email enviado.', res.status, res.text);
    }).catch((error) => {
      console.log('Error al enviar el email.', error.message);
    })
  }
}
