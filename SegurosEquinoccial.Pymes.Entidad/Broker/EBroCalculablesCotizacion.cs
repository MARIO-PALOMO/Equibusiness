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
    public class EBroCalculablesCotizacion
    {
        [DataMember]
        public int IdCatalogoValoresCotizacion { get; set; }

        [DataMember]
        [Required]
        public double ImpuestoSBS { get; set; }

        [DataMember]
        [Required]
        public double ImpuestoCampesino { get; set; }

        [DataMember]
        [Required]
        public double Iva { get; set; }
    }
}
