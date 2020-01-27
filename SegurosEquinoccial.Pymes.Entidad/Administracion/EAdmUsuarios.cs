using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace SegurosEquinoccial.Pymes.Entidad.Administracion
{
    [DataContract]
    [Serializable]
    public class EAdmUsuarios
    {
        [DataMember]
        public int Identificador { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        [Required]
        public string Usuario { get; set; }

        [DataMember]
        [Required]
        public string Email { get; set; }

        [DataMember]
        [Required]
        public string Contrasena { get; set; }

        [DataMember]
        [Required]
        public int Estado { get; set; }

        [DataMember]
        [Required]
        public EAdmRol rol { get; set; }

        [DataMember]
        [Required]
        public string Foto { get; set; }

        [DataMember]
        [Required]
        public EAdmBroker broker { get; set; }

        [DataMember]
        public string Uid { get; set; }

        [DataMember]
        [Required]
        public int IdPadre { get; set; }

        [DataMember]
        [Required]
        public string UsuarioPadre { get; set; }

        [DataMember]
        [Required]
        public string Ciudad { get; set; }

        [DataMember]
        [Required]
        public int Total { get; set; }

        [DataMember]
        [Required]
        public int EstadoSesion { get; set; }

        [DataMember]
        [Required]
        public string CodigoTipoAgente { get; set; }

        [DataMember]
        [Required]
        public string CodigoAgente { get; set; }


        [DataMember]
        [Required]
        public string CodigoSucursal { get; set; }

        [DataMember]
        [Required]
        public string CodigoPuntoVenta { get; set; }

        [DataMember]
        [Required]
        public string Comision { get; set; }

        [DataMember]
        [Required]
        public string Corredores { get; set; }
    }
}
