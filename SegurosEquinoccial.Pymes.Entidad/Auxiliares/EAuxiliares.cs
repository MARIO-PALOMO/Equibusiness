using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Auxiliares
{
    [DataContract]
    [Serializable]
    public class EAuxiliares
    {

        [DataMember]
        
        public string TramaXML { get; set; }

        [DataMember]
        
        public string IdBroker { get; set; }

        [DataMember]
        
        public string TramaRamos { get; set; }

        [DataMember]
        
        public string sucursal { get; set; }

        [DataMember]
        
        public string IdPv { get; set; }

        [DataMember]
        
        public string canal { get; set; }
        [DataMember]
        
        public string pagador { get; set; }
        [DataMember]
        
        public string tarjeta { get; set; }
        [DataMember]
        
        public string autorizacion { get; set; }
        [DataMember]
        
        public string codigoBanco { get; set; }
        [DataMember]
        
        public string codigoConducto { get; set; }
        [DataMember]
        
        public string voucher { get; set; }
        [DataMember]
        
        public string fechaVoucher { get; set; }
        [DataMember]
        
        public string holderTarjeta { get; set; }

        [DataMember]
        
        public string valor { get; set; }

        //FORMULARIO VINCULACION

        [DataMember]
        
        public string DocumentoCliente { get; set; }

        [DataMember]
        
        public string EmailAgente { get; set; }

        [DataMember]
        
        public string CodigoAgente { get; set; }

        [DataMember]
        
        public string CodigoTipoAgente { get; set; }

        [DataMember]
        
        public string EmailCliente { get; set; }

        [DataMember]
        
        public string NombreCliente { get; set; }

        [DataMember]
        
        public string EnviarEmail { get; set; }

        //ACTUALIZAR DATOS EMPRESA/PERSONA
        [DataMember]
        
        public string JSONDatos { get; set; }


        [DataMember]
        
        public string CodActividadEconomJ { get; set; }
        [DataMember]
        
        public string CodAgente { get; set; }
        [DataMember]
        
        public string CodCiudad { get; set; }
        [DataMember]
        
        public string CodEstadoMigratorio { get; set; }
        [DataMember]
        
        public string CodOcupacionF { get; set; }
        [DataMember]
        
        public string CodPaisOrigen { get; set; }
        [DataMember]
        
        public string CodProvincia { get; set; }
        [DataMember]
        
        public string CodTipoAgente { get; set; }
        [DataMember]
        
        public string CodUsuario { get; set; }
        [DataMember]
        
        public string CodigoAsegurado { get; set; }
        [DataMember]
        
        public string Direccion { get; set; }
        [DataMember]
        
        public string DireccionGeo1 { get; set; }
        [DataMember]
        
        public string DireccionGeo2 { get; set; }
        [DataMember]
        
        public string DireccionGeo3 { get; set; }
        [DataMember]
        
        public string EMail { get; set; }
        [DataMember]
        
        public string EMailFactElectronica { get; set; }
        [DataMember]
        
        public string Estado { get; set; }
        [DataMember]
        
        public string EstadoCivil { get; set; }
        [DataMember]
        
        public string FechaExpedicionPasaporte { get; set; }
        [DataMember]
        
        public string FechaIngresoPais { get; set; }
        [DataMember]
        
        public string FechaNacimiento { get; set; }
        [DataMember]
        
        public string FechaVencimientoPasaporte { get; set; }
        [DataMember]
        
        public string Genero { get; set; }
        [DataMember]
        
        public string Nombre { get; set; }
        [DataMember]
        
        public string NroDocumento { get; set; }
        [DataMember]
        
        public string Origen { get; set; }
        [DataMember]
        
        public string PrimerApellido { get; set; }
        [DataMember]
        
        public string SegundoApellido { get; set; }
        [DataMember]
        
        public string TelefonoCelular { get; set; }
        [DataMember]
        
        public string TelefonoConvencional { get; set; }
        [DataMember]
        
        public string TipoDocumento { get; set; }
        [DataMember]
        
        public string JSONVehiculos { get; set; }
        [DataMember]
        
        public string JSONPagos { get; set; }

        //AUXILIARES ELIMINACION DETALLES COTIZACION

        [DataMember]
        
        public int Identificador { get; set; }

        [DataMember]
        
        public int IdContratante { get; set; }

        [DataMember]
        
        public int IdPagador { get; set; }

        [DataMember]
        
        public int IdDireccion { get; set; }

        [DataMember]
        
        public int IdVehiculos { get; set; }

        [DataMember]
        
        public int IdContenido { get; set; }

        [DataMember]
        
        public int IdCotizacion { get; set; }

        //AUXILIARES VALIDACIONES POLIZAS Y COTOZciones
        [DataMember]
        
        public string ValIdentificacion { get; set; }
        [DataMember]
        
        public string ValTipoAgente { get; set; }
        [DataMember]
        
        public string ValAgente { get; set; }

        [DataMember]
        
        public string XMLCompromiso { get; set; }

        //AUXILIARES CERRAR COMPROMISO
        [DataMember]
        public string CFecha { get; set; }

        [DataMember]
        public string CMotivo { get; set; }

        [DataMember]
        public string CNotas { get; set; }

        [DataMember]
        public string CValor { get; set; }
    }
}
