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
    public class DBroContratante : DAdmConexion
    {

        public static EBroContratante BroGestionContratante(EBroContratante pContratante)
        {
            EBroContratante contratante = new EBroContratante();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionContratante", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idContratante", SqlDbType.Int);
                cmd.Parameters.Add("@cedula", SqlDbType.NVarChar);
                cmd.Parameters.Add("@nombre", SqlDbType.NVarChar);
                cmd.Parameters.Add("@primerApellido", SqlDbType.NVarChar);
                cmd.Parameters.Add("@segundoApellido", SqlDbType.NVarChar);
                cmd.Parameters.Add("@direccion", SqlDbType.NVarChar);
                cmd.Parameters.Add("@telefono", SqlDbType.NVarChar);
                cmd.Parameters.Add("@email", SqlDbType.NVarChar);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pContratante.Identificador;

                cmd.Parameters["@idContratante"].Value = pContratante.IdContratante;
                cmd.Parameters["@cedula"].Value = pContratante.Cedula;
                cmd.Parameters["@nombre"].Value = pContratante.Nombre;
                cmd.Parameters["@primerApellido"].Value = pContratante.PrimerApellido;
                cmd.Parameters["@segundoApellido"].Value = pContratante.SegundoApellido;
                cmd.Parameters["@direccion"].Value = pContratante.Direccion;
                cmd.Parameters["@telefono"].Value = pContratante.Telefono;
                cmd.Parameters["@email"].Value = pContratante.Email;
                cmd.Parameters["@idCotizacion"].Value = pContratante.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                contratante.IdContratante = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return contratante;

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

        public static EBroContratante BroConsultarContratante(string cedula, int idCotizacion)
        {

            EBroContratante rsContratante = new EBroContratante();
            EBroCotizacion rsCotizacion = new EBroCotizacion();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Contratante WHERE Contratante.Cedula = @cedula AND Contratante.IdCotizacion = @idCotizacion", getCnn());
                cmd.Parameters.AddWithValue("@cedula", cedula);
                cmd.Parameters.AddWithValue("@idCotizacion", idCotizacion);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsContratante.IdContratante = Convert.ToInt32(rdr["IdContratante"]);
                    rsContratante.Cedula = rdr["Cedula"].ToString();
                    rsContratante.Nombre = rdr["Nombre"].ToString();
                    rsContratante.PrimerApellido = rdr["PrimerApellido"].ToString();
                    rsContratante.SegundoApellido = rdr["SegundoApellido"].ToString();
                    rsContratante.Direccion = rdr["Direccion"].ToString();
                    rsContratante.Telefono = rdr["Telefono"].ToString();
                    rsContratante.Email = rdr["Email"].ToString();

                    rsCotizacion.IdCotizacion = Convert.ToInt32(rdr["IdCotizacion"]);
                    rsContratante.Cotizacion = rsCotizacion;


                }
                rdr.Close();
                return rsContratante;
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
