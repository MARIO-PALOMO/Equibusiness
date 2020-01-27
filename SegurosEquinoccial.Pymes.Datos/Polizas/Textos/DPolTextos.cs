using Newtonsoft.Json;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Polizas.Textos
{
    public class DPolTextos
    {
        public static async Task<string> BroInsertarIncisos(EBroTextos texto)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("INSERTARINCISOS", EGloGlobales.ambiente);

            string url = credenciales.Url + credenciales.Accion + "?idpv=" + texto.IdPV + "&item=" + texto.Item;

            var body = JsonConvert.SerializeObject(new
            {
                IdPV = texto.IdPV,
                Item = texto.Item,
                Texto = texto.Texto
            });

            string resultado = await DAdmConexionREST.GesEjecutarSolicitudWebRESTText(url, body, "POST");

            return resultado;

        }

        public static async Task<string> BroInsertarAclaratorios(EBroTextos texto)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("INSERTARACLARATORIOS", EGloGlobales.ambiente);

            string url = credenciales.Url + credenciales.Accion + texto.IdPV;

            var body = JsonConvert.SerializeObject(new
            {
                IdPV = texto.IdPV,
                Texto = texto.Texto
            });

            string resultado = await DAdmConexionREST.GesEjecutarSolicitudWebRESTText(url, body, "POST");

            return resultado;

        }

    }
}
