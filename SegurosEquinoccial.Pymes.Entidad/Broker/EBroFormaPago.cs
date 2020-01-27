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
    public class EBroFormaPago
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdFormaPago { get; set; }

        [DataMember]
        [Required]
        public int IdPago { get; set; }

        [DataMember]
        [Required]
        public string Tipo { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public string Adjunto { get; set; }

        [DataMember]
        [Required]
        public string AdjuntoTipo { get; set; }

        [DataMember]
        [Required]
        public EBroCotizacion Cotizacion { get; set; }

        [DataMember]
        [Required]
        public string Plataforma { get; set; }
        [DataMember]
        [Required]
        public string CodigoAutenticacion { get; set; }
        [DataMember]
        [Required]
        public string Referencia { get; set; }
        [DataMember]
        [Required]
        public string Lote { get; set; }
        [DataMember]
        [Required]
        public string Voucher { get; set; }
        [DataMember]
        [Required]
        public string Diferidos { get; set; }
        [DataMember]
        [Required]
        public string Intereses { get; set; }
        [DataMember]
        [Required]
        public string Trama { get; set; }
        [DataMember]
        [Required]
        public string Fecha { get; set; }

    }
}
