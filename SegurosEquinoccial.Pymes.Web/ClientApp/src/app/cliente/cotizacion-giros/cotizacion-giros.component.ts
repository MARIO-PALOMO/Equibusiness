import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';

@Component({
  selector: 'app-cotizacion-giros',
  templateUrl: './cotizacion-giros.component.html',
  styleUrls: ['./cotizacion-giros.component.css']
})
export class CotizacionGirosComponent implements OnInit {

  usuario: any = [];
  public cotizacion: any = {};
  public lstGirosExcluidos: string = "";
  constructor(private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService,
    private kcontenido: CotizacionService, private spinner: NgxSpinnerService, private kramos: RamosService, private kfinalizacion: FinalizacionService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.eliminarCache();
    this.buscarGirosExcluidos();
    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public buscarGirosExcluidos() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/complementos/consultar?identificador=GIROSEXCLUIDOS&broker='+this.usuario.broker.IdBroker+'', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstGirosExcluidos = res;
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
