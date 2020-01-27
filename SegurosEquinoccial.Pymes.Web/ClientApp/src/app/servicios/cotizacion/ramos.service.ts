import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Injectable()
export class RamosService {

  private keyEncriptacion: string = "SegurosEquinoccial//Pymes//BackEnd//{2019}";
  private keyRamos: string = "l:ramos";

  constructor(private router: Router) { }

  eliminarKeyRamos(){
    localStorage.removeItem(this.keyRamos);
  }

  registrarKeyRamos(codigo: any){
    var datosCifrados = CryptoJS.AES.encrypt(JSON.stringify(codigo), this.keyEncriptacion).toString();
    localStorage.setItem(this.keyRamos, datosCifrados);
  }

  verificarKeyRamos(){
    var verificacion = true;
    var datos: any = localStorage.getItem(this.keyRamos);
    if(datos === null){
      verificacion = false;
    }
    return verificacion;
  }

  regresarObtenerRamos(){
    this.router.navigate(['/cliente/cotizacion/cotizacion']);
  }

  obtenerKeyRamos(){
    var datosPlanos: any;
    var datos = localStorage.getItem(this.keyRamos);
    var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
    datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return datosPlanos;
  }

}
