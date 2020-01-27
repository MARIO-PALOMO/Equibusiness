using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Entidad.Broker
{

    [DataContract]
    [Serializable]
    public class EBroCatalogoVehiculos
    {
        [DataMember]
        public int IdPlaca { get; set; }

        [DataMember]
        public string ANIO { get; set; }
        [DataMember]
        public string CAMPO_ULTIMA_ACTUALIZACION { get; set; }
        [DataMember]
        public string CANTON { get; set; }
        [DataMember]
        public string CHASIS { get; set; }
        [DataMember]
        public string CILINDRAJE { get; set; }
        [DataMember]
        public string CLASE { get; set; }
        [DataMember]
        public string COLOR { get; set; }
        [DataMember]
        public string EDADAUTO { get; set; }
        [DataMember]
        public string FEC_CADUCIDAD_MATRICULA { get; set; }
        [DataMember]
        public string FEC_COMPRA_REGISTRO { get; set; }
        [DataMember]
        public string FEC_ULTIMA_MATRICULA { get; set; }
        [DataMember]
        public string MARCA { get; set; }
        [DataMember]
        public string MODELO { get; set; }
        [DataMember]
        public string MOTOR { get; set; }
        [DataMember]
        public string NRO_CEDULA { get; set; }
        [DataMember]
        public string NRO_PASAJEROS { get; set; }
        [DataMember]
        public string NRO_RAMV { get; set; }
        [DataMember]
        public string NRO_RUC { get; set; }
        [DataMember]
        public string PAIS { get; set; }
        [DataMember]
        public string PLACA { get; set; }
        [DataMember]
        public string PRECIOMAXIMO { get; set; }
        [DataMember]
        public string PRECIOMINIMO { get; set; }
        [DataMember]
        public string PRECIOPROMEDIO { get; set; }
        [DataMember]
        public string PRECIOVENTA { get; set; }
        [DataMember]
        public string TIPO { get; set; }
        [DataMember]
        public string TIPOCOMBUSTIBLE { get; set; }
        [DataMember]
        public string ULTIMA_ACTUALIZACION { get; set; }
        [DataMember]
        public string USO { get; set; }
        [DataMember]
        public string cod_color { get; set; }
        [DataMember]
        public string cod_marca { get; set; }
        [DataMember]
        public string cod_modelo { get; set; }
        [DataMember]
        public string cod_pais { get; set; }
        [DataMember]
        public string cod_submodelo { get; set; }
        [DataMember]
        public string cod_tipo { get; set; }
        [DataMember]
        public string cod_tipo_ant { get; set; }
        [DataMember]
        public string cod_tipo_placa { get; set; }
        [DataMember]
        public string dias_transcurridos { get; set; }
        [DataMember]
        public string dias_vigencia { get; set; }
        [DataMember]
        public string tipo_vh_x_ant { get; set; }
    }
}
