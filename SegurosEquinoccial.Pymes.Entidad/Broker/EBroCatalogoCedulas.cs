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
    public class EBroCatalogoCedulas
    {
        [DataMember]
        public int IdCatalogoCedulas { get; set; }

        [DataMember]
        [Required]
        public string NRO_CEDULA { get; set; }

        [DataMember]
        [Required]
        public string APELLIDO1 { get; set; }
        [DataMember]
        [Required]
        public string APELLIDO2 { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE1 { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE2 { get; set; }
        [DataMember]
        [Required]
        public string FECHA_NAC { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_COMPLETO { get; set; }
        [DataMember]
        [Required]
        public string ESTADO_CIVIL { get; set; }
        [DataMember]
        [Required]
        public string GENERO { get; set; }
        [DataMember]
        [Required]
        public string NACIONALIDAD { get; set; }
        [DataMember]
        [Required]
        public string RESIDENCIA { get; set; }
        [DataMember]
        [Required]
        public string CALLES { get; set; }
        [DataMember]
        [Required]
        public string NIVELESTUDIO { get; set; }
        [DataMember]
        [Required]
        public string PROFESION { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_PADRE { get; set; }
        [DataMember]
        [Required]
        public string NRO_CEDULA_PADRE { get; set; }
        [DataMember]
        [Required]
        public string NACIONALIDAD_PADRE { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_MADRE { get; set; }
        [DataMember]
        [Required]
        public string NRO_CEDULA_MADRE { get; set; }
        [DataMember]
        [Required]
        public string NACIONALIDAD_MADRE { get; set; }
        [DataMember]
        [Required]
        public string FECHA_MATRIMONIO { get; set; }
        [DataMember]
        [Required]
        public string LUGAR_MATROMONIO { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_CONYUGUE { get; set; }
        [DataMember]
        [Required]
        public string NRO_CEDULA_CONYUGUE { get; set; }
        [DataMember]
        [Required]
        public string NACIONALIDAD_CONYUGUE { get; set; }
        [DataMember]
        [Required]
        public string FECHA_DEFUNCION { get; set; }
        [DataMember]
        [Required]
        public string LUGAR_DEFUNCION { get; set; }
        [DataMember]
        [Required]
        public string CONDICION_CIUDADANIA { get; set; }
        [DataMember]
        [Required]
        public string LUGAR_NAC { get; set; }
        [DataMember]
        [Required]
        public string LUGAR_INSCRIPCION { get; set; }
        [DataMember]
        [Required]
        public string DOMICILIO { get; set; }
        [DataMember]
        [Required]
        public string CALLES_DOMICILIO { get; set; }
        [DataMember]
        [Required]
        public string NRO_DOMICILIO { get; set; }
        [DataMember]
        [Required]
        public string PROVINCIA { get; set; }
        [DataMember]
        [Required]
        public string CANTON { get; set; }
        [DataMember]
        [Required]
        public string CIUDAD { get; set; }
        [DataMember]
        [Required]
        public string PARROQUIA { get; set; }
        [DataMember]
        [Required]
        public string BARRIO { get; set; }
        [DataMember]
        [Required]
        public string FECHA_EXPEDICION_CEDULA { get; set; }
        [DataMember]
        [Required]
        public string FECHA_ACTUALIZACION_REGCIVIL { get; set; }
        [DataMember]
        [Required]
        public string apellidos { get; set; }
        [DataMember]
        [Required]
        public string nombres { get; set; }
        [DataMember]
        [Required]
        public string TELEFONO { get; set; }
        [DataMember]
        [Required]
        public string TELEFONO2 { get; set; }
        [DataMember]
        [Required]
        public string OTROSTELEFONOS { get; set; }
        [DataMember]
        [Required]
        public string CELULAR { get; set; }
        [DataMember]
        [Required]
        public string CELULAR2 { get; set; }
        [DataMember]
        [Required]
        public string EMAIL { get; set; }
        [DataMember]
        [Required]
        public string EMAIL2 { get; set; }
        [DataMember]
        [Required]
        public string EGRESOS { get; set; }
        [DataMember]
        [Required]
        public string INGRESOS { get; set; }
        [DataMember]
        [Required]
        public string INGRESOS_ACTIVIDAD_COMERCIAL { get; set; }
        [DataMember]
        [Required]
        public string INGRESOS_ACTIVIDAD_PROFESIONAL { get; set; }
        [DataMember]
        [Required]
        public string INGRESOS_TRABAJO_PERMANENTE { get; set; }
        [DataMember]
        [Required]
        public string OTROS_INGRESOS { get; set; }
        [DataMember]
        [Required]
        public string SITUACION_LABORAL { get; set; }
        [DataMember]
        [Required]
        public string RUC_PATRONO { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_PATRONO { get; set; }
        [DataMember]
        [Required]
        public string FECHA_INGRESO_PATRONO { get; set; }
        [DataMember]
        [Required]
        public string CARGO { get; set; }
        [DataMember]
        [Required]
        public string SALARIO { get; set; }
        [DataMember]
        [Required]
        public string NRO_RUC { get; set; }
        [DataMember]
        [Required]
        public string RAZON_SOCIAL { get; set; }
        [DataMember]
        [Required]
        public string NOMBRE_COMERCIAL { get; set; }
        [DataMember]
        [Required]
        public string TIPO_COMPANIA { get; set; }
        [DataMember]
        [Required]
        public string ACTIVIDAD_ECONOMICA { get; set; }
    }
}
