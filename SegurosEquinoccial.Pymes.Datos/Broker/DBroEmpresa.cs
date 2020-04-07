using Newtonsoft.Json;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Xml;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroEmpresa : DAdmConexion
    {
        public static EBroEmpresa BroGestionEmpresa(EBroEmpresa pEmpresa)
        {
            EBroEmpresa empresa = new EBroEmpresa();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionEmpresa", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idEmpresa", SqlDbType.Int);
                cmd.Parameters.Add("@idCatalogoEmpresa", SqlDbType.Int);
                cmd.Parameters.Add("@telefono", SqlDbType.NVarChar);
                cmd.Parameters.Add("@email", SqlDbType.NVarChar);
                cmd.Parameters.Add("@codigo", SqlDbType.Int);
                cmd.Parameters.Add("@riesgo", SqlDbType.Int);
                cmd.Parameters.Add("@ruc", SqlDbType.NVarChar);
                cmd.Parameters.Add("@razonSocial", SqlDbType.NVarChar);
                cmd.Parameters.Add("@giroNegocio", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@sectorEconomico", SqlDbType.NVarChar);
                cmd.Parameters.Add("@siniestralidad", SqlDbType.NVarChar);
                cmd.Parameters.Add("@codigoAsegurado", SqlDbType.NVarChar);
                cmd.Parameters.Add("@direccion", SqlDbType.NVarChar);
                cmd.Parameters.Add("@nombre", SqlDbType.NVarChar);
                cmd.Parameters.Add("@primerApellido", SqlDbType.NVarChar);
                cmd.Parameters.Add("@segundoApellido", SqlDbType.NVarChar);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pEmpresa.Identificador;

                cmd.Parameters["@idEmpresa"].Value = pEmpresa.IdEmpresa;
                cmd.Parameters["@idCatalogoEmpresa"].Value = pEmpresa.IdCatalogoEmpresa;
                cmd.Parameters["@telefono"].Value = pEmpresa.Telefono;
                cmd.Parameters["@email"].Value = pEmpresa.Email;
                cmd.Parameters["@codigo"].Value = pEmpresa.Codigo;
                cmd.Parameters["@riesgo"].Value = pEmpresa.Riesgo;
                cmd.Parameters["@ruc"].Value = pEmpresa.Ruc;
                cmd.Parameters["@razonSocial"].Value = pEmpresa.RazonSocial;
                cmd.Parameters["@giroNegocio"].Value = pEmpresa.GiroNegocio;
                cmd.Parameters["@sectorEconomico"].Value = pEmpresa.SectorEconomico;
                cmd.Parameters["@siniestralidad"].Value = pEmpresa.Siniestralidad;
                cmd.Parameters["@codigoAsegurado"].Value = pEmpresa.CodigoAsegurado;
                cmd.Parameters["@direccion"].Value = pEmpresa.Direccion;
                cmd.Parameters["@nombre"].Value = pEmpresa.Nombre;
                cmd.Parameters["@primerApellido"].Value = pEmpresa.PrimerApellido;
                cmd.Parameters["@segundoApellido"].Value = pEmpresa.SegundoApellido;


                cmd.ExecuteNonQuery();

                empresa.IdEmpresa = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return empresa;

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

        public static List<EBroCotizacion> BroConsultaEmpresa(int cotizacion, int broker, int empresa)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            EAdmBroker rsBroker;
            EBroEmpresa rsEmpresa;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaEmpresa WHERE IdCotizacion = @cotizacion AND IdBroker = @broker AND IdEmpresa = @empresa", getCnn());
                cmd.Parameters.AddWithValue("@cotizacion", cotizacion);
                cmd.Parameters.AddWithValue("@broker", broker);
                cmd.Parameters.AddWithValue("@empresa", empresa);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();
                    rsBroker = new EAdmBroker();
                    rsEmpresa = new EBroEmpresa();

                    rsEmpresa.IdEmpresa = Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();
                    rsEmpresa.Email = rdr["Email"].ToString();
                    rsEmpresa.GiroNegocio = rdr["GiroNegocio"].ToString();
                    rsEmpresa.Codigo = rdr["Codigo"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Codigo"]);
                    rsEmpresa.Riesgo = Convert.ToInt32(rdr["Riesgo"]);
                    rsEmpresa.SectorEconomico = rdr["SectorEconomico"].ToString();
                    rsEmpresa.Siniestralidad = rdr["Siniestralidad"].ToString();
                    rsEmpresa.CodigoAsegurado = rdr["CodigoAsegurado"].ToString();
                    rsEmpresa.Direccion = rdr["Direccion"].ToString();
                    rsEmpresa.Nombre = rdr["Nombre"].ToString();
                    rsEmpresa.PrimerApellido = rdr["PrimerApellido"].ToString();
                    rsEmpresa.SegundoApellido = rdr["SegundoApellido"].ToString();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);
                    rsCotizacion.IdCotizacion = Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.Corredor = rdr["Corredor"].ToString();
                    rsCotizacion.Codigo = rdr["CodigoCotizacion"].ToString();
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;

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

        public static EBroEmpresa BroConsultarEmpresaPymes(string ruc)
        {

            EBroEmpresa rsEmpresa = new EBroEmpresa();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Empresa WHERE Empresa.Ruc = @ruc", getCnn());
                cmd.Parameters.AddWithValue("@ruc", ruc);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsEmpresa.IdEmpresa = Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();
                    rsEmpresa.Email = rdr["Email"].ToString();
                    rsEmpresa.GiroNegocio = rdr["GiroNegocio"].ToString();
                    rsEmpresa.SectorEconomico = rdr["SectorEconomico"].ToString();
                    rsEmpresa.Siniestralidad = rdr["Siniestralidad"].ToString();
                    rsEmpresa.CodigoAsegurado = rdr["CodigoAsegurado"].ToString();
                    rsEmpresa.Direccion = rdr["Direccion"].ToString();
                    rsEmpresa.Nombre = rdr["Nombre"].ToString();
                    rsEmpresa.PrimerApellido = rdr["PrimerApellido"].ToString();
                    rsEmpresa.SegundoApellido = rdr["SegundoApellido"].ToString();

                }
                rdr.Close();
                return rsEmpresa;
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

        public static EBroCotizacion BroValidarEmpresaCotizacion(string ruc)
        {

            EBroEmpresa rsEmpresa = new EBroEmpresa();
            EAdmBroker rsBroker = new EAdmBroker();
            EBroCotizacion rsCotizacion = new EBroCotizacion();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaValidarEmpresaCotizacion WHERE Ruc = @ruc", getCnn());
                cmd.Parameters.AddWithValue("@ruc", ruc);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();
                    rsCotizacion.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                }
                rdr.Close();
                return rsCotizacion;
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

        public static List<EBroCotizacion> BroReValidarEmpresaCotizacion(string ruc)
        {
            List<EBroCotizacion> lstDatos = new List<EBroCotizacion>();
            EBroEmpresa rsEmpresa;
            EAdmBroker rsBroker;
            EBroCotizacion rsCotizacion;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaValidarEmpresaCotizacion WHERE Ruc = @ruc", getCnn());
                cmd.Parameters.AddWithValue("@ruc", ruc);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsEmpresa = new EBroEmpresa();
                    rsBroker = new EAdmBroker();
                    rsCotizacion = new EBroCotizacion();

                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();
                    rsCotizacion.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;

                    lstDatos.Add(rsCotizacion);
                }
                rdr.Close();
                return lstDatos;
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

        public static string BroConsultaEmpresaServicio(string ruc)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("EMPRESAS", EGloGlobales.ambiente);

            string ServicioOrigen = credenciales.Origen;
            string ServicioUsuario = credenciales.Usuario;
            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Body =
                "<ConsultarDatosPersonaAval xmlns=\"http://tempuri.org/\">" +
                    "<ruc>" + ruc + "</ruc>" +
                    "<app_origen>" + ServicioOrigen + "</app_origen>" +
                    "<app_usuario>" + ServicioUsuario + "</app_usuario>" +
                "</ConsultarDatosPersonaAval>";

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }


        public static async Task<string> BroConsultarEmpresaPersonaServicio(string documento)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("BUSCARRUCCEDULAS", EGloGlobales.ambiente);

            string Url = credenciales.Url;
            string Key = credenciales.Contrasena;

            var body = JsonConvert.SerializeObject(new
            {
                NroDocumento = documento
            });

            string resultado = await DAdmConexionREST.BroEjecutarSolicitudWebREST(Url, Key, body);

            return resultado;
        }

        public static async Task<string> BroActualizarEmpresaPersonaServicio(EAuxiliares datos)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("ACTUALIZARRUCCEDULAS", EGloGlobales.ambiente);

            string Url = credenciales.Url;
            string Key = credenciales.Contrasena;


            var body = JsonConvert.SerializeObject(new
            {
                CodUsuario = datos.CodUsuario,
                CodTipoAgente = datos.CodTipoAgente,
                CodAgente = datos.CodAgente,
                Origen = datos.Origen,
                CodProvincia = datos.CodProvincia,
                CodCiudad = datos.CodCiudad,
                Direccion = datos.Direccion,
                FechaNacimiento = datos.FechaNacimiento,
                Genero = datos.Genero,
                Estado = datos.Estado,
                DireccionGeo1 = datos.DireccionGeo1,
                DireccionGeo2 = datos.DireccionGeo2,
                DireccionGeo3 = datos.DireccionGeo3,
                FechaExpedicionPasaporte = datos.FechaExpedicionPasaporte,
                FechaVencimientoPasaporte = datos.FechaVencimientoPasaporte,
                FechaIngresoPais = datos.FechaIngresoPais,
                TipoDocumento = datos.TipoDocumento,
                NroDocumento = datos.NroDocumento,
                Nombre = datos.Nombre,
                PrimerApellido = datos.PrimerApellido,
                SegundoApellido = datos.SegundoApellido,
                CodPaisOrigen = datos.CodPaisOrigen,
                EstadoCivil = datos.EstadoCivil,
                EMail = datos.EMail,
                EMailFactElectronica = datos.EMailFactElectronica,
                TelefonoConvencional = datos.TelefonoConvencional,
                TelefonoCelular = datos.TelefonoCelular,
                CodigoAsegurado = datos.CodigoAsegurado,
                CodEstadoMigratorio = datos.CodEstadoMigratorio,
                CodOcupacionF = datos.CodOcupacionF,
                CodActividadEconomJ = datos.CodActividadEconomJ
            });

            string resultado = await DAdmConexionREST.BroEjecutarSolicitudWebREST(Url, Key, body);

            return resultado;
        }
    }
}
