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
    public class EBroTextos
    {
        [DataMember]
        public string IdPV { get; set; }
        [DataMember]
        public int Item { get; set; }
        [DataMember]
        public string Texto { get; set; }
    }
}
