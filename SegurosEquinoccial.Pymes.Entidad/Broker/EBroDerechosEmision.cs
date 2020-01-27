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
    public class EBroDerechosEmision
    {
        [DataMember]
        public int IdCatalogoDerechosAdmision { get; set; }

        [DataMember]
        [Required]
        public int Desde { get; set; }

        [DataMember]
        [Required]
        public int Hasta { get; set; }

        [DataMember]
        [Required]
        public double Valor { get; set; }
    }
}
