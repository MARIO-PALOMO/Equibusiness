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
        [Required]
        public string TramaXML { get; set; }

        [DataMember]
        [Required]
        public string IdBroker { get; set; }

        [DataMember]
        [Required]
        public string TramaRamos { get; set; }

        [DataMember]
        [Required]
        public string sucursal { get; set; }

        [DataMember]
        [Required]
        public string IdPv { get; set; }

        [DataMember]
        [Required]
        public string canal { get; set; }
        [DataMember]
        [Required]
        public string pagador { get; set; }
        [DataMember]
        [Required]
        public string tarjeta { get; set; }
        [DataMember]
        [Required]
        public string autorizacion { get; set; }
        [DataMember]
        [Required]
        public string codigoBanco { get; set; }
        [DataMember]
        [Required]
        public string codigoConducto { get; set; }
        [DataMember]
        [Required]
        public string voucher { get; set; }
        [DataMember]
        [Required]
        public string fechaVoucher { get; set; }
        [DataMember]
        [Required]
        public string holderTarjeta { get; set; }

        [DataMember]
        [Required]
        public string valor { get; set; }

        //FORMULARIO VINCULACION

        [DataMember]
        [Required]
        public string DocumentoCliente { get; set; }

        [DataMember]
        [Required]
        public string EmailAgente { get; set; }

        [DataMember]
        [Required]
        public string CodigoAgente { get; set; }

        [DataMember]
        [Required]
        public string CodigoTipoAgente { get; set; }

        [DataMember]
        [Required]
        public string EmailCliente { get; set; }

        [DataMember]
        [Required]
        public string NombreCliente { get; set; }

        [DataMember]
        [Required]
        public string EnviarEmail { get; set; }

        //ACTUALIZAR DATOS EMPRESA/PERSONA
        [DataMember]
        [Required]
        public string JSONDatos { get; set; }


        [DataMember]
        [Required]
        public string CodActividadEconomJ { get; set; }
        [DataMember]
        [Required]
        public string CodAgente { get; set; }
        [DataMember]
        [Required]
        public string CodCiudad { get; set; }
        [DataMember]
        [Required]
        public string CodEstadoMigratorio { get; set; }
        [DataMember]
        [Required]
        public string CodOcupacionF { get; set; }
        [DataMember]
        [Required]
        public string CodPaisOrigen { get; set; }
        [DataMember]
        [Required]
        public string CodProvincia { get; set; }
        [DataMember]
        [Required]
        public string CodTipoAgente { get; set; }
        [DataMember]
        [Required]
        public string CodUsuario { get; set; }
        [DataMember]
        [Required]
        public string CodigoAsegurado { get; set; }
        [DataMember]
        [Required]
        public string Direccion { get; set; }
        [DataMember]
        [Required]
        public string DireccionGeo1 { get; set; }
        [DataMember]
        [Required]
        public string DireccionGeo2 { get; set; }
        [DataMember]
        [Required]
        public string DireccionGeo3 { get; set; }
        [DataMember]
        [Required]
        public string EMail { get; set; }
        [DataMember]
        [Required]
        public string EMailFactElectronica { get; set; }
        [DataMember]
        [Required]
        public string Estado { get; set; }
        [DataMember]
        [Required]
        public string EstadoCivil { get; set; }
        [DataMember]
        [Required]
        public string FechaExpedicionPasaporte { get; set; }
        [DataMember]
        [Required]
        public string FechaIngresoPais { get; set; }
        [DataMember]
        [Required]
        public string FechaNacimiento { get; set; }
        [DataMember]
        [Required]
        public string FechaVencimientoPasaporte { get; set; }
        [DataMember]
        [Required]
        public string Genero { get; set; }
        [DataMember]
        [Required]
        public string Nombre { get; set; }
        [DataMember]
        [Required]
        public string NroDocumento { get; set; }
        [DataMember]
        [Required]
        public string Origen { get; set; }
        [DataMember]
        [Required]
        public string PrimerApellido { get; set; }
        [DataMember]
        [Required]
        public string SegundoApellido { get; set; }
        [DataMember]
        [Required]
        public string TelefonoCelular { get; set; }
        [DataMember]
        [Required]
        public string TelefonoConvencional { get; set; }
        [DataMember]
        [Required]
        public string TipoDocumento { get; set; }
        [DataMember]
        [Required]
        public string JSONVehiculos { get; set; }
        [DataMember]
        [Required]
        public string JSONPagos { get; set; }

        //AUXILIARES ELIMINACION DETALLES COTIZACION

        [DataMember]
        [Required]
        public int Identificador { get; set; }

        [DataMember]
        [Required]
        public int IdContratante { get; set; }

        [DataMember]
        [Required]
        public int IdPagador { get; set; }

        [DataMember]
        [Required]
        public int IdDireccion { get; set; }

        [DataMember]
        [Required]
        public int IdVehiculos { get; set; }

        [DataMember]
        [Required]
        public int IdContenido { get; set; }

        [DataMember]
        [Required]
        public int IdCotizacion { get; set; }

        //AUXILIARES VALIDACIONES POLIZAS Y COTOZciones
        [DataMember]
        [Required]
        public string ValIdentificacion { get; set; }
        [DataMember]
        [Required]
        public string ValTipoAgente { get; set; }
        [DataMember]
        [Required]
        public string ValAgente { get; set; }

        [DataMember]
        [Required]
        public string XMLCompromiso { get; set; }
    }
}
