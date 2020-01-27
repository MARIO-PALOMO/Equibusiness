using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroFormaPago : DAdmConexion
    {
        public static EBroFormaPago BroGestionFormaPago(EBroFormaPago pPago)
        {
            EBroFormaPago pago = new EBroFormaPago();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionFormaPago", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idFormaPago", SqlDbType.Int);
                cmd.Parameters.Add("@idPago", SqlDbType.Int);
                cmd.Parameters.Add("@tipo", SqlDbType.NVarChar);
                cmd.Parameters.Add("@estado", SqlDbType.Int);
                cmd.Parameters.Add("@adjunto", SqlDbType.Xml);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@plataforma", SqlDbType.NVarChar);
                cmd.Parameters.Add("@codigoAutenticacion", SqlDbType.NVarChar);
                cmd.Parameters.Add("@referencia", SqlDbType.NVarChar);
                cmd.Parameters.Add("@lote", SqlDbType.NVarChar);
                cmd.Parameters.Add("@voucher", SqlDbType.NVarChar);
                cmd.Parameters.Add("@diferidos", SqlDbType.NVarChar);
                cmd.Parameters.Add("@intereses", SqlDbType.NVarChar);
                cmd.Parameters.Add("@trama", SqlDbType.Xml);
                cmd.Parameters.Add("@fecha", SqlDbType.NVarChar);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pPago.Identificador;

                cmd.Parameters["@idFormaPago"].Value = pPago.IdFormaPago;
                cmd.Parameters["@idPago"].Value = pPago.IdPago;
                cmd.Parameters["@tipo"].Value = pPago.Tipo;
                cmd.Parameters["@estado"].Value = pPago.Estado;
                cmd.Parameters["@adjunto"].Value = pPago.Adjunto;

                cmd.Parameters["@plataforma"].Value = pPago.Plataforma;
                cmd.Parameters["@codigoAutenticacion"].Value = pPago.CodigoAutenticacion;
                cmd.Parameters["@referencia"].Value = pPago.Referencia;
                cmd.Parameters["@lote"].Value = pPago.Lote;
                cmd.Parameters["@voucher"].Value = pPago.Voucher;
                cmd.Parameters["@diferidos"].Value = pPago.Diferidos;
                cmd.Parameters["@intereses"].Value = pPago.Intereses;
                cmd.Parameters["@trama"].Value = pPago.Trama;
                cmd.Parameters["@fecha"].Value = pPago.Fecha;

                cmd.Parameters["@idCotizacion"].Value = pPago.Cotizacion.IdCotizacion;

                cmd.ExecuteNonQuery();

                pago.IdFormaPago = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return pago;

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

        public static int adjuntarArchivo(EBroFormaPago pago)
        {
            int datos = 0;
            try
            {

                Conectar();
                SqlCommand cmd = new SqlCommand("UPDATE FormaPago SET FormaPago.Adjunto = @adjunto, FormaPago.AdjuntoTipo = @adjuntoTipo, FormaPago.Tipo = @tipo WHERE FormaPago.IdFormaPago = @idFormaPago", getCnn());
                cmd.Parameters.AddWithValue("@adjunto", pago.Adjunto);
                cmd.Parameters.AddWithValue("@adjuntoTipo", pago.AdjuntoTipo);
                cmd.Parameters.AddWithValue("@idFormaPago", pago.IdFormaPago);
                cmd.Parameters.AddWithValue("@tipo", pago.Tipo);
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

        public static EBroFormaPago BroConsultarFormaPago(int idFormaPago)
        {

            EBroFormaPago rsFormaPago = new EBroFormaPago();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM FormaPago WHERE FormaPago.IdFormaPago = @idFormaPago", getCnn());
                cmd.Parameters.AddWithValue("@idFormaPago", idFormaPago);
                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.Read())
                {
                    rsFormaPago.IdFormaPago = Convert.ToInt32(rdr["IdFormaPago"]);
                    rsFormaPago.IdPago = Convert.ToInt32(rdr["IdPago"]);
                    rsFormaPago.Tipo = rdr["Tipo"].ToString();
                    rsFormaPago.Estado = Convert.ToInt32(rdr["Estado"]);
                    rsFormaPago.Adjunto = rdr["Adjunto"].ToString();
                    rsFormaPago.AdjuntoTipo = rdr["AdjuntoTipo"].ToString();

                    rsFormaPago.Plataforma = rdr["Plataforma"].ToString();
                    rsFormaPago.CodigoAutenticacion = rdr["CodigoAutenticacion"].ToString();
                    rsFormaPago.Referencia = rdr["Referencia"].ToString();
                    rsFormaPago.Lote = rdr["Lote"].ToString();
                    rsFormaPago.Voucher = rdr["Voucher"].ToString();
                    rsFormaPago.Diferidos = rdr["Diferidos"].ToString();
                    rsFormaPago.Intereses = rdr["Intereses"].ToString();
                    rsFormaPago.Trama = rdr["Trama"].ToString();

                }
                rdr.Close();
                return rsFormaPago;
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
