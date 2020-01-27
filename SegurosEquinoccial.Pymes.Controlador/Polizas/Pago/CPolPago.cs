using SegurosEquinoccial.Pymes.Datos.Polizas.Pago;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Polizas.Pago
{
    public class CPolPago
    {

        public static string BroObtenerCodigoAsegurado(string documento)
        {
            return DPolPago.BroObtenerCodigoAsegurado(documento);
        }
        public static string BroValidarFormularioVinculacion(EAuxiliares datos)
        {
            return DPolPago.BroValidarFormularioVinculacion(datos);
        }

        public static string BroConsultarPagador(string IdPv)
        {
            return DPolPago.BroConsultarPagador(IdPv);
        }

        public static string BroConsultarValorPagar(string IdPv)
        {
            return DPolPago.BroConsultarValorPagar(IdPv);
        }

        public static string BroAplicarPago(EAuxiliares aux)
        {
            return DPolPago.BroAplicarPago(aux);
        }

        public static string BroAplicarPago5Polizas(EAuxiliares aux)
        {
            return DPolPago.BroAplicarPago5Polizas(aux);
        }
    }
}
