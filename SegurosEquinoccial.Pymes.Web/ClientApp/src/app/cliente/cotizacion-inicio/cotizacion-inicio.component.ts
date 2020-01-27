import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { ApiService } from '../../servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';

declare var $: any;
@Component({
  selector: 'app-cotizacion-inicio',
  templateUrl: './cotizacion-inicio.component.html',
  styleUrls: ['./cotizacion-inicio.component.css'],
  providers: [GlobalesPipe]
})
export class CotizacionInicioComponent implements OnInit {

  usuario: any = [];
  public cotizacion: any = {};
  public lstInicio = [];

  public id = 0;
  public pass = "";

  constructor(private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService, private spinner: NgxSpinnerService, public globales: GlobalesPipe) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    //this.verificarCotizacionExistente();
    var sesion = this.sesion;
    this.buscarDetalleInicio();
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });

  }

  public verificarCotizacionExistente() {
    if (this.kcotizacion.verificarKeyCotizacion()) {
      this.cotizacion = this.kcotizacion.obtenerKeyCotizacion();
      this.buscarDetalleInicio();
    } else {
      this.kcotizacion.regresarObtenerCotizacion();
    }
  }

  public buscarDetalleInicio() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/complementos/consultar?identificador=INICIO&broker=' + this.usuario.broker.IdBroker + '', this.usuario.Uid).subscribe(
      (res: any) => {
        this.lstInicio = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public prueba() {
    var Usuario = {
      "Identificador": 1,
      "IdUsuario": 0,
      "Usuario": "DIANA NEGRETE",
      "Email": "dnegrete@segurosequinoccial.com",
      "Contrasena": "1720622560",
      "Estado": 1,
      "rol": { "IdRol": 3 },
      "Foto": "assets/images/usuarios/PRISCILACARPIO.jpg",
      "broker": { "IdBroker": 1 },
      "IdPadre": 0,
      "Ciudad": "QUITO"
    };

    this.conexion.post("Gestion/SGesTransacciones.svc/usuario/gestion", Usuario, this.usuario.Uid).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
