using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SegurosEquinoccial.Pymes.Datos.Gestion
{
    public class DAdmConexionREST
    {
        public static async Task<string> BroEjecutarSolicitudWebREST(string url, string ocpKey, string bodyData)
        {
            var resultado = "";
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", ocpKey);

            var uri = url + "?" + queryString;

            HttpResponseMessage response;

            byte[] byteData = Encoding.UTF8.GetBytes(bodyData);

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(uri, content);

                resultado = response.Content.ReadAsStringAsync().Result;
            }

            return resultado;
        }

        public static async Task<string> GesEjecutarSolicitudWebRESTText(string url, string bodyData, string type)
        {
            var resultado = "";

            try
            {
                var client = new HttpClient();

                //client.DefaultRequestHeaders.Add("Authorization", headerData);

                var uri = url;

                HttpResponseMessage response;

                byte[] byteData = Encoding.UTF8.GetBytes(bodyData);
                using (var content = new ByteArrayContent(byteData))
                {

                    if (type.Equals("GET"))
                    {
                        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        response = await client.GetAsync(uri);
                        resultado = response.Content.ReadAsStringAsync().Result;
                    }
                    else if (type.Equals("POST"))
                    {
                        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        response = await client.PostAsync(uri, content);
                        resultado = response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
            catch (HttpException)
            {
                throw;
            }


            return resultado;
        }
    }
}
