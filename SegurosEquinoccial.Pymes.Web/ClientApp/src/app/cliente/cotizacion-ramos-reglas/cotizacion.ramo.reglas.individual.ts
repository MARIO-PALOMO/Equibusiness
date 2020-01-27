export class CotizacionRamoReglasIndividual {
  public validacionRamoIndividual(listaRamoSubRamo: any) {
    var estado = true;
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.Individual) {
        if (subramos.Datos.Codigo == reglas.CodigoSubRamoMandatorio) {
          if (subramos.Valores.ValorU1.Valor > reglas.LimiteIndividual || subramos.Valores.ValorU1.Valor < 0) {
            subramos.Valores.ValorU1.Valor = 0;
            estado = false;
          }
          if (subramos.Valores.ValorU2.Valor > reglas.LimiteIndividual || subramos.Valores.ValorU2.Valor < 0) {
            subramos.Valores.ValorU2.Valor = 0;
            estado = false;
          }
          if (subramos.Valores.ValorU3.Valor > reglas.LimiteIndividual || subramos.Valores.ValorU3.Valor < 0) {
            subramos.Valores.ValorU3.Valor = 0;
            estado = false;
          }
          if (subramos.Valores.ValorU4.Valor > reglas.LimiteIndividual || subramos.Valores.ValorU4.Valor < 0) {
            subramos.Valores.ValorU4.Valor = 0;
            estado = false;
          }
          if (subramos.Valores.ValorU5.Valor > reglas.LimiteIndividual || subramos.Valores.ValorU5.Valor < 0) {
            subramos.Valores.ValorU5.Valor = 0;
            estado = false;
          }
        }
      }
    }
    return estado;
  }

  public validacionRamoIndividualDecimales(listaRamoSubRamo, subramo) {
    var estado = true;
    var expresion = new RegExp("^[0-9]+([.][0-9]{1,2})?$");

    for (var subramos of listaRamoSubRamo) {
      if (subramos.Datos.Codigo == subramo) {

        if (!expresion.test(subramos.Valores.ValorU1.Valor)) {
          subramos.Valores.ValorU1.Valor = 0;
          estado = false;
        } if (!expresion.test(subramos.Valores.ValorU2.Valor)) {
          subramos.Valores.ValorU2.Valor = 0;
          estado = false;
        } if (!expresion.test(subramos.Valores.ValorU3.Valor)) {
          subramos.Valores.ValorU3.Valor = 0;
          estado = false;
        } if (!expresion.test(subramos.Valores.ValorU4.Valor)) {
          subramos.Valores.ValorU4.Valor = 0;
          estado = false;
        } if (!expresion.test(subramos.Valores.ValorU5.Valor)) {
          subramos.Valores.ValorU5.Valor = 0;
          estado = false;
        }
      }
    }

    return estado;
  }

  public validacionRamoIndividualDependienteExterno(listaRamoSubRamo: any, subramo: any, listas: any) {
    var estado = true;
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.IndividualDependienteExterno) {
        if (subramos.Datos.Codigo == reglas.CodigoSubRamoMandatorio) {
          if (reglas.CodigoSubRamoMandatorio == subramo) {
            for (var lista of listas) {
              if (lista.nombre == reglas.ListaRamo) {
                var subramoDependiente = reglas.CodigoSubRamoDependiente;
                for (var valoresRamoPedendiente of lista.lista) {
                  if (valoresRamoPedendiente.Datos.Codigo == subramoDependiente) {
                    if (subramos.Valores.ValorU1.Valor > valoresRamoPedendiente.Valores.ValorU1.Valor) {
                      estado = false;
                    } if (subramos.Valores.ValorU2.Valor > valoresRamoPedendiente.Valores.ValorU2.Valor) {
                      estado = false;
                    } if (subramos.Valores.ValorU3.Valor > valoresRamoPedendiente.Valores.ValorU3.Valor) {
                      estado = false;
                    } if (subramos.Valores.ValorU4.Valor > valoresRamoPedendiente.Valores.ValorU4.Valor) {
                      estado = false;
                    } if (subramos.Valores.ValorU5.Valor > valoresRamoPedendiente.Valores.ValorU5.Valor) {
                      estado = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return estado;
  }

  public validacionRamoIndividualDependienteUnicoExterno(listaRamoSubRamo: any, subramo: any, listas: any) {
    var estado = true;
    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.IndividualDependienteUnicoExterno) {
        if (subramos.Datos.Codigo == reglas.CodigoSubRamoMandatorio) {
          if (reglas.CodigoSubRamoMandatorio == subramo) {
            for (var lista of listas) {
              if (lista.nombre == reglas.ListaRamo) {
                var subramoDependiente = reglas.CodigoSubRamoDependiente;
                for (var valoresRamoPedendiente of lista.lista) {
                  if (valoresRamoPedendiente.Datos.Codigo == subramoDependiente) {

                    if (valoresRamoPedendiente.Valores.ValorU1.Valor <= 0
                      && valoresRamoPedendiente.Valores.ValorU2.Valor <= 0
                      && valoresRamoPedendiente.Valores.ValorU3.Valor <= 0
                      && valoresRamoPedendiente.Valores.ValorU4.Valor <= 0
                      && valoresRamoPedendiente.Valores.ValorU5.Valor <= 0) {
                      estado = false;
                    }/* if (valoresRamoPedendiente.Valores.ValorU2.Valor <= 0) {
                      estado = false;
                    } if (valoresRamoPedendiente.Valores.ValorU3.Valor <= 0) {
                      estado = false;
                    } if (valoresRamoPedendiente.Valores.ValorU4.Valor <= 0) {
                      estado = false;
                    } if (valoresRamoPedendiente.Valores.ValorU5.Valor <= 0) {
                      estado = false;
                    }*/
                  }
                }
              }
            }
          }
        }
      }
    }
    return estado;
  }

  //VALIDA UN SUBRAMO DEPENDIENTE DE UNA LISTA SELECCIONADA.- LA VALIDACION SE ENFOCA EN
  //ESCOGER EL VALOR MAYOR DE UNA UBICACION DE UN DETERMINADA COBERTURA/SUBRAMO Y VALIDA REALIZANDO EL
  //CALCULO DEL PORCENTAJE DEFINIDO.
  public validacionRamoIndividualDependientePorcentual(listaRamoSubRamo: any, subramo: any, listas: any) {
    var estado = true;
    var cuadricula: any = [];

    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.IndividualDependientePorcentual) {
        if (subramos.Datos.Codigo == reglas.CodigoSubRamoMandatorio) {
          if (reglas.CodigoSubRamoMandatorio == subramo) {
            for (var lista of listas) {
              if (lista.nombre == reglas.ListaRamo) {
                var subramoDependiente = reglas.CodigoSubRamoDependiente;
                for (var valoresRamoPedendiente of lista.lista) {
                  if (valoresRamoPedendiente.Datos.Codigo == subramoDependiente) {
                    cuadricula.push(
                      parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor),
                    );
                    var valorMayor = Math.max(...cuadricula);
                    var valorMaximo = valorMayor * reglas.Porcentaje;
                    if (subramos.Valores.ValorU1.Valor > valorMaximo || subramos.Valores.ValorU1.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU2.Valor > valorMaximo || subramos.Valores.ValorU2.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU3.Valor > valorMaximo || subramos.Valores.ValorU3.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU4.Valor > valorMaximo || subramos.Valores.ValorU4.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU5.Valor > valorMaximo || subramos.Valores.ValorU5.Valor < 0) {
                      estado = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return estado;
  }

  //VALIDA UN SUBRAMO DEPENDIENTE DE UNA LISTA SELECCIONADA.- LA VALIDACION SE ENFOCA EN
  //ESCOGER EL VALOR MAYOR DE UNA UBICACION DE UN DETERMINADA COBERTURA/SUBRAMO
  public validacionRamoIndividualDependiente(listaRamoSubRamo: any, subramo: any, listas: any) {
    var estado = true;
    var cuadricula: any = [];

    for (var subramos of listaRamoSubRamo) {
      for (var reglas of subramos.Reglas.IndividualDependiente) {
        if (subramos.Datos.Codigo == reglas.CodigoSubRamoMandatorio) {
          if (reglas.CodigoSubRamoMandatorio == subramo) {
            for (var lista of listas) {
              if (lista.nombre == reglas.ListaRamo) {
                var subramoDependiente = reglas.CodigoSubRamoDependiente;
                for (var valoresRamoPedendiente of lista.lista) {
                  if (valoresRamoPedendiente.Datos.Codigo == subramoDependiente) {
                    cuadricula.push(
                      parseFloat(valoresRamoPedendiente.Valores.ValorU1.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU2.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU3.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU4.Valor),
                      parseFloat(valoresRamoPedendiente.Valores.ValorU5.Valor),
                    );
                    var valorMayor = Math.max(...cuadricula);
                    if (subramos.Valores.ValorU1.Valor > valorMayor || subramos.Valores.ValorU1.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU2.Valor > valorMayor || subramos.Valores.ValorU2.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU3.Valor > valorMayor || subramos.Valores.ValorU3.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU4.Valor > valorMayor || subramos.Valores.ValorU4.Valor < 0) {
                      estado = false;
                    } if (subramos.Valores.ValorU5.Valor > valorMayor || subramos.Valores.ValorU5.Valor < 0) {
                      estado = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return estado;
  }
}
