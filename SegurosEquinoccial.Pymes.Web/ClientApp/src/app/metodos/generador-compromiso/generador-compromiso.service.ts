import { Injectable } from '@angular/core';
import { GlobalesPipe } from '../globales/globales.pipe';

declare var $: any;

@Injectable()
export class GeneradorCompromisosService {

    global: GlobalesPipe = new GlobalesPipe();

    constructor() {

    }

    public generarXML(datos, valores) {
        //`+s+`
        var xml =
            `<sCodUsuario>` + datos.UsuarioCodigo + `</sCodUsuario>
        <sCodUsuario_Externo></sCodUsuario_Externo>
        <sFuente>PLATAFORMA EQUINUSINESS</sFuente>
        <sNroDocCliente>` + datos.ClienteIdentificacion + `</sNroDocCliente>
        <sCodTipoNegocio>` + datos.NegocioCodigo + `</sCodTipoNegocio>
        <iCodAgente>` + datos.AgenteCodigo + `</iCodAgente>
        <iCodTipoAgente>` + datos.AgenteTipoCodigo + `</iCodTipoAgente>
        <sNroCotizacion>` + datos.CotizacionNumero + `</sNroCotizacion>
        <iCodSucursal>` + datos.SucursalCodigo + `</iCodSucursal>
        <cSumaAseg>` + valores.SumaAsegurada + `</cSumaAseg>
        <cTasa>` + valores.Tasa + `</cTasa>
        <cPrimaNeta>` + valores.PrimaNeta + `</cPrimaNeta>
        <cPrimaTotal>` + valores.PrimaTotal + `</cPrimaTotal>
        <dVigDesde>` + datos.VigenciaDesde + `</dVigDesde>
        <dVigHasta>` + datos.VigenciaHasta + `</dVigHasta>
        <sNroDocPagador>` + datos.PagadorIdentificacion + `</sNroDocPagador>
        <iCodConductoPago>1</iCodConductoPago>
        <iCodPlanPago>92</iCodPlanPago>
        <sTxtTarjetaPago></sTxtTarjetaPago>
        <iCodOperacion>` + datos.OperacionCodigo + `</iCodOperacion>`;

        return xml
    }

    public generarRamos() {

    }

}