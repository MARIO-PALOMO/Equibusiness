import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ValidacionCotizadorPipe } from '../../pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';
import { GenericoService } from '../../controladores/generico/generico.service';

declare var $: any;

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css'],
  providers: [ValidacionCotizadorPipe]
})
export class ValidacionComponent implements OnInit {

  usuario: any = [];

  constructor(private spinner: NgxSpinnerService, private conexion: ApiService, private sesion: SesionService,
    public validador: ValidacionCotizadorPipe, private generico: GenericoService) { }

  public Excepciones: any;
  public Identificacion: any;
  public lstBrokers = [];
  public brokerSeleccionado: any;

  public lstReglasGenerales: any = {
    "Identificador": 1,
    "IdBroker": 0,
    "Nombre": "",
  }

  public lstExcepciones: Array<{ text: string, value: number }> = [
    { text: "COMPROMISOS", value: 1 },
    { text: "POLIZAS", value: 2 },
    { text: "FORMULARIO", value: 3 }
  ];

  ngOnInit() {
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    var sesion = this.sesion;
    this.gesitonColoresBroker();
    window.addEventListener("unload", function (e) { sesion.cerrarSesion(); });
    this.consultarBrokers();
  }

  // CONSUILTA DE BROKERS A LA BASE DE DATOS 
  public consultarBrokers() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/consultar/brokers', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstBrokers = res;
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public crearExcepciones() {

    if (this.Identificacion == undefined) {
      this.validador.mostrarAlerta("Llene el campo Identificación", this.usuario.broker.Color);
    } else if (this.brokerSeleccionado == undefined) {
      this.validador.mostrarAlerta("Llene el campo Vesión de Uso.", this.usuario.broker.Color);
    } else if (this.Excepciones == undefined || this.Excepciones == "") {
      this.validador.mostrarAlerta("Elija por lo menos una excepción para este cliente.", this.usuario.broker.Color);
    } else {
      this.spinner.show();
      for (let i = 0; i < this.Excepciones.length; i++) {
        this.lstReglasGenerales = {
          "Identificador": 1,
          "IdBroker": this.brokerSeleccionado,
          "Nombre": this.Identificacion + "-" + this.Excepciones[i].text
        }
        this.conexion.post('Broker/SBroker.svc/gestion/excepciones/crear', this.lstReglasGenerales, this.usuario.Uid).subscribe(
          (res: any) => {
            console.log(res);
            this.spinner.hide();
            setTimeout(() => {
              this.validador.mostrarAlertaCorrecta("Proceso realizado exitosamente", this.usuario.broker.Color);
            }, 1500);
          },
          err => {
            console.log(err);
            this.spinner.hide();
            this.conexion.error(err);
          }
        );
      } 

      
    }
    /*    
    this.spinner.show();
    for (let index = 0; index < this.Excepciones.length; index++) {
      this.generico.verificarReglasGenerales(this.brokerSeleccionado, this.Identificacion + "-" + this.Excepciones[index].text).then(reglaC => {
        this.spinner.hide();
        if (reglaC.Broker == null) {
 
          this.lstReglasGenerales = {
            "Identificador": 1,
            "IdBroker": this.brokerSeleccionado,
            "Nombre": this.Identificacion + "-" + this.Excepciones[index].text
          }
          
        } else {
          this.validador.mostrarAlerta("El Cliente ya tiene una excepción registrada con otro  ", this.usuario.broker.Color);
        }
      }).catch(err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      });
    }
    setTimeout(() => {
      this.validador.mostrarAlertaCorrecta("Proceso realizado exitosamente", this.usuario.broker.Color);
      this.Identificacion = "";
      this.lstBrokers = [];
      this.lstExcepciones = [];
    }, 1500);
 */
  }

  // GESTIÓN DE BOTON COLOR 
  public gesitonColoresBroker() {
    setTimeout(() => {
      $(".btn-broker").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $(".btn-broker").css("color", "white");
    }, 100);
  }
}