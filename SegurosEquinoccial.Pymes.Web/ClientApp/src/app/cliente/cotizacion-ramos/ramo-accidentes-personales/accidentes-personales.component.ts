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
  selector: 'accidentes-personales-componente',
  templateUrl: './accidentes-personales.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal, GlobalesPipe]
})
export class AccidentesPersonalesComponente {

  @Input() listaAccidentesPersonales: any = [];
  @Input() listaRamosSubRamosReglasAdicionales: any = [];
  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";
  @Input() identificadorGuardado = 0;

  usuario: any;

  public listaAccidentesPersonalesDirectivo = [];
  public listaAccidentesPersonalesAdmnistrativo = [];
  public listaAccidentesPersonalesOperativo = [];
  public listaAccidentesPersonalesGlobal = [];

  public numeroPersonasDirectivo: number = 0;
  public valorPersonasDirectivo: number = 0;
  public numeroPersonasAdmnistrativo: number = 0;
  public valorPersonasAdmnistrativo: number = 0;
  public numeroPersonasOperativo: number = 0;
  public valorPersonasOperativo: number = 0;
  public valorGastosDirectivo: number = 0;
  public valorGastosAdministrativo: number = 0;
  public valorGastosOperativo: number = 0;

  public tipoValor = 0;

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaAccidentesPersonales);
    this.agrupacionSubRamosAccidentesPersonales();
    this.asignarValoresMuerteAccidental(this.listaAccidentesPersonales, this.identificadorGuardado);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaAccidentesPersonales);
      this.agrupacionSubRamosAccidentesPersonales();
      this.asignarValoresMuerteAccidental(this.listaAccidentesPersonales, this.identificadorGuardado);
      console.log(this.listaAccidentesPersonales)
    }, 1000);


  }

  public gestionTasaAccidentesPersonales(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaAccidentesPersonales, subramo);
    this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramo);
    this.calculoLimiteCatastrofico();
  }

  public gestionRamoAccidentesPersonales(valor: any, subramo: any, ubicacion: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaAccidentesPersonales, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramo);
    this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramo);
    this.calculoLimiteCatastrofico();
  }

  public agrupacionSubRamosAccidentesPersonales() {
    for (var subramos of this.listaAccidentesPersonales) {
      if (subramos.Datos.Grupo == 'Personal  Directivo') {
        this.listaAccidentesPersonalesDirectivo.push(subramos);
      }
      if (subramos.Datos.Grupo == 'Personal  Administrativo') {
        this.listaAccidentesPersonalesAdmnistrativo.push(subramos);
      }
      if (subramos.Datos.Grupo == 'Personal Operativo') {
        this.listaAccidentesPersonalesOperativo.push(subramos);
      } if (subramos.Datos.Grupo == 'Personal Globlal') {
        this.listaAccidentesPersonalesGlobal.push(subramos);
      }
    }
  }

  public asignarValoresMuerteAccidental(lista: any, guardado: any) {

    for (let subramos of lista) {
      if (subramos.Datos.Codigo == "SAP1") {
        this.valorPersonasDirectivo = subramos.Valores.VPersonas;
        this.numeroPersonasDirectivo = subramos.Valores.NPersonas;
      }
      if (subramos.Datos.Codigo == "SAP2") {
        this.valorGastosDirectivo = subramos.Valores.GPersonas;
      }
      if (subramos.Datos.Codigo == "SAP5") {
        this.valorPersonasAdmnistrativo = subramos.Valores.VPersonas;
        this.numeroPersonasAdmnistrativo = subramos.Valores.NPersonas;
      }
      if (subramos.Datos.Codigo == "SAP6") {
        this.valorGastosAdministrativo = subramos.Valores.GPersonas;
      }
      if (subramos.Datos.Codigo == "SAP9") {
        this.valorPersonasOperativo = subramos.Valores.VPersonas;
        this.numeroPersonasOperativo = subramos.Valores.NPersonas;
      }
      if (subramos.Datos.Codigo == "SAP10") {
        this.valorGastosOperativo = subramos.Valores.GPersonas;
      }
    }
  }

  public calculoMuerteAccidental(listaAP: any) {
    var totalPersonasDirectivo = 0;
    var totalPersonasAdmnistrativo = 0;
    var totalPersonasOperativo = 0;

    var totalGastosDirectivo = 0;
    var totalGastosAdmnistrativo = 0;
    var totalGastosOperativo = 0;

    var expresion = /^\d*(\.\d{1})?\d{0,1}$/;

    if (!expresion.test(this.valorPersonasDirectivo + "")) {
      this.valorPersonasDirectivo = 0;
    } if (!expresion.test(this.valorPersonasAdmnistrativo + "")) {
      this.valorPersonasAdmnistrativo = 0;
    } if (!expresion.test(this.valorPersonasOperativo + "")) {
      this.valorPersonasOperativo = 0;
    }

    for (var subramos of listaAP) {
      if (subramos.Datos.Codigo == "SAP1") {
        if (this.valorPersonasDirectivo > this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP1")
          || this.valorPersonasDirectivo < 0) {
          this.valorPersonasDirectivo = 0;
        }
        totalPersonasDirectivo = this.numeroPersonasDirectivo * this.valorPersonasDirectivo;
        subramos.Valores.ValorU1.Valor = totalPersonasDirectivo;
        subramos.Valores.VPersonas = this.valorPersonasDirectivo;
        subramos.Valores.NPersonas = this.numeroPersonasDirectivo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP2") {
        var validacion = this.valorPersonasDirectivo * parseFloat(this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP2"));
        if (this.valorGastosDirectivo > validacion || this.valorGastosDirectivo < 0) {
          this.valorGastosDirectivo = 0;
        }
        totalGastosDirectivo = this.numeroPersonasDirectivo * this.valorGastosDirectivo;
        subramos.Valores.ValorU1.Valor = totalGastosDirectivo;
        subramos.Valores.GPersonas = this.valorGastosDirectivo;
        subramos.Valores.NPersonas = this.numeroPersonasDirectivo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP3") {
        subramos.Valores.NPersonas = this.numeroPersonasDirectivo;
      }
      if (subramos.Datos.Codigo == "SAP4") {
        subramos.Valores.NPersonas = this.numeroPersonasDirectivo;
      }
      if (subramos.Datos.Codigo == "SAP5") {
        if (this.valorPersonasAdmnistrativo > this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP5")
          || this.valorPersonasAdmnistrativo < 0) {
          this.valorPersonasAdmnistrativo = 0;
        }
        totalPersonasAdmnistrativo = this.numeroPersonasAdmnistrativo * this.valorPersonasAdmnistrativo;
        subramos.Valores.ValorU1.Valor = totalPersonasAdmnistrativo;
        subramos.Valores.VPersonas = this.valorPersonasAdmnistrativo;
        subramos.Valores.NPersonas = this.numeroPersonasAdmnistrativo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP6") {
        var validacion = this.valorPersonasAdmnistrativo * parseFloat(this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP6"));
        if (this.valorGastosAdministrativo > validacion || this.valorGastosAdministrativo < 0) {
          this.valorGastosAdministrativo = 0;
        }
        totalGastosAdmnistrativo = this.numeroPersonasAdmnistrativo * this.valorGastosAdministrativo;
        subramos.Valores.ValorU1.Valor = totalGastosAdmnistrativo;
        subramos.Valores.GPersonas = this.valorGastosAdministrativo;
        subramos.Valores.NPersonas = this.numeroPersonasAdmnistrativo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP7") {
        subramos.Valores.NPersonas = this.numeroPersonasAdmnistrativo;
      }
      if (subramos.Datos.Codigo == "SAP8") {
        subramos.Valores.NPersonas = this.numeroPersonasAdmnistrativo;
      }
      if (subramos.Datos.Codigo == "SAP9") {
        if (this.valorPersonasOperativo > this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP9")
          || this.valorPersonasOperativo < 0) {
          this.valorPersonasOperativo = 0;
        }
        totalPersonasOperativo = this.numeroPersonasOperativo * this.valorPersonasOperativo;
        subramos.Valores.ValorU1.Valor = totalPersonasOperativo;
        subramos.Valores.VPersonas = this.valorPersonasOperativo;
        subramos.Valores.NPersonas = this.numeroPersonasOperativo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP10") {
        var validacion = this.valorPersonasOperativo * parseFloat(this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SAP10"));
        if (this.valorGastosOperativo > validacion || this.valorGastosOperativo < 0) {
          this.valorGastosOperativo = 0;
        }
        totalGastosOperativo = this.numeroPersonasOperativo * this.valorGastosOperativo;
        subramos.Valores.ValorU1.Valor = totalGastosOperativo;
        subramos.Valores.GPersonas = this.valorGastosOperativo;
        subramos.Valores.NPersonas = this.numeroPersonasOperativo;
        this.general.calcularTasaProvincias(this.listaAccidentesPersonales, subramos.Datos.Codigo);
        this.general.calcularPrimaSubramo(this.listaAccidentesPersonales, subramos.Datos.Codigo);
      }
      if (subramos.Datos.Codigo == "SAP11") {
        subramos.Valores.NPersonas = this.numeroPersonasOperativo;
      }
      if (subramos.Datos.Codigo == "SAP12") {
        subramos.Valores.NPersonas = this.numeroPersonasOperativo;
      }
    }

    this.calculoLimiteCatastrofico();
  }

  public calculoLimiteCatastrofico() {

    var maximoLimiteCatastrofico = 0;
    var valorAseguradoGrupoUno = 0;
    var valorAseguradoGrupoDos = 0;
    var valorAseguradoGrupoTres = 0;
    var sumaValoresAsegurados = 0;

    var numeroPersonasDirectivo: number = this.numeroPersonasDirectivo;
    var numeroPersonasAdministrativo: number = this.numeroPersonasAdmnistrativo;
    var numeroPersonasOperativo: number = this.numeroPersonasOperativo;

    var totalPersonas: number = numeroPersonasAdministrativo + numeroPersonasDirectivo + numeroPersonasOperativo;

    for (let coberturas of this.listaAccidentesPersonales) {
      if (coberturas.Datos.Codigo == "SAP13") {
        for (let reglas of coberturas.Reglas.Individual) {
          maximoLimiteCatastrofico = reglas.LimiteIndividual;
        }
      }
    }

    for (let coberturasG1 of this.listaAccidentesPersonalesDirectivo) {
      if (coberturasG1.Datos.Codigo == "SAP1") {
        valorAseguradoGrupoUno = coberturasG1.Valores.ValorU1.Valor;
      }
    }


    for (let coberturasG2 of this.listaAccidentesPersonalesAdmnistrativo) {
      if (coberturasG2.Datos.Codigo == "SAP5") {
        valorAseguradoGrupoDos = coberturasG2.Valores.ValorU1.Valor;
      }
    }


    for (let coberturasG3 of this.listaAccidentesPersonalesOperativo) {
      if (coberturasG3.Datos.Codigo == "SAP9") {
        valorAseguradoGrupoTres = coberturasG3.Valores.ValorU1.Valor;
      }
    }

    sumaValoresAsegurados = valorAseguradoGrupoUno + valorAseguradoGrupoDos + valorAseguradoGrupoTres;

    if (sumaValoresAsegurados >= maximoLimiteCatastrofico) {
      for (let coberturas of this.listaAccidentesPersonales) {
        if (coberturas.Datos.Codigo == "SAP13") {
          coberturas.Valores.ValorU1.Valor = maximoLimiteCatastrofico;
          this.tipoValor = 0;
        }
      }
    } else {
      for (let coberturas of this.listaAccidentesPersonales) {
        if (coberturas.Datos.Codigo == "SAP13") {
          coberturas.Valores.ValorU1.Valor = Math.floor(totalPersonas / 2);
          this.tipoValor = 1;
        }
      }
    }
  }
}
