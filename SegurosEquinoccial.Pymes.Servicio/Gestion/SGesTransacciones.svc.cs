using System;
using System.Collections.Generic;
using System.ServiceModel;
using SegurosEquinoccial.Pymes.Controlador.Administracion;
using SegurosEquinoccial.Pymes.Controlador.Pagos;
using SegurosEquinoccial.Pymes.Entidad.Administracion;

namespace SegurosEquinoccial.Pymes.Servicio.Gestion
{
    [Serializable]
    [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
    public class SGesTransacciones : ISGesTransacciones
    {
        public string AdmVerificacionUsuario(EAdmErrores errores)
        {
            return CAdmErrores.AdmAlmacenarErrores(errores);
        }

        public EAdmUsuarios BroGestionUsuario(EAdmUsuarios pusuario)
        {
            return CAdmUsuarios.BroGestionUsuario(pusuario);
        }
    }
}
