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
    public class EBroTasa
    {
        [DataMember]
        public int IdTasa { get; set; }

        [DataMember]
        [Required]
        public EBroSubRamo SubRamo { get; set; }

        [DataMember]
        [Required]
        public EBroProvincia Provincia { get; set; }

        [DataMember]
        [Required]
        public double Valor { get; set; }

        [DataMember]
        [Required]
        public double ValorMinimo { get; set; }

        [DataMember]
        [Required]
        public double ValorMaximo { get; set; }
        

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string CodigoSubramo { get; set; }
    }
}
