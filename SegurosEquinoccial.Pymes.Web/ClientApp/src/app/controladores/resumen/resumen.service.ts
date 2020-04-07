import { Injectable } from '@angular/core';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { CotizacionRamoGeneral } from '../../cliente/cotizacion-ramos/cotizacion.ramo.general';
declare var moment: any;

@Injectable()
export class ResumenService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService, private general: CotizacionRamoGeneral) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public buscarCotizacion(IdContenido, IdCotizacion, IdDireccion, IdVehiculos, IdEmpresa, Riesgo, Ramo, Transportes, FechaEmision) {

    return new Promise<any>((resolve, reject) => {

      this.conexion.get("Broker/SBroker.svc/cotizacion/completa/resgistros?idContenido=" + IdContenido + "&idCotizacion=" + IdCotizacion + "&idDireccion=" + IdDireccion + "&idVehiculos=" + IdVehiculos + "&idEmpresa=" + IdEmpresa + "", this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          this.conexion.get("Broker/SBroker.svc/ramo/listarSubramosTrasporte/" + this.usuario.broker.IdBroker, this.usuario.Uid).subscribe(
            (resTransportes: any) => {
              var respuesta = {
                deducibles: "",
                textoIncisos: {
                  item1: "",
                  item2: "",
                  item3: "",
                  item4: "",
                  item5: ""
                }
              };

              var garantias = "";
              var condiciones = "";

              var condiciones_ = JSON.parse(res.Contenido.DatosCondiciones);
              var garantias_ = JSON.parse(res.Contenido.DatosGarantias);
              var datosCotizador = JSON.parse(res.Contenido.DatosCotizador);

              var lstRamos = [];
              if (Ramo == "MULTI") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaIncendio,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaIncendio),
                    nombre: datosCotizador.listaIncendio.length > 0 ? datosCotizador.listaIncendio[0].Datos.Ramo.Nombre : '',
                    identificador: "RIL1",
                  },
                  {
                    ramo: datosCotizador.listaEquipoElectronico,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaEquipoElectronico),
                    nombre: datosCotizador.listaEquipoElectronico.length > 0 ? datosCotizador.listaEquipoElectronico[0].Datos.Ramo.Nombre : '',
                    identificador: "REE2",
                  },
                  {
                    ramo: datosCotizador.listaRoturaMaquinaria,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaRoturaMaquinaria),
                    nombre: datosCotizador.listaRoturaMaquinaria.length > 0 ? datosCotizador.listaRoturaMaquinaria[0].Datos.Ramo.Nombre : '',
                    identificador: "RRM3",
                  },
                  {
                    ramo: datosCotizador.listaRoboAsalto,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaRoboAsalto),
                    nombre: datosCotizador.listaRoboAsalto.length > 0 ? datosCotizador.listaRoboAsalto[0].Datos.Ramo.Nombre : '',
                    identificador: "RRA6",
                  },
                  {
                    ramo: datosCotizador.listaCoberturasAdicionalesMR,
                    visualizacion: this.general.primalNetaMultiriesgo(datosCotizador),
                    nombre: datosCotizador.listaCoberturasAdicionalesMR.length > 0 ? datosCotizador.listaCoberturasAdicionalesMR[0].Datos.Ramo.Nombre : '',
                    identificador: "RCA14",
                  },
                  {
                    ramo: datosCotizador.listaDineroValores,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaDineroValores),
                    nombre: datosCotizador.listaDineroValores.length > 0 ? datosCotizador.listaDineroValores[0].Datos.Ramo.Nombre : '',
                    identificador: "RDV7",
                  }
                ];
                respuesta = this.generarIncisos(Riesgo, lstRamos);
                garantias = this.obtenerGarantias(garantias_, "MULTI");
                condiciones = this.obtenerCondiciones(condiciones_, "MULTI");
              } else if (Ramo == "EM") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaEquipoMaquinaria,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaEquipoMaquinaria),
                    nombre: datosCotizador.listaEquipoMaquinaria.length > 0 ? datosCotizador.listaEquipoMaquinaria[0].Datos.Ramo.Nombre : '',
                    identificador: "REM8",
                  }
                ];
                respuesta = this.generarIncisos(Riesgo, lstRamos);
                garantias = this.obtenerGarantias(garantias_, "EM");
                condiciones = this.obtenerCondiciones(condiciones_, "EM");
              } else if (Ramo == "RC") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaResponsabilidadCivil,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaResponsabilidadCivil),
                    nombre: datosCotizador.listaResponsabilidadCivil.length > 0 ? datosCotizador.listaResponsabilidadCivil[0].Datos.Ramo.Nombre : '',
                    identificador: "RRC9",
                  }
                ];
                respuesta = this.generarIncisos(Riesgo, lstRamos);
                garantias = this.obtenerGarantias(garantias_, "RC");
                condiciones = this.obtenerCondiciones(condiciones_, "RC");
              } else if (Ramo == "FI") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaFidelidad,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaFidelidad),
                    nombre: datosCotizador.listaFidelidad.length > 0 ? datosCotizador.listaFidelidad[0].Datos.Ramo.Nombre : '',
                    identificador: "RFI10",
                  }
                ];
                respuesta = this.generarIncisos(Riesgo, lstRamos);
                garantias = this.obtenerGarantias(garantias_, "FI");
                condiciones = this.obtenerCondiciones(condiciones_, "FI");
              } else if (Ramo == "AP") {
                respuesta = this.generarIncisosAP(Riesgo, datosCotizador.listaAccidentesPersonales);
                garantias = this.obtenerGarantias(garantias_, "AP");
                condiciones = this.obtenerCondiciones(condiciones_, "AP");
              } else if (Ramo == "TRIN") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaTransportes,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaTransportes),
                    nombre: datosCotizador.listaTransportes.length > 0 ? datosCotizador.listaTransportes[0].Datos.Ramo.Nombre : '',
                    identificador: "RTR11IN",
                  }
                ];
                respuesta = this.generarIncisosTransportes(Riesgo, lstRamos, resTransportes, Transportes);
                garantias = this.obtenerGarantias(garantias_, "TRIN");
                condiciones = this.obtenerCondiciones(condiciones_, "TRIN");
              } else if (Ramo == "TRIM") {
                lstRamos = [
                  {
                    ramo: datosCotizador.listaTransporteImportaciones,
                    visualizacion: this.general.calcularPrimaTotal(datosCotizador.listaTransporteImportaciones),
                    nombre: datosCotizador.listaTransporteImportaciones.length > 0 ? datosCotizador.listaTransporteImportaciones[0].Datos.Ramo.Nombre : '',
                    identificador: "RTR11IM",
                  }
                ];
                respuesta = this.generarIncisosTransportes(Riesgo, lstRamos, resTransportes, Transportes);
                garantias = this.obtenerGarantias(garantias_, "TRIM");
                condiciones = this.obtenerCondiciones(condiciones_, "TRIM");
              }

              var fechaSeleccionada = moment(FechaEmision).format("YYYY-MM-DD");
              var fechaAcual = moment().format("YYYY-MM-DD");
              var emisionRetroactica = "";
              if (fechaSeleccionada < fechaAcual) {
                var emisionRetroactica = "\n- El asegurado declara que no ha tenido siniestros ocurridos, conocidos ni reportados a la fecha de la emisión del presente programa de seguros.";
              }

              var seguros = "NOTA ACLARATORIA PARA EL PROGRAMA DE SEGUROS:\n*********************************************\n\n- No se requiere inspección para la suscripción de programas de seguros cuya prima sea igual o menor a $ 5.000,00,  sin embargo la compañía podrá realizar inspecciones aleatorias a cualquier riesgo cuya prima sea igual o mayor a este valor y solicitar la implementación de garantías, inclusive después de emitidas las pólizas."
              var final = "* En caso de que el solicitante no sea el asegurado o beneficiario, el seguro será tomado en calidad de tercero\n\n" +
              "* Para Seguros Equinoccial es muy importante contar con su información actualizada para lo cual constantemente realizamos la confirmación de sus datos, además con la firma en su póliza nos autoriza a enviarle la información relacionada con su seguro y factura además de recolectar, digitalizar, mantener, enviar y recibir información comercial y promocional por canales ordinarios, digitales y telefónicos.\n\n" +
              "* Cláusula De Limitación Y Exclusión De Sanciones:\n" +
              "La compañía de seguros no proporcionará cobertura ni será responsable de pagar cualquier reclamo o proporcionar ningún beneficio en el presente documento en la medida en que la provisión de dicha cobertura, el pago de dicho reclamo o la provisión de dicho beneficio la exponga a cualquier sanción, prohibición o restricción en virtud de las resoluciones de las Naciones Unidas o las sanciones, leyes o reglamentos comerciales o económicos de la Unión Europea, los Estados Unidos de América.\n\n" +
              "LA PRESENTE PÓLIZA ESTA EMITIDA EN BASE A LAS CONDICIONES GENERALES, ESPECIALES Y  PARTICULARES, LAS MISMAS QUE ADJUNTAMOS Y, EL ASEGURADO DECLARA ESTAR CONFORME CON SU  CONTENIDO Y LO ACEPTA EN SU TOTALIDAD; SIN EMBARGO, LO QUE SE MODIFICA EXPRESAMENTE EN  CONDICIONES ESPECIALES PREVALECE SOBRE LAS CONDICIONES GENERALES, EL ASEGURADO DEBERÁ ENTREGARNOS LA COPIA DE LA PÓLIZA DEBIDAMENTE FIRMADA.";

              var aclaratorio =
                (respuesta.deducibles == "" ? "" : "DEDUCIBLES\n**********\n\n") + respuesta.deducibles +
                (garantias == "" ? "" : "\n\nGARANTIAS\n*********\n\n") + garantias +
                (condiciones == "" ? "" : "\n\nCONDICIONES\n***********\n\n") + condiciones +
                "\n\n" + seguros + emisionRetroactica + "\n\n" + final + "\n\nTEXTO DE CLAUSULAS\n******************\n\n";

              let sinDiacriticos = (function () {
                let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñ ç ',
                  a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuun c·        ',
                  re = new RegExp('[' + de + ']', 'ug');

                return texto =>
                  texto.replace(
                    re,
                    match => a.charAt(de.indexOf(match))
                  );
              })();


              var datos = {
                textoAclaratorio: sinDiacriticos(aclaratorio),
                textoIncisos: {
                  item1: respuesta.textoIncisos.item1,
                  item2: respuesta.textoIncisos.item2,
                  item3: respuesta.textoIncisos.item3,
                  item4: respuesta.textoIncisos.item4,
                  item5: respuesta.textoIncisos.item5
                }
              }
           
              resolve(datos);
            },
            err => {
              this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al consultar los datos de transporte.", "error", "bottom");
              this.conexion.error(err);
              reject(err);
            }
          );
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al consultar cotización y generar textos aclaratorios e incisos.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public generarIncisosTransportes(riesgo, lstRamos, listaInformacionTransporte, Transportes) {

    var item1 = "";
    var item2 = "";
    var item3 = "";
    var item4 = "";
    var item5 = "";
    var deducibles = "";

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 1) != 0) {
          item1 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item1 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item1 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU1.Valor != 0) {

                if (Transportes == "0") {
                  item1 += coberturas.Datos.NombreObjetoSeguro
                    + " " + this.obtenerDescripcionTransporte(coberturas.Datos.Codigo, coberturas.Valores.ITransporte, listaInformacionTransporte) + ""
                    + "...................... " + "$ " + this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2) + "\n";
                } else {
                  item1 += coberturas.Datos.NombreObjetoSeguro + "...................... " +
                    (this.obtenerDescripcionTransporte(coberturas.Datos.Codigo, coberturas.Valores.ITransporte, listaInformacionTransporte) == "" ?
                      "$ " + this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2) :
                      this.obtenerDescripcionTransporte(coberturas.Datos.Codigo, coberturas.Valores.ITransporte, listaInformacionTransporte)) + "\n";
                }

              }
            }
          }
        }
      }
    }

    //DEDUCIBLES
    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (ramo.nombre != "Amparos Adicionales") {
          deducibles += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          if (ramo.identificador != "RIL1") {
            deducibles += "POR EVENTO\n\n"
          }
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.RiesgoMayor != "" || coberturas.Datos.RiesgoMenor != "") {
              if (coberturas.Datos.Ramo.Codigo != "RCA14") {
                if (coberturas.Datos.Imprime == "-1") {
                  if (coberturas.Datos.NombreObjetoSeguro != "") {
                    deducibles += "*  " + coberturas.Datos.NombreObjetoSeguro + ":\n" + this.gestionCaracteres("-", "*   " + coberturas.Datos.NombreObjetoSeguro) + "\n\n" + (riesgo == 2 ? coberturas.Datos.RiesgoMayor + "\n\n" : coberturas.Datos.RiesgoMenor + "\n\n");
                  }
                }
              }
            }
          }
        }
      }
    }

    var texto = deducibles;
    let sinDiacriticos = (function () {
      let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñ ç ',
        a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuun c·        ',
        re = new RegExp('[' + de + ']', 'ug');

      return texto =>
        texto.replace(
          re,
          match => a.charAt(de.indexOf(match))
        );
    })();

    var datos = {
      deducibles: sinDiacriticos(texto),
      textoIncisos: {
        item1: item1,
        item2: item2,
        item3: item3,
        item4: item4,
        item5: item5
      }
    }
    return datos;
  }

  public obtenerDescripcionTransporte(subramo, id, listaInformacionTransporte) {
    var descripcion = "";
    for (let transporte of listaInformacionTransporte) {
      if (subramo == "STR4" || subramo == "STR2") {
        if (id == transporte.IdSubRamoTransporte) {
          descripcion = transporte.Descripcion;
        }
      }
    }
    return descripcion.toUpperCase();
  }

  public generarIncisos(riesgo, lstRamos) {

    var item1 = "";
    var item2 = "";
    var item3 = "";
    var item4 = "";
    var item5 = "";
    var deducibles = "";

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 1) != 0) {
          item1 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item1 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item1 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU1.Valor != 0) {
                item1 += coberturas.Datos.NombreObjetoSeguro + "...................... $ " + this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2) + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 2) != 0) {
          item2 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item2 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item2 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU2.Valor != 0) {
                item2 += coberturas.Datos.NombreObjetoSeguro + "...................... $ " + this.globales.formatearNumero(coberturas.Valores.ValorU2.Valor, 2) + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 3) != 0) {
          item3 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item3 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item3 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU3.Valor != 0) {
                item3 += coberturas.Datos.NombreObjetoSeguro + "...................... $ " + this.globales.formatearNumero(coberturas.Valores.ValorU3.Valor, 2) + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 4) != 0) {
          item4 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item4 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item4 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU4.Valor != 0) {
                item4 += coberturas.Datos.NombreObjetoSeguro + "...................... $ " + this.globales.formatearNumero(coberturas.Valores.ValorU4.Valor, 2) + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(ramo.ramo, 5) != 0) {
          item5 += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item5 += "OBJETO ASEGURADO                                      SUMA ASEGURADA\n";
          item5 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU5.Valor != 0) {
                item5 += coberturas.Datos.NombreObjetoSeguro + "...................... $ " + this.globales.formatearNumero(coberturas.Valores.ValorU5.Valor, 2) + "\n";
              }
            }
          }
        }
      }
    }

    //DEDUCIBLES 
    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (true) { //ramo.nombre != "Amparos Adicionales"
          deducibles += "\n" + ramo.nombre.toUpperCase() + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          if (ramo.identificador != "RIL1") {
            deducibles += "POR EVENTO\n\n"
          }
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.RiesgoMayor != "" || coberturas.Datos.RiesgoMenor != "") {
              if (true) {//coberturas.Datos.Ramo.Codigo != "RCA14"
                if (coberturas.Datos.Imprime == "-1") {
                  if (coberturas.Datos.NombreObjetoSeguro != "") {
                    deducibles += "*  " + coberturas.Datos.NombreObjetoSeguro + ":\n" + this.gestionCaracteres("-", "*   " + coberturas.Datos.NombreObjetoSeguro) + "\n\n" + (riesgo == 2 ? coberturas.Datos.RiesgoMayor + "\n\n" : coberturas.Datos.RiesgoMenor + "\n\n");
                  }
                }
              }
            }
          }
        }
      }
    }

    var texto = deducibles;
    let sinDiacriticos = (function () {
      let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñ ç ',
        a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuun c·        ',
        re = new RegExp('[' + de + ']', 'ug');

      return texto =>
        texto.replace(
          re,
          match => a.charAt(de.indexOf(match))
        );
    })();

    var datos = {
      deducibles: sinDiacriticos(texto),
      textoIncisos: {
        item1: item1,
        item2: item2,
        item3: item3,
        item4: item4,
        item5: item5
      }
    }

    return datos;
  }

  public generarIncisosAP(riesgo, listaAccidentesPersonales) {

    var item1 = "";
    var item2 = "";
    var item3 = "";
    var deducibles = "";

    var listaDirectivo = [];
    var listaAdministrativo = [];
    var listaOperativo = [];

    for (let accidentes of listaAccidentesPersonales) {
      if (accidentes.Datos.Grupo == "Personal  Directivo") {
        listaDirectivo.push(accidentes);
      } if (accidentes.Datos.Grupo == "Personal  Administrativo") {
        listaAdministrativo.push(accidentes);
      } if (accidentes.Datos.Grupo == "Personal Operativo") {
        listaOperativo.push(accidentes);
      }
    }

    var lstRamos = [
      {
        ramo: listaDirectivo,
        visualizacion: this.general.calcularPrimaTotal(listaDirectivo),
        nombre: listaDirectivo.length > 0 ? listaDirectivo[0].Datos.Ramo.Nombre : '',
        identificador: "RAP12",
        grupo: "GRUPO: PERSONAL DIRECTIVO",
      },
      {
        ramo: listaAdministrativo,
        visualizacion: this.general.calcularPrimaTotal(listaAdministrativo),
        nombre: listaAdministrativo.length > 0 ? listaAdministrativo[0].Datos.Ramo.Nombre : '',
        identificador: "RAP12",
        grupo: "GRUPO: PERSONAL ADMINISTRATIVO",
      },
      {
        ramo: listaOperativo,
        visualizacion: this.general.calcularPrimaTotal(listaOperativo),
        nombre: listaOperativo.length > 0 ? listaOperativo[0].Datos.Ramo.Nombre : '',
        identificador: "RAP12",
        grupo: "GRUPO: PERSONAL OPERATIVO",
      }
    ];

    var lstRamos1 = [
      {
        ramo: listaDirectivo,
        visualizacion: this.general.calcularPrimaTotal(listaDirectivo),
        nombre: listaDirectivo.length > 0 ? listaDirectivo[0].Datos.Ramo.Nombre : '',
        identificador: "GRUPO: PERSONAL DIRECTIVO",
      }
    ];

    var lstRamos2 = [
      {
        ramo: listaAdministrativo,
        visualizacion: this.general.calcularPrimaTotal(listaAdministrativo),
        nombre: listaAdministrativo.length > 0 ? listaAdministrativo[0].Datos.Ramo.Nombre : '',
        identificador: "GRUPO: PERSONAL ADMINISTRATIVO",
      }
    ];

    var lstRamos3 = [
      {
        ramo: listaOperativo,
        visualizacion: this.general.calcularPrimaTotal(listaOperativo),
        nombre: listaOperativo.length > 0 ? listaOperativo[0].Datos.Ramo.Nombre : '',
        identificador: "GRUPO: PERSONAL OPERATIVO",
      }
    ];

    for (let ramo of lstRamos1) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(listaDirectivo, 1) != 0) {
          item1 += "\n" + ramo.nombre + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item1 += ramo.identificador + "\n" + this.gestionCaracteres("-", ramo.identificador) + "\n\n"
          item1 += "COBERTURA                                             SUMA ASEGURADA\n";
          item1 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU1.Valor != 0) {
                item1 += coberturas.Datos.NombreObjetoSeguro +
                  "...................... $ " +
                  (coberturas.Datos.Codigo == "SAP1" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                    coberturas.Datos.Codigo == "SAP5" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                      coberturas.Datos.Codigo == "SAP9" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                        coberturas.Datos.Codigo == "SAP2" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                          coberturas.Datos.Codigo == "SAP6" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                            coberturas.Datos.Codigo == "SAP10" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                              this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2))
                  + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos2) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(listaAdministrativo, 1) != 0) {
          item2 += "\n" + ramo.nombre + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item2 += ramo.identificador + "\n" + this.gestionCaracteres("-", ramo.identificador) + "\n\n"
          item2 += "COBERTURA                                             SUMA ASEGURADA\n";
          item2 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU1.Valor != 0) {
                item2 += coberturas.Datos.NombreObjetoSeguro +
                  "...................... $ " +
                  (coberturas.Datos.Codigo == "SAP1" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                    coberturas.Datos.Codigo == "SAP5" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                      coberturas.Datos.Codigo == "SAP9" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                        coberturas.Datos.Codigo == "SAP2" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                          coberturas.Datos.Codigo == "SAP6" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                            coberturas.Datos.Codigo == "SAP10" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                              this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2))
                  + "\n";
              }
            }
          }
        }
      }
    }

    for (let ramo of lstRamos3) {
      if (ramo.visualizacion != 0) {
        if (this.validarSumaTotalUbicacion(listaOperativo, 1) != 0) {
          item3 += "\n" + ramo.nombre + "\n" + this.gestionCaracteres("=", ramo.nombre) + "\n\n";
          item3 += ramo.identificador + "\n" + this.gestionCaracteres("-", ramo.identificador) + "\n\n"
          item3 += "COBERTURA                                             SUMA ASEGURADA\n";
          item3 += "--------------------------------------------------------------------\n\n";
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.Imprime == "-1") {
              if (coberturas.Valores.ValorU1.Valor != 0) {
                item3 += coberturas.Datos.NombreObjetoSeguro +
                  "...................... $ " +
                  (coberturas.Datos.Codigo == "SAP1" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                    coberturas.Datos.Codigo == "SAP5" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                      coberturas.Datos.Codigo == "SAP9" ? this.globales.formatearNumero(coberturas.Valores.VPersonas, 2) :
                        coberturas.Datos.Codigo == "SAP2" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                          coberturas.Datos.Codigo == "SAP6" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                            coberturas.Datos.Codigo == "SAP10" ? this.globales.formatearNumero(coberturas.Valores.GPersonas, 2) :
                              this.globales.formatearNumero(coberturas.Valores.ValorU1.Valor, 2))
                  + "\n";
              }
            }
          }
        }
      }
    }

    //DEDUCIBLES
    for (let ramo of lstRamos) {
      if (ramo.visualizacion != 0) {
        if (ramo.nombre != "Amparos Adicionales") {
          deducibles += "\n" + ramo.grupo + "\n" + this.gestionCaracteres("=", ramo.grupo) + "\n\n";
          if (ramo.identificador != "RIL1") {
            deducibles += "POR EVENTO\n\n"
          }
          for (let coberturas of ramo.ramo) {
            if (coberturas.Datos.RiesgoMayor != "" || coberturas.Datos.RiesgoMenor != "") {
              if (coberturas.Datos.Ramo.Codigo != "RCA14") {
                if (coberturas.Datos.Imprime == "-1") {
                  if (coberturas.Datos.NombreObjetoSeguro != "") {
                    deducibles += "*  " + coberturas.Datos.NombreObjetoSeguro + ":\n" + this.gestionCaracteres("-", "*   " + coberturas.Datos.NombreObjetoSeguro) + "\n\n" + (riesgo == 2 ? coberturas.Datos.RiesgoMayor + "\n\n" : coberturas.Datos.RiesgoMenor + "\n\n");
                  }
                }
              }
            }
          }
        }
      }
    }
    var texto = "ACCIDENTES PERSONALES\n=====================\n\n" + deducibles;
    let sinDiacriticos = (function () {
      let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñ ç ',
        a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuun c·        ',
        re = new RegExp('[' + de + ']', 'ug');

      return texto =>
        texto.replace(
          re,
          match => a.charAt(de.indexOf(match))
        );
    })();

    var datos = {
      deducibles: sinDiacriticos(texto),
      textoIncisos: {
        item1: (this.obtenerPersonasGruposAP('SAP1', listaDirectivo) == 0 ? '' : "\nNÚMERO PERSONAS ASEGURADAS: " + this.obtenerPersonasGruposAP('SAP1', listaDirectivo)) + "\n" + item1 + this.calculoLimiteCatastrofico(listaAccidentesPersonales, listaDirectivo, listaAdministrativo, listaOperativo),
        item2: (this.obtenerPersonasGruposAP('SAP5', listaAdministrativo) == 0 ? '' : "\nNÚMERO PERSONAS ASEGURADAS: " + this.obtenerPersonasGruposAP('SAP5', listaAdministrativo) + "\n" + item2 + this.calculoLimiteCatastrofico(listaAccidentesPersonales, listaDirectivo, listaAdministrativo, listaOperativo)),
        item3: (this.obtenerPersonasGruposAP('SAP9', listaOperativo) == 0 ? '' : "\nNÚMERO PERSONAS ASEGURADAS: " + this.obtenerPersonasGruposAP('SAP9', listaOperativo) + "\n" + item3 + this.calculoLimiteCatastrofico(listaAccidentesPersonales, listaDirectivo, listaAdministrativo, listaOperativo)),
        item4: "",
        item5: ""
      }
    }

    return datos;
  }

  public obtenerCondiciones(datosCondiciones, ramo_) {
    var condiciones = "";

    for (let condi of datosCondiciones) {
      if (ramo_ == "MULTI") {
        if (condi.identificador == "RIL1" || condi.identificador == "REE2" || condi.identificador == "RRM3" || condi.identificador == "RRA6" || condi.identificador == "RDV7") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "EM") {
        if (condi.identificador == "REM8") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "RC") {
        if (condi.identificador == "RRC9") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "FI") {
        if (condi.identificador == "RFI10") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "AP") {
        if (condi.identificador == "RAP12") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "TRIN") {
        if (condi.identificador == "RTR11IN") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      } else if (ramo_ == "TRIM") {
        if (condi.identificador == "RTR11IM") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              condiciones += "\n" + ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              condiciones += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0) {
              condiciones += "" + ramo.Ramo.Descripcion + "\n\n"
            }
          }
        }
      }
    }

    return condiciones;
  }

  public obtenerGarantias(datosGarantias, ramo_) {
    var garantias = "";

    for (let condi of datosGarantias) {
      if (ramo_ == "MULTI") {
        if (condi.identificador == "RIL1" || condi.identificador == "REE2" || condi.identificador == "RRM3" || condi.identificador == "RRA6" || condi.identificador == "RDV7") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "EM") {
        if (condi.identificador == "REM8") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "RC") {
        if (condi.identificador == "RRC9") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "FI") {
        if (condi.identificador == "RFI10") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "AP") {
        if (condi.identificador == "RAP12") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "TRIN") {
        if (condi.identificador == "RTR11IN") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      } else if (ramo_ == "TRIM") {
        if (condi.identificador == "RTR11IM") {
          for (let ramo of condi.ramo) {
            if (ramo.Ramo.Titulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("=", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Subtitulo == 1) {
              garantias += ramo.Ramo.Descripcion + "\n" + this.gestionCaracteres("-", ramo.Ramo.Descripcion) + "\n\n";
            }
            if (ramo.Ramo.Titulo == 0 && ramo.Ramo.Subtitulo == 0 && ramo.Valor == 1) {
              if (ramo.Valor == true) {
                garantias += "* " + ramo.Ramo.Descripcion + "\n\n"
              }
            }
          }
        }
      }
    }

    return garantias;
  }

  public calculoLimiteCatastrofico(listaAccidentesPersonales, listaAccidentesPersonalesDirectivo, listaAccidentesPersonalesAdmnistrativo, listaAccidentesPersonalesOperativo) {

    var datos = "";

    var maximoLimiteCatastrofico = 0;
    var valorAseguradoGrupoUno = 0;
    var valorAseguradoGrupoDos = 0;
    var valorAseguradoGrupoTres = 0;
    var sumaValoresAsegurados = 0;

    var numeroPersonasDirectivo: number = this.obtenerPersonasGruposAP('SAP1', listaAccidentesPersonalesDirectivo);
    var numeroPersonasAdministrativo: number = this.obtenerPersonasGruposAP('SAP5', listaAccidentesPersonalesAdmnistrativo);
    var numeroPersonasOperativo: number = this.obtenerPersonasGruposAP('SAP9', listaAccidentesPersonalesOperativo);

    var totalPersonas: number = numeroPersonasAdministrativo + numeroPersonasDirectivo + numeroPersonasOperativo;

    for (let coberturas of listaAccidentesPersonales) {
      if (coberturas.Datos.Codigo == "SAP13") {
        for (let reglas of coberturas.Reglas.Individual) {
          maximoLimiteCatastrofico = reglas.LimiteIndividual;
        }
      }
    }

    for (let coberturasG1 of listaAccidentesPersonalesDirectivo) {
      if (coberturasG1.Datos.Codigo == "SAP1") {
        valorAseguradoGrupoUno = coberturasG1.Valores.ValorU1.Valor;
      }
    }


    for (let coberturasG2 of listaAccidentesPersonalesAdmnistrativo) {
      if (coberturasG2.Datos.Codigo == "SAP5") {
        valorAseguradoGrupoDos = coberturasG2.Valores.ValorU1.Valor;
      }
    }


    for (let coberturasG3 of listaAccidentesPersonalesOperativo) {
      if (coberturasG3.Datos.Codigo == "SAP9") {
        valorAseguradoGrupoTres = coberturasG3.Valores.ValorU1.Valor;
      }
    }

    sumaValoresAsegurados = valorAseguradoGrupoUno + valorAseguradoGrupoDos + valorAseguradoGrupoTres;

    if (sumaValoresAsegurados >= maximoLimiteCatastrofico) {
      for (let coberturas of listaAccidentesPersonales) {
        if (coberturas.Datos.Codigo == "SAP13") {
          datos = "\nLÍMITE CATASTRPOFICO: " + this.globales.formatearNumero(maximoLimiteCatastrofico, 2);
        }
      }
    } else {
      for (let coberturas of listaAccidentesPersonales) {
        if (coberturas.Datos.Codigo == "SAP13") {
          datos = "\nLÍMITE CATASTRPOFICO: " + Math.floor(totalPersonas / 2) + " Personas";
        }
      }
    }

    return datos;
  }

  public obtenerPersonasGruposAP(subramo, lista) {
    var personas = 0;
    for (let cobertura of lista) {
      if (cobertura.Datos.Codigo == subramo) {
        personas = cobertura.Valores.NPersonas;
      }
    }
    return personas;
  }

  public enviarTextoInsisosPoliza(Certificado, Item, Texto) {

    var trama = {
      "IdPV": Certificado,
      "Item": Item,
      "Texto": Texto
    };

    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/insertar/texto/incisos", trama, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);
          if (res == 1) {
            resolve(res);
          } else {
            this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al insertar incisos.", "error", "bottom");
            resolve(0);
          }
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al insertar incisos.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public enviarTextoAclaratorioPoliza(Certificado, Texto) {

    var trama = {
      "IdPV": Certificado,
      "Texto": Texto
    };

    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/insertar/texto/aclaratorio", trama, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);
          if (res == 1) {
            resolve(res);
          } else {
            this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al textos aclaratorios.", "error", "bottom");
            resolve(0);
          }
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al insertar textos aclaratorios.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public validarSumaTotalUbicacion(listaRamo, ubicacion) {
    var totalUbicacion = 0;
    for (let subramos of listaRamo) {
      if (ubicacion == 1) {
        totalUbicacion += subramos.Valores.ValorU1.Valor;
      } else if (ubicacion == 2) {
        totalUbicacion += subramos.Valores.ValorU2.Valor;
      } else if (ubicacion == 3) {
        totalUbicacion += subramos.Valores.ValorU3.Valor;
      } else if (ubicacion == 4) {
        totalUbicacion += subramos.Valores.ValorU4.Valor;
      } else if (ubicacion == 5) {
        totalUbicacion += subramos.Valores.ValorU5.Valor;
      }
    }
    return totalUbicacion;
  }

  public gestionCaracteres(caracter, palabra) {
    var longitud = palabra.length;
    var dibujo = "";
    for (var i = 0; i < longitud; i++) {
      dibujo += caracter;
    }

    return dibujo;
  }

}
