using SegurosEquinoccial.Pymes.Datos.Polizas.Validaciones;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Polizas.Validaciones
{
    public class CPolValidaciones
    {
        public static string BroValidarComrpromisos(EAuxiliares aux)
        {
            return DPolValidaciones.BroValidarComrpromisos(aux);
        }

        public static string BroValidarPolizaVigenteSise(EAuxiliares aux)
        {
            return DPolValidaciones.BroValidarPolizaVigenteSise(aux);
        }
    }
}
