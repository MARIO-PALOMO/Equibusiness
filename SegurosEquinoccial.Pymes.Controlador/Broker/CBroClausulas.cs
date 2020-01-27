using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroClausulas
    {
        public static List<EBroClausulas> BroConsultaClausulasRamos(EAuxiliares aux)
        {
            return DBroClausulas.BroConsultaClausulasRamos(aux);
        }
    }
}
