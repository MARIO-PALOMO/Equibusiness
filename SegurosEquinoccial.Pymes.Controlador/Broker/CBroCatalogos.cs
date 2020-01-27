using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroCatalogos
    {
        public static List<EBroCatalogoAccesorios> BroConsultaAccesorios()
        {
            return DBroCatalogos.BroConsultaAccesorios();
        }
        public static List<EBroDerechosEmision> BroConsultaDerechosEmision()
        {
            return DBroCatalogos.BroConsultaDerechosEmision();
        }

        public static List<EBroCalculablesCotizacion> BroConsultaCalculablesCotizacion()
        {
            return DBroCatalogos.BroConsultaCalculablesCotizacion();
        }

        public static EBroCatalogoCedulas BroGestionCatalogoCedulas(EBroCatalogoCedulas pcedulas)
        {
            return DBroCatalogos.BroGestionCatalogoCedulas(pcedulas);
        }

        public static EBroCatalogoCedulas BroConsultaCatalogoCedula(string cedula)
        {
            return DBroCatalogos.BroConsultaCatalogoCedula(cedula);
        }


        public static List<EBroCatalogoCiudades> BroConsultaCatalogoCuidades()
        {
            return DBroCatalogos.BroConsultaCatalogoCuidades();
        }

        public static  List<EBroCatalogoSucursal> BroConsultaCatalogoSucursal()
        {
            return DBroCatalogos.BroConsultaCatalogoSucursal();
        }
    }
}
