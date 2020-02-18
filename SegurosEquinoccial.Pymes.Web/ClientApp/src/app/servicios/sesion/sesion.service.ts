import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ApiService } from '../api/api.service';

@Injectable()
export class SesionService {

  private keyEncriptacion: string = "SegurosEquinoccial//Pymes//BackEnd//{2019}";
  private keyCliente: string = "l:key";
  private timeCliente: string = "l:time";

  constructor(private router: Router, private conexion: ApiService) { }

  cerrarSesion() {
    var usuario = this.obtenerDatos();
    var datos = {
      Identificador: 8,
      IdUsuario: usuario.IdUsuario,
      Usuario: "",
      Email: "",
      Contrasena: "",
      Estado: 0,
      Foto: "",
      IdPadre: 0,
      Ciudad: "",
      "CodigoAgente": "",
      "CodigoPuntoVenta": "",
      "CodigoSucursal": "",
      "CodigoTipoAgente": "",
      "Comision": 0,
      "Corredores" : "0",
      rol: {
        IdRol: 0
      },
      broker: {
        IdBroker: 0
      }
    };

    this.conexion.post("Gestion/SGesTransacciones.svc/usuario/gestion", datos, "").subscribe(
      (res: any) => {
        localStorage.removeItem(this.keyCliente);
        localStorage.removeItem(this.timeCliente);
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.conexion.error(err);
      }
    );

  }

  iniciarSesion(verificacion: any, usuario: any) {
    if (verificacion != 0) {
      var fecha = new Date();
      var datosCifrados = CryptoJS.AES.encrypt(JSON.stringify(usuario), this.keyEncriptacion).toString();
      localStorage.setItem(this.keyCliente, datosCifrados);
      localStorage.setItem(this.timeCliente, fecha.getHours() + "");
      var rol = usuario.rol.Nombre;

      if (rol == "COORDINADOR") {
        this.router.navigate(['/gerencia/inicio']);
      } else if (rol == "SUPERVISOR") {
        this.router.navigate(['/supervisor/inicio']);
      } else if (rol == "COMERCIAL") {
        this.router.navigate(['/cliente/cotizacion/giros']);
      }

      return true;
    }
    return false;

  }

  verificarCredencialesInicio() {
    var datos: any = localStorage.getItem(this.keyCliente);
    if (datos != null) {
      var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
      var datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if (datosPlanos.rol.Nombre == "COORDINADOR") {
        this.router.navigate(['/gerencia/inicio']);
      } else if (datosPlanos.rol.Nombre == "SUPERVISOR") {
        this.router.navigate(['/supervisor/inicio']);
      } else if (datosPlanos.rol.Nombre == "COMERCIAL") {
        this.router.navigate(['/cliente/inicio']);
      }
    }
  }

  verificarCredencialesRutas() {
    var datos: any = localStorage.getItem(this.keyCliente);
    if (datos === null) {
      this.router.navigate(['/']);
    } else {
      this.verificarTiempoExpiracion();
    }
  }

  verificarTiempoExpiracion() {
    var validacion = false;
    var fecha = new Date();
    var expiracion: any = localStorage.getItem(this.timeCliente);
    var fechaTotal = fecha.getHours() - parseInt(expiracion);
    if (fechaTotal >= 8 || fechaTotal < 0) {
      this.cerrarSesion();
    } else {
      validacion = true;
    }

    return validacion;
  }

  obtenerDatos() {
    var datos = localStorage.getItem(this.keyCliente);
    var datosPlanos: any;
    if (datos == null) {
      datosPlanos = { "mensaje": "No se ha iniciado sesión." };
    } else {
      var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
      datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return datosPlanos;
  }

}
