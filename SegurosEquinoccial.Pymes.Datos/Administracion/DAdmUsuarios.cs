using System;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Datos.Administracion
{
    public class DAdmUsuarios : DAdmConexion
    {
        public static EAdmUsuarios BroGestionUsuario(EAdmUsuarios pusuario)
        {
            EAdmUsuarios usuario = new EAdmUsuarios();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionUsuario", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                cmd.Parameters.Add("@usuario", SqlDbType.NVarChar);
                cmd.Parameters.Add("@email", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@contrasena", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@estado", SqlDbType.Int);
                cmd.Parameters.Add("@rol", SqlDbType.Int);
                cmd.Parameters.Add("@foto", SqlDbType.Xml);
                cmd.Parameters.Add("@broker", SqlDbType.Int);
                cmd.Parameters.Add("@idPadre", SqlDbType.Int);
                cmd.Parameters.Add("@ciudad", SqlDbType.NVarChar);
                cmd.Parameters.Add("@tipoAgente", SqlDbType.NVarChar);
                cmd.Parameters.Add("@agente", SqlDbType.NVarChar);
                cmd.Parameters.Add("@puntoVenta", SqlDbType.NVarChar);
                cmd.Parameters.Add("@sucursal", SqlDbType.NVarChar);
                cmd.Parameters.Add("@comision", SqlDbType.NVarChar);
                cmd.Parameters.Add("@corredores", SqlDbType.NVarChar);
                cmd.Parameters.Add("@cedula", SqlDbType.NVarChar);
                cmd.Parameters.Add("@idUsuarioBroker", SqlDbType.Int);


                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pusuario.Identificador;

                cmd.Parameters["@idUsuario"].Value = pusuario.IdUsuario;
                cmd.Parameters["@usuario"].Value = pusuario.Usuario.Trim().ToUpper();
                cmd.Parameters["@email"].Value = pusuario.Email;
                cmd.Parameters["@contrasena"].Value = DAdmEncriptacion.encriptacion(pusuario.Contrasena);
                cmd.Parameters["@estado"].Value = pusuario.Estado;
                cmd.Parameters["@rol"].Value = pusuario.rol.IdRol;
                cmd.Parameters["@foto"].Value = pusuario.Foto;
                cmd.Parameters["@broker"].Value = pusuario.broker.IdBroker;
                cmd.Parameters["@idPadre"].Value = pusuario.IdPadre;
                cmd.Parameters["@ciudad"].Value = pusuario.Ciudad.Trim().ToUpper();
                cmd.Parameters["@tipoAgente"].Value = pusuario.CodigoTipoAgente;
                cmd.Parameters["@agente"].Value = pusuario.CodigoAgente;
                cmd.Parameters["@puntoVenta"].Value = pusuario.CodigoPuntoVenta;
                cmd.Parameters["@sucursal"].Value = pusuario.CodigoSucursal;
                cmd.Parameters["@comision"].Value = pusuario.Comision;
                cmd.Parameters["@corredores"].Value = pusuario.Corredores;
                cmd.Parameters["@cedula"].Value = pusuario.Cedula;
                cmd.Parameters["@idUsuarioBroker"].Value = pusuario.IdUsuarioBroker;

                cmd.ExecuteNonQuery();

                usuario.IdUsuario = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return usuario;

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

        //VERIFICACIÓN USUARIO
        public static List<EAdmUsuarios> AdmVerificacionUsuario(EAdmUsuarios usuario)
        {
            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuario;
            EAdmRol rsRol;
            EAdmBroker rsBroker;

            string contrasena = DAdmEncriptacion.encriptacion(usuario.Contrasena);
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("GestionSesion", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@email", SqlDbType.NVarChar, 50);
                cmd.Parameters.Add("@contrasena", SqlDbType.NVarChar, -1);

                cmd.Parameters["@email"].Value = usuario.Email;
                cmd.Parameters["@contrasena"].Value = contrasena;

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuario = new EAdmUsuarios();
                    rsBroker = new EAdmBroker();
                    rsRol = new EAdmRol();

                    rsUsuario.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuario.Usuario = rdr["Usuario"].ToString();
                    rsUsuario.Email = rdr["Email"].ToString();
                    rsUsuario.Uid = DAdmEncriptacion.CrearKeyAutorizacion(rdr["IdUsuario"].ToString());
                    rsUsuario.IdPadre = Convert.ToInt32(rdr["IdPadre"]);
                    rsUsuario.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuario.EstadoSesion = Convert.ToInt32(rdr["EstadoSesion"]);
                    rsUsuario.CodigoTipoAgente = rdr["CodigoTipoAgente"].ToString();
                    rsUsuario.CodigoAgente = rdr["CodigoAgente"].ToString();
                    rsUsuario.CodigoSucursal = rdr["CodigoSucursal"].ToString();
                    rsUsuario.CodigoPuntoVenta = rdr["CodigoPuntoVenta"].ToString();
                    rsUsuario.Comision = rdr["Comision"].ToString();
                    rsUsuario.Corredores = rdr["Corredores"].ToString();
                    rsUsuario.Estado = Convert.ToInt32(rdr["Estado"]);
                    rsUsuario.Foto = rdr["FotoUsuario"].ToString();
                    rsUsuario.Cedula = rdr["Cedula"].ToString();
                    rsUsuario.NombreCorredor = rdr["NombreCorredor"].ToString();
                    rsUsuario.IdUsuarioBroker = Convert.ToInt32(rdr["IdUsuario_Broker"]);
                    rsUsuario.IdUsuarioRol = Convert.ToInt32(rdr["IdUsuario_Rol"]);


                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);
                    rsBroker.Foto = rdr["FotoBroker"].ToString();
                    rsBroker.Color = rdr["Color"].ToString();
                    rsBroker.Provincias = Convert.ToInt32(rdr["Provincias"]);
                    rsBroker.Riesgo = Convert.ToInt32(rdr["Riesgo"]);
                    rsBroker.MultiRiesgo = Convert.ToInt32(rdr["MultiRiesgo"]);
                    rsBroker.Primas = Convert.ToInt32(rdr["Primas"]);
                    rsBroker.RazonSocial = rdr["RazonSocial"].ToString();
                    rsBroker.Pago = Convert.ToInt32(rdr["Pago"]);
                    rsBroker.Comision = rdr["ComisionBroker"].ToString();
                    rsBroker.Transporte = rdr["Transporte"].ToString();

                    rsRol.Nombre = rdr["Rol"].ToString();
                    rsRol.IdRol = Convert.ToInt32(rdr["IdRol"]);

                    rsUsuario.rol = rsRol;
                    rsUsuario.broker = rsBroker;

                    lstUsuarios.Add(rsUsuario);
                }
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

        public static List<EAdmUsuarios> ConsultaUsuarios() 
        {
            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT IdUsuario, UPPER(LTRIM(RTRIM(Usuario))) AS 'Usuario', LTRIM(RTRIM(Email)) AS 'Email'," 
                    + " Contrasena, Estado, Foto, Cedula FROM Usuario ORDER BY IdUsuario DESC", getCnn());

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();

                    rsUsuarios.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuarios.Usuario = rdr["Usuario"].ToString();
                    rsUsuarios.Email = rdr["Email"].ToString();
                    rsUsuarios.Contrasena = rdr["Contrasena"].ToString();
                    rsUsuarios.Estado = Convert.ToInt32(rdr["Estado"].ToString());
                    rsUsuarios.Foto = rdr["Foto"].ToString();
                    rsUsuarios.Cedula = rdr["Cedula"].ToString();
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

        public static List<EAdmUsuarios> BroListarUsuarios(string IdUsuario)
        {
            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            EAdmBroker rsBroker;
            EAdmRol rsRol;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaUsuariosCompleto WHERE IdUsuario = @IdUsuario", getCnn());
                cmd.Parameters.AddWithValue("@IdUsuario", Convert.ToInt32(IdUsuario));
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();
                    rsBroker = new EAdmBroker();
                    rsRol = new EAdmRol();

                    rsUsuarios.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuarios.Usuario = rdr["Usuario"].ToString();
                    rsUsuarios.Email = rdr["Email"].ToString();
                    rsUsuarios.Contrasena = rdr["Contrasena"].ToString();
                    rsUsuarios.Estado = Convert.ToInt32(rdr["Estado"].ToString());
                    rsUsuarios.Foto = rdr["FotoUsuario"].ToString();
                    rsUsuarios.IdPadre = Convert.ToInt32(rdr["IdPadre"]);
                    rsUsuarios.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuarios.EstadoSesion = Convert.ToInt32(rdr["EstadoSesion"].ToString());
                    rsUsuarios.CodigoTipoAgente = rdr["CodigoTipoAgente"].ToString();
                    rsUsuarios.CodigoAgente = rdr["CodigoAgente"].ToString();
                    rsUsuarios.CodigoSucursal = rdr["CodigoSucursal"].ToString();
                    rsUsuarios.CodigoPuntoVenta = rdr["CodigoPuntoVenta"].ToString();
                    rsUsuarios.Comision = rdr["Comision"].ToString();
                    rsUsuarios.Corredores = rdr["Corredores"].ToString();
                    rsUsuarios.NombreCorredor = rdr["NombreCorredor"].ToString();
                    rsUsuarios.Cedula = rdr["Cedula"].ToString();
                    rsUsuarios.IdUsuarioBroker = Convert.ToInt32(rdr["IdUsuario_Broker"]);
                    rsUsuarios.IdUsuarioRol = Convert.ToInt32(rdr["IdUsuario_Rol"]);

                    rsRol.IdRol = Convert.ToInt32(rdr["IdRol"].ToString());
                    rsRol.Nombre = rdr["Nombre"].ToString();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"].ToString());
                    rsBroker.RazonSocial = rdr["RazonSocial"].ToString();
                    rsBroker.Foto = rdr["FotoBroker"].ToString();
                    rsBroker.Color = rdr["Color"].ToString();

                    rsUsuarios.broker = rsBroker;
                    rsUsuarios.rol = rsRol;



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

        public static List<EAdmUsuarios> BroListarUsuariosBroker(string IdBroker)
        {
            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            EAdmBroker rsBroker;
            EAdmRol rsRol;
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaUsuariosCompleto WHERE IdBroker = @IdBroker AND (IdRol = 3 OR IdRol = 4)", getCnn());
                cmd.Parameters.AddWithValue("@IdBroker", Convert.ToInt32(IdBroker));
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();
                    rsBroker = new EAdmBroker();
                    rsRol = new EAdmRol();

                    rsUsuarios.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuarios.Usuario = rdr["Usuario"].ToString();
                    rsUsuarios.Email = rdr["Email"].ToString();
                    rsUsuarios.Contrasena = rdr["Contrasena"].ToString();
                    rsUsuarios.Estado = Convert.ToInt32(rdr["Estado"].ToString());
                    rsUsuarios.Foto = rdr["FotoUsuario"].ToString();
                    rsUsuarios.IdPadre = Convert.ToInt32(rdr["IdPadre"]);
                    rsUsuarios.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuarios.EstadoSesion = Convert.ToInt32(rdr["EstadoSesion"].ToString());
                    rsUsuarios.CodigoTipoAgente = rdr["CodigoTipoAgente"].ToString();
                    rsUsuarios.CodigoAgente = rdr["CodigoAgente"].ToString();
                    rsUsuarios.CodigoSucursal = rdr["CodigoSucursal"].ToString();
                    rsUsuarios.CodigoPuntoVenta = rdr["CodigoPuntoVenta"].ToString();
                    rsUsuarios.Comision = rdr["Comision"].ToString();
                    rsUsuarios.Corredores = rdr["Corredores"].ToString();
                    rsUsuarios.NombreCorredor = rdr["NombreCorredor"].ToString();
                    rsUsuarios.Cedula = rdr["Cedula"].ToString();
                    rsUsuarios.IdUsuarioBroker = Convert.ToInt32(rdr["IdUsuario_Broker"]);
                    rsUsuarios.IdUsuarioRol = Convert.ToInt32(rdr["IdUsuario_Rol"]);

                    rsRol.IdRol = Convert.ToInt32(rdr["IdRol"].ToString());
                    rsRol.Nombre = rdr["Nombre"].ToString();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"].ToString());
                    rsBroker.RazonSocial = rdr["RazonSocial"].ToString();
                    rsBroker.Foto = rdr["FotoBroker"].ToString();
                    rsBroker.Color = rdr["Color"].ToString();

                    rsUsuarios.broker = rsBroker;
                    rsUsuarios.rol = rsRol;
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

        public static List<EAdmUsuarios> BroConsultarUsuariosDependientes(int idPadre, int IdBroker, int IdRol)
        {

            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaUsuariosDependientesBroker " 
                    + " WHERE IdPadre = @idPadre AND IdBroker = @broker AND IdRol = @rol ORDER BY IdBroker, IdRol", getCnn());
                
                cmd.Parameters.AddWithValue("@idPadre", idPadre);
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                cmd.Parameters.AddWithValue("@rol", IdRol);

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();
                    rsUsuarios.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuarios.Usuario = rdr["Usuario"].ToString();
                    rsUsuarios.Foto = rdr["Foto"].ToString();
                    rsUsuarios.Ciudad = rdr["Ciudad"].ToString();
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

        public static List<EAdmUsuarios> BroConsultarUsuariosDependientesOperadores(EBroResumen pResumen)
        {

            List<EAdmUsuarios> lstUsuarios = new List<EAdmUsuarios>();
            EAdmUsuarios rsUsuarios;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaUsuariosDependientesBroker "
                    + " WHERE(" + pResumen.Cadena + ") " 
                    + " AND IdBroker = @broker AND IdRol = @rol ", getCnn());

                cmd.Parameters.AddWithValue("@broker", pResumen.IdBroker);
                cmd.Parameters.AddWithValue("@rol", pResumen.IdRol);


                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsUsuarios = new EAdmUsuarios();
                    rsUsuarios.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsUsuarios.Usuario = rdr["Usuario"].ToString();
                    rsUsuarios.Foto = rdr["Foto"].ToString();
                    rsUsuarios.Ciudad = rdr["Ciudad"].ToString();
                    rsUsuarios.IdPadre = Convert.ToInt32(rdr["IdPadre"]);

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

    }
}