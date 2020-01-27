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
  selector: 'rotura-maquinaria-componente',
  templateUrl: './rotura-maquinaria.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class RoturaMaquinariaComponente {

  @Input() listaRoturaMaquinaria: any = [];
  @Input() listaIncendio: any = [];
  @Input() lstDirecciones: any = [];
  @Input() limiteRoturaMaquinariaSeleccion: number;
  @Input() lstRamos: any;
  @Input() riesgo = "0";

  usuario: any;

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaRoturaMaquinaria);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaRoturaMaquinaria);
      console.log(this.listaRoturaMaquinaria)
    }, 1000);
  }

  public gestionTasaRoturaMaquinaria(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaRoturaMaquinaria, subramo);
    this.general.calcularPrimaSubramo(this.listaRoturaMaquinaria, subramo);
  }

  public gestionRamoRoturaMaquinaria(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaRoturaMaquinaria, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaRoturaMaquinaria, subramo);
    this.general.calcularPrimaSubramo(this.listaRoturaMaquinaria, subramo);
  }
}
