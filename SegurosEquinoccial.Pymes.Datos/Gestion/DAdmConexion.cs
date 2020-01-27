using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Datos.Gestion
{
    public class DAdmConexion
    {
        public static SqlConnection cnn;

        public static SqlConnection getCnn()
        {
            return cnn;
        }

        public static void Conectar()
        {
            EAdmCatalogoCredenciales credenciales = EGloGlobales.obtenerCredenciales();
            cnn = new SqlConnection("Data Source=" + credenciales.HostDB + ";Initial Catalog=" + credenciales.NameDB + ";User ID=" + credenciales.UserDB + ";Password=" + credenciales.PasswordDB + ";");
            cnn.Open();
        }

        public static void Cerrar()
        {
            if (cnn != null)
            {
                if (cnn.State == ConnectionState.Open)
                {
                    cnn.Close();
                }
            }
        }
    }
}
