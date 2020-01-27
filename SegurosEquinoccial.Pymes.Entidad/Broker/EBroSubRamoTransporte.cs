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
    public class EBroSubRamoTransporte
    {
        [DataMember]
        public int IdSubRamoTransporte { get; set; }

        [DataMember]
        [Required]
        public EBroSubRamo SubRamo { get; set; }

        [DataMember]
        [Required]
        public string Tipo { get; set; }

        [DataMember]
        [Required]
        public string Descripcion { get; set; }

        [DataMember]
        [Required]
        public double LimiteInferior { get; set; }

        [DataMember]
        [Required]
        public double LimiteSuperior { get; set; }

        [DataMember]
        [Required]
        public double Tasa { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string Informacion { get; set; }

        [DataMember]
        [Required]
        public string CodigoObjetoSeguro { get; set; }
        [DataMember]
        [Required]
        public string CodigoAmparo { get; set; }
        [DataMember]
        [Required]
        public string CodigoCategoria { get; set; }
        [DataMember]
        [Required]
        public string AcumulaPrimaTotal { get; set; }
        [DataMember]
        [Required]
        public string AcumulaSumaTotal { get; set; }
        [DataMember]
        [Required]
        public string CodigosDeducibles { get; set; }

        [DataMember]
        [Required]
        public string IdentificadorAmparo { get; set; }
}
}
