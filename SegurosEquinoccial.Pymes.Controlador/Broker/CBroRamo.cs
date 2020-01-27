using System.Collections.Generic;
using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroRamo
    {
        public static List<EBroSubRamo> BroConsultaDescripcionRamosSubramos(int IdBroker)
        {
            return DBrokerRamo.BroConsultaDescripcionRamosSubramos(IdBroker);
        }

        public static List<EBroRamo> BroConsultaDescripcionRamos(int IdBroker)
        {
            return DBrokerRamo.BroConsultaDescripcionRamos(IdBroker);
        }

        public static List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporte(int IdBroker)
        {
            return DBrokerRamo.BroConsultaDescripcionSubRamosTransporte(IdBroker);
        }
    }
}
