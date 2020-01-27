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
    public class DBroTasa : DAdmConexion
    {
        public static List<EBroTasa> BroConsultaTasasRamosSubramos(int IdBroker)
        {
            List<EBroTasa> lstTasa = new List<EBroTasa>();

            EAdmBroker rsBroker;
            EBroRamo rsRamo;
            EBroSubRamo rsSubRamo;
            EBroTasa rsTasa;
            EBroProvincia rsProvincia;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaTasasRamosSubramos WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsSubRamo = new EBroSubRamo();
                    rsTasa = new EBroTasa();
                    rsProvincia = new EBroProvincia();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();

                    rsSubRamo.Codigo = rdr["CodigoSubRamo"].ToString();

                    rsTasa.Valor = rdr["Valor"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Valor"]);
                    rsTasa.ValorMinimo = rdr["ValorMinimo"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ValorMinimo"]);
                    rsTasa.ValorMaximo = rdr["ValorMaximo"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ValorMaximo"]);
                    rsTasa.CodigoSubramo = rdr["Identificador"].ToString();

                    rsProvincia.Codigo = Convert.ToInt32(rdr["CodigoProvincia"]);
                    rsProvincia.Nombre = rdr["NombreProvincia"].ToString();

                    rsTasa.Provincia = rsProvincia;
                    rsTasa.SubRamo = rsSubRamo;
                    rsSubRamo.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstTasa.Add(rsTasa);

                }
                rdr.Close();
                return lstTasa;
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

        public static List<EBroTasaVehiculo> BroConsultaTasasRamosVehiculo(int IdBroker)
        {
            List<EBroTasaVehiculo> lstTasa = new List<EBroTasaVehiculo>();

            EAdmBroker rsBroker;
            EBroRamo rsRamo;
            EBroTasaVehiculo rsTasa;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaTasasRamosVehiculo WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsTasa = new EBroTasaVehiculo();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["Codigo"].ToString();

                    rsTasa.IdTasaVehiculo = Convert.ToInt32(rdr["IdTasaVehiculo"]);
                    rsTasa.Tipo = rdr["Tipo"].ToString();
                    rsTasa.AnioInicio = Convert.ToInt32(rdr["AnioInicio"]);
                    rsTasa.AnioFin = Convert.ToInt32(rdr["AnioFin"]);
                    rsTasa.Valor = Convert.ToDouble(rdr["Valor"]); 
                    rsTasa.Codigo = rdr["CodigoTasa"].ToString();
                    rsTasa.Estado = Convert.ToInt32(rdr["Estado"]);

                    rsTasa.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstTasa.Add(rsTasa);

                }
                rdr.Close();
                return lstTasa;
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
