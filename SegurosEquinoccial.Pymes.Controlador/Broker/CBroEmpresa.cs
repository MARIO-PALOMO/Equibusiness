using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroEmpresa
    {
        public static EBroEmpresa BroGestionEmpresa(EBroEmpresa pEmpresa)
        {
            return DBroEmpresa.BroGestionEmpresa(pEmpresa);
        }

        public static List<EBroCotizacion> BroConsultaEmpresa(int cotizacion, int broker, int empresa)
        {
            return DBroEmpresa.BroConsultaEmpresa(cotizacion, broker, empresa);
        }

        public static EBroEmpresa BroConsultarEmpresaPymes(string ruc)
        {
            return DBroEmpresa.BroConsultarEmpresaPymes(ruc);
        }

        public static EBroCotizacion BroValidarEmpresaCotizacion(string ruc)
        {
            return DBroEmpresa.BroValidarEmpresaCotizacion(ruc);
        }

        public static string BroConsultaEmpresaServicio(string ruc)
        {
            return DBroEmpresa.BroConsultaEmpresaServicio(ruc);
        }
        public static async Task<string> BroConsultarEmpresaPersonaServicio(string documento)
        {
            string resultado = await DBroEmpresa.BroConsultarEmpresaPersonaServicio(documento);
            return resultado;
        }

        public static async Task<string> BroActualizarEmpresaPersonaServicio(EAuxiliares datos)
        {
            string resultado = await DBroEmpresa.BroActualizarEmpresaPersonaServicio(datos);
            return resultado;
        }
    }
}
