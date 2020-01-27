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
  selector: 'incendio-componente',
  templateUrl: './incendio.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal, GlobalesPipe]
})
export class IncedioComponente {

  @Input() listaIncendio: any = [];
  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";

  usuario: any;
  deducibles = [{ id: 0, vista: 0, union: 0 }];

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaIncendio);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaIncendio);
      this.obtenerUnionDeducibles();
      console.log(this.listaIncendio)
    }, 1000);
  }

  public gestionTasaIncendio(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaIncendio, subramo);
    this.general.calcularPrimaSubramo(this.listaIncendio, subramo);
  }

  public gestionRamoIncendio(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaIncendio, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaIncendio, subramo);
    this.general.calcularPrimaSubramo(this.listaIncendio, subramo);
  }

  public obtenerUnionDeducibles() {
    var deducibles = [];
    this.deducibles = [];
    for (let subramos of this.listaIncendio) {
      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");
      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });
      }
    }
    this.deducibles = deducibles;
  }

  public obtenerDeducibleCobertura(lista) {
    var deducible = "";
    for (let subramos of lista) {
      if (subramos.Valores.ValorU1.Valor > 0) {
        if (this.riesgo == "2") {
          deducible = subramos.Datos.RiesgoMayor;
        } else if (this.riesgo == "1") {
          deducible = subramos.Datos.RiesgoMenor;
        }
      } if (subramos.Valores.ValorU2.Valor > 0) {
        if (this.riesgo == "2") {
          deducible = subramos.Datos.RiesgoMayor;
        } else if (this.riesgo == "1") {
          deducible = subramos.Datos.RiesgoMenor;
        }
      } if (subramos.Valores.ValorU3.Valor > 0) {
        if (this.riesgo == "2") {
          deducible = subramos.Datos.RiesgoMayor;
        } else if (this.riesgo == "1") {
          deducible = subramos.Datos.RiesgoMenor;
        }
      } if (subramos.Valores.ValorU4.Valor > 0) {
        if (this.riesgo == "2") {
          deducible = subramos.Datos.RiesgoMayor;
        } else if (this.riesgo == "1") {
          deducible = subramos.Datos.RiesgoMenor;
        }
      } if (subramos.Valores.ValorU5.Valor > 0) {
        if (this.riesgo == "2") {
          deducible = subramos.Datos.RiesgoMayor;
        } else if (this.riesgo == "1") {
          deducible = subramos.Datos.RiesgoMenor;
        }
      }
    }
    return deducible;
  }
}
