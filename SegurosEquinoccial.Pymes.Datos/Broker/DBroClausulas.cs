using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroClausulas : DAdmConexion
    {
        public static List<EBroClausulas> BroConsultaClausulasRamos(EAuxiliares aux)
        {
            List<EBroClausulas> lstRamo = new List<EBroClausulas>();
            EBroRamo rsRamo;
            EBroClausulas rsClausulas;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaClausulasRamosBroker WHERE IdBroker = @broker AND Estado = 1", getCnn());
                cmd.Parameters.AddWithValue("@broker", aux.IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsRamo = new EBroRamo();
                    rsClausulas = new EBroClausulas();

                    rsClausulas.IdClausula = Convert.ToInt32(rdr["IdClausula"]);
                    rsClausulas.Codigo = rdr["Codigo"].ToString();
                    rsClausulas.Descripcion = rdr["Descripcion"].ToString();
                    rsClausulas.Estado = Convert.ToInt32(rdr["Estado"]);
                    rsRamo.IdRamo = Convert.ToInt32(rdr["IdRamo"]);
                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();

                    rsClausulas.Ramo = rsRamo;

                    lstRamo.Add(rsClausulas);

                }

                rdr.Close();
                return lstRamo;
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
