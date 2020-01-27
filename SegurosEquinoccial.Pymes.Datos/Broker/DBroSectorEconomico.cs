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
    public class DBroSectorEconomico : DAdmConexion
    {
        public static List<EBroSectorEconomico> BroConsultaSectorEconomico()
        {
            List<EBroSectorEconomico> lstSEconomico = new List<EBroSectorEconomico>();

            EBroSectorEconomico rsSEconomico;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaSectorEconomico", getCnn());
                DataTable read = new DataTable();
                read.TableName = "SectorEconomico";
                read.Load(cmd.ExecuteReader());
                foreach (DataRow rdr in read.Rows)
                {
                    rsSEconomico = new EBroSectorEconomico();

                    rsSEconomico.IdSectorEconomico = Convert.ToInt32(rdr["IdSectorEconomico"]);
                    rsSEconomico.Nombre = rdr["Nombre"].ToString();

                    lstSEconomico.Add(rsSEconomico);
                }

                read.Clear();
                /*SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsSEconomico = new EBroSectorEconomico();

                    rsSEconomico.IdSectorEconomico = Convert.ToInt32(rdr["IdSectorEconomico"]);
                    rsSEconomico.Nombre = rdr["Nombre"].ToString();

                    lstSEconomico.Add(rsSEconomico);

                }
                rdr.Close();*/
                return lstSEconomico;

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
