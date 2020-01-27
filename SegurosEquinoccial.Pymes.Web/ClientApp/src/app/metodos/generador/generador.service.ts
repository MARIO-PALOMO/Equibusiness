import { Injectable } from '@angular/core';
import { CotizacionRamoGeneral } from '../../cliente/cotizacion-ramos/cotizacion.ramo.general';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GlobalesPipe } from '../globales/globales.pipe';

declare var $: any;

@Injectable()
export class GeneradorService {

  usuario: any;
  global: GlobalesPipe = new GlobalesPipe();
  idCotizacionResultado = 0;

  constructor(public conexion: ApiService, public sesion: SesionService, private spinner: NgxSpinnerService, private router: Router) {
    this.usuario = this.sesion.obtenerDatos();
  }

  general: CotizacionRamoGeneral = new CotizacionRamoGeneral();

  public generarXML(datos, pago, clausulas, asegurado, contratante, pagador, items) {

    var xml = `<cabecera xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <id_pv>`+ datos.certificado + `</id_pv>
                <cod_suc>`+ datos.sucursal + `</cod_suc>
                <cod_ramo>`+ datos.ramo + `</cod_ramo>
                <cod_aseg>`+ contratante.asegurado + `</cod_aseg>
                <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                <cod_grupo_endo>1</cod_grupo_endo>
                <cod_tipo_endo>1</cod_tipo_endo>
                <imp_suma_aseg>`+ Math.round(datos.sumaAsegurada * 100) / 100 + `</imp_suma_aseg>
                <imp_prima>`+ datos.primaNetaTotal + `</imp_prima>
                <imp_super>`+ datos.impuestoSBS + `</imp_super>
                <imp_deremi>`+ datos.derechosEmision + `</imp_deremi>
                <imp_otroscargos_con_iva>0</imp_otroscargos_con_iva>
                <imp_otrosdesctos_con_iva>0</imp_otrosdesctos_con_iva>
                <imp_iva>`+ datos.iva + `</imp_iva>
                <imp_recargo>0</imp_recargo>
                <imp_otroscargos_sin_iva>0</imp_otroscargos_sin_iva>
                <imp_otrosdesctos_sin_iva>0</imp_otrosdesctos_sin_iva>
                <imp_premio>`+ datos.primaTotal + `</imp_premio>
                <cod_ppago>`+ datos.tppago + `</cod_ppago>
                <txt_tarjeta>`+ pago.bin + `</txt_tarjeta>
                <cod_usuario>USRPYMES</cod_usuario>
                <fec_ing>`+ datos.fechaDesde + `</fec_ing>
                <cod_agente>`+ datos.codigoAgente + `</cod_agente>
                <pje_comision>`+ datos.comision + `</pje_comision>
                <cod_usuario_aprob>1</cod_usuario_aprob>
                <fec_aprob>`+ datos.fechaDesde + `</fec_aprob>
                <imp_seg_camp>`+ datos.seguroCampesino + `</imp_seg_camp>
                <cod_conducto>`+ datos.conducto + `</cod_conducto>
                <cod_tipo_agente>`+ datos.codigoTipoAgente + `</cod_tipo_agente>
                <fec_venc>`+ datos.fechaHasta + `</fec_venc>
                <cod_pto_vta>`+ datos.puntoVenta + `</cod_pto_vta>
                <cod_texto>1</cod_texto>
                <contratante>
                  <cod_aseg>`+ contratante.asegurado + `</cod_aseg>
                  <cod_conducto>`+ datos.conducto + `</cod_conducto>
                  <nro_cta_tarj>`+ pago.bin + `</nro_cta_tarj>
                  <aaaamm_vto_tarj>`+ pago.vencimiento + `</aaaamm_vto_tarj>
                </contratante>
                `+ clausulas + `
                <pagadores>
                    <pagador>
                      <cod_aseg>`+ pagador.asegurado + `</cod_aseg>
                      <pje_part>100</pje_part>
                      <cod_conducto>`+ datos.conducto + `</cod_conducto>
                      <nro_cta_tarj>`+ pago.bin + `</nro_cta_tarj>
                      <aaaamm_vto_tarj>`+ pago.vencimiento + `</aaaamm_vto_tarj>
                    </pagador>
                </pagadores>
                `+ items + `
              </cabecera>`;

    return xml;
  }

