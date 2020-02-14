import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { ApiService } from '../../servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';

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

  constructor(private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService, private spinner: NgxSpinnerService,
    public globales: GlobalesPipe, private kramos: RamosService, private kfinalizacion: FinalizacionService, private kcontenido: CotizacionService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.eliminarCache();
    var sesion = this.sesion;
    this.buscarDetalleInicio();
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
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

  public eliminarCache() {
    this.kcotizacion.eliminarKeyCotizacion();
    this.kramos.eliminarKeyRamos();
    this.kcontenido.eliminarKeyContenido();
    this.kfinalizacion.eliminarKeyFinalizacion();
  }

}
