using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Text;

namespace SegurosEquinoccial.Pymes.Controlador.Administracion
{
    public class CAdmUsuarios
    {
        //VERIFICACIÓN USUARIO
        public static List<EAdmUsuarios> AdmVerificacionUsuario(EAdmUsuarios usuario)
        {
            return DAdmUsuarios.AdmVerificacionUsuario(usuario);
        }

        public static EAdmUsuarios BroGestionUsuario(EAdmUsuarios pusuario)
        {
            return DAdmUsuarios.BroGestionUsuario(pusuario);
        }

        public static List<EAdmUsuarios> BroConsultarUsuariosDependientes(int idPadre)
        {
            return DAdmUsuarios.BroConsultarUsuariosDependientes(idPadre);
        }

        public static List<EAdmUsuarios> BroConsultarUsuariosDependientesOperadores(EBroResumen pResumen)
        {
            return DAdmUsuarios.BroConsultarUsuariosDependientesOperadores(pResumen);
        }

        public static List<EAdmUsuarios> BroListarUsuarios()
        {
            return DAdmUsuarios.BroListarUsuarios();
        }

        public static List<EAdmUsuarios> BroListarUsuariosBroker(string IdBroker)
        {
            return DAdmUsuarios.BroListarUsuariosBroker(IdBroker);
        }
    }
}
