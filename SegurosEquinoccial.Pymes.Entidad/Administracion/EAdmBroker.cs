using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace SegurosEquinoccial.Pymes.Entidad.Administracion
{
    [DataContract]
    [Serializable]
    public class EAdmBroker
    {
        [DataMember]
        public int IdBroker { get; set; }

        [DataMember]
        [Required]
        public string RazonSocial { get; set; }

        [DataMember]
        [Required]
        public string Foto { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string Color { get; set; }

        [DataMember]
        [Required]
        public int Provincias { get; set; }

        [DataMember]
        [Required]
        public int Riesgo { get; set; }

        [DataMember]
        [Required]
        public int MultiRiesgo { get; set; }

        [DataMember]
        [Required]
        public int Primas { get; set; }

        [DataMember]
        [Required]
        public int Pago { get; set; }

        [DataMember]
        [Required]
        public string CodigoTipoAgente { get; set; }

        [DataMember]
        [Required]
        public string CodigoAgente { get; set; }

        [DataMember]
        [Required]
        public string Comision { get; set; }

        [DataMember]
        [Required]
        public string Transporte { get; set; }

    }
}
