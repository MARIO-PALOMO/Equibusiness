using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using SegurosEquinoccial.Pymes.Controlador;
using SegurosEquinoccial.Pymes.Controlador.Administracion;
using SegurosEquinoccial.Pymes.Controlador.Broker;
using SegurosEquinoccial.Pymes.Controlador.Polizas.Multiriesgo;
using SegurosEquinoccial.Pymes.Controlador.Polizas.Pago;
using SegurosEquinoccial.Pymes.Controlador.Polizas.Validaciones;
using SegurosEquinoccial.Pymes.Controlador.Polizas.Vehiculos;
using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;

namespace SegurosEquinoccial.Pymes.Servicio.Broker
{
    [Serializable]
    [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
    public class SBroker : ISBroker
    {
        //RAMOS
        //CONSULTAR RAMOS
        public List<EBroRamo> BroConsultaDescripcionRamos(string IdBroker)
        {
            return CBroRamo.BroConsultaDescripcionRamos(Convert.ToInt32(IdBroker));
        }
        //CONSULTAR RAMOS CON SUS SUBRAMOS
        public List<EBroSubRamo> BroConsultaDescripcionRamosSubramos(string IdBroker)
        {
            return CBroRamo.BroConsultaDescripcionRamosSubramos(Convert.ToInt32(IdBroker));
        }
        //CONSULTAR SUBRAMOS TRANSPORTE
        public List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporte(string IdBroker)
        {
            return CBroRamo.BroConsultaDescripcionSubRamosTransporte(Convert.ToInt32(IdBroker));
        }

        //TASA
        //CONSULTAR LAS TASAS DE CADA SUBRAMO
        public List<EBroTasa> BroConsultaTasasRamosSubramos(string IdBroker)
        {
            return CBroTasa.BroConsultaTasasRamosSubramos(Convert.ToInt32(IdBroker));
        }

        //TASA VEHICULO
        //CONSULTAR TASAS VEHICULO
        public List<EBroTasaVehiculo> BroConsultaTasasRamosVehiculo(string IdBroker)
        {
            return CBroTasa.BroConsultaTasasRamosVehiculo(Convert.ToInt32(IdBroker));
        }

        //REGLAS
        //CONSULTAR LAS REGLAS DE CADA SUBRAMO
        public List<EBroReglas> ConsultaReglasRamosSubramos(string IdBroker)
        {
            return CBroReglas.ConsultaReglasRamosSubramos(Convert.ToInt32(IdBroker));
        }

        //REGLAS ADICIONALES
        //CONSULTAR LAS REGLAS ADICIONALES DE CADA SUBRAMO
        public List<EBroReglasAdicionales> ConsultaReglasAdicionalesRamosSubramos(string IdBroker)
        {
            return CBroReglas.ConsultaReglasAdicionalesRamosSubramos(Convert.ToInt32(IdBroker));
        }

        //SECTOR ECONOMICO
        //CONSULTAR SECTORES ECONOMICOS
        public List<EBroSectorEconomico> BroConsultaSectorEconomico()
        {
            return CBroSectorEconomico.BroConsultaSectorEconomico();
        }

        //PROVINCIAS
        //CONSULTAR PROVINCIAS
        public List<EBroProvincia> BroConsultaProvincias()
        {
            return CBroProvincia.BroConsultaProvincias();
        }


        //EMPRESA CATALOGO
        //GUARDAR EMPRESA CATALOGO
        public EBroCatalogoEmpresa BroGestionCatalogoEmpresa(EBroCatalogoEmpresa pEmpresa)
        {
            return CBroCatalogoEmpresa.BroGestionCatalogoEmpresa(pEmpresa);
        }

        //BUSCAR EMPRESA CATALOGO
        public EBroCatalogoEmpresa BroConsultaEmpresaCatalogo(string ruc)
        {
            return CBroCatalogoEmpresa.BroConsultaEmpresaCatalogo(ruc);
        }

        //EMPRESA
        //GUARDAR EMPRESA 
        public EBroEmpresa BroGestionEmpresa(EBroEmpresa pEmpresa)
        {
            return CBroEmpresa.BroGestionEmpresa(pEmpresa);
        }

        //CONSULTAR EMPRESA 
        public List<EBroCotizacion> BroConsultaEmpresa(string cotizacion, string broker, string empresa)
        {
            return CBroEmpresa.BroConsultaEmpresa(Convert.ToInt32(cotizacion), Convert.ToInt32(broker), Convert.ToInt32(empresa));
        }

        //CONSULTAR EMPRESA PYMES
        public EBroEmpresa BroConsultarEmpresaPymes(string ruc)
        {
            return CBroEmpresa.BroConsultarEmpresaPymes(ruc);
        }

        //CONSULTAR EMPRESA SERVICIO SOAP
        public string BroConsultaEmpresaServicio(string ruc)
        {
            return CBroEmpresa.BroConsultaEmpresaServicio(ruc);
        }

        //CONSULTAR EMPRESA/PERSONA SERVICIO REST AZURE
        public async Task<string> BroConsultarEmpresaPersonaServicio(string Cedula_)
        {
            string resultado = await CBroEmpresa.BroConsultarEmpresaPersonaServicio(Cedula_);
            return resultado;
        }

        //CONTENIDO: DATOS DE CADA UNO DE LOS RAMOS COTIZADOS
        //GUARDAR CONTENIDO
        public EBroContenido BroGestionContenido(EBroContenido pcontenido)
        {
            return CBroContenido.BroGestionContenido(pcontenido);
        }

        //BUSCAR CONTENIDO - CONDICIONES Y GARANTIAS
        public EBroContenido BroConsultarContenidoGarantiasCondiciones(string IdContenido)
        {
            return CBroContenido.BroConsultarContenidoGarantiasCondiciones(Convert.ToInt32(IdContenido));
        }

        //COTIZACION
        //CONSULTAR EL TOTAL DE REGISTROS EN LA TABLA COTIZACION
        public int BroTotalRegistrosCotizacion(string IdBroker)
        {
            return CBroCotizacion.BroTotalRegistrosCotizacion(Convert.ToInt32(IdBroker));
        }

        //CONSULTAR DATOS SEMI COMPLETOS DE LA COTIZACION
        public EBroCotizacion ConsultaCotizacionEmpresaComplementos(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa)
        {
            return CBroCotizacion.ConsultaCotizacionEmpresaComplementos(Convert.ToInt32(IdContenido), Convert.ToInt32(IdCotizacion), Convert.ToInt32(IdDireccion), Convert.ToInt32(IdVehiculos), Convert.ToInt32(IdEmpresa));
        }

        //CONSULTAR DATOS COMPLETOS DE LA COTIZACION
        public EBroCotizacion ConsultaCotizacionCompleta(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa)
        {
            return CBroCotizacion.ConsultaCotizacionCompleta(Convert.ToInt32(IdContenido), Convert.ToInt32(IdCotizacion), Convert.ToInt32(IdDireccion), Convert.ToInt32(IdVehiculos), Convert.ToInt32(IdEmpresa));
        }

        //CONSULTAR ESTADO DE LA COTIZACION
        public EBroCotizacion BroConsultaEstadoCotizacion(string IdCotizacion)
        {
            return CBroCotizacion.BroConsultaEstadoCotizacion(Convert.ToInt32(IdCotizacion));
        }

        //ACTUALIZAR PAGO DE LA COTIZACION
        public string BroModificarPagoCotizacion(string idCotizacion, string idPago)
        {
            return CBroCotizacion.BroModificarPagoCotizacion(Convert.ToInt32(idCotizacion), Convert.ToInt32(idPago));
        }

        //GUARDAR COTIZACION 
        public EBroCotizacion BroGestionCotizacion(EBroCotizacion pCotizacion)
        {
            return CBroCotizacion.BroGestionCotizacion(pCotizacion);
        }

        //DIRECCIONES
        //GESTIONAR DIRECCIONES
        public EBroDireccion BroGestionDireccion(EBroDireccion pdireccion)
        {
            return CBroDireccion.BroGestionDireccion(pdireccion);
        }

        //VEHICULOS
        //GESTIONAR VEHICULOS
        public EBroVehiculo BroGestionVehiculo(EBroVehiculo pvehiculo)
        {
            return CBroVehiculo.BroGestionVehiculo(pvehiculo);
        }

        //BUSCAR VEHICULOS ANT
        public async Task<string> BroObtenerVehiculosANTAsync(string Placa)
        {
            string resultado = await CBroVehiculo.BroObtenerVehiculosANT(Placa);
            return resultado;
        }

        //BUSCAR VEHICULOS PYMES
        public EBroCatalogoVehiculos BroObtenerVehiculosPYMES(string Placa_)
        {
            return CBroVehiculo.BroObtenerVehiculosPYMES(Placa_);
        }

        //GUARDAR VEHICULOS PYMES
        public EBroCatalogoVehiculos BroGestionCatalogoVehiculo(EBroCatalogoVehiculos vehiculos)
        {
            return CBroVehiculo.BroGestionCatalogoVehiculo(vehiculos);
        }

        //CONSULTA LAS COTIZACIONES GENERADAS POR USUARIO
        public List<EBroCotizacion> BroConsultaCotizacionesUsuario(string idBroker, string idUsuario, string numeroPaginas, string tamanoPaginas, string estadoCotizacion)
        {
            return CBroCotizacion.BroConsultaCotizacionesUsuario(Convert.ToInt32(idBroker), Convert.ToInt32(idUsuario), Convert.ToInt32(numeroPaginas), Convert.ToInt32(tamanoPaginas), Convert.ToInt32(estadoCotizacion));
        }

        //CONSULTAR DERECHOS DE EMISION
        public List<EBroDerechosEmision> BroConsultaDerechosEmision()
        {
            return CBroCatalogos.BroConsultaDerechosEmision();
        }

        //CONSULTAR CALCULABLES COTIZACION
        public List<EBroCalculablesCotizacion> BroConsultaCalculablesCotizacion()
        {
            return CBroCatalogos.BroConsultaCalculablesCotizacion();
        }

        //CONSULTAR LOS VALORES COMPLEMENTARIOS A LA COTZACION DEL BROKER (INICIO, GIROS, GARANTIAS, CONDICIONES)
        public List<EBroComplementos> BroConsultaDescripcionComplementos(string identificador, int broker)
        {
            return CBroComplementos.BroConsultaDescripcionComplementos(identificador, broker);
        }

        public string enviaEmail(EBroCorreoElectronico correo)
        {
            return CBroCotizacion.enviaEmail(correo);
        }

        public EBroReglasGenerales BroConsultaReglasGenerales(string idBroker, string nombre)
        {
            return CBroReglasGenerales.BroConsultaReglasGenerales(Convert.ToInt32(idBroker), nombre);
        }

        //AGREGAR CATALOGO CEDULAS
        public EBroCatalogoCedulas BroGestionCatalogoCedulas(EBroCatalogoCedulas pcedulas)
        {
            return CBroCatalogos.BroGestionCatalogoCedulas(pcedulas);
        }

        //BUSCAR CEDULA EN EL CATALOGO
        public EBroCatalogoCedulas BroConsultaCatalogoCedula(string cedula)
        {
            return CBroCatalogos.BroConsultaCatalogoCedula(cedula);
        }

        public EBroPagador BroGestionPagador(EBroPagador pPagador)
        {
            return CBroPagador.BroGestionPagador(pPagador);
        }

        public EBroPagador BroConsultarPagador(string cedula, string idCotizacion)
        {
            return CBroPagador.BroConsultarPagador(cedula, Convert.ToInt32(idCotizacion));
        }

        public EBroContratante BroGestionContratante(EBroContratante pContratante)
        {
            return CBroContratante.BroGestionContratante(pContratante);
        }

        public EBroContratante BroConsultarContratante(string cedula, string idCotizacion)
        {
            return CBroContratante.BroConsultarContratante(cedula, Convert.ToInt32(idCotizacion));
        }

        public EBroFormaPago BroGestionFormaPago(EBroFormaPago pPago)
        {
            return CBroFormaPago.BroGestionFormaPago(pPago);
        }

        public int adjuntarArchivo(EBroFormaPago pago)
        {
            return CBroFormaPago.adjuntarArchivo(pago);
        }

        public EBroFormaPago BroConsultarFormaPago(string idFormaPago)
        {
            return CBroFormaPago.BroConsultarFormaPago(Convert.ToInt32(idFormaPago));
        }

        public List<EAdmUsuarios> BroConsultarUsuariosDependientes(string idPadre)
        {
            return CAdmUsuarios.BroConsultarUsuariosDependientes(Convert.ToInt32(idPadre));
        }

        public List<EAdmUsuarios> BroConsultarUsuariosDependientesOperadores(EBroResumen pResumen)
        {
            return CAdmUsuarios.BroConsultarUsuariosDependientesOperadores(pResumen);
        }

        public List<EBroCotizacion> BroConsultarResumenCotizacionesUsuarios(EBroResumen pResumen)
        {
            return CBroResumen.BroConsultarResumenCotizacionesUsuarios(pResumen);
        }

        public List<EBroCotizacion> BroConsultarResumenGlobalCotizacionesUsuarios(EBroResumen pResumen)
        {
            return CBroResumen.BroConsultarResumenGlobalCotizacionesUsuarios(pResumen);
        }

        public List<EAdmUsuarios> BroConsultaUsuariosTotalCiudad(EBroResumen pResumen)
        {
            return CBroResumen.BroConsultaUsuariosTotalCiudad(pResumen);
        }

        public List<EBroCotizacion> BroconsultarTotalCotizacionesOperador(EBroResumen pResumen)
        {
            return CBroResumen.BroconsultarTotalCotizacionesOperador(pResumen);
        }

        public List<EBroCotizacion> BroconsultarParametrosTotalCotizacionesOperador(EBroResumen pResumen)
        {
            return CBroResumen.BroconsultarParametrosTotalCotizacionesOperador(pResumen);
        }

        //COVIERTE EL JSON STRING A UN JSON Y SE LE ASIGNA A UNA CLASE OBJETO
        public string GetDataUsingDataContract(string composite)
        {
            JavaScriptSerializer js2 = new JavaScriptSerializer();
            EBroCotizacion cotizacion = js2.Deserialize<EBroCotizacion>(composite);
            int id = cotizacion.IdCotizacion;
            return id + "";
        }

        public EBroCotizacion BroValidarEmpresaCotizacion(string ruc)
        {
            return CBroEmpresa.BroValidarEmpresaCotizacion(ruc);
        }

        public string BroEmitirPolizaMultiriesgo(EAuxiliares aux)
        {
            return CPoMultiriesgo.BroEmitirPolizaMultiriesgo(aux);
        }

        public List<EBroClausulas> BroConsultaClausulasRamos(EAuxiliares aux)
        {
            return CBroClausulas.BroConsultaClausulasRamos(aux);
        }

        public string BroConsultarPagadorEmision(string aux)
        {
            return CPolPago.BroConsultarPagador(aux);
        }

        public string BroConsultarValorPagar(string aux)
        {
            return CPolPago.BroConsultarValorPagar(aux);
        }

        public string BroAplicarPago(EAuxiliares aux)
        {
            return CPolPago.BroAplicarPago(aux);
        }

        public string BroValidarFormularioVinculacion(EAuxiliares datos)
        {
            return CPolPago.BroValidarFormularioVinculacion(datos);
        }

        public string BroObtenerCodigoAsegurado(string documento)
        {
            return CPolPago.BroObtenerCodigoAsegurado(documento);
        }

        public EBroCotizacionResultado BroGestionCotizacionResultado(EBroCotizacionResultado pCotResultado)
        {
            return CBroCotizacionResultado.BroGestionCotizacionResultado(pCotResultado);
        }

        public async Task<string> BroInsertarIncisos(EBroTextos texto)
        {
            string resultado = await CBroTextos.BroInsertarIncisos(texto);
            return resultado;
        }

        public async Task<string> BroInsertarAclaratorios(EBroTextos texto)
        {
            string resultado = await CBroTextos.BroInsertarAclaratorios(texto);
            return resultado;
        }

        public int BroActualziarDatosCatalogoEmpresa(EBroCatalogoEmpresa empresa)
        {
            return CBroCatalogoEmpresa.BroActualziarDatosCatalogoEmpresa(empresa);
        }

        public async Task<string> BroActualizarEmpresaPersonaServicio(EAuxiliares datos)
        {
            string resultado = await CBroEmpresa.BroActualizarEmpresaPersonaServicio(datos);
            return resultado;
        }

        public string BroValidarDocumentoDeudas(string asegurado)
        {
            return CBroCotizacion.BroValidarDocumentoDeudas(Convert.ToInt32(asegurado));
        }

        public List<EBroCatalogoAccesorios> BroConsultaAccesorios()
        {
            return CBroCatalogos.BroConsultaAccesorios();
        }

        public async Task<string> ingresarDatosVehiculo(EAuxiliares vehiculos)
        {
            string resultado = await CPolVehiculos.ingresarDatosVehiculo(vehiculos);
            return resultado;
        }

        public async Task<string> generarPolizaVehiculo(EAuxiliares vehiculos)
        {
            string resultado = await CPolVehiculos.generarPolizaVehiculo(vehiculos);
            return resultado;
        }

        public async Task<string> ObtenerPolizaVigenteVehiculos(string placa)
        {
            string resultado = await CPolVehiculos.ObtenerPolizaVigenteVehiculos(placa);
            return resultado;
        }

        public string BroAplicarPago5Polizas(EAuxiliares aux)
        {
            return CPolPago.BroAplicarPago5Polizas(aux);
        }

        public string BroEliminacionDatosCotizacion(EAuxiliares auxiliares)
        {
            return CBroCotizacion.BroEliminacionDatosCotizacion(auxiliares);
        }

        public List<EAdmUsuarios> BroListarUsuarios()
        {
            return CAdmUsuarios.BroListarUsuarios();
        }

        public List<EAdmBroker> BroListarBrokers()
        {
            return CBroBroker.BroListarBrokers();
        }

        public string BroObtenerCodigoAgente(string codigo)
        {
            return CBroBroker.BroObtenerCodigoAgente(codigo);
        }

        public List<EBroCatalogoCiudades> BroConsultaCatalogoCuidades()
        {
            return CBroCatalogos.BroConsultaCatalogoCuidades();
        }

        public List<EBroCatalogoSucursal> BroConsultaCatalogoSucursal()
        {
            return CBroCatalogos.BroConsultaCatalogoSucursal();
        }

        public EBroCotizacion BroGestionCotizacionCorredor(EBroCotizacion pCotizacion)
        {
            return CBroCotizacion.BroGestionCotizacionCorredor(pCotizacion);
        }

        public string BroValidarComrpromisos(EAuxiliares aux)
        {
            return CPolValidaciones.BroValidarComrpromisos(aux);
        }

        public string BroValidarPolizaVigenteSise(EAuxiliares aux)
        {
            return CPolValidaciones.BroValidarPolizaVigenteSise(aux);
        }

        public string BroRegistrarCompromiso(EAuxiliares aux)
        {
            return CBroCompromiso.BroRegistrarCompromiso(aux);
        }

        public string BroObtenerAgente(string codigo, string agente)
        {
            return CBroBroker.BroObtenerAgente(codigo, agente);
        }

        public int BroGestionCotizacionActualizacion(string IdCotizacion)
        {
            return CBroCotizacion.BroGestionCotizacionActualizacion(Convert.ToInt32(IdCotizacion));
        }

        public string BroObtenerBancoConductos()
        {
            return CPolPago.BroObtenerBancoConductos();
        }

        public string BroObtenerPlanPagoCuotas(string conducto)
        {
            return CPolPago.BroObtenerPlanPagoCuotas(conducto);
        }

        public string BroObtenerNumeroCuotas(string codigo)
        {
            return CPolPago.BroObtenerNumeroCuotas(codigo);
        }

        public List<EBroCatalogoProvincias> BroConsultaCatalogoProvincias()
        {
            return CBroCatalogos.BroConsultaCatalogoProvincias();
        }

        public string BroCerrarCompromiso(EAuxiliares aux)
        {
            return CBroCompromiso.BroCerrarCompromiso(aux);
        }

        public List<EBroReporteUsuarios> ReporteListarUsuarios(string IdBroker)
        {
            return CBroReportes.ReporteListarUsuarios(IdBroker);
        }

        public List<EBroReporteCotizaciones> ReporteListarCotizacionesBroker(string IdBroker, string estado)
        {
            return CBroReportes.ReporteListarCotizacionesBroker(IdBroker, estado);
        }

        public List<EBroReporteEmisiones> ReporteListarEmisionesBroker(string IdBroker, string estado)
        {
            return CBroReportes.ReporteListarEmisionesBroker(IdBroker, estado);
        }

        public string ReporteCiudadBroker(string IdBroker)
        {
            return CBroReportes.ReporteCiudadBroker(IdBroker);
        }

        public string ReporteListarCiudadesCotizacionesBroker(string IdBroker)
        {
            return CBroReportes.ReporteListarCiudadesCotizacionesBroker(IdBroker);
        }

        public string ReporteListarCiudadesEmisionesBroker(string IdBroker)
        {
            return CBroReportes.ReporteListarCiudadesEmisionesBroker(IdBroker);
        }

        public string ReporteCiudadBrokerCotizaciones(string IdBroker, string estado)
        {
            return CBroReportes.ReporteCiudadBrokerCotizaciones(IdBroker, estado);
        }
        public string ReporteCiudadBrokerEmisiones(string IdBroker, string estado)
        {
            return CBroReportes.ReporteCiudadBrokerEmisiones(IdBroker, estado);
        }

        public string DetalleValoresCotizacionesBrokerCiudad(EBroReporteDetalleValoresBroker datos)
        {
            return CBroReportes.DetalleValoresCotizacionesBrokerCiudad(datos);
        }
        
        public string DetalleValoresEmisionesBrokerCiudad(EBroReporteDetalleValoresBroker datos)
        {
            return CBroReportes.DetalleValoresEmisionesBrokerCiudad(datos);
        }
        
        public int BroGestionExcepciones(EBroExcepciones excepcion)
        {
            return DBroExcepciones.BroGestionExcepciones(excepcion);
        }

        public List<EBroCotizacion> BroReValidarEmpresaCotizacion(string ruc)
        {
            return CBroEmpresa.BroReValidarEmpresaCotizacion(ruc);
        }

        public List<EBroCotizacion> BroConsultaFiltroUsuario(EAuxiliares datos)
        {
            return CBroCotizacion.BroConsultaFiltroUsuario(datos);
        }
    }
}