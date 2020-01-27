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
  selector: 'responsabilidad-civil-componente',
  templateUrl: './responsabilidad-civil.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class ResponsabilidadCivilComponente {

  @Input() listaResponsabilidadCivil: any = [];
  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";
  @Input() identificadorGuardado = 0;
  @Input() lstReglasAdicionales: any = [];

  usuario: any;

  public numeroVehiculos: number = 0;
  public valorExceso: number = 0;
  public maximoValorExceso: number = 0;
  deducibles = [{ id: 0, vista: 0, union: 0 }];

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaResponsabilidadCivil);
    this.asignarExcesoVehiculos(this.listaResponsabilidadCivil, this.identificadorGuardado);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaResponsabilidadCivil);
      this.obtenerUnionDeducibles();
      this.asignarExcesoVehiculos(this.listaResponsabilidadCivil, this.identificadorGuardado);
    }, 1000);
  }

  public gestionTasaReponsabilidadCivil(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaResponsabilidadCivil, subramo);
    this.general.calcularPrimaSubramo(this.listaResponsabilidadCivil, subramo);
  }

  public gestionRamoReponsabilidadCivil(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaResponsabilidadCivil, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaResponsabilidadCivil, subramo);
    this.calcularPrimaSubramo(this.listaResponsabilidadCivil, subramo);
  }

  public calcularPrimaSubramo(lista: any, subramo: any) {
    var subTotalSubRamo = 0;
    var totalSubRamo = 0;
    var numero = this.numeroVehiculos;
    for (var subramos of lista) {
      if (subramos.Datos.Codigo == subramo) {
        if (subramos.Datos.AcumulaPrimaTotal == "-1") {
          if (subramos.Datos.Seleccion == 1) {
            subramos.Valores.NVehiculos = numero;
            subTotalSubRamo = parseFloat(subramos.Valores.ValorU1.Valor) + parseFloat(subramos.Valores.ValorU2.Valor) + parseFloat(subramos.Valores.ValorU3.Valor) + parseFloat(subramos.Valores.ValorU4.Valor) + parseFloat(subramos.Valores.ValorU5.Valor);
            totalSubRamo = (subTotalSubRamo * this.numeroVehiculos) * (subramos.Valores.Tasa / 100);
            subramos.Valores.Prima = (isNaN(Math.round(totalSubRamo * 100) / 100) ? 0 : Math.round(totalSubRamo * 100) / 100);
          } else {
            subTotalSubRamo = parseFloat(subramos.Valores.ValorU1.Valor) + parseFloat(subramos.Valores.ValorU2.Valor) + parseFloat(subramos.Valores.ValorU3.Valor) + parseFloat(subramos.Valores.ValorU4.Valor) + parseFloat(subramos.Valores.ValorU5.Valor);
            totalSubRamo = (subTotalSubRamo * subramos.Valores.Tasa) / 100;
            subramos.Valores.Prima = (isNaN(Math.round(totalSubRamo * 100) / 100) ? 0 : Math.round(totalSubRamo * 100) / 100);
          }
        }
      }
    }
  }

  public asignarExcesoVehiculos(lista: any, guardado: any) {

    //this.validacionAdicional();
    for (let responsabilidad of lista) {
      if (responsabilidad.Datos.Seleccion == 1) {
        this.numeroVehiculos = responsabilidad.Valores.NVehiculos;
        //this.valorExceso = responsabilidad.Valores.VResponsabilidad;
      }
    }
  }

  public obtenerUnionDeducibles() {
    var deducibles = [];
    this.deducibles = [];
    for (let subramos of this.listaResponsabilidadCivil) {
      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");
      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });
      }
    }
    this.deducibles = deducibles;
  }

  /*public calculoExcesoVehiculos(valor2: any, subramo: any, ubicacion: any) {
    this.validacionAdicional();

    var numero = this.numeroVehiculos;
    var valor = this.valorExceso;
    var total = 0;

    if (valor < 0) {
      this.valorExceso = 0;
    } if (numero < 0) {
      this.numeroVehiculos = 0;
    } else {
      total = numero * valor;
      for (var subramoRC of this.listaResponsabilidadCivil) {
        if (subramoRC.Datos.Seleccion == 1) {
          subramoRC.Valores.ValorU1.Valor = total;
          subramoRC.Valores.NVehiculos = numero;
          subramoRC.Valores.VResponsabilidad = valor;

        }
      }
      this.gestionRamoReponsabilidadCivil(valor2, subramo, ubicacion);
    }

  }*/

 /* public validacionAdicional() {
    for (let coberturas of this.listaResponsabilidadCivil) {
      if (coberturas.Datos.Codigo == "SRC1") {
        this.maximoValorExceso = coberturas.Valores.ValorU1.Valor;
      }
    }
  }*/

}
