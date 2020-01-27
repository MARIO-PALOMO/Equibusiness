using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroDireccion
    {
        public static EBroDireccion BroGestionDireccion(EBroDireccion pdireccion)
        {
            return DBroDireccion.BroGestionDireccion(pdireccion);
        }
    }
}
