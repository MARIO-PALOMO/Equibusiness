using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{
    [DataContract]
    [Serializable]
    public class EBroCatalogoProvincias
    {
        [DataMember]
        public int IdCatalogoProvincias { get; set; }

        [DataMember]
        public int CodigoPais { get; set; }

        [DataMember]
        public int CodigoDepartamento { get; set; }

        [DataMember]
        public string TextoDepartamento { get; set; }

        [DataMember]
        public int CodigoMunicipio { get; set; }

        [DataMember]
        public string TextoMunicipio { get; set; }

        [DataMember]
        public string TextoCompleto { get; set; }
    }
}
