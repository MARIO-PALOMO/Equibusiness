using Newtonsoft.Json;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Polizas.Vehiculos
{
    public class DPolVehiculos
    {

        public static async Task<string> ObtenerPolizaVigenteVehiculos(string placa)
        {

            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("POLIZAVIGENTEVEHICULO", EGloGlobales.ambiente);

            string Url = credenciales.Url + credenciales.Accion + "?placa=" + placa + "&chasis=null";

            string resultado = await DAdmConexionREST.GesEjecutarSolicitudWebRESTText(Url, "", "GET");

            return resultado;
        }

        public static async Task<string> ingresarDatosVehiculo(EAuxiliares vehiculos)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("INGRESARDATOSVEHICULO", EGloGlobales.ambiente);

            string Url = credenciales.Url + credenciales.Accion;

            var body = JsonConvert.DeserializeObject(vehiculos.JSONVehiculos);
            var res = JsonConvert.SerializeObject(body);

            string resultado = await DAdmConexionREST.GesEjecutarSolicitudWebRESTText(Url, res, "POST");

            return resultado;
        }

        public static async Task<string> generarPolizaVehiculo(EAuxiliares vehiculos)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("EMITIRPOLIZAVEHICULO", EGloGlobales.ambiente);

            string Url = credenciales.Url + credenciales.Accion;

            /* var body = JsonConvert.DeserializeObject(vehiculos.JSONVehiculos);
             var res = JsonConvert.SerializeObject(body);*/

            string resultado = await DAdmConexionREST.GesEjecutarSolicitudWebRESTText(Url, vehiculos.JSONVehiculos, "POST");

            return resultado;
        }
    }
}
