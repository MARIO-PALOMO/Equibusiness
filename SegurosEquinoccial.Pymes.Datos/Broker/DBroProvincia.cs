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
    public class DBroProvincia : DAdmConexion
    {
        public static List<EBroProvincia> BroConsultaProvincias()
        {
            List<EBroProvincia> lstProvincia = new List<EBroProvincia>();

            EBroProvincia rsProvincia;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Provincia", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsProvincia = new EBroProvincia();

                    rsProvincia.IdProvincia = Convert.ToInt32(rdr["IdProvincia"]);
                    rsProvincia.Codigo = Convert.ToInt32(rdr["Codigo"]);
                    rsProvincia.Nombre = rdr["Nombre"].ToString();

                    lstProvincia.Add(rsProvincia);

                }
                rdr.Close();
                return lstProvincia;

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