  public generarItem(datos, lista, validacion) {
    var coberturas_ = "";
    var contador = 0;

    var trama = "";
    var total = this.general.calcularPrimaUbicacion(validacion, lista);

    if (total != 0) {
      for (let cobertura of lista) {

        if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1) ||
          (cobertura.Valores.ValorU2.Valor != 0 && validacion == 2) ||
          (cobertura.Valores.ValorU3.Valor != 0 && validacion == 3) ||
          (cobertura.Valores.ValorU4.Valor != 0 && validacion == 4) ||
          (cobertura.Valores.ValorU5.Valor != 0 && validacion == 5)) {

          if (cobertura.Valores.CoberturaAdicional == undefined) {
            if (cobertura.Datos.LimiteAgregadoAnual == 0) {
              contador++;

              coberturas_ = coberturas_ +
                `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoRamoTerremoto : cobertura.Datos.Ramo.CodigoRamo) + `</cod_ramo>
                    <cod_subramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoSubramoTerremoto : cobertura.Datos.Ramo.CodigoSubramo) + `</cod_subramo>
                    <cod_objeto>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoObjetoSeguroTerremoto : cobertura.Datos.CodigoObjetoSeguro) + `</cod_objeto>
                    <cod_amparo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoAmparoTerremoto : cobertura.Datos.CodigoAmparo) + `</cod_amparo>
                    <cod_categ>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoCategoriaTerremoto : cobertura.Datos.CodigoCategoria) + `</cod_categ>
                    <pje_tasa>`+ (cobertura.Datos.Ramo.Codigo == "RIL1" ? Math.round((cobertura.Valores.Tasa * 10) * 100) / 100 : Math.round(cobertura.Valores.Tasa * 100) / 100) + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaSumaTotalTerremoto : cobertura.Datos.AcumulaSumaTotal) + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaPrimaTotalTerremoto : cobertura.Datos.AcumulaPrimaTotal) + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (
                  validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                    validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                      validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                        validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                          validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
                ) + `</imp_prima>
                    <imp_suma_aseg>`+
                (
                  validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                    validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                      validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                        validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                          validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
                )
                + `</imp_suma_aseg>
                    <imp_resp_max>0</imp_resp_max>
                    <imp_lim_agregado_anual>`
                +
                (
                  cobertura.Datos.Codigo == "SDV2" ? this.obtenerAgregadoAnual(lista) :
                    cobertura.Datos.Codigo == "SDV3" ? 0 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                          validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                            validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                              validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                                validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
                      )
                )
                +
                `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                +
                (
                  validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                )
                + `
                  </cobertura>`;
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
            <cod_item>` + validacion + `</cod_item>
            <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100 + `</imp_prima_neto>
            <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
            <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
            <cod_pais>1</cod_pais>
            <cod_dpto>17</cod_dpto>
            <cod_municipio>15</cod_municipio>
            <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
            <sn_acum_prima_total>-1</sn_acum_prima_total>
            <sn_acum_suma_total>-1</sn_acum_suma_total>
            <cod_tipo_tasa>1</cod_tipo_tasa>
            <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
            <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
            <tasa_cober>1</tasa_cober>
            <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
            <imp_prima_cober>0</imp_prima_cober>
            <coberturas>
            `+ (coberturas_) + this.generarItemCoberturasAdicionales(datos, lista, validacion, contador) +
          `</coberturas>
          </item>`;
      }
    }

