import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Injectable()
export class FinalizacionService {

  private keyEncriptacion: string = "SegurosEquinoccial//Pymes//BackEnd//{2019}";
  private keyFinalizacion: string = "l:finalizacion";

  constructor(private router: Router) { }

  eliminarKeyFinalizacion() {
    localStorage.removeItem(this.keyFinalizacion);
  }

  registrarKeyFinalizacion(codigo: any) {
    var datosCifrados = CryptoJS.AES.encrypt(JSON.stringify(codigo), this.keyEncriptacion).toString();
    localStorage.setItem(this.keyFinalizacion, datosCifrados);
  }

  verificarKeyFinalizacion() {
    var verificacion = true;
    var datos: any = localStorage.getItem(this.keyFinalizacion);
    if (datos === null) {
      verificacion = false;
    }
    return verificacion;
  }

  regresarObtenerFinalizacion() {
    this.router.navigate(['/cliente/cotizacion/cotizacion']);
  }

  obtenerKeyFinalizacion() {
    var datosPlanos: any;
    var datos = localStorage.getItem(this.keyFinalizacion);
    var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
    datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return datosPlanos;
  }


}
