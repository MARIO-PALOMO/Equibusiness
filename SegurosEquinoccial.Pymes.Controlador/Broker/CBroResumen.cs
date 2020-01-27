using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
   public  class CBroResumen
    {

        public static List<EBroCotizacion> BroConsultarResumenCotizacionesUsuarios(EBroResumen pResumen)
        {
            return DBroResumen.BroConsultarResumenCotizacionesUsuarios(pResumen);
        }

        public static List<EBroCotizacion> BroConsultarResumenGlobalCotizacionesUsuarios(EBroResumen pResumen)
        {
            return DBroResumen.BroConsultarResumenGlobalCotizacionesUsuarios(pResumen);
        }

        public static List<EAdmUsuarios> BroConsultaUsuariosTotalCiudad(EBroResumen pResumen)
        {
            return DBroResumen.BroConsultaUsuariosTotalCiudad(pResumen);
        }

        public static List<EBroCotizacion> BroconsultarTotalCotizacionesOperador(EBroResumen pResumen)
        {
            return DBroResumen.BroconsultarTotalCotizacionesOperador(pResumen);
        }

        public static List<EBroCotizacion> BroconsultarParametrosTotalCotizacionesOperador(EBroResumen pResumen)
        {
            return DBroResumen.BroconsultarParametrosTotalCotizacionesOperador(pResumen);
        }

    }
}
