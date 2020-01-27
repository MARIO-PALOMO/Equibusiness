import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { ApiService } from '../../servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CotizacionRamoGeneral } from '../cotizacion-ramos/cotizacion.ramo.general';
declare var $: any;
@Component({
  selector: 'app-z-cotizacion-reporte-email-cliente',
  templateUrl: './z-cotizacion-reporte-email-cliente.component.html',
  styleUrls: ['./z-cotizacion-reporte-email-cliente.component.css'],
  providers: [CotizacionRamoGeneral, GlobalesPipe]
})
export class ZCotizacionReporteEmailClienteComponent implements OnInit {

  public parametros = { IdBroker: 0, IdContenido: 0, IdCotizacion: 0, IdDireccion: 0, IdVehiculos: 0, IdEmpresa: 0, BrokerFoto: "", BrokerColor: "" };
  public datosCotizacion: any = { "Antiguedad": "", "Broker": { "Color": "", "Estado": 0, "Foto": "", "IdBroker": 0, "MultiRiesgo": 0, "Primas": 0, "Provincias": 0, "RazonSocial": "", "Riesgo": 0 }, "Codigo": "", "Contenido": { "Cotizacion": "", "DatosCondiciones": [], "DatosCotizador": {}, "DatosGarantias": [], "EstadoCondiciones": "", "EstadoGarantias": "", "IdContenido": 0, "Identificador": 0, "Lista": [], "VistaDiseno": [], "VistaEstado": [], "VistaValores": [] }, "DerechosEmision": 0, "Direccion": { "Cotizacion": "", "DatosDireccion": [], "IdDireccion": 0, "Identificador": 0 }, "Empresa": { "Codigo": 0, "Email": "", "GiroNegocio": "", "IdEmpresa": 0, "Identificador": 0, "RazonSocial": "0", "Riesgo": 0, "Ruc": "", "SectorEconomico": "", "Telefono": "" }, "Estado": 0, "Fecha": "0", "IdCotizacion": 0, "IdUsuario": 0, "Identificador": 0, "ImpuestoCampesino": 0, "ImpuestoSBS": 0, "Iva": 0, "PrimaNetaIva0": 0, "PrimaNetaIva12": 0, "PrimaNetaTotal": 0, "PrimaTotal": 0, "Vehiculo": { "Cotizacion": "", "DatosVehiculo": [], "IdVehiculos": 0, "Identificador": 0 } };
  public datosDireccion: any = [];
  public datosCondiciones: any = [];
  public datosCotizador: any = {};
  public datosGarantias: any = [];
  public lstRamos = [];
  public estadoPago;

  public listaInformacionTransporte = [];
  deducibles = [{ id: 0, vista: 0, union: 0 }];

  constructor(private rutaActiva: ActivatedRoute, public globales: GlobalesPipe, private conexion: ApiService,
    private spinner: NgxSpinnerService, private general: CotizacionRamoGeneral) { }

  ngOnInit() {
    var datos = atob(this.rutaActiva.snapshot.params.datos);
    var lstCadena = datos.split("-");
    this.parametros.IdBroker = parseInt(lstCadena[0]);
    this.parametros.IdContenido = parseInt(lstCadena[1]);
    this.parametros.IdCotizacion = parseInt(lstCadena[2]);
    this.parametros.IdDireccion = parseInt(lstCadena[3]);
    this.parametros.IdVehiculos = parseInt(lstCadena[4]);
    this.parametros.IdEmpresa = parseInt(lstCadena[5]);
    this.parametros.BrokerFoto = lstCadena[6];
    this.parametros.BrokerColor = lstCadena[7];

    setTimeout(() => {
      this.listarInformacionTransportes();
    }, 300);

  }

