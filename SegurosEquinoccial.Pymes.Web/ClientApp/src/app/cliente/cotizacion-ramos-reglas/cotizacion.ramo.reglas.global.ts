export class CotizacionRamoReglasGlobal {
  public validacionRamoGlobal(listaRamoSubRamo: any) {
    var estado = true;
    var cuadricula = [];
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.Global) {
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
              "Regla": reglas.LimiteGlobal,
              "Identificador": reglas.Identificador
            });
          }
        }
      }
    }

    var agrupacion = function (xs, key) {
      return xs.reduce(function (valorAnterior, valorActual) {
        (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
        return valorAnterior;
      }, {});
    };

    var cuadriculaIdentificador: any = Object.values(agrupacion(cuadricula, 'Identificador'));

    const sumatoriaIdentificador = function (lista) {
      return lista.map((value, index, array) => {
        var total = 0;
        for (var valor of array) {
          total += valor.Ubicacion1 + valor.Ubicacion2 + valor.Ubicacion3 + valor.Ubicacion4 + valor.Ubicacion5;
        }
        return { "Total": total, "Identificador": valor.Identificador };
      });
    };

    for (var agrupacion_ of cuadriculaIdentificador) {
      var totales = sumatoriaIdentificador(agrupacion_)[0];
      for (var global of cuadricula) {
        if (totales.Identificador == global.Identificador) {
          if (totales.Total > global.Regla) {
            estado = false;
          }
        }
      }
    }

    return estado;
  }

  public validacionRamoGlobalExternoPorcentual(listaRamoSubRamo: any, subramo: any, listas: any) {
    var estado = true;
    var cuadricula = [];
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.GlobalExternoPorcentual) {
        var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
        var arraySubramosDependientes = textoSubramosDependientes.split("-");
        for (let listaDependiente of listas) {
          if (reglas.ListaRamo == listaDependiente.nombre) {
            for (var valoresRamoPedendiente of listaDependiente.lista) {
              for (var subramosDependientes of arraySubramosDependientes) {
                if (subramosDependientes == valoresRamoPedendiente.Datos.Codigo) {
                  cuadricula.push({
                    "SubRamo": valoresRamoPedendiente.Datos.Codigo,
                    "Ubicacion1": parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor),
                    "Ubicacion2": parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor),
                    "Ubicacion3": parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor),
                    "Ubicacion4": parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor),
                    "Ubicacion5": parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor),
                    "Regla": reglas.Porcentaje,
                    "Identificador": reglas.Identificador
                  });
                }
              }
            }
          }
        }
      }
    }

    var agrupacion = function (xs, key) {
      return xs.reduce(function (valorAnterior, valorActual) {
        (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
        return valorAnterior;
      }, {});
    };

    var cuadriculaIdentificador: any = Object.values(agrupacion(cuadricula, 'Identificador'));

    const sumatoriaIdentificador = function (lista) {
      return lista.map((value, index, array) => {
        var total = 0;
        for (var valor of array) {
          total += valor.Ubicacion1 + valor.Ubicacion2 + valor.Ubicacion3 + valor.Ubicacion4 + valor.Ubicacion5;
        }
        return { "Total": total, "Regla": valor.Regla, "Aplicable": total * valor.Regla };
      });
    };

    var porcentaje = 0;

    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var agrupacion_ of cuadriculaIdentificador) {
          var totales = sumatoriaIdentificador(agrupacion_)[0];
          porcentaje = totales.Aplicable;
          if (subramos.Valores.ValorU1.Valor > porcentaje) {
            return false;
          } if (subramos.Valores.ValorU2.Valor > porcentaje) {
            return false;
          } if (subramos.Valores.ValorU3.Valor > porcentaje) {
            return false;
          } if (subramos.Valores.ValorU4.Valor > porcentaje) {
            return false;
          } if (subramos.Valores.ValorU5.Valor > porcentaje) {
            return false;
          }

        }
      }
    }
    return estado;
  }

}
