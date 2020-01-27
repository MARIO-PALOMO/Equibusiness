using SegurosEquinoccial.Pymes.Datos.Polizas.Multiriesgo;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Polizas.Multiriesgo
{
    public class CPoMultiriesgo
    {
        public static string BroEmitirPolizaMultiriesgo(EAuxiliares aux)
        {
            return DPoMultiriesgo.BroEmitirPolizaMultiriesgo(aux);
        }
    }
}
