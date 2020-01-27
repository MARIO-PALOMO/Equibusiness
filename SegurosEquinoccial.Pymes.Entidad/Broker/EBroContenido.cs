using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroContenido
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdContenido { get; set; }

        [DataMember]
        [Required]
        public string DatosCotizador { get; set; }

        [DataMember]
        [Required]
        public string DatosGarantias { get; set; }

        [DataMember]
        [Required]
        public string DatosCondiciones { get; set; }

        [DataMember]
        [Required]
        public string EstadoGarantias { get; set; }

        [DataMember]
        [Required]
        public string EstadoCondiciones { get; set; }

        [DataMember]
        [Required]
        public string Lista { get; set; }

        [DataMember]
        [Required]
        public string VistaEstado { get; set; }

        [DataMember]
        [Required]
        public string VistaDiseno { get; set; }

        [DataMember]
        [Required]
        public string VistaValores { get; set; }

        [DataMember]
        [Required]
        public EBroCotizacion Cotizacion { get; set; }
    }
}
