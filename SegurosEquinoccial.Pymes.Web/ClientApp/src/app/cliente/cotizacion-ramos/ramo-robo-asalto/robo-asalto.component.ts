import { CotizacionRamoReglasIndividual } from './../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.individual';
import { Component, Input } from '@angular/core';
import { CotizacionRamoGeneral } from '../cotizacion.ramo.general';
import { SesionService } from '../../../servicios/sesion/sesion.service';
import { ValidacionPipe } from '../../../pipes/gestion-validacion/validacion.pipe';
import { CotizacionRamoReglasGrupal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.Grupal';
import { CotizacionRamoReglasGlobal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.global';
import { CotizacionRamoReglasVertical } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.vertical';
import { GlobalesPipe } from '../../../metodos/globales/globales.pipe';

@Component({
  selector: 'incendio-componente',
  templateUrl: './robo-asalto.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class RoboAsaltoComponente {

  @Input() listaRoboAsalto: any = [];
  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";

  usuario: any;
  deducibles = [{ id: 0, vista: 0, union: 0 }];
  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaRoboAsalto);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaRoboAsalto);
      this.obtenerUnionDeducibles();
      console.log(this.listaRoboAsalto);
    }, 1000);
  }

  public gestionTasaRoboAsalto(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaRoboAsalto, subramo);
    this.general.calcularPrimaSubramo(this.listaRoboAsalto, subramo);
  }

  public gestionRamoRoboAsalto(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaRoboAsalto, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaRoboAsalto, subramo);
    this.general.calcularPrimaSubramo(this.listaRoboAsalto, subramo);
  }

  public obtenerUnionDeducibles() {
    var deducibles = [];
    this.deducibles = [];
    for (let subramos of this.listaRoboAsalto) {
      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");
      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });
      }
    }
    this.deducibles = deducibles;
  }

}
