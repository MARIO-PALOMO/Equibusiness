import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { Router } from '@angular/router';
import { ValidacionCotizadorPipe } from '../../pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';
import { GeneradorService } from '../../metodos/generador/generador.service';
import { GenericoService } from '../../controladores/generico/generico.service';


declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [GlobalesPipe, ValidacionCotizadorPipe]
})
export class InicioClienteComponent implements OnInit {

  public usuario: any = [];
  //public lstSectorEconomico = ["A - AGRICULTURA, GANADERÍA,  SILVICULTURA Y PESCA.", "B - EXPLOTACIÓN DE MINAS Y CANTERAS.", "C - INDUSTRIAS MANUFACTURERAS.", "D - SUMINISTRO DE ELECTRICIDAD, GAS, VAPOR Y AIRE ACONDICIONADO.", "E - DISTRIBUCIÓN DE AGUA; ALCANTARILLADO, GESTIÓN DE DESECHOS Y ACTIVIDADES DE SANEAMIENTO.", "F - CONSTRUCCIÓN.", "G - COMERCIO AL POR MAYOR Y AL POR MENOR; REPARACIÓN DE VEHÍCULOS AUTOMOTORES Y MOTOCICLETAS.", "H - TRANSPORTE Y ALMACENAMIENTO.", "I - ACTIVIDADES DE ALOJAMIENTO Y DE SERVICIO DE COMIDAS.", "J - INFORMACIÓN Y COMUNICACIÓN.", "K - ACTIVIDADES FINANCIERAS Y DE SEGUROS.", "L - ACTIVIDADES INMOBILIARIAS.", "M - ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS.", "N - ACTIVIDADES DE SERVICIOS ADMINISTRATIVOS Y DE APOYO.", "O - ADMINISTRACIÓN PÚBLICA Y DEFENSA; PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLIGATORIA.", "P - ENSEÑANZA.", "Q - ACTIVIDADES DE ATENCIÓN DE LA SALUD HUMANA Y DE ASISTENCIA SOCIAL.", "R - ARTES, ENTRETENIMIENTO Y RECREACIÓN.", "S - OTRAS ACTIVIDADES DE SERVICIOS.", "T - ACTIVIDADES DE LOS HOGARES COMO EMPLEADORES; ACTIVIDADES NO DIFERENCIADAS DE LOS HOGARES COMO PRODUCTORES DE BIENES Y SERVICIOS PARA USO PROPIO.", "U - ACTIVIDADES DE ORGANIZACIONES Y ÓRGANOS EXTRATERRITORIALES.", "R - BAJO RELACION DE DEPENDENCIA SECTOR PRIVADO", "S - BAJO RELACION DE DEPENDENCIA SECTOR PUBLICO", "V - SIN ACTIVIDAD ECONOMICA - CIIU"];
  public lstSectorEconomico = ["INDUSTRIAS MANUFACTURERAS", "COMERCIO", "SERVICIOS"];
  public lstCotizaciones = [];
  public lstCotizacionesEmitidas = [];
  public listaRiesgo = [{ "Nombre": "Riesgos Menores (Entre US$ 0 y US$ 500.000 en Incendio)", "Valor": 1 }, { "Nombre": "Riesgos Mayores (Entre US$ 500.001 hasta US$ 5.000.000 en Incendio)", "Valor": 2 }];
  public panelEmpresa = {
    inicio: true,
    formulario: false
  };

  public fmrEmpresa = {
    "Identificador": 1,
    "IdEmpresa": 0,
    "IdCatalogoEmpresa": 0,
    "Ruc": "",
    "Telefono": "",
    "Email": "",
    "Codigo": 0,
    "Riesgo": 1,
    "RazonSocial": "",
    "Nombre": "",
    "PrimerApellido": "",
    "SegundoApellido": "",
    "GiroNegocio": "",
    "SectorEconomico": "",
    "Siniestralidad": "",
    "CodigoAsegurado": "-1",
    "Direccion": ""
  };

  public state: State = {
    skip: 0,
    take: 10,
  };

  public gridData: GridDataResult = process(this.lstCotizaciones, this.state);

  public vencimiento = 0;
  public datosAsegurado = {
    "cli_cod_tipo_doc": 0,
    "cli_nro_doc": null,
    "cli_nombre": null,
    "cli_apellido1": null,
    "cli_apellido2": null,
    "cli_dir_cod_prov": 17,
    "cli_dir_cod_ciudad": 15,
    "cli_dir_detalle": null,
    "cli_dir_calle_principal": null,
    "cli_dir_calle_numero": null,
    "cli_dir_calle_secundaria": null,
    "cli_dir_referencia": null,
    "cli_dir_latitud": "0",
    "cli_dir_longitud": "0",
    "cli_fec_nacimiento": null,
    "cli_genero": null,
    "cli_cod_est_civil": 1,
    "cli_email": null,
    "cli_emailFactElectronica": null,
    "cli_telef_domicilio": null,
    "cli_telef_celular": null,
    "cli_estado": 0,
    "cli_cod_aseg": -1,
    "cli_dir_ciudad": null,
    "cli_cod_pais_origen": 1,
    "cli_fec_expedicion_pas": null,
    "cli_fec_vencimiento_pas": null,
    "cli_fec_ingreso_pas": null,
    "cli_cod_est_migratorio": null,
    "cli_nro_hijos_adultos": null,
    "cli_accountid": null,
    "cli_contactid": null,
    "cli_cod_agente": 0,
    "cli_cod_tipo_agente": 0,
    "cli_ingresos_mensuales": 0,
    "cli_egresos_mensuales": 0,
    "cli_activos": 0,
    "cli_pasivos": 0,
    "cli_esPEP": null,
    "cli_cod_tipo_empleo": 2,
    "cli_cod_rango_ingreso_cia": 3,
    "cli_cod_ocupacion": 32,
    "cli_cod_actividad_economica": null,
    "cli_tipo_empleo": null,
    "cli_rango_ingreso_cia": null,
    "cli_ocupacion": null,
    "cli_actividad_economica": null,
    "cli_lugar_nacimiento": null,
    "cli_est_civil": null,
    "consultar_en_web": null,
    "consultado_en_gr": null,
    "nombre_completo_gr": null,
    "nro_palabras": 0
  };

  public activacionCampos = 0;
  public datosBin: any;
  public codigoAsegurado = -1;


  public Sucursal: any;
  public Comision: any;
  public TipoAgente: any;
  public Agente: any;

