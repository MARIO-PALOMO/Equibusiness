import { Injectable } from '@angular/core';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { EmisionService } from '../emision/emision.service';
import { GenericoService } from '../generico/generico.service';
import { ResumenService } from '../resumen/resumen.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CotizacionComponent } from '../../cliente/cotizacion/cotizacion.component';
declare var $: any;

@Injectable()
export class PolizaMultiriesgoService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();
  codigoAsegurado = 0;
  codigoAseguradoContratratante = 0;
  codigoAseguradoPagador = 0;
  datosBin: any;
  cotizacion: CotizacionComponent;

  constructor(public conexion: ApiService, public sesion: SesionService, public emision: EmisionService, public generico: GenericoService, public resumen: ResumenService, private spinner: NgxSpinnerService, private router: Router) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo) {
    this.spinner.show();
    this.generico.verificarFormulario(DatosEmpresa).then(res => {
      this.spinner.hide();
      if (res == "true") {
        this.spinner.show();
        this.generico.verificarFormulario(DatosPagador).then(res => {
          this.spinner.hide();
          if (res == "true") {
            this.buscarCotizacion(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo);
          } else {
            this.globales.mostrarNotificacion("El formulario del pagador aún no se encuentra firmado", "warning", "bottom");
          }

        }).catch(err => {
          this.spinner.hide();
          this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Empresa", "error", "#E74C3C");
        });
      } else {
        this.globales.mostrarNotificacion("El formulario de la empresa aún no se encuentra firmado", "warning", "bottom");
      }

    }).catch(err => {
      this.spinner.hide();
      this.globales.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Pagador", "error", "#E74C3C");
    });
  }

  public buscarCotizacion(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo) {
    this.spinner.show();
    this.resumen.buscarCotizacion(Cotizacion.IdContenido, Cotizacion.IdCotizacion, Cotizacion.IdDireccion, Cotizacion.IdVehiculos, Cotizacion.IdEmpresa, Riesgo, RamoValidacion, Cotizacion.Transportes).then(res => {
      this.spinner.hide();
      var Incisos = res.textoIncisos;
      var Aclaratorios = res.textoAclaratorio;

      if (RamoValidacion == "AP") {
        this.enviarTextoInsisosAP(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo, Incisos, Aclaratorios);
      } else {
        this.enviarTextoInsisos(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo, Incisos, Aclaratorios);
      }


    }).catch(err => {
      this.spinner.hide();
    });
  }

  public enviarTextoInsisosAP(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo, Incisos, Aclaratorios) {
    if (Cotizacion.GrupoDirectivo > 0 && Cotizacion.GrupoAdministrativo > 0 && Cotizacion.GrupoOperativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 1, Incisos.item1).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.spinner.show();
          this.resumen.enviarTextoInsisosPoliza(Certificado, 2, Incisos.item2).then(res => {
            this.spinner.hide();
            if (res == "1") {
              this.spinner.show();
              this.resumen.enviarTextoInsisosPoliza(Certificado, 3, Incisos.item3).then(res => {
                this.spinner.hide();
                if (res == "1") {
                  this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
                }
              }).catch(err => {
                this.spinner.hide();
              });
            }

          }).catch(err => {
            this.spinner.hide();
          });
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoDirectivo > 0 && Cotizacion.GrupoAdministrativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 1, Incisos.item1).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.spinner.show();
          this.resumen.enviarTextoInsisosPoliza(Certificado, 2, Incisos.item2).then(res => {
            this.spinner.hide();
            if (res == "1") {
              this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
            }

          }).catch(err => {
            this.spinner.hide();
          });
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoDirectivo > 0 && Cotizacion.GrupoOperativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 1, Incisos.item1).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.spinner.show();
          this.resumen.enviarTextoInsisosPoliza(Certificado, 3, Incisos.item3).then(res => {
            this.spinner.hide();
            if (res == "1") {
              this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
            }

          }).catch(err => {
            this.spinner.hide();
          });
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoAdministrativo > 0 && Cotizacion.GrupoOperativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 2, Incisos.item2).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.spinner.show();
          this.resumen.enviarTextoInsisosPoliza(Certificado, 3, Incisos.item3).then(res => {
            this.spinner.hide();
            if (res == "1") {
              this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
            }

          }).catch(err => {
            this.spinner.hide();
          });
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoDirectivo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 1, Incisos.item1).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoAdministrativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 2, Incisos.item2).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else if (Cotizacion.GrupoOperativo > 0) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 3, Incisos.item3).then(res => {
        this.spinner.hide();
        if (res == "1") {
          this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
        }

      }).catch(err => {
        this.spinner.hide();
      });
    } else {
      console.log("NO HIZO NADA");
    }
  }

  public enviarTextoInsisos(DatosEmpresa, DatosContratante, DatosPagador, XML, Certificado, Cotizacion, Direcciones, RamoValidacion, Riesgo, Incisos, Aclaratorios) {


    var inicio = "LA RESPONSABILIDAD MAXIMA DE LA COMPANIA EN CASO DE SINIESTRO, SERA EL VALOR ASEGURADO DE LA POLIZA. POR LO TANTO EN CASO DE UN SINIESTRO QUE LLEGUE A ESTE VALOR, EL DEDUCIBLE SE DESCONTARA DE ESTE MONTO";

    if (Direcciones[0] != undefined) {
      this.spinner.show();
      this.resumen.enviarTextoInsisosPoliza(Certificado, 1, inicio + "\n\n" + Incisos.item1).then(res => {
        this.spinner.hide();
        if (res == "1") {
          if (Direcciones[1] != undefined) {
            this.spinner.show();
            this.resumen.enviarTextoInsisosPoliza(Certificado, 2, Incisos.item2).then(res => {
              this.spinner.hide();
              if (res == "1") {
                if (Direcciones[2] != undefined) {
                  this.spinner.show();
                  this.resumen.enviarTextoInsisosPoliza(Certificado, 3, Incisos.item3).then(res => {
                    this.spinner.hide();
                    if (res == "1") {
                      if (Direcciones[3] != undefined) {
                        this.spinner.show();
                        this.resumen.enviarTextoInsisosPoliza(Certificado, 4, Incisos.item4).then(res => {
                          this.spinner.hide();
                          if (res == "1") {
                            if (Direcciones[4] != undefined) {
                              this.spinner.show();
                              this.resumen.enviarTextoInsisosPoliza(Certificado, 5, Incisos.item5).then(res => {
                                this.spinner.hide();
                                if (res == "1") {
                                  this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
                                }

                              }).catch(err => {
                                this.spinner.hide();
                              });
                            } else {
                              this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
                            }
                          }

                        }).catch(err => {
                          this.spinner.hide();
                        });
                      } else {
                        this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
                      }
                    }

                  }).catch(err => {
                    this.spinner.hide();
                  });
                } else {
                  this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
                }
              }

            }).catch(err => {
              this.spinner.hide();
            });
          } else {
            this.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, RamoValidacion);
          }
        }

      }).catch(err => {
        this.spinner.hide();
      });
    }
  }

  public enviarTextoAclaratorioPoliza(Certificado, Aclaratorios, XML, Cotizacion, Ramo) {
    this.spinner.show();
    this.resumen.enviarTextoAclaratorioPoliza(Certificado, Aclaratorios).then(res => {
      this.spinner.hide();
      this.emisionPolizas(XML, Certificado, Cotizacion, Ramo);
    }).catch(err => {
      this.spinner.hide();
    });
  }

  public emisionPolizas(XML, Certificado, Cotizacion, Ramo) {
    this.spinner.show();
    this.emision.emisionPolizas(XML).then(res => {
      this.spinner.hide();
      if (res == 0) {
        Swal.fire({
          title: 'Error Emisión Póliza',
          html: "Error al generar Póliza.",
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'Reintentar',
        }).then((result) => {
          if (result.value) {
            this.emisionPolizas(XML, Certificado, Cotizacion, Ramo);
          }
        });
      } else {
        this.insertarPolizas(Cotizacion, res, Certificado, Ramo);

        Swal.fire({
          title: 'Póliza Emitida',
          html: "La póliza ha sido gestionada correctamente<br>Código: " + res + " - Certificado: " + Certificado + "<br><br><small>Usted recibirá su factura y su póliza electrónica en las próximas 24 horas</small><br><br><small>Para visualizar la póliza, por favor ingresar a nuestro portal de servicios de Seguros Equinoccial</small>",
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          onClose: function (res) {
            location.reload();
          }
        });
      }
    }).catch(err => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error Emisión Póliza',
        html: "Error al generar Póliza.",
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'Reintentar',
      }).then((result) => {
        if (result.value) {
          this.emisionPolizas(XML, Certificado, Cotizacion, Ramo);
        }
      });
    });
  }

  public insertarPolizas(Cotizacion, IdPV, Certificado, Ramo) {
    this.spinner.show();
    this.generico.insertarPolizas(Cotizacion.IdCotizacionResultado, Cotizacion.IdCotizacion, JSON.stringify({ polIdPv: IdPV, polCertificado: Certificado, polTotal: Cotizacion.Total }), Ramo, Cotizacion.FechaEmision).then(res => {
      this.spinner.hide();
      console.log(res);
    }).catch(err => {
      this.spinner.hide();
    });
  }


}
