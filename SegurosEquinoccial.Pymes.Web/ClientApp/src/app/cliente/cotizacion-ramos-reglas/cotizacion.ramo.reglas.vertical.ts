export class CotizacionRamoReglasVertical {
  public validacionRamoVertical(listaRamoSubRamo: any, subramo: any, ubicacion: any) {

    var estado = true;
    var cuadricula = [];
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.Vertical) {
        var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
        var arraySubramosDependientes = textoSubramosDependientes.split("-");

        for (var subramosDependientes of arraySubramosDependientes) {
          if (subramosDependientes == subramos.Datos.Codigo) {
            cuadricula.push({
              "SubRamo": subramos.Datos.Codigo,
              "Ubicacion1": parseFloat(subramos.Valores.ValorU1.Valor),
              "Ubicacion2": parseFloat(subramos.Valores.ValorU2.Valor),
              "Ubicacion3": parseFloat(subramos.Valores.ValorU3.Valor),
              "Ubicacion4": parseFloat(subramos.Valores.ValorU4.Valor),
              "Ubicacion5": parseFloat(subramos.Valores.ValorU5.Valor),
              "Regla": reglas.LimiteVertical,
              "Identificador": reglas.Identificador
            });
          }
        }
      }
    }

    //AGRUPA UNA LISTA DETERMINADA POR UN VALOR DE AGRUPACION DETERMINADO
    var agrupacion = function (xs, key) {
      return xs.reduce(function (valorAnterior, valorActual) {
        (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
        return valorAnterior;
      }, {});
    };

    //REALIZA LA SUMATORIA TOTAL DE UNA LISTA AGRUPADA QUE POSEA EN ELLA 5 UBICACIONES
    var sumatoria = function (vector: any) {
      try {
        return vector.reduce(function (res, obj) {
          if (!(obj.Identificador in res))
            res.__array.push(res[obj.Identificador] = obj);
          else {
            res[obj.Identificador].Ubicacion1 += obj.Ubicacion1;
            res[obj.Identificador].Ubicacion2 += obj.Ubicacion2;
            res[obj.Identificador].Ubicacion3 += obj.Ubicacion3;
            res[obj.Identificador].Ubicacion4 += obj.Ubicacion4;
            res[obj.Identificador].Ubicacion5 += obj.Ubicacion5;
          }
          return res;
        },
          {
            __array: []
          }).__array.sort(function (a, b) { return b; });
      } catch (error) { }
    }

    //AGRUPA LA LISTA CUADRICULA POR IDENTIFICADOR
    var cuadriculaIdentificador: any = Object["values"](agrupacion(cuadricula, 'Identificador'));

    //REALIZA LA SUMTORIA SEGUN EL GRUPO SELECCIONADO
    /*
      cuadriculaIdentificador[0] = VER1
      cuadriculaIdentificador[1] = VER2
      cuadriculaIdentificador[2] = VER3
      ...
    */
    for (let i = 0; i < cuadriculaIdentificador.length; i++) {
      var listaUno: any = cuadriculaIdentificador[i];
      var listaValores: any = sumatoria(listaUno);
      for (var vertical of cuadricula) {
        for (var validacion of listaValores) {
          if (validacion.Identificador == vertical.Identificador) {
            if (vertical.SubRamo == subramo) {
              if (validacion.Ubicacion1 > vertical.Regla && ubicacion == 1) {
                estado = false;
              }
              if (validacion.Ubicacion2 > vertical.Regla && ubicacion == 2) {
                estado = false;
              }
              if (validacion.Ubicacion3 > vertical.Regla && ubicacion == 3) {
                estado = false;
              }
              if (validacion.Ubicacion4 > vertical.Regla && ubicacion == 4) {
                estado = false;
              }
              if (validacion.Ubicacion5 > vertical.Regla && ubicacion == 5) {
                estado = false;
              }
            }
          }
        }
      }
    }
    return estado;
  }

  public validacionRamoVerticalDependienteExterno(listaRamoSubRamo: any, subramo: any, ubicacion: any, listas: any) {

    var estado = true;
    var cuadricula = [];
    var valorU1 = 0;
    var valorU2 = 0;
    var valorU3 = 0;
    var valorU4 = 0;
    var valorU5 = 0;

    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.VerticalDependiente) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          var arraySubramosDependientes = textoSubramosDependientes.split("-");
          for (var lista of listas) {
            if (lista.nombre == reglas.ListaRamo) {
              for (var valoresRamoPedendiente of lista.lista) {
                for (var subramosDependientes of arraySubramosDependientes) {
                  if (subramosDependientes == valoresRamoPedendiente.Datos.Codigo) {
                    valorU1 += parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor);
                    valorU2 += parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor);
                    valorU3 += parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor);
                    valorU4 += parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor);
                    valorU5 += parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor);

                    cuadricula = [];
                    cuadricula.push({
                      "Ubicacion1": valorU1,
                      "Ubicacion2": valorU2,
                      "Ubicacion3": valorU3,
                      "Ubicacion4": valorU4,
                      "Ubicacion5": valorU5,
                      "Regla": reglas.Porcentaje
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    for (var subramos_ of listaRamoSubRamo) {
      if (subramos_.Datos.Codigo == subramo) {
        for (var datos_ of cuadricula) {
          var porcentajeU1 = datos_.Ubicacion1 * datos_.Regla;
          var porcentajeU2 = datos_.Ubicacion2 * datos_.Regla;
          var porcentajeU3 = datos_.Ubicacion3 * datos_.Regla;
          var porcentajeU4 = datos_.Ubicacion4 * datos_.Regla;
          var porcentajeU5 = datos_.Ubicacion5 * datos_.Regla;

          if (porcentajeU1 < subramos_.Valores.ValorU1.Valor) {
            estado = false;
          } if (porcentajeU2 < subramos_.Valores.ValorU2.Valor) {
            estado = false;
          } if (porcentajeU3 < subramos_.Valores.ValorU3.Valor) {
            estado = false;
          } if (porcentajeU4 < subramos_.Valores.ValorU4.Valor) {
            estado = false;
          } if (porcentajeU5 < subramos_.Valores.ValorU5.Valor) {
            estado = false;
          }
        }
      }
    }

    return estado;
  }

  public sumatoriaIdentificador(lista) {
    return lista.reduce(function (res, obj) {
      if (!(obj.Identificador in res))
        res.__array.push(res[obj.Identificador] = obj);
      else {
        res[obj.Identificador].Ubicacion1 += obj.Ubicacion1;
        res[obj.Identificador].Ubicacion2 += obj.Ubicacion2;
        res[obj.Identificador].Ubicacion3 += obj.Ubicacion3;
        res[obj.Identificador].Ubicacion4 += obj.Ubicacion4;
        res[obj.Identificador].Ubicacion5 += obj.Ubicacion5;
      }
      return res;
    },
      {
        __array: []
      }).__array.sort(function (a, b) { return b; });
  }

  public agrupacion(xs, key) {
    return xs.reduce(function (valorAnterior, valorActual) {
      (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
      return valorAnterior;
    }, {});
  }
}
