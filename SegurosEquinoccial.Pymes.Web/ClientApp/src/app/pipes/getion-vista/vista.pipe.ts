import { Pipe, PipeTransform, AnimationStyleMetadata } from '@angular/core';
declare var $: any;
@Pipe({
  name: 'vista'
})
export class VistaPipe implements PipeTransform {

  //VARIABLES WEB
  //PANELES GLOBALES
  public panelesGlobales = {
    empresa: { valor: 'current', estado: true },
    direcciones: { valor: '', estado: false },
    ramos: { valor: '', estado: false },
    valores: { valor: '', estado: false },
    cotizacion: { valor: '', estado: false },
    pago: { valor: '', estado: false },
    resumen: { valor: '', estado: false },
    emision: { valor: '', estado: false }
  }

  //PANELES EMPRESA
  public panelesEmpresa = {
    empresa: { valor: 'col-md-4 col-sm-12 col-xs-12 empresa-paneles-seleccionado', estado: true },
    contratante: { valor: 'col-md-4 col-sm-12 col-xs-12 empresa-paneles-no-seleccionado', estado: false },
    pagadores: { valor: 'col-md-4 col-sm-12 col-xs-12 empresa-paneles-no-seleccionado', estado: false }
  };

  public panelesValoresRamos_ = {
    incendio: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
    roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
    coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
  }

  public panelesVistaRamos = {
    incendio: { estado: false },
    roboAsalto: { estado: false },
    equipoElectronico: { estado: false },
    roturaMaquinaria: { estado: false },
    lucroRoturaMaquinaria: { estado: false },
    lucroIncendio: { estado: false },
    dineroValores: { estado: false },
    equipoMaquinaria: { estado: false },
    responsabilidadCivil: { estado: false },
    fidelidad: { estado: false },
    accidentesPersonales: { estado: false },
    transportes: { estado: false },
    transporteImportaciones: { estado: false },
    vehiculos: { estado: false },
    motos: { estado: false },
    coberturasAdicionales: { estado: false }
  };

