export class CotizacionRamoReglasGrupal {

  public validacionRamoGrupal(listaRamoSubRamo: any, subramo: any) {
    var estado = true;
    var cuadricula = [];
    var arraySubramosDependientes: any;
    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.Grupal) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          arraySubramosDependientes = textoSubramosDependientes.split("-");
        }
      }
    }

    if (arraySubramosDependientes != undefined) {

      for (var subramos of listaRamoSubRamo) {
        for (var subramosDependientes of arraySubramosDependientes) {
          if (subramosDependientes == subramos.Datos.Codigo) {
            cuadricula.push({
              "SubRamo": subramos.Datos.Codigo,
              "Ubicacion1": subramos.Valores.ValorU1.Valor,
              "Ubicacion2": subramos.Valores.ValorU2.Valor,
              "Ubicacion3": subramos.Valores.ValorU3.Valor,
              "Ubicacion4": subramos.Valores.ValorU4.Valor,
              "Ubicacion5": subramos.Valores.ValorU5.Valor,
              "Regla": reglas.LimiteGrupal,
              "Identificador": reglas.Identificador
            });
          }
        }
      }

      var cuadriculaIdentificador: any = Object["values"](this.agrupacion(cuadricula, 'Identificador'));

      for (var agrupacion_ of cuadriculaIdentificador) {
        var totales = this.sumatoriaIdentificador(agrupacion_)[0];
        for (var global of cuadricula) {
          if (totales.Identificador == global.Identificador) {
            if (totales.Total > global.Regla) {
              estado = false;
            }
          }
        }
      }
    }

    return estado;
  }

  //VALIDA LA SUMATORIA GLOBAL (POR CADA UBICACION Y VALOR) DE LOS SUBRAMOS SELECCIONADOS POR SUBRAMO DEFINIDO
  //ADEMAS REALIZA UNA VALIDACION INVERTIDA EN QUE EL TOTAL DE LA SUMATORIA GLOBAL POR RAMOS SELECCIONADOS DEBERÁ SER MAYOR AL LIMITE EN LA REGLA
  public validacionRamoGrupalInvertido(listaRamoSubRamo: any, subramo: any) {
    var estado = true;
    var cuadricula = [];
    var arraySubramosDependientes: any;
    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.GrupalInvertido) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          arraySubramosDependientes = textoSubramosDependientes.split("-");
        }
      }
    }

    if (arraySubramosDependientes != undefined) {

      for (var subramos of listaRamoSubRamo) {
        for (var subramosDependientes of arraySubramosDependientes) {
          if (subramosDependientes == subramos.Datos.Codigo) {
            cuadricula.push({
              "SubRamo": subramos.Datos.Codigo,
              "Ubicacion1": subramos.Valores.ValorU1.Valor,
              "Ubicacion2": subramos.Valores.ValorU2.Valor,
              "Ubicacion3": subramos.Valores.ValorU3.Valor,
              "Ubicacion4": subramos.Valores.ValorU4.Valor,
              "Ubicacion5": subramos.Valores.ValorU5.Valor,
              "Regla": reglas.LimiteGrupal,
              "Identificador": reglas.Identificador
            });
          }
        }
      }

      var cuadriculaIdentificador: any = Object["values"](this.agrupacion(cuadricula, 'Identificador'));

      for (var agrupacion_ of cuadriculaIdentificador) {
        var totales = this.sumatoriaIdentificador(agrupacion_)[0];
        for (var global of cuadricula) {
          if (totales.Identificador == global.Identificador) {
            if (totales.Total >= global.Regla) {
              estado = true;
            } else {
              estado = false;
            }
          }
        }
      }
    }

    return estado;
  }

  public validacionRamoGrupalPorcentual(listaRamoSubRamo: any, subramo: any) {
    var estado = true;
    var cuadricula = [];
    var arraySubramosDependientes: any;
    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.GrupalPorcentual) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          arraySubramosDependientes = textoSubramosDependientes.split("-");
        }
      }
    }

    if (arraySubramosDependientes != undefined) {

      for (var subramos of listaRamoSubRamo) {
        for (var subramosDependientes of arraySubramosDependientes) {
          if (subramosDependientes == subramos.Datos.Codigo) {
            cuadricula.push({
              "SubRamo": subramos.Datos.Codigo,
              "Ubicacion1": subramos.Valores.ValorU1.Valor,
              "Ubicacion2": subramos.Valores.ValorU2.Valor,
              "Ubicacion3": subramos.Valores.ValorU3.Valor,
              "Ubicacion4": subramos.Valores.ValorU4.Valor,
              "Ubicacion5": subramos.Valores.ValorU5.Valor,
              "Regla": reglas.Porcentaje,
              "Identificador": reglas.Identificador
            });
          }
        }
      }

      var cuadriculaIdentificador: any = Object["values"](this.agrupacion(cuadricula, 'Identificador'));

      for (var agrupacion_ of cuadriculaIdentificador) {
        var totales = this.sumatoriaIdentificador(agrupacion_)[0];
        for (var grupal of cuadricula) {
          if (totales.Identificador == grupal.Identificador) {
            var Total = totales.Total * grupal.Regla;
            for (var subramos of listaRamoSubRamo) {
              if (subramos.Datos.Codigo == subramo) {
                if (subramos.Valores.ValorU1.Valor > Total) {
                  estado = false;
                }
                if (subramos.Valores.ValorU2.Valor > Total) {
                  estado = false;
                }
                if (subramos.Valores.ValorU3.Valor > Total) {
                  estado = false;
                }
                if (subramos.Valores.ValorU4.Valor > Total) {
                  estado = false;
                }
                if (subramos.Valores.ValorU5.Valor > Total) {
                  estado = false;
                }
              }
            }
          }
        }
      }
    }

    return estado;
  }

  public validacionRamoGrupalPorcentualExterno(listaRamoSubRamo: any, subramo: any, listas: any) {

    var estado = true;
    var cuadricula = [];
    var totalRamoExterno = 0;

    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.GrupalPorcentualExterno) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          var arraySubramosDependientes = textoSubramosDependientes.split("-");
          for (var lista of listas) {
            if (lista.nombre == reglas.ListaRamo) {
              for (var valoresRamoPedendiente of lista.lista) {
                for (var subramosDependientes of arraySubramosDependientes) {
                  if (subramosDependientes == valoresRamoPedendiente.Datos.Codigo) {
                    totalRamoExterno = parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor);

                    cuadricula = [];
                    cuadricula.push({
                      "totalRamoExterno": totalRamoExterno,
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
          var validacionPorcentaje = datos_.totalRamoExterno * datos_.Regla;

          if (validacionPorcentaje < subramos_.Valores.ValorU1.Valor) {
            estado = false;
          } if (validacionPorcentaje < subramos_.Valores.ValorU2.Valor) {
            estado = false;
          } if (validacionPorcentaje < subramos_.Valores.ValorU3.Valor) {
            estado = false;
          } if (validacionPorcentaje < subramos_.Valores.ValorU4.Valor) {
            estado = false;
          } if (validacionPorcentaje < subramos_.Valores.ValorU5.Valor) {
            estado = false;
          }
        }
      }
    }
    return estado;
  }

  public validacionRamoGrupalValorExterno(listaRamoSubRamo: any, subramo: any, listas: any) {

    var estado = true;
    var cuadricula = [];
    var totalRamoExterno = 0;

    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.GrupalValorExterno) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          var arraySubramosDependientes = textoSubramosDependientes.split("-");
          for (var lista of listas) {
            if (lista.nombre == reglas.ListaRamo) {

              for (var valoresRamoPedendiente of lista.lista) {
                for (var subramosDependientes of arraySubramosDependientes) {
                  if (subramosDependientes == valoresRamoPedendiente.Datos.Codigo) {
                    totalRamoExterno += parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor) + parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor);

                    cuadricula = [];
                    cuadricula.push({
                      "totalRamoExterno": totalRamoExterno,
                      "Regla": reglas.LimiteGrupal
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

          if(datos_.totalRamoExterno >= datos_.Regla){
            estado = true;
          }else{
            estado = false;
          }
        }
      }
    }
    return estado;
  }

  public validacionRamoGrupalDependienteExterno(listaRamoSubRamo: any, subramo: any, listas: any) {

    var estado = true;


    try {
      var cuadricula = [];

      var totalRamoExterno = 0;

      for (var subramos of listaRamoSubRamo) {
        if (subramos.Datos.Codigo == subramo) {

          for (var reglas of subramos.Reglas.GrupalDependienteExterno) {

            var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
            var arraySubramosDependientes = textoSubramosDependientes.split("-");

            for (var lista of listas) {
              if (lista.nombre == reglas.ListaRamo) {
                for (var valoresRamoPedendiente of lista.lista) {
                  for (var subramosDependientes of arraySubramosDependientes) {
                    if (subramosDependientes == valoresRamoPedendiente.Datos.Codigo) {
                      cuadricula.push({
                        "SubRamo": valoresRamoPedendiente.Datos.Codigo,
                        "Ubicacion1": parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor),
                        "Ubicacion2": parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor),
                        "Ubicacion3": parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor),
                        "Ubicacion4": parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor),
                        "Ubicacion5": parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor),
                        "Identificador": reglas.Identificador
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }

      const sumatoriaIdentificador = function (lista) {
        return lista.map((value, index, array) => {
          var total = 0;
          for (var valor of array) {
            total += valor.Ubicacion1 + valor.Ubicacion2 + valor.Ubicacion3 + valor.Ubicacion4 + valor.Ubicacion5;
          }
          return { "Total": total, "Identificador": valor.Identificador };
        });
      };

      var total = sumatoriaIdentificador(cuadricula)[0];
      totalRamoExterno = total.Total;

      if (totalRamoExterno <= 0) {
        estado = false;
      }
      /*for (var subramos_ of listaRamoSubRamo) {
        if (subramos_.Datos.Codigo == subramo) {
          totalRamoExterno = total.Total;
          if (subramos_.Valores.ValorU1.Valor > totalRamoExterno) {
            estado = false;
          } if (subramos_.Valores.ValorU2.Valor > totalRamoExterno) {
            estado = false;
          } if (subramos_.Valores.ValorU3.Valor > totalRamoExterno) {
            estado = false;
          } if (subramos_.Valores.ValorU4.Valor > totalRamoExterno) {
            estado = false;
          } if (subramos_.Valores.ValorU5.Valor > totalRamoExterno) {
            estado = false;
          }
        }
      }*/
    } catch (e) {

    }

    return estado;
  }

  public validacionRamoGrupalMinimo(listaRamoSubRamo: any, subramo: any) {
    var estado = true;
    var cuadricula = [];
    var arraySubramosDependientes: any;
    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {
        for (var reglas of subramos.Reglas.GrupalMinimo) {
          var textoSubramosDependientes = reglas.CodigoSubRamoDependiente;
          arraySubramosDependientes = textoSubramosDependientes.split("-");
        }
      }
    }

    if (arraySubramosDependientes != undefined) {

      for (var subramos of listaRamoSubRamo) {
        for (var subramosDependientes of arraySubramosDependientes) {
          if (subramosDependientes == subramos.Datos.Codigo) {
            cuadricula.push({
              "SubRamo": subramos.Datos.Codigo,
              "Ubicacion1": subramos.Valores.ValorU1.Valor,
              "Ubicacion2": subramos.Valores.ValorU2.Valor,
              "Ubicacion3": subramos.Valores.ValorU3.Valor,
              "Ubicacion4": subramos.Valores.ValorU4.Valor,
              "Ubicacion5": subramos.Valores.ValorU5.Valor,
              "Regla": reglas.LimiteGrupal,
              "Identificador": reglas.Identificador
            });
          }
        }
      }

      var cuadriculaIdentificador: any = Object["values"](this.agrupacion(cuadricula, 'Identificador'));

      for (var agrupacion_ of cuadriculaIdentificador) {
        var totales = this.sumatoriaIdentificador(agrupacion_)[0];
        for (var global of cuadricula) {
          if (totales.Identificador == global.Identificador) {
            if (totales.Total > 0) {
              estado = true;
            } else {
              estado = false;
            }
          }
        }
      }
    }

    return estado;
  }

  public sumatoriaIdentificador(lista) {
    return lista.map((value, index, array) => {
      var total = 0;
      for (var valor of array) {
        total += valor.Ubicacion1 + valor.Ubicacion2 + valor.Ubicacion3 + valor.Ubicacion4 + valor.Ubicacion5;
      }
      return { "Total": total, "Identificador": valor.Identificador };
    });
  }

  public agrupacion(xs, key) {
    return xs.reduce(function (valorAnterior, valorActual) {
      (valorAnterior[valorActual[key]] = valorAnterior[valorActual[key]] || []).push(valorActual);
      return valorAnterior;
    }, {});
  }

}
