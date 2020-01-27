import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

@Pipe({
  name: 'validacion'
})
export class ValidacionPipe implements PipeTransform {

  constructor() {

  }

  transform(value: any, args?: any): any {
    return null;
  }

  public gestionReglasRamosSubRamos(listaRamoSubRamo: any, subramo: any, ubicacion: any, valor: any, listasRamos: any,
    general: any, reglasIndividual: any, reglasGlobal: any, reglasVertical: any, reglasGrupal: any) {

    var listas = [
      { nombre: "listaIncendio", lista: listasRamos.listaIncendio },
      { nombre: "listaEquipoElectronico", lista: listasRamos.listaEquipoElectronico },
      { nombre: "listaRoturaMaquinaria", lista: listasRamos.listaRoturaMaquinaria },
      { nombre: "listaLucroRoturaMaquinaria", lista: listasRamos.listaLucroRoturaMaquinaria },
      { nombre: "listaLucroIncendio", lista: listasRamos.listaLucroIncendio },
      { nombre: "listaRoboAsalto", lista: listasRamos.listaRoboAsalto },
      { nombre: "listaDineroValores", lista: listasRamos.listaDineroValores },
      { nombre: "listaEquipoMaquinaria", lista: listasRamos.listaEquipoMaquinaria },
      { nombre: "listaResponsabilidadCivil", lista: listasRamos.listaResponsabilidadCivil },
      { nombre: "listaFidelidad", lista: listasRamos.listaFidelidad },
      { nombre: "listaAccidentesPersonales", lista: listasRamos.listaAccidentesPersonales },
      { nombre: "listaTransportes", lista: listasRamos.listaTransportes },
      { nombre: "listaTransporteImportaciones", lista: listasRamos.listaTransporteImportaciones },
      { nombre: "listaVehiculos", lista: listasRamos.listaVehiculos },
      { nombre: "listaMotos", lista: listasRamos.listaMotos },
    ];

    var decimales = reglasIndividual.validacionRamoIndividualDecimales(listaRamoSubRamo, subramo);

    var validacionIndividual = reglasIndividual.validacionRamoIndividual(listaRamoSubRamo);
    var validacionIndividualDependiente = reglasIndividual.validacionRamoIndividualDependiente(listaRamoSubRamo, subramo, listas);
    var validacionIndividualDependienteExterno = reglasIndividual.validacionRamoIndividualDependienteExterno(listaRamoSubRamo, subramo, listas);
    var validacionIndividualDependienteUnicoExterno = reglasIndividual.validacionRamoIndividualDependienteUnicoExterno(listaRamoSubRamo, subramo, listas);
    var validacionIndividualDependientePorceltual = reglasIndividual.validacionRamoIndividualDependientePorcentual(listaRamoSubRamo, subramo, listas);
    var validacionVertical = reglasVertical.validacionRamoVertical(listaRamoSubRamo, subramo, ubicacion);
    var validacionVerticalDependienteExterno = reglasVertical.validacionRamoVerticalDependienteExterno(listaRamoSubRamo, subramo, ubicacion, listas);
    var validacionGlobal = reglasGlobal.validacionRamoGlobal(listaRamoSubRamo);
    var validacionGrupal = reglasGrupal.validacionRamoGrupal(listaRamoSubRamo, subramo);
    var validacionGrupalInvertido = reglasGrupal.validacionRamoGrupalInvertido(listaRamoSubRamo, subramo);
    var validacionGrupalMinimo = reglasGrupal.validacionRamoGrupalMinimo(listaRamoSubRamo, subramo);
    var validacionGrupalPorcentual = reglasGrupal.validacionRamoGrupalPorcentual(listaRamoSubRamo, subramo);

    var validacionGrupalPorcentualExterno = reglasGrupal.validacionRamoGrupalPorcentualExterno(listaRamoSubRamo, subramo, listas);
    var validacionGrupalValorExterno = reglasGrupal.validacionRamoGrupalValorExterno(listaRamoSubRamo, subramo, listas);
    var validacionGrupalDependientelExterno = reglasGrupal.validacionRamoGrupalDependienteExterno(listaRamoSubRamo, subramo, listas);

    var validacionGlobalDependientePorcentual = reglasGlobal.validacionRamoGlobalExternoPorcentual(listaRamoSubRamo, subramo, listas);

    this.mostrarAlertaDecimales(decimales, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionIndividual, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionIndividualDependiente, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionIndividualDependienteExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionIndividualDependienteUnicoExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionIndividualDependientePorceltual, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionVertical, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionVerticalDependienteExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGlobal, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupal, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalInvertido, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalPorcentual, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalMinimo, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalPorcentualExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalValorExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGrupalDependientelExterno, "", listaRamoSubRamo, valor, general);
    this.mostrarAlerta(validacionGlobalDependientePorcentual, "", listaRamoSubRamo, valor, general);

    var numero = $('#' + valor + '').val();
    if (numero == "" || numero == " " || numero == null || numero == undefined || numero < 0) {
      general.campoUbicacionDefecto(listaRamoSubRamo, valor);
    }
  }

  public mostrarAlerta(estado: any, descripcion: any, listaRamoSubRamo: any, valor: any, general: any) {
    if (!estado) {
      Swal.fire({
        text: "La sumatoria de los valores ingresados supera el límite establecido por ramo y subramo." + descripcion + "",
        confirmButtonText: "Continuar"
      });
      general.campoUbicacionDefecto(listaRamoSubRamo, valor);
    }
  }

  public mostrarAlertaDecimales(estado: any, descripcion: any, listaRamoSubRamo: any, valor: any, general: any) {
    if (!estado) {
      Swal.fire({
        text: "El valor que intentó ingresar supera el limite de decimales." + descripcion + "",
        confirmButtonText: "Continuar"
      });
      general.campoUbicacionDefecto(listaRamoSubRamo, valor);
    }
  }

}
