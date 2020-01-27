using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Auxiliares
{
    [DataContract]
    [Serializable]
    public class EAuxAccesorios
    {

        [DataMember]
        public string cod_accesorio { get; set; }
        [DataMember]
        public string cod_tipo_je { get; set; }
        [DataMember]
        public string imp_prima { get; set; }
        [DataMember]
        public string pje_tasa { get; set; }
        [DataMember]
        public string secuencial { get; set; }
        [DataMember]
        public string suma_aseg_acc { get; set; }
        [DataMember]
        public string txt_accesorio { get; set; }
    }
}
