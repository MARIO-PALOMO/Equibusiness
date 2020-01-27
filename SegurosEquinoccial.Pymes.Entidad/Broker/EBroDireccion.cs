using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroDireccion
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdDireccion { get; set; }

        [DataMember]
        [Required]
        public string DatosDireccion { get; set; }

        [DataMember]
        [Required]
        public EBroCotizacion Cotizacion { get; set; }
    }
}
