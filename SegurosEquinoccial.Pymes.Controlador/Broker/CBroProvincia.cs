using System.Collections.Generic;
using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroProvincia
    {
        public static List<EBroProvincia> BroConsultaProvincias()
        {
            return DBroProvincia.BroConsultaProvincias();
        }
    }
}
