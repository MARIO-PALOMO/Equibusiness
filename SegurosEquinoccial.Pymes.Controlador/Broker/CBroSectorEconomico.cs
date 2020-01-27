using System.Collections.Generic;
using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroSectorEconomico
    {
        public static List<EBroSectorEconomico> BroConsultaSectorEconomico()
        {
            return DBroSectorEconomico.BroConsultaSectorEconomico();
        }
    }
}
