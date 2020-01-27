using SegurosEquinoccial.Pymes.Datos.Polizas.Vehiculos;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Polizas.Vehiculos
{
    public class CPolVehiculos
    {

        public static async Task<string> ObtenerPolizaVigenteVehiculos(string placa)
        {
            string resultado = await DPolVehiculos.ObtenerPolizaVigenteVehiculos(placa);
            return resultado;
        }
        public static async Task<string> ingresarDatosVehiculo(EAuxiliares vehiculos)
        {
            string resultado = await DPolVehiculos.ingresarDatosVehiculo(vehiculos);
            return resultado;
        }

        public static async Task<string> generarPolizaVehiculo(EAuxiliares vehiculos)
        {
            string resultado = await DPolVehiculos.generarPolizaVehiculo(vehiculos);
            return resultado;
        }
    }
}
