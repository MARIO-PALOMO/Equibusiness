import { Injectable } from '@angular/core';
import { GlobalesPipe } from '../globales/globales.pipe';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import Swal from 'sweetalert2';
import { GenericoService } from '../../controladores/generico/generico.service';
import { EmisionService } from '../../controladores/emision/emision.service';

@Injectable()
export class GeneradorVehiculosService {

  usuario: any;
  global: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService, private spinner: NgxSpinnerService, private router: Router, public generico: GenericoService, public emision: EmisionService) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public verificarFormulario(DatosEmpresa, DatosContratante, DatosPagador, Cotizacion, Trama) {
    this.spinner.show();
    this.generico.verificarFormulario(DatosEmpresa).then(res => {
      this.spinner.hide();
      if (res == "true") {
        this.spinner.show();
        this.generico.verificarFormulario(DatosPagador).then(res => {
          this.spinner.hide();
          if (res == "true") {
            this.ingresarDatosVehiculos(Cotizacion, Trama);
          } else {
            this.global.mostrarNotificacion("El formulario del pagador aún no se encuentra firmado", "warning", "bottom");
          }

        }).catch(err => {
          this.spinner.hide();
          this.global.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Empresa", "error", "#E74C3C");
        });
      } else {
        this.global.mostrarNotificacion("El formulario de la empresa aún no se encuentra firmado", "warning", "bottom");
      }

    }).catch(err => {
      this.spinner.hide();
      this.global.mostrarNotificacion("Problemas con el servidor de datos:<br>Error al verificar formulario | Pagador", "error", "#E74C3C");
    });
  }

  public ingresarDatosVehiculos(Cotizacion, Trama) {
    this.spinner.show();
    this.emision.ingresarDatosVehiculos(Trama).then(res => {
      this.spinner.hide();
      if (res == 0) {
        Swal.fire({
          title: 'Datos Vehículo',
          html: "Los datos del vehículo no pudieron ser procesados, intente nuevamente.",
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Reintentar'
        }).then((result) => {
          if (result.value) {
            this.ingresarDatosVehiculos(Cotizacion, Trama);
          }
        });
      } else {
        this.generarPolizaVehiculos(res.proceso, res.certificado, Cotizacion, Trama);
      }
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
      Swal.fire({
        title: 'Datos Vehículo',
        html: "Los datos del vehículo no pudieron ser procesados, intente nuevamente.",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Reintentar'
      }).then((result) => {
        if (result.value) {
          this.ingresarDatosVehiculos(Cotizacion, Trama);
        }
      });
    });
  }


  public generarPolizaVehiculos(proceso, certificado, Cotizacion, Trama) {
    this.spinner.show();
    this.emision.generarPolizaVehiculos(proceso, Trama.id_certificado).then(res => {
      this.spinner.hide();
      if (res == 0) {
        Swal.fire({
          title: 'Póliza Vehículo',
          html: "Error al emitir póliza de vehículo.",
          type: 'warning',
          showCancelButton: true,
          showCloseButton: false,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Reintentar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            this.generarPolizaVehiculos(proceso, certificado, Cotizacion, Trama);
          }
        });
      } else {

        Swal.fire({
          title: 'Póliza Emitida',
          html: "La póliza ha sido gestionada correctamente<br>Código: " + res.id_pv + " - Certificado: " + Trama.id_certificado + "<br><br><small>Usted recibirá su factura y su póliza electrónica en las próximas 24 horas</small><br><br><small>Para visualizar la póliza, por favor ingresar a nuestro portal de servicios de Seguros Equinoccial</small>",
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          onClose: function (res) {
            location.reload();
          }
        });

        this.insertarPolizas(Cotizacion, res.id_pv, Trama.id_certificado, 'VH');

      }
    }).catch(err => {
      this.spinner.hide();
      Swal.fire({
        title: 'Póliza Vehículo',
        html: "Error al emitir póliza de vehículo.",
        type: 'warning',
        showCancelButton: true,
        showCloseButton: false,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Reintentar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.generarPolizaVehiculos(proceso, certificado, Cotizacion, Trama);
        }
      });
    });
  }

  public insertarPolizas(Cotizacion, IdPV, Certificado, Ramo) {
    this.spinner.show();
    this.generico.insertarPolizas(Cotizacion.IdCotizacionResultado, Cotizacion.IdCotizacion, JSON.stringify({ polIdPv: IdPV, polCertificado: Certificado, polTotal: Cotizacion.Total }), Ramo).then(res => {
      this.spinner.hide();
      console.log(res);
    }).catch(err => {
      this.spinner.hide();
    });
  }

}
