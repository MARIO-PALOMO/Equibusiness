using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroComplementos : DAdmConexion
    {

        public static List<EBroComplementos> BroConsultaDescripcionComplementos(string identificador, int broker)
        {
            List<EBroComplementos> lstComplementos = new List<EBroComplementos>();

            EBroComplementos rsComplementos;
            EAdmBroker rsBroker;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaDescripcionComplementosBroker WHERE Identificador = @identificador AND IdBroker = @broker ORDER BY CONVERT(INT, Acumulador) ASC, CONVERT(INT, Orden) ASC", getCnn());
                cmd.Parameters.AddWithValue("@identificador", identificador);
                cmd.Parameters.AddWithValue("@broker", broker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsComplementos = new EBroComplementos();
                    rsBroker = new EAdmBroker();

                    rsComplementos.Codigo = rdr["Codigo"].ToString();
                    rsComplementos.Descripcion = rdr["Descripcion"].ToString();
                    rsComplementos.Titulo = rdr["Titulo"].ToString();
                    rsComplementos.Subtitulo = rdr["Subtitulo"].ToString();
                    rsComplementos.Orden = rdr["Orden"].ToString();
                    rsComplementos.Monto = rdr["Monto"].ToString();
                    rsComplementos.Identificador = rdr["Identificador"].ToString();
                    rsComplementos.Acumulador = rdr["Acumulador"].ToString();
                    rsComplementos.Valor = Convert.ToInt32(rdr["Valor"]);
                    rsComplementos.Bloqueo = rdr["Bloqueo"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Bloqueo"]);

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsComplementos.Broker = rsBroker;

                    lstComplementos.Add(rsComplementos);

                }
                rdr.Close();
                return lstComplementos;
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
    }
}
