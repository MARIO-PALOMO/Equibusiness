using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroBroker : DAdmConexion
    {
        public static List<EAdmBroker> BroListarBrokers()
        {

            List<EAdmBroker> lista = new List<EAdmBroker>();

            EAdmBroker rsBroker;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Broker", getCnn());

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"].ToString());
                    rsBroker.RazonSocial = rdr["RazonSocial"].ToString();
                    rsBroker.Foto = rdr["Foto"].ToString();
                    rsBroker.Color = rdr["Color"].ToString();

                    lista.Add(rsBroker);
                }
                rdr.Close();
                return lista;
            }
            catch (SqlException)
            {
                throw;
            }
            finally
            {
                Cerrar();
            }
        }

        public static string BroObtenerCodigoAgente(string codigo)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("LISTARAGENTES", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body = ("<ConsultarAgentePorCodigo xmlns=\"http://tempuri.org/\" >"
              + "<cod_tipo_agente>" + codigo + "</cod_tipo_agente>"
            + "</ConsultarAgentePorCodigo>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroObtenerAgente(string codigo, string agente_)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("LISTARAGENTES", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";
            string nombre = "";

            string Body = ("<ConsultarAgentePorCodigo xmlns=\"http://tempuri.org/\" >"
              + "<cod_tipo_agente>" + codigo + "</cod_tipo_agente>"
            + "</ConsultarAgentePorCodigo>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            IEnumerable<XElement> agentes = XDocument.Parse(Resultado).Element("ConsultarAgentePorCodigoResult").Descendants("Table");

            foreach (XElement agente in agentes) {
                if (agente.Element("cod_agente").Value.Equals(agente_))
                {
                    nombre = agente.Element("fullname").Value;
                }
            }

            return nombre;
        }

    }
}
