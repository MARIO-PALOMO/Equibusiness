import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../servicios/api/api.service';
import { SesionService } from '../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public estadoMensajeValidacion = false;
  public estiloMensajeValidacion = "";
  public textoMensajeValidacion = "";
  public usuario: any

  public fmrInicioSesion: FormGroup;

  public opcionesBroker: Array<{ Broker: string, IdBroker: number }> = [];
  public opcionesRol: Array<{ Rol: string, IdRol: number }> = [];

  public brokerSeleccionado: any;
  public rolSeleccionado: any;
  public usuariofinal: any;

  public lstUsuario = [];


  constructor(private conexion: ApiService, private sesion: SesionService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesInicio();
    this.fmrInicioSesion = this.formBuilder.group({
      Email: ["", [Validators.required, , Validators.minLength(5), Validators.email]],
      Contrasena: ["", [Validators.required]]
    });
  }

  public verificarUsuario(fmrValores: any) {
    if (this.fmrInicioSesion.controls.Email.status == "INVALID") {
      this.mensaje("alerta-error", "Ingresar un Formato de Correo Electrónico Válido");
    } else if (this.fmrInicioSesion.controls.Contrasena.status == "INVALID") {
      this.mensaje("alerta-error", "Ingresar una Contraseña");
    } else {
      this.spinner.show();
      this.opcionesBroker = [];
      this.opcionesRol = [];
      this.conexion.post("Gestion/SGesConsultas.svc/usuario/verificar", fmrValores, "").subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res != "") {
            this.usuario = res;
            console.log(res);
            if (this.usuario.length == 1) {
              if (this.usuario[0].EstadoSesion == 0) {
                this.gestionEstadoSesion(this.usuario[0].IdUsuario, this.usuario[0]);
              } else {
                this.mensaje("alerta-advertencia", "El usuario ya se encuentra iniciado sesión en otro dispositivo.");
              }
            } else if (this.usuario.length > 1) {
              var arrayTemporal = [];
              for (let i = 0; i < res.length; i++) {
                arrayTemporal.push({ Broker: res[i].broker.RazonSocial, IdBroker: res[i].broker.IdBroker });
              }
              this.opcionesBroker = this.quitarDuplicados(arrayTemporal, "Broker");
              this.abrirModal();
            }
          } else {
            this.mensaje("alerta-advertencia", "Las credenciales ingresadas no son válidas.");
          }
        },
        err => {
          console.log(err);
          this.spinner.hide();
          this.mensaje("alerta-error", "Exite un error con el servidor de datos. Contactese con el administrador del sistema.");
          this.conexion.error(err);
        }
      );
    }
  }

  public quitarDuplicados(objeto: any, elemento: any) {
    var newArray = [];
    var lookupObject = {};

    for (var i in objeto) {
      lookupObject[objeto[i][elemento]] = objeto[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  public cargarRoles() {
    this.rolSeleccionado = [];
    this.opcionesRol = [];
    for (let i = 0; i < this.usuario.length; i++) {
      if (this.usuario[i].broker.IdBroker == this.brokerSeleccionado.IdBroker) {
        this.opcionesRol.push({ Rol: this.usuario[i].rol.Nombre, IdRol: this.usuario[i].rol.IdRol });
      }
    }
  }

  public abrirSesion() {
    for (let i = 0; i < this.usuario.length; i++) {
      if (this.usuario[i].broker.IdBroker == this.brokerSeleccionado.IdBroker && this.usuario[i].rol.IdRol == this.rolSeleccionado.IdRol) {
        this.usuariofinal = this.usuario[i];
      }
    }
    this.gestionEstadoSesion(this.usuariofinal.IdUsuario, this.usuariofinal);
    this.cerrarModal();
  }

  public gestionEstadoSesion(IdUsuario, Usuario) {

    var datos = {
      Identificador: 7,
      IdUsuario: IdUsuario,
      Usuario: "",
      Email: "",
      Contrasena: "",
      Estado: 0,
      Foto: "",
      IdPadre: 0,
      Ciudad: "",
      CodigoAgente: "",
      CodigoPuntoVenta: "",
      CodigoSucursal: "",
      CodigoTipoAgente: "",
      Comision: 0,
      Corredores: "0",
      Cedula: "",
      IdUsuarioBroker:0,
      rol: {
        IdRol: 0
      },
      broker: {
        IdBroker: 0
      }
    };

    this.spinner.show();
    this.conexion.post("Gestion/SGesTransacciones.svc/usuario/gestion", datos, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.sesion.iniciarSesion(IdUsuario, Usuario);
      },
      err => {
        this.spinner.hide();
        this.mensaje("alerta-error", "Exite un error con el servidor de datos. Contactese con el administrador del sistema.");
        this.conexion.error(err);
      }
    );
  }

  public mensaje(estilo, mensaje) {
    this.estadoMensajeValidacion = true;
    this.estiloMensajeValidacion = estilo;
    this.textoMensajeValidacion = mensaje;
    setTimeout(() => {
      this.estadoMensajeValidacion = false;
      this.estiloMensajeValidacion = "";
      this.textoMensajeValidacion = "";
    }, 3000);
  }

  public abrirModal() {
    $('#modalOpciones').modal('show');
  }

  public cerrarModal() {
    $('#modalOpciones').modal('hide');


  }
}