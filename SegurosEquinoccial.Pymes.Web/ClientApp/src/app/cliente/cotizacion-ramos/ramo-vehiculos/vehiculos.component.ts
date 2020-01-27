import { CotizacionRamoReglasIndividual } from './../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.individual';
import { Component, Input } from '@angular/core';
import { CotizacionRamoGeneral } from '../cotizacion.ramo.general';
import { SesionService } from '../../../servicios/sesion/sesion.service';
import { ValidacionPipe } from '../../../pipes/gestion-validacion/validacion.pipe';
import { CotizacionRamoReglasGrupal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.Grupal';
import { CotizacionRamoReglasGlobal } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.global';
import { CotizacionRamoReglasVertical } from '../../cotizacion-ramos-reglas/cotizacion.ramo.reglas.vertical';
import Swal from 'sweetalert2';
import { ApiService } from '../../../servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalesPipe } from '../../../metodos/globales/globales.pipe';

declare var $: any;
@Component({
  selector: 'vehiculos-componente',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['../../cotizacion/cotizacion.component.css'],
  providers: [GlobalesPipe, CotizacionRamoGeneral, ValidacionPipe, CotizacionRamoReglasIndividual, CotizacionRamoReglasGlobal, CotizacionRamoReglasVertical, CotizacionRamoReglasGrupal]
})
export class VehiculosComponente {

  @Input() listaVehiculos: any = [];
  @Input() listaDetallesVehiculos = [];
  @Input() listaTasasVehiculos: any = [];
  @Input() numeroDetalleVehiculos: any;

  @Input() maximoVehiculoValor: any = 0;
  @Input() maximoVehiculoDispositivo: any = 0;

  @Input() listaDerechosEmision;
  @Input() listaCalculablesCotizacion;

  @Input() lstDirecciones: any = [];
  @Input() lstRamos: any;
  @Input() riesgo = "0";

  usuario: any;
  deducibles = [{ id: 0, vista: 0, union: 0 }];
  colores = [
    {
      "IdColor": "1",
      "Nombre": "POR CONFIRMAR"
    },
    {
      "IdColor": "2",
      "Nombre": "AZUL"
    },
    {
      "IdColor": "3",
      "Nombre": "AMARILLO"
    },
    {
      "IdColor": "4",
      "Nombre": "ROJO"
    },
    {
      "IdColor": "5",
      "Nombre": "NARANJA"
    },
    {
      "IdColor": "6",
      "Nombre": "VERDE"
    },
    {
      "IdColor": "7",
      "Nombre": "MORADO"
    },
    {
      "IdColor": "8",
      "Nombre": "LILA"
    },
    {
      "IdColor": "9",
      "Nombre": "CELESTE"
    },
    {
      "IdColor": "10",
      "Nombre": "ROSADO"
    },
    {
      "IdColor": "11",
      "Nombre": "FUCSIA"
    },
    {
      "IdColor": "12",
      "Nombre": "CAFE"
    },
    {
      "IdColor": "13",
      "Nombre": "BLANCO"
    },
    {
      "IdColor": "14",
      "Nombre": "NEGRO"
    },
    {
      "IdColor": "15",
      "Nombre": "CORINTO"
    },
    {
      "IdColor": "16",
      "Nombre": "BEIGE"
    },
    {
      "IdColor": "17",
      "Nombre": "DORADO"
    },
    {
      "IdColor": "18",
      "Nombre": "PLATEADO"
    },
    {
      "IdColor": "19",
      "Nombre": "GRIS GRAFITO"
    },
    {
      "IdColor": "20",
      "Nombre": "GRIS PERLA"
    },
    {
      "IdColor": "21",
      "Nombre": "GRIS CLARO"
    },
    {
      "IdColor": "22",
      "Nombre": "PLATA METALICO"
    },
    {
      "IdColor": "23",
      "Nombre": "MORA METALICO"
    },
    {
      "IdColor": "24",
      "Nombre": "PLATEADO METALI"
    },
    {
      "IdColor": "25",
      "Nombre": "CHAMPAGNE"
    },
    {
      "IdColor": "26",
      "Nombre": "VERDE POLICROMA"
    },
    {
      "IdColor": "27",
      "Nombre": "PLATA TORNASOL"
    },
    {
      "IdColor": "28",
      "Nombre": "AMARILLO POLLIT"
    },
    {
      "IdColor": "29",
      "Nombre": "AZUL ASUMADRADO"
    },
    {
      "IdColor": "31",
      "Nombre": "GRIS"
    },
    {
      "IdColor": "32",
      "Nombre": "VINO"
    },
    {
      "IdColor": "33",
      "Nombre": "PLATA"
    },
    {
      "IdColor": "34",
      "Nombre": "ROJO-PLATA"
    },
    {
      "IdColor": "35",
      "Nombre": "MOSTAZA"
    },
    {
      "IdColor": "36",
      "Nombre": "CREMA"
    },
    {
      "IdColor": "37",
      "Nombre": "TURQUESA"
    },
    {
      "IdColor": "38",
      "Nombre": "CONCHO DE VINO"
    },
    {
      "IdColor": "39",
      "Nombre": "VERDE ESMERALDA"
    },
    {
      "IdColor": "40",
      "Nombre": "MARRON"
    },
    {
      "IdColor": "41",
      "Nombre": "PLOMO"
    },
    {
      "IdColor": "42",
      "Nombre": "TUNGSTENO"
    },
    {
      "IdColor": "43",
      "Nombre": "HABANO ORO"
    },
    {
      "IdColor": "44",
      "Nombre": "UVA"
    },
    {
      "IdColor": "45",
      "Nombre": "ROJO - CLIPPER"
    },
    {
      "IdColor": "46",
      "Nombre": "MARFIL"
    },
    {
      "IdColor": "47",
      "Nombre": "BURDEO"
    },
    {
      "IdColor": "48",
      "Nombre": "ORO"
    },
    {
      "IdColor": "49",
      "Nombre": "PERLA"
    },
    {
      "IdColor": "50",
      "Nombre": "BURGUNDI"
    },
    {
      "IdColor": "51",
      "Nombre": "ARENA METALIZAD"
    },
    {
      "IdColor": "52",
      "Nombre": "PLATA TITA"
    },
    {
      "IdColor": "53",
      "Nombre": "POR DEFINIR"
    },
    {
      "IdColor": "54",
      "Nombre": "HABANO OBSCURO"
    },
    {
      "IdColor": "55",
      "Nombre": "HABANO"
    },
    {
      "IdColor": "56",
      "Nombre": "VERDE REGATA PE"
    },
    {
      "IdColor": "57",
      "Nombre": "STRATO"
    },
    {
      "IdColor": "58",
      "Nombre": "GRIS NIEBLA"
    },
    {
      "IdColor": "59",
      "Nombre": "ARENA"
    },
    {
      "IdColor": "60",
      "Nombre": "COBRE"
    },
    {
      "IdColor": "61",
      "Nombre": "GRANITO"
    },
    {
      "IdColor": "62",
      "Nombre": "CINZA"
    },
    {
      "IdColor": "63",
      "Nombre": "LAPISLAZULI MET"
    },
    {
      "IdColor": "64",
      "Nombre": "JADE SILVER"
    },
    {
      "IdColor": "65",
      "Nombre": "GRANATE"
    },
    {
      "IdColor": "66",
      "Nombre": "BRANDY"
    },
    {
      "IdColor": "67",
      "Nombre": "BRONCE"
    },
    {
      "IdColor": "68",
      "Nombre": "POLY SILVER"
    },
    {
      "IdColor": "69",
      "Nombre": "SILVER"
    },
    {
      "IdColor": "70",
      "Nombre": "LACRE"
    },
    {
      "IdColor": "71",
      "Nombre": "COLIMA GRAY"
    },
    {
      "IdColor": "72",
      "Nombre": "GRANDA BLACK"
    },
    {
      "IdColor": "73",
      "Nombre": "MADERA OSCURA"
    },
    {
      "IdColor": "74",
      "Nombre": "PEWTER"
    },
    {
      "IdColor": "75",
      "Nombre": "TOMATE"
    },
    {
      "IdColor": "76",
      "Nombre": "OLIVIN"
    },
    {
      "IdColor": "77",
      "Nombre": "SILBERGRAU"
    },
    {
      "IdColor": "78",
      "Nombre": "AQUA SILVER"
    },
    {
      "IdColor": "79",
      "Nombre": "PEARL BLACK"
    },
    {
      "IdColor": "80",
      "Nombre": "OCEAN BLUE"
    },
    {
      "IdColor": "81",
      "Nombre": "SUPER RED"
    },
    {
      "IdColor": "82",
      "Nombre": "MADERA OSCURO"
    },
    {
      "IdColor": "83",
      "Nombre": "SUNSET ORANGE"
    },
    {
      "IdColor": "84",
      "Nombre": "GRIS GRANITO"
    },
    {
      "IdColor": "85",
      "Nombre": "PLATA ESCUNA"
    },
    {
      "IdColor": "86",
      "Nombre": "PEARL BLACK"
    },
    {
      "IdColor": "87",
      "Nombre": "ROJO FERRARI"
    },
    {
      "IdColor": "88",
      "Nombre": "AZUL OCEANO"
    },
    {
      "IdColor": "89",
      "Nombre": "BLANCO MAHLER"
    },
    {
      "IdColor": "90",
      "Nombre": "ROJO CAMBERRA"
    },
    {
      "IdColor": "91",
      "Nombre": "GALAXY WHITE"
    },
    {
      "IdColor": "92",
      "Nombre": "CLEAR BEIGE METALLIC"
    },
    {
      "IdColor": "93",
      "Nombre": "SILKY SILVER METALLIC"
    },
    {
      "IdColor": "94",
      "Nombre": "CANELA OBSCURA"
    },
    {
      "IdColor": "95",
      "Nombre": "ROJO-BLANCO"
    },
    {
      "IdColor": "96",
      "Nombre": "IZMIR BLUE"
    },
    {
      "IdColor": "97",
      "Nombre": "BLANCO CELESTE"
    },
    {
      "IdColor": "98",
      "Nombre": "ANARANJADO"
    },
    {
      "IdColor": "99",
      "Nombre": "KODAI MAUVE"
    },
    {
      "IdColor": "100",
      "Nombre": "ARC WHITE"
    },
    {
      "IdColor": "101",
      "Nombre": "GOLDEN YELLOW"
    },
    {
      "IdColor": "102",
      "Nombre": "BLANCO ARCO BICAPA"
    },
    {
      "IdColor": "103",
      "Nombre": "POLAR WHITE"
    },
    {
      "IdColor": "104",
      "Nombre": "CAQUI ALPINE"
    },
    {
      "IdColor": "105",
      "Nombre": "GRAYSTONE METAL"
    },
    {
      "IdColor": "106",
      "Nombre": "GRIS PERLA META"
    },
    {
      "IdColor": "107",
      "Nombre": "GRIS PLATINA"
    },
    {
      "IdColor": "108",
      "Nombre": "GRIS GRANITO PE"
    },
    {
      "IdColor": "109",
      "Nombre": "GRIS BRETAÑA"
    },
    {
      "IdColor": "110",
      "Nombre": "GRIS OXFORD"
    },
    {
      "IdColor": "111",
      "Nombre": "GRIS MERCURIO"
    },
    {
      "IdColor": "112",
      "Nombre": "GRIS LONDON"
    },
    {
      "IdColor": "113",
      "Nombre": "PLATA RADIANTE"
    },
    {
      "IdColor": "114",
      "Nombre": "PLATA SORENTO"
    },
    {
      "IdColor": "115",
      "Nombre": "PLATA ASTRAL"
    },
    {
      "IdColor": "116",
      "Nombre": "NEGRO EBONY"
    },
    {
      "IdColor": "117",
      "Nombre": "WHITE ELITE"
    },
    {
      "IdColor": "118",
      "Nombre": "NINJA BLACK"
    },
    {
      "IdColor": "119",
      "Nombre": "CAQUI ALPINE"
    },
    {
      "IdColor": "120",
      "Nombre": "DEEP BLACK PEAR"
    },
    {
      "IdColor": "121",
      "Nombre": "DEEP BLACK PEAR"
    },
    {
      "IdColor": "122",
      "Nombre": "VARIOS COLORES"
    },
    {
      "IdColor": "123",
      "Nombre": "KHAKI"
    },
    {
      "IdColor": "124",
      "Nombre": "OLYMPIC WHITE"
    },
    {
      "IdColor": "125",
      "Nombre": "SWITHBLADE SILV"
    },
    {
      "IdColor": "126",
      "Nombre": "CARBON FLASH"
    },
    {
      "IdColor": "127",
      "Nombre": "URBAN GREY"
    },
    {
      "IdColor": "128",
      "Nombre": "SUPER DED"
    },
    {
      "IdColor": "129",
      "Nombre": "BLACK"
    },
    {
      "IdColor": "130",
      "Nombre": "MOROCCAN BLUE"
    },
    {
      "IdColor": "131",
      "Nombre": "MISTY BLUE"
    },
    {
      "IdColor": "132",
      "Nombre": "PLATA ESTRELLA METALIZADO"
    },
    {
      "IdColor": "133",
      "Nombre": "DESERT BLOOM"
    },
    {
      "IdColor": "134",
      "Nombre": "CAPUCCINO"
    },
    {
      "IdColor": "135",
      "Nombre": "CANDY ORANGE"
    },
    {
      "IdColor": "136",
      "Nombre": "CANDY ORANGE"
    },
    {
      "IdColor": "137",
      "Nombre": "OLIVA CLARO"
    },
    {
      "IdColor": "138",
      "Nombre": "JAZZ BLUE"
    },
    {
      "IdColor": "139",
      "Nombre": "AMARILLO - NEGRO"
    },
    {
      "IdColor": "140",
      "Nombre": "AMARILLO - ROJO"
    },
    {
      "IdColor": "141",
      "Nombre": "RED MERLOT"
    },
    {
      "IdColor": "142",
      "Nombre": "NEGRO METALICO"
    },
    {
      "IdColor": "143",
      "Nombre": "GRILYNE"
    }
  ];
  lstCatalogoAccesorios = [];

  constructor(public general: CotizacionRamoGeneral, public sesion: SesionService, public validacion: ValidacionPipe, private conexion: ApiService,
    public reglasIndividual: CotizacionRamoReglasIndividual, public reglasGlobal: CotizacionRamoReglasGlobal, public reglasVertical: CotizacionRamoReglasVertical,
    public reglasGrupal: CotizacionRamoReglasGrupal, private spinner: NgxSpinnerService, public globales: GlobalesPipe) {
    this.usuario = this.sesion.obtenerDatos();

    this.general.asignacionProvinciaSubramos(this.listaVehiculos);
    setTimeout(() => {
      this.general.asignacionProvinciaSubramos(this.listaVehiculos);
      this.obtenerUnionDeducibles();
      this.consultarCatalogoAccesorios();
    }, 1000);
    this.gesitonColoresBroker();
  }


  public consultarCatalogoAccesorios() {
    this.spinner.show();
    this.conexion.get("Broker/SBroker.svc/catalogos/accesorios/vehiculos", this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCatalogoAccesorios = res;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public gestionTasaVehiculos(subramo: any, tasa: any) {
    this.general.asignacionNuevoValorTasa(tasa, this.listaVehiculos, subramo);
    this.general.calcularPrimaSubramo(this.listaVehiculos, subramo);
  }

  public gestionRamoVehiculos(valor: any, subramo: any, ubicacion: any) {
    if (subramo == "SVE7") {
      this.validacion.gestionReglasRamosSubRamos(this.listaVehiculos, subramo, ubicacion, valor, this.lstRamos, this.general, this.reglasIndividual, this.reglasGlobal, this.reglasVertical, this.reglasGrupal);
      this.general.calcularTasaProvincias(this.listaVehiculos, subramo);
      for (var lista of this.listaVehiculos) {
        if (lista.Datos.Codigo == "SVE7") {
          var totalValorExceso = lista.Valores.ValorU1.Valor * lista.Valores.NVehiculos;
          var totalPrima = (totalValorExceso * lista.Valores.Tasa) / 100;
          lista.Valores.Prima = Math.round(totalPrima * 100) / 100;
        }
      }
    }
  }

  public convertirJSONString(json) {
    return JSON.stringify(json);
  }

  public verificarPolizaVigente(id, placa) {
    if (placa !== "") {
      this.spinner.show();
      this.conexion.get("Broker/SBroker.svc/vehiculos/consultar/poliza/" + placa, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res);
          if (res == '""') {
            this.buscarDetalleVehiculoPlaca(id, placa);
          } else {
            for (let vehiculos of this.listaDetallesVehiculos) {
              if (vehiculos.id == id) {
                vehiculos.placa = "";
              }
            }
            this.globales.mostarAlerta("Vehículos", "El vehículo tiene una póliza vigente", "warning");
          }
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    } else {
      console.log("SIN DATOS");
    }
  }

  public buscarDetalleVehiculoPlaca(id: any, placa: string) {

    var vehiculo = this.listaDetallesVehiculos.filter(vehiculo => vehiculo.placa == placa);
    var numeroVehiculo = vehiculo.length;

    if (numeroVehiculo == 1) {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var validacion = anio - 20;

      if (placa.trim() != "") {
        this.spinner.show();
        this.conexion.get("Broker/SBroker.svc/empresa/vehiculo/consultar/ant/" + placa, this.usuario.Uid).subscribe(
          (resANT: any) => {
            this.spinner.hide();
            var datos = JSON.parse(resANT);
            if (datos.Respuesta.length != 0 && placa.trim() != "") {
              if (datos.Respuesta[0].ANIO < validacion) {
                this.globales.mostarAlerta("Vehículos", "El vehículo supera los años de fabricación permitidos", "warning");
              } else {
                this.asignarValoresVehiculos(id, datos.Respuesta[0]);
              }
            }
            console.log(datos.Respuesta[0]);
          },
          err => {
            this.spinner.hide();
            console.log(err);
            this.conexion.error(err);
          }
        );
      }
    } else {
      this.eliminarVehiculo(id);
      this.globales.mostarAlerta("Vehículos", "El número de placa ingresada ya se encuentra cotizada.", "warning");
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
  }

  public asignarValoresVehiculos(id, lstVehiculos) {
    if (lstVehiculos != undefined) {
      for (var vehiculos of this.listaDetallesVehiculos) {
        if (vehiculos.id == id) {
          vehiculos.poliza = "PO-VH-" + this.globales.generarNumeroAleatorios();
          vehiculos.marca = lstVehiculos.MARCA;
          vehiculos.modelo = lstVehiculos.MODELO;
          vehiculos.anio = lstVehiculos.ANIO;
          vehiculos.motor = lstVehiculos.MOTOR;
          vehiculos.chasis = lstVehiculos.CHASIS;
          vehiculos.cod_color = lstVehiculos.cod_color;
          vehiculos.valorCasco = parseInt(lstVehiculos.PRECIOPROMEDIO);
          vehiculos.valorFijo = parseInt(lstVehiculos.PRECIOPROMEDIO);
          vehiculos.cod_marca = lstVehiculos.cod_marca;
          vehiculos.cod_modelo = lstVehiculos.cod_modelo;
          vehiculos.cod_pais = lstVehiculos.cod_pais;
          vehiculos.cod_submodelo = lstVehiculos.cod_submodelo;
          vehiculos.cod_tipo = lstVehiculos.cod_tipo;
          vehiculos.cod_tipo_ant = lstVehiculos.cod_tipo_ant;
          vehiculos.cod_tipo_placa = lstVehiculos.cod_tipo_placa;
          vehiculos.fechaCompra = this.globales.obtenerFechaValor(lstVehiculos.FEC_COMPRA_REGISTRO, "-");
          vehiculos.tipo = lstVehiculos.TIPO;
          //vehiculos.accesorios = this.valVehiculos.generarListaAccesorios(this.numeroAccesorios);
        }
      }
      this.calculoValorTotal(id);
      this.gestionDetalleVehiculos(id);
    }
  }

  public guardarPlacaPYMES(placa) {
    this.spinner.show();
    this.conexion.post("Broker/SBroker.svc/empresa/vehiculo/guardar/pymes", placa, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res)
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public calculoValorTotal(id: any) {

    for (var vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.valorCasco == null || vehiculos.valorCasco == undefined || vehiculos.valorCasco == "") {
        vehiculos.valorCasco = 0;
      } if (vehiculos.valorExtra == null || vehiculos.valorExtra == undefined || vehiculos.valorExtra == "") {
        vehiculos.valorExtra = 0;
      } if (vehiculos.id == id) {
        if (vehiculos.valorTotal <= this.maximoVehiculoValor) {
          vehiculos.valorTotal = vehiculos.valorCasco + vehiculos.valorExtra;
        } else {
          vehiculos.valorTotal = 0;
        }
      }
    }
  }

  public gestionDetalleVehiculosCalcular(id: any) {
    this.calculoValorTotal(id);
    this.gestionDetalleVehiculos(id);
  }

  public gestionDetalleVehiculos(id) {

    var fecha = new Date();
    var anio = fecha.getFullYear();
    var validacionSemipesados = anio - 15;
    var expresion = /^\d*(\.\d{1})?\d{0,1}$/;

    var livianos1 = { total: 0.0, cantidad: 0, tasa: 0.0 };
    var livianos2 = { total: 0.0, cantidad: 0, tasa: 0.0 };
    var livianos3 = { total: 0.0, cantidad: 0, tasa: 0.0 };
    var semipesados = { total: 0.0, cantidad: 0, tasa: 0.0 };
    var motos = { total: 0.0, cantidad: 0, tasa: 0.0 };
    var deducibles = { total: 0.0, cantidad: 0, tasa: 0.0 };

    for (var vehiculos of this.listaDetallesVehiculos) {

      //PRIMERA VALIDACION
      if (vehiculos.valorTotal > this.maximoVehiculoValor) {
        Swal.fire({
          text: "El valor total $" + vehiculos.valorTotal + " del vehículo no puede superar los $" + this.maximoVehiculoValor,
          confirmButtonText: "Continuar"
        });
        vehiculos.valorTotal = 0;
      }
      //SEGUNDA VALIDACION
      if (vehiculos.valorCasco > this.maximoVehiculoValor) {
        Swal.fire({
          text: "El valor del casco $" + vehiculos.valorCasco + " no puede superar los $" + this.maximoVehiculoValor,
          confirmButtonText: "Continuar"
        });
        vehiculos.valorCasco = 0;
      }
      //TERCERA VALIDACION
      if (vehiculos.valorExtra > this.maximoVehiculoValor) {
        Swal.fire({
          text: "El valor de extra $" + vehiculos.valorExtra + " no puede superar los $" + this.maximoVehiculoValor,
          confirmButtonText: "Continuar"
        });
        vehiculos.valorExtra = 0;
      }

      if (!expresion.test(vehiculos.valorCasco)) {
        vehiculos.valorCasco = 0;
      }

      //CUARTA VALIDACION
      if (vehiculos.valorTotal > this.maximoVehiculoDispositivo) {
        vehiculos.requiereDispositivo = "SI";
      } else {
        vehiculos.requiereDispositivo = "NO";
      }

      if (vehiculos.tipoVehiculo == "Motos") {
        vehiculos.autoSustituto = 0;
        vehiculos.polizaDeducibles = "0";
        vehiculos.cobertura = { "producto": 11693, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2404, "deducible": 76, "sucursal": 1, "ptvventa": 1, "codTipo": 1, "tipo": "MOTOS" };
      }

      if (vehiculos.tipoVehiculo == "SemiPesados") {
        vehiculos.autoSustituto = 0;
        //vehiculos.polizaDeducibles = "0";
        if (vehiculos.anio < validacionSemipesados) {
          vehiculos.cobertura = { "producto": 10430, "comercial": 161, "subproducto": 13, "textoAclaratorio": 2404, "deducible": 240, "sucursal": 1, "ptvventa": 1, "codTipo": 2, "tipo": "SEMIPESADOS" };
        } else {
          vehiculos.cobertura = { "producto": 10430, "comercial": 161, "subproducto": 13, "textoAclaratorio": 2404, "deducible": 240, "sucursal": 1, "ptvventa": 1, "codTipo": 2, "tipo": "SEMIPESADOS" };
        }

      }

      //VERIFICACION DE TASAS DE LOS VEHICULOS
      for (var tasa of this.listaTasasVehiculos) {

        if (vehiculos.tipoVehiculo == "Livianos") {
          if (vehiculos.anio >= tasa.AnioInicio && vehiculos.anio <= tasa.AnioFin) {
            if (tasa.Codigo == "LIV1") {
              vehiculos.cobertura = { "producto": 11189, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2404, "deducible": 145, "sucursal": 1, "ptvventa": 1, "codTipo": 3, "tipo": "LIVIANOS PERDIDA TOTAL" };
            } else if (tasa.Codigo == "LIV3" && vehiculos.polizaDeducibles == "1") {
              vehiculos.cobertura = { "producto": 11187, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2405, "deducible": 9, "sucursal": 1, "ptvventa": 1, "codTipo": 4, "tipo": "LIVIANOS TODO RIESGO AÑOS (2020-2017)" };
            } else if (tasa.Codigo == "LIV2" && vehiculos.polizaDeducibles == "1") {
              vehiculos.cobertura = { "producto": 11188, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2405, "deducible": 9, "sucursal": 1, "ptvventa": 1, "codTipo": 5, "tipo": "LIVIANOS TODO RIESGO AÑOS (2016-2008)" };
            } else if (tasa.Codigo == "LIV3" && vehiculos.polizaDeducibles == "0") {
              vehiculos.cobertura = { "producto": 11694, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2404, "deducible": 9, "sucursal": 1, "ptvventa": 1, "codTipo": 6, "tipo": "LIVIANOS TODO RIESGO AÑOS (2020-2017) POLIZAS CON DEDUCIBLE" };
            } else if (tasa.Codigo == "LIV2" && vehiculos.polizaDeducibles == "0") {
              vehiculos.cobertura = { "producto": 11695, "comercial": 161, "subproducto": 12, "textoAclaratorio": 2404, "deducible": 9, "sucursal": 1, "ptvventa": 1, "codTipo": 7, "tipo": "LIVIANOS TODO RIESGO AÑOS (2016-2008) POLIZAS CON DEDUCIBLE" };
            }
          }
        }

        if (vehiculos.tipoVehiculo == tasa.Tipo) {
          if (vehiculos.tipoVehiculo == "Livianos") {

            vehiculos.autoSustituto = 1;
            //vehiculos.polizaDeducibles = "1";

            if (vehiculos.anio >= tasa.AnioInicio && vehiculos.anio <= tasa.AnioFin) {
              vehiculos.tasa = tasa.Valor;
              if (tasa.Codigo == "LIV1") {
                livianos1.cantidad = livianos1.cantidad + 1;
                livianos1.total = livianos1.total + parseFloat(vehiculos.valorTotal);
                livianos1.tasa = tasa.Valor;
              }
              if (tasa.Codigo == "LIV2") {
                livianos2.cantidad = livianos2.cantidad + 1;
                livianos2.total = livianos2.total + parseFloat(vehiculos.valorTotal);
                livianos2.tasa = tasa.Valor;
              }
              if (tasa.Codigo == "LIV3") {
                livianos3.cantidad = livianos3.cantidad + 1;
                livianos3.total = livianos3.total + parseFloat(vehiculos.valorTotal);
                livianos3.tasa = tasa.Valor;
              }

            }
          } /*if (vehiculos.tipoVehiculo == "Deducibles") {
            console.log(tasa)
            vehiculos.autoSustituto = 0;
            if (vehiculos.polizaDeducibles == 1) {
              if (vehiculos.anio >= tasa.AnioInicio && vehiculos.anio <= tasa.AnioFin) {
                if (tasa.Codigo == "DED1") {
                  deducibles.cantidad = deducibles.cantidad + 1;
                  deducibles.total = deducibles.total + parseFloat(vehiculos.valorTotal);
                  deducibles.tasa = tasa.Valor;

                }
              }
            }
          } */if (vehiculos.tipoVehiculo == "Motos") {

            vehiculos.autoSustituto = 0;

            vehiculos.tasa = tasa.Valor;
            motos.cantidad = motos.cantidad + 1;
            motos.total = motos.total + parseFloat(vehiculos.valorTotal);
            motos.tasa = tasa.Valor;
          }
          if (vehiculos.tipoVehiculo == "SemiPesados") {

            vehiculos.autoSustituto = 0;

            vehiculos.tasa = tasa.Valor;
            semipesados.cantidad = semipesados.cantidad + 1;
            semipesados.total = semipesados.total + parseFloat(vehiculos.valorTotal);
            semipesados.tasa = tasa.Valor;
          }
        }
        if (vehiculos.polizaDeducibles == "1") {
          if (tasa.Tipo == "Deducibles") {
            vehiculos.valorPolizaDeducibles = tasa.Valor;
            if (tasa.Codigo == "DED1") {

              if (vehiculos.anio >= tasa.AnioInicio && vehiculos.anio <= tasa.AnioFin) {

                vehiculos.valorPrimaPolizaDeducibles = Math.round(((vehiculos.valorTotal * tasa.Valor) / 100) * 100) / 100;

                deducibles.cantidad = deducibles.cantidad + 1;
                deducibles.tasa = tasa.Valor;
                deducibles.total = deducibles.total + parseFloat(vehiculos.valorTotal);
              }
            }
          }
        } else if (vehiculos.polizaDeducibles == "0") {
          vehiculos.valorPrimaPolizaDeducibles = 0;
        }
      }
    }

    for (var subramo of this.listaVehiculos) {
      if (subramo.Datos.Codigo == "SVE1") {
        subramo.Valores.ValorU1.Valor = livianos3.total;
        subramo.Valores.NVehiculos = livianos3.cantidad;
        subramo.Valores.Tasa = livianos3.tasa;
        subramo.Valores.TasaMinima = livianos3.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      } if (subramo.Datos.Codigo == "SVE2") {
        subramo.Valores.ValorU1.Valor = livianos2.total;
        subramo.Valores.NVehiculos = livianos2.cantidad;
        subramo.Valores.Tasa = livianos2.tasa;
        subramo.Valores.TasaMinima = livianos2.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      } if (subramo.Datos.Codigo == "SVE3") {
        subramo.Valores.ValorU1.Valor = livianos1.total;
        subramo.Valores.NVehiculos = livianos1.cantidad;
        subramo.Valores.Tasa = livianos1.tasa;
        subramo.Valores.TasaMinima = livianos1.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      } if (subramo.Datos.Codigo == "SVE4") {
        subramo.Valores.ValorU1.Valor = motos.total;
        subramo.Valores.NVehiculos = motos.cantidad;
        subramo.Valores.Tasa = motos.tasa;
        subramo.Valores.TasaMinima = motos.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      } if (subramo.Datos.Codigo == "SVE5") {
        subramo.Valores.ValorU1.Valor = semipesados.total;
        subramo.Valores.NVehiculos = semipesados.cantidad;
        subramo.Valores.Tasa = semipesados.tasa;
        subramo.Valores.TasaMinima = semipesados.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      } if (subramo.Datos.Codigo == "SVE6") {
        subramo.Valores.ValorU1.Valor = deducibles.total;
        subramo.Valores.NVehiculos = deducibles.cantidad;
        subramo.Valores.Tasa = deducibles.tasa;
        subramo.Valores.TasaMinima = deducibles.tasa;
        this.general.calcularPrimaSubramo(this.listaVehiculos, subramo.Datos.Codigo);
      }
    }

    if (vehiculos.id == id) {
      if (vehiculos.placa != "") {
        this.generadorJSONVehiculos(vehiculos.id);
      }
    }

  }

  public agregarAccesorios(id) {
    for (let vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == id) {
        vehiculos.accesorios = [];
        for (let i = 0; i < vehiculos.numeroAccesorios; i++) {
          vehiculos.accesorios.push({ "secuencial": (i + 1), "cod_accesorio": 0, "suma_aseg_acc": "0", "pje_tasa": "0", "imp_prima": "0", "cod_tipo_je": "100", "txt_accesorio": "" });
        }
      }
    }
    this.gestionDetalleVehiculos(id);
  }

  public calcularPrimaAccesorio(idVehiculo, idAccesorio) {
    var expresion = /^\d*(\.\d{1})?\d{0,1}$/;

    for (let vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == idVehiculo) {
        for (let accesorio of vehiculos.accesorios) {
          if (accesorio.secuencial == idAccesorio) {
            accesorio.pje_tasa = vehiculos.tasa;

            if (!expresion.test(accesorio.suma_aseg_acc)) {
              accesorio.suma_aseg_acc = 0;
            }

            var tasaAccesorio = parseFloat(vehiculos.tasa) / 100;
            var prima = tasaAccesorio * parseFloat(accesorio.suma_aseg_acc);
            accesorio.imp_prima = Math.round(prima * 100) / 100;

          }
        }
      }
    }
    this.gestionDetalleVehiculos(idVehiculo);
  }

  public generarListaVehiculos(datos: any) {
    this.listaDetallesVehiculos = datos;
  }

  public generarListaAccesorios(id) {
    var accesorios = [];
    for (let vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == id) {
        accesorios = vehiculos.accesorios;
      }
    }
    return accesorios;
  }

  public validacionSumaAsegurada(idVehiculo) {
    for (let vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == idVehiculo) {
        if (vehiculos.placa != "") {
          var valor = parseInt(vehiculos.valorFijo) * 0.1;
          var maximo = Math.round((parseInt(vehiculos.valorFijo) + valor) * 100) / 100;
          var minimo = Math.round((parseInt(vehiculos.valorFijo) - valor) * 100) / 100;

          if (parseInt(vehiculos.valorCasco) > maximo) {
            vehiculos.valorCasco = vehiculos.valorFijo;
            vehiculos.valorTotal = vehiculos.valorFijo;
            if(minimo != 0 && maximo != 0){
              this.globales.mostarAlertaTiempo("", "Valor Permitido Entre: $" + this.globales.formatearNumero(minimo, 2) + " y $" + this.globales.formatearNumero(maximo, 2), "error");
            }
          } else if (parseInt(vehiculos.valorCasco) < minimo) {
            vehiculos.valorCasco = vehiculos.valorFijo;
            vehiculos.valorTotal = vehiculos.valorFijo;
            if(minimo != 0 && maximo != 0){
              this.globales.mostarAlertaTiempo("", "Valor Permitido Entre: $" + this.globales.formatearNumero(minimo, 2) + " y $" + this.globales.formatearNumero(maximo, 2), "error");
            }
          }
        }
      }
    }
  }

  public validacionSumaAseguradaAccesorios(idVehiculo) {
    var totalAccesorio = 0;
    for (let vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == idVehiculo) {
        for (let accesorios of vehiculos.accesorios) {
          var valor = parseInt(vehiculos.valorFijo) * 0.2;
          totalAccesorio += accesorios.suma_aseg_acc;

          if (totalAccesorio > valor) {
            accesorios.suma_aseg_acc = 0;
            this.globales.mostarAlertaTiempo("", "Valor máximo permitido de la suma de todos los accesorios: $" + this.globales.formatearNumero(valor, 2) + "", "error");
          }
        }
      }
    }
  }

  public generadorJSONVehiculos(id) {
    var accesorios = 0;
    for (let vehiculos of this.listaDetallesVehiculos) {
      vehiculos.detallesCotizacion.tasa = 0;
      vehiculos.detallesCotizacion.prima_neta = 0;
      vehiculos.detallesCotizacion.super = 0;
      vehiculos.detallesCotizacion.seg_camp = 0;
      vehiculos.detallesCotizacion.der_emi = 0;
      vehiculos.detallesCotizacion.iva = 0;
      vehiculos.detallesCotizacion.prima_total = 0

      if (vehiculos.accesorios.length > 0) {
        for (let accesorio of vehiculos.accesorios) {
          accesorios += accesorio.imp_prima;
        }
      }

      var cotizacion = this.general.calcularCotizacionVehiculos(vehiculos.valorTotal, vehiculos.tasa, this.listaDerechosEmision, this.listaCalculablesCotizacion, vehiculos.valorPrimaPolizaDeducibles, accesorios);

      vehiculos.detallesCotizacion.tasa = vehiculos.tasa;
      vehiculos.detallesCotizacion.prima_neta = cotizacion.primaNetaTotal;
      vehiculos.detallesCotizacion.super = cotizacion.impuestoSBS;
      vehiculos.detallesCotizacion.seg_camp = cotizacion.seguroCampesino;
      vehiculos.detallesCotizacion.der_emi = cotizacion.derechosEmision;
      vehiculos.detallesCotizacion.iva = cotizacion.iva;
      vehiculos.detallesCotizacion.prima_total = cotizacion.primaTotal;
    }
  }


  public gestionPaginacionDetallesVehiculos(id: any) {
    for (var vehiculos of this.listaDetallesVehiculos) {
      if (vehiculos.id == id) {
        vehiculos.estado = 1;
      } else {
        vehiculos.estado = 0;
      }
    }
  }

  public obtenerUnionDeducibles() {
    var deducibles = [];
    this.deducibles = [];
    for (let subramos of this.listaVehiculos) {
      var numeros = subramos.Datos.Union;
      var separacion = numeros.split(",");
      if (separacion[0] != 0 && separacion[1] != 0 && separacion[2] != 0) {
        deducibles.push({ id: separacion[0], vista: separacion[1], union: separacion[2] });
      }
    }
    this.deducibles = deducibles;
  }

  public JSONtoString(json) {
    return JSON.stringify(json);
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
}
