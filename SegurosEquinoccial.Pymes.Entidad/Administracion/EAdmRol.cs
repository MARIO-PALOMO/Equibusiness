using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace SegurosEquinoccial.Pymes.Entidad.Administracion
{
    [DataContract]
    [Serializable]
    public class EAdmRol
    {
        [DataMember]
        public int IdRol { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }
    }
}
