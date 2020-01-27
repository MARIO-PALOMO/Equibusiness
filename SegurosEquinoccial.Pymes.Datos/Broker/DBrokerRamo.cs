using System;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System.Data.SqlClient;
using System.Collections.Generic;
using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBrokerRamo : DAdmConexion
    {
        public static List<EBroRamo> BroConsultaDescripcionRamos(int IdBroker)
        {
            List<EBroRamo> lstRamo = new List<EBroRamo>();
            EBroRamo rsRamo;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaDescripcionRamos WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsRamo = new EBroRamo();

                    rsRamo.IdRamo = Convert.ToInt32(rdr["IdRamo"]);
                    rsRamo.Codigo = rdr["Codigo"].ToString();
                    rsRamo.Nombre = rdr["Nombre"].ToString();
                    rsRamo.Rango = rdr["Rango"].ToString();
                    rsRamo.PrimaMinima = Convert.ToDouble(rdr["PrimaMinima"]);
                    rsRamo.Multiriesgo = rdr["Multiriesgo"].ToString();
                    rsRamo.Identificador = rdr["Identificador"].ToString();
                    rsRamo.PrimaMinimaSumatoria = Convert.ToInt32(rdr["PrimaMinimaSumatoria"]);

                    lstRamo.Add(rsRamo);

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

        public static List<EBroSubRamo> BroConsultaDescripcionRamosSubramos(int IdBroker)
        {
            List<EBroSubRamo> lstSubRamo = new List<EBroSubRamo>();

            EBroSubRamo rsSubRamo;
            EBroRamo rsRamo;
            EAdmBroker rsBroker;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaDescripcionRamosSubramos WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsSubRamo = new EBroSubRamo();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();
                    rsRamo.Nombre = rdr["NombreRamo"].ToString();
                    rsRamo.Rango = rdr["RangoRamo"].ToString();
                    rsRamo.PrimaMinima = Convert.ToDouble(rdr["PrimaMinima"]);
                    rsRamo.Multiriesgo = rdr["Multiriesgo"].ToString();
                    rsRamo.PrimaMinimaSumatoria = Convert.ToInt32(rdr["PrimaMinimaSumatoria"]);
                    rsRamo.CodigoRamo = rdr["RamoCodigoRamo"].ToString();
                    rsRamo.CodigoSubramo = rdr["RamoCodigoSubramo"].ToString();

                    rsRamo.CodigoRamoTerremoto = rdr["CodigoRamoTerremoto"].ToString();
                    rsRamo.CodigoSubramoTerremoto = rdr["CodigoSubramoTerremoto"].ToString();

                    rsSubRamo.Codigo = rdr["CodigoSubRamo"].ToString();
                    rsSubRamo.Nombre = rdr["NombreSubRamo"].ToString();
                    rsSubRamo.Grupo = rdr["Grupo"].ToString();
                    rsSubRamo.Rango = rdr["RangoSubRamo"].ToString();
                    rsSubRamo.AgregadoAnual = Convert.ToInt32(rdr["AgregadoAnual"]);

                    rsSubRamo.RiesgoMenor = rdr["DeducibleRiesgoMenor"].ToString();
                    rsSubRamo.RiesgoMayor = rdr["DeducibleRiesgoMayor"].ToString();
                    rsSubRamo.Seleccion = Convert.ToInt32(rdr["Seleccion"]);
                    rsSubRamo.Union = rdr["Union"].ToString();

                    rsSubRamo.CodigoObjetoSeguro = rdr["CodigoObjetoSeguro"].ToString();
                    rsSubRamo.CodigoAmparo = rdr["CodigoAmparo"].ToString();
                    rsSubRamo.CodigoCategoria = rdr["CodigoCategoria"].ToString();
                    rsSubRamo.AcumulaPrimaTotal = rdr["AcumulaPrimaTotal"].ToString();
                    rsSubRamo.AcumulaSumaTotal = rdr["AcumulaSumaTotal"].ToString();
                    rsSubRamo.CodigosDeducibles = rdr["CodigosDeducibles"].ToString();
                    rsSubRamo.RamoPerteneciente = rdr["RamoPerteneciente"].ToString();

                    rsSubRamo.CodigoObjetoSeguroTerremoto = rdr["CodigoObjetoSeguroTerremoto"].ToString();
                    rsSubRamo.CodigoAmparoTerremoto = rdr["CodigoAmparoTerremoto"].ToString();
                    rsSubRamo.CodigoCategoriaTerremoto = rdr["CodigoCategoriaTerremoto"].ToString();
                    rsSubRamo.AcumulaPrimaTotalTerremoto = rdr["AcumulaPrimaTotalTerremoto"].ToString();
                    rsSubRamo.AcumulaSumaTotalTerremoto = rdr["AcumulaSumaTotalTerremoto"].ToString();
                    rsSubRamo.CodigosDeduciblesTerremoto = rdr["CodigosDeduciblesTerremoto"].ToString();
                    rsSubRamo.TipoPorcentaje = rdr["TipoPorcentaje"].ToString();

                    rsSubRamo.Imprime = rdr["Imprime"].ToString();
                    rsSubRamo.ImprimeTerremoto = rdr["ImprimeTerremoto"].ToString();

                    rsSubRamo.NombreObjetoSeguro = rdr["NombreObjetoSeguro"].ToString();
                    rsSubRamo.NombreObjetoSeguroTerremoto = rdr["NombreObjetoSeguroTerremoto"].ToString();
                    rsSubRamo.LimiteAgregadoAnual = rdr["LimiteAgregadoAnual"].ToString();

                    rsSubRamo.MostrarTasa = rdr["MostrarTasa"].ToString();
                    rsSubRamo.MostrarPrima = rdr["MostrarPrima"].ToString();


                    rsSubRamo.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstSubRamo.Add(rsSubRamo);

                }
                rdr.Close();
                return lstSubRamo;
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

        public static List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporte(int IdBroker)
        {
            List<EBroSubRamoTransporte> lstSubRamoTransporte = new List<EBroSubRamoTransporte>();

            EBroSubRamoTransporte rsSubRamoTransporte;
            EBroSubRamo rsSubRamo;
            EBroRamo rsRamo;
            EAdmBroker rsBroker;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaDescripcionSubRamosTransporte WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsSubRamoTransporte = new EBroSubRamoTransporte();
                    rsBroker = new EAdmBroker();
                    rsRamo = new EBroRamo();
                    rsSubRamo = new EBroSubRamo();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsRamo.Codigo = rdr["CodigoRamo"].ToString();

                    rsSubRamo.Codigo = rdr["CodigoSubRamo"].ToString();
                    rsSubRamo.Seleccion = Convert.ToInt32(rdr["Seleccion"]);
                    rsSubRamo.AgregadoAnual = Convert.ToInt32(rdr["AgregadoAnual"]);
                    rsSubRamo.Rango = rdr["Rango"].ToString();
                    rsSubRamo.Grupo = rdr["Grupo"].ToString();

                    rsSubRamoTransporte.IdSubRamoTransporte = Convert.ToInt32(rdr["IdSubRamoTransporte"]);
                    rsSubRamoTransporte.Tipo = rdr["Tipo"].ToString();
                    rsSubRamoTransporte.Descripcion = rdr["Descripcion"].ToString();
                    rsSubRamoTransporte.LimiteInferior = Convert.ToDouble(rdr["LimiteInferior"]);
                    rsSubRamoTransporte.LimiteSuperior = Convert.ToDouble(rdr["LimiteSuperior"]);
                    rsSubRamoTransporte.Tasa = Convert.ToDouble(rdr["Tasa"]);

                    rsSubRamoTransporte.Informacion = rdr["Informacion"].ToString();
                    rsSubRamoTransporte.CodigoObjetoSeguro = rdr["CodigoObjetoSeguro"].ToString();
                    rsSubRamoTransporte.CodigoAmparo = rdr["CodigoAmparo"].ToString();
                    rsSubRamoTransporte.CodigoCategoria = rdr["CodigoCategoria"].ToString();
                    rsSubRamoTransporte.AcumulaPrimaTotal = rdr["AcumulaPrimaTotal"].ToString();
                    rsSubRamoTransporte.AcumulaSumaTotal = rdr["AcumulaSumaTotal"].ToString();
                    rsSubRamoTransporte.CodigosDeducibles = rdr["CodigosDeducibles"].ToString();
                    rsSubRamoTransporte.IdentificadorAmparo = rdr["IdentificadorAmparo"].ToString();
                    

                    rsSubRamoTransporte.SubRamo = rsSubRamo;
                    rsSubRamo.Ramo = rsRamo;
                    rsRamo.Broker = rsBroker;

                    lstSubRamoTransporte.Add(rsSubRamoTransporte);

                }
                rdr.Close();
                return lstSubRamoTransporte;
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