    return trama;
  }

  public obtenerPrimaItem(coberturas) {
    var trama = "<coberturas>" + coberturas + "</coberturas>";
    var primaTotal = 0;
    var xml = $.parseXML(trama);

    $(xml).find("cobertura").each(function () {

      if ($(this).find('sn_acum_prima_total').text() == "-1") {
        primaTotal += parseFloat($(this).find('imp_prima').text());
      }

    });
    return primaTotal;
  }

  public obtenerAgregadoAnual(lstRamo) {

    var limite = 0;
    for (let coberturas of lstRamo) {
      if (coberturas.Datos.Ramo.Codigo == "RDV7" || coberturas.Datos.Ramo.Codigo == "RAP12" || coberturas.Datos.Ramo.Codigo == "RTR11IN" || coberturas.Datos.Ramo.Codigo == "RTR11IM") {
        if (coberturas.Datos.LimiteAgregadoAnual == 1) {
          limite = coberturas.Valores.ValorU1.Valor;
        }
      }
    }
    return limite;
  }

  public obtenerTasa(lstRamo) {

    var tasa = 0;
    for (let coberturas of lstRamo) {
      if (coberturas.Datos.Ramo.Codigo == "RDV7" || coberturas.Datos.Ramo.Codigo == "RAP12" || coberturas.Datos.Ramo.Codigo == "RTR11IN" || coberturas.Datos.Ramo.Codigo == "RTR11IM") {
        if (coberturas.Datos.LimiteAgregadoAnual == 1) {
          tasa = coberturas.Valores.Tasa;
        }
      }
    }
    return tasa;
  }

  public obtenerPrima(lstRamo) {

    var prima = 0;
    for (let coberturas of lstRamo) {
      if (coberturas.Datos.Ramo.Codigo == "RDV7" || coberturas.Datos.Ramo.Codigo == "RAP12" || coberturas.Datos.Ramo.Codigo == "RTR11IN" || coberturas.Datos.Ramo.Codigo == "RTR11IM") {
        if (coberturas.Datos.LimiteAgregadoAnual == 1) {
          prima = coberturas.Valores.Prima;
        }
      }
    }
    return prima;
  }

  public obtenerSumaAseguradaCobertura(coberturas) {
    var trama = "<coberturas>" + coberturas + "</coberturas>";
    var sumaTotal = 0;
    var xml = $.parseXML(trama);

    $(xml).find("cobertura").each(function () {

      if ($(this).find('sn_acum_suma_total').text() == "-1") {
        sumaTotal += parseFloat($(this).find('imp_suma_aseg').text());
      }

    });

    return sumaTotal;
  }

  public obtenerSumaAseguradaItems(items) {
    var sumaTotal = 0;

    var $xml = $(items);
    var $siblings = $xml.find("coberturas");

    $siblings.each(function () {
      $(this).remove();
    });

    $xml.find("item").each(function () {
      sumaTotal += parseFloat($(this).find('imp_suma_aseg').text());
    });

    return sumaTotal;
  }

  public generarItemResponsabilidadCivil(datos, lista, validacion) {

    var coberturas_ = "";
    var contador = 0;

    var trama = "";
    var total = this.general.calcularPrimaUbicacion(validacion, lista);


    if (total != 0) {
      for (let cobertura of lista) {

        if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1) ||
          (cobertura.Valores.ValorU2.Valor != 0 && validacion == 2) ||
          (cobertura.Valores.ValorU3.Valor != 0 && validacion == 3) ||
          (cobertura.Valores.ValorU4.Valor != 0 && validacion == 4) ||
          (cobertura.Valores.ValorU5.Valor != 0 && validacion == 5)) {

          if (cobertura.Valores.CoberturaAdicional == undefined) {
            if (cobertura.Datos.LimiteAgregadoAnual == 0) {
              contador++;

              coberturas_ = coberturas_ +
                `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoRamoTerremoto : cobertura.Datos.Ramo.CodigoRamo) + `</cod_ramo>
                    <cod_subramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoSubramoTerremoto : cobertura.Datos.Ramo.CodigoSubramo) + `</cod_subramo>
                    <cod_objeto>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoObjetoSeguroTerremoto : cobertura.Datos.CodigoObjetoSeguro) + `</cod_objeto>
                    <cod_amparo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoAmparoTerremoto : cobertura.Datos.CodigoAmparo) + `</cod_amparo>
                    <cod_categ>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoCategoriaTerremoto : cobertura.Datos.CodigoCategoria) + `</cod_categ>
                    <pje_tasa>`+ (cobertura.Datos.Ramo.Codigo == "RIL1" ? Math.round((cobertura.Valores.Tasa * 10) * 100) / 100 : Math.round(cobertura.Valores.Tasa * 100) / 100) + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaSumaTotalTerremoto : cobertura.Datos.AcumulaSumaTotal) + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaPrimaTotalTerremoto : cobertura.Datos.AcumulaPrimaTotal) + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (
                        cobertura.Valores.NVehiculos != 0 ?
                          validacion == 1 ? Math.round(((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 2 ? Math.round(((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 3 ? Math.round(((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 4 ? Math.round(((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 5 ? Math.round(((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * (cobertura.Valores.Tasa / 100)) * 100) / 100 : 0
                        :
                          validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 2 ? Math.round((cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 3 ? Math.round((cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 4 ? Math.round((cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                          validacion == 5 ? Math.round((cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 : 0
                    )+
                    `</imp_prima>
                    <imp_suma_aseg>`+
                        (
                          cobertura.Valores.NVehiculos != 0 ?
                            validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                            validacion == 2 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                            validacion == 3 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                            validacion == 4 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                            validacion == 5 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 : 0
                          :
                            validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                            validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                            validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                            validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                            validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
                        )
                + `</imp_suma_aseg>
                    <imp_resp_max>0</imp_resp_max>
                    <imp_lim_agregado_anual>`
                +
                (
                  cobertura.Datos.Codigo == "SDV2" ? this.obtenerAgregadoAnual(lista) :
                    cobertura.Datos.Codigo == "SDV3" ? 0 :
                      (
                        cobertura.Valores.NVehiculos != 0 ?
                          validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                          validacion == 2 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                          validacion == 3 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                          validacion == 4 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 :
                          validacion == 5 ? Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NVehiculos) * 100) / 100 : 0
                        :
                          validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                          validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                          validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                          validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                          validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
                      )
                )
                +
                `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                +
                (
                  validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                )
                + `
                  </cobertura>`;
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
            <cod_item>` + validacion + `</cod_item>
            <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100 + `</imp_prima_neto>
            <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
            <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
            <cod_pais>1</cod_pais>
            <cod_dpto>17</cod_dpto>
            <cod_municipio>15</cod_municipio>
            <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
            <sn_acum_prima_total>-1</sn_acum_prima_total>
            <sn_acum_suma_total>-1</sn_acum_suma_total>
            <cod_tipo_tasa>1</cod_tipo_tasa>
            <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
            <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
            <tasa_cober>1</tasa_cober>
            <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
            <imp_prima_cober>0</imp_prima_cober>
            <coberturas>
            `+ (coberturas_) + this.generarItemCoberturasAdicionales(datos, lista, validacion, contador) +
          `</coberturas>
          </item>`;
      }
    }
    return trama;
  }

  public generarItemCoberturasAdicionales(datos, lista, validacion, contador) {
    var coberturas_ = "";

    for (let cobertura of lista) {
      if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1) ||
        (cobertura.Valores.ValorU2.Valor != 0 && validacion == 2) ||
        (cobertura.Valores.ValorU3.Valor != 0 && validacion == 3) ||
        (cobertura.Valores.ValorU4.Valor != 0 && validacion == 4) ||
        (cobertura.Valores.ValorU5.Valor != 0 && validacion == 5)) {
        if (cobertura.Valores.CoberturaAdicional == 1) {
          contador++;

          coberturas_ = coberturas_ +
            `<cobertura>
    <cod_ind_cob>`+ contador + `</cod_ind_cob>
    <cod_ramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoRamoTerremoto : cobertura.Datos.Ramo.CodigoRamo) + `</cod_ramo>
    <cod_subramo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.Ramo.CodigoSubramoTerremoto : cobertura.Datos.Ramo.CodigoSubramo) + `</cod_subramo>
    <cod_objeto>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoObjetoSeguroTerremoto : cobertura.Datos.CodigoObjetoSeguro) + `</cod_objeto>
    <cod_amparo>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoAmparoTerremoto : cobertura.Datos.CodigoAmparo) + `</cod_amparo>
    <cod_categ>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.CodigoCategoriaTerremoto : cobertura.Datos.CodigoCategoria) + `</cod_categ>
    <pje_tasa>`+ (cobertura.Datos.Ramo.Codigo == "RIL1" ? Math.round((cobertura.Valores.Tasa * 10) * 100) / 100 : Math.round(cobertura.Valores.Tasa * 100) / 100) + `</pje_tasa>
    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
    <sn_acum_suma_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaSumaTotalTerremoto : cobertura.Datos.AcumulaSumaTotal) + `</sn_acum_suma_total>
    <sn_acum_prima_total>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.AcumulaPrimaTotalTerremoto : cobertura.Datos.AcumulaPrimaTotal) + `</sn_acum_prima_total>
    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
    <imp_prima>`+ (
              validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                  validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                    validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                      validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
            ) + `</imp_prima>
    <imp_suma_aseg>`+
            (
              validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                  validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                    validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                      validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
            )
            + `</imp_suma_aseg>

    <imp_resp_max>0</imp_resp_max>
    <imp_lim_agregado_anual>`+
            (
              validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                  validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valo * 100) / 100 :
                    validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                      validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
            )
            + `</imp_lim_agregado_anual>
    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

    <nro_factor>0</nro_factor>
    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
    <cnt_lim_min>0</cnt_lim_min>
    <cnt_lim_max>0</cnt_lim_max>
  </cobertura>`;
        }
      }
    }

    return coberturas_;
  }

  public generarItemTrasportesImportaciones(datos, lista, validacion, tipo, listaComplemento) {
    var coberturas_ = "";
    var contador = 0;

    var trama = "";

    if (validacion == 1) {
      for (let cobertura of lista) {
        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contador++;
            for (let subramo of listaComplemento) {
              if (subramo.IdSubRamoTransporte == cobertura.Valores.ITransporte) {
                coberturas_ = coberturas_ +
                  `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ subramo.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ subramo.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ subramo.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ subramo.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ subramo.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                    (
                      validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                        validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                          validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                            validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                              validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
                    )
                  ) + `</imp_prima>
                    <imp_suma_aseg>`+
                  (
                    validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                  )
                  + `</imp_suma_aseg>
                    <imp_resp_max>`+
                  (
                    validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                  )
                  + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
                  +
                  (
                    this.obtenerAgregadoAnual(lista)
                  )
                  +
                  `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>-1</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                  +
                  (
                    validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                  ) +
                  `</cobertura>`
                  +
                  (subramo.IdentificadorAmparo == "TODORIESGO" ? `
                <cobertura>
                  <cod_ind_cob>2</cod_ind_cob>
                  <cod_ramo>2</cod_ramo>
                  <cod_subramo>1</cod_subramo>
                  <cod_objeto>239</cod_objeto>
                  <cod_amparo>26</cod_amparo>
                  <cod_categ>102</cod_categ>
                  <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                  <cod_tipo_pje>100</cod_tipo_pje>
                  <sn_acum_suma_total>0</sn_acum_suma_total>
                  <sn_acum_prima_total>0</sn_acum_prima_total>
                  <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                  <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                  <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                  <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                  <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                  <sn_imprime>-1</sn_imprime>
                  <nro_factor>0</nro_factor>
                  <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                  <cnt_lim_min>0</cnt_lim_min>
                  <cnt_lim_max>0</cnt_lim_max>
                </cobertura>
                <cobertura>
                  <cod_ind_cob>3</cod_ind_cob>
                  <cod_ramo>2</cod_ramo>
                  <cod_subramo>2</cod_subramo>
                  <cod_objeto>239</cod_objeto>
                  <cod_amparo>26</cod_amparo>
                  <cod_categ>102</cod_categ>
                  <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                  <cod_tipo_pje>100</cod_tipo_pje>
                  <sn_acum_suma_total>0</sn_acum_suma_total>
                  <sn_acum_prima_total>0</sn_acum_prima_total>
                  <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                  <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                  <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                  <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                    <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                  <sn_imprime>-1</sn_imprime>
                  <nro_factor>0</nro_factor>
                  <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                  <cnt_lim_min>0</cnt_lim_min>
                  <cnt_lim_max>0</cnt_lim_max>
                </cobertura>`:
                    `
              <cobertura>
                <cod_ind_cob>2</cod_ind_cob>
                <cod_ramo>2</cod_ramo>
                <cod_subramo>1</cod_subramo>
                <cod_objeto>239</cod_objeto>
                <cod_amparo>27</cod_amparo>
                <cod_categ>43</cod_categ>
                <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                <cod_tipo_pje>100</cod_tipo_pje>
                <sn_acum_suma_total>0</sn_acum_suma_total>
                <sn_acum_prima_total>0</sn_acum_prima_total>
                <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
              <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                <sn_imprime>-1</sn_imprime>
                <nro_factor>0</nro_factor>
                <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                <cnt_lim_min>0</cnt_lim_min>
                <cnt_lim_max>0</cnt_lim_max>
              </cobertura>
              <cobertura>
                <cod_ind_cob>3</cod_ind_cob>
                <cod_ramo>2</cod_ramo>
                <cod_subramo>2</cod_subramo>
                <cod_objeto>239</cod_objeto>
                <cod_amparo>27</cod_amparo>
                <cod_categ>42</cod_categ>
                <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                <cod_tipo_pje>100</cod_tipo_pje>
                <sn_acum_suma_total>0</sn_acum_suma_total>
                <sn_acum_prima_total>0</sn_acum_prima_total>
                <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                  <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                  <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                <sn_imprime>-1</sn_imprime>
                <nro_factor>0</nro_factor>
                <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                <cnt_lim_min>0</cnt_lim_min>
                <cnt_lim_max>0</cnt_lim_max>
              </cobertura>`);
              }
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
          <cod_item>` + validacion + `</cod_item>
          <imp_prima_neto>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 : (Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100)) + `</imp_prima_neto>
          <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
          <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
          <cod_pais>1</cod_pais>
          <cod_dpto>17</cod_dpto>
          <cod_municipio>15</cod_municipio>
          <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
          <sn_acum_prima_total>-1</sn_acum_prima_total>
          <sn_acum_suma_total>-1</sn_acum_suma_total>
          <cod_tipo_tasa>1</cod_tipo_tasa>
          <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
          <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
          <tasa_cober>1</tasa_cober>
          <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
          <imp_prima_cober>0</imp_prima_cober>
          <coberturas>
          `+ (coberturas_) +
          `</coberturas>
        </item>`;
      }
    }
    return trama;
  }

  public generarItemTrasportesImportacionesPlano(datos, lista, validacion, tipo, listaComplemento) {
    var coberturas_ = "";
    var contador = 0;

    var trama = "";

    if (validacion == 1) {
      for (let cobertura of lista) {
        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contador++;
            for (let subramo of listaComplemento) {
              if (subramo.IdSubRamoTransporte == cobertura.Valores.ITransporte) {
                coberturas_ = coberturas_ +
                  `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ subramo.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ subramo.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ subramo.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(this.obtenerTasa(lista) * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ subramo.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ subramo.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                    (
                      validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                        validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                          validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                            validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                              validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
                    )
                  ) + `</imp_prima>
                    <imp_suma_aseg>`+
                  (
                    validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                  )
                  + `</imp_suma_aseg>
                    <imp_resp_max>`+
                  (
                    validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                  )
                  + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
                  +
                  (
                    this.obtenerAgregadoAnual(lista)
                  )
                  +
                  `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>-1</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                  +
                  (
                    validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                  ) +
                  `</cobertura>`
                  +
                  (subramo.IdentificadorAmparo == "TODORIESGO" ? `
                <cobertura>
                  <cod_ind_cob>2</cod_ind_cob>
                  <cod_ramo>2</cod_ramo>
                  <cod_subramo>1</cod_subramo>
                  <cod_objeto>239</cod_objeto>
                  <cod_amparo>26</cod_amparo>
                  <cod_categ>102</cod_categ>
                  <pje_tasa>`+ Math.round(this.obtenerTasa(lista) * 100) / 100 + `</pje_tasa>
                  <cod_tipo_pje>100</cod_tipo_pje>
                  <sn_acum_suma_total>0</sn_acum_suma_total>
                  <sn_acum_prima_total>0</sn_acum_prima_total>
                  <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                  <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                  <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                  <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                  <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                  <sn_imprime>-1</sn_imprime>
                  <nro_factor>0</nro_factor>
                  <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                  <cnt_lim_min>0</cnt_lim_min>
                  <cnt_lim_max>0</cnt_lim_max>
                </cobertura>
                <cobertura>
                  <cod_ind_cob>3</cod_ind_cob>
                  <cod_ramo>2</cod_ramo>
                  <cod_subramo>2</cod_subramo>
                  <cod_objeto>239</cod_objeto>
                  <cod_amparo>26</cod_amparo>
                  <cod_categ>102</cod_categ>
                  <pje_tasa>`+ Math.round(this.obtenerTasa(lista) * 100) / 100 + `</pje_tasa>
                  <cod_tipo_pje>100</cod_tipo_pje>
                  <sn_acum_suma_total>0</sn_acum_suma_total>
                  <sn_acum_prima_total>0</sn_acum_prima_total>
                  <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                  <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                  <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                  <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                    <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                  <sn_imprime>-1</sn_imprime>
                  <nro_factor>0</nro_factor>
                  <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                  <cnt_lim_min>0</cnt_lim_min>
                  <cnt_lim_max>0</cnt_lim_max>
                </cobertura>`:
                    `
              <cobertura>
                <cod_ind_cob>2</cod_ind_cob>
                <cod_ramo>2</cod_ramo>
                <cod_subramo>1</cod_subramo>
                <cod_objeto>239</cod_objeto>
                <cod_amparo>27</cod_amparo>
                <cod_categ>43</cod_categ>
                <pje_tasa>`+ Math.round(this.obtenerTasa(lista) * 100) / 100 + `</pje_tasa>
                <cod_tipo_pje>100</cod_tipo_pje>
                <sn_acum_suma_total>0</sn_acum_suma_total>
                <sn_acum_prima_total>0</sn_acum_prima_total>
                <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
              <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                <sn_imprime>-1</sn_imprime>
                <nro_factor>0</nro_factor>
                <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                <cnt_lim_min>0</cnt_lim_min>
                <cnt_lim_max>0</cnt_lim_max>
              </cobertura>
              <cobertura>
                <cod_ind_cob>3</cod_ind_cob>
                <cod_ramo>2</cod_ramo>
                <cod_subramo>2</cod_subramo>
                <cod_objeto>239</cod_objeto>
                <cod_amparo>27</cod_amparo>
                <cod_categ>42</cod_categ>
                <pje_tasa>`+ Math.round(this.obtenerTasa(lista) * 100) / 100 + `</pje_tasa>
                <cod_tipo_pje>100</cod_tipo_pje>
                <sn_acum_suma_total>0</sn_acum_suma_total>
                <sn_acum_prima_total>0</sn_acum_prima_total>
                <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                <imp_prima>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 :
                      (
                        validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                      )
                    ) + `</imp_prima>
                <imp_suma_aseg>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_suma_aseg>
                  <imp_resp_max>`+
                    (
                      validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                    )
                    + `</imp_resp_max>
                  <imp_lim_agregado_anual>`
                    +
                    (
                      this.obtenerAgregadoAnual(lista)
                    )
                    +
                    `</imp_lim_agregado_anual>
                <sn_imprime>-1</sn_imprime>
                <nro_factor>0</nro_factor>
                <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                <cnt_lim_min>0</cnt_lim_min>
                <cnt_lim_max>0</cnt_lim_max>
              </cobertura>`);
              }
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
          <cod_item>` + validacion + `</cod_item>
          <imp_prima_neto>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 : (Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100)) + `</imp_prima_neto>
          <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
          <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
          <cod_pais>1</cod_pais>
          <cod_dpto>17</cod_dpto>
          <cod_municipio>15</cod_municipio>
          <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
          <sn_acum_prima_total>-1</sn_acum_prima_total>
          <sn_acum_suma_total>-1</sn_acum_suma_total>
          <cod_tipo_tasa>1</cod_tipo_tasa>
          <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
          <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
          <tasa_cober>1</tasa_cober>
          <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
          <imp_prima_cober>0</imp_prima_cober>
          <coberturas>
          `+ (coberturas_) +
          `</coberturas>
        </item>`;
      }
    }
    return trama;
  }

  public generarItemTrasportes(datos, lista, validacion, tipo, listaComplemento) {
    var coberturas_ = "";
    var contador = 0;

    var trama = "";

    if (validacion == 1) {
      for (let cobertura of lista) {
        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contador++;
            for (let subramo of listaComplemento) {
              if (subramo.IdSubRamoTransporte == cobertura.Valores.ITransporte) {
                coberturas_ = coberturas_ +
                  `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ subramo.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ subramo.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ subramo.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ subramo.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ subramo.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+
                  (
                    validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                      validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * 100) / 100 :
                        validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * 100) / 100 :
                          validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * 100) / 100 :
                            validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * 100) / 100 : 0
                  )
                  + `</imp_prima>
                    <imp_suma_aseg>`+
                  (
                    validacion == 1 ? Math.round(subramo.LimiteSuperior * 100) / 100 : 0
                  )
                  + `</imp_suma_aseg>
                    <imp_resp_max>0</imp_resp_max>
                    <imp_lim_agregado_anual>`
                  +
                  (
                    this.obtenerAgregadoAnual(lista)
                  )
                  +
                  `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Valores.AplicaTerremoto == 1 ? cobertura.Datos.ImprimeTerremoto : cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>-1</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                  +
                  (
                    validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                  )
                  + `
                  </cobertura>`;
              }
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
          <cod_item>` + validacion + `</cod_item>
          <imp_prima_neto>`+ (tipo == 'Importaciones' ? Math.round(0.04 * 100) / 100 : (Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100)) + `</imp_prima_neto>
          <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
          <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
          <cod_pais>1</cod_pais>
          <cod_dpto>17</cod_dpto>
          <cod_municipio>15</cod_municipio>
          <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
          <sn_acum_prima_total>-1</sn_acum_prima_total>
          <sn_acum_suma_total>-1</sn_acum_suma_total>
          <cod_tipo_tasa>1</cod_tipo_tasa>
          <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
          <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
          <tasa_cober>1</tasa_cober>
          <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
          <imp_prima_cober>0</imp_prima_cober>
          <coberturas>
          `+ (coberturas_) +
          `</coberturas>
        </item>`;
      }
    }
    return trama;
  }


  public obtenerPrimaTransportesPlano(lista) {
    let valor = 0;
    for (let cobertura of lista) {
      if (cobertura.Datos.Codigo == "STR1") {
        valor = cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100);
      }
    }

    return Math.round(valor * 100) / 100
  }

  public generarItemTransportesPlano(datos, lista, validacion, tipo, listaComplemento) {
    var coberturas_ = "";
    var contador = 0;

    var trama = "";

    if (validacion == 1) {
      for (let cobertura of lista) {
        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contador++;
            for (let subramo of listaComplemento) {
              if (subramo.IdSubRamoTransporte == cobertura.Valores.ITransporte) {
                coberturas_ = coberturas_ +
                  `<cobertura>
                    <cod_ind_cob>`+ contador + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ subramo.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ subramo.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ subramo.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round((this.obtenerTasa(lista)) * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ subramo.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ subramo.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+
                  (
                    validacion == 1 ? this.obtenerPrimaTransportesPlano(lista) : 0
                  ) + `</imp_prima>
                    <imp_suma_aseg>`+
                  (
                    validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                  )
                  + `</imp_suma_aseg>
                    <imp_resp_max>`+
                  (
                    validacion == 1 ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 : 0
                  )
                  + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
                  +
                  (
                    this.obtenerAgregadoAnual(lista)
                  )
                  +
                  `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>-1</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
                  +
                  (
                    validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
                  )
                  + `
                  </cobertura>`;
              }
            }
          }
        }
      }

      if (validacion == 1 || validacion == 2 || validacion == 3 || validacion == 4 || validacion == 5) {
        trama =
          `<item>
          <cod_item>` + validacion + `</cod_item>
          <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturas_) * 100) / 100 + `</imp_prima_neto>
          <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturas_) * 100) / 100 + `</imp_suma_aseg>
          <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
          <cod_pais>1</cod_pais>
          <cod_dpto>17</cod_dpto>
          <cod_municipio>15</cod_municipio>
          <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
          <sn_acum_prima_total>-1</sn_acum_prima_total>
          <sn_acum_suma_total>-1</sn_acum_suma_total>
          <cod_tipo_tasa>1</cod_tipo_tasa>
          <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
          <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
          <tasa_cober>1</tasa_cober>
          <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
          <imp_prima_cober>0</imp_prima_cober>
          <coberturas>
          `+ (coberturas_) +
          `</coberturas>
        </item>`;
      }
    }
    return trama;
  }

  public generarItemAccidentesPersonales(datos, lista, validacion) {

    var trama = "";
    var contadorDirectivo = 0;
    var contadorAdminstrativo = 0;
    var contadorOperativo = 0;

    var contadorItemDirectivo = 1;
    var contadorItemAdminstrativo = 2;
    var contadorItemOperativo = 3;

    var listaDirectivo = [];
    var listaAdministrativo = [];
    var listaOperativo = [];

    var coberturasDirectivo = "";
    var coberturasAdministrativo = "";
    var coberturasOperativo = "";

    var itemDirectivo = "";
    var itemAdministrativo = "";
    var itemOperativo = "";

    for (let accidentes of lista) {
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

    //PERSONAL DIRECTIVO
    for (let cobertura of listaDirectivo) {

      if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1)) {

        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contadorDirectivo++;

            coberturasDirectivo = coberturasDirectivo +
              `<cobertura>
                    <cod_ind_cob>`+ contadorDirectivo + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ cobertura.Datos.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ cobertura.Datos.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ cobertura.Datos.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ cobertura.Datos.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ cobertura.Datos.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (
                validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                  validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                    validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                      validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                        validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
              ) + `</imp_prima>
                    <imp_suma_aseg>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NPersonas) * 100) / 100
                ) : 0
              )
              + `</imp_suma_aseg>
                    <imp_resp_max>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor) * 100) / 100
                ) : 0
              )
              + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
              +
              (
                cobertura.Datos.Codigo == "SAP1" ? Math.round(100000 * 100) / 100 :
                  cobertura.Datos.Codigo == "SAP5" ? Math.round(100000 * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP9" ? Math.round(100000 * 100) / 100 : 0
              )
              +
              `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
              +
              (
                validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
              )
              +
              `</cobertura>`;
          }
        }
      }
    }

    if (validacion == 1) {
      itemDirectivo =
        `<item>
            <cod_item>` + contadorItemDirectivo + `</cod_item>
            <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturasDirectivo) * 100) / 100 + `</imp_prima_neto>
            <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturasDirectivo) * 100) / 100 + `</imp_suma_aseg>
            <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
            <cod_pais>1</cod_pais>
            <cod_dpto>17</cod_dpto>
            <cod_municipio>15</cod_municipio>
            <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
            <sn_acum_prima_total>-1</sn_acum_prima_total>
            <sn_acum_suma_total>-1</sn_acum_suma_total>
            <cod_tipo_tasa>1</cod_tipo_tasa>
            <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
            <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
            <tasa_cober>1</tasa_cober>
            <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
            <imp_prima_cober>0</imp_prima_cober>
            <coberturas>
            `+ (coberturasDirectivo) +
        `</coberturas>
          </item>`;
    }

    //PERSONAL ADMINISTRATIVO
    for (let cobertura of listaAdministrativo) {

      if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1)) {

        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contadorAdminstrativo++;

            coberturasAdministrativo = coberturasAdministrativo +
              `<cobertura>
                    <cod_ind_cob>`+ contadorAdminstrativo + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ cobertura.Datos.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ cobertura.Datos.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ cobertura.Datos.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ cobertura.Datos.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ cobertura.Datos.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (
                validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                  validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                    validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                      validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                        validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
              ) + `</imp_prima>
                    <imp_suma_aseg>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NPersonas) * 100) / 100
                ) : 0
              )
              + `</imp_suma_aseg>
                    <imp_resp_max>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor) * 100) / 100
                ) : 0
              )
              + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
              +
              (
                cobertura.Datos.Codigo == "SAP1" ? Math.round(100000 * 100) / 100 :
                  cobertura.Datos.Codigo == "SAP5" ? Math.round(100000 * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP9" ? Math.round(100000 * 100) / 100 : 0
              )
              +
              `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
              +
              (
                validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
              )
              +
              `</cobertura>`;
          }
        }
      }
    }

    if (validacion == 1) {
      itemAdministrativo =
        `<item>
            <cod_item>` + contadorItemAdminstrativo + `</cod_item>
            <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturasAdministrativo) * 100) / 100 + `</imp_prima_neto>
            <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturasAdministrativo) * 100) / 100 + `</imp_suma_aseg>
            <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
            <cod_pais>1</cod_pais>
            <cod_dpto>17</cod_dpto>
            <cod_municipio>15</cod_municipio>
            <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
            <sn_acum_prima_total>-1</sn_acum_prima_total>
            <sn_acum_suma_total>-1</sn_acum_suma_total>
            <cod_tipo_tasa>1</cod_tipo_tasa>
            <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
            <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
            <tasa_cober>1</tasa_cober>
            <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
            <imp_prima_cober>0</imp_prima_cober>
            <coberturas>
            `+ (coberturasAdministrativo) +
        `</coberturas>
          </item>`;
    }

    //PERSONAL OPERATIVO
    for (let cobertura of listaOperativo) {

      if ((cobertura.Valores.ValorU1.Valor != 0 && validacion == 1)) {

        if (cobertura.Valores.CoberturaAdicional == undefined) {
          if (cobertura.Datos.LimiteAgregadoAnual == 0) {
            contadorOperativo++;

            coberturasOperativo = coberturasOperativo +
              `<cobertura>
                    <cod_ind_cob>`+ contadorOperativo + `</cod_ind_cob>
                    <cod_ramo>`+ cobertura.Datos.Ramo.CodigoRamo + `</cod_ramo>
                    <cod_subramo>`+ cobertura.Datos.Ramo.CodigoSubramo + `</cod_subramo>
                    <cod_objeto>`+ cobertura.Datos.CodigoObjetoSeguro + `</cod_objeto>
                    <cod_amparo>`+ cobertura.Datos.CodigoAmparo + `</cod_amparo>
                    <cod_categ>`+ cobertura.Datos.CodigoCategoria + `</cod_categ>
                    <pje_tasa>`+ Math.round(cobertura.Valores.Tasa * 100) / 100 + `</pje_tasa>
                    <cod_tipo_pje>`+ cobertura.Datos.TipoPorcentaje + `</cod_tipo_pje>
                    <sn_acum_suma_total>`+ cobertura.Datos.AcumulaSumaTotal + `</sn_acum_suma_total>
                    <sn_acum_prima_total>`+ cobertura.Datos.AcumulaPrimaTotal + `</sn_acum_prima_total>
                    <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
                    <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
                    <imp_prima>`+ (
                validacion == 1 ? Math.round((cobertura.Valores.ValorU1.Valor * (cobertura.Valores.Tasa / 100)) * 100) / 100 :
                  validacion == 2 ? Math.round(cobertura.Valores.ValorU2.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                    validacion == 3 ? Math.round(cobertura.Valores.ValorU3.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                      validacion == 4 ? Math.round(cobertura.Valores.ValorU4.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 :
                        validacion == 5 ? Math.round(cobertura.Valores.ValorU5.Valor * (cobertura.Valores.Tasa / 100) * 100) / 100 : 0
              ) + `</imp_prima>
                    <imp_suma_aseg>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round(cobertura.Valores.ValorU1.Valor * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor * cobertura.Valores.NPersonas) * 100) / 100
                ) : 0
              )
              + `</imp_suma_aseg>
                    <imp_resp_max>`+
              (
                validacion == 1 ? (
                  cobertura.Datos.Codigo == "SAP1" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP5" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                      cobertura.Datos.Codigo == "SAP9" ? Math.round(cobertura.Valores.VPersonas * 100) / 100 :
                        cobertura.Datos.Codigo == "SAP2" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                          cobertura.Datos.Codigo == "SAP6" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                            cobertura.Datos.Codigo == "SAP10" ? Math.round((cobertura.Valores.GPersonas) * 100) / 100 :
                              Math.round((cobertura.Valores.ValorU1.Valor) * 100) / 100
                ) : 0
              )
              + `</imp_resp_max>
                    <imp_lim_agregado_anual>`
              +
              (
                cobertura.Datos.Codigo == "SAP1" ? Math.round(100000 * 100) / 100 :
                  cobertura.Datos.Codigo == "SAP5" ? Math.round(100000 * 100) / 100 :
                    cobertura.Datos.Codigo == "SAP9" ? Math.round(100000 * 100) / 100 : 0
              )
              +
              `</imp_lim_agregado_anual>
                    <sn_imprime>`+ (cobertura.Datos.Imprime) + `</sn_imprime>

                    <nro_factor>0</nro_factor>
                    <sn_acum_suma_aseg>0</sn_acum_suma_aseg>
                    <cnt_lim_min>0</cnt_lim_min>
                    <cnt_lim_max>0</cnt_lim_max>
                    `
              +
              (
                validacion == 1 ? cobertura.Datos.CodigosDeducibles : ''
              )
              +
              `</cobertura>`;
          }
        }
      }
    }

    if (validacion == 1) {
      itemOperativo =
        `<item>
            <cod_item>` + contadorItemOperativo + `</cod_item>
            <imp_prima_neto>`+ Math.round(this.obtenerPrimaItem(coberturasOperativo) * 100) / 100 + `</imp_prima_neto>
            <imp_suma_aseg>`+ Math.round(this.obtenerSumaAseguradaCobertura(coberturasOperativo) * 100) / 100 + `</imp_suma_aseg>
            <cod_giro_negocio>`+ datos.negocio + `</cod_giro_negocio>
            <cod_pais>1</cod_pais>
            <cod_dpto>17</cod_dpto>
            <cod_municipio>15</cod_municipio>
            <txt_direccion>`+ this.global.limpiarDireccion(datos.direccion) + `</txt_direccion>
            <sn_acum_prima_total>-1</sn_acum_prima_total>
            <sn_acum_suma_total>-1</sn_acum_suma_total>
            <cod_tipo_tasa>1</cod_tipo_tasa>
            <fec_vig_desde>`+ datos.fechaDesde + `</fec_vig_desde>
            <fec_vig_hasta>`+ datos.fechaHasta + `</fec_vig_hasta>
            <tasa_cober>1</tasa_cober>
            <cod_tipo_pje_cober>100</cod_tipo_pje_cober>
            <imp_prima_cober>0</imp_prima_cober>
            <coberturas>
            `+ (coberturasOperativo) +
        `</coberturas>
          </item>`;
    }

    trama = (totalDirectivo > 0 ? itemDirectivo : '') + (totalAdministrativo > 0 ? itemAdministrativo : '') + (totalOperativo > 0 ? itemOperativo : '');

    return trama;
  }

}
