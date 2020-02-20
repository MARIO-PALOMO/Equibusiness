using Newtonsoft.Json.Linq;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Polizas.Pago
{
    public class DPolPago
    {

        public static string BroObtenerCodigoAsegurado(string documento)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("CODIGOASEGURADO", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<ActualizarDatosAccContPOTENCIALxDoc xmlns=\"http://tempuri.org/\" >"
      + "<sCodUsuario>" + credenciales.UsuarioNombre + "</sCodUsuario>"
      + "<sValorParametro>" + documento + "</sValorParametro>"
      + "<iTipoParametro>1</iTipoParametro>"
    + "</ActualizarDatosAccContPOTENCIALxDoc>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }


        public static string BroValidarFormularioVinculacion(EAuxiliares datos)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VALIDACIONFORMULARIO", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<ConsultarFormularioVinculacionValidoExt xmlns=\"http://tempuri.org/\">"
                          + "<param>"
                            + "<sNroDocumento>" + datos.DocumentoCliente + "</sNroDocumento>"
                            + "<sOrigen>PYMES</sOrigen>"
                            + "<sEmail>" + datos.EmailAgente + "</sEmail>"
                            + "<iCodAgente>" + datos.CodigoAgente + "</iCodAgente>"
                            + "<iCodTipoAgente>" + datos.CodigoTipoAgente + "</iCodTipoAgente>"
                            + "<bEnviarEmail>" + datos.EnviarEmail + "</bEnviarEmail>"
                            + "<sEmailCliente>" + datos.EmailCliente + "</sEmailCliente>"
                            + "<sNombreCliente>" + datos.NombreCliente + "</sNombreCliente>"
                            + "<iTipoEntidad>1</iTipoEntidad>"
                            + "<iSubTipoEntidad>0</iSubTipoEntidad>"
                            + "<iTipoTransaccion>0</iTipoTransaccion>"
                            + "<sNombreAseguraoObjetodeGarantia></sNombreAseguraoObjetodeGarantia>"
                            + "<bValidacionAnticipada>0</bValidacionAnticipada>"
                            + "<sCodUsuario></sCodUsuario>"
                          + "</param>"
                        + "</ConsultarFormularioVinculacionValidoExt>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroConsultarPagador(string IdPv)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("CODIGOPAGADOR", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<traerCodAsegPagadorIDPV xmlns=\"http://tempuri.org/\">"
                  + "<usuario>" + credenciales.UsuarioNombre + "</usuario>"
                  + "<contraseña>" + credenciales.Contrasena + "</contraseña>"
                  + "<id_pv>" + IdPv + "</id_pv>"
                + "</traerCodAsegPagadorIDPV>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroConsultarValorPagar(string IdPv)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VALORAPAGAR", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<traerPrimaTotalIDPV  xmlns=\"http://tempuri.org/\">"
                  + "<usuario>" + credenciales.UsuarioNombre + "</usuario>"
                  + "<contraseña>" + credenciales.Contrasena + "</contraseña>"
                  + "<id_pv>" + IdPv + "</id_pv>"
                + "</traerPrimaTotalIDPV >");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroAplicarPago(EAuxiliares aux)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("APLICARPAGO", EGloGlobales.ambiente);

            string ServicioOrigen = credenciales.Origen;
            string ServicioUsuario = credenciales.Usuario;
            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<generaCobro xmlns=\"http://tempuri.org/\">"
                  + "<json>" + aux.JSONPagos + "</json>"
                + "</generaCobro>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroAplicarPago5Polizas(EAuxiliares aux)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("APLICARPAGO2", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<pagoTarjetaMasivos  xmlns=\"http://tempuri.org/\">"
                      + "<usuario>" + aux.canal + "</usuario>"
                      + "<cod_suc_pago>" + aux.sucursal + "</cod_suc_pago>"
                      + "<cod_pagador>" + aux.pagador + "</cod_pagador>"
                      + "<nro_couta>1</nro_couta>"
                      + "<nro_tarjeta>" + aux.tarjeta + "</nro_tarjeta>"
                      + "<nro_autorizacion>" + aux.autorizacion + "</nro_autorizacion>"
                      + "<cod_banco_tarjeta>" + aux.codigoBanco + "</cod_banco_tarjeta>"
                      + "<cod_conducto_pago>" + aux.codigoConducto + "</cod_conducto_pago>"
                      + "<voucher_tarjeta>" + aux.voucher + "</voucher_tarjeta>"
                      + "<fecha_voucher>" + aux.fechaVoucher + "</fecha_voucher>"
                      + "<apoderado_tarjeta>" + aux.holderTarjeta + "</apoderado_tarjeta>"
                      + "<IdPv_Valor>" + aux.IdPv + "</IdPv_Valor>"
                + "</pagoTarjetaMasivos>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }


        public static string BroObtenerBancoConductos()
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("BANCOCONDUCTOS", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;
            string Body = ("<ConsultarConductosPagoPorTipo xmlns=\"http://tempuri.org/\">"
                          + "<codTtipoConducto>3</codTtipoConducto>"
                        + "</ConsultarConductosPagoPorTipo>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);
            return Resultado;
        }

        public static string BroObtenerPlanPagoCuotas(string conducto)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("CUOTASCONDUCTO", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;
            string Body = ("<ConsultarPlanesPagoPorConductoPago xmlns=\"http://tempuri.org/\">"
                                + "<codConducto>" + conducto + "</codConducto>"
                                + "<tipoNegocio>" + credenciales.UsuarioNombre + "</tipoNegocio>"
                        + "</ConsultarPlanesPagoPorConductoPago>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);
            return Resultado;
        }

        public static string BroObtenerNumeroCuotas(string codigo)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("NUMEROCUOTAS", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;
            string Body = ("<ConsultarNumCuotasPorPlanPago xmlns=\"http://tempuri.org/\">"
                                + "<codPpago>" + codigo + "</codPpago>"
                        + "</ConsultarNumCuotasPorPlanPago>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);
            return Resultado;
        }

    }
}
