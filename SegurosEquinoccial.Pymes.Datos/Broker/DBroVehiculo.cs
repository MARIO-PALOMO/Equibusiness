using Newtonsoft.Json;
using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroVehiculo : DAdmConexion
    {
        public static EBroVehiculo BroGestionVehiculo(EBroVehiculo pvehiculo)
        {
            EBroVehiculo vehiculo = new EBroVehiculo();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionVehiculo", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idVehiculos", SqlDbType.Int);
                cmd.Parameters.Add("@datosVehiculo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pvehiculo.Identificador;

                cmd.Parameters["@idVehiculos"].Value = pvehiculo.IdVehiculos;
                cmd.Parameters["@datosVehiculo"].Value = pvehiculo.DatosVehiculo;
                cmd.Parameters["@idCotizacion"].Value = pvehiculo.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                vehiculo.IdVehiculos = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return vehiculo;

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

        public static EBroCatalogoVehiculos BroGestionCatalogoVehiculo(EBroCatalogoVehiculos pvehiculo)
        {
            EBroCatalogoVehiculos vehiculo = new EBroCatalogoVehiculos();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCatalogoVehiculo", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@ANIO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@CAMPO_ULTIMA_ACTUALIZACION", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@CANTON", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@CHASIS", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@CILINDRAJE", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@CLASE", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@COLOR", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EDADAUTO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@FEC_CADUCIDAD_MATRICULA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@FEC_COMPRA_REGISTRO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@FEC_ULTIMA_MATRICULA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@MARCA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@MODELO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@MOTOR", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@NRO_CEDULA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@NRO_PASAJEROS", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@NRO_RAMV", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@NRO_RUC", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PAIS", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PLACA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PRECIOMAXIMO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PRECIOMINIMO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PRECIOPROMEDIO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@PRECIOVENTA", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@TIPO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@TIPOCOMBUSTIBLE", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@ULTIMA_ACTUALIZACION", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@USO", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_color", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_marca", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_modelo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_pais", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_submodelo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_tipo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_tipo_ant", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@cod_tipo_placa", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@dias_transcurridos", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@dias_vigencia", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@tipo_vh_x_ant", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@ANIO"].Value = pvehiculo.ANIO == null ? "" : pvehiculo.ANIO;
                cmd.Parameters["@CAMPO_ULTIMA_ACTUALIZACION"].Value = pvehiculo.CAMPO_ULTIMA_ACTUALIZACION == null ? "" : pvehiculo.CAMPO_ULTIMA_ACTUALIZACION;
                cmd.Parameters["@CANTON"].Value = pvehiculo.CANTON == null ? "" : pvehiculo.CANTON;
                cmd.Parameters["@CHASIS"].Value = pvehiculo.CHASIS == null ? "" : pvehiculo.CHASIS;
                cmd.Parameters["@CILINDRAJE"].Value = pvehiculo.CILINDRAJE == null ? "" : pvehiculo.CILINDRAJE;
                cmd.Parameters["@CLASE"].Value = pvehiculo.CLASE == null ? "" : pvehiculo.CLASE;
                cmd.Parameters["@COLOR"].Value = pvehiculo.COLOR == null ? "" : pvehiculo.COLOR;
                cmd.Parameters["@EDADAUTO"].Value = pvehiculo.EDADAUTO == null ? "" : pvehiculo.EDADAUTO;
                cmd.Parameters["@FEC_CADUCIDAD_MATRICULA"].Value = pvehiculo.FEC_CADUCIDAD_MATRICULA == null ? "" : pvehiculo.FEC_CADUCIDAD_MATRICULA;
                cmd.Parameters["@FEC_COMPRA_REGISTRO"].Value = pvehiculo.FEC_COMPRA_REGISTRO == null ? "" : pvehiculo.FEC_COMPRA_REGISTRO;
                cmd.Parameters["@FEC_ULTIMA_MATRICULA"].Value = pvehiculo.FEC_ULTIMA_MATRICULA == null ? "" : pvehiculo.FEC_ULTIMA_MATRICULA;
                cmd.Parameters["@MARCA"].Value = pvehiculo.MARCA == null ? "" : pvehiculo.MARCA;
                cmd.Parameters["@MODELO"].Value = pvehiculo.MODELO == null ? "" : pvehiculo.MODELO;
                cmd.Parameters["@MOTOR"].Value = pvehiculo.MOTOR == null ? "" : pvehiculo.MOTOR;
                cmd.Parameters["@NRO_CEDULA"].Value = pvehiculo.NRO_CEDULA == null ? "" : pvehiculo.NRO_CEDULA;
                cmd.Parameters["@NRO_PASAJEROS"].Value = pvehiculo.NRO_PASAJEROS == null ? "" : pvehiculo.NRO_PASAJEROS;
                cmd.Parameters["@NRO_RAMV"].Value = pvehiculo.NRO_RAMV == null ? "" : pvehiculo.NRO_RAMV;
                cmd.Parameters["@NRO_RUC"].Value = pvehiculo.NRO_RUC == null ? "" : pvehiculo.NRO_RUC;
                cmd.Parameters["@PAIS"].Value = pvehiculo.PAIS == null ? "" : pvehiculo.PAIS;
                cmd.Parameters["@PLACA"].Value = pvehiculo.PLACA == null ? "" : pvehiculo.PLACA;
                cmd.Parameters["@PRECIOMAXIMO"].Value = pvehiculo.PRECIOMAXIMO == null ? "" : pvehiculo.PRECIOMAXIMO;
                cmd.Parameters["@PRECIOMINIMO"].Value = pvehiculo.PRECIOMINIMO == null ? "" : pvehiculo.PRECIOMINIMO;
                cmd.Parameters["@PRECIOPROMEDIO"].Value = pvehiculo.PRECIOPROMEDIO == null ? "" : pvehiculo.PRECIOPROMEDIO;
                cmd.Parameters["@PRECIOVENTA"].Value = pvehiculo.PRECIOVENTA == null ? "" : pvehiculo.PRECIOVENTA;
                cmd.Parameters["@TIPO"].Value = pvehiculo.TIPO == null ? "" : pvehiculo.TIPO;
                cmd.Parameters["@TIPOCOMBUSTIBLE"].Value = pvehiculo.TIPOCOMBUSTIBLE == null ? "" : pvehiculo.TIPOCOMBUSTIBLE;
                cmd.Parameters["@ULTIMA_ACTUALIZACION"].Value = pvehiculo.ULTIMA_ACTUALIZACION == null ? "" : pvehiculo.ULTIMA_ACTUALIZACION;
                cmd.Parameters["@USO"].Value = pvehiculo.USO == null ? "" : pvehiculo.USO;
                cmd.Parameters["@cod_color"].Value = pvehiculo.cod_color == null ? "" : pvehiculo.cod_color;
                cmd.Parameters["@cod_marca"].Value = pvehiculo.cod_marca == null ? "" : pvehiculo.cod_marca;
                cmd.Parameters["@cod_modelo"].Value = pvehiculo.cod_modelo == null ? "" : pvehiculo.cod_modelo;
                cmd.Parameters["@cod_pais"].Value = pvehiculo.cod_pais == null ? "" : pvehiculo.cod_pais;
                cmd.Parameters["@cod_submodelo"].Value = pvehiculo.cod_submodelo == null ? "" : pvehiculo.cod_submodelo;
                cmd.Parameters["@cod_tipo"].Value = pvehiculo.cod_tipo == null ? "" : pvehiculo.cod_tipo;
                cmd.Parameters["@cod_tipo_ant"].Value = pvehiculo.cod_tipo_ant == null ? "" : pvehiculo.cod_tipo_ant;
                cmd.Parameters["@cod_tipo_placa"].Value = pvehiculo.cod_tipo_placa == null ? "" : pvehiculo.cod_tipo_placa;
                cmd.Parameters["@dias_transcurridos"].Value = pvehiculo.dias_transcurridos == null ? "" : pvehiculo.dias_transcurridos;
                cmd.Parameters["@dias_vigencia"].Value = pvehiculo.dias_vigencia == null ? "" : pvehiculo.dias_vigencia;
                cmd.Parameters["@tipo_vh_x_ant"].Value = pvehiculo.tipo_vh_x_ant == null ? "" : pvehiculo.tipo_vh_x_ant;

                cmd.ExecuteNonQuery();

                vehiculo.IdPlaca = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return vehiculo;

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

        public static async Task<string> BroObtenerVehiculosANT(string Placa_)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VEHICULOS", EGloGlobales.ambiente);

            string ServicioOCPKey = credenciales.Llave;
            string ServicioURL = credenciales.Url;

            var body = JsonConvert.SerializeObject(new
            {
                UserName = credenciales.UsuarioNombre,
                Password = credenciales.Contrasena,
                AppOrigen = credenciales.Origen,
                AppUsuario = credenciales.Usuario,
                Dui = "",
                Placa = Placa_
            });

            string resultado = await DAdmConexionREST.BroEjecutarSolicitudWebREST(ServicioURL, ServicioOCPKey, body);

            return resultado;
        }

        public static EBroCatalogoVehiculos BroObtenerVehiculosPYMES(string Placa_)
        {

            EBroCatalogoVehiculos rsVehiculo = new EBroCatalogoVehiculos();

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalago_Placas WHERE Catalago_Placas.PLACA = @Placa_", getCnn());
                cmd.Parameters.AddWithValue("@Placa_", Placa_);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsVehiculo.IdPlaca = rdr["IdPlaca"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdPlaca"]);
                    rsVehiculo.ANIO = rdr["ANIO"].ToString();
                    rsVehiculo.CAMPO_ULTIMA_ACTUALIZACION = rdr["CAMPO_ULTIMA_ACTUALIZACION"].ToString();
                    rsVehiculo.CANTON = rdr["CANTON"].ToString();
                    rsVehiculo.CHASIS = rdr["CHASIS"].ToString();
                    rsVehiculo.CILINDRAJE = rdr["CILINDRAJE"].ToString();
                    rsVehiculo.CLASE = rdr["CLASE"].ToString();
                    rsVehiculo.COLOR = rdr["COLOR"].ToString();
                    rsVehiculo.EDADAUTO = rdr["EDADAUTO"].ToString();
                    rsVehiculo.FEC_CADUCIDAD_MATRICULA = rdr["FEC_CADUCIDAD_MATRICULA"].ToString();
                    rsVehiculo.FEC_COMPRA_REGISTRO = rdr["FEC_COMPRA_REGISTRO"].ToString();
                    rsVehiculo.FEC_ULTIMA_MATRICULA = rdr["FEC_ULTIMA_MATRICULA"].ToString();
                    rsVehiculo.MARCA = rdr["MARCA"].ToString();
                    rsVehiculo.MODELO = rdr["MODELO"].ToString();
                    rsVehiculo.MOTOR = rdr["MOTOR"].ToString();
                    rsVehiculo.NRO_CEDULA = rdr["NRO_CEDULA"].ToString();
                    rsVehiculo.NRO_PASAJEROS = rdr["NRO_PASAJEROS"].ToString();
                    rsVehiculo.NRO_RAMV = rdr["NRO_RAMV"].ToString();
                    rsVehiculo.NRO_RUC = rdr["NRO_RUC"].ToString();
                    rsVehiculo.PAIS = rdr["PAIS"].ToString();
                    rsVehiculo.PLACA = rdr["PLACA"].ToString();
                    rsVehiculo.PRECIOMAXIMO = rdr["PRECIOMAXIMO"].ToString();
                    rsVehiculo.PRECIOMINIMO = rdr["PRECIOMINIMO"].ToString();
                    rsVehiculo.PRECIOPROMEDIO = rdr["PRECIOPROMEDIO"].ToString();
                    rsVehiculo.PRECIOVENTA = rdr["PRECIOVENTA"].ToString();
                    rsVehiculo.TIPO = rdr["TIPO"].ToString();
                    rsVehiculo.TIPOCOMBUSTIBLE = rdr["TIPOCOMBUSTIBLE"].ToString();
                    rsVehiculo.ULTIMA_ACTUALIZACION = rdr["ULTIMA_ACTUALIZACION"].ToString();
                    rsVehiculo.USO = rdr["USO"].ToString();
                    rsVehiculo.cod_color = rdr["cod_color"].ToString();
                    rsVehiculo.cod_marca = rdr["cod_marca"].ToString();
                    rsVehiculo.cod_modelo = rdr["cod_modelo"].ToString();
                    rsVehiculo.cod_pais = rdr["cod_pais"].ToString();
                    rsVehiculo.cod_submodelo = rdr["cod_submodelo"].ToString();
                    rsVehiculo.cod_tipo = rdr["cod_tipo"].ToString();
                    rsVehiculo.cod_tipo_ant = rdr["cod_tipo_ant"].ToString();
                    rsVehiculo.cod_tipo_placa = rdr["cod_tipo_placa"].ToString();
                    rsVehiculo.dias_transcurridos = rdr["dias_transcurridos"].ToString();
                    rsVehiculo.dias_vigencia = rdr["dias_vigencia"].ToString();
                    rsVehiculo.tipo_vh_x_ant = rdr["tipo_vh_x_ant"].ToString();

                }
                rdr.Close();
                return rsVehiculo;
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
