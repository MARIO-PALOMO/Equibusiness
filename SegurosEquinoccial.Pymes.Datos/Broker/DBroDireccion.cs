using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroDireccion : DAdmConexion
    {
        public static EBroDireccion BroGestionDireccion(EBroDireccion pdireccion)
        {
            EBroDireccion direccion = new EBroDireccion();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionDireccion", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idDireccion", SqlDbType.Int);
                cmd.Parameters.Add("@datosDireccion", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pdireccion.Identificador;

                cmd.Parameters["@idDireccion"].Value = pdireccion.IdDireccion;
                cmd.Parameters["@datosDireccion"].Value = pdireccion.DatosDireccion;
                cmd.Parameters["@idCotizacion"].Value = pdireccion.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                direccion.IdDireccion = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return direccion;

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
