import { CotizacionRamoReglasIndividual } from './../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.individual';
import { Component, Input } from '@angular/core';
import { CotizacionRamoGeneral } from '../cotizacion.ramo.general';
import { SesionService } from '../../../servicios/sesion/sesion.service';
import { ValidacionPipe } from '../../../pipes/gestion-validacion/validacion.pipe';
import { CotizacionRamoReglasGrupal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.Grupal';
import { CotizacionRamoReglasGlobal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.global';
import { CotizacionRamoReglasVertical } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.vertical';
import { GlobalesPipe } from '../../../metodos/globales/globales.pipe';
declare var $: any;
@Component({
  selector: 'coberturas-adicionales-componente',
  templateUrl: './coberturas-adicionales.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class CoberturasAdicionalesComponente {

  @Input() listaCoberturasAdicionalesMR: any = [];
  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";
  @Input() identificadorGuardado = 0;

  usuario: any;
  public seleccionCoberturas = 0;
  public total = 0;

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaCoberturasAdicionalesMR);
    this.asignarValoresMultiriesgo(this.listaCoberturasAdicionalesMR, this.identificadorGuardado);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaCoberturasAdicionalesMR);
      this.asignarValoresMultiriesgo(this.listaCoberturasAdicionalesMR, this.identificadorGuardado);
      console.log(this.listaCoberturasAdicionalesMR);
    }, 1000);
  }

  public gestionSeleccionCoberturasAdicionales(selector: any, campoWeb: any, campoMovil: any) {
    if (selector == 1) {
      $("#" + campoWeb + "").prop('disabled', false);
      $("#" + campoMovil + "").prop('disabled', false);
    } else if (selector == 0) {
      $("#" + campoWeb + "").prop('disabled', true);
      $("#" + campoMovil + "").prop('disabled', true);
      this.general.campoUbicacionDefecto(this.listaCoberturasAdicionalesMR, campoWeb);
      this.general.campoUbicacionDefecto(this.listaCoberturasAdicionalesMR, campoMovil);
    }
  }
  public gestionRamoCoberturasAdicionales(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaCoberturasAdicionalesMR, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
  }

  public asignarValoresMultiriesgo(lista: any, guardado: any) {
    if (guardado == 1) {
      for (let multiriesgo of lista) {

        if (multiriesgo.Valores.ValorU1.Valor != 0) {
          $("#" + multiriesgo.Valores.ValorU1.Texto + "").prop('disabled', false);
          $("#" + multiriesgo.Valores.ValorU1.TextoMovil + "").prop('disabled', false);
        }
      }
    }
  }

  public primalNetaMultiriesgo() {
    var primaMinima = this.calcularPrimaMinima(this.listaCoberturasAdicionalesMR);

    var incendio: any = this.general.calcularPrimaTotal(this.lstRamos.listaIncendio);
    var equipoElectronico: any = this.general.calcularPrimaTotal(this.lstRamos.listaEquipoElectronico);
    var roturaMaquinaria: any = this.general.calcularPrimaTotal(this.lstRamos.listaRoturaMaquinaria);
    var roboAsalto: any = this.general.calcularPrimaTotal(this.lstRamos.listaRoboAsalto);
    var dineroValores: any = this.general.calcularPrimaTotal(this.lstRamos.listaDineroValores);
    var equipoMaquinaria: any = this.general.calcularPrimaTotal(this.lstRamos.listaEquipoMaquinaria);

    this.total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto) + parseFloat(dineroValores) + parseFloat(equipoMaquinaria);
    //this.total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto);
    return (primaMinima > this.total && this.total > 0) ? Math.round(primaMinima * 100) / 100 : Math.round(this.total * 100) / 100;
  }

  public calcularPrimaMinima(lista: any) {
    var primaMinima = 0;
    for (var datos of lista) {
      primaMinima = datos.Datos.Ramo.PrimaMinima;
    }
    return primaMinima;
  }

}
