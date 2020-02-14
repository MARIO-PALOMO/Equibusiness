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
        [DataMember] public string A_Broker { get; set; }

        [DataMember] public string B_Empresa { get; set; }

        [DataMember] public string C_Codigo { get; set; }

        [DataMember] public string D_Fecha { get; set; }

        [DataMember] public string E_CotizacionYear { get; set; }

        [DataMember] public string F_CotizacionMonth { get; set; }

        [DataMember] public string G_Usuario { get; set; }

        [DataMember] public double H_PrimaTotal { get; set; }

        [DataMember] public string I_Tipo { get; set; }

        [DataMember] public string J_Ciudad { get; set; }

        [DataMember] public string K_Corredor { get; set; }
        
        //[DataMember] public int L_CodigoAgente { get; set; }

        //[DataMember] public int M_Estado { get; set; }

        //[DataMember] public int N_IdBroker { get; set; }
               
    }
}
