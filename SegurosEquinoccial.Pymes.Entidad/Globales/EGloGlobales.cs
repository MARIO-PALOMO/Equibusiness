using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Globales
{
    public class EGloGlobales
    {
        public static string ambiente = "DESARROLLO";

        public static EAdmCatalogoCredenciales obtenerCredenciales()
        {
            EAdmCatalogoCredenciales reCredenciales = new EAdmCatalogoCredenciales();
            if (ambiente == "DESARROLLO")
            {

                //reCredenciales.HostDB = "192.168.100.109";
                reCredenciales.HostDB = "10.160.1.12";
                reCredenciales.NameDB = "CotizadorPymes";
                reCredenciales.UserDB = "sa";
                reCredenciales.PasswordDB = "123";
            }
            else if (ambiente == "PRUEBAS")
            {
                reCredenciales.HostDB = "equinoccialpymesproduccionsrv.database.windows.net";
                reCredenciales.NameDB = "EquinoccialPymesProduccionDB";
                reCredenciales.UserDB = "pymes_admin";
                reCredenciales.PasswordDB = "pym3s_adm1n";
            }
            else if (ambiente == "PRODUCCION")
            {
                reCredenciales.HostDB = "pymesproduccionsvr.database.windows.net";
                reCredenciales.NameDB = "PymesProduccion";
                reCredenciales.UserDB = "pymes";
                reCredenciales.PasswordDB = "cot1zad0rpym3s_01";
            }

            return reCredenciales;
        }
    }
}
