import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../servicios/api/api.service';
import { SesionService } from '../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public estadoMensajeValidacion = false;
  public estiloMensajeValidacion = "";
  public textoMensajeValidacion = "";

  public fmrInicioSesion: FormGroup;

  constructor(private conexion: ApiService, private sesion: SesionService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.sesion.verificarCredencialesInicio();
    this.fmrInicioSesion = this.formBuilder.group({
      Email: ["", [Validators.required, , Validators.minLength(5), Validators.email]],
      Contrasena: ["", [Validators.required]]
    });
  }

  verificarUsuario(fmrValores: any) {

    if (this.fmrInicioSesion.controls.Email.status == "INVALID") {
      this.mensaje("alerta-error", "Ingresar un Formato de Correo Electrónico Válido");
      this.spinner.hide();
    } else if (this.fmrInicioSesion.controls.Contrasena.status == "INVALID") {
      this.mensaje("alerta-error", "Ingresar una Contraseña");
      this.spinner.hide();
    } else {
      this.spinner.show();
      this.conexion.post("Gestion/SGesConsultas.svc/usuario/verificar", fmrValores, "").subscribe(
        (res: any) => {

          this.spinner.hide();
          if (res.IdUsuario != 0) {
            if(res.EstadoSesion == 1){
              this.mensaje("alerta-advertencia", "El usuario ya se encuentra iniciado sesión en otro dispositivo.");
            }else{
              this.gestionEstadoSesion(res.IdUsuario, res);
            }
          } else {
            this.mensaje("alerta-advertencia", "Las credenciales ingresadas no son válidas.");
          }
        },
        err => {
          this.spinner.hide();
          this.mensaje("alerta-error", "Exite un error con el servidor de datos. Contactese con el administrador del sistema.");
          this.conexion.error(err);
        }
      );
    }
  }

  gestionEstadoSesion(IdUsuario, Usuario) {

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
      "CodigoAgente": "",
      "CodigoPuntoVenta": "",
      "CodigoSucursal": "",
      "CodigoTipoAgente": "",
      "Comision": 0,
      "Corredores": "0",
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

  mensaje(estilo, mensaje) {
    this.estadoMensajeValidacion = true;
    this.estiloMensajeValidacion = estilo;
    this.textoMensajeValidacion = mensaje;
    setTimeout(() => {
      this.estadoMensajeValidacion = false;
      this.estiloMensajeValidacion = "";
      this.textoMensajeValidacion = "";
    }, 3000);
  }
}
