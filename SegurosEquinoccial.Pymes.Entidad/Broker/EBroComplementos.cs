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
    public class EBroComplementos
    {
        [DataMember]
        public int IdComplementos { get; set; }

        [DataMember]
        [Required]
        public string Codigo { get; set; }

        [DataMember]
        [Required]
        public string Descripcion { get; set; }

        [DataMember]
        [Required]
        public string Titulo { get; set; }

        [DataMember]
        [Required]
        public string Subtitulo { get; set; }

        [DataMember]
        [Required]
        public string Orden { get; set; }

        [DataMember]
        [Required]
        public string Monto { get; set; }

        [DataMember]
        [Required]
        public string Identificador { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string Acumulador { get; set; }

        [DataMember]
        [Required]
        public EAdmBroker Broker { get; set; }

        [DataMember]
        [Required]
        public int Valor { get; set; }

        [DataMember]
        [Required]
        public int Bloqueo { get; set; }

    }
}
