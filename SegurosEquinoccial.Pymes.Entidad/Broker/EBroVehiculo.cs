using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroVehiculo
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdVehiculos { get; set; }

        [DataMember]
        [Required]
        public string DatosVehiculo { get; set; }

        [DataMember]
        [Required]
        public EBroCotizacion Cotizacion { get; set; }
    }
}