  public lstSucursal = [];
  public detalleCotizacion = { "Antiguedad": "", "Broker": { "CodigoAgente": null, "CodigoTipoAgente": null, "Color": null, "Comision": null, "Estado": 0, "Foto": null, "IdBroker": 0, "MultiRiesgo": 0, "Pago": 0, "Primas": 0, "Provincias": 0, "RazonSocial": null, "Riesgo": 0, "Transporte": null }, "Codigo": "", "Contenido": { "Cotizacion": null, "DatosCondiciones": null, "DatosCotizador": null, "DatosGarantias": null, "EstadoCondiciones": "0", "EstadoGarantias": "0", "IdContenido": 0, "Identificador": 0, "Lista": null, "VistaDiseno": null, "VistaEstado": null, "VistaValores": "" }, "Contratante": { "Cedula": "", "Cotizacion": null, "Direccion": null, "Email": null, "Estado": 0, "IdContratante": 0, "Identificador": 0, "Nombre": "", "PrimerApellido": "", "SegundoApellido": "", "Telefono": null }, "Corredor": "", "CotizacionResultado": { "Cotizacion": null, "EstadoAccidentesPersonales": 0, "EstadoEquipoMaquinaria": 0, "EstadoFidelidad": 0, "EstadoGlobal": 0, "EstadoMultiriesgo": 0, "EstadoPagoGlobal": 0, "EstadoResponsabilidadCivil": 0, "EstadoTransImportaciones": 0, "EstadoTransInterno": 0, "EstadoVehiculos": 0, "FechaEmision": null, "IdCotizacionResultado": 0, "IdPvAccidentesPersonales": "", "IdPvEquipoMaquinaria": "", "IdPvFidelidad": "", "IdPvMultiriesgo": "", "IdPvResponsabilidadCivil": "", "IdPvTransImportaciones": "", "IdPvTransInterno": "", "IdPvVehiculos": "", "Identificador": 0 }, "DerechosEmision": 0, "Direccion": { "Cotizacion": null, "DatosDireccion": null, "IdDireccion": 0, "Identificador": 0 }, "Empresa": { "Codigo": 0, "CodigoAsegurado": null, "Direccion": null, "Email": null, "GiroNegocio": null, "IdCatalogoEmpresa": 0, "IdEmpresa": 56, "Identificador": 0, "Nombre": null, "PrimerApellido": null, "RazonSocial": "", "Riesgo": 0, "Ruc": "", "SectorEconomico": null, "SegundoApellido": null, "Siniestralidad": null, "Telefono": "" }, "Estado": 0, "Fecha": "", "FormaPago": { "Adjunto": null, "AdjuntoTipo": null, "CodigoAutenticacion": "", "Cotizacion": null, "Diferidos": "", "Estado": 0, "Fecha": "", "IdFormaPago": 0, "IdPago": 0, "Identificador": 0, "Intereses": "", "Lote": "", "Plataforma": "", "Referencia": "", "Tipo": "", "Trama": "", "Voucher": "" }, "IdCotizacion": 0, "IdPago": 0, "IdUsuario": 0, "Identificador": 0, "ImpuestoCampesino": 0, "ImpuestoSBS": 0, "Iva": 0, "Pagador": { "Cedula": "", "Cotizacion": null, "Direccion": null, "Email": null, "Estado": 0, "IdPagador": 0, "Identificador": 0, "Nombre": "", "PrimerApellido": "", "SegundoApellido": "", "Telefono": null }, "PrimaNetaIva0": 0, "PrimaNetaIva12": 0, "PrimaNetaTotal": 0, "PrimaTotal": 0, "Usuario": null, "Vehiculo": { "Cotizacion": null, "DatosVehiculo": null, "IdVehiculos": 0, "Identificador": 0 } };
  public lstTipoAgente: Array<{ text: string, value: number }> = [
    { text: "PRODUCTOR", value: 2 },
    { text: "UNIDAD DE PRODUCCIÓN", value: 3 }
  ];
  public lstComision: Array<{ text: string, value: number }> = [
    { text: "0%", value: 0 },
    { text: "20%", value: 20 },
    { text: "25%", value: 25 }
  ];

  public lstAgente = [];
  public dataAgente: any;

  public lstCotizacionesFiltro = [];
  public vistaFiltroInicio = true;
  public lstFormaPago = ["TARJETA DE CRÉDITO", "TARJETA DE DÉBITO", "CONTADO", "DÉBITO BANCARIO"];
  public fmrFlitro = {
    ruc: "",
    razonSocial: "",
    fecha: "",
    formaPago: ""
  }

  //PAGINACION 1
  public pagina = 1;
  public paginasTotales = 0;
  public cotizacionesExistentes = 0;
  public numeroResultados = 5;

  //PAGINACION 2
  public paginaE = 1;
  public paginasTotalesE = 0;
  public cotizacionesExistentesE = 0;
  public numeroResultadosE = 5;

