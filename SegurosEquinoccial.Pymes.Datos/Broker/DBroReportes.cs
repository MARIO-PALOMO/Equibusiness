﻿using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroReportes : DAdmConexion
    {
        public static List<EBroReporteUsuarios> ReporteListarUsuarios(string IdBroker)
        {

            List<EBroReporteUsuarios> lstListaUsuarios = new List<EBroReporteUsuarios>();
            EBroReporteUsuarios rsReporteUsuarios;

            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaReporteUsuarios WHERE Broker = @broker ORDER BY Agente", getCnn());
                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsReporteUsuarios = new EBroReporteUsuarios();

                    rsReporteUsuarios.A_Usuario = rdr["Usuario"].ToString();
                    rsReporteUsuarios.B_Email = rdr["Email"].ToString();
                    rsReporteUsuarios.C_Ciudad = rdr["Ciudad"].ToString();
                    rsReporteUsuarios.D_Agente = rdr["Agente"].ToString();
                    rsReporteUsuarios.E_Corredor = rdr["Corredor"].ToString();
                    rsReporteUsuarios.F_Comision = rdr["Comision"].ToString();

                    lstListaUsuarios.Add(rsReporteUsuarios);

                }
                rdr.Close();
                return lstListaUsuarios;
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

        public static List<EBroReporteCotizaciones> ReporteListarCotizacionesBroker(string IdBroker, string estado)
        {
            List<EBroReporteCotizaciones> lstReporteCotizacionesBroker = new List<EBroReporteCotizaciones>();
            EBroReporteCotizaciones rsReporteCotizacionesBroker;

            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("SET LANGUAGE Spanish; "
                + " SELECT * FROM ConsultaReporteCotizacionesBroker "
                + " WHERE IdBroker = @broker "
                + " ORDER BY Fecha ASC ", getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(estado));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsReporteCotizacionesBroker = new EBroReporteCotizaciones();

                    rsReporteCotizacionesBroker.A_Version = rdr["Broker"].ToString();
                    rsReporteCotizacionesBroker.B_Empresa = rdr["Empresa"].ToString();
                    rsReporteCotizacionesBroker.C_Codigo = rdr["Codigo"].ToString();
                    rsReporteCotizacionesBroker.D_Fecha = rdr["Fecha"].ToString();
                    rsReporteCotizacionesBroker.E_CotizacionYear = rdr["CotizacionYear"].ToString();
                    rsReporteCotizacionesBroker.F_CotizacionMonth = rdr["CotizacionMonth"].ToString();
                    rsReporteCotizacionesBroker.G_Usuario = rdr["Usuario"].ToString();
                    rsReporteCotizacionesBroker.H_PrimaNeta = rdr["PrimaNeta"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNeta"]);
                    rsReporteCotizacionesBroker.I_PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsReporteCotizacionesBroker.J_Tipo = rdr["Tipo"].ToString();
                    rsReporteCotizacionesBroker.K_Ciudad = rdr["Ciudad"].ToString();
                    rsReporteCotizacionesBroker.L_Corredor = rdr["Corredor"].ToString();
                    //rsReporteCotizacionesBroker.L_CodigoAgente = rdr["CodigoAgente"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["CodigoAgente"]);
                    //rsReporteCotizacionesBroker.M_Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    //rsReporteCotizacionesBroker.N_IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    lstReporteCotizacionesBroker.Add(rsReporteCotizacionesBroker);

                }
                rdr.Close();
                return lstReporteCotizacionesBroker;
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

        public static List<EBroReporteEmisiones> ReporteListarEmisionesBroker(string IdBroker, string estado)
        {
            List<EBroReporteEmisiones> lstReporteEmisionesBroker = new List<EBroReporteEmisiones>();
            EBroReporteEmisiones rsReporteEmisionesBroker;

            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("SET LANGUAGE Spanish; "
                + " SELECT * FROM ConsultaReporteEmisionesBroker "
                + " WHERE IdBroker = @broker "
                + " ORDER BY FechaCotizacion", getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(estado));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsReporteEmisionesBroker = new EBroReporteEmisiones();

                    rsReporteEmisionesBroker.A_Version = rdr["Broker"].ToString();
                    rsReporteEmisionesBroker.B_Empresa = rdr["Empresa"].ToString();
                    rsReporteEmisionesBroker.C_Codigo = rdr["Codigo"].ToString();
                    rsReporteEmisionesBroker.D_FechaCotizacion = rdr["FechaCotizacion"].ToString();
                    rsReporteEmisionesBroker.E_CotizacionYear = rdr["CotizacionYear"].ToString();
                    rsReporteEmisionesBroker.F_CotizacionMonth = rdr["CotizacionMonth"].ToString();
                    rsReporteEmisionesBroker.G_Usuario = rdr["Usuario"].ToString();
                    rsReporteEmisionesBroker.H_PrimaNeta = rdr["PrimaNeta"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNeta"]);
                    rsReporteEmisionesBroker.I_PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsReporteEmisionesBroker.J_Tipo = rdr["Tipo"].ToString();
                    rsReporteEmisionesBroker.K_Ciudad = rdr["Ciudad"].ToString();
                    rsReporteEmisionesBroker.L_FechaEmision = rdr["FechaEmision"].ToString();
                    rsReporteEmisionesBroker.M_EmisionYear = rdr["EmisionYear"].ToString();
                    rsReporteEmisionesBroker.N_EmisionMonth = rdr["EmisionMonth"].ToString();
                    rsReporteEmisionesBroker.O_Corredor = rdr["Corredor"].ToString();
                    //rsReporteEmisionesBroker.P_CodigoAgente = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);
                    //rsReporteEmisionesBroker.Q_Estado = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);
                    //rsReporteEmisionesBroker.R_IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    lstReporteEmisionesBroker.Add(rsReporteEmisionesBroker);

                }
                rdr.Close();
                return lstReporteEmisionesBroker;
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

        public static string ReporteCiudadBroker(string IdBroker)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT Usuario.Ciudad AS 'Ciudad', COUNT(Usuario.Ciudad) as 'Total' "
                + " FROM Usuario "
                + " INNER JOIN Usuario_Broker On Usuario_Broker.IdUsuario = Usuario.IdUsuario "
                + " INNER JOIN Broker ON Broker.IdBroker = Usuario_Broker.IdBroker "
                + " WHERE Broker.IdBroker = @broker GROUP BY Usuario.Ciudad "
                + " FOR JSON AUTO "
                , getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string ReporteListarCiudadesCotizacionesBroker(string IdBroker)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                " SELECT Usuario.Ciudad AS 'Ciudad', COUNT(Broker.IdBroker) AS 'Cantidad', "
                + " IsNull(SUM(Cotizacion.PrimaTotal), 0) AS 'Total' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker "
                + " INNER JOIN Usuario_Broker On Usuario_Broker.IdBroker = Broker.IdBroker "
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario "
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario "
                + " AND Cotizacion.Estado != 5 AND Broker.IdBroker = @broker"
                + " GROUP BY Usuario.Ciudad FOR JSON AUTO "
                , getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string ReporteListarCiudadesEmisionesBroker(string IdBroker)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT Usuario.Ciudad AS 'Ciudad', COUNT(Broker.IdBroker) AS 'Cantidad', "
                + " IsNull(SUM(Cotizacion.PrimaTotal), 0) AS 'Total' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker "
                + " INNER JOIN Usuario_Broker On Usuario_Broker.IdBroker = Broker.IdBroker "
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario "
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario "
                + " AND Cotizacion.Estado = 5 AND Broker.IdBroker = @broker"
                + " GROUP BY Usuario.Ciudad FOR JSON AUTO "
                , getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string ReporteCiudadBrokerCotizaciones(string IdBroker, string estado)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT Usuario.Ciudad AS 'Ciudad', COUNT(Cotizacion.IdCotizacion) AS 'Total' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker "
                + " INNER JOIN Usuario_Broker On Usuario_Broker.IdBroker = Broker.IdBroker "
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario "
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario AND Cotizacion.Estado != @estado AND Cotizacion.IdBroker = @broker "
                + " GROUP BY Ciudad "
                + "FOR JSON AUTO ", getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(estado));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string ReporteCiudadBrokerEmisiones(string IdBroker, string estado)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT Usuario.Ciudad AS 'Ciudad', COUNT(Cotizacion.IdCotizacion) AS 'Total' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker"
                + " INNER JOIN Usuario_Broker ON Usuario_Broker.IdBroker = Broker.IdBroker"
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario"
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario AND Cotizacion.Estado = @estado AND Cotizacion.IdBroker = @broker "
                + " GROUP BY Ciudad "
                + " FOR JSON AUTO ", getCnn());

                cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(IdBroker));
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(estado));

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string DetalleValoresCotizacionesBrokerCiudad(EBroReporteDetalleValoresBroker datos) 
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT " 
                + " (SELECT Broker.RazonSocial FROM Broker WHERE Cotizacion.IdBroker = Broker.IdBroker) AS 'Broker', "
                + " Usuario.Ciudad AS 'Ciudad', "
                + " COUNT(Broker.IdBroker) as 'Cantidad'," 
                + " IsNull(SUM(Cotizacion.PrimaNetaTotal),0) AS 'PrimaNeta', "
                + " IsNull(SUM(Cotizacion.PrimaTotal), 0) AS 'PrimaTotal' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker "
                + " INNER JOIN Usuario_Broker ON Usuario_Broker.IdBroker = Broker.IdBroker "
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario "
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario "
                + " AND Cotizacion.Estado != @estado AND Cotizacion.Estado != 1 "
                + " AND ( +"+ datos.Broker + " ) "
                + " AND  CONVERT(VARCHAR,Cotizacion.Fecha,23) BETWEEN @fechaInicio AND @fechaFin "
                + " GROUP BY Usuario.Ciudad, Cotizacion.IdBroker ORDER BY Broker "
                + " FOR JSON AUTO ", getCnn());

                //cmd.Parameters.AddWithValue("@broker", datos.Broker);
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(datos.Estado));
                cmd.Parameters.AddWithValue("@fechaInicio", datos.FechaInicio);
                cmd.Parameters.AddWithValue("@fechaFin", datos.FechaFin);
                
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();

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

        public static string DetalleValoresEmisionesBrokerCiudad(EBroReporteDetalleValoresBroker datos)
        {
            string resultado = "";
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(
                "   SELECT "
                + " (SELECT Broker.RazonSocial FROM Broker WHERE Cotizacion.IdBroker = Broker.IdBroker) AS 'Broker', "
                + " Usuario.Ciudad AS 'Ciudad', " 
                + " COUNT(Broker.IdBroker) as 'Cantidad', "
                + " IsNull(SUM(Cotizacion.PrimaNetaTotal),0) AS 'PrimaNeta', "
                + " IsNull(SUM(Cotizacion.PrimaTotal), 0) AS 'PrimaTotal' "
                + " FROM Cotizacion "
                + " INNER JOIN Broker ON Broker.IdBroker = Cotizacion.IdBroker "
                + " INNER JOIN Usuario_Broker ON Usuario_Broker.IdBroker = Broker.IdBroker "
                + " INNER JOIN Usuario ON Usuario.IdUsuario = Usuario_Broker.IdUsuario "
                + " WHERE Usuario.IdUsuario = Cotizacion.IdUsuario "
                + " AND Cotizacion.Estado = @estado "
                + " AND ( +" + datos.Broker + " ) "
                + " AND  CONVERT(VARCHAR, Cotizacion.Fecha, 23) BETWEEN @fechaInicio AND @fechaFin "
                + " GROUP BY Usuario.Ciudad, Cotizacion.IdBroker ORDER BY Broker "
                + " FOR JSON AUTO ", getCnn());

                //cmd.Parameters.AddWithValue("@broker", Convert.ToInt32(datos.Broker));
                cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(datos.Estado));
                cmd.Parameters.AddWithValue("@fechaInicio", datos.FechaInicio);
                cmd.Parameters.AddWithValue("@fechaFin", datos.FechaFin);



                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    resultado = rdr["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"].ToString();
                }
                rdr.Close();
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
