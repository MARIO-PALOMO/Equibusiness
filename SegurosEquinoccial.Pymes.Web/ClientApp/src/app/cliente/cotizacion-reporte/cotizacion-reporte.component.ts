import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { CotizacionRamoGeneral } from '../cotizacion-ramos/cotizacion.ramo.general';
import { VariablesEmail } from '../../variables/email/email';
import { Router } from '@angular/router';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';
import Swal from 'sweetalert2';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { VariablesGlobales } from '../../variables/globales/globales';
import { FotosGlobales } from '../../variables/fotos/fotos';

declare var $: any;

@Component({
  selector: 'app-cotizacion-reporte',
  templateUrl: './cotizacion-reporte.component.html',
  styleUrls: ['./cotizacion-reporte.component.css'],
  providers: [CotizacionRamoGeneral, VariablesEmail, GlobalesPipe, VariablesGlobales]
})
export class CotizacionReporteComponent implements OnInit {

  public usuario: any;
  public cotizacion: any = {};
  public contenido: any = {};
  public datosCotizacion: any = { "Antiguedad": "", "Broker": { "Color": "", "Estado": 0, "Foto": "", "IdBroker": 0, "MultiRiesgo": 0, "Primas": 0, "Provincias": 0, "RazonSocial": "", "Riesgo": 0 }, "Codigo": "", "Contenido": { "Cotizacion": "", "DatosCondiciones": [], "DatosCotizador": {}, "DatosGarantias": [], "EstadoCondiciones": "", "EstadoGarantias": "", "IdContenido": 0, "Identificador": 0, "Lista": [], "VistaDiseno": [], "VistaEstado": [], "VistaValores": [] }, "DerechosEmision": 0, "Direccion": { "Cotizacion": "", "DatosDireccion": [], "IdDireccion": 0, "Identificador": 0 }, "Empresa": { "Codigo": 0, "Email": "", "GiroNegocio": "", "IdEmpresa": 0, "Identificador": 0, "RazonSocial": "0", "Riesgo": 0, "Ruc": "", "SectorEconomico": "", "Telefono": "" }, "Estado": 0, "Fecha": "0", "IdCotizacion": 0, "IdUsuario": 0, "Identificador": 0, "ImpuestoCampesino": 0, "ImpuestoSBS": 0, "Iva": 0, "PrimaNetaIva0": 0, "PrimaNetaIva12": 0, "PrimaNetaTotal": 0, "PrimaTotal": 0, "Vehiculo": { "Cotizacion": "", "DatosVehiculo": [], "IdVehiculos": 0, "Identificador": 0 } };
  public datosDireccion: any = [];
  public datosCondiciones: any = [];
  public datosCotizador: any = {};
  public datosGarantias: any = [];
  public lstRamos = [];
  public estadoKey = false;
  public estadoPago;
  public decuciblesAccidentesPersonales = [];

  public listaInformacionTransporte = [];

  public listaAccidentesPersonalesDirectivo = [];
  public listaAccidentesPersonalesAdministrativo = [];
  public listaAccidentesPersonalesOperativo = [];
  public listaAccidentesPersonalesGlobal = [];

  public estadoReporte = true;
  public estadoAdvertencia = false;

  deducibles = [{ id: 0, vista: 0, union: 0 }];

  public anchoColumna: any;
  public lstSiniestros = []
  public listaDetallesVehiculos = [];

  public detallesVehiculos = [];
  public primaNetaVehiculos = 0;
  public primaTotalVehiculos = 0;
  
  public ramos: any
  public verLogo = 0;
  public nombreCorredor = "";
  public codigoCorredor = "";

  public fotos: FotosGlobales = new FotosGlobales();
  
  constructor(private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService,
    private kcontenido: CotizacionService, private spinner: NgxSpinnerService, private general: CotizacionRamoGeneral,
    private email: VariablesEmail, private router: Router, private kfinalizacion: FinalizacionService, private globales: GlobalesPipe,
    private variables: VariablesGlobales) {
  }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.verificarRamosCotizacionExistente();
    this.verificarEstadoPago();
    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public verificarRamosCotizacionExistente() {
    if (this.kcotizacion.verificarKeyCotizacion()) {
      this.cotizacion = this.kcotizacion.obtenerKeyCotizacion();
      if (this.kcontenido.verificarKeyContenido()) {
        this.contenido = this.kcontenido.obtenerKeyContenido();
      } else {
        this.kcontenido.regresarObtenerContenido();
      }
    } else {
      this.kcotizacion.regresarObtenerCotizacion();
    }
    this.listarInformacionTransportes();
  }

