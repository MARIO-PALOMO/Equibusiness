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
    public class EBroCatalogoSucursal
    {
        [DataMember]
        public int IdSucursal { get; set; }

        [DataMember]
        public string Union { get; set; }

        [DataMember]
        public int CodigoSucursal { get; set; }

        [DataMember]
        public int CodigoPuntoVenta { get; set; }

        [DataMember]
        public string Nombre { get; set; }
    }
}
