using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Servicio.Gestion
{

    [ServiceContract]
    public interface ISGesTransacciones
    {
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "errores/guardar")]
        string AdmVerificacionUsuario(EAdmErrores errores);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuario/gestion")]
        EAdmUsuarios BroGestionUsuario(EAdmUsuarios pusuario);

    }
}
