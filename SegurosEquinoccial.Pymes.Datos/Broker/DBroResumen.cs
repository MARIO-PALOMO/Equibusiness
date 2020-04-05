using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
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
    public class DBroResumen : DAdmConexion
    {

        //CONSULTAS RESUMEN SUPERVISION

        public static List<EBroCotizacion> BroConsultarResumenCotizacionesUsuarios(EBroResumen pResumen)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            EAdmBroker rsBroker;
            EBroEmpresa rsEmpresa;
            EBroContenido rsContenido;
            EBroDireccion rsDireccion;
            EBroVehiculo rsVehiculos;
            EAdmUsuarios rsUsuario;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT IdCotizacion, Codigo, Fecha, IdUsuario, Usuario, IdPadre, UsuarioPadre, Ciudad, IdEmpresa, RazonSocial,Telefono,Antiguedad, IdDireccion, IdVehiculos, IdContenido, Estado, PrimaTotal, IdBroker, EstadoGarantia, EstadoCondiciones FROM ConsultaCotizacionEmpresaComplementos WHERE fecha BETWEEN @fechaInicio AND @fechaFin AND IdBroker = @broker AND (" + pResumen.Cadena + ")", getCnn());
                cmd.Parameters.AddWithValue("@fechaInicio", pResumen.FechaInicio);
                cmd.Parameters.AddWithValue("@fechaFin", pResumen.FechaFin);
                cmd.Parameters.AddWithValue("@broker", pResumen.IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();
                    rsBroker = new EAdmBroker();
                    rsEmpresa = new EBroEmpresa();
                    rsContenido = new EBroContenido();
                    rsDireccion = new EBroDireccion();
                    rsVehiculos = new EBroVehiculo();
                    rsUsuario = new EAdmUsuarios();

                    rsCotizacion.IdCotizacion = rdr["IdCotizacion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();

                    rsUsuario.Usuario = rdr["Usuario"].ToString();
                    rsUsuario.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuario.IdPadre = rdr["IdPadre"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdPadre"]);
                    rsUsuario.UsuarioPadre = rdr["UsuarioPadre"].ToString();

                    rsEmpresa.IdEmpresa = rdr["IdEmpresa"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();

                    rsBroker.IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    rsContenido.IdContenido = rdr["IdContenido"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.EstadoGarantias = rdr["EstadoGarantia"].ToString();
                    rsContenido.EstadoCondiciones = rdr["EstadoCondiciones"].ToString();

                    rsDireccion.IdDireccion = rdr["IdDireccion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdDireccion"]);

                    rsVehiculos.IdVehiculos = rdr["IdVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdVehiculos"]);

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;
                    rsCotizacion.Usuario = rsUsuario;

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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

        public static List<EBroCotizacion> BroConsultarResumenGlobalCotizacionesUsuarios(EBroResumen pResumen)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            EAdmBroker rsBroker;
            EBroEmpresa rsEmpresa;
            EBroContenido rsContenido;
            EBroDireccion rsDireccion;
            EBroVehiculo rsVehiculos;
            EAdmUsuarios rsUsuario;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT IdCotizacion, Codigo, Fecha, IdUsuario, Usuario, IdPadre, Ciudad, IdEmpresa, RazonSocial,Telefono,Antiguedad, IdDireccion, IdVehiculos, IdContenido, Estado, PrimaTotal, IdBroker, EstadoGarantia, EstadoCondiciones FROM ConsultaCotizacionEmpresaComplementos WHERE IdBroker = @broker AND (" + pResumen.Cadena + ")", getCnn());
                cmd.Parameters.AddWithValue("@broker", pResumen.IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();
                    rsBroker = new EAdmBroker();
                    rsEmpresa = new EBroEmpresa();
                    rsContenido = new EBroContenido();
                    rsDireccion = new EBroDireccion();
                    rsVehiculos = new EBroVehiculo();
                    rsUsuario = new EAdmUsuarios();

                    rsCotizacion.IdCotizacion = rdr["IdCotizacion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();

                    rsUsuario.Usuario = rdr["Usuario"].ToString();
                    rsUsuario.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuario.IdPadre = rdr["IdPadre"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdPadre"]); ;

                    rsEmpresa.IdEmpresa = rdr["IdEmpresa"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();

                    rsBroker.IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    rsContenido.IdContenido = rdr["IdContenido"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.EstadoGarantias = rdr["EstadoGarantia"].ToString();
                    rsContenido.EstadoCondiciones = rdr["EstadoCondiciones"].ToString();

                    rsDireccion.IdDireccion = rdr["IdDireccion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdDireccion"]);

                    rsVehiculos.IdVehiculos = rdr["IdVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdVehiculos"]);

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;
                    rsCotizacion.Usuario = rsUsuario;

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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

        public static List<EAdmUsuarios> BroConsultaUsuariosTotalCiudad(EBroResumen pResumen)
        {

            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaUsuariosTotalCiudad WHERE (" + pResumen.Cadena + ") AND IdBroker = @broker" , getCnn());
                cmd.Parameters.AddWithValue("@broker", pResumen.IdBroker);

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();
                    rsUsuarios.IdPadre = Convert.ToInt32(rdr["IdPadre"]);
                    rsUsuarios.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuarios.Total = Convert.ToInt32(rdr["Total"]);
                    lstUsuarios.Add(rsUsuarios);
                }
                rdr.Close();
                return lstUsuarios;
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

        public static List<EBroCotizacion> BroconsultarTotalCotizacionesOperador(EBroResumen pResumen)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT Cotizacion.IdUsuario, IIF(Cotizacion.Estado = 5, Sum(Cotizacion.PrimaTotal), 0) AS Total  FROM Cotizacion WHERE (" + pResumen.Cadena + ") GROUP BY Cotizacion.IdUsuario, Cotizacion.Estado", getCnn());

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();

                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.PrimaTotal = rdr["Total"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Total"]);

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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

        public static List<EBroCotizacion> BroconsultarParametrosTotalCotizacionesOperador(EBroResumen pResumen)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT Cotizacion.IdUsuario, IIF(Cotizacion.Estado = 5, Sum(Cotizacion.PrimaTotal), 0) AS Total  FROM Cotizacion WHERE Fecha BETWEEN @fechaInicio AND @fechaFin AND (" + pResumen.Cadena + ") GROUP BY Cotizacion.IdUsuario, Cotizacion.Estado", getCnn());
                cmd.Parameters.AddWithValue("@fechaInicio", pResumen.FechaInicio);
                cmd.Parameters.AddWithValue("@fechaFin", pResumen.FechaFin);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();

                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.PrimaTotal = rdr["Total"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Total"]);

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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
