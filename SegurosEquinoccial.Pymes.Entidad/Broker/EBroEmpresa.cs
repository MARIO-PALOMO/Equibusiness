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
    public class EBroEmpresa
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdEmpresa { get; set; }

        [DataMember]
        [Required]
        public int Codigo { get; set; }

        [DataMember]
        [Required]
        public int IdCatalogoEmpresa { get; set; }


        [DataMember]
        [Required]
        public string RazonSocial { get; set; }

        [DataMember]
        [Required]
        public string Ruc { get; set; }

        [DataMember]
        [Required]
        public string Telefono { get; set; }

        [DataMember]
        [Required]
        public string Email { get; set; }

        [DataMember]
        [Required]
        public string GiroNegocio { get; set; }

        [DataMember]
        [Required]
        public int Riesgo { get; set; }

        [DataMember]
        [Required]
        public string SectorEconomico { get; set; }

        [DataMember]
        [Required]
        public string Siniestralidad { get; set; }

        [DataMember]
        [Required]
        public string CodigoAsegurado { get; set; }

        [DataMember]
        [Required]
        public string Direccion { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }

        [DataMember]
        [Required]
        public string PrimerApellido { get; set; }

        [DataMember]
        [Required]
        public string SegundoApellido { get; set; }
    }
}
