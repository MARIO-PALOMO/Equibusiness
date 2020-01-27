import { SesionService } from './../../servicios/sesion/sesion.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion-garantias',
  templateUrl: './cotizacion-garantias.component.html',
  styleUrls: ['./cotizacion-garantias.component.css']
})
export class CotizacionGarantiasComponent implements OnInit {

  public usuario: any = [];
  public cotizacion: any = {};
  public contenido: any = {};
  public ramos: any = [];
  public lstRamos: any;

  public listaIncendio = [];
  public listaIncendioCumplimiento = 30;
  public listaEquipoElectronico = [];
  public listaEquipoElectronicoCumplimiento = 30;
  public listaRoturaMaquinaria = [];
  public listaRoturaMaquinariaCumplimiento = 30;
  public listaLucroRoturaMaquinaria = [];
  public listaLucroRoturaMaquinariaCumplimiento = 30;
  public listaLucroIncendio = [];
  public listaLucroIncendioCumplimiento = 30;
  public listaRoboAsalto = [];
  public listaRoboAsaltoCumplimiento = 30;
  public listaDineroValores = [];
  public listaDineroValoresCumplimiento = 30;
  public listaEquipoMaquinaria = [];
  public listaEquipoMaquinariaCumplimiento = 30;
  public listaCoberturasAdicionales = [];
  public listaCoberturasAdicionalesCumplimiento = 30;
  public listaResponsabilidadCivil = [];
  public listaResponsabilidadCivilCumplimiento = 30;
  public listaFidelidad = [];
  public listaFidelidadCumplimiento = 30;
  public listaAccidentesPersonales = [];
  public listaAccidentesPersonalesCumplimiento = 30;
  public listaTransportes = [];
  public listaTransportesCumplimiento = 30;
  public listaTransporteImportaciones = [];
  public listaTransporteImportacionesCumplimiento = 30;
  public listaVehiculos = [];
  public listaVehiculosCumplimiento = 30;

  public estadoCotizacion = 0;

