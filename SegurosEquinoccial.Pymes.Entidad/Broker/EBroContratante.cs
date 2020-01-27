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
    public class EBroContratante
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdContratante { get; set; }

        [DataMember]
        [Required]
        public string Cedula { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }

        [DataMember]
        [Required]
        public string PrimerApellido { get; set; }

        [DataMember]
        [Required]
        public string SegundoApellido { get; set; }

        [DataMember]
        [Required]
        public string Direccion { get; set; }

        [DataMember]
        [Required]
        public string Telefono { get; set; }

        [DataMember]
        [Required]
        public string Email { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public EBroCotizacion Cotizacion { get; set; }
    }
}
