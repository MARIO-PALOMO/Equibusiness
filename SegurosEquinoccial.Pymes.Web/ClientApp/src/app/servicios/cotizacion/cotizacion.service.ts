import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Injectable()
export class CotizacionService {

  private keyEncriptacion: string = "SegurosEquinoccial//Pymes//BackEnd//{2019}";
  private keyContenido: string = "l:contenido";

  constructor(private router: Router) { }

  eliminarKeyContenido(){
    localStorage.removeItem(this.keyContenido);
  }

  registrarKeyContenido(codigo: any){
    var datosCifrados = CryptoJS.AES.encrypt(JSON.stringify(codigo), this.keyEncriptacion).toString();
    localStorage.setItem(this.keyContenido, datosCifrados);
  }

  verificarKeyContenido(){
    var verificacion = true;
    var datos: any = localStorage.getItem(this.keyContenido);
    if(datos === null){
      verificacion = false;
    }
    return verificacion;
  }

  regresarObtenerContenido(){
    this.router.navigate(['/cliente/cotizacion/cotizacion']);
  }

  obtenerKeyContenido(){
    var datosPlanos: any;
    var datos = localStorage.getItem(this.keyContenido);
    var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
    datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return datosPlanos;
  }


}
