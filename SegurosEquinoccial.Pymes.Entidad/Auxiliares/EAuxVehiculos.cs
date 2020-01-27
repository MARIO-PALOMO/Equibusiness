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
    public class EAuxVehiculos
    {
        [DataMember]
        public string grupo_endoso { get; set; }
        [DataMember]
        public string poliza { get; set; }
        [DataMember]
        public string id_certificado { get; set; }
        [DataMember]
        public string item { get; set; }
        [DataMember]
        public string ap_paterno { get; set; }
        [DataMember]
        public string ap_materno { get; set; }
        [DataMember]
        public string nombres { get; set; }
        [DataMember]
        public string fecha_compra { get; set; }
        [DataMember]
        public string marca { get; set; }
        [DataMember]
        public string modelo { get; set; }
        [DataMember]
        public string cod_concesionario { get; set; }
        [DataMember]
        public string suma_aseg { get; set; }
        [DataMember]
        public string inicio_vigencia { get; set; }
        [DataMember]
        public string fin_vigencia { get; set; }
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string ciudad { get; set; }
        [DataMember]
        public string companyname { get; set; }
        [DataMember]
        public string cedula_ruc { get; set; }
        [DataMember]
        public string nombre_asegurado { get; set; }
        [DataMember]
        public string chasis { get; set; }
        [DataMember]
        public string anio_modelo { get; set; }
        [DataMember]
        public string suma_aseg2 { get; set; }
        [DataMember]
        public string telf_oficina { get; set; }
        [DataMember]
        public string color { get; set; }
        [DataMember]
        public string motor { get; set; }
        [DataMember]
        public string direccion { get; set; }
        [DataMember]
        public string sector { get; set; }
        [DataMember]
        public string ciudad2 { get; set; }
        [DataMember]
        public string provincia { get; set; }
        [DataMember]
        public string direccion2 { get; set; }
        [DataMember]
        public string direccion3 { get; set; }
        [DataMember]
        public string telf_particular { get; set; }
        [DataMember]
        public string indicativo { get; set; }
        [DataMember]
        public string cod_plan_pago { get; set; }
        [DataMember]
        public string fecha_nacim { get; set; }
        [DataMember]
        public string cero { get; set; }
        [DataMember]
        public string uno { get; set; }
        [DataMember]
        public string tasa { get; set; }
        [DataMember]
        public string prima_neta { get; set; }
        [DataMember]
        public string super { get; set; }
        [DataMember]
        public string seg_camp { get; set; }
        [DataMember]
        public string der_emi { get; set; }
        [DataMember]
        public string iva { get; set; }
        [DataMember]
        public string prima_total { get; set; }
        [DataMember]
        public string nro_polizas { get; set; }
        [DataMember]
        public string producto { get; set; }
        [DataMember]
        public string sucursal { get; set; }
        [DataMember]
        public string pto_vta { get; set; }
        [DataMember]
        public string zona_del_producto { get; set; }
        [DataMember]
        public string aclaratorio_poliza { get; set; }
        [DataMember]
        public string aclaratorio_item { get; set; }
        [DataMember]
        public string codigo_deducible { get; set; }
        [DataMember]
        public string certificado { get; set; }
        [DataMember]
        public string cod_tipo_vehiculo { get; set; }
        [DataMember]
        public string num_convenio { get; set; }
        [DataMember]
        public string operacion { get; set; }
        [DataMember]
        public string codigo_conducto { get; set; }
        [DataMember]
        public string nro_cuenta_tarjeta { get; set; }
        [DataMember]
        public string quincena { get; set; }
        [DataMember]
        public string subproducto { get; set; }
        [DataMember]
        public string documento { get; set; }
        [DataMember]
        public string tipo_doc { get; set; }
        [DataMember]
        public string cod_estado { get; set; }
        [DataMember]
        public string log_error { get; set; }
        [DataMember]
        public string flag { get; set; }
        [DataMember]
        public string cod_pais { get; set; }
        [DataMember]
        public string cod_item { get; set; }
        [DataMember]
        public string id_pv_plano { get; set; }
        [DataMember]
        public string cod_placa { get; set; }
        [DataMember]
        public string placa { get; set; }
        [DataMember]
        public string fact_grupal { get; set; }
        [DataMember]
        public string imp_otroscargos_con_iva { get; set; }
        [DataMember]
        public string txt_origen { get; set; }
        [DataMember]
        public string sn_campania { get; set; }
        [DataMember]
        public string sn_inspeccion { get; set; }
        [DataMember]
        public string cod_estado_procesado { get; set; }
        [DataMember]
        public string id_proceso_slx { get; set; }
        [DataMember]
        public string fec_procreso { get; set; }
        [DataMember]
        public string cod_usuario { get; set; }
        [DataMember]
        public string cod_estado_veh { get; set; }
        [DataMember]
        public string cod_estado_clte { get; set; }
        [DataMember]
        public string telefono3 { get; set; }
        [DataMember]
        public string telefono4 { get; set; }
        [DataMember]
        public string NroPolLider { get; set; }
        [DataMember]
        public string PjeComisAgente { get; set; }
        [DataMember]
        public string aaaamm_vto_tarj { get; set; }
        [DataMember]
        public string txt_apellido1_pag { get; set; }
        [DataMember]
        public string txt_apellido2_pag { get; set; }
        [DataMember]
        public string txt_nombre_pag { get; set; }
        [DataMember]
        public string cod_tipo_doc_pag { get; set; }
        [DataMember]
        public string cedula_ruc_pag { get; set; }
        [DataMember]
        public string txt_email_pag { get; set; }
        [DataMember]
        public string fec_nac_pag { get; set; }
        [DataMember]
        public string tel_casa_pag { get; set; }
        [DataMember]
        public string tel_oficina_pag { get; set; }
        [DataMember]
        public string tel_celular_pag { get; set; }
        [DataMember]
        public string txt_direccion_pag { get; set; }
        [DataMember]
        public string sector_pag { get; set; }
        [DataMember]
        public string provincia_pag { get; set; }
        [DataMember]
        public string ciudad_pag { get; set; }
        [DataMember]
        public string fec_exp_pas_aseg { get; set; }
        [DataMember]
        public string fec_ven_pas_aseg { get; set; }
        [DataMember]
        public string fec_ing_pais_aseg { get; set; }
        [DataMember]
        public string cod_est_mig_aseg { get; set; }
        [DataMember]
        public EAuxAccesorios Accesorios { get; set; }
    }
}
