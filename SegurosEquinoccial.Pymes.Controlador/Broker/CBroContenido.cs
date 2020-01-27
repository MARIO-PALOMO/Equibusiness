using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroContenido
    {
        public static EBroContenido BroGestionContenido(EBroContenido pcontenido)
        {
            return DBroContenido.BroGestionContenido(pcontenido);
        }

        public static EBroContenido BroConsultarContenidoGarantiasCondiciones(int IdContenido)
        {
            return DBroContenido.BroConsultarContenidoGarantiasCondiciones(IdContenido);
        }
    }
}
