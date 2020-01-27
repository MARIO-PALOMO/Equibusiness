import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Injectable()
export class VerificacionService {

  private keyEncriptacion: string = "SegurosEquinoccial//Pymes//BackEnd//{2019}";
  private keyCotizacion: string = "l:cotizacion";

  constructor(private router: Router) { }

  eliminarKeyCotizacion(){
    localStorage.removeItem(this.keyCotizacion);
  }

  registrarKeyCotizacion(codigo: any){
    var datosCifrados = CryptoJS.AES.encrypt(JSON.stringify(codigo), this.keyEncriptacion).toString();
    localStorage.setItem(this.keyCotizacion, datosCifrados);
  }

  verificarKeyCotizacion(){
    var verificacion = true;
    var datos: any = localStorage.getItem(this.keyCotizacion);
    if(datos === null){
      verificacion = false;
    }
    return verificacion;
  }

  regresarObtenerCotizacion(){
    this.router.navigate(['/cliente/inicio']);
  }

  obtenerKeyCotizacion(){
    var datosPlanos: any;
    var datos = localStorage.getItem(this.keyCotizacion);
    var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
    datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return datosPlanos;
  }

}
