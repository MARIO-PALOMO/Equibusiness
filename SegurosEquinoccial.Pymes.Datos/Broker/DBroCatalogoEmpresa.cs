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
    public class DBroCatalogoEmpresa : DAdmConexion
    {

        public static EBroCatalogoEmpresa BroGestionCatalogoEmpresa(EBroCatalogoEmpresa pEmpresa)
        {
            EBroCatalogoEmpresa empresa = new EBroCatalogoEmpresa();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCatalogoEmpresa", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@NRO_RUC", SqlDbType.NVarChar);
                cmd.Parameters.Add("@RAZON_SOCIAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_COMERCIAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_COMPLETO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@ACTIVIDAD_ECONOMICA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_CONSTITUCION", SqlDbType.NVarChar);
                cmd.Parameters.Add("@RESIDENCIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CALLES", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CALLES_DOMICILIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_DOMICILIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@PROVINCIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CANTON", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CIUDAD", SqlDbType.NVarChar);
                cmd.Parameters.Add("@PARROQUIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@BARRIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CAPITAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_EMPLEADOS", SqlDbType.NVarChar);
                cmd.Parameters.Add("@TELEFONO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@EMAIL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@ACTIVIDAD_ECONOMICA_N6", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@ESTADO_LEGAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@TIPO_COMPANIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@INTENDENCIA_CONTROL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@OBJETO_SOCIAL", SqlDbType.NVarChar, -1);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;


                cmd.Parameters["@NRO_RUC"].Value = pEmpresa.NRO_RUC;
                cmd.Parameters["@RAZON_SOCIAL"].Value = pEmpresa.RAZON_SOCIAL;
                cmd.Parameters["@NOMBRE_COMERCIAL"].Value = pEmpresa.NOMBRE_COMERCIAL;
                cmd.Parameters["@NOMBRE_COMPLETO"].Value = pEmpresa.NOMBRE_COMPLETO;
                cmd.Parameters["@ACTIVIDAD_ECONOMICA"].Value = pEmpresa.ACTIVIDAD_ECONOMICA;
                cmd.Parameters["@FECHA_CONSTITUCION"].Value = pEmpresa.FECHA_CONSTITUCION;
                cmd.Parameters["@RESIDENCIA"].Value = pEmpresa.RESIDENCIA;
                cmd.Parameters["@CALLES"].Value = pEmpresa.CALLES;
                cmd.Parameters["@CALLES_DOMICILIO"].Value = pEmpresa.CALLES_DOMICILIO;
                cmd.Parameters["@NRO_DOMICILIO"].Value = pEmpresa.NRO_DOMICILIO;
                cmd.Parameters["@PROVINCIA"].Value = pEmpresa.PROVINCIA;
                cmd.Parameters["@CANTON"].Value = pEmpresa.CANTON;
                cmd.Parameters["@CIUDAD"].Value = pEmpresa.CIUDAD;
                cmd.Parameters["@PARROQUIA"].Value = pEmpresa.PARROQUIA;
                cmd.Parameters["@BARRIO"].Value = pEmpresa.BARRIO;
                cmd.Parameters["@CAPITAL"].Value = pEmpresa.CAPITAL;
                cmd.Parameters["@NRO_EMPLEADOS"].Value = pEmpresa.NRO_EMPLEADOS;
                cmd.Parameters["@TELEFONO"].Value = pEmpresa.TELEFONO;
                cmd.Parameters["@EMAIL"].Value = pEmpresa.EMAIL;
                cmd.Parameters["@ACTIVIDAD_ECONOMICA_N6"].Value = pEmpresa.ACTIVIDAD_ECONOMICA_N6;
                cmd.Parameters["@ESTADO_LEGAL"].Value = pEmpresa.ESTADO_LEGAL;
                cmd.Parameters["@TIPO_COMPANIA"].Value = pEmpresa.TIPO_COMPANIA;
                cmd.Parameters["@INTENDENCIA_CONTROL"].Value = pEmpresa.INTENDENCIA_CONTROL;
                cmd.Parameters["@OBJETO_SOCIAL"].Value = pEmpresa.OBJETO_SOCIAL;

                cmd.ExecuteNonQuery();

                empresa.IdCatalogoEmpresas = Convert.ToInt32(cmd.Parameters["@valor"].Value);

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

        public static int BroActualziarDatosCatalogoEmpresa(EBroCatalogoEmpresa empresa)
        {
            int datos = 0;
            try
            {

                Conectar();
                SqlCommand cmd = new SqlCommand("UPDATE[Catalogo_Empresas] SET [CALLES_DOMICILIO] = @domicilio, [TELEFONO] = @telefono, [EMAIL] = @email WHERE [NRO_RUC] = @documento", getCnn());
                cmd.Parameters.AddWithValue("@domicilio", empresa.CALLES_DOMICILIO);
                cmd.Parameters.AddWithValue("@telefono", empresa.TELEFONO);
                cmd.Parameters.AddWithValue("@email", empresa.EMAIL);
                cmd.Parameters.AddWithValue("@documento", empresa.NRO_RUC);
                cmd.ExecuteNonQuery();

                datos = 1;

                return datos;
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

        public static EBroCatalogoEmpresa BroConsultaEmpresaCatalogo(string ruc)
        {

            EBroCatalogoEmpresa rsEmpresa = new EBroCatalogoEmpresa();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Empresas WHERE Catalogo_Empresas.NRO_RUC = @ruc", getCnn());
                cmd.Parameters.AddWithValue("@ruc", ruc);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsEmpresa.IdCatalogoEmpresas = Convert.ToInt32(rdr["IdCatalogoEmpresas"]);
                    rsEmpresa.NRO_RUC = rdr["NRO_RUC"].ToString();
                    rsEmpresa.RAZON_SOCIAL = rdr["RAZON_SOCIAL"].ToString();
                    rsEmpresa.NOMBRE_COMERCIAL = rdr["NOMBRE_COMERCIAL"].ToString();
                    rsEmpresa.NOMBRE_COMPLETO = rdr["NOMBRE_COMPLETO"].ToString();
                    rsEmpresa.ACTIVIDAD_ECONOMICA = rdr["ACTIVIDAD_ECONOMICA"].ToString();
                    rsEmpresa.FECHA_CONSTITUCION = rdr["FECHA_CONSTITUCION"].ToString();
                    rsEmpresa.RESIDENCIA = rdr["RESIDENCIA"].ToString();
                    rsEmpresa.CALLES = rdr["CALLES"].ToString();
                    rsEmpresa.CALLES_DOMICILIO = rdr["CALLES_DOMICILIO"].ToString();
                    rsEmpresa.NRO_DOMICILIO = rdr["NRO_DOMICILIO"].ToString();
                    rsEmpresa.PROVINCIA = rdr["PROVINCIA"].ToString();
                    rsEmpresa.CANTON = rdr["CANTON"].ToString();
                    rsEmpresa.CIUDAD = rdr["CIUDAD"].ToString();
                    rsEmpresa.PARROQUIA = rdr["PARROQUIA"].ToString();
                    rsEmpresa.BARRIO = rdr["BARRIO"].ToString();
                    rsEmpresa.CAPITAL = rdr["CAPITAL"].ToString();
                    rsEmpresa.NRO_EMPLEADOS = rdr["NRO_EMPLEADOS"].ToString();
                    rsEmpresa.TELEFONO = rdr["TELEFONO"].ToString();
                    rsEmpresa.EMAIL = rdr["EMAIL"].ToString();
                    rsEmpresa.ACTIVIDAD_ECONOMICA_N6 = rdr["ACTIVIDAD_ECONOMICA_N6"].ToString();
                    rsEmpresa.ESTADO_LEGAL = rdr["ESTADO_LEGAL"].ToString();
                    rsEmpresa.TIPO_COMPANIA = rdr["TIPO_COMPANIA"].ToString();
                    rsEmpresa.INTENDENCIA_CONTROL = rdr["INTENDENCIA_CONTROL"].ToString();
                    rsEmpresa.OBJETO_SOCIAL = rdr["OBJETO_SOCIAL"].ToString();

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
    }
}
