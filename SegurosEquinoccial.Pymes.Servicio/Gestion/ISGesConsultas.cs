using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Servicio.Gestion
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "ISGesConsultas" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface ISGesConsultas
    {
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuario/verificar")]
        EAdmUsuarios AdmVerificacionUsuario(EAdmUsuarios usuario);

        //CONSULTAR SUBRAMOS TRANSPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuario/ramo/listarSubramosTrasporte/{IdBroker}")]
        List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporteUsuario(string IdBroker);

        //CONSULTAR DATOS COMPLETOS DE LA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuario/cotizacion/completa/resgistros?idContenido={IdContenido}&idCotizacion={IdCotizacion}&idDireccion={IdDireccion}&idVehiculos={IdVehiculos}&idEmpresa={IdEmpresa}")]
        EBroCotizacion ConsultaCotizacionCompletaUsuario(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/consultar/vencimiento/poliza/{ruc}")]
        int BroConsultaCotizacionEmitida(string ruc);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/consultar/listas/negras/{documento}")]
        string BroValidarDocumentoListarNegras(string documento);

        //COMPLEMENTOS
        //CONSULTAR LOS VALORES COMPLEMENTARIOS A LA COTZACION DEL BROKER (INICIO, GIROS, GARANTIAS, CONDICIONES, SINIESTROS)
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "complementos/consultar?identificador={identificador}&broker={broker}")]
        List<EBroComplementos> BroConsultaDescripcionComplementos(string identificador, int broker);
    }
}
