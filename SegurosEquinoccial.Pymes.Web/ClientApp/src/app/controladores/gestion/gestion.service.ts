import { Injectable } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
declare var $: any;
@Injectable()
export class GestionService {

  usuario: any;
  globales: GlobalesPipe = new GlobalesPipe();

  constructor(public conexion: ApiService, public sesion: SesionService) {
    this.usuario = this.sesion.obtenerDatos();
  }

  public gestionContratante(contratante) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/contratante/gestion", contratante, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdContratante);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar contratante.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionPagador(pagador) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/pagador/gestion", pagador, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdPagador);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar pagador.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionDireciones(direcciones) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/empresa/direccion/gestion", direcciones, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdDireccion);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar direcciones.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionVehiculos(vehiculos) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/empresa/vehiculo/gestion", vehiculos, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdVehiculos);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar vehículos.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionContenido(contenido) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/empresa/contenido/gestion", contenido, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdContenido);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar contenido.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionCotizacion(cotizacion) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/guardar/registro", cotizacion, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdCotizacion);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar cotización.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public gestionCotizacionResultado(resultado) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/resultado/gestion", resultado, this.usuario.Uid).subscribe(
        (res: any) => {
          resolve(res.IdCotizacionResultado);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar cotización resultado.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public guardarCotizacionCompromiso(datos) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/registrar/compromisos/sise", datos, this.usuario.Uid).subscribe(
        (res: any) => {

          var xml = $.parseXML(res);

          var codigo = "";
          $(xml).find("AdministrarOportunidadWebResponse").each(function () {
            codigo = $(this).find('AdministrarOportunidadWebResult').text();
          });

          resolve(codigo);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar cotización resultado.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public cerrarCotizacionCompromiso(datos) {
    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/cerrar/compromisos/sise", datos, this.usuario.Uid).subscribe(
        (res: any) => {
          var xml = $.parseXML(res);

          var codigo = "";
          $(xml).find("CerrarOportunidadGenericoResponse ").each(function () {
            codigo = $(this).find('CerrarOportunidadGenericoResult').text();
          });

          resolve(codigo);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al gestionar cotización resultado.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

  public eliminarDatosCotizacion(identificador, codigos) {
    var datos = {
      Identificador: identificador,
      IdContratante: codigos.IdContratante,
      IdPagador: codigos.IdPagador,
      IdDireccion: codigos.IdDireccion,
      IdVehiculos: codigos.IdVehiculos,
      IdContenido: codigos.IdContenido,
      IdCotizacion: codigos.IdCotizacion
    }

    return new Promise<any>((resolve, reject) => {

      this.conexion.post("Broker/SBroker.svc/cotizacion/eliminar/datos", datos, this.usuario.Uid).subscribe(
        (res: any) => {
          this.globales.mostrarNotificacion("Datos reversados exitosamente.", "warning", "bottom");
          resolve(res);
        },
        err => {
          this.globales.mostrarNotificacion("Exite un error con el servidor de datos.<br>Error al eliminar datos de la cotización.", "error", "bottom");
          this.conexion.error(err);
          reject(err);
        }
      );
    });
  }

}
