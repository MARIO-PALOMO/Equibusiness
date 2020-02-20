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
    public class EBroReporteUsuarios
    {
        [DataMember]
        public string A_Usuario { get; set; }

        [DataMember]
        public string B_Email { get; set; }

        [DataMember]
        public string C_Ciudad { get; set; }

        [DataMember]
        public string D_Agente { get; set; }

        [DataMember]
        public string E_Corredor { get; set; }

        [DataMember]
        public string F_Comision { get; set; }

    }
}
