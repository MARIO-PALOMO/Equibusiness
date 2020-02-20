using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroCatalogos : DAdmConexion
    {

        public static List<EBroCatalogoAccesorios> BroConsultaAccesorios()
        {
            List<EBroCatalogoAccesorios> lstAccesorios = new List<EBroCatalogoAccesorios>();

            EBroCatalogoAccesorios rsAccesorios;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalago_Accesorios", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsAccesorios = new EBroCatalogoAccesorios();

                    rsAccesorios.IdCatalogoAccesorios = Convert.ToInt32(rdr["IdCatalogoAccesorios"]);
                    rsAccesorios.Codigo = Convert.ToInt32(rdr["Codigo"]);
                    rsAccesorios.Nombre = rdr["Nombre"].ToString();

                    lstAccesorios.Add(rsAccesorios);

                }
                rdr.Close();
                return lstAccesorios;
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

        public static List<EBroDerechosEmision> BroConsultaDerechosEmision()
        {
            List<EBroDerechosEmision> lstDerechosEmision = new List<EBroDerechosEmision>();

            EBroDerechosEmision rsDerechosEmision;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Derechos_Emision", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsDerechosEmision = new EBroDerechosEmision();

                    rsDerechosEmision.IdCatalogoDerechosAdmision = Convert.ToInt32(rdr["IdCatalogoDerechosAdmision"]);
                    rsDerechosEmision.Desde = Convert.ToInt32(rdr["Desde"]);
                    rsDerechosEmision.Hasta = Convert.ToInt32(rdr["Hasta"]);
                    rsDerechosEmision.Valor = Convert.ToDouble(rdr["Valor"]);

                    lstDerechosEmision.Add(rsDerechosEmision);

                }
                rdr.Close();
                return lstDerechosEmision;
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

        public static List<EBroCalculablesCotizacion> BroConsultaCalculablesCotizacion()
        {
            List<EBroCalculablesCotizacion> lstCalculablesCotizacion = new List<EBroCalculablesCotizacion>();

            EBroCalculablesCotizacion rsCalculablesCotizacion;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Valores_Cotizacion", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCalculablesCotizacion = new EBroCalculablesCotizacion();

                    rsCalculablesCotizacion.IdCatalogoValoresCotizacion = Convert.ToInt32(rdr["IdCatalogoValoresCotizacion"]);
                    rsCalculablesCotizacion.ImpuestoSBS = Convert.ToDouble(rdr["ImpuestoSBS"]);
                    rsCalculablesCotizacion.ImpuestoCampesino = Convert.ToDouble(rdr["ImpuestoCampesino"]);
                    rsCalculablesCotizacion.Iva = Convert.ToDouble(rdr["Iva"]);

                    lstCalculablesCotizacion.Add(rsCalculablesCotizacion);

                }
                rdr.Close();
                return lstCalculablesCotizacion;
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

        public static EBroCatalogoCedulas BroGestionCatalogoCedulas(EBroCatalogoCedulas pcedulas)
        {
            EBroCatalogoCedulas cedulas = new EBroCatalogoCedulas();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCatalogoCedula", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@NRO_CEDULA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@APELLIDO1", SqlDbType.NVarChar);
                cmd.Parameters.Add("@APELLIDO2", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE1", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE2", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_NAC", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_COMPLETO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@ESTADO_CIVIL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@GENERO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NACIONALIDAD", SqlDbType.NVarChar);
                cmd.Parameters.Add("@RESIDENCIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CALLES", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NIVELESTUDIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@PROFESION", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_PADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_CEDULA_PADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NACIONALIDAD_PADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_MADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_CEDULA_MADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NACIONALIDAD_MADRE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_MATRIMONIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@LUGAR_MATROMONIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_CONYUGUE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_CEDULA_CONYUGUE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NACIONALIDAD_CONYUGUE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_DEFUNCION", SqlDbType.NVarChar);
                cmd.Parameters.Add("@LUGAR_DEFUNCION", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CONDICION_CIUDADANIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@LUGAR_NAC", SqlDbType.NVarChar);
                cmd.Parameters.Add("@LUGAR_INSCRIPCION", SqlDbType.NVarChar);
                cmd.Parameters.Add("@DOMICILIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CALLES_DOMICILIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_DOMICILIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@PROVINCIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CANTON", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CIUDAD", SqlDbType.NVarChar);
                cmd.Parameters.Add("@PARROQUIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@BARRIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_EXPEDICION_CEDULA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_ACTUALIZACION_REGCIVIL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@apellidos", SqlDbType.NVarChar);
                cmd.Parameters.Add("@nombres", SqlDbType.NVarChar);
                cmd.Parameters.Add("@TELEFONO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@TELEFONO2", SqlDbType.NVarChar);
                cmd.Parameters.Add("@OTROSTELEFONOS", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CELULAR", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CELULAR2", SqlDbType.NVarChar);
                cmd.Parameters.Add("@EMAIL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@EMAIL2", SqlDbType.NVarChar);
                cmd.Parameters.Add("@EGRESOS", SqlDbType.NVarChar);
                cmd.Parameters.Add("@INGRESOS", SqlDbType.NVarChar);
                cmd.Parameters.Add("@INGRESOS_ACTIVIDAD_COMERCIAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@INGRESOS_ACTIVIDAD_PROFESIONAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@INGRESOS_TRABAJO_PERMANENTE", SqlDbType.NVarChar);
                cmd.Parameters.Add("@OTROS_INGRESOS", SqlDbType.NVarChar);
                cmd.Parameters.Add("@SITUACION_LABORAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@RUC_PATRONO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_PATRONO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@FECHA_INGRESO_PATRONO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@CARGO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@SALARIO", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NRO_RUC", SqlDbType.NVarChar);
                cmd.Parameters.Add("@RAZON_SOCIAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@NOMBRE_COMERCIAL", SqlDbType.NVarChar);
                cmd.Parameters.Add("@TIPO_COMPANIA", SqlDbType.NVarChar);
                cmd.Parameters.Add("@ACTIVIDAD_ECONOMICA", SqlDbType.NVarChar);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@NRO_CEDULA"].Value = pcedulas.NRO_CEDULA == null ? "" : pcedulas.NRO_CEDULA;
                cmd.Parameters["@APELLIDO1"].Value = pcedulas.APELLIDO1 == null ? "" : pcedulas.APELLIDO1;
                cmd.Parameters["@APELLIDO2"].Value = pcedulas.APELLIDO2 == null ? "" : pcedulas.APELLIDO1;
                cmd.Parameters["@NOMBRE1"].Value = pcedulas.NOMBRE1 == null ? "" : pcedulas.NOMBRE1;
                cmd.Parameters["@NOMBRE2"].Value = pcedulas.NOMBRE2 == null ? "" : pcedulas.NOMBRE2;
                cmd.Parameters["@FECHA_NAC"].Value = pcedulas.FECHA_NAC == null ? "" : pcedulas.FECHA_NAC;
                cmd.Parameters["@NOMBRE_COMPLETO"].Value = pcedulas.NOMBRE_COMPLETO == null ? "" : pcedulas.NOMBRE_COMPLETO;
                cmd.Parameters["@ESTADO_CIVIL"].Value = pcedulas.ESTADO_CIVIL == null ? "" : pcedulas.ESTADO_CIVIL;
                cmd.Parameters["@GENERO"].Value = pcedulas.GENERO == null ? "" : pcedulas.GENERO;
                cmd.Parameters["@NACIONALIDAD"].Value = pcedulas.NACIONALIDAD == null ? "" : pcedulas.NACIONALIDAD;
                cmd.Parameters["@RESIDENCIA"].Value = pcedulas.RESIDENCIA == null ? "" : pcedulas.RESIDENCIA;
                cmd.Parameters["@CALLES"].Value = pcedulas.CALLES == null ? "" : pcedulas.CALLES;
                cmd.Parameters["@NIVELESTUDIO"].Value = pcedulas.NIVELESTUDIO == null ? "" : pcedulas.NIVELESTUDIO;
                cmd.Parameters["@PROFESION"].Value = pcedulas.PROFESION == null ? "" : pcedulas.PROFESION;
                cmd.Parameters["@NOMBRE_PADRE"].Value = pcedulas.NOMBRE_PADRE == null ? "" : pcedulas.NOMBRE_PADRE;
                cmd.Parameters["@NRO_CEDULA_PADRE"].Value = pcedulas.NRO_CEDULA_PADRE == null ? "" : pcedulas.NRO_CEDULA_PADRE;
                cmd.Parameters["@NACIONALIDAD_PADRE"].Value = pcedulas.NACIONALIDAD_PADRE == null ? "" : pcedulas.NACIONALIDAD_PADRE;
                cmd.Parameters["@NOMBRE_MADRE"].Value = pcedulas.NOMBRE_MADRE == null ? "" : pcedulas.NOMBRE_MADRE;
                cmd.Parameters["@NRO_CEDULA_MADRE"].Value = pcedulas.NRO_CEDULA_MADRE == null ? "" : pcedulas.NRO_CEDULA_MADRE;
                cmd.Parameters["@NACIONALIDAD_MADRE"].Value = pcedulas.NACIONALIDAD_MADRE == null ? "" : pcedulas.NACIONALIDAD_MADRE;
                cmd.Parameters["@FECHA_MATRIMONIO"].Value = pcedulas.FECHA_MATRIMONIO == null ? "" : pcedulas.FECHA_MATRIMONIO;
                cmd.Parameters["@LUGAR_MATROMONIO"].Value = pcedulas.LUGAR_MATROMONIO == null ? "" : pcedulas.LUGAR_MATROMONIO;
                cmd.Parameters["@NOMBRE_CONYUGUE"].Value = pcedulas.NOMBRE_CONYUGUE == null ? "" : pcedulas.NOMBRE_CONYUGUE;
                cmd.Parameters["@NRO_CEDULA_CONYUGUE"].Value = pcedulas.NRO_CEDULA_CONYUGUE == null ? "" : pcedulas.NRO_CEDULA_CONYUGUE;
                cmd.Parameters["@NACIONALIDAD_CONYUGUE"].Value = pcedulas.NACIONALIDAD_CONYUGUE == null ? "" : pcedulas.NACIONALIDAD_CONYUGUE;
                cmd.Parameters["@FECHA_DEFUNCION"].Value = pcedulas.FECHA_DEFUNCION == null ? "" : pcedulas.FECHA_DEFUNCION;
                cmd.Parameters["@LUGAR_DEFUNCION"].Value = pcedulas.LUGAR_DEFUNCION == null ? "" : pcedulas.LUGAR_DEFUNCION;
                cmd.Parameters["@CONDICION_CIUDADANIA"].Value = pcedulas.CONDICION_CIUDADANIA == null ? "" : pcedulas.CONDICION_CIUDADANIA;
                cmd.Parameters["@LUGAR_NAC"].Value = pcedulas.LUGAR_NAC == null ? "" : pcedulas.LUGAR_NAC;
                cmd.Parameters["@LUGAR_INSCRIPCION"].Value = pcedulas.LUGAR_INSCRIPCION == null ? "" : pcedulas.LUGAR_INSCRIPCION;
                cmd.Parameters["@DOMICILIO"].Value = pcedulas.DOMICILIO == null ? "" : pcedulas.DOMICILIO;
                cmd.Parameters["@CALLES_DOMICILIO"].Value = pcedulas.CALLES_DOMICILIO == null ? "" : pcedulas.CALLES_DOMICILIO;
                cmd.Parameters["@NRO_DOMICILIO"].Value = pcedulas.NRO_DOMICILIO == null ? "" : pcedulas.NRO_DOMICILIO;
                cmd.Parameters["@PROVINCIA"].Value = pcedulas.PROVINCIA == null ? "" : pcedulas.PROVINCIA;
                cmd.Parameters["@CANTON"].Value = pcedulas.CANTON == null ? "" : pcedulas.CANTON;
                cmd.Parameters["@CIUDAD"].Value = pcedulas.CIUDAD == null ? "" : pcedulas.CIUDAD;
                cmd.Parameters["@PARROQUIA"].Value = pcedulas.PARROQUIA == null ? "" : pcedulas.PARROQUIA;
                cmd.Parameters["@BARRIO"].Value = pcedulas.BARRIO == null ? "" : pcedulas.BARRIO;
                cmd.Parameters["@FECHA_EXPEDICION_CEDULA"].Value = pcedulas.FECHA_EXPEDICION_CEDULA == null ? "" : pcedulas.FECHA_EXPEDICION_CEDULA;
                cmd.Parameters["@FECHA_ACTUALIZACION_REGCIVIL"].Value = pcedulas.FECHA_ACTUALIZACION_REGCIVIL == null ? "" : pcedulas.FECHA_ACTUALIZACION_REGCIVIL;
                cmd.Parameters["@apellidos"].Value = pcedulas.apellidos == null ? "" : pcedulas.apellidos;
                cmd.Parameters["@nombres"].Value = pcedulas.nombres == null ? "" : pcedulas.nombres;
                cmd.Parameters["@TELEFONO"].Value = pcedulas.TELEFONO == null ? "" : pcedulas.TELEFONO;
                cmd.Parameters["@TELEFONO2"].Value = pcedulas.TELEFONO2 == null ? "" : pcedulas.TELEFONO2;
                cmd.Parameters["@OTROSTELEFONOS"].Value = pcedulas.OTROSTELEFONOS == null ? "" : pcedulas.OTROSTELEFONOS;
                cmd.Parameters["@CELULAR"].Value = pcedulas.CELULAR == null ? "" : pcedulas.CELULAR;
                cmd.Parameters["@CELULAR2"].Value = pcedulas.CELULAR2 == null ? "" : pcedulas.CELULAR2;
                cmd.Parameters["@EMAIL"].Value = pcedulas.EMAIL == null ? "" : pcedulas.EMAIL;
                cmd.Parameters["@EMAIL2"].Value = pcedulas.EMAIL2 == null ? "" : pcedulas.EMAIL2;
                cmd.Parameters["@EGRESOS"].Value = pcedulas.EGRESOS == null ? "" : pcedulas.EGRESOS;
                cmd.Parameters["@INGRESOS"].Value = pcedulas.INGRESOS == null ? "" : pcedulas.INGRESOS;
                cmd.Parameters["@INGRESOS_ACTIVIDAD_COMERCIAL"].Value = pcedulas.INGRESOS_ACTIVIDAD_COMERCIAL == null ? "" : pcedulas.INGRESOS_ACTIVIDAD_COMERCIAL;
                cmd.Parameters["@INGRESOS_ACTIVIDAD_PROFESIONAL"].Value = pcedulas.INGRESOS_ACTIVIDAD_PROFESIONAL == null ? "" : pcedulas.INGRESOS_ACTIVIDAD_PROFESIONAL;
                cmd.Parameters["@INGRESOS_TRABAJO_PERMANENTE"].Value = pcedulas.INGRESOS_TRABAJO_PERMANENTE == null ? "" : pcedulas.INGRESOS_TRABAJO_PERMANENTE;
                cmd.Parameters["@OTROS_INGRESOS"].Value = pcedulas.OTROS_INGRESOS == null ? "" : pcedulas.OTROS_INGRESOS;
                cmd.Parameters["@SITUACION_LABORAL"].Value = pcedulas.SITUACION_LABORAL == null ? "" : pcedulas.SITUACION_LABORAL;
                cmd.Parameters["@RUC_PATRONO"].Value = pcedulas.RUC_PATRONO == null ? "" : pcedulas.RUC_PATRONO;
                cmd.Parameters["@NOMBRE_PATRONO"].Value = pcedulas.NOMBRE_PATRONO == null ? "" : pcedulas.NOMBRE_PATRONO;
                cmd.Parameters["@FECHA_INGRESO_PATRONO"].Value = pcedulas.FECHA_INGRESO_PATRONO == null ? "" : pcedulas.FECHA_INGRESO_PATRONO;
                cmd.Parameters["@CARGO"].Value = pcedulas.CARGO == null ? "" : pcedulas.CARGO;
                cmd.Parameters["@SALARIO"].Value = pcedulas.SALARIO == null ? "" : pcedulas.SALARIO;
                cmd.Parameters["@NRO_RUC"].Value = pcedulas.NRO_RUC == null ? "" : pcedulas.NRO_RUC;
                cmd.Parameters["@RAZON_SOCIAL"].Value = pcedulas.RAZON_SOCIAL == null ? "" : pcedulas.RAZON_SOCIAL;
                cmd.Parameters["@NOMBRE_COMERCIAL"].Value = pcedulas.NOMBRE_COMERCIAL == null ? "" : pcedulas.NOMBRE_COMERCIAL;
                cmd.Parameters["@TIPO_COMPANIA"].Value = pcedulas.TIPO_COMPANIA == null ? "" : pcedulas.TIPO_COMPANIA;
                cmd.Parameters["@ACTIVIDAD_ECONOMICA"].Value = pcedulas.ACTIVIDAD_ECONOMICA == null ? "" : pcedulas.ACTIVIDAD_ECONOMICA;

                cmd.ExecuteNonQuery();

                cedulas.IdCatalogoCedulas = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return cedulas;

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

        public static EBroCatalogoCedulas BroConsultaCatalogoCedula(string cedula)
        {

            EBroCatalogoCedulas rsCedula = new EBroCatalogoCedulas();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Cedulas WHERE Catalogo_Cedulas.NRO_CEDULA = @cedula", getCnn());
                cmd.Parameters.AddWithValue("@cedula", cedula);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    rsCedula.IdCatalogoCedulas = Convert.ToInt32(rdr["IdCatalogoCedulas"]);
                    rsCedula.NRO_CEDULA = rdr["NRO_CEDULA"].ToString();
                    rsCedula.APELLIDO1 = rdr["APELLIDO1"].ToString();
                    rsCedula.APELLIDO2 = rdr["APELLIDO2"].ToString();
                    rsCedula.NOMBRE1 = rdr["NOMBRE1"].ToString();
                    rsCedula.NOMBRE2 = rdr["NOMBRE2"].ToString();
                    rsCedula.FECHA_NAC = rdr["FECHA_NAC"].ToString();
                    rsCedula.NOMBRE_COMPLETO = rdr["NOMBRE_COMPLETO"].ToString();
                    rsCedula.ESTADO_CIVIL = rdr["ESTADO_CIVIL"].ToString();
                    rsCedula.GENERO = rdr["GENERO"].ToString();
                    rsCedula.NACIONALIDAD = rdr["NACIONALIDAD"].ToString();
                    rsCedula.RESIDENCIA = rdr["RESIDENCIA"].ToString();
                    rsCedula.CALLES = rdr["CALLES"].ToString();
                    rsCedula.NIVELESTUDIO = rdr["NIVELESTUDIO"].ToString();
                    rsCedula.PROFESION = rdr["PROFESION"].ToString();
                    rsCedula.NOMBRE_PADRE = rdr["NOMBRE_PADRE"].ToString();
                    rsCedula.NRO_CEDULA_PADRE = rdr["NRO_CEDULA_PADRE"].ToString();
                    rsCedula.NACIONALIDAD_PADRE = rdr["NACIONALIDAD_PADRE"].ToString();
                    rsCedula.NOMBRE_MADRE = rdr["NOMBRE_MADRE"].ToString();
                    rsCedula.NRO_CEDULA_MADRE = rdr["NRO_CEDULA_MADRE"].ToString();
                    rsCedula.NACIONALIDAD_MADRE = rdr["NACIONALIDAD_MADRE"].ToString();
                    rsCedula.FECHA_MATRIMONIO = rdr["FECHA_MATRIMONIO"].ToString();
                    rsCedula.LUGAR_MATROMONIO = rdr["LUGAR_MATROMONIO"].ToString();
                    rsCedula.NOMBRE_CONYUGUE = rdr["NOMBRE_CONYUGUE"].ToString();
                    rsCedula.NRO_CEDULA_CONYUGUE = rdr["NRO_CEDULA_CONYUGUE"].ToString();
                    rsCedula.NACIONALIDAD_CONYUGUE = rdr["NACIONALIDAD_CONYUGUE"].ToString();
                    rsCedula.FECHA_DEFUNCION = rdr["FECHA_DEFUNCION"].ToString();
                    rsCedula.LUGAR_DEFUNCION = rdr["LUGAR_DEFUNCION"].ToString();
                    rsCedula.CONDICION_CIUDADANIA = rdr["CONDICION_CIUDADANIA"].ToString();
                    rsCedula.LUGAR_NAC = rdr["LUGAR_NAC"].ToString();
                    rsCedula.LUGAR_INSCRIPCION = rdr["LUGAR_INSCRIPCION"].ToString();
                    rsCedula.DOMICILIO = rdr["DOMICILIO"].ToString();
                    rsCedula.CALLES_DOMICILIO = rdr["CALLES_DOMICILIO"].ToString();
                    rsCedula.NRO_DOMICILIO = rdr["NRO_DOMICILIO"].ToString();
                    rsCedula.PROVINCIA = rdr["PROVINCIA"].ToString();
                    rsCedula.CANTON = rdr["CANTON"].ToString();
                    rsCedula.CIUDAD = rdr["CIUDAD"].ToString();
                    rsCedula.PARROQUIA = rdr["PARROQUIA"].ToString();
                    rsCedula.BARRIO = rdr["BARRIO"].ToString();
                    rsCedula.FECHA_EXPEDICION_CEDULA = rdr["FECHA_EXPEDICION_CEDULA"].ToString();
                    rsCedula.FECHA_ACTUALIZACION_REGCIVIL = rdr["FECHA_ACTUALIZACION_REGCIVIL"].ToString();
                    rsCedula.apellidos = rdr["apellidos"].ToString();
                    rsCedula.nombres = rdr["nombres"].ToString();
                    rsCedula.TELEFONO = rdr["TELEFONO"].ToString();
                    rsCedula.TELEFONO2 = rdr["TELEFONO2"].ToString();
                    rsCedula.OTROSTELEFONOS = rdr["OTROSTELEFONOS"].ToString();
                    rsCedula.CELULAR = rdr["CELULAR"].ToString();
                    rsCedula.CELULAR2 = rdr["CELULAR2"].ToString();
                    rsCedula.EMAIL = rdr["EMAIL"].ToString();
                    rsCedula.EMAIL2 = rdr["EMAIL2"].ToString();
                    rsCedula.EGRESOS = rdr["EGRESOS"].ToString();
                    rsCedula.INGRESOS = rdr["INGRESOS"].ToString();
                    rsCedula.INGRESOS_ACTIVIDAD_COMERCIAL = rdr["INGRESOS_ACTIVIDAD_COMERCIAL"].ToString();
                    rsCedula.INGRESOS_ACTIVIDAD_PROFESIONAL = rdr["INGRESOS_ACTIVIDAD_PROFESIONAL"].ToString();
                    rsCedula.INGRESOS_TRABAJO_PERMANENTE = rdr["INGRESOS_TRABAJO_PERMANENTE"].ToString();
                    rsCedula.OTROS_INGRESOS = rdr["OTROS_INGRESOS"].ToString();
                    rsCedula.SITUACION_LABORAL = rdr["SITUACION_LABORAL"].ToString();
                    rsCedula.RUC_PATRONO = rdr["RUC_PATRONO"].ToString();
                    rsCedula.NOMBRE_PATRONO = rdr["NOMBRE_PATRONO"].ToString();
                    rsCedula.FECHA_INGRESO_PATRONO = rdr["FECHA_INGRESO_PATRONO"].ToString();
                    rsCedula.CARGO = rdr["CARGO"].ToString();
                    rsCedula.SALARIO = rdr["SALARIO"].ToString();
                    rsCedula.NRO_RUC = rdr["NRO_RUC"].ToString();
                    rsCedula.RAZON_SOCIAL = rdr["RAZON_SOCIAL"].ToString();
                    rsCedula.NOMBRE_COMERCIAL = rdr["NOMBRE_COMERCIAL"].ToString();
                    rsCedula.TIPO_COMPANIA = rdr["TIPO_COMPANIA"].ToString();
                    rsCedula.ACTIVIDAD_ECONOMICA = rdr["ACTIVIDAD_ECONOMICA"].ToString();
                }
                rdr.Close();
                return rsCedula;
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

        public static List<EBroCatalogoCiudades> BroConsultaCatalogoCuidades()
        {
            List<EBroCatalogoCiudades> lista = new List<EBroCatalogoCiudades>();

            EBroCatalogoCiudades rsCiudades;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Ciudades", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsCiudades = new EBroCatalogoCiudades();

                    rsCiudades.IdCiudad = Convert.ToInt32(rdr["IdCiudad"]);
                    rsCiudades.Nombre = rdr["Nombre"].ToString().ToUpper().Trim();

                    lista.Add(rsCiudades);

                }
                rdr.Close();
                return lista;
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

        public static List<EBroCatalogoSucursal> BroConsultaCatalogoSucursal()
        {
            List<EBroCatalogoSucursal> lista = new List<EBroCatalogoSucursal>();

            EBroCatalogoSucursal rsSucursal;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Sucursal", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsSucursal = new EBroCatalogoSucursal();

                    rsSucursal.IdSucursal = Convert.ToInt32(rdr["IdSucursal"]);
                    rsSucursal.CodigoPuntoVenta = Convert.ToInt32(rdr["CodigoPuntoVenta"]);
                    rsSucursal.CodigoSucursal = Convert.ToInt32(rdr["CodigoSucursal"]);
                    rsSucursal.Nombre = rdr["Nombre"].ToString().ToUpper().Trim();
                    rsSucursal.Union = Convert.ToInt32(rdr["CodigoPuntoVenta"]) + "-" + Convert.ToInt32(rdr["CodigoSucursal"]);

                    lista.Add(rsSucursal);

                }
                rdr.Close();
                return lista;
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

        public static List<EBroCatalogoProvincias> BroConsultaCatalogoProvincias()
        {
            List<EBroCatalogoProvincias> lista = new List<EBroCatalogoProvincias>();

            EBroCatalogoProvincias rsProvincias;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Catalogo_Provincias", getCnn());
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    rsProvincias = new EBroCatalogoProvincias();

                    rsProvincias.IdCatalogoProvincias = rdr["IdCatalogo_Provincias"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCatalogo_Provincias"]);
                    rsProvincias.CodigoPais = rdr["CodigoPais"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["CodigoPais"]);
                    rsProvincias.CodigoDepartamento = rdr["CodigoDepartamento"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["CodigoDepartamento"]);
                    rsProvincias.TextoDepartamento = rdr["TextoDepartamento"].ToString();
                    rsProvincias.CodigoMunicipio = rdr["CodigoMunicipio"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["CodigoMunicipio"]);
                    rsProvincias.TextoMunicipio = rdr["TextoMunicipio"].ToString();
                    rsProvincias.TextoCompleto = rdr["TextoDepartamento"].ToString() + " - " + rdr["TextoMunicipio"].ToString();

                    lista.Add(rsProvincias);

                }
                rdr.Close();
                return lista;
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
