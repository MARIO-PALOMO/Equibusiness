using SegurosEquinoccial.Pymes.Entidad.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Auxiliares;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Servicio.Broker
{
    [ServiceContract]
    public interface ISBroker
    {
        //RAMOS
        //CONSULTAR RAMOS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarRamos/{IdBroker}")]
        List<EBroRamo> BroConsultaDescripcionRamos(string IdBroker);

        //CONSULTAR RAMOS CON SUS SUBRAMOS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarRamosSubramos/{IdBroker}")]
        List<EBroSubRamo> BroConsultaDescripcionRamosSubramos(string IdBroker);

        //CONSULTAR SUBRAMOS TRANSPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarSubramosTrasporte/{IdBroker}")]
        List<EBroSubRamoTransporte> BroConsultaDescripcionSubRamosTransporte(string IdBroker);

        //TASA
        //CONSULTAR LAS TASAS DE CADA SUBRAMO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarTasasSubramos/{IdBroker}")]
        List<EBroTasa> BroConsultaTasasRamosSubramos(string IdBroker);

        //TASA VEHICULO
        //CONSULTAR TASA VEHICULO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarTasasVehiculos/{IdBroker}")]
        List<EBroTasaVehiculo> BroConsultaTasasRamosVehiculo(string IdBroker);

        //REGLAS
        //CONSULTAR LAS REGLAS DE CADA SUBRAMO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarReglasSubramos/{IdBroker}")]
        List<EBroReglas> ConsultaReglasRamosSubramos(string IdBroker);

        //REGLAS ADICIONALES
        //CONSULTAR LAS REGLAS ADICIONALES DE CADA SUBRAMO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "ramo/listarReglasAdicionalesSubramos/{IdBroker}")]
        List<EBroReglasAdicionales> ConsultaReglasAdicionalesRamosSubramos(string IdBroker);

        //SECTOR ECONOMICO
        //CONSULTAR SECTORES ECONOMICOS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "sectorEconomico/listarSectores")]
        List<EBroSectorEconomico> BroConsultaSectorEconomico();

        //PROVINCIAS
        //CONSULTAR PROVINCIAS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "provincias/listarProvincias")]
        List<EBroProvincia> BroConsultaProvincias();

        //EMPRESA CATALOGO
        //GUARDAR EMPRESA CATALOGO
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/catalogo/guardar/registro")]
        EBroCatalogoEmpresa BroGestionCatalogoEmpresa(EBroCatalogoEmpresa pEmpresa);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/catalogo/modificar/registro")]
        int BroActualziarDatosCatalogoEmpresa(EBroCatalogoEmpresa empresa);

        //BUSCAR EMPRESA CATALOGO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/catalogo/buscar/registro/{ruc}")]
        EBroCatalogoEmpresa BroConsultaEmpresaCatalogo(string ruc);


        //EMPRESA
        //GUARDAR EMPRESA
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/guardar/registro")]
        EBroEmpresa BroGestionEmpresa(EBroEmpresa pEmpresa);

        //CONSULTAR EMPRESA
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/consultar?cotizacion={cotizacion}&broker={broker}&empresa={empresa}")]
        List<EBroCotizacion> BroConsultaEmpresa(string cotizacion, string broker, string empresa);

        //CONSULTAR EMPRESA PYMES
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/pymes/consultar/{ruc}")]
        EBroEmpresa BroConsultarEmpresaPymes(string ruc);

        //VALIDAR EMPRESA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/cotizacion/validar/{ruc}")]
        EBroCotizacion BroValidarEmpresaCotizacion(string ruc);

        //CONSULTAR EMPRESA SERVICIO SOAP
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/servicio/consultar/{ruc}")]
        string BroConsultaEmpresaServicio(string ruc);

        //CONSULTAR EMPRESA/PERSONA SERVICIO REST AZURE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/persona/servicio/consultar/{documento}")]
        Task<string> BroConsultarEmpresaPersonaServicio(string documento);

        //ACTUALIZAR DATOS EMPRESA/PERSONA SERVICIO REST AZURE
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/persona/servicio/actualizar")]
        Task<string> BroActualizarEmpresaPersonaServicio(EAuxiliares datos);

        //CONTENIDO: DATOS DE CADA UNO DE LOS RAMOS COTIZADOS
        //GESTIONAR CONTENIDO
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/contenido/gestion")]
        EBroContenido BroGestionContenido(EBroContenido pcontenido);

        //BUSCAR CONTENIDO CONDICIONES Y GARANTIAS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/contenido/consultar/{IdContenido}")]
        EBroContenido BroConsultarContenidoGarantiasCondiciones(string IdContenido);

        //DIRECCIONES
        //GESTIONAR DIRECCIONES
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/direccion/gestion")]
        EBroDireccion BroGestionDireccion(EBroDireccion pdireccion);

        //VEHICULOS
        //GESTIONAR VEHICULOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/vehiculo/gestion")]
        EBroVehiculo BroGestionVehiculo(EBroVehiculo pvehiculo);

        //CONSULTAR VEHICULOS ANT
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/vehiculo/consultar/ant/{Placa}")]
        Task<string> BroObtenerVehiculosANTAsync(string Placa);

        //CONSULTAR VEHICULOS PYMES
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/vehiculo/consultar/pymes/{Placa_}")]
        EBroCatalogoVehiculos BroObtenerVehiculosPYMES(string Placa_);

        //GUARDAR VEHICULOS PYMES
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "empresa/vehiculo/guardar/pymes")]
        EBroCatalogoVehiculos BroGestionCatalogoVehiculo(EBroCatalogoVehiculos vehiculos);

        //COTIZACION
        //CONSULTAR EL TOTAL DE REGISTROS EN LA TABLA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/totalRegistros/{IdBroker}")]
        int BroTotalRegistrosCotizacion(string IdBroker);

        //CONSULTAR DATOS SEMI COMPLETOS DE LA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/resgistros?idContenido={IdContenido}&idCotizacion={IdCotizacion}&idDireccion={IdDireccion}&idVehiculos={IdVehiculos}&idEmpresa={IdEmpresa}")]
        EBroCotizacion ConsultaCotizacionEmpresaComplementos(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa);

        //CONSULTAR DATOS COMPLETOS DE LA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/completa/resgistros?idContenido={IdContenido}&idCotizacion={IdCotizacion}&idDireccion={IdDireccion}&idVehiculos={IdVehiculos}&idEmpresa={IdEmpresa}")]
        EBroCotizacion ConsultaCotizacionCompleta(string IdContenido, string IdCotizacion, string IdDireccion, string IdVehiculos, string IdEmpresa);

        //CONSULTAR ESTADO DE LA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/buscar/estado/{IdCotizacion}")]
        EBroCotizacion BroConsultaEstadoCotizacion(string IdCotizacion);

        //ACTUALIZAR PAGO DE LA COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/actualizar/pago?cotizacion={IdCotizacion}&pago={idPago}")]
        string BroModificarPagoCotizacion(string idCotizacion, string idPago);

        //GUARDAR COTIZACION
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/guardar/registro")]
        EBroCotizacion BroGestionCotizacion(EBroCotizacion pCotizacion);

        //CONSULTA LAS COTIZACIONES GENERADAS POR USUARIO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/consultar/usuario?broker={broker}&usuario={usuario}")]
        List<EBroCotizacion> BroConsultaCotizacionesUsuario(string broker, string usuario);

        //COMPLEMENTOS
        //CONSULTAR LOS VALORES COMPLEMENTARIOS A LA COTZACION DEL BROKER (INICIO, GIROS, GARANTIAS, CONDICIONES, SINIESTROS)
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "complementos/consultar?identificador={identificador}&broker={broker}")]
        List<EBroComplementos> BroConsultaDescripcionComplementos(string identificador, int broker);

        //CATALOGOS
        //CONSULTAR ACCESORIO VEHICULOS
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "catalogos/accesorios/vehiculos")]
        List<EBroCatalogoAccesorios> BroConsultaAccesorios();

        //CONSULTAR DERECHOS DE EMISION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "catalogos/emision")]
        List<EBroDerechosEmision> BroConsultaDerechosEmision();

        //CONSULTAR CALCULABLES COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "catalogos/cotizacion")]
        List<EBroCalculablesCotizacion> BroConsultaCalculablesCotizacion();

        //ENVIA CORREO ELECTRONICO
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "email/enviar")]
        string enviaEmail(EBroCorreoElectronico correo);

        //CONSULTAR REGLAS GENERALES
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "broker/reglas/generales/consultar?broker={idBroker}&nombre={nombre}")]
        EBroReglasGenerales BroConsultaReglasGenerales(string idBroker, string nombre);

        //AGREGAR CATALOGO CEDULAS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/personas/ingresar")]
        EBroCatalogoCedulas BroGestionCatalogoCedulas(EBroCatalogoCedulas pcedulas);

        //BUSCAR CEDULA EN EL CATALOGO
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/personas/buscar/{cedula}")]
        EBroCatalogoCedulas BroConsultaCatalogoCedula(string cedula);

        //GESTION CRUD PAGADOR
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/pagador/gestion")]
        EBroPagador BroGestionPagador(EBroPagador pPagador);

        //BUSCAR PAGADOR
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/pagador/buscar?cedula={cedula}&cotizacion={idCotizacion}")]
        EBroPagador BroConsultarPagador(string cedula, string idCotizacion);

        //GESTION CRUD CONTRATANTE
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/contratante/gestion")]
        EBroContratante BroGestionContratante(EBroContratante pContratante);

        //BUSCAR CONTRATANTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/contratante/buscar?cedula={cedula}&cotizacion={idCotizacion}")]
        EBroContratante BroConsultarContratante(string cedula, string idCotizacion);

        //GESTION CRUD FORMA DE PAGO COTIZACION
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/pago/gestion")]
        EBroFormaPago BroGestionFormaPago(EBroFormaPago pPago);

        //ADJUNTAR ARCHIVO FORMA PAGO COTIZACION
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/pago/archivo")]
        int adjuntarArchivo(EBroFormaPago pago);

        //ADJUNTAR ARCHIVO FORMA PAGO COTIZACION
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/pago/buscar/{idFormaPago}")]
        EBroFormaPago BroConsultarFormaPago(string idFormaPago);

        //LISTAR USUARIOS DEPENDIENTES PARA SUPERVISORES
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuarios/consultar/dependientes/{idPadre}")]
        List<EAdmUsuarios> BroConsultarUsuariosDependientes(string idPadre);

        //LISTAR USUARIOS DEPENDIENTES PARA GERENTES
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuarios/consultar/dependientes/operadores")]
        List<EAdmUsuarios> BroConsultarUsuariosDependientesOperadores(EBroResumen pResumen);

        //LISTAR RESUMEN DE LA COTIZACION POR USUARIOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "resumen/consultar/cotizaciones")]
        List<EBroCotizacion> BroConsultarResumenCotizacionesUsuarios(EBroResumen pResumen);

        //LISTAR RESUMEN GLOBAL DE LA COTIZACION POR USUARIOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "resumen/global/consultar/cotizaciones")]
        List<EBroCotizacion> BroConsultarResumenGlobalCotizacionesUsuarios(EBroResumen pResumen);

        //LISTAR TOTAL DE USUARIOS POR CIUDAD Y SUPERVISOR
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "usuarios/consultar/dependientes/supervisor")]
        List<EAdmUsuarios> BroConsultaUsuariosTotalCiudad(EBroResumen pResumen);

        //LISTAR TOTAL DE COTIZACIONES EMITIDAS POR USUARIO/OPERADOR
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "resumen/consultar/cotizaciones/operador")]
        List<EBroCotizacion> BroconsultarTotalCotizacionesOperador(EBroResumen pResumen);

        //LISTAR TOTAL DE COTIZACIONES EMITIDAS POR USUARIO/OPERADOR FILTRO POR FECHA
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "resumen/consultar/parametros/cotizaciones/operador")]
        List<EBroCotizacion> BroconsultarParametrosTotalCotizacionesOperador(EBroResumen pResumen);

        //OPCION PARA OBTENER UN JSON EN STRING DESDE URL GET
        [OperationContract]
        [WebGet(UriTemplate = "GetDataUsingDataContract?composite={composite}",
        BodyStyle = WebMessageBodyStyle.Wrapped,
        RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string GetDataUsingDataContract(string composite);

        //***** INICIO EMISION ***** 

        //EMITIR POLIZA MULTIRIESGO
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "emitir/poliza/multiriesgo")]
        string BroEmitirPolizaMultiriesgo(EAuxiliares aux);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/codigo/asegurado/{documento}")]
        string BroObtenerCodigoAsegurado(string documento);

        //INSERTAR INCISOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "insertar/texto/incisos")]
        Task<string> BroInsertarIncisos(EBroTextos texto);

        //INSERTAR ACLARATORIOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "insertar/texto/aclaratorio")]
        Task<string> BroInsertarAclaratorios(EBroTextos texto);

        //VALIDAR FORMULARIO VINCULACION
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/formulario/vinculacion")]
        string BroValidarFormularioVinculacion(EAuxiliares datos);

        //CONSULTAR PAGADOR
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/pagador/{IdPv}")]
        string BroConsultarPagadorEmision(string IdPv);

        //CONSUTLAR VALOR A PAGAR
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/valor/pagar/{IdPv}")]
        string BroConsultarValorPagar(string IdPv);

        //APLICAR PAGO MAS DE 5 POLIZAS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/aplicar/pago")]
        string BroAplicarPago(EAuxiliares aux);

        //APLICAR PAGO HASTA 5 POLIZAS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/aplicar/pago/menor")]
        string BroAplicarPago5Polizas(EAuxiliares aux);

        //***** FIN EMISION ***** 

        //ACTULZAR ESTADO POLIZA Y GUARDA RESULTADO

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/resultado/gestion")]
        EBroCotizacionResultado BroGestionCotizacionResultado(EBroCotizacionResultado pCotResultado);

        //CONSULTAR CLAUSULAS

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "resumen/consultar/clausulas")]
        List<EBroClausulas> BroConsultaClausulasRamos(EAuxiliares aux);








        // INICIO CREACIÓN DE REPORTERÍA 

        //LISTAR USUARIOS POR BROKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/listar/usuarios/{IdBroker}")]
        List<EBroReporteUsuarios> ReporteListarUsuarios(string IdBroker);

        // LISTAR COTIZACIONES POR BROKER Y CIUDAD PARA EL REPORTE 
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/listar/cotizaciones?IdBroker={IdBroker}&estado={estado}")]
        List<EBroReporteCotizaciones> ReporteListarCotizacionesBroker(string IdBroker, string estado);

        // LISTAR EMISIONES POR BROKER Y CIUDAD PARA EL REPORTE 
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/listar/emisiones?IdBroker={IdBroker}&estado={estado}")]
        List<EBroReporteEmisiones> ReporteListarEmisionesBroker(string IdBroker, string estado);

        
        //LISTAR CIUDADES DE TODOS LOS USUARIOS PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/ciudad/broker/{IdBroker}")]
        string ReporteCiudadBroker(string IdBroker);

        //LISTAR CIUDADES CON COTIZACIOES POR BORKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/ciudad/broker/cotizaciones/{IdBroker}")]
        string ReporteListarCiudadesCotizacionesBroker(string IdBroker);

        //LISTAR CIUDADES CON EMISIONES POR BORKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/ciudad/broker/emisiones/{IdBroker}")]
        string ReporteListarCiudadesEmisionesBroker(string IdBroker);

        //LISTAR COTIZACIONES POR CIUDAD Y BROKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/cotizaciones/ciudad?IdBroker={IdBroker}&estado={estado}")]
        string ReporteCiudadBrokerCotizaciones(string IdBroker, string estado);

        //LISTAR EMISIONES POR CIUDAD Y BROKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/emisiones/ciudad?IdBroker={IdBroker}&estado={estado}")]
        string ReporteCiudadBrokerEmisiones(string IdBroker, string estado);


        //LISTAR DETALLE DE VALORES EN COTIZACIONES POR CIUDAD Y BROKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/datalle/valores/cotizaciones")]
        string DetalleValoresCotizacionesBrokerCiudad(EBroReporteDetalleValoresBroker datos); 

        //LISTAR DETALLE DE VALORES EN EMISIONES POR CIUDAD Y BROKER PARA EL REPORTE
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "reporte/datalle/valores/emisiones")]
        string DetalleValoresEmisionesBrokerCiudad(EBroReporteDetalleValoresBroker datos);


        // FIN CREACIÓN DE REPORTERÍA 



        //VALIDAR DEUDA DE UN CLIENTE
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/cotizacion/deudas/{asegurado}")]
        string BroValidarDocumentoDeudas(string asegurado);

        //EMISION VEHICULOS
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "vehiculos/insertar/datos")]
        Task<string> ingresarDatosVehiculo(EAuxiliares vehiculos);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "vehiculos/emitir/datos")]
        Task<string> generarPolizaVehiculo(EAuxiliares vehiculos);


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "vehiculos/consultar/poliza/{placa}")]
        Task<string> ObtenerPolizaVigenteVehiculos(string placa);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/eliminar/datos")]
        string BroEliminacionDatosCotizacion(EAuxiliares auxiliares);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/usuarios")]
        List<EAdmUsuarios> BroListarUsuarios();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/brokers")]
        List<EAdmBroker> BroListarBrokers();


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/codigo/agente/{codigo}")]
        string BroObtenerCodigoAgente(string codigo);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/catalogo/ciudades")]
        List<EBroCatalogoCiudades> BroConsultaCatalogoCuidades();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/catalogo/sucursal")]
        List<EBroCatalogoSucursal> BroConsultaCatalogoSucursal();

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/actualizar/corredor")]
        EBroCotizacion BroGestionCotizacionCorredor(EBroCotizacion pCotizacion);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/validar/compromisos/sise")]
        string BroValidarComrpromisos(EAuxiliares aux);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/validar/poliza/sise")]
        string BroValidarPolizaVigenteSise(EAuxiliares aux);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/registrar/compromisos/sise")]
        string BroRegistrarCompromiso(EAuxiliares aux);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/cerrar/compromisos/sise")]
        string BroCerrarCompromiso(EAuxiliares aux);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/nombre/agente?codigo={codigo}&agente={agente}")]
        string BroObtenerAgente(string codigo, string agente);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/actualizar/fecha/{IdCotizacion}")]
        int BroGestionCotizacionActualizacion(string IdCotizacion);


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/debito/bancos")]
        string BroObtenerBancoConductos();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/debito/cuotas/{conducto}")]
        string BroObtenerPlanPagoCuotas(string conducto);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "cotizacion/forma/debito/numero/{codigo}")]
        string BroObtenerNumeroCuotas(string codigo);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "consultar/catalogo/provincias")]
        List<EBroCatalogoProvincias> BroConsultaCatalogoProvincias();
    }

}
