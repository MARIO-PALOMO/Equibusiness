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
    public class DBroCotizacionResultado : DAdmConexion
    {
        public static EBroCotizacionResultado BroGestionCotizacionResultado(EBroCotizacionResultado pCotResultado)
        {
            EBroCotizacionResultado cotResultado = new EBroCotizacionResultado();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCotizacionResultado", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);
                cmd.Parameters.Add("@idCotizacionResultado", SqlDbType.Int);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@idPvMultiriesgo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@estadoMultiriesgo", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvEquipoMaquinaria", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoEquipoMaquinaria", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvResponsabilidadCivil", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoResponsabilidadCivil", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvFidelidad", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoFidelidad", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvAccidentesPersonales", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoAccidentesPersonales", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvTransInterno", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoTransInterno", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvTransImportaciones", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoTransImportaciones", SqlDbType.Int);

                cmd.Parameters.Add("@IdPvVehiculos", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@EstadoVehiculos", SqlDbType.Int);

                cmd.Parameters.Add("@pagoGlobal", SqlDbType.Int);
                cmd.Parameters.Add("@estadoGlobal", SqlDbType.Int);

                cmd.Parameters.Add("@fechaEmision", SqlDbType.NVarChar, -1);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pCotResultado.Identificador;

                cmd.Parameters["@idCotizacionResultado"].Value = pCotResultado.IdCotizacionResultado;
                cmd.Parameters["@idCotizacion"].Value = pCotResultado.Cotizacion.IdCotizacion;
                cmd.Parameters["@idPvMultiriesgo"].Value = pCotResultado.IdPvMultiriesgo;
                cmd.Parameters["@estadoMultiriesgo"].Value = pCotResultado.EstadoMultiriesgo;
                cmd.Parameters["@IdPvEquipoMaquinaria"].Value = pCotResultado.IdPvEquipoMaquinaria;
                cmd.Parameters["@EstadoEquipoMaquinaria"].Value = pCotResultado.EstadoEquipoMaquinaria;
                cmd.Parameters["@IdPvResponsabilidadCivil"].Value = pCotResultado.IdPvResponsabilidadCivil;
                cmd.Parameters["@EstadoResponsabilidadCivil"].Value = pCotResultado.EstadoResponsabilidadCivil;
                cmd.Parameters["@IdPvFidelidad"].Value = pCotResultado.IdPvFidelidad;
                cmd.Parameters["@EstadoFidelidad"].Value = pCotResultado.EstadoFidelidad;
                cmd.Parameters["@IdPvAccidentesPersonales"].Value = pCotResultado.IdPvAccidentesPersonales;
                cmd.Parameters["@EstadoAccidentesPersonales"].Value = pCotResultado.EstadoAccidentesPersonales;
                cmd.Parameters["@IdPvTransInterno"].Value = pCotResultado.IdPvTransInterno;
                cmd.Parameters["@EstadoTransInterno"].Value = pCotResultado.EstadoTransInterno;
                cmd.Parameters["@IdPvTransImportaciones"].Value = pCotResultado.IdPvTransImportaciones;
                cmd.Parameters["@EstadoTransImportaciones"].Value = pCotResultado.EstadoTransImportaciones;
                cmd.Parameters["@IdPvVehiculos"].Value = pCotResultado.IdPvVehiculos;
                cmd.Parameters["@EstadoVehiculos"].Value = pCotResultado.EstadoVehiculos;
                cmd.Parameters["@pagoGlobal"].Value = pCotResultado.EstadoPagoGlobal;
                cmd.Parameters["@estadoGlobal"].Value = pCotResultado.EstadoGlobal;
                cmd.Parameters["@fechaEmision"].Value = pCotResultado.FechaEmision;

                cmd.ExecuteNonQuery();

                cotResultado.IdCotizacionResultado = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return cotResultado;

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
