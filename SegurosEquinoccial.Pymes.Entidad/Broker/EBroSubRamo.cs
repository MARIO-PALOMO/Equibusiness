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
    public class EBroSubRamo
    {
        [DataMember]
        public int IdSubRamo { get; set; }

        [DataMember]
        [Required]
        public EBroRamo Ramo { get; set; }

        [DataMember]
        [Required]
        public string Codigo { get; set; }

        [DataMember]
        [Required]
        public string Nombre { get; set; }

        [DataMember]
        [Required]
        public string Grupo { get; set; }

        [DataMember]
        [Required]
        public string RiesgoMenor { get; set; }

        [DataMember]
        [Required]
        public string RiesgoMayor { get; set; }

        [DataMember]
        [Required]
        public string Rango { get; set; }

        [DataMember]
        [Required]
        public int AgregadoAnual { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public int Seleccion { get; set; }

        [DataMember]
        [Required]
        public string Union { get; set; }

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
        public string RamoPerteneciente { get; set; }

        [DataMember]
        [Required]
        public string CodigoObjetoSeguroTerremoto { get; set; }
        [DataMember]
        [Required]
        public string CodigoAmparoTerremoto { get; set; }
        [DataMember]
        [Required]
        public string CodigoCategoriaTerremoto { get; set; }
        [DataMember]
        [Required]
        public string AcumulaPrimaTotalTerremoto { get; set; }
        [DataMember]
        [Required]
        public string AcumulaSumaTotalTerremoto { get; set; }
        [DataMember]
        [Required]
        public string CodigosDeduciblesTerremoto { get; set; }

        [DataMember]
        [Required]
        public string TipoPorcentaje { get; set; }

        [DataMember]
        [Required]
        public string Imprime { get; set; }

        [DataMember]
        [Required]
        public string ImprimeTerremoto { get; set; }

        [DataMember]
        [Required]
        public string NombreObjetoSeguro { get; set; }

        [DataMember]
        [Required]
        public string NombreObjetoSeguroTerremoto { get; set; }

        [DataMember]
        [Required]
        public string LimiteAgregadoAnual { get; set; }


        [DataMember]
        [Required]
        public string MostrarTasa { get; set; }

        [DataMember]
        [Required]
        public string MostrarPrima { get; set; }

    }
}
