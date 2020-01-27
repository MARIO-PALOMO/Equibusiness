import { Component, OnInit } from '@angular/core';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';

@Component({
  selector: 'app-cotizacion-condiciones',
  templateUrl: './cotizacion-condiciones.component.html',
  styleUrls: ['./cotizacion-condiciones.component.css']
})
export class CotizacionCondicionesComponent implements OnInit {

  usuario: any = [];
  public cotizacion: any = {};
  public contenido: any = {};
  public ramos: any = [];
  public lstRamos: any;

  public listaIncendio = [];
  public listaEquipoElectronico = [];
  public listaRoturaMaquinaria = [];
  public listaLucroRoturaMaquinaria = [];
  public listaLucroIncendio = [];
  public listaRoboAsalto = [];
  public listaDineroValores = [];
  public listaEquipoMaquinaria = [];
  public listaCoberturasAdicionales = [];
  public listaResponsabilidadCivil = [];
  public listaFidelidad = [];
  public listaAccidentesPersonales = [];
  public listaTransportes = [];
  public listaTransporteImportaciones = [];
  public listaVehiculos = [];

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

  public continuarCotizacion(){
    this.router.navigate(['/cliente/cotizacion/reporte']);
  }

  public buscarEstadoCotizacion() {

    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/cotizacion/buscar/estado/" + this.contenido.IdCotizacion, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.estadoCotizacion = res.Estado;
        this.buscarComplementoCondiciones();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public buscarComplementoCondiciones() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/empresa/contenido/consultar/' + parseInt(this.contenido.IdContenido), this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.DatosCondiciones != "") {
          for (let contenidos of JSON.parse(res.DatosCondiciones)) {
            if (contenidos.identificador == "RIL1") {
              this.listaIncendio = contenidos.ramo;
            } if (contenidos.identificador == "RCA14") {
              this.listaCoberturasAdicionales = contenidos.ramo;
            } if (contenidos.identificador == "REE2") {
              this.listaEquipoElectronico = contenidos.ramo;
            } if (contenidos.identificador == "RRM3") {
              this.listaRoturaMaquinaria = contenidos.ramo;
            } if (contenidos.identificador == "RLRM4") {
              this.listaLucroRoturaMaquinaria = contenidos.ramo;
            } if (contenidos.identificador == "RLIL5") {
              this.listaLucroIncendio = contenidos.ramo;
            } if (contenidos.identificador == "RRA6") {
              this.listaRoboAsalto = contenidos.ramo;
            } if (contenidos.identificador == "RDV7") {
              this.listaDineroValores = contenidos.ramo;
            } if (contenidos.identificador == "REM8") {
              this.listaEquipoMaquinaria = contenidos.ramo;
            } if (contenidos.identificador == "RRC9") {
              this.listaResponsabilidadCivil = contenidos.ramo;
            } if (contenidos.identificador == "RFI10") {
              this.listaFidelidad = contenidos.ramo;
            } if (contenidos.identificador == "RAP12") {
              this.listaAccidentesPersonales = contenidos.ramo;
            } if (contenidos.identificador == "RTR11IN") {
              this.listaTransportes = contenidos.ramo;
            } if (contenidos.identificador == "RTR11IM") {
              this.listaTransporteImportaciones = contenidos.ramo;
            } if (contenidos.identificador == "RVE13") {
              this.listaVehiculos = contenidos.ramo;
            }
          }
          this.buscarCondiciones();
        } else {
          this.buscarCondiciones();
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarComplementoContenido() {
    this.spinner.show();

    var lstCondiciones = [];
    for (let ramos of this.lstRamos) {
      if (ramos.ramo.length != 0) {
        lstCondiciones.push(ramos);
      }
    }

    var contenidos = {
      "Identificador": 3,
      "IdContenido": parseInt(this.contenido.IdContenido),
      "DatosCotizador": "",
      "DatosGarantias": "",
      "DatosCondiciones": JSON.stringify(lstCondiciones),
      "Lista": "",
      "VistaEstado": "",
      "VistaDiseno": "",
      "VistaValores": "",
      "Cotizacion": { "IdCotizacion": parseInt(this.cotizacion.idCotizacion) }
    }
    this.conexion.post("Broker/SBroker.svc/empresa/contenido/gestion", contenidos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.router.navigate(['/cliente/cotizacion/reporte']);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public buscarCondiciones() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/complementos/consultar?identificador=CONDICIONES&broker=' + this.usuario.broker.IdBroker + '', this.usuario.Uid).subscribe(
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
      { ramo: this.listaIncendio, identificador: "RIL1" },
      { ramo: this.listaEquipoElectronico, identificador: "REE2" },
      { ramo: this.listaRoturaMaquinaria, identificador: "RRM3" },
      { ramo: this.listaLucroRoturaMaquinaria, identificador: "RLRM4" },
      { ramo: this.listaLucroIncendio, identificador: "RLIL5" },
      { ramo: this.listaRoboAsalto, identificador: "RRA6" },
      { ramo: this.listaDineroValores, identificador: "RDV7" },
      { ramo: this.listaEquipoMaquinaria, identificador: "REM8" },
      { ramo: this.listaCoberturasAdicionales, identificador: "RCA14" },
      { ramo: this.listaResponsabilidadCivil, identificador: "RRC9" },
      { ramo: this.listaFidelidad, identificador: "RFI10" },
      { ramo: this.listaAccidentesPersonales, identificador: "RAP12" },
      { ramo: this.listaTransportes, identificador: "RTR11IN" },
      { ramo: this.listaTransporteImportaciones, identificador: "RTR11IM" },
      { ramo: this.listaVehiculos, identificador: "RVE13" }
    ];
  }

  public filtrarRamos(ramos_: any, codigo_: any) {
    var lstResultado = [];
    for (let ramos of ramos_) {
      if (ramos.Codigo == codigo_) {
        lstResultado.push({ Ramo: ramos, Valor: 0 });
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
