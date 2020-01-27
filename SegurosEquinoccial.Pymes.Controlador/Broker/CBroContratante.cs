using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroContratante
    {
        public static EBroContratante BroGestionContratante(EBroContratante pContratante)
        {
            return DBroContratante.BroGestionContratante(pContratante);
        }

        public static EBroContratante BroConsultarContratante(string cedula, int idCotizacion)
        {
            return DBroContratante.BroConsultarContratante(cedula, idCotizacion);
        }
    }
}
