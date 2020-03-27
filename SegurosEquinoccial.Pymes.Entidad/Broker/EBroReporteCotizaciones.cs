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
    public class EBroReporteCotizaciones
    {
        [DataMember] public string Version { get; set; }

        [DataMember] public string Empresa { get; set; }
         
        [DataMember] public string Codigo { get; set; }

        [DataMember] public string Fecha { get; set; }

        [DataMember] public string CotizacionYear { get; set; }

        [DataMember] public string CotizacionMonth { get; set; }

        [DataMember] public string Usuario { get; set; }

        [DataMember] public double PrimaNeta { get; set; } 

        [DataMember] public double PrimaTotal { get; set; }

        [DataMember] public string Tipo { get; set; }

        [DataMember] public string Ciudad { get; set; }

        [DataMember] public string Corredor { get; set; }

        [DataMember] public string GiroNegocio { get; set; } 

        //[DataMember] public int M_CodigoAgente { get; set; }

        //[DataMember] public int N_Estado { get; set; }

        //[DataMember] public int O_IdBroker { get; set; }

    }
}
