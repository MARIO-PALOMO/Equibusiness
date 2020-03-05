using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroExcepciones : DAdmConexion
    {
        public static int BroGestionExcepciones(EBroExcepciones excepcion)  
        {
            int resultado;

            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionExcepciones", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);
                cmd.Parameters.Add("@broker", SqlDbType.Int);
                cmd.Parameters.Add("@nombre", SqlDbType.NVarChar, 50);
                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = excepcion.Identificador;
                cmd.Parameters["@broker"].Value = excepcion.IdBroker;
                cmd.Parameters["@nombre"].Value = excepcion.Nombre;

                cmd.ExecuteNonQuery();

                resultado = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                Cerrar();
                return resultado;

            }
            catch (SqlException)
            {
                Cerrar();
                throw;
            }
            finally
            {
                Cerrar();
            }
        }

    }
}
