using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroCompromiso
    {
        public static string BroRegistrarCompromiso(EAuxiliares aux)
        {
            return DBroCompromiso.BroRegistrarCompromiso(aux);
        }

        public static string BroCerrarCompromiso(EAuxiliares aux)
        {
            return DBroCompromiso.BroCerrarCompromiso(aux);
        }
    }
}
