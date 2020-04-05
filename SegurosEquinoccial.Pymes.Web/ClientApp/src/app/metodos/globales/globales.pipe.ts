import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2'
import { VistaPipe } from '../../pipes/getion-vista/vista.pipe';
import { VariablesEmail } from '../../variables/email/email';


@Pipe({
  name: 'globales'
})
export class GlobalesPipe implements PipeTransform {

  disenio: VistaPipe = new VistaPipe();
  email: VariablesEmail = new VariablesEmail();

  transform(value: any, args?: any): any {
    return null;
  }

  public mostrarNotificacion(texto, tipo, posicion) {
    var tipo_ = "";
    var fondo = "";
    if (tipo == "success") {
      tipo_ = '<i class="mdi mdi-checkbox-marked-circle-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>'
      fondo = "#28B463";
    } else if (tipo == "warning") {
      tipo_ = '<i class="mdi mdi-alert-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>'
      fondo = "#D4AC0D";
    } else if (tipo == "error") {
      tipo_ = '<i class="mdi mdi-alert-octagon" style="font-size: 20px; color: #fff; padding-right: 8px"></i>'
      fondo = "#CB4335";
    }

    const Toast = Swal.mixin({
      toast: true,
      position: posicion,
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      html: tipo_ + '<span style="color: #FFF; font-size: 12.5px !important;">' + texto + '</span>',
      background: fondo
    })
  }

  public mostarAlertaTiempo(titulo, texto, tipo) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
      confirmButtonText: 'Aceptar',
      timer: 3000
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {

      }
    })
  }

  public mostarAlertaEstatica(titulo, texto, tipo) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {

      }
    })
  }

  public mostarAlerta(titulo, texto, tipo) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo
    });
  }

  public obtenerFecha(separador: any) {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    mes < 10 ? mes = "0" + mes : mes;
    dia < 10 ? dia = "0" + dia : dia;

    return anio + separador + mes + separador + dia;
  }

  public obtenerFechaEmision(separador: any) {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    mes < 10 ? mes = "0" + mes : mes;
    dia < 10 ? dia = "0" + dia : dia;

    return dia + separador + mes + separador + anio;
  }

  public obtenerFechaAnioEmision(separador: any) {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    mes < 10 ? mes = "0" + mes : mes;
    dia < 10 ? dia = "0" + dia : dia;

    return dia + separador + mes + separador + (anio + 1);
  }

  public obtenerFechaValor(fecha_: any, separador: any) {
    var fecha = new Date(fecha_);
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    mes < 10 ? mes = "0" + mes : mes;
    dia < 10 ? dia = "0" + dia : dia;

    return anio + separador + mes + separador + dia;
  }

  public formatearNumero(amount_, decimals) {

    var amountNumber = Math.round(amount_ * 100) / 100;
    var amount: any = amountNumber;

    amount += '';
    amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));

    decimals = decimals || 0;

    if (isNaN(amount) || amount === 0)
      return parseFloat("0").toFixed(decimals);

    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
  }

  public limpiarDireccion(direccion) {
    var str = direccion;
    var res = str.replace("&", "");
    var res1 = res.replace("amp;", "");
    return res1;
  }

  public limpiar(dato) {
    var str = dato;
    var res = str.replace("&", "");
    var res1 = res.replace("amp;", "");
    return res1;
  }

  public limpiarDatos(datos, caracter, remplazo) {
    var str = datos;
    var res = str.replace(caracter, remplazo);
    return res;
  }

  public obtenerNumerosCadena(cadena) {

    var cadena = cadena;
    var letras = cadena.replace(/\D/g, '');

    return letras;
  }

  public redondeo(numero, decimales) {
    var flotante = parseFloat(numero);
    var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
  }

  public generarNumeroAleatorios() {
    return Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
  }

  public formatoCampo(valor, restriccion, caracteres, tipo) {
    var out = '';
    var filtro = '' + restriccion + '';
    for (var i = 0; i < valor.length; i++) {
      if (filtro.indexOf(valor.charAt(i)) != -1) {
        if (out.length >= caracteres) {
          out.substr(0, caracteres);
        } else {
          out += valor.charAt(i);
        }
      }
    }
    return (tipo == 1) ? out.toUpperCase() : out;
  }

  public compararVectores(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  public generarRamos() {
    var ramos = "";
    for (let ramo_ of this.disenio.panelesValoresRamos) {
      ramos += this.disenio.gestionPanelesValoresRamosSeleccionadosTexto(ramo_) + ", ";
    }
    return ramos;
  }

  public generarDetalleEmail(empresa, pagador, ramos, valores, usuario, url) {

    var mensaje = this.email.generarEmail(
      pagador.Nombre + " " + pagador.PrimerApellido + " " + pagador.SegundoApellido,
      usuario.broker.RazonSocial,
      empresa.Ruc,
      empresa.RazonSocial,
      empresa.Telefono,
      ramos,
      this.formatearNumero(valores.total, 2),
      usuario.broker.Color,
      url,
      usuario.broker.Foto
    );

    return mensaje;
  }

  public obtenerDatosTarjeta(Plataforma, Trama) {
    var tramaPago: any;
    var bin = "0";
    var vencimiento = "0";

    if (Trama != "") {
      tramaPago = JSON.parse(Trama);
      if (Plataforma == "DATAFAST") {
        bin = tramaPago.card.bin;
        vencimiento = tramaPago.card.expiryYear + tramaPago.card.expiryMonth;
      } else if (Plataforma == "PAYPHONE") {
        bin = tramaPago.bin;
        vencimiento = "202212";
      }
    }

    return { bin: bin, vencimiento: vencimiento }
  }

  public obtenerLetrasCadena(cadena) {
    var cadena = cadena;
    var letras = cadena.replace(/\d/g, '');
    var final  = letras.replace('-', '');
    return final.trim();
  }

}
