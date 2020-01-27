using SegurosEquinoccial.Pymes.Datos.Gestion;
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
    public class DBroPagador : DAdmConexion
    {
        public static EBroPagador BroGestionPagador(EBroPagador pPagador)
        {
            EBroPagador pagador = new EBroPagador();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionPagador", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idPagador", SqlDbType.Int);
                cmd.Parameters.Add("@cedula", SqlDbType.NVarChar);
                cmd.Parameters.Add("@nombre", SqlDbType.NVarChar);
                cmd.Parameters.Add("@primerApellido", SqlDbType.NVarChar);
                cmd.Parameters.Add("@segundoApellido", SqlDbType.NVarChar);
                cmd.Parameters.Add("@direccion", SqlDbType.NVarChar);
                cmd.Parameters.Add("@telefono", SqlDbType.NVarChar);
                cmd.Parameters.Add("@email", SqlDbType.NVarChar);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pPagador.Identificador;

                cmd.Parameters["@idPagador"].Value = pPagador.IdPagador;
                cmd.Parameters["@cedula"].Value = pPagador.Cedula;
                cmd.Parameters["@nombre"].Value = pPagador.Nombre;
                cmd.Parameters["@primerApellido"].Value = pPagador.PrimerApellido;
                cmd.Parameters["@segundoApellido"].Value = pPagador.SegundoApellido;
                cmd.Parameters["@direccion"].Value = pPagador.Direccion;
                cmd.Parameters["@telefono"].Value = pPagador.Telefono;
                cmd.Parameters["@email"].Value = pPagador.Email;
                cmd.Parameters["@idCotizacion"].Value = pPagador.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                pagador.IdPagador = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return pagador;

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

        public static EBroPagador BroConsultarPagador(string cedula, int idCotizacion)
        {

            EBroPagador rsPagador = new EBroPagador();
            EBroCotizacion rsCotizacion = new EBroCotizacion();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Pagador WHERE Pagador.Cedula = @cedula AND Pagador.IdCotizacion = @idCotizacion", getCnn());
                cmd.Parameters.AddWithValue("@cedula", cedula);
                cmd.Parameters.AddWithValue("@idCotizacion", idCotizacion);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsPagador.IdPagador = Convert.ToInt32(rdr["IdPagador"]);
                    rsPagador.Cedula = rdr["Cedula"].ToString();
                    rsPagador.Nombre = rdr["Nombre"].ToString();
                    rsPagador.PrimerApellido = rdr["PrimerApellido"].ToString();
                    rsPagador.SegundoApellido = rdr["SegundoApellido"].ToString();

                    rsPagador.Direccion = rdr["Direccion"].ToString();
                    rsPagador.Telefono = rdr["Telefono"].ToString();
                    rsPagador.Email = rdr["Email"].ToString();

                    rsCotizacion.IdCotizacion = Convert.ToInt32(rdr["IdCotizacion"]);
                    rsPagador.Cotizacion = rsCotizacion;


                }
                rdr.Close();
                return rsPagador;
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
