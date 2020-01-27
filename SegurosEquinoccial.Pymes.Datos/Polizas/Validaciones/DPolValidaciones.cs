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

namespace SegurosEquinoccial.Pymes.Datos.Polizas.Validaciones
{
    public class DPolValidaciones
    {
        public static string BroValidarComrpromisos(EAuxiliares aux)
        {

            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VALIDARCOMPROMISO", EGloGlobales.ambiente);
            string ServicioURL = credenciales.Url;
            string AccionSOAP = credenciales.Accion;

            string Body = ("<ConsultarCompromisosAbiertosconOtrosCorredores xmlns=\"http://tempuri.org/\">"
                            + "<cod_usuario>" + credenciales.Usuario + "</cod_usuario>"
                            + "<app_origen>" + credenciales.Origen + "</app_origen>"
                            + "<nro_doc>" + aux.ValIdentificacion + "</nro_doc>"
                            + "<cod_agente>" + aux.ValAgente + "</cod_agente>"
                            + "<cod_tipo_agente>" + aux.ValTipoAgente + "</cod_tipo_agente>"
                            + "</ConsultarCompromisosAbiertosconOtrosCorredores>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;

        }

        public static string BroValidarPolizaVigenteSise(EAuxiliares aux)
        {

            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VALIDARPOLIZASISE", EGloGlobales.ambiente);
            string ServicioURL = credenciales.Url;
            string AccionSOAP = credenciales.Accion;

            string Body = ("<ConsultarPolizasVigentesconOtrosCorredores  xmlns=\"http://www.segurosequinoccial.com/\">"
                            + "<cod_usuario>" + credenciales.Usuario + "</cod_usuario>"
                            + "<app_origen>" + credenciales.Origen + "</app_origen>"
                            + "<nro_doc>" + aux.ValIdentificacion + "</nro_doc>"
                            + "<cod_agente>" + aux.ValAgente + "</cod_agente>"
                            + "<cod_tipo_agente>" + aux.ValTipoAgente + "</cod_tipo_agente>"
                            + "</ConsultarPolizasVigentesconOtrosCorredores >");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;

        }
    }
}
