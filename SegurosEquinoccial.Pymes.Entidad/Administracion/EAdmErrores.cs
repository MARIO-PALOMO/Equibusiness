using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Administracion
{
    [DataContract]
    [Serializable]
    public class EAdmErrores
    {
        [DataMember]
        public int IdError { get; set; }

        [DataMember]
        public string message { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string ok { get; set; }

        [DataMember]
        public string status { get; set; }

        [DataMember]
        public string statusText { get; set; }

        [DataMember]
        public string url { get; set; }

        [DataMember]
        public string error { get; set; }
}
}
