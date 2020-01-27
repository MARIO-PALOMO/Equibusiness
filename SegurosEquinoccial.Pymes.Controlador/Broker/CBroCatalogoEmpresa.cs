using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroCatalogoEmpresa
    {
        public static EBroCatalogoEmpresa BroGestionCatalogoEmpresa(EBroCatalogoEmpresa pEmpresa)
        {
            return DBroCatalogoEmpresa.BroGestionCatalogoEmpresa(pEmpresa);
        }

        public static int BroActualziarDatosCatalogoEmpresa(EBroCatalogoEmpresa empresa)
        {
            return DBroCatalogoEmpresa.BroActualziarDatosCatalogoEmpresa(empresa);
        }

        public static EBroCatalogoEmpresa BroConsultaEmpresaCatalogo(string ruc)
        {
            return DBroCatalogoEmpresa.BroConsultaEmpresaCatalogo(ruc);
        }
    }
}
