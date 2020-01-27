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
    public class EBroCatalogoEmpresa
    {

        [DataMember]
        public int IdCatalogoEmpresas { get; set; }
    
        [DataMember]
        public string NRO_RUC { get; set; }

        [DataMember]
        public string RAZON_SOCIAL { get; set; }

        [DataMember]
        public string NOMBRE_COMERCIAL { get; set; }
        [DataMember]
        public string NOMBRE_COMPLETO { get; set; }
        [DataMember]
        public string ACTIVIDAD_ECONOMICA { get; set; }
        [DataMember]
        public string FECHA_CONSTITUCION { get; set; }
        [DataMember]
        public string RESIDENCIA { get; set; }
        [DataMember]
        public string CALLES { get; set; }
        [DataMember]
        public string CALLES_DOMICILIO { get; set; }
        [DataMember]
        public string NRO_DOMICILIO { get; set; }
        [DataMember]
        public string PROVINCIA { get; set; }
        [DataMember]
        public string CANTON { get; set; }
        [DataMember]
        public string CIUDAD { get; set; }
        [DataMember]
        public string PARROQUIA { get; set; }
        [DataMember]
        public string BARRIO { get; set; }
        [DataMember]
        public string CAPITAL { get; set; }
        [DataMember]
        public string NRO_EMPLEADOS { get; set; }
        [DataMember]
        public string TELEFONO { get; set; }
        [DataMember]
        public string EMAIL { get; set; }
        [DataMember]
        public string ACTIVIDAD_ECONOMICA_N6 { get; set; }
        [DataMember]
        public string ESTADO_LEGAL { get; set; }
        [DataMember]
        public string TIPO_COMPANIA { get; set; }
        [DataMember]
        public string INTENDENCIA_CONTROL { get; set; }
        [DataMember]
        public string OBJETO_SOCIAL { get; set; }
    }
}
