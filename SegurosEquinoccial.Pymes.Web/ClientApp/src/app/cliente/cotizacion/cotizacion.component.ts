import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, } from '@angular/core';

import { VistaPipe } from '../../pipes/getion-vista/vista.pipe';
import { MapaPipe } from '../../pipes/gestion-mapa/mapa.pipe';
import { VehiculosPipe } from '../../pipes/gestion-vehiculos/vehiculos.pipe';
import { ValidacionCotizadorPipe } from '../../pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';

import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import { VerificacionService } from '../../servicios/cotizacion/verificacion.service';

import { CotizacionRamoGeneral } from '../cotizacion-ramos/cotizacion.ramo.general';
import { IncedioComponente } from '../cotizacion-ramos/ramo-incendio/incendio.component';
import { EquipoEleconicoComponente } from '../cotizacion-ramos/ramo-equipo-electronico/equipo-electronico.component';
import { RoturaMaquinariaComponente } from '../cotizacion-ramos/ramo-rotura-maquinaria/rotura-maquinaria.component';
import { LucroRoturaMaqunariaComponente } from '../cotizacion-ramos/ramo-lucro-rotura-maquinaria/lucro-rotura-maquinaria.component';
import { LucroIncedioComponente } from '../cotizacion-ramos/ramo-lucro-incendio/lucro-incendio.component';
import { RoboAsaltoComponente } from '../cotizacion-ramos/ramo-robo-asalto/robo-asalto.component';
import { DineroValoresComponente } from '../cotizacion-ramos/ramo-dinero-valores/dinero-valores.component';
import { EquipoMaquinariaComponente } from '../cotizacion-ramos/ramo-equipo-maquinaria/equipo-maquinaria.component';
import { CoberturasAdicionalesComponente } from '../cotizacion-ramos/ramo-coberturas-adicionales/coberturas-adicionales.component';
import { ResponsabilidadCivilComponente } from '../cotizacion-ramos/ramo-responsabilidad-civil/responsabilidad-civil.component';
import { FidelidadComponente } from '../cotizacion-ramos/ramo-fidelidad/fidelidad.component';
import { AccidentesPersonalesComponente } from '../cotizacion-ramos/ramo-accidentes-personales/accidentes-personales.component';
import { TransportesComponente } from '../cotizacion-ramos/ramo-transportes/transportes.component';
import { VehiculosComponente } from '../cotizacion-ramos/ramo-vehiculos/vehiculos.component';

import { NgxSpinnerService } from 'ngx-spinner';
import { RamosService } from '../../servicios/cotizacion/ramos.service';
import { CotizacionService } from '../../servicios/cotizacion/cotizacion.service';
import { Router } from '@angular/router';
import { FinalizacionService } from '../../servicios/cotizacion/finalizacion.service';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { VariablesGlobales } from '../../variables/globales/globales';
import { VariablesEmail } from '../../variables/email/email';
import { DomSanitizer } from '@angular/platform-browser';
import { TransportesImportacionesComponente } from '../cotizacion-ramos/ramo-transportes-importaciones/transportes-importaciones.component';
import { GeneradorService } from '../../metodos/generador/generador.service';
import { GenericoService } from '../../controladores/generico/generico.service';
import Swal from 'sweetalert2';
import { GeneradorVehiculosService } from '../../metodos/generador-vehiculos/generador-vehiculos.service';
import { PolizaMultiriesgoService } from '../../controladores/polizas/poliza-multiriesgo.service';
import { PagoService } from '../../controladores/pago/pago.service';
import { GestionService } from '../../controladores/gestion/gestion.service';
import { GeneradorCompromisosService } from '../../metodos/generador-compromiso/generador-compromiso.service';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [VistaPipe, MapaPipe, VehiculosPipe, ValidacionCotizadorPipe, GlobalesPipe, VariablesGlobales, VariablesEmail]
})
export class CotizacionComponent implements OnInit {

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('buscador') buscador: ElementRef;

  //VISUALIZACION RAMOS
  //INCENDIO
  @ViewChild('ramoIncendio', { read: ViewContainerRef }) entradaIncendio: ViewContainerRef;
  public componenteIncendioRef: any;
  //EQUIPO ELECTRONICO
  @ViewChild('ramoEquipoElectronico', { read: ViewContainerRef }) entradaEquipoElectronico: ViewContainerRef;
  public componenteEquipoElectronicoRef: any;
  //ROTURA MAQUINARIA
  @ViewChild('ramoRoturaMaquinaria', { read: ViewContainerRef }) entradaRoturaMaquinaria: ViewContainerRef;
  public componenteRoturaMaquinariaRef: any;
  //ROTURA MAQUINARIA
  @ViewChild('ramoLucroRoturaMaquinaria', { read: ViewContainerRef }) entradaLucroRoturaMaquinaria: ViewContainerRef;
  public componenteLucroRoturaMaquinariaRef: any;
  //LUCRO INCENDIO
  @ViewChild('ramoLucroIncendio', { read: ViewContainerRef }) entradaLucroIncendio: ViewContainerRef;
  public componenteLucroIncendioRef: any;
  //ROBO ASALTO
  @ViewChild('ramoRoboAsalto', { read: ViewContainerRef }) entradaRoboAsalto: ViewContainerRef;
  public componenteRoboAsaltoRef: any;
  //DINERO Y VALORES
  @ViewChild('ramoDineroValores', { read: ViewContainerRef }) entradaDineroValores: ViewContainerRef;
  public componenteDineroValoresRef: any;
  //EQUIPO Y MAQUINARIA
  @ViewChild('ramoEquipoMaqunaria', { read: ViewContainerRef }) entradaEquipoMaqunaria: ViewContainerRef;
  public componenteEquipoMaqunariaRef: any;
  //COBERTURAS ADICIONALES
  @ViewChild('ramoCoberturasAdicionales', { read: ViewContainerRef }) entradaCoberturasAdicionales: ViewContainerRef;
  public componenteCoberturasAdicionalesRef: any;
  //RESPONSABILIDAD CIVIL
  @ViewChild('ramoResponsabilidadCivil', { read: ViewContainerRef }) entradaResponsabilidadCivil: ViewContainerRef;
  public componenteResponsabilidadCivilRef: any;
  //FIDELIDAD
  @ViewChild('ramoFidelidad', { read: ViewContainerRef }) entradaFidelidad: ViewContainerRef;
  public componenteFidelidadRef: any;
  //ACCIDENTES PERSONALES
  @ViewChild('ramoAcidentesPersonales', { read: ViewContainerRef }) entradaAcidentesPersonales: ViewContainerRef;
  public componenteAcidentesPersonalesRef: any;
  //TRANSPORTE INTERNO
  @ViewChild('ramoTransportes', { read: ViewContainerRef }) entradaTransportes: ViewContainerRef;
  public componenteTransportesRef: any;
  //TRANSPORTE IMPORTACIONES
  @ViewChild('ramoTransporteImportaciones', { read: ViewContainerRef }) entradaTransporteImportaciones: ViewContainerRef;
  public componenteTransporteImportacionesRef: any;
  //VEHICULOS
  @ViewChild('ramoVehiculos', { read: ViewContainerRef }) entradaVehiculos: ViewContainerRef;
  public componenteVehiculosRef: any;
  //MOTOS
  @ViewChild('ramoMotos', { read: ViewContainerRef }) entradaMotos: ViewContainerRef;
  public componenteMotosRef: any;

  public lstRamos: any;

  //USUARIO
  private usuario: any;
  public estadoUbicaciones: any;
  public identificadorGuardado = 0;

  //PANELES GLOBALES
  public panelesGlobales: any = {};

  //DATOS COTIZACION
  public codigoCotizacion: any;

  //DATOS CONTENIDO (RAMOS SUBRAMOS / DIRECCIONES / VEHICULOS)
  public contenido: any;

  //DATOS EMPRESA
  public empresa: any = { "Codigo": 0, "Email": "", "GiroNegocio": "", "IdEmpresa": 0, "Identificador": 0, "RazonSocial": "", "Riesgo": 0, "Ruc": "", "SectorEconomico": "", "Telefono": "", "Siniestralidad": "", "CodigoAsegurado": "", "Direccion": "", "Nombre": "", "PrimerApellido": "", "SegundoApellido": "" };
  public lstSectorEconomico = ["INDUSTRIAS MANUFACTURERAS", "COMERCIO", "SERVICIOS"];

  public personaTemporal: any;

  //DATOS CONTRATANTE
  public contratante = {
    "Identificador": 1,
    "IdContratante": 0,
    "Cedula": "",
    "Nombre": "",
    "PrimerApellido": "",
    "SegundoApellido": "",
    "Direccion": "",
    "Telefono": "",
    "Email": "",
    "Estado": 1,
    "Cotizacion": { "IdCotizacion": 0 }
  }

  //DATOS PAGADORES
  public pagadores = {
    "Identificador": 1,
    "IdPagador": 0,
    "Cedula": "",
    "Nombre": "",
    "PrimerApellido": "",
    "SegundoApellido": "",
    "Direccion": "",
    "Telefono": "",
    "Email": "",
    "Estado": 1,
    "Cotizacion": { "IdCotizacion": 0 }
  }

  public datosPagador: any;
  public datosContratante: any;

  //DATOS DIRECCIONES
  private lstDirecciones: any = [];
  private fmrMapa: any = {
    id: 0,
    nombre: "",
    provincia: "",
    ciudad: null
  }
  private lstProvincias = [];
  private lstCiudades = [];
  //DATOS COTIZACION
  public cotizacionMultiriesgo = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionEquipoMaquinaria = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionResponsabilidadCivil = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionFidelidad = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionAccidentesPersonales = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionTransporteInterno = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionTransporteImportaciones = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionTotal = {
    primaNetaIva12: 0,
    primaNetaIva0: 0,
    primaNetaTotal: 0,
    impuestoSBS: 0,
    seguroCampesino: 0,
    derechosEmision: 0,
    iva: 0,
    primaTotal: 0,
  }

  public cotizacionVista = {
    multiriesgo: true,
    equipoMaquinara: false,
    responsabilidadCivil: false,
    fidelidad: false,
    accidentesPersonales: false,
    transporteInterno: false,
    transporteImportaciones: false,
    vehiculos: false
  }

  public cotizacionBotones = {
    multiriesgo: false,
    equipoMaquinara: false,
    responsabilidadCivil: false,
    fidelidad: false,
    accidentesPersonales: false,
    transporteInterno: false,
    transporteImportaciones: false,
    vehiculos: false
  }

  //MAPA
  private map: any;
  private coordenadasInicio: Object = { lat: -0.213814, lng: -78.504127 };
  private marcadores = {};

  public listaRiesgo = [{ "Nombre": "Riesgos Menores (Entre US$ 0 y US$ 500.000 en Incendio)", "Valor": 1 }, { "Nombre": "Riesgos Mayores (Entre US$ 500.001 hasta US$ 5.000.000 en Incendio)", "Valor": 2 }];
  public listaProvincias = [];

  //RAMOS
  private listaRamos = [];
  private listaRamosSubRamos = [];
  private listaRamosSubRamosTasas = [];
  private listaRamosSubRamosReglas = [];
  private listaRamosSubRamosReglasAdicionales = [];

  //LISTAS RAMOS
  public listaIncendio = [];
  private listaEquipoElectronico = [];
  private listaRoturaMaquinaria = [];
  private listaLucroRoturaMaquinaria = [];
  private listaLucroIncendio = [];
  private listaRoboAsalto = [];
  private listaDineroValores = [];
  private listaEquipoMaquinaria = [];
  private listaCoberturasAdicionalesMR = [];
  private listaResponsabilidadCivil = [];
  private listaFidelidad = [];
  private listaAccidentesPersonales = [];
  private listaTransportes = [];
  private listaTransporteImportaciones = [];
  private listaSubRamoTransporte = [];
  private listaVehiculos = [];
  private listaTasasVehiculos = [];

  //LISTA RAMOS EMISION
  private listaIncedioEmision = [];
  private listaTerremotoEmision = [];
  private listaCoberturasAdicionalesEmision = [];

  //CATALOGOS
  public listaDerechosEmision = [];
  public listaCalculablesCotizacion = [];

  //FORMA DE PAGO
  /* public EstadoFormaPago = 0;
   public IdPago = 0;*/
  public FormaPago = {
    IdFormaPago: 0,
    IdPago: 0,
    Tipo: "",
    TipoOtros: "",
    Estado: 0,
    Cotizacion: { IdCotizacion: 0 },
    Adjunto: "",
    AdjuntoTipo: "",

    Plataforma: "",
    CodigoAutenticacion: "",
    Referencia: "",
    Lote: "",
    Voucher: "",
    Diferidos: "",
    Intereses: "",
    Trama: "",
    Fecha: ""
  }

  public lstFormasPago = ["CONTADO"];
  //public lstFormasPago = ["DÉBITO BANCARIO", "CONTADO"];

  //GESTION ESTILO TIPO PAGO
  public tipoPago = 0;
  public lstTipoPago = [{ "Nombre": "TARJETA DE CRÉDITO / DÉBITO", "Valor": 1, "Icono": "mdi mdi-credit-card" }, { "Nombre": "OTROS MÉTODOS DE PAGO", "Valor": 2, "Icono": "mdi mdi-cash-multiple" }];
  //public lstTipoPago = [{ "Nombre": "TARJETA DE CRÉDITO / DÉBITO", "Valor": 1, "Icono": "mdi mdi-credit-card" }];

  //VALORES TOTALES POR RAMOS
  //MAXIMO QUE SE PODRA SELECCIONAR EN EL COMBOBOX DE ROTURA DE MAQUINARIA
  public limiteRoturaMaquinariaSeleccion: number;

  //VALORES VEHICULOS
  private listaDetallesVehiculos = [];
  public numeroDetalleVehiculos = { text: "0", value: 0 };
  public maximoVehiculoValor: any = 0;
  public maximoVehiculoDispositivo: any = 0;
  public lstNumeroDetalleVehiculos: Array<{ text: string, value: number }> = [];
  public datosNumeroDetalleVehiculos: Array<{ text: string, value: number }> = [];

  public colorBroker = "rgb(255,255,255)";

  public pago = false;
  public verificacion = false;
  public estadoCotizacion = 1;

  public codigoAsegurado = 0;
  public codigoAseguradoContratratante = 0;
  public codigoAseguradoPagador = 0;
  public fechaCotizacion: any;

  //CLAUSULAS POR RAMO
  public clausulasMultiriesgo = "";
  public clausulasEquipoMaquinaria = "";
  public clausulasResponsabilidadCivil = "";
  public clausulasFidelidad = "";
  public clausulasAccidentesPersonales = "";
  public clausulasTransporteInterno = "";
  public clausulasTransporteImportaciones = "";
  public clausulasVehiculos = "";
  public clausulasLucroIncedio = "";
  public clausulasLucroRoturaMaquinaria = "";

  public datosBin: any;
  public aplicarPago: any;
  public activacionCamposContratante = 0;
  public activacionCamposPagador = 0;
  public deuda = "0";
  public textoSpinner = "Procesando Datos..."
  public tramaVehiculo = [];
  public lstEmisionVehiculos = [];

  public totalVehiculos = 0;

  public valoresPagar: any;

  public fmrCotizacionResultado = {
    EstadoAccidentesPersonales: 0,
    EstadoEquipoMaquinaria: 0,
    EstadoFidelidad: 0,
    EstadoGlobal: 0,
    EstadoMultiriesgo: 0,
    EstadoPagoGlobal: 0,
    EstadoResponsabilidadCivil: 0,
    EstadoTransImportaciones: 0,
    EstadoTransInterno: 0,
    EstadoVehiculos: 0,
    IdCotizacionResultado: 0,
    IdPvAccidentesPersonales: "",
    IdPvEquipoMaquinaria: "",
    IdPvFidelidad: "",
    IdPvMultiriesgo: "",
    IdPvResponsabilidadCivil: "",
    IdPvTransImportaciones: "",
    IdPvTransInterno: "",
    IdPvVehiculos: ""
  }

  public estadoAplicarPago = false;
  public bloqueoEmision = false;

  public binEmision = "0";
  public vencimientoEmision = "0";
  public conductoEmision = 0;
  public tppagoEmision = 0;
  public sucursal_ = { "Sucursal": "0", "PuntoVenta": "0", "Comision": 20, "TipoAgente": 0, "Agente": "0" };
  public cotizacionDetalles: any;

  public numeroCotizacion = "";
  public vigenciaCotizacion = "";

  //Corredores
  public Sucursal: any;
  public Comision: any;
  public TipoAgente: any;
  public Agente: any;

  public lstSucursal = [];

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
  public numeroPolizasEmitidas = 0;

  public fechaEmisionRetroactiva;
  public fechaEmisionFutura;
  public fechaEmisionVigencia;
  public fechaEmisionVigenciaSeleccionada = new Date();
  public fechaEmisionVencimiento;

  public lstTipoCuentaDebito: Array<{ text: string, value: number }> = [
    { text: "AHORROS", value: 1 },
    { text: "CORRIENTE", value: 2 }
  ];
  public lstFechaDebito: Array<{ text: string, value: number }> = [
    { text: "PRIMERA QUINCENA", value: 1 },
    { text: "SEGUNDA QUINCENA", value: 2 }
  ];
  public lstBancosDebito = [];
  public lstBancosDebitoFiltrar: any;
  public lstCuotasDebito = [];
  public lstCuotasDebitoFiltrar: any;

  public DebitoBancario = {
    TipoCuenta: null,
    Banco: null,
    Cuotas: null,
    NumeroCuenta: null,
    FechaDebito: null,
    Adjunto: "",
    NumeroCuotas: 0
  };

  public informacionEmision: any
  public informacionDebitoBancario: any;
  public lstProvinciasCiudades = [];
  public lstProvinciasCiudadesFiltro = [];

  public fmrDireccionesAc = {
    provincia: null,
    ciudad: null
  }

  public lstDireccionesAc = [];
  public lstCiudadesAc = [];

  constructor(private router: Router, private valDiseno: VistaPipe, private valMapa: MapaPipe, private valVehiculos: VehiculosPipe, private globales: GlobalesPipe, private varGlobales: VariablesGlobales, private sesion: SesionService,
    private conexion: ApiService, private general: CotizacionRamoGeneral, private resolver: ComponentFactoryResolver, private spinner: NgxSpinnerService,
    private kcotizacion: VerificacionService, private valCotizador: ValidacionCotizadorPipe, private kramos: RamosService, private kcontenido: CotizacionService, private kfinalizacion: FinalizacionService, private email: VariablesEmail,
    private dom: DomSanitizer, public generador: GeneradorService, public generico: GenericoService, private generadorVehiculos: GeneradorVehiculosService, public poliza: PolizaMultiriesgoService, public cpago: PagoService,
    private gestionCotizacion: GestionService, private generadorCompromiso: GeneradorCompromisosService) {

  }

  ngOnInit() {
    this.gestionInicioComponente();
  }

  public gestionFechasEmision() {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
  }

  public gestionInicioComponente() {
    this.gestioPanelGlobal('Empresa');
    this.valDiseno.gestionPanelRamos('incendio');
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();

    this.colorBroker = "rgb(" + this.usuario.broker.Color + ")";
    this.verificarCotizacionExistente();
    this.listarEmpresa();
    this.usuario.broker.Provincias == 0 ? this.estadoUbicaciones = 'ubicacion-global' : this.estadoUbicaciones = 'ubicacion-provincias';

    //this.verificarFinalizacionCotizacion();

    if (this.usuario.broker.Provincias == 0) {
      this.lstProvincias = ["Global"];
    } else {
      this.lstProvincias = ['Azuay',
        'Bolívar',
        'Cañar',
        'Carchi',
        'Chimborazo',
        'Cotopaxi',
        'El Oro',
        'Esmeraldas',
        'Galápagos',
        'Guayas',
        'Imbabura',
        'Islas Galápagos',
        'Loja',
        'Los Ríos',
        'Manabí',
        'Morona Santiago',
        'Napo',
        'Orellana',
        'Pastaza',
        'Pichincha',
        'Santa Elena',
        'Santo Domingo de los Tsáchilas',
        'Sucumbíos',
        'Tungurahua',
        'Zamora Chinchipe'];
    }

    var fecha1 = moment();
    var fecha2 = moment(fecha1).subtract(30, "days");
    var fecha3 = moment(fecha1).add(30, "days");

    this.fechaEmisionVigencia = new Date(fecha1);
    this.fechaEmisionRetroactiva = new Date(fecha2);
    this.fechaEmisionFutura = new Date(fecha3)

    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public verificarCotizacionExistente() {
    if (this.kcotizacion.verificarKeyCotizacion()) {
      this.codigoCotizacion = this.kcotizacion.obtenerKeyCotizacion();
    } else {
      this.kcotizacion.regresarObtenerCotizacion();
    }
  }

  public verificarFinalizacionCotizacion() {
    if (this.kfinalizacion.verificarKeyFinalizacion()) {
      var contenido = this.kcontenido.obtenerKeyContenido();
      var finalizacion = this.kfinalizacion.obtenerKeyFinalizacion();
      if (parseInt(contenido.IdContenido) == parseInt(finalizacion.IdContenido)) {
        this.pago = true;
        this.gestioPanelGlobal('Pago');
        this.verificarEstadoPagoCotizacion();
      }
    }
  }

  public gestionPanelRamos(dato) {
    var ramo = [];
    if (dato == "equipoElectronico") {
      ramo = this.listaEquipoElectronico;
    } else if (dato == "roturaMaquinaria") {
      ramo = this.listaRoturaMaquinaria;
    } if (dato == "lucroRoturaMaquinaria") {
      ramo = this.listaLucroRoturaMaquinaria;
    } if (dato == "lucroIncendio") {
      ramo = this.listaLucroIncendio;
    } if (dato == "roboAsalto") {
      ramo = this.listaRoboAsalto;
    } if (dato == "dineroValores") {
      ramo = this.listaDineroValores;
    } if (dato == "equipoMaquinaria") {
      ramo = this.listaEquipoMaquinaria;
    } if (dato == "responsabilidadCivil") {
      ramo = this.listaResponsabilidadCivil;
    } if (dato == "fidelidad") {
      ramo = this.listaFidelidad;
    } if (dato == "accidentesPersonales") {
      ramo = this.listaAccidentesPersonales;
    } if (dato == "transportes") {
      ramo = this.listaTransportes;
    } if (dato == "transporteImportaciones") {
      ramo = this.listaTransporteImportaciones;
    } if (dato == "vehiculos") {
      ramo = this.listaVehiculos;
    }

    if (ramo.length != 0) {
      for (var subramos of ramo) {
        subramos.Valores.ValorU1.Valor = 0;
        subramos.Valores.ValorU2.Valor = 0;
        subramos.Valores.ValorU3.Valor = 0;
        subramos.Valores.ValorU4.Valor = 0;
        subramos.Valores.ValorU5.Valor = 0;

        subramos.Valores.Prima = 0;
      }
    }

    this.valDiseno.gestionPanelRamos(dato);
  }

  public eliminarMarcadorTabla(id, marcador, direcciones, ubi) {
    this.valMapa.eliminarMarcadorTabla(id, marcador, direcciones);
    var ubicacion = ubi + 1;
    this.vaciarValoresUbicacion(ubicacion);
  }

  public vaciarValoresUbicacion(ubicacion) {
    this.reiniciarValores(ubicacion, this.listaIncendio);
    this.reiniciarValores(ubicacion, this.listaEquipoElectronico);
    this.reiniciarValores(ubicacion, this.listaRoturaMaquinaria);
    this.reiniciarValores(ubicacion, this.listaLucroRoturaMaquinaria);
    this.reiniciarValores(ubicacion, this.listaLucroIncendio);
    this.reiniciarValores(ubicacion, this.listaRoboAsalto);
    this.reiniciarValores(ubicacion, this.listaDineroValores);
    this.reiniciarValores(ubicacion, this.listaEquipoMaquinaria);
    this.reiniciarValores(ubicacion, this.listaResponsabilidadCivil);
    this.reiniciarValores(ubicacion, this.listaFidelidad);
    this.reiniciarValores(ubicacion, this.listaAccidentesPersonales);
    this.reiniciarValores(ubicacion, this.listaTransportes);
    this.reiniciarValores(ubicacion, this.listaTransporteImportaciones);
    this.reiniciarValores(ubicacion, this.listaVehiculos);
  }

  public reiniciarValores(ubicacion, ramo) {
    for (var subramos of ramo) {
      subramos.Valores.ValorU1.Valor = 0;
      subramos.Valores.ValorU2.Valor = 0;
      subramos.Valores.ValorU3.Valor = 0;
      subramos.Valores.ValorU4.Valor = 0;
      subramos.Valores.ValorU5.Valor = 0;

      subramos.Valores.Prima = 0;
    }
  }

  //INICIALIZACION DE VALORES EN CADA RAMO Y SUS COBERTURAS

  public inicializarRamosCoberturas() {

    if (this.kcontenido.verificarKeyContenido()) {
      this.verificarContenidoGuardado();
    } else {
      this.listaIncendio = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RIL1", "csil");
      this.listaEquipoElectronico = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "REE2", "csee");
      this.listaRoturaMaquinaria = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RRM3", "csrm");
      this.listaLucroRoturaMaquinaria = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RLRM4", "cslrm");
      this.listaLucroIncendio = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RLIL5", "cslil");
      this.listaRoboAsalto = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RRA6", "csra");
      this.listaDineroValores = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RDV7", "csdv");
      this.listaEquipoMaquinaria = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "REM8", "csem");
      this.listaResponsabilidadCivil = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RRC9", "csrc");
      this.listaFidelidad = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RFI10", "csfi");
      this.listaAccidentesPersonales = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RAP12", "csap");
      this.listaTransportes = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RTR11IN", "cstrin");
      this.listaTransporteImportaciones = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RTR11IM", "cstrim");
      this.listaVehiculos = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RVE13", "csve");
      this.listaCoberturasAdicionalesMR = this.general.gestionRamos(this.listaRamosSubRamos, this.listaRamosSubRamosTasas, this.listaRamosSubRamosReglas, "RCA14", "csca");
      (this.listaCoberturasAdicionalesMR.length > 0) ? this.valDiseno.gestionPanelRamos('coberturasAdicionales') : '';
      this.asignarListasRamos();
    }