  constructor(private router: Router, private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService,
    private kramos: RamosService, private kcontenido: CotizacionService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.verificarRamosCotizacionExistente();
    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public verificarRamosCotizacionExistente() {
    if (this.kcotizacion.verificarKeyCotizacion()) {
      this.cotizacion = this.kcotizacion.obtenerKeyCotizacion();
      if (this.kramos.verificarKeyRamos()) {
        if (this.kcontenido.verificarKeyContenido()) {
          this.contenido = this.kcontenido.obtenerKeyContenido();
          this.buscarEstadoCotizacion();
        } else {
          this.kcontenido.regresarObtenerContenido();
        }
      } else {
        this.kramos.regresarObtenerRamos();
      }
    } else {
      this.kcotizacion.regresarObtenerCotizacion();
    }
  }

  public continuarCondiciones() {
    this.router.navigate(['/cliente/cotizacion/condiciones']);
  }

  public buscarEstadoCotizacion() {

    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/cotizacion/buscar/estado/" + this.contenido.IdCotizacion, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.estadoCotizacion = res.Estado;
        this.buscarComplementoGarantias();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public buscarComplementoGarantias() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/empresa/contenido/consultar/' + parseInt(this.contenido.IdContenido), this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        //console.log(JSON.parse(res.DatosGarantias));
        if (res.DatosGarantias != "") {
          for (let garantias of JSON.parse(res.DatosGarantias)) {
            if (garantias.identificador == "RIL1") {
              this.listaIncendio = garantias.ramo;
              this.listaIncendioCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RCA14") {
              this.listaCoberturasAdicionales = garantias.ramo;
              this.listaCoberturasAdicionalesCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "REE2") {
              this.listaEquipoElectronico = garantias.ramo;
              this.listaEquipoElectronicoCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RRM3") {
              this.listaRoturaMaquinaria = garantias.ramo;
              this.listaRoturaMaquinariaCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RLRM4") {
              this.listaLucroRoturaMaquinaria = garantias.ramo;
              this.listaLucroRoturaMaquinariaCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RLIL5") {
              this.listaLucroIncendio = garantias.ramo;
              this.listaLucroIncendioCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RRA6") {
              this.listaRoboAsalto = garantias.ramo;
              this.listaRoboAsaltoCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RDV7") {
              this.listaDineroValores = garantias.ramo;
              this.listaDineroValoresCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "REM8") {
              this.listaEquipoMaquinaria = garantias.ramo;
              this.listaEquipoMaquinariaCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RRC9") {
              this.listaResponsabilidadCivil = garantias.ramo;
              this.listaResponsabilidadCivilCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RFI10") {
              this.listaFidelidad = garantias.ramo;
              this.listaFidelidadCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RAP12") {
              this.listaAccidentesPersonales = garantias.ramo;
              this.listaAccidentesPersonalesCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RTR11IN") {
              this.listaTransportes = garantias.ramo;
              this.listaTransportesCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RTR11IM") {
              this.listaTransporteImportaciones = garantias.ramo;
              this.listaTransporteImportacionesCumplimiento = garantias.cumplimiento;
            } if (garantias.identificador == "RVE13") {
              this.listaVehiculos = garantias.ramo;
              this.listaVehiculosCumplimiento = garantias.cumplimiento;
            }
          }
          this.buscarGarantias();
        } else {
          this.buscarGarantias();
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarComplementoGarantias() {

    var lstGarantias = [];
    for (let ramos of this.lstRamos) {
      if (ramos.ramo.length != 0) {
        lstGarantias.push(ramos);
      }
    }

    var lstResultado = []
    for (let garantias of lstGarantias) {
      for (let datos of garantias.ramo) {
        if (datos.Valor == 1) {
          lstResultado.push(datos.Valor);
        }
      }
    }

    var contenidos = {
      "Identificador": 2,
      "IdContenido": parseInt(this.contenido.IdContenido),
      "DatosCotizador": "",
      "DatosGarantias": JSON.stringify(lstGarantias),
      "DatosCondiciones": "",
      "Lista": "",
      "VistaEstado": "",
      "VistaDiseno": "",
      "VistaValores": "",
      "Cotizacion": { "IdCotizacion": parseInt(this.cotizacion.idCotizacion), }
    }

    this.spinner.show();
    this.conexion.post("Broker/SBroker.svc/empresa/contenido/gestion", contenidos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res);
        this.router.navigate(['/cliente/cotizacion/condiciones']);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );

  }

  public buscarGarantias() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/complementos/consultar?identificador=GARANTIAS&broker=' + this.usuario.broker.IdBroker + '', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.igualarRamos(this.kramos.obtenerKeyRamos(), res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public complementarRamos() {
    this.lstRamos = [
      { ramo: this.listaIncendio, cumplimiento: this.listaIncendioCumplimiento, identificador: "RIL1" },
      { ramo: this.listaEquipoElectronico, cumplimiento: this.listaEquipoElectronicoCumplimiento, identificador: "REE2" },
      { ramo: this.listaRoturaMaquinaria, cumplimiento: this.listaRoturaMaquinariaCumplimiento, identificador: "RRM3" },
      { ramo: this.listaLucroRoturaMaquinaria, cumplimiento: this.listaLucroRoturaMaquinariaCumplimiento, identificador: "RLRM4" },
      { ramo: this.listaLucroIncendio, cumplimiento: this.listaLucroIncendioCumplimiento, identificador: "RLIL5" },
      { ramo: this.listaRoboAsalto, cumplimiento: this.listaRoboAsaltoCumplimiento, identificador: "RRA6" },
      { ramo: this.listaDineroValores, cumplimiento: this.listaDineroValoresCumplimiento, identificador: "RDV7" },
      { ramo: this.listaEquipoMaquinaria, cumplimiento: this.listaEquipoMaquinariaCumplimiento, identificador: "REM8" },
      { ramo: this.listaCoberturasAdicionales, cumplimiento: this.listaCoberturasAdicionalesCumplimiento, identificador: "RCA14" },
      { ramo: this.listaResponsabilidadCivil, cumplimiento: this.listaResponsabilidadCivilCumplimiento, identificador: "RRC9" },
      { ramo: this.listaFidelidad, cumplimiento: this.listaFidelidadCumplimiento, identificador: "RFI10" },
      { ramo: this.listaAccidentesPersonales, cumplimiento: this.listaAccidentesPersonalesCumplimiento, identificador: "RAP12" },
      { ramo: this.listaTransportes, cumplimiento: this.listaTransportesCumplimiento, identificador: "RTR11IN" },
      { ramo: this.listaTransporteImportaciones, cumplimiento: this.listaTransporteImportacionesCumplimiento, identificador: "RTR11IM" },
      { ramo: this.listaVehiculos, cumplimiento: this.listaVehiculosCumplimiento, identificador: "RVE13" }
    ];

  }

  public filtrarRamos(ramos_: any, codigo_: any) {
    var lstResultado = [];
    for (let ramos of ramos_) {
      if (ramos.Codigo == codigo_) {
        lstResultado.push({ Ramo: ramos, Valor: ramos.Valor, Bloqueo: ramos.Bloqueo });
      }
    }

    return lstResultado;
  }

  public igualarRamos(ramos_: any, lista: any) {
    var resultado = [];
    for (let ramos of ramos_) {
      if (ramos == "incendio") {
        resultado.push("RIL1");
        if (this.listaIncendio.length == 0) {
          this.listaIncendio = this.filtrarRamos(lista, "RIL1");
        }
      } if (ramos == "coberturasAdicionales") {
        resultado.push("RCA14");
        if (this.listaCoberturasAdicionales.length == 0) {
          this.listaCoberturasAdicionales = this.filtrarRamos(lista, "RCA14");
        }
      } if (ramos == "equipoElectronico") {
        resultado.push("REE2");
        if (this.listaEquipoElectronico.length == 0) {
          this.listaEquipoElectronico = this.filtrarRamos(lista, "REE2");
        }
      } if (ramos == "roturaMaquinaria") {
        resultado.push("RRM3");
        if (this.listaRoturaMaquinaria.length == 0) {
          this.listaRoturaMaquinaria = this.filtrarRamos(lista, "RRM3");
        }
      } if (ramos == "lucroRoturaMaquinaria") {
        resultado.push("RLRM4");
        if (this.listaLucroRoturaMaquinaria.length == 0) {
          this.listaLucroRoturaMaquinaria = this.filtrarRamos(lista, "RLRM4");
        }
      } if (ramos == "lucroIncendio") {
        resultado.push("RLIL5");
        if (this.listaLucroIncendio.length == 0) {
          this.listaLucroIncendio = this.filtrarRamos(lista, "RLIL5");
        }
      } if (ramos == "roboAsalto") {
        resultado.push("RRA6");
        if (this.listaRoboAsalto.length == 0) {
          this.listaRoboAsalto = this.filtrarRamos(lista, "RRA6");
        }
      } if (ramos == "dineroValores") {
        resultado.push("RDV7");
        if (this.listaDineroValores.length == 0) {
          this.listaDineroValores = this.filtrarRamos(lista, "RDV7");
        }
      } if (ramos == "equipoMaquinaria") {
        resultado.push("REM8");
        if (this.listaEquipoMaquinaria.length == 0) {
          this.listaEquipoMaquinaria = this.filtrarRamos(lista, "REM8");
        }
      } if (ramos == "responsabilidadCivil") {
        resultado.push("RRC9");
        if (this.listaResponsabilidadCivil.length == 0) {
          this.listaResponsabilidadCivil = this.filtrarRamos(lista, "RRC9");
        }
      } if (ramos == "fidelidad") {
        resultado.push("RFI10");
        if (this.listaFidelidad.length == 0) {
          this.listaFidelidad = this.filtrarRamos(lista, "RFI10");
        }
      } if (ramos == "accidentesPersonales") {
        resultado.push("RAP12");
        if (this.listaAccidentesPersonales.length == 0) {
          this.listaAccidentesPersonales = this.filtrarRamos(lista, "RAP12");
        }
      } if (ramos == "transportes") {
        resultado.push("RTR11IN");
        if (this.listaTransportes.length == 0) {
          this.listaTransportes = this.filtrarRamos(lista, "RTR11IN");
        }
      } if (ramos == "transporteImportaciones") {
        resultado.push("RTR11IM");
        if (this.listaTransporteImportaciones.length == 0) {
          this.listaTransporteImportaciones = this.filtrarRamos(lista, "RTR11IM");
        }
      } if (ramos == "vehiculos") {
        resultado.push("RVE13");
        if (this.listaVehiculos.length == 0) {
          this.listaVehiculos = this.filtrarRamos(lista, "RVE13");
        }
      }
    }
    this.complementarRamos();

    return resultado;
  }

  public limpiarDatos(datos, caracter, remplazo) {
    var str = datos;
    var res = str.replace(caracter, remplazo);
    return res;
  }

}
