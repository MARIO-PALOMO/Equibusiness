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
    public class EBroRamo
    {
        [DataMember]
        public int IdRamo { get; set; }

        [DataMember]
        [Required]
        public EAdmBroker Broker { get; set; }

        [DataMember]
        [Required]
        public string Codigo { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }
        

        [DataMember]
        [Required]
        public string Rango { get; set; }

        [DataMember]
        [Required]
        public double PrimaMinima { get; set; }

        [DataMember]
        [Required]
        public string Multiriesgo { get; set; }

        [DataMember]
        [Required]
        public string Identificador { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public int PrimaMinimaSumatoria { get; set; }
        [DataMember]
        [Required]
        public string CodigoRamo { get; set; }
        [DataMember]
        [Required]
        public string CodigoSubramo { get; set; }

        [DataMember]
        [Required]
        public string CodigoRamoTerremoto { get; set; }
        [DataMember]
        [Required]
        public string CodigoSubramoTerremoto { get; set; }


    }
}
