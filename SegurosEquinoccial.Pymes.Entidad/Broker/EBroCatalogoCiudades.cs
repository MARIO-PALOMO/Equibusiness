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
    public class EBroCatalogoCiudades
    {

        [DataMember]
        public int IdCiudad { get; set; }

        [DataMember]
        public string Nombre { get; set; }
    }
}
