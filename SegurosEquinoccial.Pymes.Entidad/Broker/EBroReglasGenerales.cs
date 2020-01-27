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
    public class EBroReglasGenerales
    {

        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdReglasGenerales { get; set; }

        [DataMember]
        [Required]
        public double Igual { get; set; }

        [DataMember]
        [Required]
        public double Mayor { get; set; }

        [DataMember]
        [Required]
        public double Menor { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }

        [DataMember]
        [Required]
        public EAdmBroker Broker { get; set; }
    }
}
