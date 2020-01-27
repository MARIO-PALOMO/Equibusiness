using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroSectorEconomico
    {
        [DataMember]
        public int IdSectorEconomico { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }
    }
}