  globales: GlobalesPipe = new GlobalesPipe();
  constructor(private conexion: ApiService, private sesion: SesionService, private kcotizacion: VerificacionService, private generico: GenericoService,
    public metodos: GlobalesPipe, private valCotizador: ValidacionCotizadorPipe, private router: Router, private generador: GeneradorService,
    private spinner: NgxSpinnerService, private kramos: RamosService, private kcontenido: CotizacionService, private kfinalizacion: FinalizacionService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.gestionColoresBroker();
    this.buscarCotizacionesUsuario(this.pagina);
    this.eliminarCache();
    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstCotizaciones, this.state);
  }

  public eliminarCache() {
    this.kcotizacion.eliminarKeyCotizacion();
    this.kramos.eliminarKeyRamos();
    this.kcontenido.eliminarKeyContenido();
    this.kfinalizacion.eliminarKeyFinalizacion();
  }

  public consultarVencimientoCotizacion() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/broker/reglas/generales/consultar?broker=' + this.usuario.broker.IdBroker + '&nombre=VENCIMIENTO-COTIZACION', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.vencimiento = res.Igual;
        this.listarSucursales();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public verificarVencimientoCotizacion(dato: any) {
    var datos = { color: '#000000', texto: 'Vigente' };
    var str = dato;
    var txt = str.replace(/[aA-zZ-í]/g, "");
    var numero = parseInt(txt);
    var maximo = this.vencimiento;
    var medio = this.vencimiento / 2;
    if (numero > maximo) {
      datos.color = '#CB4335';
      datos.texto = 'Cotización Vencida';
    } else if (numero > medio && numero < maximo) {
      datos.color = '#D4AC0D';
      datos.texto = 'Cotización por Vencerse';
    } else if (numero < medio) {
      datos.color = '#17AE22';
      datos.texto = 'Cotización Vigente';
    }
    return datos;
  }

  public buscarCotizacionesUsuario(pagina) {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/cotizacion/consultar/usuario?broker=' + this.usuario.broker.IdBroker + '&usuario=' + this.usuario.IdUsuario + '&num=' + pagina + '&tamano=' + this.numeroResultados + '&estado=0', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        this.lstCotizaciones = res;
        this.cotizacionesExistentes = parseInt(this.lstCotizaciones[0] == undefined ? 0 : this.lstCotizaciones[0].TotalRegistros);
        this.paginasTotales = Math.ceil(this.cotizacionesExistentes / this.numeroResultados);

        this.buscarEmisionesUsuario();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public buscarEmisionesUsuario() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/cotizacion/consultar/usuario?broker=' + this.usuario.broker.IdBroker + '&usuario=' + this.usuario.IdUsuario + '&num=' + this.paginaE + '&tamano=' + this.numeroResultados + '&estado=1', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCotizacionesEmitidas = res;
        this.cotizacionesExistentesE = parseInt(this.lstCotizacionesEmitidas[0] == undefined ? 0 : this.lstCotizacionesEmitidas[0].TotalRegistros);
        this.paginasTotalesE = Math.ceil(this.cotizacionesExistentesE / this.numeroResultadosE);

        this.consultarVencimientoCotizacion();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public buscarCotizacionesUsuarioSiguiente(pagina) {
    this.pagina = pagina;
    this.buscarCotizacionesUsuario(pagina);
  }

  public buscarEmisionesUsuarioSiguiente(paginaE) {
    this.paginaE = paginaE;
    this.buscarEmisionesUsuario();
  }

  public buscarFiltrosUsuario() {

    var cadena = "";
    var fmrFlitro = this.fmrFlitro;
    var globales = this.globales;
    var estado = false;
    $("input:checkbox[name=parametro]:checked").each(function () {
      var parametro = $(this).val();
      if (parametro == 1) {
        if (fmrFlitro.ruc != "") {
          cadena += " AND Ruc LIKE '%" + fmrFlitro.ruc + "%'";
          estado = true;
        } else {
          globales.mostarAlerta("", "Ingresar R.U.C / C.I", "info");
          estado = false;
        }
      } if (parametro == 2) {
        if (fmrFlitro.razonSocial != "") {
          cadena += " AND RazonSocial LIKE '%" + fmrFlitro.razonSocial + "%'";
          estado = true;
        } else {
          globales.mostarAlerta("", "Ingresar Razón Social", "info");
          estado = false;
        }
      } if (parametro == 3) {
        if (fmrFlitro.fecha != "") {
          cadena += " AND Fecha = '" + fmrFlitro.fecha + "'";
          estado = true;
        } else {
          globales.mostarAlerta("", "Ingresar Fecha Cotización", "info");
          estado = false;
        }
      } if (parametro == 4) {
        if (fmrFlitro.formaPago != "") {
          cadena += " AND FormaPago = '" + fmrFlitro.formaPago + "'";
          estado = true;
        } else {
          globales.mostarAlerta("", "Seleccionar Forma de Pago", "info");
          estado = false;
        }
      }
    });

    if (estado) {
      var parametros = {
        IdBroker: this.usuario.broker.IdBroker,
        IdUsuario: this.usuario.IdUsuario,
        Cadena: cadena,
      };
      this.spinner.show();
      this.conexion.post('Broker/SBroker.svc/cotizacion/consultar/usuario/filtro', parametros, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.lstCotizacionesFiltro = res;
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public listarPolizas(CotizacionResultado) {
    var polizasCabezera = "";
    var polizasCuerpo = "";
    var polizasFin = "";
    var emision = "";

    var ap = CotizacionResultado.IdPvAccidentesPersonales == "" ? "" : JSON.parse(CotizacionResultado.IdPvAccidentesPersonales);
    var em = CotizacionResultado.IdPvEquipoMaquinaria == "" ? "" : JSON.parse(CotizacionResultado.IdPvEquipoMaquinaria);
    var fi = CotizacionResultado.IdPvFidelidad == "" ? "" : JSON.parse(CotizacionResultado.IdPvFidelidad);
    var multi = CotizacionResultado.IdPvMultiriesgo == "" ? "" : JSON.parse(CotizacionResultado.IdPvMultiriesgo);
    var rc = CotizacionResultado.IdPvResponsabilidadCivil == "" ? "" : JSON.parse(CotizacionResultado.IdPvResponsabilidadCivil);
    var train = CotizacionResultado.IdPvTransImportaciones == "" ? "" : JSON.parse(CotizacionResultado.IdPvTransImportaciones);
    var traim = CotizacionResultado.IdPvTransInterno == "" ? "" : JSON.parse(CotizacionResultado.IdPvTransInterno);
    var vh = CotizacionResultado.IdPvVehiculos == "" ? "" : JSON.parse(CotizacionResultado.IdPvVehiculos);

    var polizasAux = [ap, em, fi, multi, rc, train, traim, vh];
    polizasCabezera = `<table style="width: 100% !important" border="1">
                          <thead>
                            <tr>
                              <th style="padding: 12px">Certificado</th>
                              <th style="padding: 12px">Código</th>
                              <th style="padding: 12px">Total</th>
                            </tr>
                          </thead>
                          <tbody>`;

    for (let pol of polizasAux) {
      if (pol != "") {
        polizasCuerpo += `
                            <tr>
                              <td style="padding: 12px">`+ pol.polCertificado + `</td>
                              <td style="padding: 12px">`+ pol.polIdPv + `</td>
                              <td style="padding: 12px">$ `+ this.metodos.formatearNumero(pol.polTotal, 2) + `</td>
                            </tr>`;
      }
    }

    polizasFin = emision + `</tbody></table>`;

    var tabla = "";
    if (polizasCuerpo != "") {
      tabla = polizasCabezera + polizasCuerpo + polizasFin;
    } else {
      tabla = "Sin Realizar Emisiones"
    }

    return tabla;
  }

  public continuarCotizacion(cotizacion: any) {
    if (cotizacion.Direccion.IdDireccion == 0 || cotizacion.Vehiculo.IdVehiculos == 0 || cotizacion.Contenido.IdContenido == 0) {
      this.eliminarCache();

      this.kcotizacion.registrarKeyCotizacion({ idCotizacion: cotizacion.IdCotizacion, codigoCotizacion: cotizacion.Codigo, idUsuario: cotizacion.IdUsuario, idEmpresa: cotizacion.Empresa.IdEmpresa });
      this.router.navigate(['/cliente/cotizacion/cotizacion']);
    } else {
      this.eliminarCache();

      this.kcotizacion.registrarKeyCotizacion({ idCotizacion: cotizacion.IdCotizacion, codigoCotizacion: cotizacion.Codigo, idUsuario: cotizacion.IdUsuario, idEmpresa: cotizacion.Empresa.IdEmpresa });
      this.kramos.registrarKeyRamos(cotizacion.Contenido.VistaValores);
      this.kcontenido.registrarKeyContenido({ IdDireccion: cotizacion.Direccion.IdDireccion, IdVehiculos: cotizacion.Vehiculo.IdVehiculos, IdContenido: cotizacion.Contenido.IdContenido, IdCotizacion: cotizacion.IdCotizacion });
      this.router.navigate(['/cliente/cotizacion/cotizacion']);
    }
    if (parseInt(cotizacion.Contenido.EstadoCondiciones) == 1) {
      this.kfinalizacion.registrarKeyFinalizacion({ IdContenido: cotizacion.Contenido.IdContenido });
    }
  }

  public convertirNumeroEstado(numero: any, pago) {
    var datos = [];
    datos = [];
    if (numero == 0 && pago == 0) {
      datos.push("ELIMINADA");
      datos.push("mdi-minus-circle");
      datos.push("rgba(227, 0, 0, 0.5)");
    } else if (numero == 1 && pago == 0) {
      datos.push("GENERADA SIN DATOS");
      datos.push("mdi-pencil");
      datos.push("rgba(218, 191, 0, 0.5)");
      datos.push("Editada");
    } else if (numero == 2 && pago == 0) {
      datos.push("GENERADA CON DATOS");
      datos.push("mdi-pencil");
      datos.push("rgba(6, 96, 200, 0.5)");
      datos.push("Editada");
    } else if (numero == 3 && pago == 0) {
      datos.push("GENERADA Y ENVIADA");
      datos.push("mdi-email");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Generada");
    } else if (numero == 4 && pago == 0) {
      datos.push("GENERADA Y PAGADA");
      datos.push("mdi-credit-card");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Pagada");
    } else if (numero == 5 && pago == 0) {
      datos.push("GENERADA Y EMITIDA");
      datos.push("mdi-file-multiple");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Emitida");
    } else if (numero == 5 && pago == 1) {
      datos.push("GENERADA Y APLICADA");
      datos.push("mdi-file-multiple");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Emitida y Pago Aplicado");
    }

    return datos;
  }

  public generarCodigoCotizacion(numero: any, empresa: any, Corredor) {
    var inicio = "COTP"
    var fecha = this.globales.generarNumeroAleatorios() + "-";
    var numeroCotizacion = "0";
    switch (numero.length) {
      case 1:
        numeroCotizacion = "000" + numero;
        break;
      case 2:
        numeroCotizacion = "00" + numero;
        break;
      case 3:
        numeroCotizacion = "0" + numero;
        break;
      default:
        numeroCotizacion = numero;
    }
    this.generarCotizacion(inicio + fecha + this.usuario.broker.IdBroker + "-" + numeroCotizacion, empresa, Corredor);
  }

  public generarCotizacion(cotizacion: any, empresa: any, Corredor) {
    var datos = {
      "Identificador": 1,
      "IdCotizacion": "0",
      "primaNetaIva12": "0",
      "PrimaNetaIva0": "0",
      "PrimaNetaTotal": "0",
      "ImpuestoSBS": "0",
      "ImpuestoCampesino": "0",
      "DerechosEmision": "0",
      "PrimaTotal": "0",
      "Broker": { "IdBroker": this.usuario.broker.IdBroker },
      "Codigo": cotizacion,
      "Estado": "0",
      "IdUsuario": this.usuario.IdUsuario,
      "Empresa": { "IdEmpresa": empresa },
      "Corredor": ""
    };
    console.log(datos);
    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/cotizacion/guardar/registro', datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res);
        if (res.IdCotizacion == 0) {
          this.valCotizador.mostrarAlertaInformativa("La cotización no pudo ser generada, debido a una duplicación de códigos.", this.usuario.broker.Color);
        } else {
          this.actualizarCorredorCotizacion(res.IdCotizacion, cotizacion, empresa, Corredor);
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public actualizarCorredorCotizacion(idCotizacion, cotizacion, empresa, Corredor) {
    var Datos = {
      Identificador: 1,
      IdCotizacion: idCotizacion,
      Corredor: JSON.stringify(Corredor)
    }
    console.log(Corredor)
    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/cotizacion/actualizar/corredor', Datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        this.eliminarCache();
        this.kcotizacion.registrarKeyCotizacion({ idCotizacion: idCotizacion, cotizacion, codigoCotizacion: cotizacion, idUsuario: this.usuario.IdUsuario, idEmpresa: empresa });
        this.router.navigate(['/cliente/cotizacion/cotizacion']);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarEmpresa(Corredor) {

    var parametros = {
      "Identificador": this.fmrEmpresa.Identificador,
      "IdEmpresa": this.fmrEmpresa.IdEmpresa,
      "IdCatalogoEmpresa": this.fmrEmpresa.IdCatalogoEmpresa,
      "Telefono": this.fmrEmpresa.Telefono,
      "Email": this.fmrEmpresa.Email,
      "Codigo": this.fmrEmpresa.Codigo,
      "Riesgo": this.fmrEmpresa.Riesgo,
      "Ruc": this.fmrEmpresa.Ruc,
      "RazonSocial": this.fmrEmpresa.Nombre + " " + this.fmrEmpresa.PrimerApellido + " " + this.fmrEmpresa.SegundoApellido,
      "Nombre": this.fmrEmpresa.Nombre == null || this.fmrEmpresa.Nombre == "null" ? "" : this.fmrEmpresa.Nombre,
      "PrimerApellido": this.fmrEmpresa.PrimerApellido == null || this.fmrEmpresa.PrimerApellido == "null" ? "" : this.fmrEmpresa.PrimerApellido,
      "SegundoApellido": this.fmrEmpresa.SegundoApellido == null || this.fmrEmpresa.SegundoApellido == "null" ? "" : this.fmrEmpresa.SegundoApellido,
      "GiroNegocio": this.fmrEmpresa.GiroNegocio == null ? "" : this.fmrEmpresa.GiroNegocio,
      "SectorEconomico": this.fmrEmpresa.SectorEconomico == null ? "" : this.fmrEmpresa.SectorEconomico,
      "Siniestralidad": this.fmrEmpresa.Siniestralidad == null ? "" : this.fmrEmpresa.Siniestralidad,
      "CodigoAsegurado": this.fmrEmpresa.CodigoAsegurado,
      "Direccion": this.fmrEmpresa.Direccion
    };

    this.spinner.show();
    this.generico.consultarCodigoAsegurado(this.fmrEmpresa.Ruc).then(asegurado => {
      this.spinner.hide();

      this.spinner.show();
      this.generico.consultaDeudasPendientes(asegurado).then(deuda => {
        this.spinner.hide();

        if (deuda == "-1") {
          this.globales.mostrarNotificacion("Cliente con deuda pendiente, contáctese con su ejecutivo de cuenta.", "warning", "bottom");
        }

        parametros.CodigoAsegurado = deuda;

        this.spinner.show();
        this.conexion.post('Broker/SBroker.svc/empresa/guardar/registro', parametros, this.usuario.Uid).subscribe(
          (res: any) => {
            this.spinner.hide();
            if (res.IdEmpresa == 0) {
              this.valCotizador.mostrarAlerta("Ocurrio un error al registrar la empresa.", this.usuario.broker.Color);
            } else {
              this.verificarTotalRegistrosCotizacion(res.IdEmpresa, Corredor);
            }
          },
          err => {
            this.spinner.hide();
            console.log(err);
            this.conexion.error(err);
          }
        );

      }).catch(err => {
        this.spinner.hide();
      });

    }).catch(err => {
      this.spinner.hide();
    });
    //--------------------------


  }

  public verificarTotalRegistrosCotizacion(empresa: any, Corredor) {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/cotizacion/totalRegistros/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.generarCodigoCotizacion((res + 1) + "", empresa, Corredor);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  //GESTION RUC / PERSONA (CONSULTA - GUARDADO)
  public consultarEmpresa() {
    if (this.fmrEmpresa.Ruc.length == 13) {
      this.consultarRUCInterno();
    } else if (this.fmrEmpresa.Ruc.length == 10) {
      this.consultarCEDULAInterno();
    } else {
      this.valCotizador.mostrarAlerta("Ingresar un Número de RUC o Cédula Válido.", this.usuario.broker.Color);
    }
  }

  public consultarRUCInterno() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/catalogo/buscar/registro/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.IdCatalogoEmpresas == 0) {
          this.consultarRUCExterno();
        } else {
          this.fmrEmpresa.IdCatalogoEmpresa = res.IdCatalogoEmpresas;
          this.fmrEmpresa.Telefono = res.TELEFONO;
          this.fmrEmpresa.Email = res.EMAIL;
          this.fmrEmpresa.RazonSocial = res.RAZON_SOCIAL;
          this.fmrEmpresa.GiroNegocio = res.ACTIVIDAD_ECONOMICA_N6;
          this.fmrEmpresa.Direccion = res.CALLES_DOMICILIO;
          //this.fmrEmpresa.SectorEconomico = res.ACTIVIDAD_ECONOMICA;
        }
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarRUCExterno() {
    var datosEmpresa = {
      NRO_RUC: "",
      RAZON_SOCIAL: "",
      NOMBRE_COMERCIAL: "",
      NOMBRE_COMPLETO: "",
      ACTIVIDAD_ECONOMICA: "",
      FECHA_CONSTITUCION: "",
      RESIDENCIA: "",
      CALLES: "",
      CALLES_DOMICILIO: "",
      NRO_DOMICILIO: "",
      PROVINCIA: "",
      CANTON: "",
      CIUDAD: "",
      PARROQUIA: "",
      BARRIO: "",
      CAPITAL: "",
      NRO_EMPLEADOS: "",
      TELEFONO: "",
      EMAIL: "",
      ACTIVIDAD_ECONOMICA_N6: "",
      ESTADO_LEGAL: "",
      TIPO_COMPANIA: "",
      INTENDENCIA_CONTROL: "",
      OBJETO_SOCIAL: ""
    };

    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/servicio/consultar/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        var xml = $.parseXML(res);
        var resultado = $(xml).find("resultado")[0];
        if (resultado != undefined) {
          $(xml).find("resultado").each(function () {
            datosEmpresa.NRO_RUC = $(this).find('NRO_RUC').text();
            datosEmpresa.RAZON_SOCIAL = $(this).find('RAZON_SOCIAL').text();
            datosEmpresa.NOMBRE_COMERCIAL = $(this).find('NOMBRE_COMERCIAL').text();
            datosEmpresa.NOMBRE_COMPLETO = $(this).find('NOMBRE_COMPLETO').text();
            datosEmpresa.ACTIVIDAD_ECONOMICA = $(this).find('ACTIVIDAD_ECONOMICA').text();
            datosEmpresa.FECHA_CONSTITUCION = $(this).find('FECHA_CONSTITUCION').text();
            datosEmpresa.RESIDENCIA = $(this).find('RESIDENCIA').text();
            datosEmpresa.CALLES = $(this).find('CALLES').text();
            datosEmpresa.CALLES_DOMICILIO = $(this).find('CALLES_DOMICILIO').text();
            datosEmpresa.NRO_DOMICILIO = $(this).find('NRO_DOMICILIO').text();
            datosEmpresa.PROVINCIA = $(this).find('PROVINCIA').text();
            datosEmpresa.CANTON = $(this).find('CANTON').text();
            datosEmpresa.CIUDAD = $(this).find('CIUDAD').text();
            datosEmpresa.PARROQUIA = $(this).find('PARROQUIA').text();
            datosEmpresa.BARRIO = $(this).find('BARRIO').text();
            datosEmpresa.CAPITAL = $(this).find('CAPITAL').text();
            datosEmpresa.NRO_EMPLEADOS = $(this).find('NRO_EMPLEADOS').text();
            datosEmpresa.TELEFONO = $(this).find('TELEFONO').text();
            datosEmpresa.EMAIL = $(this).find('EMAIL').text();
            datosEmpresa.ACTIVIDAD_ECONOMICA_N6 = $(this).find('ACTIVIDAD_ECONOMICA_N6').text();
            datosEmpresa.ESTADO_LEGAL = $(this).find('ESTADO_LEGAL').text();
            datosEmpresa.TIPO_COMPANIA = $(this).find('TIPO_COMPANIA').text();
            datosEmpresa.INTENDENCIA_CONTROL = $(this).find('INTENDENCIA_CONTROL').text();
            datosEmpresa.OBJETO_SOCIAL = $(this).find('OBJETO_SOCIAL').text();
          });

          this.guardarCatalogoEmpresaRUC(datosEmpresa);
        } else {
          this.valCotizador.mostrarAlerta("No se encontraron datos con el RUC ingresado, ingrese manualmente los datos de la empresa.", this.usuario.broker.Color);
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarCatalogoEmpresaRUC(datosEmpresa) {
    this.spinner.show();
    this.conexion.post("Broker/SBroker.svc/empresa/catalogo/guardar/registro", datosEmpresa, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.fmrEmpresa.IdCatalogoEmpresa = res.IdCatalogoEmpresas;
        this.fmrEmpresa.Telefono = datosEmpresa.TELEFONO;
        this.fmrEmpresa.Email = datosEmpresa.EMAIL;
        this.fmrEmpresa.RazonSocial = datosEmpresa.RAZON_SOCIAL;
        this.fmrEmpresa.GiroNegocio = datosEmpresa.ACTIVIDAD_ECONOMICA_N6;
        this.fmrEmpresa.Direccion = datosEmpresa.CALLES_DOMICILIO;
        //this.fmrEmpresa.SectorEconomico = datosEmpresa.ACTIVIDAD_ECONOMICA;
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }
  //-------------

  public consultarCEDULAInterno() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/cotizacion/personas/buscar/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.IdCatalogoCedulas == 0) {
          this.consultarCEDULAExterno();
        } else {
          this.consultarRUCCEDULAInterno(res);
        }
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarCEDULAExterno() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/persona/servicio/consultar/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        var persona: any = JSON.parse(res);
        if (persona.Respuesta.length == 0) {
          this.valCotizador.mostrarAlerta("No encontro ningún dato con el número de documento proporcionado, ingrese manualmente los datos de la persona.", this.usuario.broker.Color);
        } else {
          this.guardarCataloCedulas(persona.Respuesta[0]);
          this.consultarRUCCEDULAInterno(persona.Respuesta[0]);
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarCataloCedulas(persona: any) {
    this.spinner.show();
    this.conexion.post("Broker/SBroker.svc/cotizacion/personas/ingresar", persona, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarRUCCEDULAInterno(datosCedula) {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/catalogo/buscar/registro/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.IdCatalogoEmpresas == 0) {
          this.guardarCatalogoEmpresaCEDULARUC(datosCedula);
        } else {
          this.fmrEmpresa.IdCatalogoEmpresa = res.IdCatalogoEmpresas;
          this.fmrEmpresa.Telefono = res.TELEFONO;
          this.fmrEmpresa.Email = res.EMAIL;
          this.fmrEmpresa.RazonSocial = res.RAZON_SOCIAL;
          this.fmrEmpresa.GiroNegocio = res.ACTIVIDAD_ECONOMICA_N6;
          this.fmrEmpresa.Direccion = res.CALLES_DOMICILIO;
          //this.fmrEmpresa.SectorEconomico = res.ACTIVIDAD_ECONOMICA;
        }
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }


  public guardarCatalogoEmpresaCEDULARUC(datosCedula) {

    var datosEmpresa = {
      NRO_RUC: datosCedula.NRO_CEDULA == null ? '' : datosCedula.NRO_CEDULA,
      RAZON_SOCIAL: datosCedula.NOMBRE_COMPLETO == null ? '' : datosCedula.NOMBRE_COMPLETO,
      NOMBRE_COMERCIAL: datosCedula.NOMBRE_COMPLETO == null ? '' : datosCedula.NOMBRE_COMPLETO,
      NOMBRE_COMPLETO: datosCedula.NOMBRE_COMPLETO == null ? '' : datosCedula.NOMBRE_COMPLETO,
      ACTIVIDAD_ECONOMICA: "",
      FECHA_CONSTITUCION: "",
      RESIDENCIA: datosCedula.RESIDENCIA == null ? '' : datosCedula.RESIDENCIA,
      CALLES: datosCedula.CALLES == null ? '' : datosCedula.CALLES,
      CALLES_DOMICILIO: datosCedula.CALLES_DOMICILIO == null ? '' : datosCedula.CALLES_DOMICILIO,
      NRO_DOMICILIO: datosCedula.NRO_DOMICILIO == null ? '' : datosCedula.NRO_DOMICILIO,
      PROVINCIA: datosCedula.PROVINCIA == null ? '' : datosCedula.PROVINCIA,
      CANTON: datosCedula.CANTON == null ? '' : datosCedula.CANTON,
      CIUDAD: datosCedula.CIUDAD == null ? '' : datosCedula.CIUDAD,
      PARROQUIA: datosCedula.PARROQUIA == null ? '' : datosCedula.PARROQUIA,
      BARRIO: datosCedula.BARRIO == null ? '' : datosCedula.BARRIO,
      CAPITAL: "",
      NRO_EMPLEADOS: "",
      TELEFONO: datosCedula.CELULAR == null ? '' : datosCedula.CELULAR,
      EMAIL: datosCedula.EMAIL == null ? '' : datosCedula.EMAIL,
      ACTIVIDAD_ECONOMICA_N6: datosCedula.ACTIVIDAD_ECONOMICA == null ? '' : datosCedula.ACTIVIDAD_ECONOMICA,
      ESTADO_LEGAL: "",
      TIPO_COMPANIA: "",
      INTENDENCIA_CONTROL: "",
      OBJETO_SOCIAL: ""
    };
    this.spinner.show();
    this.conexion.post("Broker/SBroker.svc/empresa/catalogo/guardar/registro", datosEmpresa, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.fmrEmpresa.IdCatalogoEmpresa = res.IdCatalogoEmpresas;
        this.fmrEmpresa.Telefono = datosEmpresa.TELEFONO;
        this.fmrEmpresa.Email = datosEmpresa.EMAIL;
        this.fmrEmpresa.RazonSocial = datosEmpresa.RAZON_SOCIAL;
        this.fmrEmpresa.GiroNegocio = datosEmpresa.ACTIVIDAD_ECONOMICA_N6;
        this.fmrEmpresa.Direccion = datosEmpresa.CALLES_DOMICILIO;
        //this.fmrEmpresa.SectorEconomico = datosEmpresa.ACTIVIDAD_ECONOMICA;
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  //VALIDACION COTIZACION
  public validarCotizacion() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/cotizacion/validar/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        var datos = res;

        var detalleVencimiento = (datos.Antiguedad == null) ? { color: '', texto: '' } : this.verificarVencimientoCotizacion(datos.Antiguedad);

        if (detalleVencimiento.texto == "Cotización Vencida") {
          this.actualizarAsegurado();
        } else {
          if (datos.Empresa == null) {
            this.actualizarAsegurado();
          } else {

            this.generico.verificarReglasGenerales(this.usuario.broker.IdBroker, this.fmrEmpresa.Ruc + "-COTIZACION").then(regla => {

              if (regla.Nombre == null) {
                this.valCotizador.mostrarAlerta(
                  this.fmrEmpresa.Ruc.length == 13 ? "La empresa " + this.fmrEmpresa.PrimerApellido + " tiene una cotización vigente en la herramienta." :
                    "El cliente " + this.fmrEmpresa.Nombre + " " + this.fmrEmpresa.PrimerApellido + " " + this.fmrEmpresa.SegundoApellido + " tiene una cotización vigente en la herramienta.",
                  this.usuario.broker.Color
                );
              } else {
                this.actualizarAsegurado();
              }

            }).catch(err => {
              this.spinner.hide();
              this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error en la exepción del formulario", "error", "#E74C3C");
            });

          }
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }


  //***************************** NUEVA LOGICA *****************************

  public consultarAsegurado() {

    if (this.fmrEmpresa.Ruc.length == 10 || this.fmrEmpresa.Ruc.length == 13) {

      this.activacionCampos = this.fmrEmpresa.Ruc.length;

      this.spinner.show();
      this.conexion.get("Broker/SBroker.svc/empresa/persona/servicio/consultar/" + this.fmrEmpresa.Ruc, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          var datos = JSON.parse(res);
          console.log(datos)
          if (datos.Respuesta == null) {
            this.valCotizador.mostrarAlertaInformativa("No encontro ninguna información con el número de documento proporcionado, ingrese manualmente los datos.", this.usuario.broker.Color);
            this.datosAsegurado = {
              "cli_cod_tipo_doc": 0,
              "cli_nro_doc": null,
              "cli_nombre": null,
              "cli_apellido1": null,
              "cli_apellido2": null,
              "cli_dir_cod_prov": 17,
              "cli_dir_cod_ciudad": 15,
              "cli_dir_detalle": null,
              "cli_dir_calle_principal": null,
              "cli_dir_calle_numero": null,
              "cli_dir_calle_secundaria": null,
              "cli_dir_referencia": null,
              "cli_dir_latitud": "0",
              "cli_dir_longitud": "0",
              "cli_fec_nacimiento": null,
              "cli_genero": null,
              "cli_cod_est_civil": 1,
              "cli_email": null,
              "cli_emailFactElectronica": null,
              "cli_telef_domicilio": null,
              "cli_telef_celular": null,
              "cli_estado": 0,
              "cli_cod_aseg": -1,
              "cli_dir_ciudad": null,
              "cli_cod_pais_origen": 1,
              "cli_fec_expedicion_pas": null,
              "cli_fec_vencimiento_pas": null,
              "cli_fec_ingreso_pas": null,
              "cli_cod_est_migratorio": null,
              "cli_nro_hijos_adultos": null,
              "cli_accountid": null,
              "cli_contactid": null,
              "cli_cod_agente": 0,
              "cli_cod_tipo_agente": 0,
              "cli_ingresos_mensuales": 0,
              "cli_egresos_mensuales": 0,
              "cli_activos": 0,
              "cli_pasivos": 0,
              "cli_esPEP": null,
              "cli_cod_tipo_empleo": 2,
              "cli_cod_rango_ingreso_cia": 3,
              "cli_cod_ocupacion": 32,
              "cli_cod_actividad_economica": null,
              "cli_tipo_empleo": null,
              "cli_rango_ingreso_cia": null,
              "cli_ocupacion": null,
              "cli_actividad_economica": null,
              "cli_lugar_nacimiento": null,
              "cli_est_civil": null,
              "consultar_en_web": null,
              "consultado_en_gr": null,
              "nombre_completo_gr": null,
              "nro_palabras": 0
            };
            this.fmrEmpresa.IdCatalogoEmpresa = 0;
            this.codigoAsegurado = -1;
            this.fmrEmpresa.RazonSocial = "";
            this.fmrEmpresa.Nombre = "";
            this.fmrEmpresa.PrimerApellido = "";
            this.fmrEmpresa.SegundoApellido = "";
            this.fmrEmpresa.Telefono = "";
            this.fmrEmpresa.Email = "";
            this.fmrEmpresa.GiroNegocio = "";
            this.fmrEmpresa.Direccion = "";
          } else {

            this.fmrEmpresa.RazonSocial = "";
            this.fmrEmpresa.Nombre = "";
            this.fmrEmpresa.PrimerApellido = "";
            this.fmrEmpresa.SegundoApellido = "";
            this.fmrEmpresa.Telefono = "";
            this.fmrEmpresa.Email = "";
            this.fmrEmpresa.GiroNegocio = "";
            this.fmrEmpresa.Direccion = "";
            this.codigoAsegurado = -1;

            var cliente = datos.Respuesta[0];
            this.datosAsegurado = cliente;
            this.fmrEmpresa.IdCatalogoEmpresa = 0;
            this.fmrEmpresa.RazonSocial = (cliente.cli_nombre == null ? "" : cliente.cli_nombre) + " " + (cliente.cli_apellido1 == null ? "" : cliente.cli_apellido1) + " " + (cliente.cli_apellido2 == null ? "" : cliente.cli_apellido2);
            this.fmrEmpresa.Nombre = cliente.cli_nombre == null ? "" : cliente.cli_nombre;
            this.fmrEmpresa.PrimerApellido = cliente.cli_apellido1 == null ? "" : cliente.cli_apellido1
            this.fmrEmpresa.SegundoApellido = cliente.cli_apellido2 == null ? "" : cliente.cli_apellido2;
            this.fmrEmpresa.Telefono = cliente.cli_telef_celular;
            this.fmrEmpresa.Email = cliente.cli_email;
            this.fmrEmpresa.GiroNegocio = cliente.cli_actividad_economica;
            this.fmrEmpresa.Direccion = cliente.cli_dir_detalle;
            this.codigoAsegurado = cliente.cli_cod_aseg;
          }
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    } else {
      this.valCotizador.mostrarAlertaInformativa("Ingresar un número de documento válido", this.usuario.broker.Color);
    }

  }

  public ver() {
    console.log(this.Comision);
  }

  public actualizarAsegurado() {

    if (this.valCotizador.validacion(this.fmrEmpresa, this.usuario.broker.Color)) {
      if (this.valCotizador.validacionSiniestralidad(this.fmrEmpresa.Siniestralidad, this.usuario.broker.Color)) {
        if (this.valCotizador.validacionCorredor(this.Sucursal, this.Comision, this.TipoAgente, this.Agente, this.usuario.Corredores, this.usuario.broker.Color)) {

          var Corredor: any;
          var Comision: any;
          if (this.usuario.Corredores == "1") {
            var suc = this.Sucursal.Union.split("-");

            if (this.Agente.codigoAgente == 99) {
              Comision = 0;
            } else if (this.Agente.codigoAgente == 3) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 101) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 103) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 108) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 109) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 288) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 307) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 308) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 309) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 900) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 902) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 903) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 904) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 998) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 1002) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 1034) {
              Comision = 25;
            } else if (this.Agente.codigoAgente == 1063) {
              Comision = 25;
            } else {
              Comision = 20;
            }

            Corredor = {
              Sucursal: suc[0],
              PuntoVenta: suc[1],
              Comision: Comision,
              TipoAgente: this.TipoAgente.value,
              Agente: this.Agente.codigoAgente
            };
          } else {
            if (this.usuario.CodigoAgente == 99) {
              Comision = 0;
            } else if (this.usuario.CodigoAgente == 3) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 101) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 103) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 108) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 109) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 288) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 307) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 308) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 309) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 900) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 902) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 903) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 904) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 998) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 1002) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 1034) {
              Comision = 25;
            } else if (this.usuario.CodigoAgente == 1063) {
              Comision = 25;
            } else {
              Comision = 20;
            }

            Corredor = {
              Sucursal: this.usuario.CodigoSucursal,
              PuntoVenta: this.usuario.CodigoPuntoVenta,
              Comision: Comision,
              TipoAgente: parseInt(this.usuario.CodigoTipoAgente),
              Agente: this.usuario.CodigoAgente
            };
          }

          var Datos = {
            ValIdentificacion: this.fmrEmpresa.Ruc,
            ValAgente: Corredor.Agente,
            ValTipoAgente: Corredor.TipoAgente,
          };

          var datosAsegurado = {
            "CodUsuario": "",
            "CodTipoAgente": Corredor.TipoAgente,
            "CodAgente": Corredor.Agente,
            "Origen": "LAAAAA000003",
            "CodProvincia": this.datosAsegurado.cli_cod_aseg == -1 ? 17 : this.datosAsegurado.cli_dir_cod_prov,
            "CodCiudad": this.datosAsegurado.cli_cod_aseg == -1 ? 15 : this.datosAsegurado.cli_dir_cod_ciudad,
            "Direccion": this.fmrEmpresa.Direccion,
            "FechaNacimiento": this.datosAsegurado.cli_fec_nacimiento == null ? "" : this.datosAsegurado.cli_fec_nacimiento,
            "Genero": this.datosAsegurado.cli_genero == null ? "" : this.datosAsegurado.cli_genero,
            "Estado": this.datosAsegurado.cli_estado == null ? 0 : this.datosAsegurado.cli_estado,
            "DireccionGeo1": "",
            "DireccionGeo2": "",
            "DireccionGeo3": "",
            "FechaExpedicionPasaporte": this.datosAsegurado.cli_fec_expedicion_pas == null ? "" : this.datosAsegurado.cli_fec_expedicion_pas,
            "FechaVencimientoPasaporte": this.datosAsegurado.cli_fec_vencimiento_pas == null ? "" : this.datosAsegurado.cli_fec_vencimiento_pas,
            "FechaIngresoPais": this.datosAsegurado.cli_fec_ingreso_pas == null ? "" : this.datosAsegurado.cli_fec_ingreso_pas,
            "TipoDocumento": this.datosAsegurado.cli_cod_tipo_doc == null ? 0 : this.datosAsegurado.cli_cod_tipo_doc,
            "NroDocumento": this.fmrEmpresa.Ruc,
            "Nombre": this.fmrEmpresa.Nombre,
            "PrimerApellido": this.fmrEmpresa.PrimerApellido,
            "SegundoApellido": this.fmrEmpresa.SegundoApellido,
            "CodPaisOrigen": this.datosAsegurado.cli_cod_aseg == -1 ? 1 : this.datosAsegurado.cli_cod_pais_origen,
            "EstadoCivil": this.datosAsegurado.cli_est_civil == null ? 0 : this.datosAsegurado.cli_est_civil,
            "EMail": this.fmrEmpresa.Email,
            "EMailFactElectronica": this.datosAsegurado.cli_emailFactElectronica == null ? "" : this.datosAsegurado.cli_emailFactElectronica,
            "TelefonoConvencional": this.datosAsegurado.cli_telef_domicilio == null ? "" : this.datosAsegurado.cli_telef_domicilio,
            "TelefonoCelular": this.fmrEmpresa.Telefono,
            "CodigoAsegurado": this.datosAsegurado.cli_cod_aseg == null ? 0 : this.datosAsegurado.cli_cod_aseg,
            "CodEstadoMigratorio": this.datosAsegurado.cli_cod_est_migratorio == null ? 0 : this.datosAsegurado.cli_cod_est_migratorio,
            "CodOcupacionF": this.datosAsegurado.cli_cod_ocupacion == null ? 0 : this.datosAsegurado.cli_cod_ocupacion,
            "CodActividadEconomJ": this.datosAsegurado.cli_cod_actividad_economica == null ? 0 : this.datosAsegurado.cli_cod_actividad_economica
          }

          this.spinner.show();
          this.generico.verificarCompromisoSise(Datos).then(compromiso => {
            this.spinner.hide();

            this.spinner.show();
            this.generico.verificarReglasGenerales(this.usuario.broker.IdBroker, this.fmrEmpresa.Ruc + "-COMPROMISO").then(reglaC => {
              this.spinner.hide();

              var pasoCom = false;
              var goblalCom = false;

              if (compromiso == "0") {
                pasoCom = true;
              }

              if (pasoCom == true) {
                goblalCom = true;
              } else {
                if (reglaC.Nombre != null) {
                  goblalCom = true;
                }
              }

              if (goblalCom == true) {
                this.spinner.show();
                this.generico.verificarPolizaSise(Datos).then(polizasise => {
                  this.spinner.hide();

                  this.spinner.show();
                  this.generico.verificarReglasGenerales(this.usuario.broker.IdBroker, this.fmrEmpresa.Ruc + "-POLIZA").then(reglaP => {
                    this.spinner.hide();

                    var pasoPol = false;
                    var goblalPol = false;

                    if (polizasise == "0") {
                      pasoPol = true;
                    }

                    if (pasoPol == true) {
                      goblalPol = true;
                    } else {
                      if (reglaP.Nombre != null) {
                        goblalPol = true;
                      }
                    }

                    if (goblalPol == true) {

                      this.spinner.show();
                      this.generico.verificarListasNegras(this.fmrEmpresa.Ruc).then(listanegra => {
                        this.spinner.hide();

                        if (listanegra == "false") {

                          this.spinner.show();
                          this.generico.verificarPolizaPymes(this.fmrEmpresa.Ruc).then(polizapymes => {
                            this.spinner.hide();
                            if (polizapymes == 0) {

                              this.spinner.show();
                              this.generico.actualizarDatosAsegurado(datosAsegurado).then(datos => {
                                console.log(datos);
                                this.spinner.hide();

                                if (datos.Error == 0 && datos.Mensaje == null) {

                                  this.guardarEmpresa(Corredor);

                                } else {
                                  this.valCotizador.mostrarAlerta("Los datos no pudieron ser actualizados.", this.usuario.broker.Color);
                                }

                              }).catch(err => {
                                this.spinner.hide();
                              });

                            } else {
                              this.valCotizador.mostrarAlertaInformativa("El cliente " + this.fmrEmpresa.RazonSocial + " tiene una póliza vigente.", this.usuario.broker.Color);
                            }

                          }).catch(err => {
                            this.spinner.hide();
                          });

                        } else {
                          this.valCotizador.mostrarAlertaInformativa("No podemos continuar, por favor contáctese con el Asesor Comercial.", this.usuario.broker.Color);
                        }

                      }).catch(err => {
                        this.spinner.hide();
                      });

                    } else {
                      this.valCotizador.mostrarAlertaInformativa("El cliente " + this.fmrEmpresa.RazonSocial + " tiene una póliza vigente con SEGUROS EQUINOCCIAL.", this.usuario.broker.Color);
                    }

                  }).catch(err => {
                    this.spinner.hide();
                  });

                }).catch(err => {
                  this.spinner.hide();
                });
              } else {
                this.valCotizador.mostrarAlertaInformativa("El cliente " + this.fmrEmpresa.RazonSocial + " tiene un compromiso registrado con SEGUROS EQUINOCCIAL.", this.usuario.broker.Color);
              }

            }).catch(err => {
              this.spinner.hide();
            });

          }).catch(err => {
            this.spinner.hide();
          });
        }
      }
    }
  }

  public verificarDeudaAsegurado(datos) {

    var parametros = {
      "Identificador": 5,
      "IdEmpresa": datos.Empresa.IdEmpresa,
      "IdCatalogoEmpresa": 0,
      "Telefono": "",
      "Email": "",
      "Codigo": 0,
      "Riesgo": 0,
      "Ruc": "",
      "RazonSocial": "",
      "Nombre": "",
      "PrimerApellido": "",
      "SegundoApellido": "",
      "GiroNegocio": "",
      "SectorEconomico": "",
      "Siniestralidad": "",
      "CodigoAsegurado": "",
      "Direccion": "",
    };

    var detalleVencimiento = this.verificarVencimientoCotizacion(datos.Antiguedad);
    var vencimiento = false;

    if (detalleVencimiento.texto == "Cotización Vencida") {
      vencimiento = true;
    }

    if (vencimiento == true) {

      var estadoVencimiento = 0;
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/empresa/cotizacion/revalidar/' + datos.Empresa.Ruc, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          for (let cotizaciones of res) {
            var detalle = this.verificarVencimientoCotizacion(cotizaciones.Antiguedad);
            if (detalle.texto != "Cotización Vencida" && this.usuario.IdUsuario != cotizaciones.IdUsuario) {
              estadoVencimiento++;
            }
          }

          if (estadoVencimiento != 0) {
            this.globales.mostarAlerta("", "La cotización que intenta modificar ha caducado, y ya se encuentra cotizada por otro usuario.", "info");
          } else {
            this.verificacionConVencimiento(datos, parametros);
          }

        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );

    } else {
      this.verificacionSinVencimiento(datos, parametros);
    }

  }

  public verificacionSinVencimiento(datos, parametros) {

    this.spinner.show();
    this.generico.consultarCodigoAsegurado(datos.Empresa.Ruc).then(asegurado => {
      this.spinner.hide();

      this.spinner.show();
      this.generico.consultaDeudasPendientes(asegurado).then(deuda => {
        this.spinner.hide();

        if (deuda == "-1") {
          this.globales.mostrarNotificacion("Cliente con deuda pendiente, contáctese con su ejecutivo de cuenta.", "warning", "bottom");
        }
        parametros.CodigoAsegurado = deuda;

        this.spinner.show();
        this.conexion.post('Broker/SBroker.svc/empresa/guardar/registro', parametros, this.usuario.Uid).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.continuarCotizacion(datos);
          },
          err => {
            this.spinner.hide();
            console.log(err);
            this.conexion.error(err);
          }
        );

      }).catch(err => {
        this.spinner.hide();
      });

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public verificacionConVencimiento(datos, parametros) {

    var Corredor = JSON.parse(datos.Corredor);

    var Datos = {
      ValIdentificacion: datos.Empresa.Ruc,
      ValAgente: Corredor.Agente,
      ValTipoAgente: Corredor.TipoAgente,
    };

    this.spinner.show();
    this.generico.verificarCompromisoSise(Datos).then(compromiso => {
      this.spinner.hide();

      if (compromiso == 0) {
        this.spinner.show();
        this.generico.verificarPolizaSise(Datos).then(polizasise => {
          this.spinner.hide();

          if (polizasise == 0) {

            this.spinner.show();
            this.generico.verificarListasNegras(datos.Empresa.Ruc).then(listanegra => {
              this.spinner.hide();

              if (listanegra == "false") {

                this.spinner.show();
                this.generico.verificarPolizaPymes(datos.Empresa.Ruc).then(polizapymes => {
                  this.spinner.hide();
                  if (polizapymes == 0) {

                    this.spinner.show();
                    this.generico.actualizarCotizacionFecha(datos.IdCotizacion).then(compromiso => {
                      this.spinner.hide();
                      this.verificacionSinVencimiento(datos, parametros);

                    }).catch(err => {
                      this.spinner.hide();
                    });

                  } else {
                    this.valCotizador.mostrarAlertaInformativa("El cliente " + datos.Empresa.Ruc + " tiene una póliza vigente.", this.usuario.broker.Color);
                  }

                }).catch(err => {
                  this.spinner.hide();
                });

              } else {
                this.valCotizador.mostrarAlertaInformativa("No podemos continuar, por favor contáctese con el Asesor Comercial.", this.usuario.broker.Color);
              }

            }).catch(err => {
              this.spinner.hide();
            });

          } else {
            this.valCotizador.mostrarAlertaInformativa("El cliente " + datos.Empresa.Ruc + " tiene una póliza vigente con SEGUROS EQUINOCCIAL.", this.usuario.broker.Color);
          }

        }).catch(err => {
          this.spinner.hide();
        });
      } else {
        this.valCotizador.mostrarAlertaInformativa("El cliente " + datos.Empresa.Ruc + " tiene un compromiso registrado con SEGUROS EQUINOCCIAL.", this.usuario.broker.Color);
      }

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public detallesCotizacion(cotizacion) {
    this.detalleCotizacion = cotizacion;
    $('#ModalDetallesCotizacion').modal('toggle');
    console.log(this.detalleCotizacion);
  }

  public limpiarInformacion() {
    this.fmrEmpresa = {
      "Identificador": 1,
      "IdEmpresa": 0,
      "IdCatalogoEmpresa": 0,
      "Ruc": "",
      "Telefono": "",
      "Email": "",
      "Codigo": 0,
      "Riesgo": 1,
      "RazonSocial": "",
      "Nombre": "",
      "PrimerApellido": "",
      "SegundoApellido": "",
      "GiroNegocio": "",
      "SectorEconomico": "",
      "Siniestralidad": "",
      "CodigoAsegurado": "0",
      "Direccion": ""
    };
    this.activacionCampos = 0;
    this.datosAsegurado = null;
  }

  public toJSON(json) {
    return JSON.stringify(json);
  }

  public listarAgentes() {
    this.spinner.show();

    this.lstAgente = [];
    this.Agente = null;

    this.conexion.get('Broker/SBroker.svc/consultar/codigo/agente/' + this.TipoAgente.value, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        var xml = $.parseXML(res);
        console.log(res);
        var data = [];

        $(xml).find("Table").each(function (i, e) {
          data.push({ codigoAgente: $(this).find('cod_agente').text(), nombreAgente: $(this).find('fullname').text() });
        });

        this.lstAgente = data;
        this.dataAgente = this.lstAgente.slice();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarSucursales() {
    this.spinner.show();

    this.lstSucursal = [];

    this.conexion.get('Broker/SBroker.svc/consultar/catalogo/sucursal', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstSucursal = res;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public filtrarAgente(value) {
    this.dataAgente = this.lstAgente.filter((s) => s.nombreAgente.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public mostrarIdetificacion() {
    if (this.fmrEmpresa.Ruc.length == 10 || this.fmrEmpresa.Ruc.length == 13) {
      this.activacionCampos = this.fmrEmpresa.Ruc.length;
    } else {
      this.activacionCampos = 0;
    }
  }

  public obtenerComision(dato) {

    var comision = "";

    if (dato == null || dato == "" || dato == undefined) {
      comision = "";
    } else {
      var corredor = JSON.parse(dato);
      comision = corredor.Comision;
    }
    return comision;
  }

  //***************************** FIN NUEVA LOGICA *****************************


  //GESTION PANELES

  public gestionPanelInicio() {
    this.panelEmpresa.formulario = true;
    this.panelEmpresa.inicio = false;
    this.vistaFiltroInicio = true;
    this.gestionColoresBroker();
  }

  public gestionPanelFormulario() {
    this.panelEmpresa.formulario = false;
    this.panelEmpresa.inicio = true;
    this.vistaFiltroInicio = true;
    this.gestionColoresBroker();
    this.limpiarInformacion();
  }

  public habilitarVistas() {
    if (this.vistaFiltroInicio) {
      this.vistaFiltroInicio = false;
    } else {
      this.vistaFiltroInicio = true;
    }
  }

  //VISTA COLORES
  public gestionColoresBroker() {
    setTimeout(() => {
      $(".btn-broker").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $(".btn-broker").css("color", "white");
    }, 100);
  }

  public gestionColoresEnterBroker() {
    $(".btn-broker").css("background-color", "rgba(" + this.usuario.broker.Color + ", 0.7)");
    $(".btn-broker").css("color", "white");
  }

  public gestionColoresLeaveBroker() {
    $(".btn-broker").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
    $(".btn-broker").css("color", "white");
  }

}