  public verificarEstadoPago() {
    this.estadoKey = this.kfinalizacion.verificarKeyFinalizacion();
  }

  public enviarOpcionesPago() {
    this.verificarEstadoPago();
    if (this.estadoKey == false) {
      this.kfinalizacion.registrarKeyFinalizacion({ IdContenido: this.datosCotizacion.Contenido.IdContenido });
    }
    this.router.navigate(['/cliente/cotizacion/cotizacion']);
  }

  public enviarEmailReporteCliente() {
    var destinatario = this.datosCotizacion.Empresa.Email;
    var asunto = this.datosCotizacion.Broker.RazonSocial + " | " + "COTIZACIÓN N° " + this.datosCotizacion.Codigo;
    var url = this.variables.ObtenerCredenciales("").conexionWeb + "/cotizacion?IdBroker=" + this.usuario.broker.IdBroker + "&IdContenido=" + this.contenido.IdContenido + "&IdCotizacion=" + this.contenido.IdCotizacion + "&IdDireccion=" + this.contenido.IdDireccion + "&IdVehiculos=" + this.contenido.IdVehiculos + "&IdEmpresa=" + this.cotizacion.idEmpresa + "&Foto=" + "Foto" + "&Color=" + this.usuario.broker.Color + "&Tipo=" + 1;
    var cuerpo = this.email.generarEmailReporte(this.datosCotizacion.Empresa.RazonSocial, this.datosCotizacion.Codigo, this.datosCotizacion.PrimaTotal, url, this.usuario.broker.Color, this.usuario.broker.RazonSocial);
    this.enviarCorreoElectronico(destinatario, asunto, cuerpo);
  }

  public enviarEmailReporteUsuario() {
    var destinatario = this.usuario.Email;
    var asunto = this.datosCotizacion.Broker.RazonSocial + " | " + "COTIZACIÓN N° " + this.datosCotizacion.Codigo;
    var url = this.variables.ObtenerCredenciales("").conexionWeb + "/cotizacion?IdBroker=" + this.usuario.broker.IdBroker + "&IdContenido=" + this.contenido.IdContenido + "&IdCotizacion=" + this.contenido.IdCotizacion + "&IdDireccion=" + this.contenido.IdDireccion + "&IdVehiculos=" + this.contenido.IdVehiculos + "&IdEmpresa=" + this.cotizacion.idEmpresa + "&Foto=" + "Foto" + "&Color=" + this.usuario.broker.Color + "&Tipo=" + 2;
    var cuerpo = this.email.generarEmailReporte(this.datosCotizacion.Empresa.RazonSocial, this.datosCotizacion.Codigo, this.datosCotizacion.PrimaTotal, url, this.usuario.broker.Color, this.usuario.broker.RazonSocial);
    this.enviarCorreoElectronico(destinatario, asunto, cuerpo);
  }

