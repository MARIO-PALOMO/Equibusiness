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
        [DataMember] public string A_Version { get; set; }

        [DataMember] public string B_Empresa { get; set; }
         
        [DataMember] public string C_Codigo { get; set; }

        [DataMember] public string D_Fecha { get; set; }

        [DataMember] public string E_CotizacionYear { get; set; }

        [DataMember] public string F_CotizacionMonth { get; set; }

        [DataMember] public string G_Usuario { get; set; }

        [DataMember] public double H_PrimaNeta { get; set; } 

        [DataMember] public double I_PrimaTotal { get; set; }

        [DataMember] public string J_Tipo { get; set; }

        [DataMember] public string K_Ciudad { get; set; }

        [DataMember] public string L_Corredor { get; set; }
        
        //[DataMember] public int M_CodigoAgente { get; set; }

        //[DataMember] public int N_Estado { get; set; }

        //[DataMember] public int O_IdBroker { get; set; }
               
    }
}
