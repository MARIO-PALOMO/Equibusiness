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
    public class EBroReporteEmisiones
    {
        [DataMember] public string A_Version { get; set; }

        [DataMember] public string B_Empresa { get; set; }

        [DataMember] public string C_Codigo { get; set; }

        [DataMember] public string D_FechaCotizacion { get; set; }

        [DataMember] public string E_CotizacionYear { get; set; }

        [DataMember] public string F_CotizacionMonth { get; set; }

        [DataMember] public string G_Usuario { get; set; }

        [DataMember] public double H_PrimaNeta { get; set; }

        [DataMember] public double I_PrimaTotal { get; set; }

        [DataMember] public string J_Tipo { get; set; }

        [DataMember] public string K_Ciudad { get; set; }

        [DataMember] public string L_FechaEmision { get; set; }

        [DataMember] public string M_EmisionYear { get; set; }

        [DataMember] public string N_EmisionMonth { get; set; }

        [DataMember] public string O_Corredor { get; set; }

        //[DataMember] public int P_CodigoAgente { get; set; }

        //[DataMember] public int Q_Estado { get; set; }

        //[DataMember] public int R_IdBroker { get; set; }


    }
}
