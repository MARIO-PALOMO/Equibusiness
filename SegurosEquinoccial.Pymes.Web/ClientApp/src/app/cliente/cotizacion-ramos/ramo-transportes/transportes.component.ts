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
  templateUrl: './transportes.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class TransportesComponente {

  @Input() listaTransportes: any = [];
  @Input() listaSubRamoTransporte: any = [];

  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";
  @Input() identificadorGuardado = 0;

  usuario: any;
  deducibles = [{ id: 0, vista: 0, union: 0 }];

  public listaSubramoTransporteDatos = [];
  public datosTransporteInterno: any;

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaTransportes);
    this.asignacionSubramoTransporte();
    this.asignacionListaTrasporte(this.identificadorGuardado);
    this.asignacionSubramoTransporte();
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaTransportes);
      this.asignacionSubramoTransporte();
      this.asignacionListaTrasporte(this.identificadorGuardado);
      this.obtenerUnionDeducibles();
      console.log(this.listaTransportes);
    }, 1000);
  }

  public gestionTasaTransporteInterno(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaTransportes, subramo);
    this.general.calcularPrimaSubramo(this.listaTransportes, subramo);
  }

  public gestionRamoTransporteInterno(valor: any, subramo: any, ubicacion: any, texto: any) {
    this.validacion.gestionReglasRamosSubRamos(this.listaTransportes, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
    this.general.calcularTasaProvincias(this.listaTransportes, subramo);
    this.general.calcularPrimaSubramo(this.listaTransportes, subramo);
  }

  public asignacionSubramoTransporte() {
    this.listaSubramoTransporteDatos = [];
    for (let subramos of this.listaSubRamoTransporte) {
      if (subramos.Tipo == "Transporte Interno") {
        this.listaSubramoTransporteDatos.push(subramos);
      }
    }
  }

  public asignacionListaTrasporte(guardado: any) {
    if (true) {
      for (let transporte of this.listaTransportes) {
        for (let datos of this.listaSubramoTransporteDatos) {

          if (transporte.Datos.Codigo == "STR2") {
            if (transporte.Valores.ITransporte == datos.IdSubRamoTransporte) {
              this.datosTransporteInterno = datos;
            }
          }
        }
      }
    }
  }

  public gestionListasTransportes(identificador: any, subramo: any, lista: any) {
    var tasa = 0;
    var valor = 0;
    var estimado = 0;
    if (identificador == 1) {
      valor = this.datosTransporteInterno.LimiteInferior;
      for (var transporte of lista) {
        if (transporte.Datos.Codigo == subramo) {
          transporte.Valores.ValorU1.Valor = valor;

          transporte.Valores.ITransporte = this.datosTransporteInterno.IdSubRamoTransporte;
          transporte.Valores.CTrasporte = transporte.Datos.Codigo;

          transporte.Valores.Prima = valor;
        }
      }
    } else if (identificador == 2) {
    }

  }

  public obtenerUnionDeducibles() {
    var deducibles = [];
    this.deducibles = [];
    for (let subramos of this.listaTransportes) {

      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");

      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });

      }
    }
    this.deducibles = deducibles;
  }
}
