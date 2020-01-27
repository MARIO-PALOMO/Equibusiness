using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Datos.Administracion
{
    public class DAdmErrores : DAdmConexion
    {
        public static string AdmAlmacenarErrores(EAdmErrores error)
        {
            string msm = "0";
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("GestionErrores", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@identificador", SqlDbType.Int);
                cmd.Parameters.Add("@message", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@name", SqlDbType.NVarChar, 100);
                cmd.Parameters.Add("@ok", SqlDbType.NVarChar, 10);
                cmd.Parameters.Add("@status", SqlDbType.NVarChar, 10);
                cmd.Parameters.Add("@statusText", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@url", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@error", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = 1;
                cmd.Parameters["@message"].Value = error.message;
                cmd.Parameters["@name"].Value = error.name;
                cmd.Parameters["@ok"].Value = error.ok;
                cmd.Parameters["@status"].Value = error.status;
                cmd.Parameters["@statusText"].Value = error.statusText;
                cmd.Parameters["@url"].Value = error.url;
                cmd.Parameters["@error"].Value = error.error;
                


                cmd.ExecuteNonQuery();
                msm = cmd.Parameters["@valor"].Value.ToString();
                return msm;

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
