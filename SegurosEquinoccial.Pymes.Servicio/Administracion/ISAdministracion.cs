using System.ServiceModel;
using System.ServiceModel.Web;

namespace SegurosEquinoccial.Pymes.Servicio.Administracion
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "ISAdministracion" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface ISAdministracion
    {
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "listar/{valor}")]
        string GetProductList(string valor);
    }
}
