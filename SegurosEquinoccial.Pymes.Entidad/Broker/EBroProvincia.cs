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
    public class EBroProvincia
    {
        [DataMember]
        public int IdProvincia { get; set; }

        [DataMember]
        [Required]
        public int Codigo { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }
    }
}
