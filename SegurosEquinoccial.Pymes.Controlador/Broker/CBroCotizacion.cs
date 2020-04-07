using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroCotizacion
    {
        public static int BroTotalRegistrosCotizacion(int IdBroker)
        {
            return DBroCotizacion.BroTotalRegistrosCotizacion(IdBroker);
        }

        public static EBroCotizacion BroGestionCotizacion(EBroCotizacion pCotizacion)
        {
            return DBroCotizacion.BroGestionCotizacion(pCotizacion);
        }

        public static EBroCotizacion BroGestionCotizacionCorredor(EBroCotizacion pCotizacion)
        {
            return DBroCotizacion.BroGestionCotizacionCorredor(pCotizacion);
        }

        public static List<EBroCotizacion> BroConsultaCotizacionesUsuario(int idBroker, int idUsuario, int numeroPaginas, int tamanoPaginas, int estadoCotizacion)
        {
            return DBroCotizacion.BroConsultaCotizacionesUsuario(idBroker, idUsuario, numeroPaginas, tamanoPaginas, estadoCotizacion);
        }

        public static List<EBroCotizacion> BroConsultaFiltroUsuario(EAuxiliares datos)
        {
            return DBroCotizacion.BroConsultaFiltroUsuario(datos);
        }

        public static EBroCotizacion ConsultaCotizacionEmpresaComplementos(int IdContenido, int IdCotizacion, int IdDireccion, int IdVehiculos, int IdEmpresa)
        {
            return DBroCotizacion.ConsultaCotizacionEmpresaComplementos(IdContenido, IdCotizacion, IdDireccion, IdVehiculos, IdEmpresa);
        }

        public static EBroCotizacion ConsultaCotizacionCompleta(int IdContenido, int IdCotizacion, int IdDireccion, int IdVehiculos, int IdEmpresa)
        {
            return DBroCotizacion.ConsultaCotizacionCompleta(IdContenido, IdCotizacion, IdDireccion, IdVehiculos, IdEmpresa);
        }

        public static EBroCotizacion BroConsultaEstadoCotizacion(int IdCotizacion)
        {
            return DBroCotizacion.BroConsultaEstadoCotizacion(IdCotizacion);
        }

        public static string enviaEmail(EBroCorreoElectronico correo)
        {
            return DBroCotizacion.enviaEmail(correo);
        }

        public static string BroModificarPagoCotizacion(int idCotizacion, int idPago)
        {
            return DBroCotizacion.BroModificarPagoCotizacion(idCotizacion, idPago);
        }

        public static int BroConsultaCotizacionEmitida(string ruc)
        {
            return DBroCotizacion.BroConsultaCotizacionEmitida(ruc);
        }

        public static string BroValidarDocumentoListarNegras(string documento)
        {
            return DBroCotizacion.BroValidarDocumentoListarNegras(documento);
        }

        public static string BroValidarDocumentoDeudas(int asegurado)
        {
            return DBroCotizacion.BroValidarDocumentoDeudas(asegurado);
        }

        public static string BroEliminacionDatosCotizacion(EAuxiliares auxiliares)
        {
            return DBroCotizacion.BroEliminacionDatosCotizacion(auxiliares);
        }

        public static int BroGestionCotizacionActualizacion(int IdCotizacion)
        {
            return DBroCotizacion.BroGestionCotizacionActualizacion(IdCotizacion);
        }
    }
}
