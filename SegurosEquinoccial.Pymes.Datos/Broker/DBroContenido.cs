using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroContenido : DAdmConexion
    {
        public static EBroContenido BroGestionContenido(EBroContenido pcontenido)
        {
            EBroContenido contenido = new EBroContenido();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionContenido", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idContenido", SqlDbType.Int);
                cmd.Parameters.Add("@lista", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@datosCotizador", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@datosGarantias", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@datosCondiciones", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@vistaEstado", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@vistaDiseno", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@vistaValores", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pcontenido.Identificador;

                cmd.Parameters["@idContenido"].Value = pcontenido.IdContenido;
                cmd.Parameters["@lista"].Value = pcontenido.Lista;
                cmd.Parameters["@datosCotizador"].Value = pcontenido.DatosCotizador;
                cmd.Parameters["@datosGarantias"].Value = pcontenido.DatosGarantias;
                cmd.Parameters["@datosCondiciones"].Value = pcontenido.DatosCondiciones;
                cmd.Parameters["@vistaEstado"].Value = pcontenido.VistaEstado;
                cmd.Parameters["@vistaDiseno"].Value = pcontenido.VistaDiseno;
                cmd.Parameters["@vistaValores"].Value = pcontenido.VistaValores;
                cmd.Parameters["@idCotizacion"].Value = pcontenido.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                contenido.IdContenido = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return contenido;

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

        public static EBroContenido BroConsultarContenidoGarantiasCondiciones(int IdContenido)
        {

            EBroContenido rsContenido = new EBroContenido();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT Contenido.DatosCondiciones, Contenido.DatosGarantias FROM Contenido WHERE Contenido.IdContenido = @IdContenido", getCnn());
                cmd.Parameters.AddWithValue("@IdContenido", IdContenido);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsContenido.DatosCondiciones = rdr["DatosCondiciones"].ToString();
                    rsContenido.DatosGarantias = rdr["DatosGarantias"].ToString();

                }
                rdr.Close();
                return rsContenido;
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
