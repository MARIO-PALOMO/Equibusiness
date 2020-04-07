using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroCotizacion : DAdmConexion
    {
        public static int BroTotalRegistrosCotizacion(int IdBroker)
        {
            int Total = 0;
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand(@"SELECT * FROM ConsultaTotalRegistrosCotizacion WHERE IdBroker = @broker", getCnn());
                cmd.Parameters.AddWithValue("@broker", IdBroker);
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Total = Convert.ToInt32(rdr["Total"]);
                }
                rdr.Close();
                return Total;
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

        public static EBroCotizacion BroGestionCotizacion(EBroCotizacion pCotizacion)
        {
            EBroCotizacion cotizacion = new EBroCotizacion();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCotizacion", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);
                cmd.Parameters.Add("@primaNetaIva12", SqlDbType.Float);
                cmd.Parameters.Add("@primaNetaIva0", SqlDbType.Float);
                cmd.Parameters.Add("@primaNetaTotal", SqlDbType.Float);
                cmd.Parameters.Add("@impuestoSBS", SqlDbType.Float);
                cmd.Parameters.Add("@impuestoCampesino", SqlDbType.Float);
                cmd.Parameters.Add("@derechosEmision", SqlDbType.Float);
                cmd.Parameters.Add("@iva", SqlDbType.Float);
                cmd.Parameters.Add("@primaTotal", SqlDbType.Float);
                cmd.Parameters.Add("@idBroker", SqlDbType.Int);
                cmd.Parameters.Add("@codigo", SqlDbType.NVarChar, -1);
                cmd.Parameters.Add("@estado", SqlDbType.Int);
                cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                cmd.Parameters.Add("@idEmpresa", SqlDbType.Int);
                cmd.Parameters.Add("@corredor", SqlDbType.NVarChar, -1);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pCotizacion.Identificador;

                cmd.Parameters["@idCotizacion"].Value = pCotizacion.IdCotizacion;
                cmd.Parameters["@primaNetaIva12"].Value = pCotizacion.PrimaNetaIva12;
                cmd.Parameters["@primaNetaIva0"].Value = pCotizacion.PrimaNetaIva0;
                cmd.Parameters["@primaNetaTotal"].Value = pCotizacion.PrimaNetaTotal;
                cmd.Parameters["@impuestoSBS"].Value = pCotizacion.ImpuestoSBS;
                cmd.Parameters["@impuestoCampesino"].Value = pCotizacion.ImpuestoCampesino;
                cmd.Parameters["@derechosEmision"].Value = pCotizacion.DerechosEmision;
                cmd.Parameters["@iva"].Value = pCotizacion.Iva;
                cmd.Parameters["@primaTotal"].Value = pCotizacion.PrimaTotal;
                cmd.Parameters["@idBroker"].Value = pCotizacion.Broker.IdBroker;
                cmd.Parameters["@codigo"].Value = pCotizacion.Codigo;
                cmd.Parameters["@estado"].Value = pCotizacion.Estado;
                cmd.Parameters["@idUsuario"].Value = pCotizacion.IdUsuario;
                cmd.Parameters["@idEmpresa"].Value = pCotizacion.Empresa.IdEmpresa;
                cmd.Parameters["@corredor"].Value = pCotizacion.Corredor;

                cmd.ExecuteNonQuery();

                cotizacion.IdCotizacion = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return cotizacion;

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

        public static EBroCotizacion BroGestionCotizacionCorredor(EBroCotizacion pCotizacion)
        {
            EBroCotizacion cotizacion = new EBroCotizacion();
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCotizacionCorredor", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);
                cmd.Parameters.Add("@corredor", SqlDbType.NVarChar, -1);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = pCotizacion.Identificador;

                cmd.Parameters["@idCotizacion"].Value = pCotizacion.IdCotizacion;
                cmd.Parameters["@corredor"].Value = pCotizacion.Corredor;

                cmd.ExecuteNonQuery();

                cotizacion.IdCotizacion = Convert.ToInt32(cmd.Parameters["@valor"].Value);

                return cotizacion;

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

        public static List<EBroCotizacion> BroConsultaCotizacionesUsuario(int idBroker, int idUsuario, int numeroPaginas, int tamanoPaginas, int estadoCotizacion)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            EAdmBroker rsBroker;
            EBroEmpresa rsEmpresa;
            EBroContenido rsContenido;
            EBroDireccion rsDireccion;
            EBroVehiculo rsVehiculos;
            EBroCotizacionResultado rsCotizacionResultado;
            EBroFormaPago rsFormaPago;
            EBroContratante rsContratante;
            EBroPagador rsPagador;
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("GestionConsultaCotizacionEmpresaComplementos", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@idBroker", SqlDbType.Int);
                cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                cmd.Parameters.Add("@numeroPaginas", SqlDbType.Int);
                cmd.Parameters.Add("@tamanoPaginas", SqlDbType.Int);
                cmd.Parameters.Add("@estadoCotizacion", SqlDbType.Int);

                cmd.Parameters["@idBroker"].Value = idBroker;
                cmd.Parameters["@idUsuario"].Value = idUsuario;
                cmd.Parameters["@numeroPaginas"].Value = numeroPaginas;
                cmd.Parameters["@tamanoPaginas"].Value = tamanoPaginas;
                cmd.Parameters["@estadoCotizacion"].Value = estadoCotizacion;

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();
                    rsBroker = new EAdmBroker();
                    rsEmpresa = new EBroEmpresa();
                    rsContenido = new EBroContenido();
                    rsDireccion = new EBroDireccion();
                    rsVehiculos = new EBroVehiculo();
                    rsCotizacionResultado = new EBroCotizacionResultado();
                    rsFormaPago = new EBroFormaPago();
                    rsContratante = new EBroContratante();
                    rsPagador = new EBroPagador();

                    rsCotizacion.IdCotizacion = rdr["IdCotizacion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();
                    rsCotizacion.Corredor = rdr["Corredor"].ToString();
                    rsCotizacion.FechaCompleta = rdr["FechaCompleta"].ToString();
                    rsCotizacion.TotalRegistros = rdr["TotalRegistros"].ToString();

                    rsEmpresa.IdEmpresa = rdr["IdEmpresa"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();

                    rsContratante.Cedula = rdr["CedulaContratante"].ToString();
                    rsContratante.Nombre = rdr["NombreContratante"].ToString();
                    rsContratante.PrimerApellido = rdr["PrimerApellidoContratante"].ToString();
                    rsContratante.SegundoApellido = rdr["SegundoApellidoContratante"].ToString();

                    rsPagador.Cedula = rdr["CedulaPagador"].ToString();
                    rsPagador.Nombre = rdr["NombrePagador"].ToString();
                    rsPagador.PrimerApellido = rdr["PrimerApellidoPagador"].ToString();
                    rsPagador.SegundoApellido = rdr["SegundoApellidoPagador"].ToString();

                    rsBroker.IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    rsContenido.IdContenido = rdr["IdContenido"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.VistaValores = rdr["VistaValores"].ToString();
                    rsContenido.EstadoGarantias = rdr["EstadoGarantia"].ToString();
                    rsContenido.EstadoCondiciones = rdr["EstadoCondiciones"].ToString();

                    rsFormaPago.Plataforma = rdr["Plataforma"].ToString();
                    rsFormaPago.CodigoAutenticacion = rdr["CodigoAutenticacion"].ToString();
                    rsFormaPago.Referencia = rdr["Referencia"].ToString();
                    rsFormaPago.Lote = rdr["Lote"].ToString();
                    rsFormaPago.Voucher = rdr["Voucher"].ToString();
                    rsFormaPago.Diferidos = rdr["Diferidos"].ToString();
                    rsFormaPago.Intereses = rdr["Intereses"].ToString();
                    rsFormaPago.Trama = rdr["Trama"].ToString();
                    rsFormaPago.Fecha = rdr["FechaPago"].ToString();
                    rsFormaPago.Tipo = rdr["TipoPago"].ToString();

                    rsDireccion.IdDireccion = rdr["IdDireccion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdDireccion"]);

                    rsVehiculos.IdVehiculos = rdr["IdVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdVehiculos"]);

                    rsCotizacionResultado.IdCotizacionResultado = rdr["IdCotizacionResultado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacionResultado"]);

                    rsCotizacionResultado.IdPvMultiriesgo = rdr["IdPvMultiriesgo"].ToString();
                    rsCotizacionResultado.EstadoMultiriesgo = rdr["EstadoMultiriesgo"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoMultiriesgo"]);
                    rsCotizacionResultado.IdPvEquipoMaquinaria = rdr["IdPvEquipoMaquinaria"].ToString();
                    rsCotizacionResultado.EstadoEquipoMaquinaria = rdr["EstadoEquipoMaquinaria"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoEquipoMaquinaria"]);
                    rsCotizacionResultado.IdPvResponsabilidadCivil = rdr["IdPvResponsabilidadCivil"].ToString();
                    rsCotizacionResultado.EstadoResponsabilidadCivil = rdr["EstadoResponsabilidadCivil"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoResponsabilidadCivil"]);
                    rsCotizacionResultado.IdPvFidelidad = rdr["IdPvFidelidad"].ToString();
                    rsCotizacionResultado.EstadoFidelidad = rdr["EstadoFidelidad"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoFidelidad"]);
                    rsCotizacionResultado.IdPvAccidentesPersonales = rdr["IdPvAccidentesPersonales"].ToString();
                    rsCotizacionResultado.EstadoAccidentesPersonales = rdr["EstadoAccidentesPersonales"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoAccidentesPersonales"]);
                    rsCotizacionResultado.IdPvTransInterno = rdr["IdPvTransInterno"].ToString();
                    rsCotizacionResultado.EstadoTransInterno = rdr["EstadoTransInterno"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransInterno"]);
                    rsCotizacionResultado.IdPvTransImportaciones = rdr["IdPvTransImportaciones"].ToString();
                    rsCotizacionResultado.EstadoTransImportaciones = rdr["EstadoTransImportaciones"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransImportaciones"]);
                    rsCotizacionResultado.IdPvVehiculos = rdr["IdPvVehiculos"].ToString();
                    rsCotizacionResultado.EstadoVehiculos = rdr["EstadoVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoVehiculos"]);
                    rsCotizacionResultado.EstadoGlobal = rdr["EstadoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoGlobal"]);
                    rsCotizacionResultado.EstadoPagoGlobal = rdr["EstadoPagoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoPagoGlobal"]);
                    rsCotizacionResultado.FechaEmision = rdr["FechaEmision"].ToString();


                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contratante = rsContratante;
                    rsCotizacion.Pagador = rsPagador;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;
                    rsCotizacion.CotizacionResultado = rsCotizacionResultado;
                    rsCotizacion.FormaPago = rsFormaPago;

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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

        public static List<EBroCotizacion> BroConsultaFiltroUsuario(EAuxiliares datos)
        {
            List<EBroCotizacion> lstCotizacion = new List<EBroCotizacion>();

            EBroCotizacion rsCotizacion;
            EAdmBroker rsBroker;
            EBroEmpresa rsEmpresa;
            EBroContenido rsContenido;
            EBroDireccion rsDireccion;
            EBroVehiculo rsVehiculos;
            EBroCotizacionResultado rsCotizacionResultado;
            EBroFormaPago rsFormaPago;
            EBroContratante rsContratante;
            EBroPagador rsPagador;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaCotizacionEmpresaComplementos WHERE IdBroker = @IdBroker AND IdUsuario = @IdUsuario " + datos.Cadena, getCnn());
                cmd.Parameters.AddWithValue("@IdBroker", datos.IdBroker);
                cmd.Parameters.AddWithValue("@IdUsuario", datos.IdUsuario);
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rsCotizacion = new EBroCotizacion();
                    rsBroker = new EAdmBroker();
                    rsEmpresa = new EBroEmpresa();
                    rsContenido = new EBroContenido();
                    rsDireccion = new EBroDireccion();
                    rsVehiculos = new EBroVehiculo();
                    rsCotizacionResultado = new EBroCotizacionResultado();
                    rsFormaPago = new EBroFormaPago();
                    rsContratante = new EBroContratante();
                    rsPagador = new EBroPagador();

                    rsCotizacion.IdCotizacion = rdr["IdCotizacion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = rdr["Estado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.IdUsuario = rdr["IdUsuario"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.Antiguedad = rdr["Antiguedad"].ToString();
                    rsCotizacion.Corredor = rdr["Corredor"].ToString();
                    rsCotizacion.FechaCompleta = rdr["FechaCompleta"].ToString();

                    rsEmpresa.IdEmpresa = rdr["IdEmpresa"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();

                    rsContratante.Cedula = rdr["CedulaContratante"].ToString();
                    rsContratante.Nombre = rdr["NombreContratante"].ToString();
                    rsContratante.PrimerApellido = rdr["PrimerApellidoContratante"].ToString();
                    rsContratante.SegundoApellido = rdr["SegundoApellidoContratante"].ToString();

                    rsPagador.Cedula = rdr["CedulaPagador"].ToString();
                    rsPagador.Nombre = rdr["NombrePagador"].ToString();
                    rsPagador.PrimerApellido = rdr["PrimerApellidoPagador"].ToString();
                    rsPagador.SegundoApellido = rdr["SegundoApellidoPagador"].ToString();

                    rsBroker.IdBroker = rdr["IdBroker"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdBroker"]);

                    rsContenido.IdContenido = rdr["IdContenido"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.VistaValores = rdr["VistaValores"].ToString();
                    rsContenido.EstadoGarantias = rdr["EstadoGarantia"].ToString();
                    rsContenido.EstadoCondiciones = rdr["EstadoCondiciones"].ToString();

                    rsFormaPago.Plataforma = rdr["Plataforma"].ToString();
                    rsFormaPago.CodigoAutenticacion = rdr["CodigoAutenticacion"].ToString();
                    rsFormaPago.Referencia = rdr["Referencia"].ToString();
                    rsFormaPago.Lote = rdr["Lote"].ToString();
                    rsFormaPago.Voucher = rdr["Voucher"].ToString();
                    rsFormaPago.Diferidos = rdr["Diferidos"].ToString();
                    rsFormaPago.Intereses = rdr["Intereses"].ToString();
                    rsFormaPago.Trama = rdr["Trama"].ToString();
                    rsFormaPago.Fecha = rdr["FechaPago"].ToString();
                    rsFormaPago.Tipo = rdr["TipoPago"].ToString();

                    rsDireccion.IdDireccion = rdr["IdDireccion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdDireccion"]);

                    rsVehiculos.IdVehiculos = rdr["IdVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdVehiculos"]);

                    rsCotizacionResultado.IdCotizacionResultado = rdr["IdCotizacionResultado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacionResultado"]);

                    rsCotizacionResultado.IdPvMultiriesgo = rdr["IdPvMultiriesgo"].ToString();
                    rsCotizacionResultado.EstadoMultiriesgo = rdr["EstadoMultiriesgo"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoMultiriesgo"]);
                    rsCotizacionResultado.IdPvEquipoMaquinaria = rdr["IdPvEquipoMaquinaria"].ToString();
                    rsCotizacionResultado.EstadoEquipoMaquinaria = rdr["EstadoEquipoMaquinaria"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoEquipoMaquinaria"]);
                    rsCotizacionResultado.IdPvResponsabilidadCivil = rdr["IdPvResponsabilidadCivil"].ToString();
                    rsCotizacionResultado.EstadoResponsabilidadCivil = rdr["EstadoResponsabilidadCivil"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoResponsabilidadCivil"]);
                    rsCotizacionResultado.IdPvFidelidad = rdr["IdPvFidelidad"].ToString();
                    rsCotizacionResultado.EstadoFidelidad = rdr["EstadoFidelidad"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoFidelidad"]);
                    rsCotizacionResultado.IdPvAccidentesPersonales = rdr["IdPvAccidentesPersonales"].ToString();
                    rsCotizacionResultado.EstadoAccidentesPersonales = rdr["EstadoAccidentesPersonales"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoAccidentesPersonales"]);
                    rsCotizacionResultado.IdPvTransInterno = rdr["IdPvTransInterno"].ToString();
                    rsCotizacionResultado.EstadoTransInterno = rdr["EstadoTransInterno"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransInterno"]);
                    rsCotizacionResultado.IdPvTransImportaciones = rdr["IdPvTransImportaciones"].ToString();
                    rsCotizacionResultado.EstadoTransImportaciones = rdr["EstadoTransImportaciones"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransImportaciones"]);
                    rsCotizacionResultado.IdPvVehiculos = rdr["IdPvVehiculos"].ToString();
                    rsCotizacionResultado.EstadoVehiculos = rdr["EstadoVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoVehiculos"]);
                    rsCotizacionResultado.EstadoGlobal = rdr["EstadoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoGlobal"]);
                    rsCotizacionResultado.EstadoPagoGlobal = rdr["EstadoPagoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoPagoGlobal"]);
                    rsCotizacionResultado.FechaEmision = rdr["FechaEmision"].ToString();


                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contratante = rsContratante;
                    rsCotizacion.Pagador = rsPagador;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;
                    rsCotizacion.CotizacionResultado = rsCotizacionResultado;
                    rsCotizacion.FormaPago = rsFormaPago;

                    lstCotizacion.Add(rsCotizacion);

                }
                rdr.Close();
                return lstCotizacion;
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

        public static EBroCotizacion ConsultaCotizacionEmpresaComplementos(int IdContenido, int IdCotizacion, int IdDireccion, int IdVehiculos, int IdEmpresa)
        {
            List<KeyValuePair<string, object>> lista = new List<KeyValuePair<string, object>>();

            EBroCotizacion rsCotizacion = new EBroCotizacion();
            EAdmBroker rsBroker = new EAdmBroker();
            EBroEmpresa rsEmpresa = new EBroEmpresa();
            EBroContenido rsContenido = new EBroContenido();
            EBroDireccion rsDireccion = new EBroDireccion();
            EBroVehiculo rsVehiculos = new EBroVehiculo();
            EBroPagador rsPagador = new EBroPagador();
            EBroContratante rsContratante = new EBroContratante();
            EBroFormaPago rsFormaPago = new EBroFormaPago();
            EBroCotizacionResultado rsCotizacionResultado = new EBroCotizacionResultado();
            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaCotizacionEmpresaComplementos WHERE IdContenido = @IdContenido AND IdCotizacion = @IdCotizacion AND IdDireccion = @IdDireccion AND IdVehiculos = @IdVehiculos AND IdEmpresa = @IdEmpresa", getCnn());
                cmd.Parameters.AddWithValue("@IdContenido", IdContenido);
                cmd.Parameters.AddWithValue("@IdCotizacion", IdCotizacion);
                cmd.Parameters.AddWithValue("@IdDireccion", IdDireccion);
                cmd.Parameters.AddWithValue("@IdVehiculos", IdVehiculos);
                cmd.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rsCotizacion.IdCotizacion = Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaNetaIva12 = rdr["PrimaNetaIva12"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaIva12"]);
                    rsCotizacion.PrimaNetaIva0 = rdr["PrimaNetaIva0"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaIva0"]);
                    rsCotizacion.PrimaNetaTotal = rdr["PrimaNetaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaTotal"]);
                    rsCotizacion.ImpuestoSBS = rdr["ImpuestoSBS"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ImpuestoSBS"]);
                    rsCotizacion.ImpuestoCampesino = rdr["ImpuestoCampesino"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ImpuestoCampesino"]);
                    rsCotizacion.DerechosEmision = rdr["DerechosEmision"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["DerechosEmision"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Iva = rdr["Iva"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Iva"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.IdPago = rdr["IdPago"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdPago"]);
                    rsCotizacion.Corredor = rdr["Corredor"].ToString();

                    rsEmpresa.IdEmpresa = Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Nombre = rdr["NombreEmpresa"].ToString();
                    rsEmpresa.PrimerApellido = rdr["PrimerApellidoEmpresa"].ToString();
                    rsEmpresa.SegundoApellido = rdr["SegundoApellidoEmpresa"].ToString();
                    rsEmpresa.CodigoAsegurado = rdr["CodigoAsegurado"].ToString();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);

                    rsContenido.IdContenido = Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.DatosCotizador = rdr["DatosCotizador"].ToString();
                    rsContenido.Lista = rdr["Lista"].ToString();
                    rsContenido.VistaDiseno = rdr["VistaDiseno"].ToString();
                    rsContenido.VistaEstado = rdr["VistaEstado"].ToString();
                    rsContenido.VistaValores = rdr["VistaValores"].ToString();

                    rsDireccion.IdDireccion = Convert.ToInt32(rdr["IdDireccion"]);
                    rsDireccion.DatosDireccion = rdr["DatosDireccion"].ToString();

                    rsVehiculos.IdVehiculos = Convert.ToInt32(rdr["IdVehiculos"]);
                    rsVehiculos.DatosVehiculo = rdr["DatosVehiculo"].ToString();

                    rsPagador.IdPagador = rdr["IdPagador"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdPagador"]);
                    rsPagador.Cedula = rdr["CedulaPagador"].ToString();
                    rsPagador.Nombre = rdr["NombrePagador"].ToString();
                    rsPagador.PrimerApellido = rdr["PrimerApellidoPagador"].ToString();
                    rsPagador.SegundoApellido = rdr["SegundoApellidoPagador"].ToString();
                    rsPagador.Direccion = rdr["DireccionPagador"].ToString();
                    rsPagador.Telefono = rdr["TelefonoPagador"].ToString();
                    rsPagador.Email = rdr["EmailPagador"].ToString();

                    rsContratante.IdContratante = rdr["IdContratante"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdContratante"]);
                    rsContratante.Cedula = rdr["CedulaContratante"].ToString();
                    rsContratante.Nombre = rdr["NombreContratante"].ToString();
                    rsContratante.PrimerApellido = rdr["PrimerApellidoContratante"].ToString();
                    rsContratante.SegundoApellido = rdr["SegundoApellidoContratante"].ToString();
                    rsContratante.Direccion = rdr["DireccionContratante"].ToString();
                    rsContratante.Telefono = rdr["TelefonoContratante"].ToString();
                    rsContratante.Email = rdr["EmailContratante"].ToString();

                    rsFormaPago.IdFormaPago = rdr["FormaPagoIdFormaPago"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["FormaPagoIdFormaPago"]);
                    rsFormaPago.IdPago = rdr["FormaPagoIdPago"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["FormaPagoIdPago"]);
                    rsFormaPago.Estado = rdr["FormaPagoEstado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["FormaPagoEstado"]);
                    rsFormaPago.Tipo = rdr["FormaPagoTipo"].ToString();
                    rsFormaPago.Adjunto = rdr["FormaPagoAdjunto"].ToString();
                    rsFormaPago.AdjuntoTipo = rdr["FormaPagoAdjuntoTipo"].ToString();

                    rsFormaPago.Plataforma = rdr["Plataforma"].ToString();
                    rsFormaPago.CodigoAutenticacion = rdr["CodigoAutenticacion"].ToString();
                    rsFormaPago.Referencia = rdr["Referencia"].ToString();
                    rsFormaPago.Lote = rdr["Lote"].ToString();
                    rsFormaPago.Voucher = rdr["Voucher"].ToString();
                    rsFormaPago.Diferidos = rdr["Diferidos"].ToString();
                    rsFormaPago.Intereses = rdr["Intereses"].ToString();
                    rsFormaPago.Trama = rdr["Trama"].ToString();
                    rsFormaPago.Fecha = rdr["FechaPago"].ToString();

                    rsCotizacionResultado.IdCotizacionResultado = rdr["IdCotizacionResultado"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacionResultado"]);

                    rsCotizacionResultado.IdPvMultiriesgo = rdr["IdPvMultiriesgo"].ToString();
                    rsCotizacionResultado.EstadoMultiriesgo = rdr["EstadoMultiriesgo"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoMultiriesgo"]);
                    rsCotizacionResultado.IdPvEquipoMaquinaria = rdr["IdPvEquipoMaquinaria"].ToString();
                    rsCotizacionResultado.EstadoEquipoMaquinaria = rdr["EstadoEquipoMaquinaria"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoEquipoMaquinaria"]);
                    rsCotizacionResultado.IdPvResponsabilidadCivil = rdr["IdPvResponsabilidadCivil"].ToString();
                    rsCotizacionResultado.EstadoResponsabilidadCivil = rdr["EstadoResponsabilidadCivil"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoResponsabilidadCivil"]);
                    rsCotizacionResultado.IdPvFidelidad = rdr["IdPvFidelidad"].ToString();
                    rsCotizacionResultado.EstadoFidelidad = rdr["EstadoFidelidad"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoFidelidad"]);
                    rsCotizacionResultado.IdPvAccidentesPersonales = rdr["IdPvAccidentesPersonales"].ToString();
                    rsCotizacionResultado.EstadoAccidentesPersonales = rdr["EstadoAccidentesPersonales"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoAccidentesPersonales"]);
                    rsCotizacionResultado.IdPvTransInterno = rdr["IdPvTransInterno"].ToString();
                    rsCotizacionResultado.EstadoTransInterno = rdr["EstadoTransInterno"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransInterno"]);
                    rsCotizacionResultado.IdPvTransImportaciones = rdr["IdPvTransImportaciones"].ToString();
                    rsCotizacionResultado.EstadoTransImportaciones = rdr["EstadoTransImportaciones"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoTransImportaciones"]);
                    rsCotizacionResultado.IdPvVehiculos = rdr["IdPvVehiculos"].ToString();
                    rsCotizacionResultado.EstadoVehiculos = rdr["EstadoVehiculos"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoVehiculos"]);
                    rsCotizacionResultado.EstadoGlobal = rdr["EstadoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoGlobal"]);
                    rsCotizacionResultado.EstadoPagoGlobal = rdr["EstadoPagoGlobal"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["EstadoPagoGlobal"]);
                    rsCotizacionResultado.FechaEmision = rdr["FechaEmision"].ToString();

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;
                    rsCotizacion.Pagador = rsPagador;
                    rsCotizacion.Contratante = rsContratante;
                    rsCotizacion.FormaPago = rsFormaPago;
                    rsCotizacion.CotizacionResultado = rsCotizacionResultado;

                }
                rdr.Close();
                return rsCotizacion;
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

        public static EBroCotizacion ConsultaCotizacionCompleta(int IdContenido, int IdCotizacion, int IdDireccion, int IdVehiculos, int IdEmpresa)
        {

            EBroCotizacion rsCotizacion = new EBroCotizacion();
            EAdmBroker rsBroker = new EAdmBroker();
            EBroEmpresa rsEmpresa = new EBroEmpresa();
            EBroContenido rsContenido = new EBroContenido();
            EBroDireccion rsDireccion = new EBroDireccion();
            EBroVehiculo rsVehiculos = new EBroVehiculo();

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ConsultaCotizacionEmpresaComplementos WHERE IdContenido = @IdContenido AND IdCotizacion = @IdCotizacion AND IdDireccion = @IdDireccion AND IdVehiculos = @IdVehiculos AND IdEmpresa = @IdEmpresa", getCnn());
                cmd.Parameters.AddWithValue("@IdContenido", IdContenido);
                cmd.Parameters.AddWithValue("@IdCotizacion", IdCotizacion);
                cmd.Parameters.AddWithValue("@IdDireccion", IdDireccion);
                cmd.Parameters.AddWithValue("@IdVehiculos", IdVehiculos);
                cmd.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rsCotizacion.IdCotizacion = Convert.ToInt32(rdr["IdCotizacion"]);
                    rsCotizacion.PrimaNetaIva12 = rdr["PrimaNetaIva12"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaIva12"]);
                    rsCotizacion.PrimaNetaIva0 = rdr["PrimaNetaIva0"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaIva0"]);
                    rsCotizacion.PrimaNetaTotal = rdr["PrimaNetaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaNetaTotal"]);
                    rsCotizacion.ImpuestoSBS = rdr["ImpuestoSBS"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ImpuestoSBS"]);
                    rsCotizacion.ImpuestoCampesino = rdr["ImpuestoCampesino"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["ImpuestoCampesino"]);
                    rsCotizacion.DerechosEmision = rdr["DerechosEmision"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["DerechosEmision"]);
                    rsCotizacion.PrimaTotal = rdr["PrimaTotal"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["PrimaTotal"]);
                    rsCotizacion.Iva = rdr["Iva"] == DBNull.Value ? 0 : Convert.ToDouble(rdr["Iva"]);
                    rsCotizacion.Codigo = rdr["Codigo"].ToString();
                    rsCotizacion.Estado = Convert.ToInt32(rdr["Estado"]);
                    rsCotizacion.Fecha = rdr["Fecha"].ToString();
                    rsCotizacion.IdUsuario = Convert.ToInt32(rdr["IdUsuario"]);
                    rsCotizacion.Corredor = rdr["Corredor"].ToString();

                    rsEmpresa.IdEmpresa = Convert.ToInt32(rdr["IdEmpresa"]);
                    rsEmpresa.RazonSocial = rdr["RazonSocial"].ToString();
                    rsEmpresa.Ruc = rdr["Ruc"].ToString();
                    rsEmpresa.Telefono = rdr["Telefono"].ToString();
                    rsEmpresa.Email = rdr["Email"].ToString();
                    rsEmpresa.GiroNegocio = rdr["GiroNegocio"].ToString();
                    rsEmpresa.SectorEconomico = rdr["SectorEconomico"].ToString();
                    rsEmpresa.Riesgo = Convert.ToInt32(rdr["Riesgo"]);
                    rsEmpresa.Siniestralidad = rdr["Siniestralidad"].ToString();

                    rsBroker.IdBroker = Convert.ToInt32(rdr["IdBroker"]);
                    rsBroker.RazonSocial = rdr["RazonSocialBroker"].ToString();
                    rsBroker.Foto = rdr["Foto"].ToString();

                    rsContenido.IdContenido = Convert.ToInt32(rdr["IdContenido"]);
                    rsContenido.DatosCotizador = rdr["DatosCotizador"].ToString();
                    rsContenido.DatosGarantias = rdr["DatosGarantias"].ToString();
                    rsContenido.DatosCondiciones = rdr["DatosCondiciones"].ToString();
                    rsContenido.Lista = rdr["Lista"].ToString();
                    rsContenido.VistaDiseno = rdr["VistaDiseno"].ToString();
                    rsContenido.VistaEstado = rdr["VistaEstado"].ToString();
                    rsContenido.VistaValores = rdr["VistaValores"].ToString();

                    rsDireccion.IdDireccion = Convert.ToInt32(rdr["IdDireccion"]);
                    rsDireccion.DatosDireccion = rdr["DatosDireccion"].ToString();

                    rsVehiculos.IdVehiculos = Convert.ToInt32(rdr["IdVehiculos"]);
                    rsVehiculos.DatosVehiculo = rdr["DatosVehiculo"].ToString();

                    rsCotizacion.Broker = rsBroker;
                    rsCotizacion.Empresa = rsEmpresa;
                    rsCotizacion.Contenido = rsContenido;
                    rsCotizacion.Vehiculo = rsVehiculos;
                    rsCotizacion.Direccion = rsDireccion;

                }
                rdr.Close();
                return rsCotizacion;
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

        public static EBroCotizacion BroConsultaEstadoCotizacion(int IdCotizacion)
        {
            EBroCotizacion rsCotizacion = new EBroCotizacion();

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT Estado FROM Cotizacion WHERE IdCotizacion = @IdCotizacion", getCnn());
                cmd.Parameters.AddWithValue("@IdCotizacion", IdCotizacion);
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rsCotizacion.Estado = Convert.ToInt32(rdr["Estado"]);

                }
                rdr.Close();
                return rsCotizacion;
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

        public static int BroGestionCotizacionActualizacion(int IdCotizacion)
        {

            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("GestionCotizacionActualizacion", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = 1;
                cmd.Parameters["@idCotizacion"].Value = IdCotizacion;

                cmd.ExecuteNonQuery();

                return Convert.ToInt32(cmd.Parameters["@valor"].Value);

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

        public static string enviaEmail(EBroCorreoElectronico correo)
        {
            string resultado = "0";


            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("CORREOELECTRONICO", EGloGlobales.ambiente);

            MailMessage mensaje = new MailMessage();
            SmtpClient cliente = new SmtpClient(credenciales.Origen);

            cliente.Host = credenciales.Origen;
            cliente.Port = Convert.ToInt32(credenciales.Usuario);
            cliente.EnableSsl = true;
            cliente.Timeout = 100000;

            mensaje.IsBodyHtml = true;
            mensaje.SubjectEncoding = System.Text.Encoding.UTF8;
            mensaje.BodyEncoding = System.Text.Encoding.UTF8;
            mensaje.Priority = MailPriority.Normal;


            string correos = correo.Para;
            string[] lstCorreos = correos.Split(';');

            if (lstCorreos.Length > 1)
            {
                foreach (string dest in lstCorreos)
                {
                    mensaje.To.Add(dest);
                }
            }
            else
            {
                mensaje.To.Add(correo.Para);
            }

            mensaje.Subject = correo.Asunto;
            mensaje.Body = correo.Mensaje;
            mensaje.From = new MailAddress(credenciales.UsuarioNombre);
            cliente.Credentials = new System.Net.NetworkCredential(credenciales.UsuarioNombre, credenciales.Contrasena);

            try
            {
                cliente.Send(mensaje);
                resultado = "Exito ";
            }
            catch (SmtpException)
            {
                throw;

            }
            return resultado;
        }

        public static string BroModificarPagoCotizacion(int idCotizacion, int idPago)
        {
            string result = "0";

            try
            {

                Conectar();
                SqlCommand cmd = new SqlCommand();

                string query = @"UPDATE [dbo].[Cotizacion] SET [IdPago] = @idPago WHERE [IdCotizacion] = @idCotizacion";

                cmd = new SqlCommand(query, getCnn());
                cmd.Parameters.AddWithValue("@idPago", idPago);
                cmd.Parameters.AddWithValue("@idCotizacion", idCotizacion);

                cmd.ExecuteNonQuery();

                result = idCotizacion + "";
            }
            catch (SqlException)
            {
                throw;
            }
            finally
            {
                Cerrar();
            }

            return result;
        }

        public static int BroConsultaCotizacionEmitida(string ruc)
        {
            int cotizacion = 0;

            try
            {
                Conectar();

                SqlCommand cmd = new SqlCommand("SELECT IdCotizacion FROM ConsultaCotizacionEmitida WHERE Ruc = @ruc", getCnn());
                cmd.Parameters.AddWithValue("@ruc", ruc);
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    cotizacion = rdr["IdCotizacion"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["IdCotizacion"]);

                }
                rdr.Close();
                return cotizacion;
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

        public static string BroValidarDocumentoListarNegras(string documento)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("VERIFICARLISTASNEGRAS", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";

            string Head = "<AuthenticationHeader xmlns=\"http://tempuri.org/SecureService/SecureService\">"
                          + "<UserName>" + credenciales.UsuarioNombre + "</UserName>"
                          + "<Password>" + credenciales.Contrasena + "</Password>"
                        + "</AuthenticationHeader>";

            string Body = ("<ConsultarClienteEnListasNegrasInternacionales xmlns=\"http://tempuri.org/SecureService/SecureService\">"
                          + "<sUSERCODE>USRPYMES</sUSERCODE>"
                          + "<sDocId>" + documento + "</sDocId>"
                          + "<sNom1></sNom1>"
                          + "<sNom2></sNom2>"
                          + "<sApe1></sApe1>"
                          + "<sApe2></sApe2>"
                          + "<sOrigen>USRPYMES</sOrigen>"
                          + "<bEnviarEmailCumplimiento>true</bEnviarEmailCumplimiento>"
                        + "</ConsultarClienteEnListasNegrasInternacionales>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAPCompleto(ServicioURL, AccionSOAP, Head, Body);

            return Resultado;
        }

        public static string BroValidarDocumentoDeudas(int asegurado)
        {
            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("DEUDACLIENTE", EGloGlobales.ambiente);

            string ServicioURL = credenciales.Url; ;
            string AccionSOAP = credenciales.Accion;

            string Resultado = "";


            string Body = ("<ObtenerDeudaCliente xmlns=\"http://www.segurosequinoccial.com/\">"
                             + "<cod_aseg>" + asegurado + "</cod_aseg>"
                         + "</ObtenerDeudaCliente>");

            Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;
        }

        public static string BroEliminacionDatosCotizacion(EAuxiliares auxiliares)
        {
            try
            {
                Conectar();
                SqlCommand cmd = new SqlCommand("EliminacionDatosCotizacion", getCnn());
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@identificador", SqlDbType.Int, 1);

                cmd.Parameters.Add("@idContratante", SqlDbType.Int);
                cmd.Parameters.Add("@idPagador", SqlDbType.Int);
                cmd.Parameters.Add("@idDireccion", SqlDbType.Int);
                cmd.Parameters.Add("@idVehiculos", SqlDbType.Int);
                cmd.Parameters.Add("@idContenido", SqlDbType.Int);
                cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);

                cmd.Parameters.Add("@valor", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.Parameters["@identificador"].Value = auxiliares.Identificador;

                cmd.Parameters["@idContratante"].Value = auxiliares.IdContratante;
                cmd.Parameters["@idPagador"].Value = auxiliares.IdPagador;
                cmd.Parameters["@idDireccion"].Value = auxiliares.IdDireccion;
                cmd.Parameters["@idVehiculos"].Value = auxiliares.IdVehiculos;
                cmd.Parameters["@idContenido"].Value = auxiliares.IdContenido;
                cmd.Parameters["@idCotizacion"].Value = auxiliares.IdCotizacion;

                cmd.ExecuteNonQuery();

                return cmd.Parameters["@valor"].Value.ToString();

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
