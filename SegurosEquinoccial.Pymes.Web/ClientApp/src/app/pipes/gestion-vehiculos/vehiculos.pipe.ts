import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gestionVehiculos'
})
export class VehiculosPipe implements PipeTransform {

  public lista = [{ text: 0, value: 0 }, { text: 1, value: 1 }, { text: 2, value: 2 }, { text: 3, value: 3 }, { text: 4, value: 4 }];

  public listaAccesorios = [
    { "secuencial": 1, "cod_accesorio": "1", "suma_aseg_acc": "0", "pje_tasa": "0", "imp_prima": "0", "cod_tipo_je": "100", "txt_accesorio": "" },
    { "secuencial": 2, "cod_accesorio": "2", "suma_aseg_acc": "0", "pje_tasa": "0", "imp_prima": "0", "cod_tipo_je": "100", "txt_accesorio": "" },
    { "secuencial": 3, "cod_accesorio": "3", "suma_aseg_acc": "0", "pje_tasa": "0", "imp_prima": "0", "cod_tipo_je": "100", "txt_accesorio": "" },
    { "secuencial": 4, "cod_accesorio": "4", "suma_aseg_acc": "0", "pje_tasa": "0", "imp_prima": "0", "cod_tipo_je": "100", "txt_accesorio": "" }
  ];

  public listaVehiculos = [
    { "id": 1, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 1, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 2, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 3, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 4, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 5, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 6, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 7, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 8, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 9, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 10, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 11, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 12, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 13, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 14, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
    { "id": 15, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" },
  ];

  public generarListaVehiculosBusqueda(datos: any, valor: any) {
    this.listaVehiculos = [];
    for (let lista of datos) {
      this.listaVehiculos.push(lista);
    }
    var longitud = 100 - parseInt(valor);
    for (let i = 0; i < longitud; i++) {
      var id = (i + parseInt(valor) + 1);
      if (id == 1) {
        this.listaVehiculos.push({ "id": id, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 1, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" });
      } else {
        this.listaVehiculos.push({ "id": id, "poliza": "", "marca": "", "modelo": "", "anio": "", "motor": "", "chasis": "", "placa": "", "tipoVehiculo": "", "color": "", "requiereDispositivo": "", "valorCasco": 0, "detallesExtras": [], "valorExtra": 0, "valorTotal": 0, "tasa": 0, "polizaDeducibles": "", "autoSustituto": "", "valorPolizaDeducibles": 0, "valorPrimaPolizaDeducibles": 0, "estado": 0, "cod_color": 0, "cod_marca": 0, "cod_modelo": 0, "cod_pais": 0, "cod_submodelo": "", "cod_tipo": 0, "cod_tipo_ant": 0, "cod_tipo_placa": 0, "cobertura": "", "fechaCompra": "", "valorFijo": 0, "accesorios": [], "listaNumeroAccesorios": this.lista, "numeroAccesorios": 0, "detallesCotizacion": { "tasa": 0, "prima_neta": 0, "super": 0, "seg_camp": 0, "der_emi": 0, "iva": 0, "prima_total": 0 }, "tipo": "" });
      }

    }
  }

  constructor() { }
  transform(value: any, args?: any): any {
    return null;
  }

  public generarListaVehiculos(value: any) {
    var valor = parseInt(value);
    var datos: any = [];
    if (valor > 0 && valor <= 15) {
      for (let i = 0; i < value; i++) {
        datos.push(this.listaVehiculos[i]);
      }
    }
    return datos;
  }

  public generarListaAccesorios(value: any) {
    var valor = parseInt(value);
    var datos: any = [];

    if (valor > 0 && valor <= 4) {
      for (let i = 0; i < value; i++) {
        datos.push(this.listaAccesorios[i]);
      }
    }
    return datos;
  }

}
