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
    public class EBroTasaVehiculo
    {

        [DataMember]
        public int IdTasaVehiculo { get; set; }

        [DataMember]
        [Required]
        public EBroRamo Ramo { get; set; }

        [DataMember]
        public string Tipo { get; set; }

        [DataMember]
        public int AnioInicio { get; set; }

        [DataMember]
        public int AnioFin { get; set; }

        [DataMember]
        public double Valor { get; set; }


        [DataMember]
        public string Codigo { get; set; }

        [DataMember]
        public int Estado { get; set; }
    }
}
