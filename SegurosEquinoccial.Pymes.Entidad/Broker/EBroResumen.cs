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
    public class EBroResumen
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdBroker { get; set; }

        [DataMember]
        public string Usuario { get; set; }

        [DataMember]
        public string Mes { get; set; }

        [DataMember]
        public string Anio { get; set; }

        [DataMember]
        public string Total { get; set; }

        [DataMember]
        public string Estado { get; set; }

        [DataMember]
        public string Resultado { get; set; }

        [DataMember]
        public string Cadena { get; set; }

        [DataMember]
        public string IdPadre { get; set; }

        [DataMember]
        public string FechaInicio { get; set; }

        [DataMember]
        public string FechaFin { get; set; }

        [DataMember]
        public int IdRol { get; set; }
    }
}
