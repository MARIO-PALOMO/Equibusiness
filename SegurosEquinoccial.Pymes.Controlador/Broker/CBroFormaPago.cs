using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroFormaPago
    {
        public static EBroFormaPago BroGestionFormaPago(EBroFormaPago pPago)
        {
            return DBroFormaPago.BroGestionFormaPago(pPago);
        }
        public static int adjuntarArchivo(EBroFormaPago pago)
        {
            return DBroFormaPago.adjuntarArchivo(pago);
        }

        public static EBroFormaPago BroConsultarFormaPago(int idFormaPago)
        {
            return DBroFormaPago.BroConsultarFormaPago(idFormaPago);
        }
    }
}
