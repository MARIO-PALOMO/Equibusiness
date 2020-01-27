import { Injectable } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GenericoService } from '../generico/generico.service';
import Swal from 'sweetalert2'

@Injectable()
export class PagoService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService, public generico: GenericoService, private spinner: NgxSpinnerService, private router: Router) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public consultarBin(FormaPago, Datos, CotizacionResultado) {
    this.spinner.show();
    this.generico.consultarBin(FormaPago).then(res => {
      this.spinner.hide();

      var datosBin = res;
      var tramaPago = JSON.parse(FormaPago.Trama);
      var bin = "";
      var holder = "";

      if (FormaPago.Plataforma == "DATAFAST") {
        bin = tramaPago.card.bin;
        holder = tramaPago.card.holder;
      } else if (FormaPago.Plataforma == "PAYPHONE") {
        bin = tramaPago.bin;
        holder = tramaPago.optionalParameter4;
      }

      var PagoMas5Polizas = {
        codigoPagador: Datos.codigoAseguradoPagador,
        total: Datos.totalGlobal,
        autorizacion: this.globales.obtenerNumerosCadena(FormaPago.CodigoAutenticacion),
        codigoBanco: datosBin.CodigoBanco,
        codigoConducto: datosBin.CodigoConducto,
        fecha: FormaPago.Fecha,
        tarjeta: bin,
        voucher: FormaPago.Voucher,
        holder: holder,
        polizas: CotizacionResultado.Polizas
      }


      if (CotizacionResultado.Polizas.length <= 5) {
        console.log("MENOS DE 5 POLIZAS");
        var polizas = "";
        for (let i = 0; i < CotizacionResultado.Polizas.length; i++) {
          polizas += CotizacionResultado.Polizas[i].polIdPv + "$" + CotizacionResultado.Polizas[i].polTotal + ";";
        }

        var cadena = polizas;
        var idpvPoliza = cadena.substring(0, (cadena.length - 1));

        var PagoMenos5Polizas = {
          canal: "USR" + FormaPago.Plataforma,
          sucursal: Datos.sucursal,
          pagador: Datos.codigoAseguradoPagador,
          tarjeta: bin,
          autorizacion: this.globales.obtenerNumerosCadena(FormaPago.CodigoAutenticacion),
          codigoBanco: datosBin.CodigoBanco,
          codigoConducto: datosBin.CodigoConducto,
          voucher: FormaPago.Voucher,
          fechaVoucher: FormaPago.Fecha,
          holderTarjeta: holder,
          idpvTotal: idpvPoliza
        }
        this.aplicarPagoMenos5Polizas(PagoMenos5Polizas, CotizacionResultado);
      } else {
        console.log("MAS DE 5 POLIZAS");
        this.aplicarpagoMas5Polizas(PagoMas5Polizas, CotizacionResultado);
      }

    }).catch(err => {
      this.spinner.hide();
    });
  }

  public aplicarPagoMenos5Polizas(Pago, CotizacionResultado) {
    this.spinner.show();
    this.generico.aplicarPago5Polizas(Pago).then(res => {
      this.spinner.hide();

      if (res == 0) {
        Swal.fire({
          title: 'Aplicación del Pago',
          html: "Error al aplicar el pago. Servicio no disponible, intente nuevamante mas tarde.",
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.value) {
            this.aplicarPagoMenos5Polizas(Pago, CotizacionResultado);
          }
        });
      } else {

        this.actualizarEstadoPagoPolizas(CotizacionResultado);
        var router: any = this.router;
        Swal.fire({
          title: 'Aplicación del Pago',
          html: "El pago ha sido aplicado correctamente",
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          onClose: function (res) {
            router.navigate(['/cliente/inicio']);
          }
        });
      }

    }).catch(err => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error Pago',
        html: "Error al aplicar el pago. Servicio no disponible, intente nuevamante mas tarde.",
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Continuar',
      }).then((result) => {
        if (result.value) {
          this.aplicarPagoMenos5Polizas(Pago, CotizacionResultado);
        }
      });
    });
  }

  public aplicarpagoMas5Polizas(Pago, CotizacionResultado) {
    this.spinner.show();
    this.generico.aplicarPago(Pago).then(res => {
      this.spinner.hide();

      if (res == 0) {
        Swal.fire({
          title: 'Aplicación del Pago',
          html: "Error al aplicar el pago. Servicio no disponible, intente nuevamante mas tarde.",
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          /*if (result.value) {
            this.aplicarpago(Pago, CotizacionResultado);
          }*/
        });
      } else {

        this.actualizarEstadoPagoPolizas(CotizacionResultado);
        var router: any = this.router;
        Swal.fire({
          title: 'Aplicación del Pago',
          html: "El pago ha sido aplicado correctamente",
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          onClose: function (res) {
            router.navigate(['/cliente/inicio']);
          }
        });
      }

    }).catch(err => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error Pago',
        html: "Error al aplicar el pago. Servicio no disponible, intente nuevamante mas tarde.",
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Continuar',
      }).then((result) => {
        /*if (result.value) {
          this.aplicarpago(Pago, CotizacionResultado);
        }*/
      });
    });
  }

  public actualizarEstadoPagoPolizas(CotizacionResultado) {
    console.log(CotizacionResultado);
    this.spinner.show();
    this.generico.actualizarEstadoPagoPolizas(CotizacionResultado.IdCotizacionResultado).then(res => {
      this.spinner.hide();
      console.log(res);
    }).catch(err => {
      this.spinner.hide();
    });
  }

}