  public enviarCorreoElectronico(para, asunto, mensaje) {
    this.spinner.show();
    var datos = {
      "Para": para,
      "Asunto": asunto,
      "Mensaje": mensaje
    };
    this.conexion.post("Broker/SBroker.svc/email/enviar", datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.mostrarAlertaCorrecta("Cotización enviada correctamente al correo electrónico.", this.usuario.broker.Color);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarSiniestros(codigo, agente) {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/complementos/consultar?identificador=SINIESTROS&broker=' + this.usuario.broker.IdBroker + '', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        this.lstSiniestros = [];
        for (let sinietros of res) {
          for (let ramos of this.igualarRamos(this.ramos)) {
            if (sinietros.Codigo == ramos) {
              this.lstSiniestros.push(sinietros);
            }
          }
        }

        this.listarNombreCorredor(codigo, agente);

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public igualarRamos(lista: any) {
    var resultado = [];
    for (let ramos of lista) {
      if (ramos == "incendio") {
        resultado.push("RIL1");
      } if (ramos == "coberturasAdicionales") {
        resultado.push("RCA14");
      } if (ramos == "equipoElectronico") {
        resultado.push("REE2");
      } if (ramos == "roturaMaquinaria") {
        resultado.push("RRM3");
      } if (ramos == "lucroRoturaMaquinaria") {
        resultado.push("RLRM4");
      } if (ramos == "lucroIncendio") {
        resultado.push("RLIL5");
      } if (ramos == "roboAsalto") {
        resultado.push("RRA6");
      } if (ramos == "dineroValores") {
        resultado.push("RDV7");
      } if (ramos == "equipoMaquinaria") {
        resultado.push("REM8");
      } if (ramos == "responsabilidadCivil") {
        resultado.push("RRC9");
      } if (ramos == "fidelidad") {
        resultado.push("RFI10");
      } if (ramos == "accidentesPersonales") {
        resultado.push("RAP12");
      } if (ramos == "transportes") {
        resultado.push("RTR11IN");
      } if (ramos == "transporteImportaciones") {
        resultado.push("RTR11IM");
      } if (ramos == "vehiculos") {
        resultado.push("RVE13");
      }
    }

    return resultado;
  }

  public listarInformacionTransportes() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarSubramosTrasporte/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
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
    this.conexion.get("Broker/SBroker.svc/cotizacion/completa/resgistros?idContenido=" + this.contenido.IdContenido + "&idCotizacion=" + this.contenido.IdCotizacion + "&idDireccion=" + this.contenido.IdDireccion + "&idVehiculos=" + this.contenido.IdVehiculos + "&idEmpresa=" + this.cotizacion.idEmpresa + "", this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.verLogo = res.Broker.IdBroker;
        this.estadoPago = res.Estado;

        this.ramos = JSON.parse(res.Contenido.Lista);

        if (res.Contenido.DatosCondiciones == "") {
          this.estadoReporte = false;
          this.estadoAdvertencia = true;
        } else {
          this.datosCondiciones = JSON.parse(res.Contenido.DatosCondiciones);
        }

        if (res.Contenido.DatosGarantias == "") {
          this.estadoReporte = false;
          this.estadoAdvertencia = true;
        } else {
          this.datosGarantias = JSON.parse(res.Contenido.DatosGarantias);
        }

        this.datosCotizacion = res;

        this.datosDireccion = JSON.parse(res.Direccion.DatosDireccion);
        this.datosCotizador = JSON.parse(res.Contenido.DatosCotizador);

        this.decuciblesAccidentesPersonales = this.datosCotizador.listaAccidentesPersonales;
        this.separacionAccidentesPersonales(this.datosCotizador.listaAccidentesPersonales);
        this.listaDetallesVehiculos = JSON.parse(res.Vehiculo.DatosVehiculo);

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
            ramo: this.datosCotizador.listaCoberturasAdicionalesMR,
            visualizacion: this.primalNetaMultiriesgo(),
            nombre: this.datosCotizador.listaCoberturasAdicionalesMR.length > 0 ? this.datosCotizador.listaCoberturasAdicionalesMR[0].Datos.Ramo.Nombre : '',
            rango: this.datosCotizador.listaCoberturasAdicionalesMR.length > 0 ? this.datosCotizador.listaCoberturasAdicionalesMR[0].Datos.Ramo.Rango : '',
            identificador: "RCA14",
            deducibles: this.obtenerUnionDeducibles(this.datosCotizador.listaCoberturasAdicionalesMR)
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
            ramo: this.datosCotizador.listaAccidentesPersonales,
            visualizacion: this.calcularPrimaTotal(this.datosCotizador.listaAccidentesPersonales),
            nombre: "Accidentes Personales",
            rango: "",
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

        var corredor = JSON.parse(this.datosCotizacion.Corredor);
        this.obtenerDatosVehiculos();
        this.listarSiniestros(corredor.TipoAgente, corredor.Agente);
        console.log(this.datosCotizacion);

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarNombreCorredor(codigo, agente_) {
    this.conexion.get('Broker/SBroker.svc/consultar/codigo/agente/' + codigo, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        var xml = $.parseXML(res);
        var data = [];

        $(xml).find("Table").each(function (i, e) {
          data.push({ codigoAgente: $(this).find('cod_agente').text(), nombreAgente: $(this).find('fullname').text() });
        });

        for (let agente of data) {
          if (agente.codigoAgente == agente_) {
            this.nombreCorredor = this.obtenerNumerosCadena(agente.nombreAgente);
          }
        }
        this.codigoCorredor = agente_;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public obtenerNumerosCadena(cadena) {
    var cadena = cadena;
    var letras = cadena.replace(/\d/g, '');
    var letras2 = letras.replace('-','');
    return letras2.trim();
  }

  public validarSumaTotalUbicacion(listaRamo, ubicacion) {
    var totalUbicacion = 0;
    for (let subramos of listaRamo) {
      if (ubicacion == 1) {
        totalUbicacion += subramos.Valores.ValorU1.Valor;
      } else if (ubicacion == 2) {
        totalUbicacion += subramos.Valores.ValorU2.Valor;
      } else if (ubicacion == 3) {
        totalUbicacion += subramos.Valores.ValorU3.Valor;
      } else if (ubicacion == 4) {
        totalUbicacion += subramos.Valores.ValorU4.Valor;
      } else if (ubicacion == 5) {
        totalUbicacion += subramos.Valores.ValorU5.Valor;
      }
    }
    return totalUbicacion;
  }
  public obtenerDatosVehiculos() {
    var detallesLivianosPT = [];
    var detallesLivianosUNO = [];
    var detallesLivianosDOS = [];
    var detallesLivianosUNODed = [];
    var detallesLivianosDOSDed = [];
    var detallesMotos = [];
    var detallesSemipesados = [];

    var primaNeta = 0;
    var primaTotal = 0;

    if (this.listaDetallesVehiculos.length > 0) {
      for (let i = 0; i < 1; i++) {

        primaNeta += this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta;
        primaTotal += this.listaDetallesVehiculos[i].detallesCotizacion.prima_total;

        if (this.listaDetallesVehiculos[i].cobertura.codTipo == 1) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesMotos.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 2) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesSemipesados.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 3) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesLivianosPT.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 4) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesLivianosUNO.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 5) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesLivianosDOS.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 6) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesLivianosUNODed.push(datos);
        } if (this.listaDetallesVehiculos[i].cobertura.codTipo == 7) {
          var datos = {
            id: this.listaDetallesVehiculos[i].cobertura.codTipo,
            tipo: this.listaDetallesVehiculos[i].cobertura.tipo,
            valor: this.listaDetallesVehiculos[i].valorCasco,
            tasa: this.listaDetallesVehiculos[i].tasa,
            primaNeta: this.listaDetallesVehiculos[i].detallesCotizacion.prima_neta
          }
          detallesLivianosDOSDed.push(datos);
        }
      }
      this.detallesVehiculos = [];
      this.detallesVehiculos.push(
        this.sumarVector(detallesLivianosPT),
        this.sumarVector(detallesLivianosUNO),
        this.sumarVector(detallesLivianosDOS),
        this.sumarVector(detallesLivianosUNODed),
        this.sumarVector(detallesLivianosDOSDed),
        this.sumarVector(detallesMotos),
        this.sumarVector(detallesSemipesados)
      );

      this.primaNetaVehiculos = primaNeta;
      this.primaTotalVehiculos = primaTotal;
    }

  }

