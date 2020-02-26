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
    public class DBroReglasGenerales : DAdmConexion
    {

        public static EBroReglasGenerales BroConsultaReglasGenerales(int idBroker, string nombre)
        {
            EBroReglasGenerales rsReglas = new EBroReglasGenerales();
            EAdmBroker rsBroker = new EAdmBroker();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("select * from ConsultaBrokerReglasGenerales WHERE IdBroker = @idBroker AND Nombre = @nombre", getCnn());
                cmd.Parameters.AddWithValue("@idBroker", idBroker);
                cmd.Parameters.AddWithValue("@nombre", nombre);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsReglas.IdReglasGenerales = rdr["IdReglasGenerales"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdReglasGenerales"]);
                    rsReglas.Igual = rdr["Igual"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Igual"]);
                    rsReglas.Mayor = rdr["Mayor"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Mayor"]);
                    rsReglas.Menor = rdr["Menor"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Menor"]);
                    rsReglas.Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    rsReglas.Nombre = rdr["Nombre"].ToString();
                    rsBroker.IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);
                    rsReglas.Broker = rsBroker;

                }
                rdr.Close();
                return rsReglas;

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
