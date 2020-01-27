using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Administracion
{
    public class DAdmCredenciales : DAdmConexion
    {
        public static EAdmCatalogoCredenciales AdmConsultarCatalogoCredenciales(string identificador, string modo)
        {

            EAdmCatalogoCredenciales reCredenciales = new EAdmCatalogoCredenciales();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalago_Credenciales WHERE Catalago_Credenciales.Identificador = @identificador AND Catalago_Credenciales.Modo = @modo", getCnn());
                cmd.Parameters.AddWithValue("@identificador", identificador);
                cmd.Parameters.AddWithValue("@modo", modo);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    reCredenciales.IdCredenciales = Convert.ToInt32(rdr["IdCredenciales"]);
                    reCredenciales.Url = rdr["Url"].ToString();
                    reCredenciales.Llave = rdr["Llave"].ToString();
                    reCredenciales.UsuarioNombre = rdr["UsuarioNombre"].ToString();
                    reCredenciales.Contrasena = rdr["Contrasena"].ToString();
                    reCredenciales.Origen = rdr["Origen"].ToString();
                    reCredenciales.Usuario = rdr["Usuario"].ToString();
                    reCredenciales.Accion = rdr["Accion"].ToString();
                    reCredenciales.Identificador_ = rdr["Identificador"].ToString();
                    reCredenciales.Estado = Convert.ToInt32(rdr["Estado"]);
                    reCredenciales.Modo = rdr["Modo"].ToString();

                }
                rdr.Close();
                return reCredenciales;
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
