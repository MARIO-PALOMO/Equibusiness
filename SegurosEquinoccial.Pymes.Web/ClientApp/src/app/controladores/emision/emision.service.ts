import { Injectable } from '@angular/core';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
declare var $: any;

@Injectable()
export class EmisionService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public emisionPolizas(generadorXML) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/emitir/poliza/multiriesgo", { TramaXML: generadorXML }, this.usuario.Uid).subscribe(
        (res: any) => {

          console.log(res);
          var xml = $.parseXML(res);

          var idpv: any;
          $(xml).find("cargaItemsVariosResponse").each(function () {
            var detalles = $(this).find('cargaItemsVariosResult').text();
            var xml2 = $.parseXML(detalles);

            $(xml2).find("Rptacabecera").each(function () {
              idpv = $(this).find('id_pv').text();
            });
          });

          if (idpv == 0) {
            var err = {
              message: "Error al generar póliza.",
              name: "Error en el servicio externo",
              ok: "false",
              status: "400",
              statusText: "Bad Request",
              url: "cotizacion.component.ts",
              error: res
            };
            this.conexion.error(err)
          }

          resolve(idpv);

        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al generar la póliza.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public ingresarDatosVehiculos(trama) {

    var json = {
      JSONVehiculos: JSON.stringify(trama)
    };
    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/vehiculos/insertar/datos", json, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);
          var datos = JSON.parse(res)

          if (datos.sn_error == "-1") {

            var err = {
              message: "Error al ingresar los datos del vehículo.",
              name: "Error en el servicio externo",
              ok: "false",
              status: "400",
              statusText: "Bad Request",
              url: "emision.service.ts",
              error: res
            };
            this.conexion.error(err)

            resolve(0);
          } else {
            resolve(datos);
          }
        },
        err => {
          this.globales.mostrarNotificacion("Error en el servicio de insertar datos vehículos", "error", "bottom-end");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public generarPolizaVehiculos(proceso, certificado) {

    var datos = {
      "id_proceso": proceso,
      "id_certificado": certificado,
      "cod_usuario": "USRPYMES"
    };

    var json = {
      JSONVehiculos: JSON.stringify(datos)
    };

    return new Promise<any>((resolve, reject) => {
      this.conexion.post("Broker/SBroker.svc/vehiculos/emitir/datos", json, this.usuario.Uid).subscribe(
        (res: any) => {
          console.log(res);

          var datos = JSON.parse(res);

          if (datos.sn_error == "-1") {

            if (datos.proceso == proceso && datos.id_certificado == certificado && datos.txt_mensaje == "Poliza ya generada   " && datos.id_pv != null) {
              resolve(datos);
            }

            var err = {
              message: "Error al generar la póliza de vehículo.",
              name: "Error en el servicio externo",
              ok: "false",
              status: "400",
              statusText: "Bad Request",
              url: "emision.service.ts",
              error: res
            };
            this.conexion.error(err);


            resolve(0);
          } else {
            resolve(datos);
          }
        },
        err => {
          this.globales.mostrarNotificacion("Error en el servicio de emitir póliza vehículos", "error", "bottom-end");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

}
