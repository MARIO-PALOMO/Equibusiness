import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../servicios/api/api.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilClienteComponent implements OnInit {

  usuario: any = [];

  public fmrUsuario = {
    "IdUsuario": 0,
    "Foto": "",
    "Usuario": "",
    "Email": "",
    "Contrasena": ""
  }

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();

    this.fmrUsuario.IdUsuario = this.usuario.IdUsuario;
    this.fmrUsuario.Foto = this.usuario.Foto;
    this.fmrUsuario.Usuario = this.usuario.Usuario;
    this.fmrUsuario.Email = this.usuario.Email;

    var sesion = this.sesion;
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  public seleccionarFoto() {
    var files = $("#file").prop('files');
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var foto: any = reader.result;
        this.fmrUsuario.Foto = foto;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  public modificarDatosUsuario() {

    if (this.fmrUsuario.Foto == "") {
      this.notificacion("Seleccionar Foto", "error");
    } else if (this.fmrUsuario.Usuario == "") {
      this.notificacion("Ingresar Nombre", "error");
    } else if (this.fmrUsuario.Email == "") {
      this.notificacion("Ingresar Correo Electrónico", "error");
    } else {
      Swal.fire({
        title: '¿Esta seguro de modificar sus datos personales?',
        text: "Si los datos son modificados, deberá iniciar sesión nuevamente.",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: 'rgb(' + this.usuario.broker.Color + ')',
        cancelButtonColor: '#CB4335',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, Modificar'
      }).then((result) => {
        if (result.value) {
          this.gestionDatosUsuario();
        }
      });
    }
  }

  public gestionDatosUsuario() {
    this.spinner.show();

    var parametros = {
      "Identificador": 2,
      "IdUsuario": this.fmrUsuario.IdUsuario,
      "Usuario": this.fmrUsuario.Usuario,
      "Email": this.fmrUsuario.Email,
      "Contrasena": "",
      "Estado": 0,
      "rol": { "IdRol": 0 },
      "Foto": this.fmrUsuario.Foto,
      "broker": { "IdBroker": 0 },
      "IdPadre": 0,
      "Ciudad": "",
      "CodigoTipoAgente": "0",
      "CodigoAgente": "0",
      "CodigoPuntoVenta": "0",
      "CodigoSucursal": "0",
      "Comision": "0",
      "Corredores" : "0",
      "Cedula" : "",
      "IdUsuarioBroker":0
    };

    this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', parametros, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        $('#modificarDatos').modal('toggle');
        this.notificacion("Datos Modificados Exitosamente, Sesión Reiniciada", "success");
        this.cerrarSesion();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public modificarContrasenaUsuario() {
    if (this.fmrUsuario.Contrasena == "") {
      this.notificacion("Ingresar Contraseña", "error");
    } else if (!/^(?=(?:.*\d){2})(?=.*[A-Z])(?=.*[a-z])(?!.{0,4}(.)(?:.*\1){3})\S{8}$/.test(this.fmrUsuario.Contrasena)) {
      this.notificacion("Ingresar una Contraseña Segura", "error");
    } else {
      Swal.fire({
        title: '¿Esta seguro de modificar su contraseña?',
        text: "Si la contraseña es modificada, deberá iniciar sesión nuevamente.",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: 'rgb(' + this.usuario.broker.Color + ')',
        cancelButtonColor: '#CB4335',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, Modificar'
      }).then((result) => {
        if (result.value) {
          this.gestionContrasenaUsuario();
        }
      });
    }
  }

  public gestionContrasenaUsuario() {
    this.spinner.show();

    var parametros = {
      "Identificador": 6,
      "IdUsuario": this.fmrUsuario.IdUsuario,
      "Usuario": "",
      "Email": "",
      "Contrasena": this.fmrUsuario.Contrasena,
      "Estado": 0,
      "rol": { "IdRol": 0 },
      "Foto": "",
      "broker": { "IdBroker": 0 },
      "IdPadre": 0,
      "Ciudad": "",
      "CodigoTipoAgente": "0",
      "CodigoAgente": "0",
      "CodigoPuntoVenta": "0",
      "CodigoSucursal": "0",
      "Comision": "0",
      "Corredores" : "0",
      "Cedula" : "",
      "IdUsuarioBroker":0
    };

    this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', parametros, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        $('#modificarDatos').modal('toggle');
        this.notificacion("Constraseña Modificada Exitosamente, Sesión Reiniciada", "success");
        this.cerrarSesion();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public notificacion(texto, tipo) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: tipo,
      title: texto
    })
  }

  cerrarSesion() {
    this.sesion.cerrarSesion();
  }
}
