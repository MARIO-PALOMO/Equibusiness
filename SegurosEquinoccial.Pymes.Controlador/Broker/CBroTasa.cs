using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroTasa
    {
        public static List<EBroTasa> BroConsultaTasasRamosSubramos(int IdBroker)
        {
            return DBroTasa.BroConsultaTasasRamosSubramos(IdBroker);
        }

        public static List<EBroTasaVehiculo> BroConsultaTasasRamosVehiculo(int IdBroker)
        {
            return DBroTasa.BroConsultaTasasRamosVehiculo(IdBroker);
        }
    }
}
