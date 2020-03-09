using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroReglasGenerales
    {
        public static EBroReglasGenerales BroConsultaReglasGenerales(int idBroker, string nombre)
        {
            return DBroReglasGenerales.BroConsultaReglasGenerales(idBroker, nombre);
        }

        public static int BroGestionExcepciones(EBroExcepciones excepcion)
        {
            return DBroExcepciones.BroGestionExcepciones(excepcion);
        }

    }
}
