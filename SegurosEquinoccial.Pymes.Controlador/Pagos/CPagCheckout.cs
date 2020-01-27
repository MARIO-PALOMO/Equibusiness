using SegurosEquinoccial.Pymes.Datos.Pagos;
using System.Collections.Generic;

namespace SegurosEquinoccial.Pymes.Controlador.Pagos
{
    public class CPagCheckout
    {
        public static Dictionary<string, dynamic> obtenerChekoutId()
        {
            return DPagCheckout.obtenerChekoutId();
        }

        public static Dictionary<string, dynamic> obtenerResultadoPago(string id)
        {
            return DPagCheckout.obtenerResultadoPago(id);
        }
    }
}