    this.limiteRoturaMaquinariaSeleccion = this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SRM1");

    this.maximoVehiculoValor = this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SVE1");
    this.maximoVehiculoDispositivo = this.general.asignacionReglasAdicionales(this.listaRamosSubRamosReglasAdicionales, "SVE2");

    this.contratante.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;
    this.pagadores.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;
  }

  //GESTION RAMOS
  public asignarListasRamos() {
    this.lstRamos = {
      listaIncendio: this.listaIncendio,
      listaEquipoElectronico: this.listaEquipoElectronico,
      listaRoturaMaquinaria: this.listaRoturaMaquinaria,
      listaLucroRoturaMaquinaria: this.listaLucroRoturaMaquinaria,
      listaLucroIncendio: this.listaLucroIncendio,
      listaRoboAsalto: this.listaRoboAsalto,
      listaDineroValores: this.listaDineroValores,
      listaEquipoMaquinaria: this.listaEquipoMaquinaria,
      listaResponsabilidadCivil: this.listaResponsabilidadCivil,
      listaFidelidad: this.listaFidelidad,
      listaAccidentesPersonales: this.listaAccidentesPersonales,
      listaTransportes: this.listaTransportes,
      listaTransporteImportaciones: this.listaTransporteImportaciones,
      listaVehiculos: this.listaVehiculos,
      listaCoberturasAdicionalesMR: this.listaCoberturasAdicionalesMR,
      listaMotos: [],
    };
  }

  //GESTION DATOS RAMOS GUARDADOS
  public verificarContenidoGuardado() {
    if (this.kcontenido.verificarKeyContenido()) {
      this.spinner.show();
      this.identificadorGuardado = 1;
      this.contenido = this.kcontenido.obtenerKeyContenido();
      this.conexion.get("Broker/SBroker.svc/cotizacion/resgistros?idContenido=" + this.contenido.IdContenido + "&idCotizacion=" + this.contenido.IdCotizacion + "&idDireccion=" + this.contenido.IdDireccion + "&idVehiculos=" + this.contenido.IdVehiculos + "&idEmpresa=" + this.codigoCotizacion.idEmpresa + "", this.usuario.Uid).subscribe(
        (res: any) => {
          
          this.spinner.hide();

          this.lstDirecciones = JSON.parse(res.Direccion.DatosDireccion);
          this.valDiseno.panelesVistaRamos = JSON.parse(res.Contenido.VistaEstado);
          this.valDiseno.panelesRamos = JSON.parse(res.Contenido.VistaDiseno);
          this.valDiseno.panelesValoresRamos = JSON.parse(res.Contenido.VistaValores);
          this.kramos.registrarKeyRamos(this.valDiseno.panelesValoresRamos);
          var ramos = JSON.parse(res.Contenido.DatosCotizador);
          this.listaIncendio = ramos.listaIncendio;
          this.listaEquipoElectronico = ramos.listaEquipoElectronico;
          this.listaRoturaMaquinaria = ramos.listaRoturaMaquinaria;
          this.listaLucroRoturaMaquinaria = ramos.listaLucroRoturaMaquinaria;
          this.listaLucroIncendio = ramos.listaLucroIncendio;
          this.listaRoboAsalto = ramos.listaRoboAsalto;
          this.listaDineroValores = ramos.listaDineroValores;
          this.listaEquipoMaquinaria = ramos.listaEquipoMaquinaria;
          this.listaResponsabilidadCivil = ramos.listaResponsabilidadCivil;
          this.listaFidelidad = ramos.listaFidelidad;
          this.listaAccidentesPersonales = ramos.listaAccidentesPersonales;
          this.listaTransportes = ramos.listaTransportes;
          this.listaTransporteImportaciones = ramos.listaTransporteImportaciones;
          this.listaVehiculos = ramos.listaVehiculos;
          this.listaCoberturasAdicionalesMR = ramos.listaCoberturasAdicionalesMR;
          (ramos.listaCoberturasAdicionalesMR > 0) ? this.valDiseno.gestionPanelRamos('coberturasAdicionales') : '';

          this.listaDetallesVehiculos = JSON.parse(res.Vehiculo.DatosVehiculo);
          this.valVehiculos.generarListaVehiculosBusqueda(this.listaDetallesVehiculos, this.listaDetallesVehiculos.length)
          this.numeroDetalleVehiculos.text = this.listaDetallesVehiculos.length + "";
          this.numeroDetalleVehiculos.value = this.listaDetallesVehiculos.length;
          this.asignarListasRamos();

          this.cotizacionMultiriesgo = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, this.lstRamos, true, [], "");
          this.cotizacionEquipoMaquinaria = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaEquipoMaquinaria, "");
          this.cotizacionResponsabilidadCivil = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaResponsabilidadCivil, "");
          this.cotizacionFidelidad = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaFidelidad, "");
          this.cotizacionAccidentesPersonales = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaAccidentesPersonales, "AccidentesPersonales");
          this.cotizacionTransporteInterno = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaTransportes, "");
          this.cotizacionTransporteImportaciones = this.general.calcularCotizacionTransporteImportaciones(this.listaTransporteImportaciones);

          this.estadoCotizacion = res.Estado;
          this.fechaCotizacion = res.Fecha;

          this.FormaPago.Adjunto = res.FormaPago.Adjunto;
          this.FormaPago.AdjuntoTipo = res.FormaPago.AdjuntoTipo
          this.FormaPago.Estado = res.FormaPago.Estado;
          this.FormaPago.IdFormaPago = res.FormaPago.IdFormaPago;
          this.FormaPago.IdPago = res.FormaPago.IdPago;
          this.FormaPago.Tipo = res.FormaPago.Tipo;

          this.FormaPago.Plataforma = res.FormaPago.Plataforma;
          this.FormaPago.CodigoAutenticacion = res.FormaPago.CodigoAutenticacion;
          this.FormaPago.Referencia = res.FormaPago.Referencia;
          this.FormaPago.Lote = res.FormaPago.Lote;
          this.FormaPago.Voucher = res.FormaPago.Voucher;
          this.FormaPago.Diferidos = res.FormaPago.Diferidos;
          this.FormaPago.Intereses = res.FormaPago.Intereses;
          this.FormaPago.Trama = res.FormaPago.Trama;
          this.FormaPago.Fecha = res.FormaPago.Fecha;

          this.obtenerTipoPago(this.FormaPago.Tipo);

          this.contratante.IdContratante = res.Contratante.IdContratante;
          this.contratante.Cedula = res.Contratante.Cedula;
          this.contratante.Direccion = res.Contratante.Direccion;
          this.contratante.Email = res.Contratante.Email;
          this.contratante.Nombre = res.Contratante.Nombre;
          this.contratante.PrimerApellido = res.Contratante.PrimerApellido;
          this.contratante.SegundoApellido = res.Contratante.SegundoApellido;
          this.contratante.Telefono = res.Contratante.Telefono;
          this.contratante.Cotizacion.IdCotizacion = res.IdCotizacion;

          this.pagadores.IdPagador = res.Pagador.IdPagador;
          this.pagadores.Cedula = res.Pagador.Cedula;
          this.pagadores.Direccion = res.Pagador.Direccion;
          this.pagadores.Email = res.Pagador.Email;
          this.pagadores.Nombre = res.Pagador.Nombre;
          this.pagadores.PrimerApellido = res.Pagador.PrimerApellido;
          this.pagadores.SegundoApellido = res.Pagador.SegundoApellido;
          this.pagadores.Telefono = res.Pagador.Telefono;
          this.pagadores.Cotizacion.IdCotizacion = res.IdCotizacion;

          this.activacionCamposContratante = this.contratante.Cedula.length;
          this.activacionCamposPagador = this.pagadores.Cedula.length;

          this.fmrCotizacionResultado.EstadoAccidentesPersonales = res.CotizacionResultado.EstadoAccidentesPersonales;
          this.fmrCotizacionResultado.EstadoEquipoMaquinaria = res.CotizacionResultado.EstadoEquipoMaquinaria;
          this.fmrCotizacionResultado.EstadoFidelidad = res.CotizacionResultado.EstadoFidelidad;
          this.fmrCotizacionResultado.EstadoGlobal = res.CotizacionResultado.EstadoGlobal;
          this.fmrCotizacionResultado.EstadoMultiriesgo = res.CotizacionResultado.EstadoMultiriesgo;
          this.fmrCotizacionResultado.EstadoPagoGlobal = res.CotizacionResultado.EstadoPagoGlobal;
          this.fmrCotizacionResultado.EstadoResponsabilidadCivil = res.CotizacionResultado.EstadoResponsabilidadCivil;
          this.fmrCotizacionResultado.EstadoTransImportaciones = res.CotizacionResultado.EstadoTransImportaciones;
          this.fmrCotizacionResultado.EstadoTransInterno = res.CotizacionResultado.EstadoTransInterno;
          this.fmrCotizacionResultado.EstadoVehiculos = res.CotizacionResultado.EstadoVehiculos;
          this.fmrCotizacionResultado.IdCotizacionResultado = res.CotizacionResultado.IdCotizacionResultado;
          this.fmrCotizacionResultado.IdPvAccidentesPersonales = res.CotizacionResultado.IdPvAccidentesPersonales;
          this.fmrCotizacionResultado.IdPvEquipoMaquinaria = res.CotizacionResultado.IdPvEquipoMaquinaria;
          this.fmrCotizacionResultado.IdPvFidelidad = res.CotizacionResultado.IdPvFidelidad;
          this.fmrCotizacionResultado.IdPvMultiriesgo = res.CotizacionResultado.IdPvMultiriesgo;
          this.fmrCotizacionResultado.IdPvResponsabilidadCivil = res.CotizacionResultado.IdPvResponsabilidadCivil;
          this.fmrCotizacionResultado.IdPvTransImportaciones = res.CotizacionResultado.IdPvTransImportaciones;
          this.fmrCotizacionResultado.IdPvTransInterno = res.CotizacionResultado.IdPvTransInterno;
          this.fmrCotizacionResultado.IdPvVehiculos = res.CotizacionResultado.IdPvVehiculos;

          this.verificarRamos();
          this.verificarRamosEmision();
          this.verificarAplicarPago();
          this.calcularCotizacionTotalGlobal();
          this.aplicarPago = res.CotizacionResultado.IdPvs;
          this.deuda = res.Empresa.CodigoAsegurado;
          if (this.deuda == "-1") {
            this.gestioPanelGlobal('Resumen');
            this.globales.mostarAlertaTiempo("Deuda", "Cliente con deuda pendiente, contáctese con su ejecutivo de cuenta.", "info");
          }
          this.cotizacionDetalles = res;

          this.sucursal_ = JSON.parse(res.Corredor);

          if (this.tipoPago == 1) {
            this.conductoEmision = 185;
            this.tppagoEmision = 94;
          } if (this.tipoPago == 2) {
            this.conductoEmision = 185;
            this.tppagoEmision = 94;
          } else if (this.tipoPago == 3) {
            this.conductoEmision = 1;
            this.tppagoEmision = 1;
          } else if (this.tipoPago == 4) {
            this.conductoEmision = res.FormaPago.CodigoAutenticacion;
            this.tppagoEmision = res.FormaPago.Referencia;
          }

          this.numeroPolizasEmitidas = this.verificarAlmenosUnaPolizaEmitida();
          if (this.numeroPolizasEmitidas == 0) {
            $("#headingOne").attr("aria-expanded", "true");
            $("#headingTwo").attr("aria-expanded", "false");
          } else {
            $("#headingOne").attr("aria-expanded", "false");
            $("#headingTwo").attr("aria-expanded", "true");
          }

          console.log(res);

          if (res.CotizacionResultado.FechaEmision != "") {
            this.fechaEmisionVigenciaSeleccionada = new Date(res.CotizacionResultado.FechaEmision);
          }
          
          this.obtenerDatosPagoDebitoBancario(res.FormaPago);

          console.log(res);
        },
        err => {
          this.spinner.hide();
          this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error el buscar cotización", "error", "#E74C3C");
          console.log(err);
          this.conexion.error(err);
        }
      );
    } else {
      this.verificarFinalizacionCotizacion();
    }
  }

  public obtenerDatosPagoDebitoBancario(FormaPago) {

    var tipo = "";
    var banco = "";
    var cuotas = "";
    var cuenta = "";
    var fechaDebito = "";
    var valorMensualizado = 0;

    if (FormaPago.Tipo == "DÉBITO BANCARIO") {
      this.DebitoBancario.NumeroCuenta = FormaPago.Voucher;
      cuenta = FormaPago.Voucher;

      for (let ltipoc of this.lstTipoCuentaDebito) {
        if (ltipoc.value == parseInt(FormaPago.Plataforma)) {
          this.DebitoBancario.TipoCuenta = ltipoc.value;
          tipo = ltipoc.text;
        }
      }

      this.spinner.show();
      this.generico.listarBancos().then(lista => {
        this.spinner.hide();
        this.organizarBancos(lista);
        for (let lbanco of lista) {
          if (lbanco.codigoConducto == FormaPago.CodigoAutenticacion) {
            this.DebitoBancario.Banco = lbanco.codigoConducto;
            banco = lbanco.nombreConducto;
          }
        }

        this.spinner.show();
        this.generico.listarCuotas(this.DebitoBancario.Banco).then(lista => {
          this.spinner.hide();

          this.lstCuotasDebito = lista;
          this.lstCuotasDebitoFiltrar = this.lstCuotasDebito.slice();

          for (let lcuotas of lista) {
            if (lcuotas.codigoPago == FormaPago.Referencia) {
              this.DebitoBancario.Cuotas = lcuotas.codigoPago;
              cuotas = lcuotas.nombreCuota;
            }
          }

          for (let lfecha of this.lstFechaDebito) {
            if (lfecha.value == FormaPago.Lote) {
              this.DebitoBancario.FechaDebito = lfecha.value;
              fechaDebito = lfecha.text;
            }
          }

          this.spinner.show();
          this.generico.listarNumeroCuotas(this.DebitoBancario.Cuotas).then(numero => {
            this.spinner.hide();

            this.DebitoBancario.NumeroCuotas = Math.round((this.cotizacionTotal.primaTotal / numero) * 100) / 100;
            valorMensualizado = Math.round((this.cotizacionTotal.primaTotal / numero) * 100) / 100;

            this.informacionDebitoBancario = { tipo: tipo, banco: banco, cuotas: cuotas, cuenta: cuenta, fechaDebito: fechaDebito, valorMensualizado: valorMensualizado };

            this.verificarFinalizacionCotizacion();

          }).catch(err => {
            this.spinner.hide();
          });

        }).catch(err => {
          this.spinner.hide();
        });

      }).catch(err => {
        this.spinner.hide();
      });
    } else {
      this.verificarFinalizacionCotizacion();
    }

  }

  public reverificacionDirecciones(jsonDirecciones, estado) {
    var pais = 0;
    var departamento = 0;
    var municipio = 0;
    var lstDirecciones = JSON.parse(jsonDirecciones);
    this.lstDireccionesAc = lstDirecciones;

    for (let dir of lstDirecciones) {
      if (dir.codigoPais == undefined) {
        pais++;
      } if (dir.codigoDepartameto == undefined) {
        departamento++;
      } if (dir.codigoMunicipio == undefined) {
        municipio++;
      }
    }

    if (estado == 2 || estado == 3 || estado == 4) {

      if (pais != 0 || departamento != 0 || municipio != 0) {
        console.log("ERROR");
        $('#ModalDirecciones').modal({ backdrop: 'static', keyboard: false });
      } else {
        console.log("EXITO");
      }
    } else {
      console.log("EXITO");
    }
  }

  public lstProvinciasCiudadesAc(provincia) {
    var lstCiudadesAc = [];

    if (this.usuario.broker.Provincias == 0) {
      lstCiudadesAc = this.lstProvinciasCiudades;
    } else {
      for (let ciudad of this.lstProvinciasCiudades) {
        if (ciudad.TextoDepartamento == provincia) {
          lstCiudadesAc.push(ciudad);
        }
      }
    }

    return lstCiudadesAc;
  }

  public actualizarDirecciones() {

    var json = "";
    var validacion = 0;
    $("#TablaDireccionesAc tbody tr").each(function (i, e) {
      $(this).find("td").each(function (index, element) {
        if ($(this).has("select").length) {
          var trama = $(this).find("option:selected").val() == '' ? validacion++ : JSON.parse($(this).find("option:selected").val());
          var pais = '"codigoPais":' + trama.CodigoPais + ',';
          var departamento = '"codigoDepartameto":' + trama.CodigoDepartamento + ',';
          var municipio = '"codigoMunicipio":' + trama.CodigoMunicipio + '';

          json += pais + departamento + municipio + '},';
        } else {
          json += $(this).find(".idTabla").text() == '' ? '' : '{"id":' + $(this).find(".idTabla").text() + ',';
          json += $(this).find(".idLatitud").text() == '' ? '' : '"latitud":' + $(this).find(".idLatitud").text() + ',';
          json += $(this).find(".idLongitud").text() == '' ? '' : '"longitud":' + $(this).find(".idLongitud").text() + ',';
          json += $(this).find(".idNombre").text() == '' ? '' : '"nombre":"' + $(this).find(".idNombre").text() + '",';
          json += $(this).find(".idProvincia").text() == '' ? '' : '"provincia":"' + $(this).find(".idProvincia").text() + '",';
        }
      });
    });

    if (validacion != 0) {
      this.globales.mostarAlerta("", "Seleccionar una ciudad de la lista despegable", "info");
    } else {

      var StringDirecciones = '[' + json.substr(0, (json.length - 1)) + ']';
      var JSONDirecciones = JSON.parse(StringDirecciones);
      var direcciones = {
        "Identificador": 2,
        "IdDireccion": parseInt(this.contenido.IdDireccion),
        "DatosDireccion": JSON.stringify(JSONDirecciones),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion }
      }

      this.spinner.show();
      this.gestionCotizacion.gestionDireciones(direcciones).then(id => {
        this.spinner.hide();
        $('#ModalDirecciones').modal('toggle');
        this.globales.mostarAlerta("", "Los datos de las direcciones se han actualizado exitosamente", "success");
        location.reload();
      }).catch(err => {
        console.log(err);
        this.spinner.hide();
      });
    }
  }

  public JSONtoString(valor) {
    return JSON.stringify(valor);
  }

  public StringtoJSON(valor) {
    return JSON.parse(valor);
  }

  //GESTION INCENDIOS
  public generarComponenteIncendio() {
    this.entradaIncendio.clear();
    const factory = this.resolver.resolveComponentFactory(IncedioComponente);
    const componenteIncendioRef = this.entradaIncendio.createComponent(factory);
    componenteIncendioRef.instance.lstDirecciones = this.lstDirecciones;
    componenteIncendioRef.instance.listaIncendio = this.listaIncendio;
    componenteIncendioRef.instance.lstRamos = this.lstRamos;
    componenteIncendioRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION INCENDIOS

  //GESTION EQUIPO ELECTRONICO
  public generarComponenteEquipoElectronico() {
    this.entradaEquipoElectronico.clear();
    const factory = this.resolver.resolveComponentFactory(EquipoEleconicoComponente);
    const componenteEquipoElectronicoRef = this.entradaEquipoElectronico.createComponent(factory);
    componenteEquipoElectronicoRef.instance.lstDirecciones = this.lstDirecciones;
    componenteEquipoElectronicoRef.instance.listaEquipoElectronico = this.listaEquipoElectronico;
    componenteEquipoElectronicoRef.instance.lstRamos = this.lstRamos;
    componenteEquipoElectronicoRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION EQUIPO ELECTRONICO

  //GESTION ROTURA DE MAQUINARIA
  public generarComponenteRoturaMaquinaria() {
    this.entradaRoturaMaquinaria.clear();
    const factory = this.resolver.resolveComponentFactory(RoturaMaquinariaComponente);
    const componenteRoturaMaquinariaRef = this.entradaRoturaMaquinaria.createComponent(factory);
    componenteRoturaMaquinariaRef.instance.lstDirecciones = this.lstDirecciones;
    componenteRoturaMaquinariaRef.instance.listaRoturaMaquinaria = this.listaRoturaMaquinaria;
    componenteRoturaMaquinariaRef.instance.listaIncendio = this.listaIncendio;
    componenteRoturaMaquinariaRef.instance.limiteRoturaMaquinariaSeleccion = this.limiteRoturaMaquinariaSeleccion;
    componenteRoturaMaquinariaRef.instance.lstRamos = this.lstRamos;
    componenteRoturaMaquinariaRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION ROTURA DE MAQUINARIA

  //GESTION LUCRO ROTURA DE MAQUINARIA
  public generarComponenteLucroRoturaMaquinaria() {
    this.entradaLucroRoturaMaquinaria.clear();
    const factory = this.resolver.resolveComponentFactory(LucroRoturaMaqunariaComponente);
    const componenteLucroRoturaMaquinariaRef = this.entradaLucroRoturaMaquinaria.createComponent(factory);
    componenteLucroRoturaMaquinariaRef.instance.lstDirecciones = this.lstDirecciones;
    componenteLucroRoturaMaquinariaRef.instance.listaLucroRoturaMaquinaria = this.listaLucroRoturaMaquinaria;
    componenteLucroRoturaMaquinariaRef.instance.lstRamos = this.lstRamos;
    componenteLucroRoturaMaquinariaRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION LUCRO ROTURA DE MAQUINARIA

  //GESTION LUCRO INCENDIOS
  public generarComponenteLucroIncendio() {
    this.entradaLucroIncendio.clear();
    const factory = this.resolver.resolveComponentFactory(LucroIncedioComponente);
    const componenteLucroIncendioRef = this.entradaLucroIncendio.createComponent(factory);
    componenteLucroIncendioRef.instance.lstDirecciones = this.lstDirecciones;
    componenteLucroIncendioRef.instance.listaLucroIncendio = this.listaLucroIncendio;
    componenteLucroIncendioRef.instance.lstRamos = this.lstRamos;
    componenteLucroIncendioRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION LUCRO INCENDIOS

  //INICIO GESTION ROBO Y ASALTO
  public generarComponenteRoboAsalto() {
    this.entradaRoboAsalto.clear();
    const factory = this.resolver.resolveComponentFactory(RoboAsaltoComponente);
    const componenteRoboAsaltoRef = this.entradaRoboAsalto.createComponent(factory);
    componenteRoboAsaltoRef.instance.lstDirecciones = this.lstDirecciones;
    componenteRoboAsaltoRef.instance.listaRoboAsalto = this.listaRoboAsalto;
    componenteRoboAsaltoRef.instance.lstRamos = this.lstRamos;
    componenteRoboAsaltoRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION ROBO Y ASALTO

  //INICIO GESTION DINERO Y VALORES
  public generarComponenteDineroValores() {
    this.entradaDineroValores.clear();
    const factory = this.resolver.resolveComponentFactory(DineroValoresComponente);
    const componenteDineroValoresRef = this.entradaDineroValores.createComponent(factory);
    componenteDineroValoresRef.instance.lstDirecciones = this.lstDirecciones;
    componenteDineroValoresRef.instance.listaDineroValores = this.listaDineroValores;
    componenteDineroValoresRef.instance.lstRamos = this.lstRamos;
    componenteDineroValoresRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION DINERO Y VALORES

  //INICIO GESTION EQUIPO Y MAQUINARIA
  public generarComponenteEquipoMaquinaria() {
    this.entradaEquipoMaqunaria.clear();
    const factory = this.resolver.resolveComponentFactory(EquipoMaquinariaComponente);
    const componenteEquipoMaqunariaRef = this.entradaEquipoMaqunaria.createComponent(factory);
    componenteEquipoMaqunariaRef.instance.lstDirecciones = this.lstDirecciones;
    componenteEquipoMaqunariaRef.instance.listaEquipoMaquinaria = this.listaEquipoMaquinaria;
    componenteEquipoMaqunariaRef.instance.lstRamos = this.lstRamos;
    componenteEquipoMaqunariaRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION EQUIPO Y MAQUINARIA

  // INICIO COBERTURAS ADICIONALES
  public generarComponenteCoberturasAdicionales() {
    this.entradaCoberturasAdicionales.clear();
    const factory = this.resolver.resolveComponentFactory(CoberturasAdicionalesComponente);
    const componenteCoberturasAdicionalesRef = this.entradaCoberturasAdicionales.createComponent(factory);
    componenteCoberturasAdicionalesRef.instance.lstDirecciones = this.lstDirecciones;
    componenteCoberturasAdicionalesRef.instance.listaCoberturasAdicionalesMR = this.listaCoberturasAdicionalesMR;
    componenteCoberturasAdicionalesRef.instance.lstRamos = this.lstRamos;
    componenteCoberturasAdicionalesRef.instance.riesgo = this.empresa.Riesgo + "";
    componenteCoberturasAdicionalesRef.instance.identificadorGuardado = this.identificadorGuardado;
  }
  // FIN COBERTURAS ADICIONALES

  //INICIO GESTION RESPONSABILIDAD CIVIL
  public generarComponenteResponsabilidadCivil() {
    this.entradaResponsabilidadCivil.clear();
    const factory = this.resolver.resolveComponentFactory(ResponsabilidadCivilComponente);
    const componenteResponsabilidadCivilRef = this.entradaResponsabilidadCivil.createComponent(factory);
    componenteResponsabilidadCivilRef.instance.lstDirecciones = this.lstDirecciones;
    componenteResponsabilidadCivilRef.instance.listaResponsabilidadCivil = this.listaResponsabilidadCivil;
    componenteResponsabilidadCivilRef.instance.lstRamos = this.lstRamos;
    componenteResponsabilidadCivilRef.instance.riesgo = this.empresa.Riesgo + "";
    componenteResponsabilidadCivilRef.instance.identificadorGuardado = this.identificadorGuardado;
    componenteResponsabilidadCivilRef.instance.lstReglasAdicionales = this.listaRamosSubRamosReglasAdicionales;
  }
  // FIN GESTION RESPONSABILIDAD CIVIL

  //INICIO GESTION FIDELIDAD
  public generarComponenteFidelidad() {
    this.entradaFidelidad.clear();
    const factory = this.resolver.resolveComponentFactory(FidelidadComponente);
    const componenteFidelidadRef = this.entradaFidelidad.createComponent(factory);
    componenteFidelidadRef.instance.lstDirecciones = this.lstDirecciones;
    componenteFidelidadRef.instance.listaFidelidad = this.listaFidelidad;
    componenteFidelidadRef.instance.lstRamos = this.lstRamos;
    componenteFidelidadRef.instance.riesgo = this.empresa.Riesgo + "";
  }
  // FIN GESTION FIDELIDAD

  //INICIO GESTION ACCIDENTES PERSONALES
  public generarComponenteAccidentesPersonales() {
    this.entradaAcidentesPersonales.clear();
    const factory = this.resolver.resolveComponentFactory(AccidentesPersonalesComponente);
    const componenteAcidentesPersonalesRef = this.entradaAcidentesPersonales.createComponent(factory);
    componenteAcidentesPersonalesRef.instance.lstDirecciones = this.lstDirecciones;
    componenteAcidentesPersonalesRef.instance.listaAccidentesPersonales = this.listaAccidentesPersonales;
    componenteAcidentesPersonalesRef.instance.listaRamosSubRamosReglasAdicionales = this.listaRamosSubRamosReglasAdicionales;
    componenteAcidentesPersonalesRef.instance.lstRamos = this.lstRamos;
    componenteAcidentesPersonalesRef.instance.riesgo = this.empresa.Riesgo + "";
    componenteAcidentesPersonalesRef.instance.identificadorGuardado = this.identificadorGuardado;
  }
  // FIN GESTION ACCIDENTES PERSONALES

  //INICIO GESTION TRANSPORTE INTERNO
  public generarComponenteTrasportes() {
    this.entradaTransportes.clear();
    const factory = this.resolver.resolveComponentFactory(TransportesComponente);
    const componenteTransportesRef = this.entradaTransportes.createComponent(factory);
    componenteTransportesRef.instance.lstDirecciones = this.lstDirecciones;
    componenteTransportesRef.instance.listaTransportes = this.listaTransportes;
    componenteTransportesRef.instance.listaSubRamoTransporte = this.listaSubRamoTransporte;
    componenteTransportesRef.instance.lstRamos = this.lstRamos;
    componenteTransportesRef.instance.riesgo = this.empresa.Riesgo + "";
    componenteTransportesRef.instance.identificadorGuardado = this.identificadorGuardado;
  }
  // FIN GESTION TRANSPORTE INTERNO


  //INICIO GESTION TRANSPORTE IMPORTACIONES
  public generarComponenteTransporteImportaciones() {
    this.entradaTransporteImportaciones.clear();
    const factory = this.resolver.resolveComponentFactory(TransportesImportacionesComponente);
    const componenteTransporteImportacionesRef = this.entradaTransporteImportaciones.createComponent(factory);
    componenteTransporteImportacionesRef.instance.lstDirecciones = this.lstDirecciones;
    componenteTransporteImportacionesRef.instance.listaTransportes = this.listaTransporteImportaciones;
    componenteTransporteImportacionesRef.instance.listaSubRamoTransporte = this.listaSubRamoTransporte;
    componenteTransporteImportacionesRef.instance.lstRamos = this.lstRamos;
    componenteTransporteImportacionesRef.instance.riesgo = this.empresa.Riesgo + "";
    componenteTransporteImportacionesRef.instance.identificadorGuardado = this.identificadorGuardado;
  }
  // FIN GESTION TRANSPORTE IMPORTACIONES

  //INICIO GESTION VEHICULOS
  public generarComponenteVehiculos() {
    this.entradaVehiculos.clear();
    const factory = this.resolver.resolveComponentFactory(VehiculosComponente);
    this.componenteVehiculosRef = this.entradaVehiculos.createComponent(factory);
    this.componenteVehiculosRef.instance.lstDirecciones = this.lstDirecciones;
    this.componenteVehiculosRef.instance.listaVehiculos = this.listaVehiculos;
    this.componenteVehiculosRef.instance.listaTasasVehiculos = this.listaTasasVehiculos;
    this.componenteVehiculosRef.instance.lstRamos = this.lstRamos;
    this.componenteVehiculosRef.instance.riesgo = this.empresa.Riesgo;
    this.componenteVehiculosRef.instance.listaDetallesVehiculos = this.listaDetallesVehiculos;
    this.componenteVehiculosRef.instance.numeroDetalleVehiculos = this.numeroDetalleVehiculos;
    this.componenteVehiculosRef.instance.maximoVehiculoValor = this.maximoVehiculoValor;
    this.componenteVehiculosRef.instance.maximoVehiculoDispositivo = this.maximoVehiculoDispositivo;
    this.componenteVehiculosRef.instance.listaDerechosEmision = this.listaDerechosEmision;
    this.componenteVehiculosRef.instance.listaCalculablesCotizacion = this.listaCalculablesCotizacion;

  }

  //INICIO GESTION MOTOS
  public generarComponenteMotos() {
    this.entradaMotos.clear();
    const factory = this.resolver.resolveComponentFactory(VehiculosComponente);
    this.componenteMotosRef = this.entradaVehiculos.createComponent(factory);
    this.componenteMotosRef.instance.lstDirecciones = this.lstDirecciones;
    this.componenteMotosRef.instance.listaVehiculos = this.listaVehiculos;
    this.componenteMotosRef.instance.listaTasasVehiculos = this.listaTasasVehiculos;
    this.componenteMotosRef.instance.lstRamos = this.lstRamos;
    this.componenteMotosRef.instance.riesgo = this.empresa.Riesgo;
    this.componenteMotosRef.instance.listaDetallesVehiculos = this.listaDetallesVehiculos;
    this.componenteMotosRef.instance.numeroDetalleVehiculos = this.numeroDetalleVehiculos;
    this.componenteMotosRef.instance.maximoVehiculoValor = this.maximoVehiculoValor;
    this.componenteMotosRef.instance.maximoVehiculoDispositivo = this.maximoVehiculoDispositivo;
  }

  public generarVectorDinamico() {
    var lista = [{ text: 0, value: 0 }, { text: 1, value: 1 }, { text: 2, value: 2 }, { text: 3, value: 3 }, { text: 4, value: 4 }];
    if (this.listaDetallesVehiculos.length < 15) {
      this.listaDetallesVehiculos.push({ "id": (this.listaDetallesVehiculos.length + 1), "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" });
      this.componenteVehiculosRef.instance.generarListaVehiculos(this.listaDetallesVehiculos);
    }
  }

  public eliminarVehiculo(id) {
    var eliminarMarcadorVector = function (lista) {
      var items = [];
      lista.map((e) => { items.push(e.id); });
      var posicion = items.indexOf(id);

      if (posicion > -1) {
        lista.splice(posicion, 1);
      }
    }
    eliminarMarcadorVector(this.listaDetallesVehiculos);
    this.ordenarListaVehiculos();
    this.gestionPanelesRamos('vehiculos');
  }

  public ordenarListaVehiculos() {
    var contador = 0;
    for (let vehiculos of this.listaDetallesVehiculos) {
      contador++;
      vehiculos.id = contador;
    }
  }
  // FIN GESTION VEHICULOS

  //GUARDAR COTIZACION

  public verificarEstadoPagoCotizacion() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/cotizacion/buscar/estado/" + this.codigoCotizacion.idCotizacion, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.estadoCotizacion = res.Estado;
        if (res.Estado == 4 || res.Estado == 5) {
          if (this.numeroPolizasEmitidas == 0) {
            Swal.fire({
              html: "<div style='text-align: center; font-size: 18px;'><b>NOTA ACLARATORIA</b><br></div><div style='font-size: 14px; text-align: justify'; padding: 50px; color: black><br>No se requiere inspección para la suscripción de programas de seguros cuya prima sea igual o menor a $ 5.000,00,  sin embargo la compañía podrá realizar inspecciones aleatorias a cualquier riesgo cuya prima sea igual o mayor a este valor y solicitar la implementación de garantías, inclusive después de emitidas las pólizas</div>",
              showCancelButton: false,
              confirmButtonColor: "rgb(" + this.usuario.broker.Color + ")",
              cancelButtonColor: '#d33',
              cancelButtonText: "Cancelar",
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.gestioPanelGlobal('Emision');
              }
            });
          } else {
            this.gestioPanelGlobal('Emision');
          }

        }
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al verificar el estado de la cotización", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
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
        this.valCotizador.mostrarAlertaCorrecta("Notificación enviada correctamente al correo electrónico del cliente.", this.usuario.broker.Color);
        console.log(res)
      },
      err => {
        this.spinner.hide();
        this.valCotizador.mostrarAlerta("Problemas con el envío de correos, intentelo nuevamente.", this.usuario.broker.Color);
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  //GESTION FORMA PAGO



  public adjuntarArchivoPagoOtros() {

    var files = $("#file").prop('files');

    var idFormaPago = this.FormaPago.IdFormaPago;
    var tipo_ = this.FormaPago.TipoOtros;
    var conexion = this.conexion;
    var uid = this.usuario.Uid;
    var spinner = this.spinner;
    var resultado: any;
    var datos: any;
    var tipo: any;

    var reader = new FileReader();


    var insertar = function (adjunto, adjuntoTipo, idFormaPago, conexion, uid, spinner, valCotizador, color, tipo_) {
      spinner.show();
      var datos = {
        "Adjunto": adjunto,
        "IdFormaPago": idFormaPago,
        "AdjuntoTipo": adjuntoTipo,
        "Tipo": tipo_
      }

      conexion.post("Broker/SBroker.svc/cotizacion/forma/pago/archivo", datos, uid).subscribe(
        (res: any) => {
          spinner.hide();
          console.log(res);
          valCotizador.mostrarAlertaCorrecta("Los datos se han guardado exitosamente.", color);
        },
        err => {
          spinner.hide();
          valCotizador.mostrarAlerta("Error al guardar el archivo seleccionado.", color);
          console.log(err);
          conexion.error(err);
        }
      );
    };

    if (this.FormaPago.TipoOtros == "CONTADO") {
      insertar("", "", idFormaPago, conexion, uid, spinner, this.valCotizador, this.usuario.broker.Color, tipo_);
    } else if (files.length > 0 && this.FormaPago.TipoOtros == "DÉBITO BANCARIO") {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        resultado = reader.result;
        datos = files[0].name;
        tipo = datos.split(".");

        insertar(resultado, tipo[1], idFormaPago, conexion, uid, spinner, this.valCotizador, this.usuario.broker.Color, tipo_);

        this.FormaPago.AdjuntoTipo = tipo[1];
        this.FormaPago.Adjunto = resultado;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    } else {
      console.log("NO")
    }

  }

  public verArchivoPagoOtros(url) {
    return this.dom.bypassSecurityTrustUrl(url);
  }

  public consultarAsegurado(valor) {

    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/empresa/persona/servicio/consultar/" + (valor == 1 ? this.contratante.Cedula : this.pagadores.Cedula), this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        var datos = JSON.parse(res);

        if (valor == 1) {
          this.activacionCamposContratante = this.contratante.Cedula.length;
          if (datos.Respuesta == null) {
            this.valCotizador.mostrarAlerta("No encontro ninguna información con el número de documento proporcionado en el contratante, ingrese manualmente los datos.", this.usuario.broker.Color);
            this.datosContratante = null;

            this.contratante.Nombre = "";
            this.contratante.PrimerApellido = "";
            this.contratante.SegundoApellido = "";
            this.contratante.Direccion = "";
            this.contratante.Telefono = "";
            this.contratante.Email = "";
            this.contratante.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;

          } else {

            this.contratante.Nombre = "";
            this.contratante.PrimerApellido = "";
            this.contratante.SegundoApellido = "";
            this.contratante.Direccion = "";
            this.contratante.Telefono = "";
            this.contratante.Email = "";

            var cliente = datos.Respuesta[0];
            this.datosContratante = cliente;
            this.contratante.Nombre = cliente.cli_nombre;
            this.contratante.PrimerApellido = cliente.cli_apellido1;
            this.contratante.SegundoApellido = cliente.cli_apellido2;
            this.contratante.Direccion = cliente.cli_dir_detalle;
            this.contratante.Telefono = cliente.cli_telef_celular;
            this.contratante.Email = cliente.cli_email;
            this.contratante.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;
          }
        } else if (valor == 2) {
          this.activacionCamposPagador = this.pagadores.Cedula.length;
          if (datos.Respuesta == null) {
            this.valCotizador.mostrarAlerta("No encontro ninguna información con el número de documento proporcionado en el pagador, ingrese manualmente los datos.", this.usuario.broker.Color);
            this.datosPagador = null;

            this.pagadores.Nombre = "";
            this.pagadores.PrimerApellido = "";
            this.pagadores.SegundoApellido = "";
            this.pagadores.Direccion = "";
            this.pagadores.Telefono = "";
            this.pagadores.Email = "";
            this.pagadores.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;

          } else {

            this.pagadores.Nombre = "";
            this.pagadores.PrimerApellido = "";
            this.pagadores.SegundoApellido = "";
            this.pagadores.Direccion = "";
            this.pagadores.Telefono = "";
            this.pagadores.Email = "";

            var cliente = datos.Respuesta[0];
            this.datosPagador = cliente;
            this.pagadores.Nombre = cliente.cli_nombre;
            this.pagadores.PrimerApellido = cliente.cli_apellido1;
            this.pagadores.SegundoApellido = cliente.cli_apellido2;
            this.pagadores.Direccion = cliente.cli_dir_detalle;
            this.pagadores.Telefono = cliente.cli_telef_celular;
            this.pagadores.Email = cliente.cli_email;
            this.pagadores.Cotizacion.IdCotizacion = this.codigoCotizacion.idCotizacion;
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

  //********** INICIO GUARDAR COTIZACION ***********/
  public actualizarEmpresa(Seleccion) {
    this.spinner.show();
    var parametros = {
      "Identificador": 2,
      "IdEmpresa": this.empresa.IdEmpresa,
      "IdCatalogoEmpresa": this.empresa.IdCatalogoEmpresa,
      "Telefono": this.empresa.Telefono.trim(),
      "Email": this.empresa.Email,
      "Codigo": this.empresa.Codigo,
      "Riesgo": this.empresa.Riesgo,
      "Ruc": this.empresa.Ruc,
      "RazonSocial": this.empresa.Nombre.trim() + " " + this.empresa.PrimerApellido.trim() + " " + this.empresa.SegundoApellido.trim(),
      "Nombre": this.empresa.Nombre.trim(),
      "PrimerApellido": this.empresa.PrimerApellido.trim(),
      "SegundoApellido": this.empresa.SegundoApellido.trim(),
      "GiroNegocio": this.empresa.GiroNegocio.trim(),
      "SectorEconomico": this.empresa.SectorEconomico,
      "Siniestralidad": "",
      "CodigoAsegurado": "",
      "Direccion": this.empresa.Direccion
    };
    this.conexion.post('Broker/SBroker.svc/empresa/guardar/registro', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.guardarContratante(Seleccion);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public guardarContratante(Seleccion) {
    if (this.identificadorGuardado == 1) {
      this.contratante.Identificador = 2;
    }

    this.contratante.Cedula = this.empresa.Ruc;
    this.contratante.Nombre = this.empresa.Nombre;
    this.contratante.PrimerApellido = this.empresa.PrimerApellido;
    this.contratante.SegundoApellido = this.empresa.SegundoApellido;
    this.contratante.Direccion = this.empresa.Direccion;
    this.contratante.Email = this.empresa.Email;
    this.contratante.Cotizacion.IdCotizacion = this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion;

    this.spinner.show();
    this.gestionCotizacion.gestionContratante(this.contratante).then(id => {
      this.spinner.hide();
      this.guardarPagador(id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
    });

  }

  public guardarPagador(IdContratante, Seleccion) {
    if (this.identificadorGuardado == 1) {
      this.pagadores.Identificador = 2;
    }
    this.pagadores.Cotizacion.IdCotizacion = this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion;
    this.spinner.show();
    this.gestionCotizacion.gestionPagador(this.pagadores).then(id => {
      this.spinner.hide();
      this.guardarDirecciones(IdContratante, id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarDirecciones(IdContratante, IdPagador, Seleccion) {
    var contenidos: any;
    if (this.identificadorGuardado == 0) {
      contenidos = {
        "Identificador": 1,
        "IdDireccion": 0,
        "DatosDireccion": JSON.stringify(this.lstDirecciones),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
      }
    } else if (this.identificadorGuardado == 1) {
      contenidos = {
        "Identificador": 2,
        "IdDireccion": parseInt(this.contenido.IdDireccion),
        "DatosDireccion": JSON.stringify(this.lstDirecciones),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion }
      }
    }

    this.spinner.show();
    this.gestionCotizacion.gestionDireciones(contenidos).then(id => {
      this.spinner.hide();
      this.guardarVehiculos(IdContratante, IdPagador, id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarVehiculos(IdContratante, IdPagador, IdDireccion, Seleccion) {
    var contenidos: any;
    if (this.identificadorGuardado == 0) {
      contenidos = {
        "Identificador": 1,
        "IdVehiculos": 0,
        "DatosVehiculo": JSON.stringify(this.listaDetallesVehiculos),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
      }
    } else if (this.identificadorGuardado == 1) {
      contenidos = {
        "Identificador": 2,
        "IdVehiculos": parseInt(this.contenido.IdVehiculos),
        "DatosVehiculo": JSON.stringify(this.listaDetallesVehiculos),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion }
      }
    }

    this.spinner.show();
    this.gestionCotizacion.gestionVehiculos(contenidos).then(id => {
      this.spinner.hide();
      this.guardarComplementoCotizacion(IdContratante, IdPagador, IdDireccion, id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarComplementoCotizacion(IdContratante, IdPagador, IdDireccion, IdVehiculos, Seleccion) {
    var contenidos: any;
    if (this.identificadorGuardado == 0) {
      contenidos = {
        "Identificador": 1,
        "IdContenido": 0,
        "DatosCotizador": JSON.stringify(this.lstRamos),
        "DatosGarantias": "",
        "DatosCondiciones": "",
        "Lista": JSON.stringify(this.valDiseno.panelesValoresRamos),
        "VistaEstado": JSON.stringify(this.valDiseno.panelesVistaRamos),
        "VistaDiseno": JSON.stringify(this.valDiseno.panelesRamos),
        "VistaValores": JSON.stringify(this.valDiseno.panelesValoresRamos),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
      }
    } else if (this.identificadorGuardado == 1) {
      contenidos = {
        "Identificador": 4,
        "IdContenido": parseInt(this.contenido.IdContenido),
        "DatosCotizador": JSON.stringify(this.lstRamos),
        "DatosGarantias": "",
        "DatosCondiciones": "",
        "Lista": JSON.stringify(this.valDiseno.panelesValoresRamos),
        "VistaEstado": JSON.stringify(this.valDiseno.panelesVistaRamos),
        "VistaDiseno": JSON.stringify(this.valDiseno.panelesRamos),
        "VistaValores": JSON.stringify(this.valDiseno.panelesValoresRamos),
        "Cotizacion": { "IdCotizacion": this.codigoCotizacion == undefined ? 0 : this.codigoCotizacion.idCotizacion }
      }
    }

    this.spinner.show();
    this.gestionCotizacion.gestionContenido(contenidos).then(id => {
      this.spinner.hide();
      this.guardarCotizacion(IdContratante, IdPagador, IdDireccion, IdVehiculos, id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarCotizacion(IdContratante, IdPagador, IdDireccion, IdVehiculos, IdContenido, Seleccion) {
    var estado = 0;
    if (this.identificadorGuardado == 0) {
      estado = 2;
    } else if (this.identificadorGuardado == 1) {
      estado = this.estadoCotizacion;
    }

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

    var contenido = {
      "Identificador": 2,
      "IdCotizacion": this.codigoCotizacion.idCotizacion,
      "PrimaNetaIva12": (this.cotizacionTotal.primaNetaIva12),
      "PrimaNetaIva0": (this.cotizacionTotal.primaNetaIva0),
      "PrimaNetaTotal": (this.cotizacionTotal.primaNetaTotal),
      "ImpuestoSBS": (this.cotizacionTotal.impuestoSBS),
      "ImpuestoCampesino": (this.cotizacionTotal.seguroCampesino),
      "DerechosEmision": (this.cotizacionTotal.derechosEmision),
      "Iva": (this.cotizacionTotal.iva),
      "PrimaTotal": (this.cotizacionTotal.primaTotal),
      "Broker": { "IdBroker": 0 },
      "Codigo": "",
      "Estado": estado,
      "IdUsuario": 0,
      "Empresa": { "IdEmpresa": 0 },
      "Corredor": JSON.stringify(Corredor),
    };

    this.spinner.show();
    this.gestionCotizacion.gestionCotizacion(contenido).then(id => {
      this.spinner.hide();
      this.guardarCotizacionResultado(IdContratante, IdPagador, IdDireccion, IdVehiculos, IdContenido, id, Seleccion);
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarCotizacionResultado(IdContratante, IdPagador, IdDireccion, IdVehiculos, IdContenido, IdCotizacion, Seleccion) {

    var contenido = {
      Identificador: 11,
      IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado,
      Cotizacion: {
        IdCotizacion: this.codigoCotizacion.idCotizacion,
      },
      EstadoAccidentesPersonales: 0,
      EstadoEquipoMaquinaria: 0,
      EstadoFidelidad: 0,
      EstadoGlobal: 0,
      EstadoMultiriesgo: 0,
      EstadoPagoGlobal: 0,
      EstadoResponsabilidadCivil: 0,
      EstadoTransImportaciones: 0,
      EstadoTransInterno: 0,
      EstadoVehiculos: 0,
      IdPvAccidentesPersonales: "",
      IdPvEquipoMaquinaria: "",
      IdPvFidelidad: "",
      IdPvMultiriesgo: "",
      IdPvResponsabilidadCivil: "",
      IdPvTransImportaciones: "",
      IdPvTransInterno: "",
      IdPvVehiculos: "",
      FechaEmision: ""
    }

    this.spinner.show();
    this.gestionCotizacion.gestionCotizacionResultado(contenido).then(id => {
      this.spinner.hide();

      this.guardarCotizacionCompromiso(IdContratante, IdPagador, IdDireccion, IdVehiculos, IdContenido, IdCotizacion, Seleccion);

    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public guardarCotizacionCompromiso(IdContratante, IdPagador, IdDireccion, IdVehiculos, IdContenido, IdCotizacion, Seleccion) {

    this.spinner.show();
    this.generico.listarAgentes(this.sucursal_.TipoAgente).then(lista => {
      this.spinner.hide();
      var agentenombre = "";

      for (let agente of lista) {
        if (agente.codigoAgente == this.sucursal_.Agente) {
          agentenombre = agente.nombreAgente;
        }
      }

      var datos = {
        UsuarioCodigo: "USRPYMES",
        ClienteIdentificacion: this.empresa.Ruc,
        NegocioCodigo: "Y",
        AgenteCodigo: this.sucursal_.Agente,
        AgenteTipoCodigo: this.sucursal_.TipoAgente,
        CotizacionNumero: this.numeroCotizacion,
        SucursalCodigo: this.sucursal_.Sucursal,
        VigenciaDesde: moment(this.vigenciaCotizacion).format("YYYY-MM-DD"),
        VigenciaHasta: moment(this.vigenciaCotizacion).add(30, "days").format("YYYY-MM-DD"),
        PagadorIdentificacion: this.pagadores.Cedula,
        OperacionCodigo: 1,
        Notas: "\nSe registra compromiso con el agente "
          + this.globales.limpiarDireccion(agentenombre)
          + ", en la línea de negocio PYMES.\nLos ramos cotizados son los siguientes: "
          + JSON.stringify(this.valDiseno.panelesValoresRamos),
      }

      var valores = {
        SumaAsegurada: 0,
        Tasa: 0,
        PrimaNeta: 0,
        PrimaTotal: this.cotizacionTotal.primaTotal,
      }

      var xml = {
        XMLCompromiso: this.generadorCompromiso.generarXML(datos, valores)
      };

      this.spinner.show();
      this.gestionCotizacion.guardarCotizacionCompromiso(xml).then(res => {
        this.spinner.hide();
        console.log(res);

        this.identificadorGuardado = 1;
        this.kcontenido.registrarKeyContenido({ IdDireccion: IdDireccion, IdVehiculos: IdVehiculos, IdContenido: IdContenido, IdCotizacion: this.codigoCotizacion.idCotizacion });
        var router: any = this.router;

        if (Seleccion.Identificador == 1) {
          this.globales.mostrarNotificacion("Datos Actualizados Exitosamente", "success", "bottom");
        } else if (Seleccion.Identificador == 2) {
          this.globales.mostrarNotificacion("Datos Actualizados Exitosamente", "success", "bottom");
          this.obtenerCodigosAsegurados(Seleccion.Ramo);
        } else if (Seleccion.Identificador == 3) {
          this.globales.mostrarNotificacion("Datos Actualizados Exitosamente", "success", "bottom");
          if (this.tipoPago == 1) {
            this.conductoEmision = 185;
            this.tppagoEmision = 94;
            this.obtenerPagoTarjeta();
          } else if (this.tipoPago == 2) {
            this.conductoEmision = 185;
            this.tppagoEmision = 94;
            this.obtenerPagoTarjeta();
          } else if (this.tipoPago == 3) {
            this.conductoEmision = 1;
            this.tppagoEmision = 1;
            this.generarPagoContado(3);
          } else if (this.tipoPago == 4) {
            this.generarPagoDebitoBancario(this.tipoPago);
            this.conductoEmision = this.DebitoBancario.Banco;
            this.tppagoEmision = this.DebitoBancario.Cuotas;
          }
        } else {
          Swal.fire({
            title: 'Cotización',
            html: "La cotización se ha generado exitosamente.",
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            onClose: function (res) {
              router.navigate(['/cliente/cotizacion/garantias']);
            }
          });
        }

      }).catch(err => {
        this.spinner.hide();
        console.log(err);
      });

    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //********** FIN GUARDAR COTIZACION ***********/

  //*****  INICIO GENERAR POLIZAS  *****/

  public emitirPoliza(Ramo) {
    var datos = {
      Identificador: 2,
      Ramo: Ramo
    }

    var fechaSeleccionada = moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD");
    var fechaAcual = moment().format("YYYY-MM-DD");

    if (this.sucursal_.Agente != "99" && this.sucursal_.Comision == 0) {
      this.globales.mostarAlertaTiempo("", "La comisión del corredor con código " + this.sucursal_.Agente + " no debe ser 0%, por favor comuniquese con su ejecutivo de cuenta.", "info");
    } else {
      if (this.numeroPolizasEmitidas == 0) {
        if (fechaSeleccionada < fechaAcual) {

          Swal.fire({
            type: "info",
            text: "El asegurado declara que no ha tenido siniestros ocurridos, conocidos ni reportados a la fecha de la emisión del presente programa de seguros.",
            showCancelButton: true,
            confirmButtonColor: "rgb(" + this.usuario.broker.Color + ")",
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.actualizarEmpresa(datos);
            }
          });

        } else {
          this.actualizarEmpresa(datos);
        }
      } else {
        this.actualizarEmpresa(datos);
      }
    }

  }

  public obtenerCodigosAsegurados(Ramo) {

    this.bloqueoEmision = true;

    if (this.tipoPago == 1) {
      this.conductoEmision = 185;
      this.tppagoEmision = 94;
    } if (this.tipoPago == 2) {
      this.conductoEmision = 185;
      this.tppagoEmision = 94;
    } else if (this.tipoPago == 3) {
      this.conductoEmision = 1;
      this.tppagoEmision = 1;
    } else if (this.tipoPago == 4) {
      this.conductoEmision = this.DebitoBancario.Banco;
      this.tppagoEmision = this.DebitoBancario.Cuotas;
    }

    var tarjeta = this.globales.obtenerDatosTarjeta(this.FormaPago.Plataforma, this.FormaPago.Trama);

    if (this.tipoPago == 4) {
      this.binEmision = this.DebitoBancario.NumeroCuenta;
      this.vencimientoEmision = "0";
    } else {
      this.binEmision = tarjeta.bin;
      this.vencimientoEmision = tarjeta.vencimiento;
    }

    var DatosEmpresa = {
      DocumentoCliente: this.empresa.Ruc,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.empresa.Email,
      NombreCliente: this.globales.limpiar(this.empresa.RazonSocial),
      EnviarEmail: 1
    };

    var DatosContratante = {
      DocumentoCliente: this.empresa.Ruc,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.empresa.Email,
      NombreCliente: this.globales.limpiar(this.empresa.RazonSocial),
      EnviarEmail: 1
    };

    var DatosPagador = {
      DocumentoCliente: this.pagadores.Cedula,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.pagadores.Email,
      NombreCliente: this.globales.limpiar(this.pagadores.Nombre),
      EnviarEmail: 1
    };

    this.spinner.show();
    this.generico.consultarCodigoAsegurado(DatosEmpresa.DocumentoCliente).then(res => {
      this.spinner.hide();
      if (res != "-1") {
        this.codigoAsegurado = res;
        this.spinner.show();
        this.generico.consultarCodigoAsegurado(DatosContratante.DocumentoCliente).then(res => {
          this.spinner.hide();
          if (res != "-1") {
            this.codigoAseguradoContratratante = res;
            this.spinner.show();
            this.generico.consultarCodigoAsegurado(DatosPagador.DocumentoCliente).then(res => {
              this.spinner.hide();
              if (res != "-1") {
                this.codigoAseguradoPagador = res;

                if (Ramo == "MULTI") {
                  this.generarPolizaMultiriesgo(DatosEmpresa, DatosContratante, DatosPagador);
                } else if (Ramo == "EM") {
                  this.generarPolizaEquipoMaquinaria(DatosEmpresa, DatosContratante, DatosPagador);
                } else if (Ramo == "RC") {
                  this.generarPolizaResponsabilidadCivil(DatosEmpresa, DatosContratante, DatosPagador)
                } else if (Ramo == "FI") {
                  this.generarPolizaFidelidad(DatosEmpresa, DatosContratante, DatosPagador);
                } else if (Ramo == "TRIN") {
                  this.generarPolizaTransporteInterno(DatosEmpresa, DatosContratante, DatosPagador);
                } else if (Ramo == "TRIM") {
                  this.generarPolizaTransporteImportaciones(DatosEmpresa, DatosContratante, DatosPagador)
                } else if (Ramo == "AP") {
                  this.generarPolizaAccidentesPersonales(DatosEmpresa, DatosContratante, DatosPagador)
                } else if (Ramo == "VH") {
                  this.generarPolizaVehiculos(DatosEmpresa, DatosContratante, DatosPagador);
                }

              } else {
                this.globales.mostrarNotificacion("No se encuentra código de pagador.", "warning", "bottom");
              }
            }).catch(err => {
              this.spinner.hide();
              this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al consultar asegurado", "error", "#E74C3C");
            });
          } else {
            this.globales.mostrarNotificacion("No se encuentra código de contratante.", "warning", "bottom");
          }
        }).catch(err => {
          this.spinner.hide();
          this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al consultar asegurado", "error", "#E74C3C");
        });
      } else {
        this.globales.mostrarNotificacion("No se encuentra código de asegurado.", "warning", "bottom");
      }
    }).catch(err => {
      this.spinner.hide();
      this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al consultar asegurado", "error", "#E74C3C");
    });
  }

  public generarPolizaMultiriesgo(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-MU-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RCA14").then(res => {
      this.spinner.hide();

      var clausulas = res;

      this.generacionIncendioTerremoto();
      this.generacionCoberturasAdicionales();

      var ramos = {
        listaIncendio: this.listaIncedioEmision,
        listaTerremoto: this.listaTerremotoEmision,
        listaEquipoElectronico: this.listaEquipoElectronico,
        listaRoturaMaquinaria: this.listaRoturaMaquinaria,
        listaRoboAsalto: this.listaRoboAsalto,
        listaDineroValores: this.listaDineroValores,
        listaCoberturasAdicionales: this.listaCoberturasAdicionalesEmision
      }

      var listaMultiriesgo = [];

      for (let subramos of ramos.listaCoberturasAdicionales) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaIncendio) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaTerremoto) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaEquipoElectronico) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaRoturaMaquinaria) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaRoboAsalto) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      for (let subramos of ramos.listaDineroValores) {
        listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
      }

      var primaMultiriesgo = {
        ubicacion1: this.generarItems(listaMultiriesgo, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
        ubicacion2: this.generarItems(listaMultiriesgo, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
        ubicacion3: this.generarItems(listaMultiriesgo, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
        ubicacion4: this.generarItems(listaMultiriesgo, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
        ubicacion5: this.generarItems(listaMultiriesgo, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
      }

      var lstRamos = {
        listaIncendio: this.listaIncendio,
        listaEquipoElectronico: this.listaEquipoElectronico,
        listaRoturaMaquinaria: this.listaRoturaMaquinaria,
        listaRoboAsalto: this.listaRoboAsalto,
        listaDineroValores: this.listaDineroValores,
        listaLucroRoturaMaquinaria: [],
        listaLucroIncendio: [],
        listaEquipoMaquinaria: [],
        listaResponsabilidadCivil: [],
        listaFidelidad: [],
        listaAccidentesPersonales: [],
        listaTransportes: [],
        listaTransporteImportaciones: [],
        listaVehiculos: [],
        listaCoberturasAdicionalesMR: [],
        listaMotos: [],
      };

      var cotizacion = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, lstRamos, true, [], "");

      this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");

      var datos = {
        certificado: Certificado,
        ramo: 34,
        fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
        fechaHasta: this.fechaEmisionVencimiento,
        sumaAsegurada: this.generador.obtenerSumaAseguradaItems(`<items>` + primaMultiriesgo.ubicacion1 + primaMultiriesgo.ubicacion2 + primaMultiriesgo.ubicacion3 + primaMultiriesgo.ubicacion4 + primaMultiriesgo.ubicacion5 + `</items>`),
        primaNetaTotal: cotizacion.primaNetaTotal,
        impuestoSBS: cotizacion.impuestoSBS,
        derechosEmision: cotizacion.derechosEmision,
        iva: cotizacion.iva,
        primaTotal: cotizacion.primaTotal,
        seguroCampesino: cotizacion.seguroCampesino,
        comision: this.sucursal_.Comision,
        codigoAgente: this.sucursal_.Agente,
        codigoTipoAgente: this.sucursal_.TipoAgente,
        sucursal: this.sucursal_.Sucursal,
        puntoVenta: this.sucursal_.PuntoVenta,
        conducto: this.conductoEmision,
        tppago: this.tppagoEmision
      }

      var pago = {
        bin: this.binEmision,
        vencimiento: this.vencimientoEmision
      }

      var clausulasEnvio = "<clausulas>" + clausulas + "</clausulas>";

      var asegurado = {
        asegurado: this.codigoAsegurado
      }

      var contratante = {
        asegurado: this.codigoAseguradoContratratante
      }

      var pagador = {
        asegurado: this.codigoAseguradoPagador
      }

      var items = `<items>` + primaMultiriesgo.ubicacion1 + primaMultiriesgo.ubicacion2 + primaMultiriesgo.ubicacion3 + primaMultiriesgo.ubicacion4 + primaMultiriesgo.ubicacion5 + `</items>`;

      var XML = this.generador.generarXML(datos, pago, clausulasEnvio, asegurado, contratante, pagador, items);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: cotizacion.primaTotal, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }
      console.log(XML);

      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, this.lstDirecciones, "MULTI", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });


  }

  public generarPolizaEquipoMaquinaria(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-EM-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("REM8").then(res => {
      this.spinner.hide();

      var itemsEquipoMaquinaria = {
        ubicacion1: this.generarItems(this.listaEquipoMaquinaria, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
        ubicacion2: this.generarItems(this.listaEquipoMaquinaria, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
        ubicacion3: this.generarItems(this.listaEquipoMaquinaria, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
        ubicacion4: this.generarItems(this.listaEquipoMaquinaria, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
        ubicacion5: this.generarItems(this.listaEquipoMaquinaria, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
      }

      var equipoMaquinaria = this.generadorXMLRamos(Certificado, 13, this.listaEquipoMaquinaria, res, 0, 0, res, itemsEquipoMaquinaria);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: equipoMaquinaria.validacion, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }
      console.log(equipoMaquinaria.xml);
      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, equipoMaquinaria.xml, Certificado, Cotizacion, this.lstDirecciones, "EM", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });

  }

  public generarPolizaResponsabilidadCivil(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-RC-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RRC9").then(res => {
      this.spinner.hide();

      var itemsresponsabilidadCivil = {
        ubicacion1: this.generarItemsRespCivil(this.listaResponsabilidadCivil, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
        ubicacion2: this.generarItemsRespCivil(this.listaResponsabilidadCivil, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
        ubicacion3: this.generarItemsRespCivil(this.listaResponsabilidadCivil, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
        ubicacion4: this.generarItemsRespCivil(this.listaResponsabilidadCivil, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
        ubicacion5: this.generarItemsRespCivil(this.listaResponsabilidadCivil, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
      }


      var responsabilidadCivil = this.generadorXMLRamos(Certificado, 10, this.listaResponsabilidadCivil, res, 0, 0, "ResponsabilidadCivil", itemsresponsabilidadCivil);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: responsabilidadCivil.validacion, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }
      console.log(responsabilidadCivil.xml);
      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, responsabilidadCivil.xml, Certificado, Cotizacion, this.lstDirecciones, "RC", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarPolizaFidelidad(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-FI-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RFI10").then(res => {
      this.spinner.hide();

      var itemsFidelidad = {
        ubicacion1: this.generarItems(this.listaFidelidad, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
        ubicacion2: this.generarItems(this.listaFidelidad, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
        ubicacion3: this.generarItems(this.listaFidelidad, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
        ubicacion4: this.generarItems(this.listaFidelidad, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
        ubicacion5: this.generarItems(this.listaFidelidad, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
      }

      var fidelidad = this.generadorXMLRamos(Certificado, 3, this.listaFidelidad, res, 0, 0, "Fidelidad", itemsFidelidad);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: fidelidad.validacion, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }
      console.log(fidelidad.xml);
      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, fidelidad.xml, Certificado, Cotizacion, this.lstDirecciones, "FI", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarPolizaAccidentesPersonales(DatosEmpresa, DatosContratante, DatosPagador) {

    var listaDirectivo = [];
    var listaAdministrativo = [];
    var listaOperativo = [];

    var Certificado = "PO-AP-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RAP12").then(res => {
      this.spinner.hide();

      var itemsAccidentesPersonales = {
        ubicacion1: this.generarItemAccidentesPersonales(this.listaAccidentesPersonales, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
        ubicacion2: this.generarItemAccidentesPersonales(this.listaAccidentesPersonales, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
        ubicacion3: this.generarItemAccidentesPersonales(this.listaAccidentesPersonales, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
        ubicacion4: this.generarItemAccidentesPersonales(this.listaAccidentesPersonales, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
        ubicacion5: this.generarItemAccidentesPersonales(this.listaAccidentesPersonales, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
      }

      var accidentesPersonales = this.generadorXMLRamos(Certificado, 25, this.listaAccidentesPersonales, res, 0, 0, "AccidentesPersonales", itemsAccidentesPersonales);

      for (let accidentes of this.listaAccidentesPersonales) {
        if (accidentes.Datos.Grupo == "Personal  Directivo") {
          listaDirectivo.push(accidentes);
        } if (accidentes.Datos.Grupo == "Personal  Administrativo") {
          listaAdministrativo.push(accidentes);
        } if (accidentes.Datos.Grupo == "Personal Operativo") {
          listaOperativo.push(accidentes);
        }
      }

      var totalDirectivo = this.general.calcularPrimaTotal(listaDirectivo);
      var totalAdministrativo = this.general.calcularPrimaTotal(listaAdministrativo);
      var totalOperativo = this.general.calcularPrimaTotal(listaOperativo);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: accidentesPersonales.validacion, GrupoDirectivo: totalDirectivo, GrupoAdministrativo: totalAdministrativo, GrupoOperativo: totalOperativo, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }

      console.log(accidentesPersonales.xml);
      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, accidentesPersonales.xml, Certificado, Cotizacion, this.lstDirecciones, "AP", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarPolizaTransporteInterno(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-TRIN-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RTR11IN").then(res => {
      this.spinner.hide();

      var itemsTransportesInterno: any;

      if (this.usuario.broker.Transporte == "0") {
        itemsTransportesInterno = {
          ubicacion1: this.generarItemsTransportePlano(this.listaTransportes, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
          ubicacion2: this.generarItemsTransportePlano(this.listaTransportes, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
          ubicacion3: this.generarItemsTransportePlano(this.listaTransportes, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
          ubicacion4: this.generarItemsTransportePlano(this.listaTransportes, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
          ubicacion5: this.generarItemsTransportePlano(this.listaTransportes, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
        }
      } else {
        itemsTransportesInterno = {
          ubicacion1: this.generarItemsTransporte(this.listaTransportes, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
          ubicacion2: this.generarItemsTransporte(this.listaTransportes, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
          ubicacion3: this.generarItemsTransporte(this.listaTransportes, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
          ubicacion4: this.generarItemsTransporte(this.listaTransportes, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
          ubicacion5: this.generarItemsTransporte(this.listaTransportes, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, "Interno", this.listaSubRamoTransporte, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
        }
      }

      var transporteInterno = this.generadorXMLRamos(Certificado, 30, this.listaTransportes, res, 0, 0, "TransporteInterno", itemsTransportesInterno);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: transporteInterno.validacion, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }
      console.log(transporteInterno.xml);

      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, transporteInterno.xml, Certificado, Cotizacion, this.lstDirecciones, "TRIN", this.empresa.Riesgo);

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarPolizaTransporteImportaciones(DatosEmpresa, DatosContratante, DatosPagador) {

    var Certificado = "PO-TRIM-" + this.globales.generarNumeroAleatorios();

    this.spinner.show();
    this.generico.consultarClausulas("RTR11IM").then(res => {
      this.spinner.hide();

      var itemsTransportesImportaciones: any;

      if (this.usuario.broker.Transporte == "0") {
        itemsTransportesImportaciones = {
          ubicacion1: this.generarItemTrasportesImportacionesPlano(this.listaTransporteImportaciones, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
          ubicacion2: this.generarItemTrasportesImportacionesPlano(this.listaTransporteImportaciones, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
          ubicacion3: this.generarItemTrasportesImportacionesPlano(this.listaTransporteImportaciones, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
          ubicacion4: this.generarItemTrasportesImportacionesPlano(this.listaTransporteImportaciones, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
          ubicacion5: this.generarItemTrasportesImportacionesPlano(this.listaTransporteImportaciones, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
        }
      } else {
        itemsTransportesImportaciones = {
          ubicacion1: this.generarItemTrasportesImportaciones(this.listaTransporteImportaciones, 1, this.lstDirecciones[0] == undefined ? '' : this.lstDirecciones[0].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoPais, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoDepartameto, this.lstDirecciones[0] == undefined ? 0 : this.lstDirecciones[0].codigoMunicipio),
          ubicacion2: this.generarItemTrasportesImportaciones(this.listaTransporteImportaciones, 2, this.lstDirecciones[1] == undefined ? '' : this.lstDirecciones[1].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoPais, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoDepartameto, this.lstDirecciones[1] == undefined ? 0 : this.lstDirecciones[1].codigoMunicipio),
          ubicacion3: this.generarItemTrasportesImportaciones(this.listaTransporteImportaciones, 3, this.lstDirecciones[2] == undefined ? '' : this.lstDirecciones[2].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoPais, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoDepartameto, this.lstDirecciones[2] == undefined ? 0 : this.lstDirecciones[2].codigoMunicipio),
          ubicacion4: this.generarItemTrasportesImportaciones(this.listaTransporteImportaciones, 4, this.lstDirecciones[3] == undefined ? '' : this.lstDirecciones[3].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoPais, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoDepartameto, this.lstDirecciones[3] == undefined ? 0 : this.lstDirecciones[3].codigoMunicipio),
          ubicacion5: this.generarItemTrasportesImportaciones(this.listaTransporteImportaciones, 5, this.lstDirecciones[4] == undefined ? '' : this.lstDirecciones[4].nombre, "Importaciones", this.listaSubRamoTransporte, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoPais, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoDepartameto, this.lstDirecciones[4] == undefined ? 0 : this.lstDirecciones[4].codigoMunicipio)
        }
      }

      var transporteImportaciones = this.generadorXMLRamos(Certificado, 2, this.listaTransporteImportaciones, res, 0, 0, "TransporteImportaciones", itemsTransportesImportaciones);

      var Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: transporteImportaciones.validacion, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      }

      console.log(transporteImportaciones.xml);
      this.poliza.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, transporteImportaciones.xml, Certificado, Cotizacion, this.lstDirecciones, "TRIM", this.empresa.Riesgo);

    }).catch(err => {
      console.log(err)
      this.spinner.hide();
    });
  }

  public generarPolizaVehiculos(DatosEmpresa, DatosContratante, DatosPagador) {

    this.tramaVehiculo = [];
    var accesorios = 0;
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var Cotizacion: any;

    for (let i = 0; i < 1; i++) {

      if (this.listaDetallesVehiculos[i].accesorios.length > 0) {
        for (let accesorio of this.listaDetallesVehiculos[i].accesorios) {
          accesorios += accesorio.imp_prima;
        }
      }

      var cotizacion = this.general.calcularCotizacionVehiculos(this.listaDetallesVehiculos[i].valorTotal, this.listaDetallesVehiculos[i].tasa, this.listaDerechosEmision, this.listaCalculablesCotizacion, this.listaDetallesVehiculos[i].valorPrimaPolizaDeducibles, accesorios);

      var codigos = this.listaDetallesVehiculos[i].cobertura;
      Cotizacion = {
        IdContenido: this.contenido.IdContenido, IdCotizacion: this.contenido.IdCotizacion, IdDireccion: this.contenido.IdDireccion, IdVehiculos: this.contenido.IdVehiculos, IdEmpresa: this.codigoCotizacion.idEmpresa, IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        , Total: cotizacion.primaTotal, Transportes: this.usuario.broker.Transporte, FechaEmision: moment(this.fechaEmisionVigenciaSeleccionada).format("YYYY-MM-DD")
      };


      if (this.listaDetallesVehiculos[i].accesorios.length == 0) {
        this.tramaVehiculo.push({
          "grupo_endoso": 1,
          "poliza": "0",
          "id_certificado": this.listaDetallesVehiculos[i].poliza,
          "item": "1",
          "ap_paterno": this.empresa.PrimerApellido,
          "ap_materno": this.empresa.SegundoApellido,
          "nombres": this.empresa.PrimerApellido,
          "fecha_compra": this.listaDetallesVehiculos[i].fechaCompra,
          "marca": this.listaDetallesVehiculos[i].cod_marca,
          "modelo": this.listaDetallesVehiculos[i].cod_modelo,
          "cod_concesionario": "0",
          "suma_aseg": this.listaDetallesVehiculos[i].valorCasco,
          "inicio_vigencia": moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
          "fin_vigencia": this.fechaEmisionVencimiento,
          "status": "200",
          "ciudad": "QUITO",
          "companyname": "SEGUROS EQUINOCCIAL",
          "cedula_ruc": this.empresa.Ruc,
          "nombre_asegurado": this.empresa.PrimerApellido + " " + this.empresa.PrimerApellido + " " + this.empresa.SegundoApellido,
          "chasis": this.listaDetallesVehiculos[i].chasis,
          "anio_modelo": this.listaDetallesVehiculos[i].anio,
          "suma_aseg2": this.listaDetallesVehiculos[i].valorCasco,
          "telf_oficina": "0",
          "color": this.listaDetallesVehiculos[i].cod_color,
          "motor": this.listaDetallesVehiculos[i].motor,
          "direccion": this.empresa.Direccion,
          "sector": "1",
          "ciudad2": "QUITO",
          "provincia": "PICHINCHA",
          "direccion2": this.empresa.Direccion,
          "direccion3": this.empresa.Direccion,
          "telf_particular": this.empresa.Telefono,
          "indicativo": this.empresa.Email,
          "cod_plan_pago": this.tppagoEmision,
          "fecha_nacim": "00000000 00:00",
          "cero": "0",
          "uno": "1",
          "tasa": this.listaDetallesVehiculos[i].tasa,
          "prima_neta": cotizacion.primaNetaTotal,
          "super": cotizacion.impuestoSBS,
          "seg_camp": cotizacion.seguroCampesino,
          "der_emi": cotizacion.derechosEmision,
          "iva": cotizacion.iva,
          "prima_total": cotizacion.primaTotal,
          "nro_polizas": "1",
          "producto": codigos.producto,
          "sucursal": this.sucursal_.Sucursal,
          "pto_vta": this.sucursal_.PuntoVenta,
          "zona_del_producto": "1",
          "aclaratorio_poliza": codigos.textoAclaratorio,
          "aclaratorio_item": codigos.textoAclaratorio,
          "codigo_deducible": codigos.deducible,
          "certificado": this.listaDetallesVehiculos[i].poliza,
          "cod_tipo_vehiculo": this.listaDetallesVehiculos[i].cod_tipo,
          "num_convenio": "0",
          "operacion": "0",
          "codigo_conducto": this.conductoEmision,
          "nro_cuenta_tarjeta": "0",
          "quincena": "1",
          "subproducto": codigos.subproducto,
          "documento": 1,
          "tipo_doc": this.empresa.Ruc.length == 13 ? "2" : "1",
          "cod_estado": "0",
          "log_error": "0",
          "flag": "1",
          "cod_pais": 1,
          "cod_item": "1",
          "id_pv_plano": "0",
          "cod_placa": this.listaDetallesVehiculos[i].cod_tipo_placa,
          "placa": this.listaDetallesVehiculos[i].placa,
          "fact_grupal": "0",
          "imp_otroscargos_con_iva": "-",
          "txt_origen": "0",
          "sn_campania": "0",
          "sn_inspeccion": "0",
          "cod_estado_procesado": "0",
          "id_proceso_slx": "0",
          "fec_procreso": moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
          "cod_usuario": "USRPYMES",
          "cod_estado_veh": "0",
          "cod_estado_clte": "0",
          "telefono3": "0",
          "telefono4": "0",
          "NroPolLider": "0",
          "PjeComisAgente": this.sucursal_.Comision,
          "aaaamm_vto_tarj": "000000",
          "txt_apellido1_pag": this.pagadores.PrimerApellido,
          "txt_apellido2_pag": this.pagadores.SegundoApellido,
          "txt_nombre_pag": this.pagadores.Nombre,
          "cod_tipo_doc_pag": this.pagadores.Cedula.length == 13 ? "2" : "1",
          "cedula_ruc_pag": this.pagadores.Cedula,
          "txt_email_pag": this.pagadores.Email,
          "fec_nac_pag": "00000000 00:00",
          "tel_casa_pag": "0",
          "tel_oficina_pag": "0",
          "tel_celular_pag": this.pagadores.Telefono,
          "txt_direccion_pag": this.pagadores.Direccion,
          "sector_pag": "1",
          "provincia_pag": "PICHINCHA",
          "ciudad_pag": "QUITO",
          "fec_exp_pas_aseg": "0",
          "fec_ven_pas_aseg": "0",
          "fec_ing_pais_aseg": "0",
          "cod_est_mig_aseg": "0"
        });
      } else {
        this.tramaVehiculo.push({
          "grupo_endoso": 1,
          "poliza": "0",
          "id_certificado": this.listaDetallesVehiculos[i].poliza,
          "item": "1",
          "ap_paterno": this.empresa.PrimerApellido,
          "ap_materno": this.empresa.SegundoApellido,
          "nombres": this.empresa.PrimerApellido,
          "fecha_compra": this.listaDetallesVehiculos[i].fechaCompra,
          "marca": this.listaDetallesVehiculos[i].cod_marca,
          "modelo": this.listaDetallesVehiculos[i].cod_modelo,
          "cod_concesionario": "0",
          "suma_aseg": this.listaDetallesVehiculos[i].valorCasco,
          "inicio_vigencia": moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
          "fin_vigencia": this.fechaEmisionVencimiento,
          "status": "200",
          "ciudad": "QUITO",
          "companyname": "SEGUROS EQUINOCCIAL",
          "cedula_ruc": this.empresa.Ruc,
          "nombre_asegurado": this.empresa.PrimerApellido + " " + this.empresa.PrimerApellido + " " + this.empresa.SegundoApellido,
          "chasis": this.listaDetallesVehiculos[i].chasis,
          "anio_modelo": this.listaDetallesVehiculos[i].anio,
          "suma_aseg2": this.listaDetallesVehiculos[i].valorCasco,
          "telf_oficina": "0",
          "color": this.listaDetallesVehiculos[i].cod_color,
          "motor": this.listaDetallesVehiculos[i].motor,
          "direccion": this.empresa.Direccion,
          "sector": "1",
          "ciudad2": "QUITO",
          "provincia": "PICHINCHA",
          "direccion2": this.empresa.Direccion,
          "direccion3": this.empresa.Direccion,
          "telf_particular": this.empresa.Telefono,
          "indicativo": this.empresa.Email,
          "cod_plan_pago": this.tppagoEmision,
          "fecha_nacim": "00000000 00:00",
          "cero": "0",
          "uno": "1",
          "tasa": this.listaDetallesVehiculos[i].tasa,
          "prima_neta": cotizacion.primaNetaTotal,
          "super": cotizacion.impuestoSBS,
          "seg_camp": cotizacion.seguroCampesino,
          "der_emi": cotizacion.derechosEmision,
          "iva": cotizacion.iva,
          "prima_total": cotizacion.primaTotal,
          "nro_polizas": "1",
          "producto": codigos.producto,
          "sucursal": this.sucursal_.Sucursal,
          "pto_vta": this.sucursal_.PuntoVenta,
          "zona_del_producto": "1",
          "aclaratorio_poliza": codigos.textoAclaratorio,
          "aclaratorio_item": codigos.textoAclaratorio,
          "codigo_deducible": codigos.deducible,
          "certificado": this.listaDetallesVehiculos[i].poliza,
          "cod_tipo_vehiculo": this.listaDetallesVehiculos[i].cod_tipo,
          "num_convenio": "0",
          "operacion": "0",
          "codigo_conducto": this.conductoEmision,
          "nro_cuenta_tarjeta": "0",
          "quincena": "1",
          "subproducto": codigos.subproducto,
          "documento": 1,
          "tipo_doc": this.empresa.Ruc.length == 13 ? "2" : "1",
          "cod_estado": "0",
          "log_error": "0",
          "flag": "1",
          "cod_pais": 1,
          "cod_item": "1",
          "id_pv_plano": "0",
          "cod_placa": this.listaDetallesVehiculos[i].cod_tipo_placa,
          "placa": this.listaDetallesVehiculos[i].placa,
          "fact_grupal": "0",
          "imp_otroscargos_con_iva": "-",
          "txt_origen": "0",
          "sn_campania": "0",
          "sn_inspeccion": "0",
          "cod_estado_procesado": "0",
          "id_proceso_slx": "0",
          "fec_procreso": this.globales.obtenerFecha(""),
          "cod_usuario": "USRPYMES",
          "cod_estado_veh": "0",
          "cod_estado_clte": "0",
          "telefono3": "0",
          "telefono4": "0",
          "NroPolLider": "0",
          "PjeComisAgente": this.sucursal_.Comision,
          "aaaamm_vto_tarj": "000000",
          "txt_apellido1_pag": this.pagadores.PrimerApellido,
          "txt_apellido2_pag": this.pagadores.SegundoApellido,
          "txt_nombre_pag": this.pagadores.Nombre,
          "cod_tipo_doc_pag": this.pagadores.Cedula.length == 13 ? "2" : "1",
          "cedula_ruc_pag": this.pagadores.Cedula,
          "txt_email_pag": this.pagadores.Email,
          "fec_nac_pag": "00000000 00:00",
          "tel_casa_pag": "0",
          "tel_oficina_pag": "0",
          "tel_celular_pag": this.pagadores.Telefono,
          "txt_direccion_pag": this.pagadores.Direccion,
          "sector_pag": "1",
          "provincia_pag": "PICHINCHA",
          "ciudad_pag": "QUITO",
          "fec_exp_pas_aseg": "0",
          "fec_ven_pas_aseg": "0",
          "fec_ing_pais_aseg": "0",
          "cod_est_mig_aseg": "0",
          "accesorios": this.listaDetallesVehiculos[i].accesorios.length > 0 ? this.listaDetallesVehiculos[i].accesorios : "",
        });
      }
    }
    console.log(this.tramaVehiculo);
    console.log(JSON.stringify(this.tramaVehiculo));

    for (let vehiculo of this.tramaVehiculo) {
      this.generadorVehiculos.verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, Cotizacion, vehiculo);
    }

  }

  public verificarRamos() {

    var numeroVehiculos = this.listaDetallesVehiculos.length;
    var equipoMaquinaria = this.generadorXMLRamos("PO-EM-", 13, this.listaEquipoMaquinaria, "", 0, 0, "EquipoMaquinaria", {});
    var responsabilidadCivil = this.generadorXMLRamos("PO-RC-", 10, this.listaResponsabilidadCivil, "", 0, 0, "ResponsabilidadCivil", {});
    var fidelidad = this.generadorXMLRamos("PO-FI-", 3, this.listaFidelidad, "", 0, 0, "Fidelidad", {});
    var accidentesPersonales = this.generadorXMLRamos("PO-TIN-", 2, this.listaAccidentesPersonales, "", 0, 0, "AccidentesPersonales", {});
    var transporteInterno = this.generadorXMLRamos("PO-TIN-", 2, this.listaTransportes, "", 0, 0, "TransporteInterno", {});

    if (equipoMaquinaria.validacion != 0) {
      this.cotizacionVista.equipoMaquinara = true;
    } else {
      this.cotizacionVista.equipoMaquinara = false;
    } if (responsabilidadCivil.validacion != 0) {
      this.cotizacionVista.responsabilidadCivil = true;
    } else {
      this.cotizacionVista.responsabilidadCivil = false;
    } if (fidelidad.validacion != 0) {
      this.cotizacionVista.fidelidad = true;
    } else {
      this.cotizacionVista.fidelidad = false;
    } if (accidentesPersonales.validacion != 0) {
      this.cotizacionVista.accidentesPersonales = true;
    } else {
      this.cotizacionVista.accidentesPersonales = false;
    } if (transporteInterno.validacion != 0) {
      this.cotizacionVista.transporteInterno = true;
    } else {
      this.cotizacionVista.transporteInterno = false;
    } if (numeroVehiculos != 0) {
      this.cotizacionVista.vehiculos = true;
    } else {
      this.cotizacionVista.vehiculos = false;
    } if (this.general.calcularPrimaTotal(this.listaTransporteImportaciones) != 0) {
      this.cotizacionVista.transporteImportaciones = true;
    } else {
      this.cotizacionVista.transporteImportaciones = false;
    }
  }

  public verificarRamosEmision() {
    if (this.cotizacionVista.multiriesgo == true) {
      if (this.fmrCotizacionResultado.EstadoMultiriesgo == 0) {
        this.cotizacionBotones.multiriesgo = true;
      } else {
        this.cotizacionBotones.multiriesgo = false;
      }
    }

    if (this.cotizacionVista.equipoMaquinara == true) {
      if (this.fmrCotizacionResultado.EstadoEquipoMaquinaria == 0) {
        this.cotizacionBotones.equipoMaquinara = true;
      } else {
        this.cotizacionBotones.equipoMaquinara = false;
      }
    }

    if (this.cotizacionVista.responsabilidadCivil == true) {
      if (this.fmrCotizacionResultado.EstadoResponsabilidadCivil == 0) {
        this.cotizacionBotones.responsabilidadCivil = true;
      } else {
        this.cotizacionBotones.responsabilidadCivil = false;
      }
    }

    if (this.cotizacionVista.fidelidad == true) {
      if (this.fmrCotizacionResultado.EstadoFidelidad == 0) {
        this.cotizacionBotones.fidelidad = true;
      } else {
        this.cotizacionBotones.fidelidad = false;
      }
    }

    if (this.cotizacionVista.accidentesPersonales == true) {
      if (this.fmrCotizacionResultado.EstadoAccidentesPersonales == 0) {
        this.cotizacionBotones.accidentesPersonales = true;
      } else {
        this.cotizacionBotones.accidentesPersonales = false;
      }
    }

    if (this.cotizacionVista.transporteInterno == true) {
      if (this.fmrCotizacionResultado.EstadoTransInterno == 0) {
        this.cotizacionBotones.transporteInterno = true;
      } else {
        this.cotizacionBotones.transporteInterno = false;
      }
    }

    if (this.cotizacionVista.transporteImportaciones == true) {
      if (this.fmrCotizacionResultado.EstadoTransImportaciones == 0) {
        this.cotizacionBotones.transporteImportaciones = true;
      } else {
        this.cotizacionBotones.transporteImportaciones = false;
      }
    }

    if (this.cotizacionVista.vehiculos == true) {
      if (this.fmrCotizacionResultado.EstadoVehiculos == 0) {
        this.cotizacionBotones.vehiculos = true;
      } else {
        this.cotizacionBotones.vehiculos = false;
      }
    }
  }

  public verificarAplicarPago() {
    var estadosEmision = [];
    var estadosSeleccionado = [];

    if (this.cotizacionVista.multiriesgo == true) {
      estadosSeleccionado.push("multiriesgo");
      if (this.fmrCotizacionResultado.EstadoMultiriesgo == 1) {
        estadosEmision.push("multiriesgo");
      }
    }

    if (this.cotizacionVista.equipoMaquinara == true) {
      estadosSeleccionado.push("equipoMaquinara");
      if (this.fmrCotizacionResultado.EstadoEquipoMaquinaria == 1) {
        estadosEmision.push("equipoMaquinara");
      }
    }

    if (this.cotizacionVista.responsabilidadCivil == true) {
      estadosSeleccionado.push("responsabilidadCivil");
      if (this.fmrCotizacionResultado.EstadoResponsabilidadCivil == 1) {
        estadosEmision.push("responsabilidadCivil");
      }
    }

    if (this.cotizacionVista.fidelidad == true) {
      estadosSeleccionado.push("fidelidad");
      if (this.fmrCotizacionResultado.EstadoFidelidad == 1) {
        estadosEmision.push("fidelidad");
      }
    }

    if (this.cotizacionVista.accidentesPersonales == true) {
      estadosSeleccionado.push("accidentesPersonales");
      if (this.fmrCotizacionResultado.EstadoAccidentesPersonales == 1) {
        estadosEmision.push("accidentesPersonales");
      }
    }

    if (this.cotizacionVista.transporteInterno == true) {
      estadosSeleccionado.push("transporteInterno");
      if (this.fmrCotizacionResultado.EstadoTransInterno == 1) {
        estadosEmision.push("transporteInterno");
      }
    }

    if (this.cotizacionVista.transporteImportaciones == true) {
      estadosSeleccionado.push("transporteImportaciones");
      if (this.fmrCotizacionResultado.EstadoTransImportaciones == 1) {
        estadosEmision.push("transporteImportaciones");
      }
    }

    if (this.cotizacionVista.vehiculos == true) {
      estadosSeleccionado.push("vehiculos");
      if (this.fmrCotizacionResultado.EstadoVehiculos == 1) {
        estadosEmision.push("vehiculos");
      }
    }

    var estado = this.globales.compararVectores(estadosEmision, estadosSeleccionado);
    this.estadoAplicarPago = estado;

    if (estado == true) {
      this.spinner.show();
      this.generico.actualizarEstadoPolizas(this.fmrCotizacionResultado.IdCotizacionResultado, this.contenido.IdCotizacion).then(res => {
        this.spinner.hide();
        this.cerrarCotizacionCompromiso();
        console.log(res);
      }).catch(err => {
        this.spinner.hide();
      });
    }

  }

  public aplicarPagoPolizas() {

    var DatosPagador = {
      DocumentoCliente: this.pagadores.Cedula,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.pagadores.Email,
      NombreCliente: this.pagadores.Nombre,
      EnviarEmail: 0
    };

    this.spinner.show();
    this.generico.consultarCodigoAsegurado(DatosPagador.DocumentoCliente).then(res => {
      this.spinner.hide();
      if (res != "-1") {
        var Datos = {
          codigoAseguradoPagador: res,
          totalGlobal: this.cotizacionTotal.primaTotal,
          sucursal: this.sucursal_.Sucursal
        };

        var ap = this.fmrCotizacionResultado.IdPvAccidentesPersonales == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvAccidentesPersonales);
        var em = this.fmrCotizacionResultado.IdPvEquipoMaquinaria == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvEquipoMaquinaria);
        var fi = this.fmrCotizacionResultado.IdPvFidelidad == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvFidelidad);
        var multi = this.fmrCotizacionResultado.IdPvMultiriesgo == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvMultiriesgo);
        var rc = this.fmrCotizacionResultado.IdPvResponsabilidadCivil == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvResponsabilidadCivil);
        var train = this.fmrCotizacionResultado.IdPvTransImportaciones == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvTransImportaciones);
        var traim = this.fmrCotizacionResultado.IdPvTransInterno == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvTransInterno);
        var vh = this.fmrCotizacionResultado.IdPvVehiculos == "" ? "" : JSON.parse(this.fmrCotizacionResultado.IdPvVehiculos);

        var polizasAux = [ap, em, fi, multi, rc, train, traim, vh];
        var polizas = [];
        for (let pol of polizasAux) {
          if (pol != "") {
            polizas.push({ polIdPv: pol.polIdPv, polTotal: pol.polTotal });
          }
        }

        var CotizacionResultado = {
          Polizas: polizas,
          IdCotizacionResultado: this.fmrCotizacionResultado.IdCotizacionResultado
        }

        this.cpago.consultarBin(this.FormaPago, Datos, CotizacionResultado);

      } else {
        this.globales.mostrarNotificacion("No se encuentra código de pagador.", "warning", "bottom");
      }
    }).catch(err => {
      console.log(err)
      this.spinner.hide();
      this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al consultar asegurado", "error", "bottom");
    });

  }

  public cerrarCotizacionCompromiso() {
    var datos = {
      CFecha: moment().format("YYYY-MM-DD"),
      CMotivo: "Otro",
      CNotas: "Cliente emite póliza",
      CValor: this.numeroCotizacion
    };

    this.spinner.show();
    this.gestionCotizacion.cerrarCotizacionCompromiso(datos).then(res => {
      this.spinner.hide();
      console.log(res);
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarItems(listaRamo, ubicacion, direccion, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");

    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItem(datos, listaRamo, ubicacion);
  }

  public generarItemsRespCivil(listaRamo, ubicacion, direccion, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }
    return this.generador.generarItemResponsabilidadCivil(datos, listaRamo, ubicacion);
  }

  public generarItemTrasportesImportacionesPlano(listaRamo, ubicacion, direccion, tipo, listaComplemento, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItemTrasportesImportacionesPlano(datos, listaRamo, ubicacion, tipo, listaComplemento);
  }

  public generarItemsTransporte(listaRamo, ubicacion, direccion, tipo, listaComplemento, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItemTrasportes(datos, listaRamo, ubicacion, tipo, listaComplemento);
  }

  public generarItemsTransportePlano(listaRamo, ubicacion, direccion, tipo, listaComplemento, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItemTransportesPlano(datos, listaRamo, ubicacion, tipo, listaComplemento);
  }

  public generarItemTrasportesImportaciones(listaRamo, ubicacion, direccion, tipo, listaComplemento, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItemTrasportesImportaciones(datos, listaRamo, ubicacion, tipo, listaComplemento);
  }

  public generarItemAccidentesPersonales(listaRamo, ubicacion, direccion, pais, departamento, municipio) {
    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");
    var datos = {
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      primaneta: this.general.calcularPrimaUbicacion(ubicacion, listaRamo),
      sumaAsegurada: this.general.calcularSumaAsegurada(listaRamo, ubicacion),
      direccion: direccion,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      listaDerechosEmision: this.listaDerechosEmision,
      listaCalculablesCotizacion: this.listaCalculablesCotizacion,
      Identificador: 1,
      negocio: 74663
    }

    return this.generador.generarItemAccidentesPersonales(datos, listaRamo, ubicacion);
  }

  public generacionIncendioTerremoto() {

    var tasaIncedio = 0.28;
    var subTotalSubRamoIncedio = 0;
    var totalSubRamoIncedio = 0;
    this.listaIncedioEmision = [];

    var tasaTerremoto = 0.72;
    var subTotalSubRamoTerremoto = 0;
    var totalSubRamoTerremoto = 0;
    this.listaTerremotoEmision = [];

    for (let incendioNuevo of this.listaIncendio) {
      subTotalSubRamoIncedio = parseFloat(incendioNuevo.Valores.ValorU1.Valor) + parseFloat(incendioNuevo.Valores.ValorU2.Valor) + parseFloat(incendioNuevo.Valores.ValorU3.Valor) + parseFloat(incendioNuevo.Valores.ValorU4.Valor) + parseFloat(incendioNuevo.Valores.ValorU5.Valor);
      totalSubRamoIncedio = subTotalSubRamoIncedio * ((incendioNuevo.Valores.Tasa * tasaIncedio) / 100);

      this.listaIncedioEmision.push(
        {
          Datos: incendioNuevo.Datos,
          Reglas: incendioNuevo.Reglas,
          Valores: {
            ValorU1: { "Texto": incendioNuevo.Valores.ValorU1.Texto, "TextoMovil": incendioNuevo.Valores.ValorU1.TextoMovil, "Valor": incendioNuevo.Valores.ValorU1.Valor, "Provincia": incendioNuevo.Valores.ValorU1.Provincia },
            ValorU2: { "Texto": incendioNuevo.Valores.ValorU2.Texto, "TextoMovil": incendioNuevo.Valores.ValorU2.TextoMovil, "Valor": incendioNuevo.Valores.ValorU2.Valor, "Provincia": incendioNuevo.Valores.ValorU2.Provincia },
            ValorU3: { "Texto": incendioNuevo.Valores.ValorU3.Texto, "TextoMovil": incendioNuevo.Valores.ValorU3.TextoMovil, "Valor": incendioNuevo.Valores.ValorU3.Valor, "Provincia": incendioNuevo.Valores.ValorU3.Provincia },
            ValorU4: { "Texto": incendioNuevo.Valores.ValorU4.Texto, "TextoMovil": incendioNuevo.Valores.ValorU4.TextoMovil, "Valor": incendioNuevo.Valores.ValorU4.Valor, "Provincia": incendioNuevo.Valores.ValorU4.Provincia },
            ValorU5: { "Texto": incendioNuevo.Valores.ValorU5.Texto, "TextoMovil": incendioNuevo.Valores.ValorU5.TextoMovil, "Valor": incendioNuevo.Valores.ValorU5.Valor, "Provincia": incendioNuevo.Valores.ValorU5.Provincia },
            Tasa: (incendioNuevo.Valores.Tasa * tasaIncedio),
            TasaMinima: (incendioNuevo.Valores.Tasa * tasaIncedio),
            Prima: (isNaN(Math.round(totalSubRamoIncedio * 100) / 100) ? 0 : Math.round(totalSubRamoIncedio * 100) / 100),
            NVehiculos: 0,
            NPersonas: 0,
            VPersonas: 0,
            GPersonas: 0,
            ITransporte: 0,
            CTrasporte: "",
            VResponsabilidad: 0,
            EAdicionales: 0
          }
        });
    }

    for (let terremotoNuevo of this.listaIncendio) {
      subTotalSubRamoTerremoto = parseFloat(terremotoNuevo.Valores.ValorU1.Valor) + parseFloat(terremotoNuevo.Valores.ValorU2.Valor) + parseFloat(terremotoNuevo.Valores.ValorU3.Valor) + parseFloat(terremotoNuevo.Valores.ValorU4.Valor) + parseFloat(terremotoNuevo.Valores.ValorU5.Valor);
      totalSubRamoTerremoto = subTotalSubRamoTerremoto * ((terremotoNuevo.Valores.Tasa * tasaTerremoto) / 100);

      this.listaTerremotoEmision.push(
        {
          Datos: terremotoNuevo.Datos,
          Reglas: terremotoNuevo.Reglas,
          Valores: {
            ValorU1: { "Texto": terremotoNuevo.Valores.ValorU1.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU1.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU1.Valor, "Provincia": terremotoNuevo.Valores.ValorU1.Provincia },
            ValorU2: { "Texto": terremotoNuevo.Valores.ValorU2.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU2.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU2.Valor, "Provincia": terremotoNuevo.Valores.ValorU2.Provincia },
            ValorU3: { "Texto": terremotoNuevo.Valores.ValorU3.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU3.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU3.Valor, "Provincia": terremotoNuevo.Valores.ValorU3.Provincia },
            ValorU4: { "Texto": terremotoNuevo.Valores.ValorU4.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU4.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU4.Valor, "Provincia": terremotoNuevo.Valores.ValorU4.Provincia },
            ValorU5: { "Texto": terremotoNuevo.Valores.ValorU5.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU5.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU5.Valor, "Provincia": terremotoNuevo.Valores.ValorU5.Provincia },
            Tasa: (terremotoNuevo.Valores.Tasa * tasaTerremoto),
            TasaMinima: (terremotoNuevo.Valores.Tasa * tasaTerremoto),
            Prima: (isNaN(Math.round(totalSubRamoTerremoto * 100) / 100) ? 0 : Math.round(totalSubRamoTerremoto * 100) / 100),
            NVehiculos: 0,
            NPersonas: 0,
            VPersonas: 0,
            GPersonas: 0,
            ITransporte: 0,
            CTrasporte: "",
            VResponsabilidad: 0,
            EAdicionales: 0,
            AplicaTerremoto: 1
          }
        });
    }

  }

  public generacionCoberturasAdicionales() {

    this.listaCoberturasAdicionalesEmision = [];

    var tasaIncedio = 0.28;
    var subTotalSubRamoIncedio = 0;
    var totalSubRamoIncedio = 0;

    var tasaTerremoto = 0.72;
    var subTotalSubRamoTerremoto = 0;
    var totalSubRamoTerremoto = 0;


    for (let variosNuevo of this.listaCoberturasAdicionalesMR) {

      if (variosNuevo.Datos.RamoPerteneciente != "RIL1") {
        this.listaCoberturasAdicionalesEmision.push(
          {
            Datos: variosNuevo.Datos,
            Reglas: variosNuevo.Reglas,
            Valores: {
              ValorU1: { "Texto": variosNuevo.Valores.ValorU1.Texto, "TextoMovil": variosNuevo.Valores.ValorU1.TextoMovil, "Valor": variosNuevo.Valores.ValorU1.Valor, "Provincia": variosNuevo.Valores.ValorU1.Provincia },
              ValorU2: { "Texto": variosNuevo.Valores.ValorU2.Texto, "TextoMovil": variosNuevo.Valores.ValorU2.TextoMovil, "Valor": variosNuevo.Valores.ValorU2.Valor, "Provincia": variosNuevo.Valores.ValorU2.Provincia },
              ValorU3: { "Texto": variosNuevo.Valores.ValorU3.Texto, "TextoMovil": variosNuevo.Valores.ValorU3.TextoMovil, "Valor": variosNuevo.Valores.ValorU3.Valor, "Provincia": variosNuevo.Valores.ValorU3.Provincia },
              ValorU4: { "Texto": variosNuevo.Valores.ValorU4.Texto, "TextoMovil": variosNuevo.Valores.ValorU4.TextoMovil, "Valor": variosNuevo.Valores.ValorU4.Valor, "Provincia": variosNuevo.Valores.ValorU4.Provincia },
              ValorU5: { "Texto": variosNuevo.Valores.ValorU5.Texto, "TextoMovil": variosNuevo.Valores.ValorU5.TextoMovil, "Valor": variosNuevo.Valores.ValorU5.Valor, "Provincia": variosNuevo.Valores.ValorU5.Provincia },
              Tasa: variosNuevo.Valores.Tasa,
              TasaMinima: variosNuevo.Valores.TasaMinima,
              Prima: variosNuevo.Valores.Prima,
              NVehiculos: 0,
              NPersonas: 0,
              VPersonas: 0,
              GPersonas: 0,
              ITransporte: 0,
              CTrasporte: "",
              VResponsabilidad: 0,
              EAdicionales: 0,
              CoberturaAdicional: 1
            }
          });
      }
    }


    for (let incendioNuevo of this.listaCoberturasAdicionalesMR) {
      subTotalSubRamoIncedio = parseFloat(incendioNuevo.Valores.ValorU1.Valor) + parseFloat(incendioNuevo.Valores.ValorU2.Valor) + parseFloat(incendioNuevo.Valores.ValorU3.Valor) + parseFloat(incendioNuevo.Valores.ValorU4.Valor) + parseFloat(incendioNuevo.Valores.ValorU5.Valor);
      totalSubRamoIncedio = subTotalSubRamoIncedio * ((incendioNuevo.Valores.Tasa * tasaIncedio) / 100);

      if (incendioNuevo.Datos.RamoPerteneciente == "RIL1") {
        this.listaCoberturasAdicionalesEmision.push(
          {
            Datos: incendioNuevo.Datos,
            Reglas: incendioNuevo.Reglas,
            Valores: {
              ValorU1: { "Texto": incendioNuevo.Valores.ValorU1.Texto, "TextoMovil": incendioNuevo.Valores.ValorU1.TextoMovil, "Valor": incendioNuevo.Valores.ValorU1.Valor, "Provincia": incendioNuevo.Valores.ValorU1.Provincia },
              ValorU2: { "Texto": incendioNuevo.Valores.ValorU2.Texto, "TextoMovil": incendioNuevo.Valores.ValorU2.TextoMovil, "Valor": incendioNuevo.Valores.ValorU2.Valor, "Provincia": incendioNuevo.Valores.ValorU2.Provincia },
              ValorU3: { "Texto": incendioNuevo.Valores.ValorU3.Texto, "TextoMovil": incendioNuevo.Valores.ValorU3.TextoMovil, "Valor": incendioNuevo.Valores.ValorU3.Valor, "Provincia": incendioNuevo.Valores.ValorU3.Provincia },
              ValorU4: { "Texto": incendioNuevo.Valores.ValorU4.Texto, "TextoMovil": incendioNuevo.Valores.ValorU4.TextoMovil, "Valor": incendioNuevo.Valores.ValorU4.Valor, "Provincia": incendioNuevo.Valores.ValorU4.Provincia },
              ValorU5: { "Texto": incendioNuevo.Valores.ValorU5.Texto, "TextoMovil": incendioNuevo.Valores.ValorU5.TextoMovil, "Valor": incendioNuevo.Valores.ValorU5.Valor, "Provincia": incendioNuevo.Valores.ValorU5.Provincia },
              Tasa: (incendioNuevo.Valores.Tasa * tasaIncedio),
              TasaMinima: (incendioNuevo.Valores.Tasa * tasaIncedio),
              Prima: (isNaN(Math.round(totalSubRamoIncedio * 100) / 100) ? 0 : Math.round(totalSubRamoIncedio * 100) / 100),
              NVehiculos: 0,
              NPersonas: 0,
              VPersonas: 0,
              GPersonas: 0,
              ITransporte: 0,
              CTrasporte: "",
              VResponsabilidad: 0,
              EAdicionales: 0,
              CoberturaAdicional: 1
            }
          });
      }
    }

    for (let terremotoNuevo of this.listaCoberturasAdicionalesMR) {
      subTotalSubRamoTerremoto = parseFloat(terremotoNuevo.Valores.ValorU1.Valor) + parseFloat(terremotoNuevo.Valores.ValorU2.Valor) + parseFloat(terremotoNuevo.Valores.ValorU3.Valor) + parseFloat(terremotoNuevo.Valores.ValorU4.Valor) + parseFloat(terremotoNuevo.Valores.ValorU5.Valor);
      totalSubRamoTerremoto = subTotalSubRamoTerremoto * ((terremotoNuevo.Valores.Tasa * tasaTerremoto) / 100);
      if (terremotoNuevo.Datos.RamoPerteneciente == "RIL1" && terremotoNuevo.Datos.CodigoObjetoSeguroTerremoto != "") {
        this.listaCoberturasAdicionalesEmision.push(
          {
            Datos: terremotoNuevo.Datos,
            Reglas: terremotoNuevo.Reglas,
            Valores: {
              ValorU1: { "Texto": terremotoNuevo.Valores.ValorU1.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU1.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU1.Valor, "Provincia": terremotoNuevo.Valores.ValorU1.Provincia },
              ValorU2: { "Texto": terremotoNuevo.Valores.ValorU2.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU2.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU2.Valor, "Provincia": terremotoNuevo.Valores.ValorU2.Provincia },
              ValorU3: { "Texto": terremotoNuevo.Valores.ValorU3.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU3.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU3.Valor, "Provincia": terremotoNuevo.Valores.ValorU3.Provincia },
              ValorU4: { "Texto": terremotoNuevo.Valores.ValorU4.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU4.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU4.Valor, "Provincia": terremotoNuevo.Valores.ValorU4.Provincia },
              ValorU5: { "Texto": terremotoNuevo.Valores.ValorU5.Texto, "TextoMovil": terremotoNuevo.Valores.ValorU5.TextoMovil, "Valor": terremotoNuevo.Valores.ValorU5.Valor, "Provincia": terremotoNuevo.Valores.ValorU5.Provincia },
              Tasa: (terremotoNuevo.Valores.Tasa * tasaTerremoto),
              TasaMinima: (terremotoNuevo.Valores.Tasa * tasaTerremoto),
              Prima: (isNaN(Math.round(totalSubRamoTerremoto * 100) / 100) ? 0 : Math.round(totalSubRamoTerremoto * 100) / 100),
              NVehiculos: 0,
              NPersonas: 0,
              VPersonas: 0,
              GPersonas: 0,
              ITransporte: 0,
              CTrasporte: "",
              VResponsabilidad: 0,
              EAdicionales: 0,
              CoberturaAdicional: 1,
              AplicaTerremoto: 1
            }
          });
      }
    }
  }

  public generadorXMLRamos(certificado, ramo, listaRamo, clausulas, codigoBanco, codigoConducto, nombreRamo, prima) {

    var cotizacion: any;

    if (nombreRamo == "TransporteImportaciones") {
      cotizacion = this.general.calcularCotizacionTransporteImportaciones(this.listaTransporteImportaciones);
    } else {
      cotizacion = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, listaRamo, nombreRamo);
    }

    this.fechaEmisionVencimiento = moment(this.fechaEmisionVigenciaSeleccionada).add(1, "year").format("DD-MM-YYYY");

    var datos = {
      certificado: certificado,
      ramo: ramo,
      fechaDesde: moment(this.fechaEmisionVigenciaSeleccionada).format("DD-MM-YYYY"),
      fechaHasta: this.fechaEmisionVencimiento,
      sumaAsegurada: this.generador.obtenerSumaAseguradaItems(`<items>` + prima.ubicacion1 + prima.ubicacion2 + prima.ubicacion3 + prima.ubicacion4 + prima.ubicacion5 + `</items>`),
      primaNetaTotal: cotizacion.primaNetaTotal,
      impuestoSBS: cotizacion.impuestoSBS,
      derechosEmision: cotizacion.derechosEmision,
      iva: cotizacion.iva,
      primaTotal: cotizacion.primaTotal,
      seguroCampesino: cotizacion.seguroCampesino,
      comision: this.sucursal_.Comision,
      codigoAgente: this.sucursal_.Agente,
      codigoTipoAgente: this.sucursal_.TipoAgente,
      sucursal: this.sucursal_.Sucursal,
      puntoVenta: this.sucursal_.PuntoVenta,
      conducto: this.conductoEmision,
      tppago: this.tppagoEmision
    }

    var pago = {
      bin: this.binEmision,
      vencimiento: this.vencimientoEmision
    }

    var clausulasEnvio = "<clausulas>" + clausulas + "</clausulas>";

    var asegurado = {
      asegurado: this.codigoAsegurado
    }

    var contratante = {
      asegurado: this.codigoAseguradoContratratante
    }

    var pagador = {
      asegurado: this.codigoAseguradoPagador
    }

    var items = `<items>` + prima.ubicacion1 + prima.ubicacion2 + prima.ubicacion3 + prima.ubicacion4 + prima.ubicacion5 + `</items>`;
    var generadorXML = this.generador.generarXML(datos, pago, clausulasEnvio, asegurado, contratante, pagador, items);

    return { xml: generadorXML, validacion: cotizacion.primaTotal };
  }

  public calcularCotizacionTotalGlobal() {
    var accesorios = 0;
    var primaNetaVehiculos = 0;
    var derechosEmisionVehiculos = 0;
    var primaTotalVehiculos = 0;

    if (this.listaDetallesVehiculos.length > 0) {
      for (let i = 0; i < 1; i++) {
        if (this.listaDetallesVehiculos[i].accesorios.length > 0) {
          for (let accesorio of this.listaDetallesVehiculos[i].accesorios) {
            accesorios += accesorio.imp_prima;
          }
        }
        var cotizacion = this.general.calcularCotizacionVehiculos(this.listaDetallesVehiculos[i].valorTotal, this.listaDetallesVehiculos[i].tasa, this.listaDerechosEmision, this.listaCalculablesCotizacion, this.listaDetallesVehiculos[i].valorPrimaPolizaDeducibles, accesorios);
        primaNetaVehiculos += cotizacion.primaNetaTotal;
        derechosEmisionVehiculos += cotizacion.derechosEmision;
        primaTotalVehiculos += cotizacion.primaTotal;
      }
    }

    var primaNeta12 = this.cotizacionMultiriesgo.primaNetaTotal + this.cotizacionEquipoMaquinaria.primaNetaTotal + this.cotizacionResponsabilidadCivil.primaNetaTotal + this.cotizacionFidelidad.primaNetaTotal + this.cotizacionTransporteInterno.primaNetaTotal + this.cotizacionTransporteImportaciones.primaNetaTotal + primaNetaVehiculos;
    var primaNeta0 = this.cotizacionAccidentesPersonales.primaNetaTotal;
    var impuestosAP = this.cotizacionAccidentesPersonales.impuestoSBS + this.cotizacionAccidentesPersonales.derechosEmision + this.cotizacionAccidentesPersonales.seguroCampesino;
    var derechosEmision = this.cotizacionMultiriesgo.derechosEmision + this.cotizacionEquipoMaquinaria.derechosEmision + this.cotizacionResponsabilidadCivil.derechosEmision + this.cotizacionFidelidad.derechosEmision + this.cotizacionAccidentesPersonales.derechosEmision + this.cotizacionTransporteInterno.derechosEmision + this.cotizacionTransporteImportaciones.derechosEmision + derechosEmisionVehiculos;

    var total = this.cotizacionMultiriesgo.primaTotal + this.cotizacionEquipoMaquinaria.primaTotal + this.cotizacionResponsabilidadCivil.primaTotal + this.cotizacionFidelidad.primaTotal + this.cotizacionTransporteInterno.primaTotal + this.cotizacionTransporteImportaciones.primaTotal + primaTotalVehiculos + this.cotizacionAccidentesPersonales.primaTotal;

    this.cotizacionTotal = this.general.calcularCotizacionTotalGlobal(primaNeta12, primaNeta0, derechosEmision, this.listaCalculablesCotizacion, impuestosAP, total);

    //SOLO PARA VEHICULOS
    this.totalVehiculos = primaTotalVehiculos;

    this.cotizacionTotal.primaTotal = total;

  }

  //***** FIN GENERAR POLIZAS  *****/

  //***** INICIO LISTAR DATOS DB  *****/
  public listarEmpresa() {

    if (this.kcotizacion.verificarKeyCotizacion()) {
      this.spinner.show();
      this.conexion.get("Broker/SBroker.svc/empresa/consultar?cotizacion=" + this.codigoCotizacion.idCotizacion + "&broker=" + this.usuario.broker.IdBroker + "&empresa=" + this.codigoCotizacion.idEmpresa + "", this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.length != 0) {
            if (res[0] != undefined) {
              this.empresa = res[0].Empresa;
            }
          }

          this.activacionCamposContratante = this.empresa.Ruc.length;
          this.activacionCamposPagador = this.empresa.Ruc.length;

          this.contratante.Cedula = this.empresa.Ruc;
          this.contratante.Nombre = this.empresa.Nombre;
          this.contratante.PrimerApellido = this.empresa.PrimerApellido;
          this.contratante.SegundoApellido = this.empresa.SegundoApellido;
          this.contratante.Direccion = this.empresa.Direccion;
          this.contratante.Telefono = this.empresa.Telefono;
          this.contratante.Email = this.empresa.Email;

          this.pagadores.Cedula = this.empresa.Ruc;
          this.pagadores.Nombre = this.empresa.Nombre;
          this.pagadores.PrimerApellido = this.empresa.PrimerApellido;
          this.pagadores.SegundoApellido = this.empresa.SegundoApellido;
          this.pagadores.Direccion = this.empresa.Direccion;
          this.pagadores.Telefono = this.empresa.Telefono;
          this.pagadores.Email = this.empresa.Email;

          this.numeroCotizacion = res[0].Codigo;
          this.vigenciaCotizacion = res[0].Fecha;
          this.sucursal_ = JSON.parse(res[0].Corredor);
          this.listarCorredores(this.sucursal_);
        },
        err => {
          this.spinner.hide();
          this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar la Empresa", "error", "#E74C3C");
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public listarCorredores(corredor) {

    this.Sucursal = { Union: corredor.Sucursal + "-" + corredor.PuntoVenta };
    this.Comision = { value: parseInt(corredor.Comision) };
    this.TipoAgente = { value: parseInt(corredor.TipoAgente) };

    this.spinner.show();
    this.generico.listarAgentes(corredor.TipoAgente).then(lista => {
      this.spinner.hide();
      this.lstAgente = lista;
      this.dataAgente = this.lstAgente.slice();

      for (let agente of this.lstAgente) {
        if (agente.codigoAgente == corredor.Agente) {
          this.Agente = { codigoAgente: agente.codigoAgente };
        }
      }

      this.listarDescripcionRamos();
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public listarDescripcionRamos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarRamos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaRamos = res;
        this.valDiseno.gestionVistaPanelesRamos(this.listaRamos);
        this.listarDescripcionRamosSubramos();

        this.verificacion = this.veriricarCoberturasAdicionales(this.listaRamos);
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar la la descripción de los ramos", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarDescripcionRamosSubramos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarRamosSubramos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaRamosSubRamos = res;
        this.listarTasasRamosSubramos();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar la descripción de las coberturas", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarTasasRamosSubramos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarTasasSubramos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaRamosSubRamosTasas = res;
        this.listarReglasRamosSubramos();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar las tasas", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarReglasRamosSubramos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarReglasSubramos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaRamosSubRamosReglas = res;
        this.listarReglasAdicionalesRamosSubramos();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar las reglas", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarReglasAdicionalesRamosSubramos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarReglasAdicionalesSubramos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaRamosSubRamosReglasAdicionales = res;
        this.listarSubramosTransportes();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar las reglas adicionales", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarSubramosTransportes() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarSubramosTrasporte/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaSubRamoTransporte = res;
        this.listarTasasVehiculos();

      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar ramo transporte", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarTasasVehiculos() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/ramo/listarTasasVehiculos/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaTasasVehiculos = res;
        this.listarDerechosEmision();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar las tasas de vehículos", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarDerechosEmision() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/catalogos/emision", this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaDerechosEmision = res;
        this.listarCalculablesCotizacion();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar los derechos de emisión", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarCalculablesCotizacion() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/catalogos/cotizacion", this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.listaCalculablesCotizacion = res;
        this.listarSucursales();
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al listar los calculables de la cotización", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarSucursales() {
    this.lstSucursal = [];
    this.spinner.show();
    this.generico.listarSucursales().then(lista => {
      this.spinner.hide();
      this.lstSucursal = lista;
      this.listarProvinciasCiudades();
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public listarProvinciasCiudades() {
    this.lstProvinciasCiudades = [];
    this.spinner.show();
    this.generico.listarProvinciasCiudades().then(lista => {
      this.spinner.hide();
      this.lstProvinciasCiudades = lista;
      this.inicializarRamosCoberturas();
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public listarCiudades() {
    this.lstCiudades = [];
    this.fmrMapa.ciudad = null;
    if (this.usuario.broker.Provincias == 0) {
      this.lstCiudades = this.lstProvinciasCiudades;
    } else {
      for (let ciudad of this.lstProvinciasCiudades) {
        if (ciudad.TextoDepartamento == this.fmrMapa.provincia) {
          this.lstCiudades.push(ciudad);
        }
      }
    }
    this.lstProvinciasCiudadesFiltro = this.lstCiudades.slice();
  }

  public filtrarCiudades(value) {
    this.lstProvinciasCiudadesFiltro = this.lstCiudades.filter((s) => s.TextoCompleto.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public listarAgentes() {
    this.lstAgente = [];
    this.Agente = null;

    this.spinner.show();
    this.generico.listarAgentes(this.TipoAgente.value).then(lista => {
      this.spinner.hide();
      this.lstAgente = lista;
      this.dataAgente = this.lstAgente.slice();
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public filtrarAgente(value) {
    this.dataAgente = this.lstAgente.filter((s) => s.nombreAgente.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  //***** FIN LISTAR DATOS DB  *****/

  public veriricarCoberturasAdicionales(lista) {
    var validacion = false;
    for (let ramos of lista) {
      if (ramos.Codigo == "RCA14") {
        validacion = true;
      }
    }
    return validacion;
  }

  public gestioPanelGlobal(panel) {
    if (panel == 'Empresa') {
      this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
      setTimeout(() => { this.gestionPanelesEmpresa('Empresa', this.usuario.broker.Color); }, 100);
    } if (panel == 'Direcciones') {

      if (this.valCotizador.validacion(this.empresa, this.usuario.broker.Color) &&
        (this.valCotizador.validacionPersonas(this.contratante, this.usuario.broker.Color, "Contratante")) &&
        (this.valCotizador.validacionPersonas(this.pagadores, this.usuario.broker.Color, "Pagador"))) {
        this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
        this.inicializarMapa();
      }
    } if (panel == 'Ramos') {
      if (this.valCotizador.gestionValidacionDirecciones(this.lstDirecciones, this.usuario.broker.Color)) {
        this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
      }
    } if (panel == 'Valores') {

      if (this.valCotizador.gestionValidacionDirecciones(this.lstDirecciones, this.usuario.broker.Color)) {
        this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
        this.kramos.registrarKeyRamos(this.valDiseno.panelesValoresRamos);
        this.gestionPanelesRamos('incendio');
      }
    } if (panel == 'Cotizacion') {
      this.verificarRamos();

      this.cotizacionMultiriesgo = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, this.lstRamos, true, [], "");
      this.cotizacionEquipoMaquinaria = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaEquipoMaquinaria, "");
      this.cotizacionResponsabilidadCivil = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaResponsabilidadCivil, "");
      this.cotizacionFidelidad = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaFidelidad, "");
      this.cotizacionAccidentesPersonales = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaAccidentesPersonales, "AccidentesPersonales");
      this.cotizacionTransporteInterno = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaTransportes, "");
      this.cotizacionTransporteImportaciones = this.general.calcularCotizacionTransporteImportaciones(this.listaTransporteImportaciones);

      this.calcularCotizacionTotalGlobal();

      if (this.validarPrimasMinimas() == true) {
        if (this.validarCombosTransportes() == true) {
          if (this.validarVehiculos() == true) {
            this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
          }
        }
      }

    } if (panel == 'Resumen') {
      if (this.valCotizador.gestionValidacionResumen(this.empresa.RazonSocial, this.usuario.broker.Color)) {
        this.verificarRamos();
        setTimeout(() => {

          this.cotizacionMultiriesgo = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, this.lstRamos, true, [], "");
          this.cotizacionEquipoMaquinaria = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaEquipoMaquinaria, "");
          this.cotizacionResponsabilidadCivil = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaResponsabilidadCivil, "");
          this.cotizacionFidelidad = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaFidelidad, "");
          this.cotizacionAccidentesPersonales = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaAccidentesPersonales, "AccidentesPersonales");
          this.cotizacionTransporteInterno = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaTransportes, "");
          this.cotizacionTransporteImportaciones = this.general.calcularCotizacionTransporteImportaciones(this.listaTransporteImportaciones);

          this.calcularCotizacionTotalGlobal();

        }, 4000);
        if (this.validarPrimasMinimas() == true) {
          if (this.validarCombosTransportes() == true) {
            if (this.validarVehiculos() == true) {
              this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
            }
          }
        }
      }
    } if (panel == 'Pago') {
      this.verificarRamos();

      setTimeout(() => {

        this.cotizacionMultiriesgo = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, this.lstRamos, true, [], "");
        this.cotizacionEquipoMaquinaria = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaEquipoMaquinaria, "");
        this.cotizacionResponsabilidadCivil = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaResponsabilidadCivil, "");
        this.cotizacionFidelidad = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaFidelidad, "");
        this.cotizacionAccidentesPersonales = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaAccidentesPersonales, "AccidentesPersonales");
        this.cotizacionTransporteInterno = this.general.calcularCotizacionTotal(this.listaDerechosEmision, this.listaCalculablesCotizacion, [], false, this.listaTransportes, "");
        this.cotizacionTransporteImportaciones = this.general.calcularCotizacionTransporteImportaciones(this.listaTransporteImportaciones);

        this.calcularCotizacionTotalGlobal();

      }, 3000);
      this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);
    } if (panel == 'Emision') {

      var sucursal = "";
      var comision = this.sucursal_.Comision;
      var tipoAgente = "";
      var agente = "";

      this.spinner.show();
      this.generico.listarSucursales().then(lista => {
        this.spinner.hide();

        for (let suc of lista) {
          if (suc.Union == this.sucursal_.PuntoVenta + "-" + this.sucursal_.Sucursal) {
            sucursal = suc.Nombre;
          }
        }

        for (let tipo of this.lstTipoAgente) {
          if (tipo.value == this.sucursal_.TipoAgente) {
            tipoAgente = tipo.text;
          }
        }

        this.spinner.show();
        this.generico.listarAgentes(this.sucursal_.TipoAgente).then(lista => {
          this.spinner.hide();

          for (let age of lista) {
            if (age.codigoAgente == this.sucursal_.Agente) {
              agente = age.nombreAgente;
            }
          }

          this.informacionEmision = { sucursal: sucursal, comision: comision, tipoAgente: tipoAgente, agente: agente };
          this.verificarRamos();
          this.panelesGlobales = this.valDiseno.gestionPanelesGlobales(panel);

        }).catch(err => {
          this.spinner.hide();
        });


      }).catch(err => {
        this.spinner.hide();
      });

    }

    this.gesitonColoresBroker();
  }

  public validarPrimasMinimas() {
    var estado = true;
    var ramos = {
      listaIncendio: this.listaIncendio,
      listaEquipoElectronico: this.listaEquipoElectronico,
      listaRoturaMaquinaria: this.listaRoturaMaquinaria,
      listaRoboAsalto: this.listaRoboAsalto,
      listaDineroValores: this.listaDineroValores,
      listaCoberturasAdicionales: this.listaCoberturasAdicionalesEmision
    }

    var listaMultiriesgo = [];
    var textoPrimasMinimas = "";

    for (let subramos of ramos.listaCoberturasAdicionales) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    for (let subramos of ramos.listaIncendio) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    for (let subramos of ramos.listaEquipoElectronico) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    for (let subramos of ramos.listaRoturaMaquinaria) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    for (let subramos of ramos.listaRoboAsalto) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    for (let subramos of ramos.listaDineroValores) {
      listaMultiriesgo.push({ Datos: subramos.Datos, Reglas: subramos.Reglas, Valores: subramos.Valores });
    }

    var multiriesgo = 0;
    for (let i = 0; i < listaMultiriesgo.length; i++) {
      multiriesgo = multiriesgo + listaMultiriesgo[i].Valores.Prima;
    }

    var equipoMaquinaria = this.generadorXMLRamos("PO-EM-", 13, this.listaEquipoMaquinaria, "", 0, 0, "EquipoMaquinaria", {});
    var responsabilidadCivil = this.generadorXMLRamos("PO-RC-", 10, this.listaResponsabilidadCivil, "", 0, 0, "ResponsabilidadCivil", {});
    var fidelidad = this.generadorXMLRamos("PO-FI-", 3, this.listaFidelidad, "", 0, 0, "Fidelidad", {});
    var accidentesPersonales = this.generadorXMLRamos("PO-TIN-", 2, this.listaAccidentesPersonales, "", 0, 0, "AccidentesPersonales", {});
    var transporteInterno = this.generadorXMLRamos("PO-TIN-", 2, this.listaTransportes, "", 0, 0, "TransporteInterno", {});

    for (let ramo of this.listaRamos) {
      if (this.cotizacionVista.multiriesgo == true) {
        if (ramo.Codigo == "RCA14") {
          if (ramo.PrimaMinima > multiriesgo) {
            textoPrimasMinimas += "* Multiriesgo<br>";
            estado = false;
          }
        }
      } if (this.valDiseno.panelesValoresRamos.includes('equipoMaquinaria') == true) {
        if (ramo.Codigo == "REM8") {
          if (ramo.PrimaMinima > equipoMaquinaria.validacion) {
            textoPrimasMinimas += "* Equipo y Maquinaria<br>";
            estado = false;
          }
        }
      } if (this.valDiseno.panelesValoresRamos.includes('responsabilidadCivil') == true) {
        if (ramo.Codigo == "RRC9") {
          if (ramo.PrimaMinima > responsabilidadCivil.validacion) {
            textoPrimasMinimas += "* Responsabilidad Civil<br>";
            estado = false;
          }
          if (responsabilidadCivil.validacion == 0) {
            textoPrimasMinimas += "* Responsabilidad Civil<br>";
            estado = false;
          }
        }
      } if (this.valDiseno.panelesValoresRamos.includes('fidelidad') == true) {
        if (ramo.Codigo == "RFI10") {
          if (ramo.PrimaMinima > fidelidad.validacion) {
            textoPrimasMinimas += "* Fidelidad<br>";
            estado = false;
          }
        }
      } if (this.valDiseno.panelesValoresRamos.includes('accidentesPersonales') == true) {
        if (ramo.Codigo == "RAP12") {
          if (ramo.PrimaMinima > accidentesPersonales.validacion) {
            textoPrimasMinimas += "* Accidentes Personales<br>";
            estado = false;
          }
        }
      } if (this.valDiseno.panelesValoresRamos.includes('transportes') == true) {
        if (ramo.Codigo == "RTR11IN") {
          if (ramo.PrimaMinima > transporteInterno.validacion) {
            textoPrimasMinimas += "* Transporte Interno<br>";
            estado = false;
          }
        }
      }
    }

    if (estado == false) {
      this.globales.mostarAlerta("Primas Mínimas", "<div style='text-align: left !important'>Los valores ingresados en los ramos seleccionados, no superan las primas mínimas.<br><br><div style='font-weight: bold'>" + textoPrimasMinimas + "</div></div>", "warning");
    }
    console.log(estado);
    return estado;
  }

  public validarVehiculos() {
    var estado = true;
    if (this.valDiseno.panelesValoresRamos.includes('vehiculos') == true) {
      if (this.listaDetallesVehiculos.length == 0) {
        this.globales.mostarAlerta("Vehículos", "Se ha seleccionado el ramo de vehículos, pero no se ha ingresado ninguno.", "warning");
        estado = false;
      }
      for (let vehiculos of this.listaDetallesVehiculos) {
        if (vehiculos.tipoVehiculo == "") {
          this.globales.mostarAlerta("Vehículos", "En los vehículos ingresados, falta seleccionar el tipo. (" + vehiculos.placa + ")", "warning");
          estado = false;
        } else if (vehiculos.polizaDeducibles == "") {
          this.globales.mostarAlerta("Vehículos", "En los vehículos ingresados, falta seleccionar póliza de deducibles. (" + vehiculos.placa + ")", "warning");
          estado = false;
        } else if (vehiculos.tipoVehiculo == "SemiPesados") {
          this.globales.mostarAlerta("Vehículos", "En los vehículos ingresados, el tipo SEMIPESADOS no se encuentra disponible por el momento. (" + vehiculos.placa + ")", "warning");
          estado = false;
        }
      }
    }
    return estado;
  }

  public validarCombosTransportes() {
    var estado = true;
    var texto = "";

    if (this.usuario.broker.Transporte == '0') {

      if (this.valDiseno.panelesValoresRamos.includes('transportes') == true) {
        for (let transporteIn of this.listaTransportes) {
          if (transporteIn.Datos.Codigo == "STR2") {
            if (transporteIn.Valores.ITransporte == 0) {
              estado = false;
              texto += "* Transporte Interno<br>";
            }
          }
        }
      }

      if (this.valDiseno.panelesValoresRamos.includes('transporteImportaciones') == true) {
        for (let transporteIm of this.listaTransporteImportaciones) {
          if (transporteIm.Datos.Codigo == "STR4") {
            if (transporteIm.Valores.ITransporte == 0) {
              estado = false;
              texto += "* Transporte Importaciones<br>";
            }
          }
        }
      }
    }

    if (estado == false) {
      this.globales.mostarAlerta("Transportes", "<div style='text-align: left !important'>No se seleccionó el límite por embarque, de los siguientes ramos:<br><br><div style='font-weight: bold'>" + texto + "</div></div>", "warning");
    }

    return estado;
  }

  public gestionPanelesEmpresa(panel, color) {
    setTimeout(() => { this.valDiseno.gestionPanelesEmpresa(panel, color); }, 100);
  }

  public gestionPanelesRamos(ramo) {

    this.valDiseno.gestionPanelesValoresRamos(ramo);

    if (ramo == 'incendio') {
      setTimeout(() => { this.generarComponenteIncendio() }, 100);
    } if (ramo == 'equipoElectronico') {
      setTimeout(() => { this.generarComponenteEquipoElectronico() }, 100);
    } if (ramo == 'roturaMaquinaria') {
      setTimeout(() => { this.generarComponenteRoturaMaquinaria() }, 100);
    } if (ramo == 'lucroRoturaMaquinaria') {
      setTimeout(() => { this.generarComponenteLucroRoturaMaquinaria() }, 100);
    } if (ramo == 'lucroIncendio') {
      setTimeout(() => { this.generarComponenteLucroIncendio() }, 100);
    } if (ramo == 'roboAsalto') {
      setTimeout(() => { this.generarComponenteRoboAsalto() }, 100);
    } if (ramo == 'dineroValores') {
      setTimeout(() => { this.generarComponenteDineroValores() }, 100);
    } if (ramo == 'equipoMaquinaria') {
      setTimeout(() => { this.generarComponenteEquipoMaquinaria() }, 100);
    } if (ramo == 'coberturasAdicionales') {
      setTimeout(() => { this.generarComponenteCoberturasAdicionales() }, 100);
    } if (ramo == 'responsabilidadCivil') {
      setTimeout(() => { this.generarComponenteResponsabilidadCivil() }, 100);
    } if (ramo == 'fidelidad') {
      setTimeout(() => { this.generarComponenteFidelidad() }, 100);
    } if (ramo == 'accidentesPersonales') {
      setTimeout(() => { this.generarComponenteAccidentesPersonales() }, 100);
    } if (ramo == 'transportes') {
      setTimeout(() => { this.generarComponenteTrasportes() }, 100);
    } if (ramo == 'transporteImportaciones') {
      setTimeout(() => { this.generarComponenteTransporteImportaciones() }, 100);
    } if (ramo == 'vehiculos') {
      setTimeout(() => { this.generarComponenteVehiculos(); }, 100);
    } if (ramo == 'motos') {
      setTimeout(() => { this.generarComponenteMotos() }, 100);
    }
  }

  //------------ INICIO FORMAS PAGO ---------------
  public formaPagoSeleccionada(forma) {
    if (forma == 1) {
      $('#1').css({ "color": "rgb(" + this.usuario.broker.Color + ")", "border": "1.5px solid rgb(" + this.usuario.broker.Color + ")" });
      $('#2').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#3').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#4').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
    } else if (forma == 2) {
      $('#2').css({ "color": "rgb(" + this.usuario.broker.Color + ")", "border": "1.5px solid rgb(" + this.usuario.broker.Color + ")" });
      $('#1').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#3').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#4').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
    } else if (forma == 3) {
      $('#3').css({ "color": "rgb(" + this.usuario.broker.Color + ")", "border": "1.5px solid rgb(" + this.usuario.broker.Color + ")" });
      $('#2').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#1').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#4').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
    } else if (forma == 4) {
      $('#4').css({ "color": "rgb(" + this.usuario.broker.Color + ")", "border": "1.5px solid rgb(" + this.usuario.broker.Color + ")" });
      $('#2').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#3').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
      $('#1').css({ "color": "#3f3f3f", "border": "1.5px solid #3f3f3f" });
    }

  }

  public seleccionarFormaPago(forma) {

    var DatosEmpresa = {
      DocumentoCliente: this.empresa.Ruc,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.empresa.Email,
      NombreCliente: this.globales.limpiar(this.empresa.RazonSocial),
      EnviarEmail: 1
    };

    var DatosPagador = {
      DocumentoCliente: this.pagadores.Cedula,
      EmailAgente: this.usuario.Email,
      CodigoAgente: this.sucursal_.Agente,
      CodigoTipoAgente: this.sucursal_.TipoAgente,
      EmailCliente: this.pagadores.Email,
      NombreCliente: this.globales.limpiar(this.pagadores.Nombre),
      EnviarEmail: 1
    };

    //PRIMERO SE VERIFICA FORMULARIO DE VINCULACION
    var formularioContratante = "false";
    var formularioPagador = "false";
    var mensaje = "";

    this.spinner.show();
    if (DatosEmpresa.DocumentoCliente == DatosPagador.DocumentoCliente) {
      this.generico.verificarFormulario(DatosEmpresa).then(res => {
        this.spinner.hide();

        if (res == "false") {
          mensaje = mensaje + "<b>Contratante / Pagador </b><br><u>Descripción:</u> El formulario de viculación no se encuentra firmado.<br><u>Gestión: </u>Se envió un correo electrónico para que el formulario de vinculación sea completado.<br><br>";
          this.globales.mostarAlerta("", "<div style='text-align: left; font-size: 15px;'>" + mensaje + "</div>", "info");
        } else {
          this.globales.mostrarNotificacion("Contratante / Pagador: El formulario de vinculación ya se encuentra firmado.", "success", "bottom");
          this.formaPagoSeleccionada(forma);
          this.tipoPago = forma;
        }

      }).catch(err => {
        this.spinner.hide();
        this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Pagador", "error", "#E74C3C");
      });

    } else {
      this.spinner.show();
      this.generico.verificarFormulario(DatosEmpresa).then(res => {
        this.spinner.hide();

        formularioContratante = res;
        if (formularioContratante == "false") {
          mensaje = mensaje + "<b>Contratante </b><br><u>Descripción:</u> El formulario de viculación no se encuentra firmado.<br><u>Gestión: </u>Se envió un correo electrónico para que el formulario de vinculación sea completado.<br><br>";
        } else {
          this.globales.mostrarNotificacion("Contratante: El formulario de vinculación ya se encuentra firmado.", "success", "bottom");
        }

        this.spinner.show();
        this.generico.verificarFormulario(DatosPagador).then(res => {
          this.spinner.hide();

          formularioPagador = res;
          if (formularioPagador == "false") {
            mensaje = mensaje + "<b>Pagador </b><br><u>Descripción:</u> El formulario de viculación no se encuentra firmado.<br><u>Gestión: </u>Se envió un correo electrónico para que el formulario de vinculación sea completado.<br><br>";
          } else {
            this.globales.mostrarNotificacion("Pagador: El formulario de vinculación ya se encuentra firmado.", "success", "bottom");
          }

          if (formularioContratante == "true" && formularioPagador == "true") {
            this.formaPagoSeleccionada(forma);
            this.tipoPago = forma;
          } else {
            this.globales.mostarAlerta("", "<div style='text-align: left; font-size: 15px;'>" + mensaje + "</div>", "info");
          }

        }).catch(err => {
          this.spinner.hide();
          this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Pagador", "error", "#E74C3C");
        });

      }).catch(err => {
        this.spinner.hide();
        this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Pagador", "error", "#E74C3C");
      });
    }

  }

  public enviarFormaPago(forma) {
    this.valoresPagar = this.general.enviarValoresPagar(this.cotizacionTotal.primaTotal, this.listaCalculablesCotizacion);

    var pago = {
      Factura: {
        Cliente: {
          Identificacion: this.pagadores.Cedula,
          PrimerNombre: this.pagadores.Nombre,
          SegundoNombre: "",
          Apellido: this.pagadores.PrimerApellido,
          Email: this.pagadores.Email + ";" + this.usuario.Email,
          Telefono: this.pagadores.Telefono,
          Aplicacion: { IdAplicacion: this.usuario.broker.Pago, Identificacion: 3 }
        },
        Numero: forma == 1 ? "0" : "1",
        Comercio: "CÓDIGO " + this.numeroCotizacion,
        Subtotal12: this.valoresPagar.subtotal.toFixed(2),
        Subtotal0: 0,
        Iva: this.valoresPagar.iva.toFixed(2),
        Total: this.valoresPagar.total.toFixed(2),
        UrlRetorno: "0"
      }
    };

    if (forma == 1) {
      this.generarPagoTarjeta(forma, pago);
    } else if (forma == 2) {
      this.generarPagoTarjeta(forma, pago);
    } else if (forma == 3) {
      this.generarPagoContado(forma);
    } else if (forma == 4) {
    }
  }

  public verificarPagoTarjeta(forma) {
    this.valoresPagar = this.general.enviarValoresPagar(this.cotizacionTotal.primaTotal, this.listaCalculablesCotizacion);
    var pago = {
      Factura: {
        Cliente: {
          Identificacion: this.pagadores.Cedula,
          PrimerNombre: this.pagadores.Nombre,
          SegundoNombre: "",
          Apellido: this.pagadores.PrimerApellido,
          Email: this.pagadores.Email + ";" + this.usuario.Email,
          Telefono: this.pagadores.Telefono,
          Aplicacion: { IdAplicacion: this.usuario.broker.Pago, Identificacion: 3 }
        },
        Numero: forma == 1 ? "0" : "1",
        Comercio: "CÓDIGO " + this.numeroCotizacion,
        Subtotal12: this.valoresPagar.subtotal.toFixed(2),
        Subtotal0: 0,
        Iva: this.valoresPagar.iva.toFixed(2),
        Total: this.valoresPagar.total.toFixed(2),
        UrlRetorno: "0"
      }
    };

    this.spinner.show();
    this.generico.verificarPagoTarjeta(this.FormaPago.IdPago).then(estado => {
      this.spinner.hide();

      if (estado == 1) {
        this.valCotizador.notificacion("Transacción sin realizar, enviando link de pago", "success", "#29A82C");
        this.regenerarPagoTarjeta(forma);
      } else if (estado == 2) {
        this.valCotizador.notificacion("Transacción exitosa", "success", "#29A82C");
        this.verificarPago();
      } else if (estado == 3) {
        this.valCotizador.notificacion("Transacción rechazada, enviando un nuevo link de pago", "success", "#29A82C");
        this.generarPagoTarjeta(forma, pago);
      } else if (estado == 4) {
        this.valCotizador.notificacion("Transacción reversada, enviando un nuevo link de pago", "success", "#29A82C");
        this.generarPagoTarjeta(forma, pago);
      } else if (estado == 5) {
        this.valCotizador.notificacion("Transacción anulada, enviando un nuevo link de pago", "success", "#29A82C");
        this.generarPagoTarjeta(forma, pago);
      } else if (estado == 6) {
        this.valCotizador.notificacion("Transacción expirada, enviando un nuevo link de pago", "success", "#29A82C");
        this.generarPagoTarjeta(forma, pago);
      }

    }).catch(err => {
      this.spinner.hide();
    });

  }

  public generarPagoTarjeta(forma, pago) {
    this.spinner.show();
    this.generico.generarPagoTarjeta(pago).then(detalle => {
      this.spinner.hide();

      if (detalle.IdPago == "0") {
        this.valCotizador.mostrarAlertaDinamica(detalle.Descripcion, "warning", this.usuario.broker.Color);
      } else {
        this.valCotizador.notificacion("El pago ha sido enviado<br>satisfactoriamente a la plataforma", "success", "#29A82C");

        var ramos = this.globales.generarRamos();
        var mensaje = this.globales.generarDetalleEmail(this.empresa, this.pagadores, ramos, this.valoresPagar, this.usuario, detalle.Url);

        this.FormaPago.IdPago = parseInt(atob(detalle.IdPago));

        this.guardarFormaPago(this.FormaPago.IdPago, forma == 1 ? "TARJETA DE CRÉDITO" : "TARJETA DE DÉBITO", forma);

        this.enviarCorreoElectronico(pago.Factura.Cliente.Email + ";" + this.usuario.Email, "EQUIPAYMENT COTIZACIÓN No. " + this.codigoCotizacion.codigoCotizacion, mensaje);

      }
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public generarPagoContado(forma) {
    this.guardarFormaPago(0, "CONTADO", forma);
  }

  public generarPagoDebitoBancario(forma) {
    if (this.DebitoBancario.TipoCuenta == null || this.DebitoBancario.TipoCuenta == undefined) {
      this.globales.mostarAlertaTiempo("", "Seleccionar Tipo de Cuenta", "info");
    } else if (this.DebitoBancario.Banco == null || this.DebitoBancario.Banco == undefined) {
      this.globales.mostarAlertaTiempo("", "Seleccionar Banco", "info");
    } else if (this.DebitoBancario.Cuotas == null || this.DebitoBancario.Cuotas == undefined) {
      this.globales.mostarAlertaTiempo("", "Seleccionar Cuotas", "info");
    } else if (this.DebitoBancario.NumeroCuenta == null || this.DebitoBancario.NumeroCuenta == "") {
      this.globales.mostarAlertaTiempo("", "Ingresar Número de Cuenta", "info");
    } else if (this.DebitoBancario.FechaDebito == null || this.DebitoBancario.FechaDebito == undefined) {
      this.globales.mostarAlertaTiempo("", "Seleccionar Fecha de Débito", "info");
    } else {
      this.guardarFormaPago(0, "DÉBITO BANCARIO", forma);
    }

  }

  public guardarFormaPago(idPago, tipo, forma) {

    this.spinner.show();
    var datos = {
      "Identificador": 1,
      "IdFormaPago": this.FormaPago.IdFormaPago,
      "IdPago": idPago,
      "Tipo": tipo,
      "Estado": 1,
      "Adjunto": forma == 4 ? this.DebitoBancario.Adjunto : "",
      "Plataforma": forma == 4 ? this.DebitoBancario.TipoCuenta : "",
      "CodigoAutenticacion": forma == 4 ? this.DebitoBancario.Banco : "",
      "Referencia": forma == 4 ? this.DebitoBancario.Cuotas : "",
      "Lote": forma == 4 ? this.DebitoBancario.FechaDebito : "",
      "Voucher": forma == 4 ? this.DebitoBancario.NumeroCuenta : "",
      "Diferidos": "",
      "Intereses": "",
      "Trama": "",
      "Fecha": "",
      "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
    };
    this.conexion.post("Broker/SBroker.svc/cotizacion/forma/pago/gestion", datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.FormaPago.IdFormaPago = res.IdFormaPago;
        if (this.tipoPago == 3 || this.tipoPago == 4) {
          this.actualizarEstadoCotizacionFormaPago();
        }

      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al gestionar la forma de pago", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public regenerarPagoTarjeta(forma) {
    var url = "";
    if (forma == 1) {
      url = this.varGlobales.ObtenerCredenciales("").conexionLinkPago + "?c=" + btoa(this.FormaPago.IdPago + "") + "&p=" + this.usuario.broker.Pago;
    } else {
      url = this.varGlobales.ObtenerCredenciales("").conexionLinkPago + "?c=" + btoa(this.FormaPago.IdPago + "") + "&p=" + this.usuario.broker.Pago + "&d=corriente";
    }

    var ramos = this.globales.generarRamos();
    var mensaje = this.globales.generarDetalleEmail(this.empresa, this.pagadores, ramos, this.valoresPagar, this.usuario, url);

    this.enviarCorreoElectronico(this.pagadores.Email + ";" + this.usuario.Email, "EQUIPAYMENT COTIZACIÓN No. " + this.codigoCotizacion.codigoCotizacion, mensaje);

  }

  public verificarPago() {
    var datos = {
      Identificador: 3,
      Ramo: ""
    }
    this.actualizarEmpresa(datos);
  }

  public obtenerPagoTarjeta() {
    this.spinner.show();
    this.generico.obtenerPagoTarjeta(this.FormaPago.IdPago).then(pago => {
      this.spinner.hide();
      this.FormaPago.Estado = pago.Estado;

      if (pago.Estado == 0) {
        this.valCotizador.mostrarAlertaDinamica("El link de pagos aún no se ha enviado al cliente.", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 1) {
        this.valCotizador.mostrarAlertaDinamica("Transacción sin realizar, el cliente aun no realiza el pago de la póliza.", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 3) {
        this.valCotizador.mostrarAlertaDinamica("Transacción rechazada, el cliente no realizó el pago de la póliza", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 4) {
        this.valCotizador.mostrarAlertaDinamica("Transacción reversada, el cliente tiene que volver a realizar el pago.", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 5) {
        this.valCotizador.mostrarAlertaDinamica("Transacción anulada, generar un nuevo link de pagos.", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 6) {
        this.valCotizador.mostrarAlertaDinamica("Transacción expirada, generar un nuevo link de pagos.", "info", this.usuario.broker.Color);
      } else if (pago.Estado == 2) {

        this.FormaPago.Plataforma = pago.Plataforma;
        this.FormaPago.CodigoAutenticacion = pago.CodigoAutenticacion;
        this.FormaPago.Referencia = pago.Referencia;
        this.FormaPago.Lote = pago.Lote;
        this.FormaPago.Voucher = pago.Voucher;
        this.FormaPago.Diferidos = pago.Diferidos;
        this.FormaPago.Intereses = pago.Intereses;
        this.FormaPago.Trama = pago.Trama;
        this.FormaPago.Fecha = pago.Fecha;
        this.binEmision = pago.Bin;
        this.vencimientoEmision = pago.Vencimiento;

        this.actualizarFormaPago();
      }

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public actualizarEstadoCotizacionFormaPago() {

    this.spinner.show();
    var contenido = {
      "Identificador": 3,
      "IdCotizacion": this.codigoCotizacion.idCotizacion,
      "PrimaNetaIva12": 0,
      "PrimaNetaIva0": 0,
      "PrimaNetaTotal": 0,
      "ImpuestoSBS": 0,
      "ImpuestoCampesino": 0,
      "DerechosEmision": 0,
      "Iva": 0,
      "PrimaTotal": 0,
      "Broker": { "IdBroker": 0 },
      "Codigo": "",
      "Estado": 4,
      "IdUsuario": 0,
      "Empresa": { "IdEmpresa": 0 },
      "Corredor": ""
    };
    this.conexion.post("Broker/SBroker.svc/cotizacion/guardar/registro", contenido, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.estadoCotizacion = 4;

        if (this.tipoPago == 1) {
          this.conductoEmision = 185;
          this.tppagoEmision = 94;
        } if (this.tipoPago == 2) {
          this.conductoEmision = 185;
          this.tppagoEmision = 94;
        } else if (this.tipoPago == 3) {
          this.conductoEmision = 1;
          this.tppagoEmision = 1;
        } else if (this.tipoPago == 4) {
          this.conductoEmision = 0;
          this.tppagoEmision = 0;
        }
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al actualizar el estado del pago en la cotización", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public actualizarFormaPago() {
    this.spinner.show();
    var datos = {
      "Identificador": 6,
      "IdFormaPago": this.FormaPago.IdFormaPago,
      "IdPago": 0,
      "Tipo": "",
      "Estado": this.FormaPago.Estado,
      "Adjunto": "",
      "Plataforma": this.FormaPago.Plataforma,
      "CodigoAutenticacion": this.FormaPago.CodigoAutenticacion,
      "Referencia": this.FormaPago.Referencia,
      "Lote": this.FormaPago.Lote,
      "Voucher": this.FormaPago.Voucher,
      "Diferidos": this.FormaPago.Diferidos,
      "Intereses": this.FormaPago.Intereses,
      "Trama": this.FormaPago.Trama,
      "Fecha": this.FormaPago.Fecha,
      "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
    };

    this.conexion.post("Broker/SBroker.svc/cotizacion/forma/pago/gestion", datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.estadoCotizacion = 4;
        this.valCotizador.notificacion("Los datos del pago han sido<br>actualizados exitosamente.", "success", "#29A82C");
      },
      err => {
        this.spinner.hide();
        this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al actualizar los datos de la forma de pago.", "error", "#E74C3C");
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public obtenerTipoPago(tipo) {

    if (tipo == "TARJETA DE CRÉDITO") {
      this.tipoPago = 1;
      this.formaPagoSeleccionada(1);
    } else if (tipo == "TARJETA DE DÉBITO") {
      this.tipoPago = 2;
      this.formaPagoSeleccionada(2);
    } else if (tipo == "CONTADO") {
      this.tipoPago = 3;
      this.formaPagoSeleccionada(3);
    } else if (tipo == "DÉBITO BANCARIO") {
      this.tipoPago = 4;
      this.formaPagoSeleccionada(4);
    }

  }

  public cambiarFormaPago() {
    this.spinner.show();
    this.generico.verificarPagoTarjeta(this.FormaPago.IdPago).then(estado => {
      this.spinner.hide();

      if (estado == 2) {
        this.valCotizador.notificacion("La cotización ya se encuentra pagada.", "success", "#29A82C");
      } else {
        this.spinner.show();
        var datos = {
          "Identificador": 7,
          "IdFormaPago": this.FormaPago.IdFormaPago,
          "IdPago": 0,
          "Tipo": "",
          "Estado": 0,
          "Adjunto": "",
          "Plataforma": "",
          "CodigoAutenticacion": "",
          "Referencia": "",
          "Lote": "",
          "Voucher": "",
          "Diferidos": "",
          "Intereses": "",
          "Trama": "",
          "Fecha": "",
          "Cotizacion": { "IdCotizacion": this.codigoCotizacion.idCotizacion }
        };

        this.conexion.post("Broker/SBroker.svc/cotizacion/forma/pago/gestion", datos, this.usuario.Uid).subscribe(
          (res: any) => {
            this.spinner.hide();

            this.estadoCotizacion = 3;
            this.tipoPago = 0;
            this.FormaPago = {
              IdFormaPago: 0,
              IdPago: 0,
              Tipo: "",
              TipoOtros: "",
              Estado: 0,
              Cotizacion: { IdCotizacion: 0 },
              Adjunto: "",
              AdjuntoTipo: "",
              Plataforma: "",
              CodigoAutenticacion: "",
              Referencia: "",
              Lote: "",
              Voucher: "",
              Diferidos: "",
              Intereses: "",
              Trama: "",
              Fecha: ""
            }
            this.DebitoBancario = {
              TipoCuenta: null,
              Banco: null,
              Cuotas: null,
              NumeroCuenta: null,
              FechaDebito: null,
              Adjunto: "",
              NumeroCuotas: 0
            }
          },
          err => {
            this.spinner.hide();
            this.valCotizador.notificacion("Problemas con el servidor de datos:<br>Error al actualizar los datos de la forma de pago.", "error", "#E74C3C");
            console.log(err);
            this.conexion.error(err);
          }
        );
      }

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public verificarAlmenosUnaPolizaEmitida() {
    var polizas = [
      this.fmrCotizacionResultado.EstadoAccidentesPersonales,
      this.fmrCotizacionResultado.EstadoEquipoMaquinaria,
      this.fmrCotizacionResultado.EstadoFidelidad,
      this.fmrCotizacionResultado.EstadoMultiriesgo,
      this.fmrCotizacionResultado.EstadoResponsabilidadCivil,
      this.fmrCotizacionResultado.EstadoTransImportaciones,
      this.fmrCotizacionResultado.EstadoTransInterno,
      this.fmrCotizacionResultado.EstadoVehiculos,
    ];

    var numero = 0;
    for (let i = 0; i < polizas.length; i++) {
      if (polizas[i] == 1) {
        numero++
      }

    }
    return numero;
  }

  //------------ FIN FORMAS PAGO ---------------

  //------------ INICIO GESTION CODIGOS DEBITO BANCARIO  ---------------

  public listarBancos() {
    this.DebitoBancario.Banco = null;
    this.DebitoBancario.Cuotas = null;
    this.DebitoBancario.NumeroCuenta = null;

    this.spinner.show();
    this.generico.listarBancos().then(lista => {
      this.spinner.hide();
      this.organizarBancos(lista);
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public listarCuotas() {
    this.DebitoBancario.Cuotas = null;
    this.DebitoBancario.NumeroCuotas = 0;
    this.spinner.show();
    this.generico.listarCuotas(this.DebitoBancario.Banco).then(lista => {
      this.spinner.hide();
      this.lstCuotasDebito = lista;
      this.lstCuotasDebitoFiltrar = this.lstCuotasDebito.slice();

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public listarNumeroCuotas() {
    this.spinner.show();
    this.generico.listarNumeroCuotas(this.DebitoBancario.Cuotas).then(numero => {
      this.spinner.hide();

      this.DebitoBancario.NumeroCuotas = Math.round((this.cotizacionTotal.primaTotal / numero) * 100) / 100;

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public filtrarBanco(value) {
    this.lstBancosDebitoFiltrar = this.lstBancosDebito.filter((s) => s.nombreConducto.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public filtrarCuotas(value) {
    this.lstCuotasDebitoFiltrar = this.lstCuotasDebito.filter((s) => s.nombreCuota.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public organizarBancos(lista) {

    this.lstBancosDebito = [];

    if (this.DebitoBancario.TipoCuenta == 1) {
      for (let bancos of lista) {
        if (bancos.nombreConducto.match(/CTA.AHO./g) || !bancos.nombreConducto.match(/CTA.CTE./g)) {
          this.lstBancosDebito.push(bancos);
        }
      }
    } else if (this.DebitoBancario.TipoCuenta == 2) {
      for (let bancos of lista) {
        if (bancos.nombreConducto.match(/CTA.CTE./g) || !bancos.nombreConducto.match(/CTA.AHO./g)) {
          this.lstBancosDebito.push(bancos);
        }
      }
    }
    this.lstBancosDebitoFiltrar = this.lstBancosDebito.slice();
  }

  //------------ FIN GESTION CODIGOS DEBITO BANCARIO ---------------

  //GESTION MAPAS
  public inicializarMapa() {
    setTimeout(() => {
      this.map = this.valMapa.inicializarMapa(this.mapRef.nativeElement, this.coordenadasInicio);
      this.buscarDireccion(this.map, this.marcadores, this.lstDirecciones);
    }, 100);

    setTimeout(() => {
      this.valMapa.gestionMapa(this.map, this.lstDirecciones, this.marcadores, this.usuario.broker.Provincias, this.lstProvinciasCiudades);
      if (this.lstDirecciones.length != 0) {
        for (var i = 0; i < this.lstDirecciones.length; i++) {
          this.valMapa.agregarMarcador({ lat: this.lstDirecciones[i].latitud, lng: this.lstDirecciones[i].longitud }, this.lstDirecciones[i].id, this.map, this.marcadores, this.lstDirecciones);
        }
      }
    }, 300);
  }

  //BUSCADOR MAPA
  public buscarDireccion(mapa: any, marcadores: any, lstDirecciones: any) {
    this.valMapa.buscarDireccion(this.buscador.nativeElement, mapa, marcadores, lstDirecciones, this.usuario.broker.Provincias, this.lstProvinciasCiudades);
  }

  public asignarListaUbicaciones() {
    var lstDirecciones = this.lstDirecciones;
    if (lstDirecciones.length < 5) {
      if (this.fmrMapa.nombre.trim() == "") {
        this.valCotizador.mostrarAlertaInformativa("Ingrese Dirección", this.usuario.broker.Color);
      } else if (this.fmrMapa.provincia.trim() == "") {
        this.valCotizador.mostrarAlertaInformativa("Seleccione Provincia", this.usuario.broker.Color);
      } else if (this.fmrMapa.ciudad == null) {
        this.valCotizador.mostrarAlertaInformativa("Seleccione Ciudad", this.usuario.broker.Color);
      } else {
        this.lstDirecciones.push({ id: this.obtenerIdDirecciones(), latitud: 0, longitud: 0, nombre: this.fmrMapa.nombre, provincia: this.fmrMapa.provincia, codigoPais: this.fmrMapa.ciudad.CodigoPais, codigoDepartameto: this.fmrMapa.ciudad.CodigoDepartamento, codigoMunicipio: this.fmrMapa.ciudad.CodigoMunicipio });
      }
    } else {
      this.valCotizador.mostrarAlertaInformativa("No se permite agregar más de 5 direcciones", this.usuario.broker.Color);
    }
  }

  public obtenerIdDirecciones() {
    var total = 0;
    for (let dir of this.lstDirecciones) {
      total += parseInt(dir.id) + 1;

    }
    console.log(total);
    return total;
  }

  //VISTA COLORES
  public gesitonColoresBroker() {
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

  public mensajeVehiculos() {
    Swal.fire({
      html: "<span style='font-size: 13.5px'>Estamos en desarrollo, para cotizar el ramo de Vehículos por favor contactar con su ejecutivo o a la Unidad de Pymes <b>vlcabascango@segurosequinoccial.com</b></span>",
      imageUrl: '../../../assets/images/trabajando.png',
      imageWidth: 150,
      imageHeight: 150
    });
  }

}
