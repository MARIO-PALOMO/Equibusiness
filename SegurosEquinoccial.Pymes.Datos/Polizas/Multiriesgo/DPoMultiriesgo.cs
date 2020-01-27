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

namespace SegurosEquinoccial.Pymes.Datos.Polizas.Multiriesgo
{
    public class DPoMultiriesgo
    {
        public static string BroEmitirPolizaMultiriesgo(EAuxiliares aux)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("EMITIRPOLIZA", EGloGlobales.ambiente);

            string ServicioOrigen = credenciales.Origen;
            string ServicioUsuario = credenciales.Usuario;
            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = aux.TramaXML;

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAPEmision(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }
    }
}
