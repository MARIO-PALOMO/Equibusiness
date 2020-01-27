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
    public class EBroReglas
    {
        [DataMember]
        public int IdReglas { get; set; }

        [DataMember]
        [Required]
        public EBroSubRamo SubRamo { get; set; }

        [DataMember]
        [Required]
        public double LimiteIndividual { get; set; }

        [DataMember]
        [Required]
        public double LimiteGrupal { get; set; }

        [DataMember]
        [Required]
        public double LimiteGlobal { get; set; }

        [DataMember]
        [Required]
        public double LimiteVertical { get; set; }

        [DataMember]
        [Required]
        public double LimiteProvincial { get; set; }

        [DataMember]
        [Required]
        public double Porcentaje { get; set; }

        [DataMember]
        [Required]
        public string CodigoSubRamoDependiente { get; set; }

        [DataMember]
        [Required]
        public string CodigoSubRamoMandatorio { get; set; }

        [DataMember]
        [Required]
        public string Descripcion { get; set; }

        [DataMember]
        [Required]
        public string Identificador { get; set; }

        [DataMember]
        [Required]
        public string ListaRamo { get; set; }

        [DataMember]
        [Required]
        public string ListaSubRamo { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

    }
}
