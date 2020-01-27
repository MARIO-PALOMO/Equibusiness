using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroBroker
    {
        public static List<EAdmBroker> BroListarBrokers()
        {
            return DBroBroker.BroListarBrokers();
        }

        public static string BroObtenerCodigoAgente(string codigo)
        {
            return DBroBroker.BroObtenerCodigoAgente(codigo);
        }

        public static string BroObtenerAgente(string codigo, string agente_)
        {
            return DBroBroker.BroObtenerAgente(codigo, agente_);
        }
    }
}
