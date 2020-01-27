using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroPagador
    {
        public static EBroPagador BroGestionPagador(EBroPagador pPagador)
        {
            return DBroPagador.BroGestionPagador(pPagador);
        }

        public static EBroPagador BroConsultarPagador(string cedula, int idCotizacion)
        {
            return DBroPagador.BroConsultarPagador(cedula, idCotizacion);
        }
    }
}
