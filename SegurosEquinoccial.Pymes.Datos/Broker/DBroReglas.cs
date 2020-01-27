using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroReglas : DAdmConexion
    {
        public static List<EBroReglas> ConsultaReglasRamosSubramos(int IdBroker)
        {
            List<EBroReglas> lstReglas = new List<EBroReglas>();

            EAdmBroker rsBroker;
            EBroRamo rsRamo;
            EBroSubRamo rsSubRamo;
            EBroReglas rsReglas;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaReglasRamosSubramos WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsSubRamo = new EBroSubRamo();
                    rsReglas = new EBroReglas();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();

                    rsSubRamo.Codigo = rdr["CodigoSubRamo"].ToString();

                    rsReglas.LimiteIndividual = rdr["LimiteIndividual"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteIndividual"]);
                    rsReglas.LimiteGrupal = rdr["LimiteGrupal"] == DBNull.Value ? 0: Convert.ToDouble(rdr["LimiteGrupal"]);
                    rsReglas.LimiteGlobal = rdr["LimiteGlobal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteGlobal"]);
                    rsReglas.LimiteVertical = rdr["LimiteVertical"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteVertical"]);
                    rsReglas.LimiteProvincial = rdr["LimiteProvincial"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteProvincial"]);
                    rsReglas.Porcentaje = rdr["Porcentaje"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Porcentaje"]);
                    rsReglas.CodigoSubRamoDependiente = rdr["CodigoSubRamoDependiente"].ToString();
                    rsReglas.CodigoSubRamoMandatorio = rdr["CodigoSubRamoMandatorio"].ToString();
                    rsReglas.Descripcion = rdr["Descripcion"].ToString();
                    rsReglas.Identificador = rdr["Identificador"].ToString();
                    rsReglas.ListaRamo = rdr["ListaRamo"].ToString();
                    rsReglas.ListaSubRamo = rdr["ListaSubRamo"].ToString();

                    rsReglas.SubRamo = rsSubRamo;
                    rsSubRamo.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstReglas.Add(rsReglas);

                }
                rdr.Close();
                return lstReglas;
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

        public static List<EBroReglasAdicionales> ConsultaReglasAdicionalesRamosSubramos(int IdBroker)
        {
            List<EBroReglasAdicionales> lstReglas = new List<EBroReglasAdicionales>();

            EAdmBroker rsBroker;
            EBroRamo rsRamo;
            EBroSubRamo rsSubRamo;
            EBroReglasAdicionales rsReglas;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaReglasAdicionalesRamosSubramos WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsSubRamo = new EBroSubRamo();
                    rsReglas = new EBroReglasAdicionales();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();

                    rsSubRamo.Codigo = rdr["CodigoSubRamo"].ToString();

                    rsReglas.LimiteIndividual = rdr["LimiteIndividual"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteIndividual"]);
                    rsReglas.LimiteGrupal = rdr["LimiteGrupal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteGrupal"]);
                    rsReglas.LimiteGlobal = rdr["LimiteGlobal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteGlobal"]);
                    rsReglas.LimiteVertical = rdr["LimiteVertical"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteVertical"]);
                    rsReglas.LimiteProvincial = rdr["LimiteProvincial"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["LimiteProvincial"]);
                    rsReglas.Porcentaje = rdr["Porcentaje"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Porcentaje"]);
                    rsReglas.CodigoSubRamoDependiente = rdr["CodigoSubRamoDependiente"].ToString();
                    rsReglas.CodigoSubRamoMandatorio = rdr["CodigoSubRamoMandatorio"].ToString();
                    rsReglas.Descripcion = rdr["Descripcion"].ToString();
                    rsReglas.Identificador = rdr["Identificador"].ToString();

                    rsReglas.SubRamo = rsSubRamo;
                    rsSubRamo.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstReglas.Add(rsReglas);

                }
                rdr.Close();
                return lstReglas;
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
