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
    public class EBroDeducibles
    {
        [DataMember]
        public int IdDeducibles { get; set; }

        [DataMember]
        [Required]
        public string RiesgoMenor { get; set; }

        [DataMember]
        [Required]
        public string RiesgoMayor { get; set; }

        [DataMember]
        [Required]
        public EBroSubRamo SubRamo { get; set; }
    }
}
