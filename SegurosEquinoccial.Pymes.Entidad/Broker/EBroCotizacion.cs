using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroCotizacion
    {

        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdCotizacion { get; set; }

        [DataMember]
        [Required]
        public double PrimaNetaIva12 { get; set; }

        [DataMember]
        [Required]
        public double PrimaNetaIva0 { get; set; }

        [DataMember]
        [Required]
        public double PrimaNetaTotal { get; set; }

        [DataMember]
        [Required]
        public double ImpuestoSBS { get; set; }

        [DataMember]
        [Required]
        public double ImpuestoCampesino { get; set; }

        [DataMember]
        [Required]
        public double DerechosEmision { get; set; }

        [DataMember]
        [Required]
        public double Iva { get; set; }

        [DataMember]
        [Required]
        public double PrimaTotal { get; set; }

        [DataMember]
        [Required]
        public EAdmBroker Broker { get; set; }

        [DataMember]
        [Required]
        public EBroEmpresa Empresa { get; set; }

        [DataMember]
        [Required]
        public string Codigo { get; set; }

        [DataMember]
        [Required]
        public string Fecha { get; set; }

        [DataMember]
        [Required]
        public string Antiguedad { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public int IdUsuario { get; set; }

        [DataMember]
        [Required]
        public int IdPago { get; set; }

        [DataMember]
        [Required]
        public string Corredor { get; set; }

        [DataMember]
        [Required]
        public EBroContenido Contenido { get; set; }

        [DataMember]
        [Required]
        public EBroDireccion Direccion { get; set; }

        [DataMember]
        [Required]
        public EBroVehiculo Vehiculo { get; set; }

        [DataMember]
        [Required]
        public EBroPagador Pagador { get; set; }

        [DataMember]
        [Required]
        public EBroContratante Contratante { get; set; }

        [DataMember]
        [Required]
        public EBroFormaPago FormaPago { get; set; }


        [DataMember]
        [Required]
        public EAdmUsuarios Usuario { get; set; }


        [DataMember]
        [Required]
        public EBroCotizacionResultado CotizacionResultado { get; set; }
    }
}