  public sumarVector(lista) {
    var contador = 0;
    var primaNeta = 0;
    var valor = 0;
    var tasa = 0;
    var tipo = "";
    for (let datos of lista) {
      contador++;
      primaNeta += datos.primaNeta;
      valor += datos.valor;
      tasa = datos.tasa;
      tipo = datos.tipo;
    }

    return { tipo: tipo, valor: valor, numero: contador, tasa: tasa, prima: primaNeta }
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

  public obtenerUnionDeduciblesPrueba(listRamo) {
    var deducibles = [];
    var deduciblesTemporal = [];

    for (let i = 0; i < listRamo.length; i++) {
      if (this.sumarValores(listRamo[i].Valores.ValorU1.Valor, listRamo[i].Valores.ValorU2.Valor, listRamo[i].Valores.ValorU3.Valor, listRamo[i].Valores.ValorU4.Valor, listRamo[i].Valores.ValorU5.Valor, '') != 0 && (listRamo[i].Datos.RiesgoMayor != '' || listRamo[i].Datos.RiesgoMenor != '')) {
        deduciblesTemporal.push({ Nombre: listRamo[i].Datos.Nombre, Deducible: this.datosCotizacion.Empresa.Riesgo == 1 ? listRamo[i].Datos.RiesgoMenor : listRamo[i].Datos.RiesgoMayor, Union: listRamo[i].Datos.Union, Agrupacion: listRamo[i].Datos.Seleccion });
      }
    }

    var agrupacion = Object["values"](this.agrupacion(deduciblesTemporal, "Agrupacion"));

    for (let i = 0; i < agrupacion.length; i++) {
      /* for (let j = 0; j < agrupacion[i].length; j++) {
         const element = array[j];

       }*/
      console.log(agrupacion[i])
    }

    for (let i = 0; i < deduciblesTemporal.length; i++) {
      var numeros = deduciblesTemporal[i].Union;
      var separacion = numeros.split(",");

      if (i == 0 && separacion[0] == 0) {
        deducibles.push({ Nombre: deduciblesTemporal[i].Nombre, Deducible: deduciblesTemporal[i].Deducible, Union: "1," + "1," + this.obtenerContadorDeducibles(listRamo) });
      } else {
        deducibles.push({ Nombre: deduciblesTemporal[i].Nombre, Deducible: deduciblesTemporal[i].Deducible, Union: deduciblesTemporal[i].Union });
      }
    }
    return deducibles;
  }

  public obtenerContadorDeducibles(listRamo) {
    var contador = 0;
    for (let subramos of listRamo) {
      if (this.sumarValores(subramos.Valores.ValorU1.Valor, subramos.Valores.ValorU2.Valor, subramos.Valores.ValorU3.Valor, subramos.Valores.ValorU4.Valor, subramos.Valores.ValorU5.Valor, '') != 0 && (subramos.Datos.RiesgoMayor != '' || subramos.Datos.RiesgoMenor != '')) {
        var numeros = subramos.Datos.Union;
        var separacion = numeros.split(",");
        if (separacion[0] == 0) {
          contador += 1;
        }
      }
    }
    return contador;
  }

  public separacionAccidentesPersonales(lista) {
    for (var subramos of lista) {
      if (subramos.Datos.Grupo == 'Personal  Directivo') {
        this.listaAccidentesPersonalesDirectivo.push(subramos);
      }
      if (subramos.Datos.Grupo == 'Personal  Administrativo') {
        this.listaAccidentesPersonalesAdministrativo.push(subramos);
      }
      if (subramos.Datos.Grupo == 'Personal Operativo') {
        this.listaAccidentesPersonalesOperativo.push(subramos);
      } if (subramos.Datos.Grupo == 'Personal Globlal') {
        this.listaAccidentesPersonalesGlobal.push(subramos);
      }
    }
  }

  public obtenerPersonasGruposAP(subramo, lista) {
    var personas = 0;
    for (let cobertura of lista) {
      if (cobertura.Datos.Codigo == subramo) {
        personas = cobertura.Valores.NPersonas;
      }
    }
    return personas;
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
    //var equipoMaquinaria: any = this.general.calcularPrimaTotal(this.datosCotizador.listaEquipoMaquinaria);
    var total = 0;
    total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto) + parseFloat(dineroValores);
    //total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto);
    return (primaMinima > total && total > 0) ? Math.round(primaMinima * 100) / 100 : Math.round(total * 100) / 100;
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

  public validarCoberturasAdicionales(lista) {
    var total = 0;
    try {
      for (let cobertura of lista) {
        total += cobertura.Valores.ValorU1.Valor;
      }
    } catch (e) {

    }
    return total;
  }

  public gestionEstilos() {
    this.referenciaNombre();
    this.referenciaValorU1();
    this.referenciaTasa();
    this.referenciaPrima();
  }

  public referenciaNombre() {
    var ancho = $("#referenciaNombre").css("width");
    return ancho;
  }

  public referenciaValorU1() {
    var ancho = $("#referenciaValorU1").css("width");
    return ancho;
  }

  public referenciaTasa() {
    var ancho = $("#referenciaTasa").css("width");
    return ancho;
  }

  public referenciaPrima() {
    var ancho = $("#referenciaPrima").css("width");
    return ancho;
  }


  public formatearValores(numero) {
    var resultado = "";
    if (numero != 0) {
      return this.globales.formatearNumero(numero, 2);
    } else {
      return resultado;
    }
  }

  public sumarValores(uno, dos, tres, cuatro, cinco, omitir) {
    var total: number = 0;
    if (omitir == "SVE1") {
      total = 1;
    } else {
      total = parseFloat(uno) + parseFloat(dos) + parseFloat(tres) + parseFloat(cuatro) + parseFloat(cinco);
    }
    return total;
  }

  public mostrarAlertaCorrecta(descripcion: any, color: any) {
    Swal.fire({
      type: 'success',
      text: descripcion,
      confirmButtonText: "Continuar",
      confirmButtonColor: "rgb(" + color + ")"
    });
  }

  public imprimirCotizacion() {
    $("#reporte").printThis({
      importCSS: true,
      importStyle: true,
      loadCSS: "https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/Estilos%2Fcotizacion-reporte.component.css?alt=media&token=72e4341b-fc6a-4b9d-9d42-a1f03203e609",
    });
  }

  public generarPDF() {

    /*var doc = new jsPDF();
    var elem = document.getElementById("tablaReporte");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.save("table.pdf");*/

    /*
        var jspdfv = new jsPDF();
        jspdfv.text(20, 20, 'Hello world!');

        jspdfv.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');

        var out1 = jspdfv.output();

        var url1 = 'data:application/pdf;base64,' + btoa(out1);

        document.location.href = url1;*/

  }

  public ingresoBotonFlotante() {
    $('.btns').addClass('animacionVer');
  }

  public salidaBotonFlotante() {
    $('.btns').removeClass('animacionVer');
  }

  public agrupacion(xs, key) {
    return xs.reduce(function (valorAnterior, valorActual, indice, vector) {
      (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
      return valorAnterior;
    }, {});
  }
}
