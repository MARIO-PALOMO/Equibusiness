using SegurosEquinoccial.Pymes.Datos.Polizas.Textos;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroTextos
    {
        public static async Task<string> BroInsertarIncisos(EBroTextos texto)
        {
            string resultado = await DPolTextos.BroInsertarIncisos(texto);
            return resultado;
        }

        public static async Task<string> BroInsertarAclaratorios(EBroTextos texto)
        {
            string resultado = await DPolTextos.BroInsertarAclaratorios(texto);
            return resultado;
        }
    }
}
