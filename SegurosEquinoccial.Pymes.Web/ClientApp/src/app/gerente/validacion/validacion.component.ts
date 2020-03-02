import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ValidacionCotizadorPipe } from '../../pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';
import { Chart } from 'chart.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';

declare var $: any;

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css'],
  providers: [ValidacionCotizadorPipe]
})
export class ValidacionComponent implements OnInit {

  usuario : any = [];

  constructor(private spinner: NgxSpinnerService, private conexion: ApiService,private sesion: SesionService,
    public validador: ValidacionCotizadorPipe) { }

  public Excepciones : any;
  public Identificacion: any;
  public lstBrokers = [];
  public brokerSeleccionado: any;

  public lstReglasGenerales : any = {
    "Igual" : "",
    "Mayor" : "",
    "Menor" : "",
    "Estado" : 1,
    "Nombre" : "",
    "IdBroker" : 0
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
    this.consultarBrokers();
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }


  public crearExcepciones(){
    console.log(this.Excepciones);
    console.log(this.Identificacion);
    console.log(this.brokerSeleccionado);
    
    for (let index = 0; index < this.Excepciones.length; index++) {
     
      this.lstReglasGenerales = {
        "Igual" : "",
        "Mayor" : "",
        "Menor" : "",
        "Estado" : 1,
        "Nombre" : this.Identificacion+"-"+this.Excepciones[index].text,
        "IdBroker" : this.brokerSeleccionado
      }      
    }
    
    setTimeout(() => {
      this.validador.mostrarAlertaCorrecta("Proceso realizado exitosamente", this.usuario.broker.Color); 
    }, 2000);
    
    console.log(this.lstReglasGenerales)

  }

  // GESTIÓN DE BOTON COLOR 
  public gesitonColoresBroker() {
    setTimeout(() => {
      $(".btn-broker").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $(".btn-broker").css("color", "white");
    }, 100);
  }


  // CONSUILTA DE BROKERS A LA BASE DE DATOS 
  public consultarBrokers() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/consultar/brokers', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstBrokers = res;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

}
