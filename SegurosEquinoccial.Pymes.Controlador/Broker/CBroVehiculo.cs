using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroVehiculo
    {
        public static EBroVehiculo BroGestionVehiculo(EBroVehiculo pvehiculo)
        {
            return DBroVehiculo.BroGestionVehiculo(pvehiculo);
        }

        public static EBroCatalogoVehiculos BroGestionCatalogoVehiculo(EBroCatalogoVehiculos pvehiculo)
        {
            return DBroVehiculo.BroGestionCatalogoVehiculo(pvehiculo);
        }

        public static async Task<string> BroObtenerVehiculosANT(string Placa)
        {
            string resultado = await DBroVehiculo.BroObtenerVehiculosANT(Placa);
            return resultado;
        }

        public static EBroCatalogoVehiculos BroObtenerVehiculosPYMES(string Placa_)
        {
            return DBroVehiculo.BroObtenerVehiculosPYMES(Placa_);
        }
    }
}
