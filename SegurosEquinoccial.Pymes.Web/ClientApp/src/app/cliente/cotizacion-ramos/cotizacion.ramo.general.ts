import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class CotizacionRamoGeneral {

  public gestionRamos(listaRamosSubRamos: any, listaRamosSubRamosTasas: any, listaRamosSubRamosReglas: any, codigoRamo: string, codigoSubramo: string) {

    var listaRamo = [];
    var codigosSubRamos = [];
    var datosRamo = listaRamosSubRamos.filter((ramo) => {
      return ramo.Ramo.Codigo == codigoRamo;
    });

    for (let i = 0; i < datosRamo.length; i++) {
      codigosSubRamos.push({ "codigo": datosRamo[i].Codigo + "", "id": "" + codigoSubramo + "" + (i) });
    }

    var datosRamo = listaRamosSubRamos.filter((ramo) => {
      return ramo.Ramo.Codigo == codigoRamo;
    });

    var tasasRamo = listaRamosSubRamosTasas.filter((ramo) => {
      return ramo.SubRamo.Ramo.Codigo == codigoRamo;
    });

    var reglasRamo = listaRamosSubRamosReglas.filter((ramo) => {
      return ramo.SubRamo.Ramo.Codigo == codigoRamo;
    });

    function tasaSubRamo(valor) {
      return tasasRamo.filter((subramo) => {
        if (subramo.SubRamo.Codigo == valor) {
          return subramo;
        }
      });
    }

    function reglasSubramo(cobertura, tipo) {
      return reglasRamo.filter((subramo) => {
        if (subramo.SubRamo.Codigo == cobertura && subramo.Descripcion == tipo) {
          return subramo;
        }
      });
    }

    datosRamo.forEach((coberturas) => {

      for (let i = 0; i < codigosSubRamos.length; i++) {
        if (coberturas.Codigo == codigosSubRamos[i].codigo) {
          listaRamo.push(
            {
              "Valores":
              {
                ValorU1: { "Texto": "" + (codigosSubRamos[i].id) + (i + 1) + "", "TextoMovil": "m" + (codigosSubRamos[i].id) + (i + 1) + "", "Valor": 0, "Provincia": null },
                ValorU2: { "Texto": "" + (codigosSubRamos[i].id) + (i + 2) + "", "TextoMovil": "m" + (codigosSubRamos[i].id) + (i + 2) + "", "Valor": 0, "Provincia": null },
                ValorU3: { "Texto": "" + (codigosSubRamos[i].id) + (i + 3) + "", "TextoMovil": "m" + (codigosSubRamos[i].id) + (i + 3) + "", "Valor": 0, "Provincia": null },
                ValorU4: { "Texto": "" + (codigosSubRamos[i].id) + (i + 4) + "", "TextoMovil": "m" + (codigosSubRamos[i].id) + (i + 4) + "", "Valor": 0, "Provincia": null },
                ValorU5: { "Texto": "" + (codigosSubRamos[i].id) + (i + 5) + "", "TextoMovil": "m" + (codigosSubRamos[i].id) + (i + 5) + "", "Valor": 0, "Provincia": null },
                Tasa: 0,
                TasaMinima: 0,
                Prima: 0,
                NVehiculos: 0,
                NPersonas: 0,
                VPersonas: 0,
                GPersonas: 0,
                ITransporte: 0,
                CTrasporte: "",
                VResponsabilidad: 0,
                EAdicionales: 0
              },
              "Tasa": tasaSubRamo("" + codigosSubRamos[i].codigo + ""),
              "Datos": coberturas,
              "Reglas":
              {
                "Individual": reglasSubramo("" + codigosSubRamos[i].codigo + "", "INDIVIDUAL"),
                "IndividualDependiente": reglasSubramo("" + codigosSubRamos[i].codigo + "", "INDIVIDUALDEP"),
                "IndividualDependienteExterno": reglasSubramo("" + codigosSubRamos[i].codigo + "", "INDIVIDUALDEPEXT"),
                "IndividualDependientePorcentual": reglasSubramo("" + codigosSubRamos[i].codigo + "", "INDIVIDUALDEPPOR"),
                "Vertical": reglasSubramo("" + codigosSubRamos[i].codigo + "", "VERTICAL"),
                "VerticalDependiente": reglasSubramo("" + codigosSubRamos[i].codigo + "", "VERTICALDEP"),
                "Global": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GLOBAL"),
                "Grupal": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPAL"),
                "GrupalInvertido": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALINV"),
                "GrupalPorcentual": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALPOR"),
                "GrupalPorcentualExterno": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALPOREXT"),
                "GrupalMinimo": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALMIN"),
                "Provincial": reglasSubramo("" + codigosSubRamos[i].codigo + "", "PROVINCIAL"),
                "GrupalDependienteExterno": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALDEPEXT"),
                "GrupalValorExterno": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GRUPALVALEXT"),
                "IndividualDependienteUnicoExterno": reglasSubramo("" + codigosSubRamos[i].codigo + "", "INDIVIDUALDEPUNEXT"),
                "GlobalExternoPorcentual": reglasSubramo("" + codigosSubRamos[i].codigo + "", "GLOBALEXTPOR"),
              }
            });
        }
      }
    });
    return listaRamo;
  }

  public asignacionProvinciaSubramos(listaRamo: any) {

    var provinciaUbicacion1 = $('#pril1').html();
    var provinciaUbicacion2 = $('#pril2').html();
    var provinciaUbicacion3 = $('#pril3').html();
    var provinciaUbicacion4 = $('#pril4').html();
    var provinciaUbicacion5 = $('#pril5').html();

    for (var subramos of listaRamo) {
      subramos.Valores.ValorU1.Provincia = (provinciaUbicacion1);
      subramos.Valores.ValorU2.Provincia = (provinciaUbicacion2);
      subramos.Valores.ValorU3.Provincia = (provinciaUbicacion3);
      subramos.Valores.ValorU4.Provincia = (provinciaUbicacion4);
      subramos.Valores.ValorU5.Provincia = (provinciaUbicacion5);
    }
    //console.log(provinciaUbicacion1, provinciaUbicacion2, provinciaUbicacion3, provinciaUbicacion4, provinciaUbicacion5);
  }

  public calcularTasaProvincias(listaRamo: any, subramo: any) {
    /*var esquema = [], agrupacion = [];
    var subtotalProvincia = 0;
    var totalSubRamo = 0;
    var totalTasa = 0;
    //ASIGNA LOS VALORES A UN ESQUEMA DE PROVINCIAS CON SUS VALORES RESPECTIVOS DE TASAS Y VALORES INGRESADOS
    for (var subramos of listaRamo) {
      if (subramos.Datos.Codigo == subramo) {
        totalSubRamo = parseFloat(subramos.Valores.ValorU1.Valor) + parseFloat(subramos.Valores.ValorU2.Valor) + parseFloat(subramos.Valores.ValorU3.Valor) + parseFloat(subramos.Valores.ValorU4.Valor) + parseFloat(subramos.Valores.ValorU5.Valor);

      }
      for (var tasas of subramos.Tasa) {

        if (subramos.Valores.ValorU1.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU1.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU2.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU2.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU3.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU3.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU4.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU4.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU5.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU5.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
      }
    }

    //FILTRA POR SUBRAMO Y AGRUPA SUS RESPECTIVOS VALORES
    for (var resultado of esquema) {
      if (resultado.SubRamo == subramo) {
        agrupacion.push({ "SubRamo": resultado.SubRamo, "Valor": resultado.Valor, "Provincia": resultado.Provincia, "Tasa": resultado.Tasa });
      }
    }
    //SUMA CADA VALOR POR PROVINCIA DE LA MATRIZ AGRUPADA ANTERIORMENTE
    var sumatoriaProvincia = agrupacion.reduce(function (res, obj) {
      if (!(obj.Provincia in res))
        res.__array.push(res[obj.Provincia] = obj);
      else {
        res[obj.Provincia].Valor += obj.Valor;
      }
      return res;
    },
      {
        __array: []
      }).__array.sort(function (a, b) { return b; });

    for (var resultado of sumatoriaProvincia) {
      var subtotal = resultado.Valor * resultado.Tasa;
      subtotalProvincia = subtotalProvincia + subtotal;
    }
    totalTasa = subtotalProvincia / totalSubRamo;
    for (var subramos of listaRamo) {
      if (subramos.Datos.Codigo == subramo) {
        subramos.Valores.Tasa = (isNaN(totalTasa) ? 0 : totalTasa);
        subramos.Valores.TasaMinima = (isNaN(totalTasa) ? 0 : totalTasa);
      }
    }*/

    var esquema = [];
    var sumaTasas = 0;
    var numeroDirecciones = 0;

    for (var subramos of listaRamo) {
      for (var tasas of subramos.Tasa) {

        if (subramos.Valores.ValorU1.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU1.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU2.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU2.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU3.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU3.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU4.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU4.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
        if (subramos.Valores.ValorU5.Provincia === tasas.Provincia.Nombre) {
          esquema.push({ "Provincia": tasas.Provincia.Nombre, "Valor": parseFloat(subramos.Valores.ValorU5.Valor), "SubRamo": subramos.Datos.Codigo, "Tasa": tasas.Valor });
        }
      }
    }

    for (var datos of esquema) {
      if (datos.SubRamo == subramo) {
        numeroDirecciones++;
        sumaTasas += datos.Tasa;
      }
    }

    var tasaPrueba = sumaTasas / numeroDirecciones;

    for (var subramos of listaRamo) {
      if (subramos.Datos.Codigo == subramo) {
        subramos.Valores.Tasa = (isNaN(Math.round(tasaPrueba * 100) / 100) ? 0 : Math.round(tasaPrueba * 100) / 100);
        subramos.Valores.TasaMinima = (isNaN(Math.round(tasaPrueba * 100) / 100) ? 0 : Math.round(tasaPrueba * 100) / 100);
      }
    }

  }

  public calcularPrimaSubramo(lista: any, subramo: any) {
    var subTotalSubRamo = 0;
    var totalSubRamo = 0;
    for (var subramos of lista) {
      if (subramos.Datos.Codigo == subramo) {
        if (subramos.Datos.AcumulaPrimaTotal == "-1") {
          subTotalSubRamo = parseFloat(subramos.Valores.ValorU1.Valor) + parseFloat(subramos.Valores.ValorU2.Valor) + parseFloat(subramos.Valores.ValorU3.Valor) + parseFloat(subramos.Valores.ValorU4.Valor) + parseFloat(subramos.Valores.ValorU5.Valor);
          totalSubRamo = (subTotalSubRamo * subramos.Valores.Tasa) / 100;
          subramos.Valores.Prima = (isNaN(Math.round(totalSubRamo * 100) / 100) ? 0 : Math.round(totalSubRamo * 100) / 100);
        }
      }
    }
  }

  public asignacionNuevoValorTasa(tasa: any, lista: any, subramo: any) {
    for (var subramos of lista) {
      if (subramos.Datos.Codigo == subramo) {
        subramos.Valores.Tasa = tasa;
      }
    }
  }

  public calcularPrimaTotal(lista: any) {
    var total = 0;
    var primaMinima = this.calcularPrimaMinima(lista);
    for (let i = 0; i < lista.length; i++) {
      total = total + lista[i].Valores.Prima;
    }

    return (primaMinima > total && total > 0) ? primaMinima : Math.round(total * 100) / 100;
  }

  public calcularPrimaMinima(lista: any) {
    var primaMinima = 0;
    for (var datos of lista) {
      if (datos.Datos.Ramo.PrimaMinimaSumatoria == 1) {
        primaMinima = datos.Datos.Ramo.PrimaMinima;
      }
    }
    //return primaMinima;
    return 0;
  }

  public calcularPrimaMinimaMensaje(lista: any) {
    var primaMinima = 0;
    for (var datos of lista) {
      if (datos.Datos.Ramo.PrimaMinimaSumatoria == 1) {
        primaMinima = datos.Datos.Ramo.PrimaMinima;
      }
    }
    return primaMinima;
  }

  public mensajePrimaMinima(lista: any) {
    var total = 0;
    var primaMinima = this.calcularPrimaMinimaMensaje(lista);
    for (let i = 0; i < lista.length; i++) {
      total = total + lista[i].Valores.Prima;
    }
    return (primaMinima > total && total > 0) ? 'Prima mínima | $ ' + primaMinima : '';
  }

  public calcularPrimaUbicacion(valor, lista) {

    var Prima = 0;
    for (let coberturas of lista) {
      if (valor == 1) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaPrimaTotal == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU1.Valor * coberturas.Valores.Tasa) / 100);
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaPrimaTotalTerremoto == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU1.Valor * coberturas.Valores.Tasa) / 100);
        }
      } else if (valor == 2) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaPrimaTotal == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU2.Valor * coberturas.Valores.Tasa) / 100);
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaPrimaTotalTerremoto == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU2.Valor * coberturas.Valores.Tasa) / 100);
        }
      } else if (valor == 3) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaPrimaTotal == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU3.Valor * coberturas.Valores.Tasa) / 100);
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaPrimaTotalTerremoto == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU3.Valor * coberturas.Valores.Tasa) / 100);
        }
      } else if (valor == 4) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaPrimaTotal == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU4.Valor * coberturas.Valores.Tasa) / 100);
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaPrimaTotalTerremoto == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU4.Valor * coberturas.Valores.Tasa) / 100);
        }
      } else if (valor == 5) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaPrimaTotal == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU5.Valor * coberturas.Valores.Tasa) / 100);
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaPrimaTotalTerremoto == "-1") {
          Prima = Prima + ((coberturas.Valores.ValorU5.Valor * coberturas.Valores.Tasa) / 100);
        }
      }
    }

    return Math.round(Prima * 100) / 100;
  }

  public primalNetaMultiriesgo(listaRamos) {
    var primaMinima = this.calcularPrimaMinima(listaRamos.listaCoberturasAdicionalesMR);

    var incendio: any = this.calcularPrimaTotal(listaRamos.listaIncendio);
    var equipoElectronico: any = this.calcularPrimaTotal(listaRamos.listaEquipoElectronico);
    var roturaMaquinaria: any = this.calcularPrimaTotal(listaRamos.listaRoturaMaquinaria);
    var roboAsalto: any = this.calcularPrimaTotal(listaRamos.listaRoboAsalto);
    var dineroValores: any = this.calcularPrimaTotal(listaRamos.listaDineroValores);

    var total = 0;

    total = parseFloat(incendio) + parseFloat(equipoElectronico) + parseFloat(roturaMaquinaria) + parseFloat(roboAsalto) + parseFloat(dineroValores);

    return (primaMinima > total && total > 0) ? primaMinima : total;
  }

  public calcularCotizacionTotalGlobal(primaNeta12, primateNeta0, derechosEmision, listaCalculablesCotizacion, impuestosAP, total) {
    var cotizacion = {
      primaNetaIva12: 0,
      primaNetaIva0: 0,
      primaNetaTotal: 0,
      impuestoSBS: 0,
      seguroCampesino: 0,
      derechosEmision: 0,
      iva: 0,
      primaTotal: 0,
    }

    var totalIVA12 = 0;
    var totalIVA0 = 0;
    var primaNetaTotal = 0;
    var impuestoSBS = 0;
    var seguroCampesino = 0;
    var totalDerechosEmision = derechosEmision;
    var iva = 0;
    var totalImpuestoSBS = 0;
    var totalSeguroCampesino = 0;
    var totalIva = 0;

    for (let calculables of listaCalculablesCotizacion) {
      seguroCampesino = calculables.ImpuestoCampesino;
      impuestoSBS = calculables.ImpuestoSBS;
      iva = calculables.Iva;
    }

    totalIVA12 = primaNeta12;
    totalIVA0 = primateNeta0;

    primaNetaTotal = totalIVA12 + totalIVA0;

    totalImpuestoSBS = (impuestoSBS * primaNetaTotal) / 100;
    totalSeguroCampesino = (seguroCampesino * primaNetaTotal) / 100;
    totalIva = (((totalIVA12 + totalImpuestoSBS + totalSeguroCampesino + totalDerechosEmision) - (impuestosAP)) * iva) / 100;

    cotizacion.primaNetaIva12 = Math.round(totalIVA12 * 100) / 100;
    cotizacion.primaNetaIva0 = Math.round(totalIVA0 * 100) / 100;
    cotizacion.primaNetaTotal = Math.round(primaNetaTotal * 100) / 100;
    cotizacion.impuestoSBS = Math.round(totalImpuestoSBS * 100) / 100;
    cotizacion.seguroCampesino = Math.round(totalSeguroCampesino * 100) / 100;
    cotizacion.derechosEmision = Math.round(totalDerechosEmision * 100) / 100;
    cotizacion.iva = Math.round(totalIva * 100) / 100;
    cotizacion.primaTotal = Math.round((cotizacion.primaNetaTotal + cotizacion.impuestoSBS + cotizacion.seguroCampesino + cotizacion.derechosEmision + cotizacion.iva) * 100) / 100;

    var auxDesface = Math.round((total - cotizacion.primaTotal) * 100) / 100;
    cotizacion.iva = (Math.round(totalIva * 100) / 100) + (auxDesface);

    return cotizacion;

  }

  public calcularCotizacionTotal(listaDerechosEmision: any, listaCalculablesCotizacion: any, listaRamos: any, multiriesgo, listaIndividual, nombreRamo) {

    var cotizacion = {
      primaNetaIva12: 0,
      primaNetaIva0: 0,
      primaNetaTotal: 0,
      impuestoSBS: 0,
      seguroCampesino: 0,
      derechosEmision: 0,
      iva: 0,
      primaTotal: 0,
    }

    var accidentesPersonales: any = (nombreRamo == "AccidentesPersonales" ? this.calcularPrimaTotal(listaIndividual) : 0);

    var totalIVA12 = 0;
    var totalIVA0 = 0;
    var primaNetaTotal = 0;
    var impuestoSBS = 0;
    var seguroCampesino = 0;
    var totalDerechosEmision = 0;
    var iva = 0;
    var totalImpuestoSBS = 0;
    var totalSeguroCampesino = 0;
    var totalIva = 0;

    if (multiriesgo == true) {
      var montoMultiriesgo = this.primalNetaMultiriesgo(listaRamos);

      totalIVA12 = (nombreRamo == "AccidentesPersonales" ? 0 : montoMultiriesgo);
    } else {
      totalIVA12 = (nombreRamo == "AccidentesPersonales" ? 0 : this.calcularPrimaTotal(listaIndividual));
    }

    totalIVA0 = accidentesPersonales;

    primaNetaTotal = totalIVA12 + totalIVA0;

    for (let emision of listaDerechosEmision) {
      if (primaNetaTotal > emision.Desde && primaNetaTotal <= emision.Hasta) {
        totalDerechosEmision = emision.Valor;
      }
    }

    for (let calculables of listaCalculablesCotizacion) {
      seguroCampesino = calculables.ImpuestoCampesino;
      impuestoSBS = calculables.ImpuestoSBS;
      iva = calculables.Iva;
    }

    totalImpuestoSBS = (impuestoSBS * primaNetaTotal) / 100;
    totalSeguroCampesino = (seguroCampesino * primaNetaTotal) / 100;
    totalIva = ((totalIVA12 + totalImpuestoSBS + totalSeguroCampesino + totalDerechosEmision) * iva) / 100;

    cotizacion.primaNetaIva12 = Math.round(totalIVA12 * 100) / 100;
    cotizacion.primaNetaIva0 = Math.round(totalIVA0 * 100) / 100;
    cotizacion.primaNetaTotal = Math.round(primaNetaTotal * 100) / 100;
    cotizacion.impuestoSBS = Math.round(totalImpuestoSBS * 100) / 100;
    cotizacion.seguroCampesino = Math.round(totalSeguroCampesino * 100) / 100;
    cotizacion.derechosEmision = Math.round(totalDerechosEmision * 100) / 100;
    cotizacion.iva = (nombreRamo == "AccidentesPersonales" ? 0 : Math.round(totalIva * 100) / 100);
    cotizacion.primaTotal = Math.round((cotizacion.primaNetaTotal + cotizacion.impuestoSBS + cotizacion.seguroCampesino + cotizacion.derechosEmision + cotizacion.iva) * 100) / 100;

    return cotizacion;

    /* var cotizacion = {
       primaNetaIva12: 0,
       primaNetaIva0: 0,
       primaNetaTotal: 0,
       impuestoSBS: 0,
       seguroCampesino: 0,
       derechosEmision: 0,
       iva: 0,
       primaTotal: 0,
     }

     //******** CALCULO DE PRIMAS MINIMAS CON MULTIRIESGO ********
     //IVA 12
     var incendio: any = this.calcularPrimaTotal(listaRamos.listaIncendio);
     var equipoElectronico: any = this.calcularPrimaTotal(listaRamos.listaEquipoElectronico);
     var roturaMaquinaria: any = this.calcularPrimaTotal(listaRamos.listaRoturaMaquinaria);
     var roboAsalto: any = this.calcularPrimaTotal(listaRamos.listaRoboAsalto);
     var dineroValores: any = this.calcularPrimaTotal(listaRamos.listaDineroValores);

     //IVA 12
     var montoMultiriesgo = this.primalNetaMultiriesgo(listaRamos);

     //******** CALCULO DE PRIMAS MINIMAS SIN MULTIRIESGO ********

     var equipoMaquinaria: any = this.calcularPrimaTotal(listaRamos.listaEquipoMaquinaria);
     var lucroRoturaMaquinaria: any = this.calcularPrimaTotal(listaRamos.listaLucroRoturaMaquinaria);
     var lucroIncendio: any = this.calcularPrimaTotal(listaRamos.listaLucroIncendio);
     var responsabilidadCivil: any = this.calcularPrimaTotal(listaRamos.listaResponsabilidadCivil);
     var fidelidad: any = this.calcularPrimaTotal(listaRamos.listaFidelidad);
     var transportes: any = this.calcularPrimaTotal(listaRamos.listaTransportes);

     //IVA 0
     var accidentesPersonales: any = this.calcularPrimaTotal(listaRamos.listaAccidentesPersonales);

     var totalIVA12 = 0;
     var totalIVA0 = 0;
     var primaNetaTotal = 0;
     var impuestoSBS = 0;
     var seguroCampesino = 0;
     var totalDerechosEmision = 0;
     var iva = 0;
     var totalImpuestoSBS = 0;
     var totalSeguroCampesino = 0;
     var totalIva = 0;

     if (multiriesgo == true) {
       totalIVA12 = montoMultiriesgo + parseFloat(equipoMaquinaria) + parseFloat(lucroRoturaMaquinaria) + parseFloat(lucroIncendio) + parseFloat(responsabilidadCivil) + parseFloat(fidelidad) + parseFloat(transportes);
     } else {
       totalIVA12 =
         parseFloat(incendio) +
         parseFloat(equipoElectronico) +
         parseFloat(roturaMaquinaria) +
         parseFloat(roboAsalto) +
         parseFloat(dineroValores) +
         parseFloat(equipoMaquinaria) +
         parseFloat(lucroRoturaMaquinaria) +
         parseFloat(lucroIncendio) +
         parseFloat(responsabilidadCivil) +
         parseFloat(fidelidad) +
         parseFloat(transportes);
     }

     totalIVA0 = parseFloat(accidentesPersonales);
     primaNetaTotal = totalIVA12 + totalIVA0;

     for (let emision of listaDerechosEmision) {
       if (primaNetaTotal > emision.Desde && primaNetaTotal <= emision.Hasta) {
         totalDerechosEmision = emision.Valor;
       }
     }

     for (let calculables of listaCalculablesCotizacion) {
       seguroCampesino = calculables.ImpuestoCampesino;
       impuestoSBS = calculables.ImpuestoSBS;
       iva = calculables.Iva;
     }

     totalImpuestoSBS = (impuestoSBS * primaNetaTotal) / 100;
     totalSeguroCampesino = (seguroCampesino * primaNetaTotal) / 100;
     totalIva = ((totalIVA12 + totalImpuestoSBS + totalSeguroCampesino + totalDerechosEmision) * iva) / 100;

     cotizacion.primaNetaIva12 = Math.round(totalIVA12 * 100) / 100;
     cotizacion.primaNetaIva0 = Math.round(totalIVA0 * 100) / 100;
     cotizacion.primaNetaTotal = Math.round(primaNetaTotal * 100) / 100;
     cotizacion.impuestoSBS = Math.round(totalImpuestoSBS * 100) / 100;
     cotizacion.seguroCampesino = Math.round(totalSeguroCampesino * 100) / 100;
     cotizacion.derechosEmision = Math.round(totalDerechosEmision * 100) / 100;
     cotizacion.iva = Math.round(totalIva * 100) / 100;
     cotizacion.primaTotal = Math.round((cotizacion.primaNetaTotal + cotizacion.impuestoSBS + cotizacion.seguroCampesino + cotizacion.derechosEmision + cotizacion.iva) * 100) / 100;

     return cotizacion;*/
  }

  public calcularCotizacionTransporteImportaciones(validacion) {

    var cotizacion: any;
    var estado = true;

    if (this.calcularPrimaTotal(validacion) == 0) {
      estado = false;
    } else {
      estado = true;
    }

    if (estado == true) {
      cotizacion = {
        primaNetaIva12: Math.round(0.04 * 100) / 100,
        primaNetaIva0: 0,
        primaNetaTotal: Math.round(0.04 * 100) / 100,
        impuestoSBS: 0,
        seguroCampesino: 0,
        derechosEmision: Math.round(0.9 * 100) / 100,
        iva: Math.round(0.11 * 100) / 100,
        primaTotal: Math.round(1.05 * 100) / 100,
      }
    } else {
      cotizacion = {
        primaNetaIva12: 0,
        primaNetaIva0: 0,
        primaNetaTotal: 0,
        impuestoSBS: 0,
        seguroCampesino: 0,
        derechosEmision: 0,
        iva: 0,
        primaTotal: 0,
      }
    }

    return cotizacion;
  }

  public calcularCotizacionVehiculos(valorTotal, tasa, listaDerechosEmision, listaCalculablesCotizacion, valorPrimaPolizaDeducibles, accesorios) {

    var cotizacion = {
      primaNetaTotal: 0,
      impuestoSBS: 0,
      seguroCampesino: 0,
      derechosEmision: 0,
      iva: 0,
      primaTotal: 0,
    }

    var prima = ((valorTotal * tasa) / 100) + valorPrimaPolizaDeducibles + accesorios;

    var primaNetaTotal = prima;
    var impuestoSBS = 0;
    var seguroCampesino = 0;
    var iva = 0;

    var totalDerechosEmision = 0;
    var totalImpuestoSBS = 0;
    var totalSeguroCampesino = 0;
    var totalIva = 0;

    for (let emision of listaDerechosEmision) {
      if (primaNetaTotal > emision.Desde && primaNetaTotal <= emision.Hasta) {
        totalDerechosEmision = emision.Valor;
      }
    }

    for (let calculables of listaCalculablesCotizacion) {
      seguroCampesino = calculables.ImpuestoCampesino;
      impuestoSBS = calculables.ImpuestoSBS;
      iva = calculables.Iva;
    }

    totalImpuestoSBS = (impuestoSBS * primaNetaTotal) / 100;
    totalSeguroCampesino = (seguroCampesino * primaNetaTotal) / 100;
    totalIva = ((primaNetaTotal + totalImpuestoSBS + totalSeguroCampesino + totalDerechosEmision) * iva) / 100;

    cotizacion.primaNetaTotal = Math.round(primaNetaTotal * 100) / 100;
    cotizacion.impuestoSBS = Math.round(totalImpuestoSBS * 100) / 100;
    cotizacion.seguroCampesino = Math.round(totalSeguroCampesino * 100) / 100;
    cotizacion.derechosEmision = Math.round(totalDerechosEmision * 100) / 100;
    cotizacion.iva = Math.round(totalIva * 100) / 100;
    cotizacion.primaTotal = Math.round((cotizacion.primaNetaTotal + cotizacion.impuestoSBS + cotizacion.seguroCampesino + cotizacion.derechosEmision + cotizacion.iva) * 100) / 100;

    return cotizacion;
  }

  public sumarCotizacionVehiculos(listaVehiculos) {
    var totalVehiculos = 0;
    for (let i = 0; i < 1; i++) {
      totalVehiculos += listaVehiculos[i].prima_total;
    }
    return Math.round(totalVehiculos * 100) / 100;
  }

  public calcularCotizacionGloblalTotal(totalMultiriesgo, totalEquipoMaquinaria, totalResponsabilidadCivil, totalFidelidad, totalAccidentesPersonales, totalTransporteInterno, totalTransporteImportaciones, totalVehiculos) {
    var total = totalMultiriesgo + totalEquipoMaquinaria + totalResponsabilidadCivil + totalFidelidad + totalAccidentesPersonales + totalTransporteInterno + totalTransporteImportaciones + totalVehiculos;
    return Math.round(total * 100) / 100;
  }

  public enviarValoresPagar(total, listaCalculablesCotizacion) {

    var ivaParametro = 0;
    var valoresCobro = {
      subtotal: 0,
      iva: 0,
      total: 0
    }

    for (let calculables of listaCalculablesCotizacion) {
      ivaParametro = calculables.Iva;
    }

    var AuxSubTotal = total / 1.12;
    var AuxIva = AuxSubTotal * 0.12;
    var AuxTotal = AuxSubTotal + AuxIva;

    valoresCobro.total = Math.round((AuxTotal) * 100) / 100;
    valoresCobro.iva = Math.round((AuxIva) * 100) / 100;
    valoresCobro.subtotal = Math.round((AuxSubTotal) * 100) / 100;

    return valoresCobro;
  }

  public asignacionReglasAdicionales(listaRamos: any, subramo: any) {
    var regla = 0;
    for (var reglas of listaRamos) {
      if (reglas.SubRamo.Codigo == subramo) {
        if (reglas.Descripcion == "INDIVIDUAL") {
          return reglas.LimiteIndividual;
        }
      }
    }
    return regla;
  }
  public estiloAgregadoAnual(lista: any, subramo: any, direcciones: any) {
    var celda = 1;
    for (var subramos of lista) {
      if (subramos.Datos.Codigo == subramo) {
        if (subramos.Datos.AgregadoAnual == 1) {
          if (direcciones.length == 1) {
            celda = 1;
          } else if (direcciones.length == 2) {
            celda = 2;
          } else if (direcciones.length == 3) {
            celda = 3;
          } else if (direcciones.length == 4) {
            celda = 4;
          } else if (direcciones.length == 5) {
            celda = 5;
          }
        }
      }
    }
    return celda;
  }

  public calcularSumaAsegurada(lista, valor) {
    var Total = 0;
    for (let coberturas of lista) {
      if (valor == 1) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
          Total = Total + coberturas.Valores.ValorU1.Valor;
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
          Total = Total + coberturas.Valores.ValorU1.Valor;
        }
      } else if (valor == 2) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
          Total = Total + coberturas.Valores.ValorU2.Valor;
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
          Total = Total + coberturas.Valores.ValorU2.Valor;
        }
      } else if (valor == 3) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
          Total = Total + coberturas.Valores.ValorU3.Valor;
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
          Total = Total + coberturas.Valores.ValorU3.Valor;
        }
      } else if (valor == 4) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
          Total = Total + coberturas.Valores.ValorU4.Valor;
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
          Total = Total + coberturas.Valores.ValorU4.Valor;
        }
      } else if (valor == 5) {
        if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
          Total = Total + coberturas.Valores.ValorU5.Valor;
        }
        if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
          Total = Total + coberturas.Valores.ValorU5.Valor;
        }
      }
    }
    return Total;
  }

  public calcularSumaAseguradaGlobal(lista) {
    var Total = 0;
    for (let coberturas of lista) {
      if (coberturas.Valores.AplicaTerremoto == undefined && coberturas.Datos.AcumulaSumaTotal == "-1") {
        Total = Total + (coberturas.Valores.ValorU1.Valor + coberturas.Valores.ValorU2.Valor + coberturas.Valores.ValorU3.Valor + coberturas.Valores.ValorU4.Valor + coberturas.Valores.ValorU5.Valor);
      }
      if (coberturas.Valores.AplicaTerremoto == 1 && coberturas.Datos.AcumulaSumaTotalTerremoto == "-1") {
        Total = Total + (coberturas.Valores.ValorU1.Valor + coberturas.Valores.ValorU2.Valor + coberturas.Valores.ValorU3.Valor + coberturas.Valores.ValorU4.Valor + coberturas.Valores.ValorU5.Valor);
      }
    }
    return Total;
  }

  public campoUbicacionDefecto(lista: any, valor) {
    for (var subramos of lista) {
      if (subramos.Valores.ValorU1.Texto == valor) {
        subramos.Valores.ValorU1.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU2.Texto == valor) {
        subramos.Valores.ValorU2.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU3.Texto == valor) {
        subramos.Valores.ValorU3.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU4.Texto == valor) {
        subramos.Valores.ValorU4.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU5.Texto == valor) {
        subramos.Valores.ValorU5.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU1.TextoMovil == valor) {
        subramos.Valores.ValorU1.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU2.TextoMovil == valor) {
        subramos.Valores.ValorU2.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU3.TextoMovil == valor) {
        subramos.Valores.ValorU3.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU4.TextoMovil == valor) {
        subramos.Valores.ValorU4.Valor = 0;
        $('#' + valor + '').val(0);
      }
      if (subramos.Valores.ValorU5.TextoMovil == valor) {
        subramos.Valores.ValorU5.Valor = 0;
        $('#' + valor + '').val(0);
      }
    }
  }

  public visualizacionInicialSubramoMovil(listaSubramo: any, estado: any) {
    if (estado == 1) {
      for (var subramos of listaSubramo) {
        $('#MOVIL' + subramos.Datos.Codigo + '').hide();
      }
    } else if (estado == 0) {
      for (var subramos of listaSubramo) {
        $('#MOVIL' + subramos.Datos.Codigo + '').show();
      }
    }
  }

  public visualizacionSubramoMovil(valor) {
    var estilo = $('#MOVIL' + valor + '').css("display");
    if (estilo == 'none') {
      $('#MOVIL' + valor + '').show();
    } else {
      $('#MOVIL' + valor + '').hide();
    }
  }

}
