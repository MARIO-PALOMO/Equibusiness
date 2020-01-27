using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Controlador.Administracion
{
    public class CAdmErrores
    {
        public static string AdmAlmacenarErrores(EAdmErrores error)
        {
            return DAdmErrores.AdmAlmacenarErrores(error);
        }
    }
}