  public panelesRamos = {
    incendio: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    roboAsalto: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    equipoElectronico: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    roturaMaquinaria: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    lucroRoturaMaquinaria: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    lucroIncendio: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    transportes: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    transporteImportaciones: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    dineroValores: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    equipoMaquinaria: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    responsabilidadCivil: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    fidelidad: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    accidentesPersonales: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    vehiculos: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    motos: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false },
    coberturasAdicionales: { escritorio: 'borde-redondeado-ramos ramo-seleccionado', movil: 'list-group-item list-group-item-action ramo-movil', estado: false }
  }

  //PANELES VALORES RAMOS
  public panelesValoresRamos = [];

  //VARIABLES MOVIL

  transform(value: any, args?: any): any {
    return null;
  }

  //ESTILO WEB

  //COBERTURAS
  public gestionSeleccionCoberturas(coberturas: any) {
    console.log(coberturas);


  }

  //GESTION PANELES VALORES RAMOS

  public gestionPanelesValoresRamosSeleccionadosTexto(ramo: any) {
    var seleccionados = "";
    seleccionados = "";
    if (ramo == "roboAsalto") {
      seleccionados = "Robo y/o Asalto";
    } else if (ramo == "incendio") {
      seleccionados = "Incedio y Líneas Aliadas";
    } else if (ramo == "equipoElectronico") {
      seleccionados = "Equipo Electrónico";
    } else if (ramo == "roturaMaquinaria") {
      seleccionados = "Rotura de Maquinaria";
    } else if (ramo == "lucroRoturaMaquinaria") {
      seleccionados = "Lucro Cesante por Rotura de Maquinaria";
    } else if (ramo == "lucroIncendio") {
      seleccionados = "Lucro Cesante por Incendio";
    } else if (ramo == "transportes") {
      seleccionados = "Transporte Interno";
    } else if (ramo == "transporteImportaciones") {
      seleccionados = "Transportes Importaciones";
    } else if (ramo == "dineroValores") {
      seleccionados = "Dinero y Valores";
    } else if (ramo == "equipoMaquinaria") {
      seleccionados = "Equipo y Maquinaria";
    } else if (ramo == "responsabilidadCivil") {
      seleccionados = "Responsabilidad Civil";
    } else if (ramo == "fidelidad") {
      seleccionados = "Fidelidad";
    } else if (ramo == "accidentesPersonales") {
      seleccionados = "Accidentes Personales";
    } else if (ramo == "vehiculos") {
      seleccionados = "Vehículos";
    } else if (ramo == "motos") {
      seleccionados = "Motos";
    } else if (ramo == "coberturasAdicionales") {
      seleccionados = "Amparos Adicionales";
    }

    return seleccionados;
  }

  public gestionPanelesValoresRamos(panel) {

    if (panel == 'incendio') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'roboAsalto') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'equipoElectronico') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'roturaMaquinaria') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'transportes') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'transporteImportaciones') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'dineroValores') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'equipoMaquinaria') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'responsabilidadCivil') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'fidelidad') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'accidentesPersonales') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'vehiculos') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'motos') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'lucroRoturaMaquinaria') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'lucroIncendio') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } }
      };
    } else if (panel == 'coberturasAdicionales') {
      return this.panelesValoresRamos_ = {
        incendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roboAsalto: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoElectronico: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        roturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroRoturaMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        lucroIncendio: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transportes: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        transporteImportaciones: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        dineroValores: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        equipoMaquinaria: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        responsabilidadCivil: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        fidelidad: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        accidentesPersonales: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        vehiculos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        motos: { estado: false, seleccion: { disenio: "coberturas-no-seleccionada" } },
        coberturasAdicionales: { estado: true, seleccion: { disenio: "coberturas-seleccionada" } }
      };
    }

  }

  //GESTION PANELES EMPRESA
  public gestionPanelesEmpresa(panel, color) {
    if (panel == 'Empresa') {
      $("#tabEmpresa").css("background-color", "rgb(" + color + ")");
      $("#tabEmpresa").css("color", "white");
      $("#tabEmpresa").css("padding", "6px");
      $("#tabEmpresa").css("border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabContratante").css("background-color", "#E1E1E1");
      $("#tabContratante").css("color", "#393939");
      $("#tabContratante").css("padding", "6px");
      $("#tabContratante").css("border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabPagador").css("background-color", "#E1E1E1");
      $("#tabPagador").css("color", "#393939");
      $("#tabPagador").css("padding", "6px");
      $("#tabPagador").css("border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-webkit-border-radius", "6px 6px 6px 6px");

      return this.panelesEmpresa = {
        empresa: { valor: '', estado: true },
        contratante: { valor: '', estado: false },
        pagadores: { valor: '', estado: false }
      }
    } else if (panel == 'Contratante') {

      $("#tabContratante").css("background-color", "rgb(" + color + ")");
      $("#tabContratante").css("color", "white");
      $("#tabContratante").css("padding", "6px");
      $("#tabContratante").css("border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabEmpresa").css("background-color", "#E1E1E1");
      $("#tabEmpresa").css("color", "#393939");
      $("#tabEmpresa").css("padding", "6px");
      $("#tabEmpresa").css("border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabPagador").css("background-color", "#E1E1E1");
      $("#tabPagador").css("color", "#393939");
      $("#tabPagador").css("padding", "6px");
      $("#tabPagador").css("border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-webkit-border-radius", "6px 6px 6px 6px");

      return this.panelesEmpresa = {
        empresa: { valor: '', estado: false },
        contratante: { valor: '', estado: true },
        pagadores: { valor: '', estado: false }
      }
    } else if (panel == 'Pagadores') {

      $("#tabPagador").css("background-color", "rgb(" + color + ")");
      $("#tabPagador").css("color", "white");
      $("#tabPagador").css("padding", "6px");
      $("#tabPagador").css("border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabPagador").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabContratante").css("background-color", "#E1E1E1");
      $("#tabContratante").css("color", "#393939");
      $("#tabContratante").css("padding", "6px");
      $("#tabContratante").css("border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabContratante").css("-webkit-border-radius", "6px 6px 6px 6px");

      $("#tabEmpresa").css("background-color", "#E1E1E1");
      $("#tabEmpresa").css("color", "#393939");
      $("#tabEmpresa").css("padding", "6px");
      $("#tabEmpresa").css("border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-moz-border-radius", "6px 6px 6px 6px");
      $("#tabEmpresa").css("-webkit-border-radius", "6px 6px 6px 6px");

      return this.panelesEmpresa = {
        empresa: { valor: '', estado: false },
        contratante: { valor: '', estado: false },
        pagadores: { valor: '', estado: true }
      }
    }
  }

  //GESTION PANELES GLOBALES
  public inicializarPanelesGlobales() {
    return this.panelesGlobales = {
      empresa: { valor: 'current', estado: true },
      direcciones: { valor: '', estado: false },
      ramos: { valor: '', estado: false },
      valores: { valor: '', estado: false },
      cotizacion: { valor: '', estado: false },
      pago: { valor: '', estado: false },
      resumen: { valor: '', estado: false },
      emision: { valor: '', estado: false }
    }
  }
  public gestionPanelesGlobales(panel) {
    if (panel == 'Empresa') {
      return this.panelesGlobales = {
        empresa: { valor: 'current', estado: true },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Direcciones') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: 'current', estado: true },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Ramos') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: 'current', estado: true },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Valores') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: 'current', estado: true },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Cotizacion') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: 'current', estado: true },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Resumen') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: 'current', estado: true },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Pago') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: 'current', estado: true },
        resumen: { valor: '', estado: false },
        emision: { valor: '', estado: false }
      }
    } else if (panel == 'Emision') {
      return this.panelesGlobales = {
        empresa: { valor: '', estado: false },
        direcciones: { valor: '', estado: false },
        ramos: { valor: '', estado: false },
        valores: { valor: '', estado: false },
        cotizacion: { valor: '', estado: false },
        pago: { valor: '', estado: false },
        resumen: { valor: '', estado: false },
        emision: { valor: 'current', estado: true },
      }
    }
  }

  public gestionPanelRamos(panel) {
    var ramo = this.panelesValoresRamos.indexOf(panel);
    if (ramo == -1) {
      this.panelesValoresRamos.push(panel);
      this.gestionEstiloRamos(panel, "borde-redondeado-ramos ramo-seleccionado-ts", "list-group-item list-group-item-action ramo-movil-ts", true);
    } else {
      this.panelesValoresRamos.splice(ramo, 1);
      this.gestionEstiloRamos(panel, "borde-redondeado-ramos ramo-seleccionado", "list-group-item list-group-item-action ramo-movil", false);
    }
  }

  public gestionEstiloRamos(panel, escritorio, movil, estado) {
    if (panel == 'incendio') {
      this.panelesRamos.incendio.escritorio = escritorio;
      this.panelesRamos.incendio.movil = movil;
      this.panelesRamos.incendio.estado = estado;
    } else if (panel == 'roboAsalto') {
      this.panelesRamos.roboAsalto.escritorio = escritorio;
      this.panelesRamos.roboAsalto.movil = movil;
      this.panelesRamos.roboAsalto.estado = estado;
    } else if (panel == 'equipoElectronico') {
      this.panelesRamos.equipoElectronico.escritorio = escritorio;
      this.panelesRamos.equipoElectronico.movil = movil;
      this.panelesRamos.equipoElectronico.estado = estado;
    } else if (panel == 'roturaMaquinaria') {
      this.panelesRamos.roturaMaquinaria.escritorio = escritorio;
      this.panelesRamos.roturaMaquinaria.movil = movil;
      this.panelesRamos.roturaMaquinaria.estado = estado;
    } else if (panel == 'transportes') {
      this.panelesRamos.transportes.escritorio = escritorio;
      this.panelesRamos.transportes.movil = movil;
      this.panelesRamos.transportes.estado = estado;
    } else if (panel == 'transporteImportaciones') {
      this.panelesRamos.transporteImportaciones.escritorio = escritorio;
      this.panelesRamos.transporteImportaciones.movil = movil;
      this.panelesRamos.transporteImportaciones.estado = estado;
    } else if (panel == 'dineroValores') {
      this.panelesRamos.dineroValores.escritorio = escritorio;
      this.panelesRamos.dineroValores.movil = movil;
      this.panelesRamos.dineroValores.estado = estado;
    } else if (panel == 'equipoMaquinaria') {
      this.panelesRamos.equipoMaquinaria.escritorio = escritorio;
      this.panelesRamos.equipoMaquinaria.movil = movil;
      this.panelesRamos.equipoMaquinaria.estado = estado;
    } else if (panel == 'responsabilidadCivil') {
      this.panelesRamos.responsabilidadCivil.escritorio = escritorio;
      this.panelesRamos.responsabilidadCivil.movil = movil;
      this.panelesRamos.responsabilidadCivil.estado = estado;
    } else if (panel == 'fidelidad') {
      this.panelesRamos.fidelidad.escritorio = escritorio;
      this.panelesRamos.fidelidad.movil = movil;
      this.panelesRamos.fidelidad.estado = estado;
    } else if (panel == 'accidentesPersonales') {
      this.panelesRamos.accidentesPersonales.escritorio = escritorio;
      this.panelesRamos.accidentesPersonales.movil = movil;
      this.panelesRamos.accidentesPersonales.estado = estado;
    } else if (panel == 'vehiculos') {
      this.panelesRamos.vehiculos.escritorio = escritorio;
      this.panelesRamos.vehiculos.movil = movil;
      this.panelesRamos.vehiculos.estado = estado;
    } else if (panel == 'motos') {
      this.panelesRamos.motos.escritorio = escritorio;
      this.panelesRamos.motos.movil = movil;
      this.panelesRamos.motos.estado = estado;
    } else if (panel == 'lucroRoturaMaquinaria') {
      this.panelesRamos.lucroRoturaMaquinaria.escritorio = escritorio;
      this.panelesRamos.lucroRoturaMaquinaria.movil = movil;
      this.panelesRamos.lucroRoturaMaquinaria.estado = estado;
    } else if (panel == 'lucroIncendio') {
      this.panelesRamos.lucroIncendio.escritorio = escritorio;
      this.panelesRamos.lucroIncendio.movil = movil;
      this.panelesRamos.lucroIncendio.estado = estado;
    } else if (panel == 'coberturasAdicionales') {
      this.panelesRamos.coberturasAdicionales.escritorio = escritorio;
      this.panelesRamos.coberturasAdicionales.movil = movil;
      this.panelesRamos.coberturasAdicionales.estado = estado;
    }
  }

  public gestionVistaPanelesRamos(listaRamos: any) {
    for (var vista of listaRamos) {
      if (vista.Identificador == "incendio") {
        this.panelesVistaRamos.incendio.estado = true;
      } if (vista.Identificador == "roboAsalto") {
        this.panelesVistaRamos.roboAsalto.estado = true;
      } if (vista.Identificador == "equipoElectronico") {
        this.panelesVistaRamos.equipoElectronico.estado = true;
      } if (vista.Identificador == "roturaMaquinaria") {
        this.panelesVistaRamos.roturaMaquinaria.estado = true;
      } if (vista.Identificador == "lucroRoturaMaquinaria") {
        this.panelesVistaRamos.lucroRoturaMaquinaria.estado = true;
      } if (vista.Identificador == "equipoMaquinaria") {
        this.panelesVistaRamos.equipoMaquinaria.estado = true;
      } if (vista.Identificador == "responsabilidadCivil") {
        this.panelesVistaRamos.responsabilidadCivil.estado = true;
      } if (vista.Identificador == "fidelidad") {
        this.panelesVistaRamos.fidelidad.estado = true;
      } if (vista.Identificador == "lucroIncendio") {
        this.panelesVistaRamos.lucroIncendio.estado = true;
      } if (vista.Identificador == "dineroValores") {
        this.panelesVistaRamos.dineroValores.estado = true;
      } if (vista.Identificador == "accidentesPersonales") {
        this.panelesVistaRamos.accidentesPersonales.estado = true;
      } if (vista.Identificador == "transportes") {
        this.panelesVistaRamos.transportes.estado = true;
      } if (vista.Identificador == "transporteImportaciones") {
        this.panelesVistaRamos.transporteImportaciones.estado = true;
      } if (vista.Identificador == "vehiculos") {
        this.panelesVistaRamos.vehiculos.estado = true;
      } if (vista.Identificador == "motos") {
        this.panelesVistaRamos.motos.estado = true;
      } if (vista.Identificador == "coberturasAdicionales") {
        this.panelesVistaRamos.coberturasAdicionales.estado = true;
      }
    }
  }


}