  public listarInformacionTransportes() {
    this.spinner.show();
    this.conexion.get("Gestion/SGesConsultas.svc/usuario/ramo/listarSubramosTrasporte/" + this.parametros.IdBroker, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaInformacionTransporte = res;
        this.buscarCotizacion();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }
  public buscarCotizacion() {

    this.spinner.show();
    this.conexion.get("Gestion/SGesConsultas.svc/usuario/cotizacion/completa/resgistros?idContenido=" + this.parametros.IdContenido + "&idCotizacion=" + this.parametros.IdCotizacion + "&idDireccion=" + this.parametros.IdDireccion + "&idVehiculos=" + this.parametros.IdVehiculos + "&idEmpresa=" + this.parametros.IdEmpresa + "", "").subscribe(
      (res: any) => {
        this.spinner.hide();

        this.estadoPago = res.Estado;

        if (res.Contenido.DatosCondiciones == "") {
        } else {
          this.datosCondiciones = JSON.parse(res.Contenido.DatosCondiciones);
        }

        if (res.Contenido.DatosGarantias == "") {
        } else {
          this.datosGarantias = JSON.parse(res.Contenido.DatosGarantias);
        }

        this.datosCotizacion = res;
        this.datosDireccion = JSON.parse(res.Direccion.DatosDireccion);
        this.datosCotizador = JSON.parse(res.Contenido.DatosCotizador);

        this.lstRamos = [
          {
            ramo: this.datosCotizador.listaIncendio,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaIncendio),
            nombre: this.datosCotizador.listaIncendio.length > 0 ? this.datosCotizador.listaIncendio[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaIncendio.length > 0 ? this.datosCotizador.listaIncendio[0].Datos.Ramo.Rango : '',
            identificador: "RIL1",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaIncendio)
          },
          {
            ramo: this.datosCotizador.listaEquipoElectronico,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaEquipoElectronico),
            nombre: this.datosCotizador.listaEquipoElectronico.length > 0 ? this.datosCotizador.listaEquipoElectronico[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaEquipoElectronico.length > 0 ? this.datosCotizador.listaEquipoElectronico[0].Datos.Ramo.Rango : '',
            identificador: "REE2",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaEquipoElectronico)
          },
          {
            ramo: this.datosCotizador.listaRoturaMaquinaria,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaRoturaMaquinaria),
            nombre: this.datosCotizador.listaRoturaMaquinaria.length > 0 ? this.datosCotizador.listaRoturaMaquinaria[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaRoturaMaquinaria.length > 0 ? this.datosCotizador.listaRoturaMaquinaria[0].Datos.Ramo.Rango : '',
            identificador: "RRM3",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaRoturaMaquinaria)
          },
          {
            ramo: this.datosCotizador.listaLucroRoturaMaquinaria,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaLucroRoturaMaquinaria),
            nombre: (this.datosCotizador.listaLucroRoturaMaquinaria.length > 0) ? this.datosCotizador.listaLucroRoturaMaquinaria[0].Datos.Ramo.Nombre : '',
            rango: (this.datosCotizador.listaLucroRoturaMaquinaria.length > 0) ? this.datosCotizador.listaLucroRoturaMaquinaria[0].Datos.Ramo.Rango : '',
            identificador: "RLRM4",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaLucroRoturaMaquinaria)
          },
          {
            ramo: this.datosCotizador.listaLucroIncendio,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaLucroIncendio),
            nombre: (this.datosCotizador.listaLucroIncendio.length > 0) ? this.datosCotizador.listaLucroIncendio[0].Datos.Ramo.Nombre : '',
            rango: (this.datosCotizador.listaLucroIncendio.length > 0) ? this.datosCotizador.listaLucroIncendio[0].Datos.Ramo.Rango : '',
            identificador: "RLIL5",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaLucroIncendio)
          },
          {
            ramo: this.datosCotizador.listaRoboAsalto,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaRoboAsalto),
            nombre: this.datosCotizador.listaRoboAsalto.length > 0 ? this.datosCotizador.listaRoboAsalto[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaRoboAsalto.length > 0 ? this.datosCotizador.listaRoboAsalto[0].Datos.Ramo.Rango : '',
            identificador: "RRA6",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaRoboAsalto)
          },
          {
            ramo: this.datosCotizador.listaDineroValores,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaDineroValores),
            nombre: this.datosCotizador.listaDineroValores.length > 0 ? this.datosCotizador.listaDineroValores[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaDineroValores.length > 0 ? this.datosCotizador.listaDineroValores[0].Datos.Ramo.Rango : '',
            identificador: "RDV7",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaDineroValores)
          },
          {
            ramo: this.datosCotizador.listaEquipoMaquinaria,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaEquipoMaquinaria),
            nombre: this.datosCotizador.listaEquipoMaquinaria.length > 0 ? this.datosCotizador.listaEquipoMaquinaria[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaEquipoMaquinaria.length > 0 ? this.datosCotizador.listaEquipoMaquinaria[0].Datos.Ramo.Rango : '',
            identificador: "REM8",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaEquipoMaquinaria)
          },
          {
            ramo: this.datosCotizador.listaCoberturasAdicionalesMR,
            visualizacion: this.primalNetaMultiriesgo(),
            nombre: this.datosCotizador.listaCoberturasAdicionalesMR.length > 0 ? this.datosCotizador.listaCoberturasAdicionalesMR[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaCoberturasAdicionalesMR.length > 0 ? this.datosCotizador.listaCoberturasAdicionalesMR[0].Datos.Ramo.Rango : '',
            identificador: "RCA14",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaCoberturasAdicionalesMR)
          },
          {
            ramo: this.datosCotizador.listaResponsabilidadCivil,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaResponsabilidadCivil),
            nombre: this.datosCotizador.listaResponsabilidadCivil.length > 0 ? this.datosCotizador.listaResponsabilidadCivil[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaResponsabilidadCivil.length > 0 ? this.datosCotizador.listaResponsabilidadCivil[0].Datos.Ramo.Rango : '',
            identificador: "RRC9",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaResponsabilidadCivil)
          },
          {
            ramo: this.datosCotizador.listaFidelidad,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaFidelidad),
            nombre: this.datosCotizador.listaFidelidad.length > 0 ? this.datosCotizador.listaFidelidad[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaFidelidad.length > 0 ? this.datosCotizador.listaFidelidad[0].Datos.Ramo.Rango : '',
            identificador: "RFI10",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaFidelidad)
          },
          {
            ramo: this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales),
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaAccidentesPersonales),
            nombre: this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales).length > 0 ? this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales)[0].Datos.Ramo.Nombre : '',
            rango: this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales).length > 0 ? this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales)[0].Datos.Ramo.Rango : '',
            identificador: "RAP12",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaAccidentesPersonales)
          },
          {
            ramo: this.datosCotizador.listaTransportes,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaTransportes),
            nombre: "Transporte Interno",
            rango: this.datosCotizador.listaTransportes.length > 0 ? this.datosCotizador.listaTransportes[0].Datos.Ramo.Rango : '',
            identificador: "RTR11IN",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaTransportes)
          },
          {
            ramo: this.datosCotizador.listaTransporteImportaciones,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaTransporteImportaciones),
            nombre: "Transporte Importaciones",
            rango: this.datosCotizador.listaTransporteImportaciones.length > 0 ? this.datosCotizador.listaTransporteImportaciones[0].Datos.Ramo.Rango : '',
            identificador: "RTR11IM",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaTransporteImportaciones)
          },
          {
            ramo: this.datosCotizador.listaVehiculos,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaVehiculos),
            nombre: this.datosCotizador.listaVehiculos.length > 0 ? this.datosCotizador.listaVehiculos[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaVehiculos.length > 0 ? this.datosCotizador.listaVehiculos[0].Datos.Ramo.Rango : '',
            identificador: "RVE13",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaVehiculos)
          }
        ];

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public obtenerUnionDeducibles(listRamo) {
    var deducibles = [];
    for (let subramos of listRamo) {
      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");
      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });
      }
    }
    return deducibles;
  }

  public separacionAccidentesPersonales(lista) {
    var lstRamo = [];
    for (var subramos of lista) {
      if (subramos.Datos.Codigo == "SAP2") {
        lstRamo.push(subramos);
      } if (subramos.Datos.Codigo == "SAP6") {
        lstRamo.push(subramos);
      } if (subramos.Datos.Codigo == "SAP10") {
        lstRamo.push(subramos);
      } if (subramos.Datos.Codigo == "SAP13") {
        lstRamo.push(subramos);
      }
    }
    return lstRamo;
  }


  public separacionTransportes(lista, valor) {
    var lstRamo = [];
    for (var subramos of lista) {
      if (subramos.Datos.Grupo == valor) {
        lstRamo.push(subramos);
      }
    }
    return lstRamo;
  }

  public obtenerInformacioTransportes(idInfoTransporte, listaInfoTransporte) {
    var descripcion = "";

    for (let informacion of listaInfoTransporte) {
      if (informacion.IdSubRamoTransporte == idInfoTransporte) {
        descripcion = informacion.Descripcion;
      }
    }

    return descripcion;
  }

  public primalNetaMultiriesgo() {
    var primaMinima = this.calcularPrimaMinima(this.datosCotizador.listaCoberturasAdicionalesMR);

    var incendio: any = this.general.calcularPrimaTotal(this.datosCotizador.listaIncendio);
    var equipoElectronico: any = this.general.calcularPrimaTotal(this.datosCotizador.listaEquipoElectronico);
    var roturaMaquinaria: any = this.general.calcularPrimaTotal(this.datosCotizador.listaRoturaMaquinaria);
    var roboAsalto: any = this.general.calcularPrimaTotal(this.datosCotizador.listaRoboAsalto);
    var dineroValores: any = this.general.calcularPrimaTotal(this.datosCotizador.listaDineroValores);
    var equipoMaquinaria: any = this.general.calcularPrimaTotal(this.datosCotizador.listaEquipoMaquinaria);
    var total = 0;
    total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto) + parseFloat(dineroValores) + parseFloat(equipoMaquinaria);

    return (primaMinima > total && total > 0) ? primaMinima : total;
  }

  public calcularPrimaTotal(lista: any) {
    try {
      var total = 0;
      var primaMinima = this.calcularPrimaMinima(lista);
      for (let i = 0; i < lista.length; i++) {
        total = total + lista[i].Valores.Prima;
      }

      return (primaMinima > total && total > 0) ? primaMinima : Math.round(total * 100) / 100;
    } catch (e) { }
  }

  public calcularPrimaMinima(lista: any) {
    try {
      var primaMinima = 0;
      for (var datos of lista) {
        if (datos.Datos.Ramo.PrimaMinimaSumatoria == 1) {
          primaMinima = datos.Datos.Ramo.PrimaMinima;
        }
      }
      return primaMinima;
    } catch (e) { }
  }

  public formatearValores(numero) {
    var resultado = "-";
    if (numero != 0) {
      return this.globales.formatearNumero(numero, 2);
    } else {
      return resultado;
    }
  }

  public sumarValores(uno, dos, tres, cuatro, cinco) {
    var total: number = parseFloat(uno) + parseFloat(dos) + parseFloat(tres) + parseFloat(cuatro) + parseFloat(cinco);
    return total;
  }

  public imprimirCotizacion() {
    $("#reporte").printThis({
      importCSS: true,
      importStyle: true
    });
  }
}
