using System;
using System.Collections.Generic;
using System.ServiceModel;
using SegurosEquinoccial.Pymes.Controlador.Administracion;
using SegurosEquinoccial.Pymes.Controlador.Broker;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Servicio.Gestion
{

    [Serializable]
    [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
    public class SGesConsultas : ISGesConsultas
    {
        public List<EAdmUsuarios> AdmVerificacionUsuario(EAdmUsuarios usuario)
        {
            return CAdmUsuarios.AdmVerificacionUsuario(usuario);
        }

        public List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporteUsuario(string IdBroker)
        {
            return CBroRamo.BroConsultaDescripcionSubRamosTransporte(Convert.ToInt32(IdBroker));
        }

        public EBroCotizacion ConsultaCotizacionCompletaUsuario(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa)
        {
            return CBroCotizacion.ConsultaCotizacionCompleta(Convert.ToInt32(IdContenido), Convert.ToInt32(IdCotizacion), Convert.ToInt32(IdDireccion), Convert.ToInt32(IdVehiculos), Convert.ToInt32(IdEmpresa));
        }

        public int BroConsultaCotizacionEmitida(string ruc)
        {
            return CBroCotizacion.BroConsultaCotizacionEmitida(ruc);
        }

        public string BroValidarDocumentoListarNegras(string documento)
        {
            return CBroCotizacion.BroValidarDocumentoListarNegras(documento);
        }

        public List<EBroComplementos> BroConsultaDescripcionComplementos(string identificador, int broker)
        {
            return CBroComplementos.BroConsultaDescripcionComplementos(identificador, broker);
        }
    }
}
