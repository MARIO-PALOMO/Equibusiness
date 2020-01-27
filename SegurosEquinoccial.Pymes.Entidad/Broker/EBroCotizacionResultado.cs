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
    public class EBroCotizacionResultado
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdCotizacionResultado { get; set; }

        [DataMember]
        public EBroCotizacion Cotizacion { get; set; }

        [DataMember]
        public string IdPvMultiriesgo { get; set; }
        [DataMember]
        public int EstadoMultiriesgo { get; set; }
        [DataMember]
        public string IdPvEquipoMaquinaria { get; set; }
        [DataMember]
        public int EstadoEquipoMaquinaria { get; set; }
        [DataMember]
        public string IdPvResponsabilidadCivil { get; set; }
        [DataMember]
        public int EstadoResponsabilidadCivil { get; set; }
        [DataMember]
        public string IdPvFidelidad { get; set; }
        [DataMember]
        public int EstadoFidelidad { get; set; }
        [DataMember]
        public string IdPvAccidentesPersonales { get; set; }
        [DataMember]
        public int EstadoAccidentesPersonales { get; set; }
        [DataMember]
        public string IdPvTransInterno { get; set; }
        [DataMember]
        public int EstadoTransInterno { get; set; }
        [DataMember]
        public string IdPvTransImportaciones { get; set; }
        [DataMember]
        public int EstadoTransImportaciones { get; set; }
        [DataMember]
        public string IdPvVehiculos { get; set; }
        [DataMember]
        public int EstadoVehiculos { get; set; }
        [DataMember]
        public int EstadoGlobal { get; set; }
        [DataMember]
        public int EstadoPagoGlobal { get; set; }

    }
}
