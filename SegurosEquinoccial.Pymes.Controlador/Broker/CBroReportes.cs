using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroReportes
    {
        public static List<EBroReporteUsuarios> ReporteListarUsuarios(string IdBroker)
        {
            return DBroReportes.ReporteListarUsuarios(IdBroker);
        }

        public static List<EBroReporteCotizaciones> ReporteListarCotizacionesBroker(string IdBroker, string estado)
        {
            return DBroReportes.ReporteListarCotizacionesBroker(IdBroker, estado);
        }

        public static List<EBroReporteEmisiones> ReporteListarEmisionesBroker(string IdBroker, string estado)
        {
            return DBroReportes.ReporteListarEmisionesBroker(IdBroker, estado);
        }

        public static string ReporteCiudadBroker(string IdBroker)
        {
            return DBroReportes.ReporteCiudadBroker(IdBroker);
        }

        public static string ReporteListarCiudadesCotizacionesBroker(string IdBroker) {
            return DBroReportes.ReporteListarCiudadesCotizacionesBroker(IdBroker);
        }

        public static string ReporteListarCiudadesEmisionesBroker(string IdBroker)
        {
            return DBroReportes.ReporteListarCiudadesEmisionesBroker(IdBroker);
        }

        public static string ReporteCiudadBrokerCotizaciones(string IdBroker, string estado)
        {
            return DBroReportes.ReporteCiudadBrokerCotizaciones(IdBroker, estado);
        }

        public static string ReporteCiudadBrokerEmisiones(string IdBroker, string estado)
        {
            return DBroReportes.ReporteCiudadBrokerEmisiones(IdBroker, estado);
        }

        public static string DetalleValoresCotizacionesBrokerCiudad(EBroReporteDetalleValoresBroker datos)  
        {
            return DBroReportes.DetalleValoresCotizacionesBrokerCiudad(datos);
        }

        public static string DetalleValoresEmisionesBrokerCiudad(EBroReporteDetalleValoresBroker datos)
        {
            return DBroReportes.DetalleValoresEmisionesBrokerCiudad(datos);
        }


    }
}
