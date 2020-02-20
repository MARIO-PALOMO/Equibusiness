import { Injectable } from '@angular/core';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
declare var $: any;

@Injectable()
export class GenericoService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public consultarCodigoAsegurado(documento) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.get("Broker/SBroker.svc/consultar/codigo/asegurado/" + documento, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          var asegurado = "";
          var xml = $.parseXML(res);
          var resultado = $(xml).find("ActualizarDatosAccContPOTENCIALxDocResponse")[0];

          if (resultado != undefined) {

            $(xml).find("ActualizarDatosAccContPOTENCIALxDocResponse").each(function () {
              asegurado = $(this).find('icod_aseg').text();
            });

            if (asegurado == "-1") {
              resolve(0);
            } else {
              resolve(asegurado);
            }

          } else {
            resolve(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public consultarPagador(idPv: any) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.get("Broker/SBroker.svc/consultar/pagador" + idPv, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          var codigo = "";
          var xml = $.parseXML(res);
          var resultado = $(xml).find("cod_aseg")[0];

          if (resultado != undefined) {

            $(xml).find("usuarios").each(function () {
              codigo = $(this).find('cod_aseg').text();
            });

            resolve(codigo);
          } else {
            resolve(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public consultarValorPagar(idPv: any) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.get("Broker/SBroker.svc/consultar/valor/pagar/" + idPv, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          var valor = "";
          var xml = $.parseXML(res);
          var resultado = $(xml).find("Column1")[0];

          if (resultado != undefined) {

            $(xml).find("usuarios").each(function () {
              valor = $(this).find('Column1').text();
            });

            resolve(valor);
          } else {
            resolve(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public aplicarPago(pago) {
    return new Promise<any>((resolve, reject) => {

      var datos = {
        "cobPagador": pago.codigoPagador,
        "cobTotal": Math.round(pago.total * 100) / 100,
        "cobPago": {
          "pagAutorizacion": pago.autorizacion,
          "pagBanco": pago.codigoBanco,
          "pagConducto": pago.codigoConducto,
          "pagFechaVoucher": pago.fecha,
          "pagTarjeta": pago.tarjeta,
          "pagVoucher": pago.voucher,
          "pagDescripcion": pago.holder
        },
        "cobPolizas": pago.polizas
      };

      var trama = {
        JSONPagos: JSON.stringify(datos)
      };
      console.log(trama.JSONPagos);
      this.conexion.post("Broker/SBroker.svc/consultar/aplicar/pago", trama, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          var xml = $.parseXML(res);
          var pago = "";

          var resultado = $(xml).find("generaCobroResponse")[0];
          if (resultado != undefined) {

            $(xml).find("generaCobroResponse").each(function () {
              pago = $(this).find('generaCobroResult').text();
            });

            var resultado = JSON.parse(pago);

            if (resultado.cobsnError == -1) {
              var err = {
                message: "Error al aplicar pago.",
                name: "Error en el servicio externo",
                ok: "false",
                status: "400",
                statusText: "Bad Request",
                url: "generico.service.ts",
                error: res
              };
              this.conexion.error(err)
              resolve(0);
            } else {
              resolve({ descripcion: resultado.cobError, codigo: resultado.cobCodigo, recibo: resultado.cobRecibo });
            }
          } else {
            resolve(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error con el servicio de aplicar pagos masivos mas de 5 pólizas.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public aplicarPago5Polizas(pago) {
    return new Promise<any>((resolve, reject) => {

      var trama = {
        canal: pago.canal,
        sucursal: pago.sucursal,
        pagador: pago.pagador,
        tarjeta: pago.tarjeta,
        autorizacion: pago.autorizacion,
        codigoBanco: pago.codigoBanco,
        codigoConducto: pago.codigoConducto,
        voucher: pago.voucher,
        fechaVoucher: pago.fechaVoucher,
        holderTarjeta: pago.holderTarjeta,
        IdPv: pago.idpvTotal
      }

      console.log(trama);

      this.conexion.post("Broker/SBroker.svc/consultar/aplicar/pago/menor", trama, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);
          var descripcion = "";
          var proceso = "";
          var recibo = "";

          var xml = $.parseXML(res);
          var pago = "";

          var resultado = $(xml).find("pagoTarjetaMasivosResponse")[0];
          if (resultado != undefined) {

            $(xml).find("pagoTarjetaMasivosResponse").each(function () {
              pago = $(this).find('pagoTarjetaMasivosResult').text();
            });

            var estado = $.parseXML(pago);
            var resultadoEstado = $(estado).find("DetalleRecaudo")[0];
            if (resultadoEstado != undefined) {
              $(estado).find("DetalleRecaudo").each(function () {
                descripcion = $(this).find('txt_descripcion').text();
                proceso = $(this).find('id_proceso').text();
                recibo = $(this).find('nro_recibo').text();
              });

              if (descripcion == "PROCESO CORRECTO") {
                resolve({
                  descripcion: descripcion,
                  proceso: proceso,
                  recibo: recibo
                });
              } else {
                resolve(0);
                var err = {
                  message: "Error al aplicar pago.",
                  name: "Error en el servicio externo, hasta 5 pólizas",
                  ok: "false",
                  status: "400",
                  statusText: "Bad Request",
                  url: "generico.services.ts",
                  error: res + ""
                };
                this.conexion.error(err);
              }
            } else {

              resolve(0);

              var err = {
                message: "Error al aplicar pago.",
                name: "Error en el servicio externo, hasta 5 pólizas",
                ok: "false",
                status: "400",
                statusText: "Bad Request",
                url: "generico.services.ts",
                error: res + ""
              };

              this.conexion.error(err);
            }
          } else {

            resolve(0);

            var err = {
              message: "Error al aplicar pago.",
              name: "Error en el servicio externo, hasta 5 pólizas",
              ok: "false",
              status: "400",
              statusText: "Bad Request",
              url: "generico.services.ts",
              error: res + ""
            };

            this.conexion.error(err);
            console.log(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error con el servicio de aplicar pagos masivos hasta 5 polizas.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarFormulario(documento: any) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/consultar/formulario/vinculacion", documento, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);
          var estado = "";
          var xml = $.parseXML(res);
          var resultado = $(xml).find("ConsultarFormularioVinculacionValidoExtResponse")[0];

          if (resultado != undefined) {

            $(xml).find("ConsultarFormularioVinculacionValidoExtResponse").each(function () {
              estado = $(this).find('ConsultarFormularioVinculacionValidoExtResult').text();
            });

            resolve(estado);
          } else {
            resolve(0);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error con el servicio de verificar formulario.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public consultarClausulas(ramo) {

    var xmlClausulas = "";
    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/resumen/consultar/clausulas", { IdBroker: this.usuario.broker.IdBroker }, this.usuario.Uid).subscribe((res: any) => {


        if (res.length != 0) {
          for (let clausulas of res) {
            if (clausulas.Ramo.Codigo == ramo) {
              xmlClausulas += `<clausula><cod_clausula>` + clausulas.Codigo + `</cod_clausula></clausula>`;
            }
          }
        }

        resolve(xmlClausulas);
      },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public consultarBin(FormaPago) {
    console.log(FormaPago.Trama)
    var tramaPago = JSON.parse(FormaPago.Trama);
    var bin = "";

    if (FormaPago.Plataforma == "DATAFAST") {
      bin = tramaPago.card.bin;
    } else if (FormaPago.Plataforma == "PAYPHONE") {
      bin = tramaPago.bin;
    }

    return new Promise<any>((resolve, reject) => {
      this.conexion.getPay("Gestion/SGesGestion.svc/bin/listar/" + bin).subscribe(
        (res: any) => {
          console.log(res);
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public insertarPolizas(IdCotizacionResultado, IdCotizacion, IdPV, Ramo, FechaEmision) {

    var Identificador = 0;

    if (Ramo == "MULTI") {
      Identificador = 1;
    } else if (Ramo == "EM") {
      Identificador = 3;
    } else if (Ramo == "RC") {
      Identificador = 4;
    } else if (Ramo == "FI") {
      Identificador = 5;
    } else if (Ramo == "AP") {
      Identificador = 6;
    } else if (Ramo == "TRIN") {
      Identificador = 7;
    } else if (Ramo == "TRIM") {
      Identificador = 8;
    } else if (Ramo == "VH") {
      Identificador = 9;
    }

    var contenido = {
      Identificador: Identificador,
      IdCotizacionResultado: IdCotizacionResultado,
      Cotizacion: {
        IdCotizacion: IdCotizacion,
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
      IdPvAccidentesPersonales: IdPV,
      IdPvEquipoMaquinaria: IdPV,
      IdPvFidelidad: IdPV,
      IdPvMultiriesgo: IdPV,
      IdPvResponsabilidadCivil: IdPV,
      IdPvTransImportaciones: IdPV,
      IdPvTransInterno: IdPV,
      IdPvVehiculos: IdPV,
      FechaEmision: FechaEmision,
    }

    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/cotizacion/resultado/gestion", contenido, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>No se pudo gestionar el IDPV - " + Ramo, "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public actualizarEstadoPolizas(IdCotizacionResultado, IdCotizacion) {
    var contenido = {
      Identificador: 10,
      IdCotizacionResultado: IdCotizacionResultado,
      Cotizacion: {
        IdCotizacion: IdCotizacion,
      },
      EstadoAccidentesPersonales: 0,
      EstadoEquipoMaquinaria: 0,
      EstadoFidelidad: 0,
      EstadoGlobal: 1,
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

    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/cotizacion/resultado/gestion", contenido, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>No se pudo actualizar el estado de las pólizas la gestión de pólizas emitidas", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public actualizarEstadoPagoPolizas(IdCotizacionResultado) {
    var contenido = {
      Identificador: 12,
      IdCotizacionResultado: IdCotizacionResultado,
      Cotizacion: {
        IdCotizacion: 0,
      },
      EstadoAccidentesPersonales: 0,
      EstadoEquipoMaquinaria: 0,
      EstadoFidelidad: 0,
      EstadoGlobal: 0,
      EstadoMultiriesgo: 0,
      EstadoPagoGlobal: 1,
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

    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/cotizacion/resultado/gestion", contenido, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>No se pudo actualizar el estado del pago en la gestión de pólizas emitidas", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }


  public listarAgentes(tipo) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.get('Broker/SBroker.svc/consultar/codigo/agente/' + tipo, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var data = [];

          $(xml).find("Table").each(function (i, e) {
            data.push({ codigoAgente: $(this).find('cod_agente').text(), nombreAgente: $(this).find('fullname').text() });
          });

          resolve(data);

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public listarSucursales() {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/consultar/catalogo/sucursal', this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public listarProvinciasCiudades() {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/consultar/catalogo/provincias', this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public consultaDeudasPendientes(asegurado) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/consultar/cotizacion/deudas/' + asegurado, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var deuda = $(xml).find('sn_tiene_deuda').text();

          resolve(deuda);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarListasNegras(identificacion) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Gestion/SGesConsultas.svc/cotizacion/consultar/listas/negras/' + identificacion, this.usuario.Uid).subscribe(
        (res: any) => {

          var estado = "";
          var xml = $.parseXML(res);

          var resultado = $(xml).find("ConsultarClienteEnListasNegrasInternacionalesResponse")[0];

          if (resultado != undefined) {
            $(xml).find("ConsultarClienteEnListasNegrasInternacionalesResponse").each(function () {
              estado = $(this).find('ConsultarClienteEnListasNegrasInternacionalesResult').text();
            });
          } else {
            estado = "true";
          }

          resolve(estado);

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarCompromisoSise(datos) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post('Broker/SBroker.svc/cotizacion/validar/compromisos/sise', datos, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var estadoCompromiso = 0;
          console.log("COMPROMISO SISE", xml);
          $(xml).find("ConsultarCompromisosAbiertosconOtrosCorredoresResponse").each(function () {
            estadoCompromiso = parseInt($(this).find('ConsultarCompromisosAbiertosconOtrosCorredoresResult').text());
          });
          resolve(estadoCompromiso);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarPolizaSise(datos) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post('Broker/SBroker.svc/cotizacion/validar/poliza/sise', datos, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var estadoPoliza = 0;
          console.log("POLIZA SISE", xml);
          $(xml).find("ConsultarPolizasVigentesconOtrosCorredoresResponse").each(function () {
            estadoPoliza = $(this).find('ConsultarPolizasVigentesconOtrosCorredoresResult').text();
          });
          resolve(estadoPoliza);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarPolizaPymes(identificacion) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Gestion/SGesConsultas.svc/cotizacion/consultar/vencimiento/poliza/' + identificacion, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public actualizarDatosAsegurado(datos) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post('Broker/SBroker.svc/empresa/persona/servicio/actualizar', datos, this.usuario.Uid).subscribe(
        (res: any) => {
          var datos = JSON.parse(res);
          resolve(datos);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public actualizarCotizacionFecha(idCotizacion) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/cotizacion/actualizar/fecha/' + idCotizacion, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public enviarCorreoElectronico(datos) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post('Broker/SBroker.svc/email/enviar', datos, this.usuario.Uid).subscribe(
        (res: any) => {
          if (res == "Exito") {
            resolve(true);
          } else {
            resolve(false);
          }

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public generarPagoTarjeta(pago) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.postPay('Gestion/SGesGestion.svc/pago/factura/ingresar/datos', pago).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public obtenerPagoTarjeta(pago) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.getPay("Gestion/SGesGestion.svc/pago/pago/listar/" + pago).subscribe(
        (res: any) => {

          var tramaPago: any;
          var bin = "";
          var vencimiento = "";

          if (res.Estado == 2) {
            tramaPago = JSON.parse(res.ResultadoTrama);
            if (res.Plataforma == "DATAFAST") {
              bin = tramaPago.card.bin;
              vencimiento = tramaPago.card.expiryYear + tramaPago.card.expiryMonth;
            } else if (res.Plataforma == "PAYPHONE") {
              bin = tramaPago.bin;
              vencimiento = "202212";
            }
          }

          var retorno = {
            Estado: res.Estado,
            Plataforma: res.Plataforma,
            CodigoAutenticacion: res.CodigoAutenticacion,
            Referencia: res.Referencia,
            Lote: res.Lote,
            Voucher: res.Voucher,
            Diferidos: res.NumeroDiferidos,
            Intereses: res.Intereses,
            Trama: res.ResultadoTrama,
            Fecha: this.globales.obtenerFechaValor(res.FechaTransaccion, "-"),
            Bin: bin,
            Vencimiento: vencimiento
          }

          resolve(retorno);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarPagoTarjeta(pago) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.getPay("Gestion/SGesGestion.svc/pago/pago/listar/" + pago).subscribe(
        (res: any) => {

          resolve(res.Estado);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public anularPagoTarjeta(pago) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.getPay("Gestion/SGesGestion.svc/pago/anulacion/" + pago).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public listarBancos() {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/cotizacion/forma/debito/bancos', this.usuario.Uid).subscribe(
        (res: any) => {

          var xml = $.parseXML(res);
          var data = [];

          $(xml).find("Table").each(function (i, e) {
            data.push({ codigoConducto: $(this).find('cod_conducto').text(), nombreConducto: $(this).find('txt_desc_cond').text(), tipoConducto: $(this).find('cod_tipo_conducto').text() });
          });

          resolve(data);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public listarCuotas(conducto) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/cotizacion/forma/debito/cuotas/' + conducto, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var data = [];

          $(xml).find("Table").each(function (i, e) {
            data.push({ codigoPago: $(this).find('cod_ppago').text(), codigoConducto: $(this).find('cod_conducto').text(), nombreCuota: $(this).find('txt_desc').text(), codigoNegocio: $(this).find('id_negocio').text() });
          });

          resolve(data);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          console.log(err)
          reject(err);
        }
      );
    });
  }

  public listarNumeroCuotas(codigo) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/cotizacion/forma/debito/numero/' + codigo, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);
          var numero;

          $(xml).find("Table").each(function (i, e) {
            numero = $(this).find('nro_cuotas').text();
          });

          resolve(parseInt(numero));
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public verificarReglasGenerales(idBroker, nombre) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get('Broker/SBroker.svc/broker/reglas/generales/consultar?broker=' + idBroker + '&nombre=' + nombre, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Contactese con el administrador del sistema.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

}
