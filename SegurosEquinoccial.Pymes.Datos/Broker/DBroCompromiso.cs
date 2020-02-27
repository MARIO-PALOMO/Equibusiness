using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Datos.Gestion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Datos.Broker
{
    public class DBroCompromiso
    {
        public static string BroRegistrarCompromiso(EAuxiliares aux)
        {

            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("REGISTRARCOMPROMISO", EGloGlobales.ambiente);
            string ServicioURL = credenciales.Url;
            string AccionSOAP = credenciales.Accion;

            string Head = ("<AuthenticationHeader xmlns=\"http://tempuri.org/SecureService/SecureService\">"
                                + "<UserName>" + credenciales.Usuario + "</UserName>"
                          + "<Password>" + credenciales.Contrasena + "</Password>"
                        + "</AuthenticationHeader>");

            string Body = ("<AdministrarOportunidadWeb xmlns=\"http://tempuri.org/SecureService/SecureService\">"
                                + "<Pa>" + aux.XMLCompromiso + "</Pa>"
                        + "</AdministrarOportunidadWeb>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAPCompleto(ServicioURL, AccionSOAP, Head, Body);

            return Resultado;

        }

        public static string BroCerrarCompromiso(EAuxiliares aux)
        {

            EAdmCatalogoCredenciales credenciales = DAdmCredenciales.AdmConsultarCatalogoCredenciales("CERRARCOMPROMISO", EGloGlobales.ambiente);
            string ServicioURL = credenciales.Url;
            string AccionSOAP = credenciales.Accion;

            string Body = ("<CerrarOportunidadGenerico xmlns=\"http://tempuri.org/\">"
                            + "<objparam>"
                                + "<codUusario>" + credenciales.Usuario + "</codUusario>"
                                + "<FechaCierre>" + aux.CFecha + "</FechaCierre>"
                                + "<EstadoCierre>Cerrada - Ganada</EstadoCierre> "
                                + "<MotivoCierre>" + aux.CMotivo + "</MotivoCierre>"
                                + "<NotasdeCierre>" + aux.CNotas + "</NotasdeCierre>"
                                + "<Identificador>1</Identificador>"
                                + "<valor>" + aux.CValor + "</valor>"
                            + "</objparam>"
                        + "</CerrarOportunidadGenerico>");

            string Resultado = DAdmConexionSOAP.BroEjecutarSolicitudWebSOAP(ServicioURL, AccionSOAP, Body);

            return Resultado;

        }
    }
}
