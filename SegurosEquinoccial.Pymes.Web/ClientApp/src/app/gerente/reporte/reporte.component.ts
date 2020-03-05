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
declare var getColumns: any;
declare var moment: any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [ValidacionCotizadorPipe, GlobalesPipe]
})
export class ReporteComponent implements OnInit {

  usuario: any = [];
  public chartReporteBarCotizaciones: Chart;
  public chartReportePie: Chart;
  public chartReporteBarEmisiones: Chart;

  public lstBrokers = [];
  public listadoReporteUsuariosExportar = [];
  public listadoReporteCotizacionesBrokerCiudadExportar = [];
  public listadoReporteEmisionesBrokerCiudadExportar = [];

  public lstReporteCiudadBroker: any;
  public lstReporteCiudadBrokerC: any;
  public lstReporteCiudadBrokerE: any;

  public lstReporteCotizacionesCiudadBroker: any;
  public lstReporteEmisionesCiudadBroker: any;

  public ciudadSeleccionada: any;

  public brokerSeleccionadoUno: any;
  public brokerSeleccionadoDos: any;
  public brokerSeleccionadoTres: any;
  public brokerSeleccionadoCuatro: any;

  public lstDetalleValoresCotizacionesBrokerCiudad: any;
  public lstDetalleValoresEmisionesBrokerCiudad: any;

  public totalCotizaciones: any;
  public totalEmisiones: any;

  public rsBroker = [];


  public filtros = {
    lstCiudadesCotizadas: [],
    lstCiudadesEmitidas: []
  };

  public rango = {
    Inicio: null,
    Fin: null
  }

  public fechaInicio: any;
  public fechaFin: any;

  constructor(private spinner: NgxSpinnerService, private conexion: ApiService, private sesion: SesionService,
    private mensaje: ValidacionCotizadorPipe, public globales: GlobalesPipe) { }

  ngOnInit() {
    this.gestionFecha();
    this.sesion.verificarCredencialesRutas();
    this.usuario = this.sesion.obtenerDatos();
    this.consultarBrokers();
    var sesion = this.sesion;
    this.gesitonColoresBroker();
    window.addEventListener("unload", function (e) {
      sesion.cerrarSesion();
    });
  }

  gestionFecha() {
    var today = moment()
    this.fechaInicio = new Date('01-01-2019');
    this.rango.Inicio = new Date(moment(today).subtract(7, 'days'));
    this.rango.Fin = new Date();
    this.fechaFin = new Date(moment(today).add(30, "days"));
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

  // CONSULTAR CIUDADES QUE TIENE COTIZACIONES POR CADA BROKER 
  public consultarCotizacionesCiudadesBroker(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/ciudad/broker/cotizaciones/' + broker, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res != "") {
            this.lstReporteCiudadBrokerC = JSON.parse(res);
            this.filtros.lstCiudadesCotizadas = [];
            this.lstDetalleValoresCotizacionesBrokerCiudad = [];
            this.lstDetalleValoresEmisionesBrokerCiudad = [];
            this.totalCotizaciones = [];
            this.totalEmisiones = [];
          } else {
            this.mensaje.mostrarAlertaInformativa('El broker seleccionado no posee cotizaciones.', this.usuario.broker.Color);
            this.filtros.lstCiudadesCotizadas = [];
            this.lstReporteCiudadBrokerC = [];
          }

        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public consultarEmisionesCiudadesBroker(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/ciudad/broker/emisiones/' + broker, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res != "") {
            this.lstReporteCiudadBrokerE = JSON.parse(res);
            this.filtros.lstCiudadesEmitidas = [];
            this.lstDetalleValoresCotizacionesBrokerCiudad = [];
            this.lstDetalleValoresEmisionesBrokerCiudad = [];
            this.totalCotizaciones = [];
            this.totalEmisiones = [];
          } else {
            this.mensaje.mostrarAlertaInformativa('El broker seleccionado no posee emisiones.', this.usuario.broker.Color);
            this.filtros.lstCiudadesEmitidas = [];
            this.lstReporteCiudadBrokerE = [];
          }
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }


  public CargarTablaDetalleValores(broker: any) {
    if (broker == "") {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      var aux = "";
      for (let i = 0; i < broker.length; i++) {
        aux += "Broker.IdBroker = " + broker[i].IdBroker + " OR ";
      }
      var datos = {
        Broker: aux.slice(0, -4),
        Estado: 5,
        FechaInicio: moment(this.rango.Inicio).format("YYYY-MM-DD"),
        FechaFin: moment(this.rango.Fin).format("YYYY-MM-DD")
      }
      this.detalleValoresCotizacionesBrokerCiudad(datos);
    }
  }

  // CONSULTAR DETALLE DE VALORES DE COTIZACIONES Y EMISIONES POR BROKER Y CIUDAD 
  public detalleValoresCotizacionesBrokerCiudad(datos: any) {
    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/reporte/datalle/valores/cotizaciones', datos, this.usuario.Uid).subscribe(
      (res: any) => {

        this.spinner.hide();
        if (res != "") {
          this.lstDetalleValoresCotizacionesBrokerCiudad = JSON.parse(res);
          var valor = 0;
          for (let cotizaciones of this.lstDetalleValoresCotizacionesBrokerCiudad) {
            valor += parseFloat(cotizaciones.Total);
          }
          this.totalCotizaciones = Math.round(valor * 100) / 100;
          this.totalCotizaciones = this.totalCotizaciones.toFixed(2);
          this.detalleValoresEmisionesBrokerCiudad(datos);
        } else {
          this.mensaje.mostrarAlertaInformativa('El Broker seleccionado no tiene cotizaciones realizadas en el rango de fechas elegidas.', this.usuario.broker.Color);
          this.lstDetalleValoresCotizacionesBrokerCiudad = [];
          this.totalCotizaciones = [];

          setTimeout(() => {
            this.detalleValoresEmisionesBrokerCiudad(datos);
          }, 3000);
        }

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public detalleValoresEmisionesBrokerCiudad(datos: any) {
    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/reporte/datalle/valores/emisiones', datos, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != "") {
          this.lstDetalleValoresEmisionesBrokerCiudad = JSON.parse(res);

          var valor2 = 0;
          for (let emisiones of this.lstDetalleValoresEmisionesBrokerCiudad) {
            valor2 += parseFloat(emisiones.Total);
          }
          this.totalEmisiones = Math.round(valor2 * 100) / 100;
          this.totalEmisiones = this.totalEmisiones.toFixed(2);
        } else {
          this.mensaje.mostrarAlertaInformativa('El Broker seleccionado no tiene emisiones realizadas en el rango de fechas elegidas.', this.usuario.broker.Color);
          this.lstDetalleValoresEmisionesBrokerCiudad = [];
          this.totalEmisiones = [];
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  // FUNCIONES PARA GRAFICAR LOS CANVAS 

  public graficarReporteCotizacionesBrokerCiudad(broker: any) {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/reporte/cotizaciones/ciudad?IdBroker=' + broker + '&estado=5', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstReporteCotizacionesCiudadBroker = JSON.parse(res);

        var datasetCotizaciones = {
          x: [],
          y: [],
          z: []
        };

        for (var listado of this.filtros.lstCiudadesCotizadas) {
          for (let cotizaciones of this.lstReporteCotizacionesCiudadBroker) {
            if (listado.Ciudad === cotizaciones.Ciudad) {
              datasetCotizaciones.x.push(cotizaciones.Ciudad);
              datasetCotizaciones.y.push(cotizaciones.Total);
              datasetCotizaciones.z.push(this.colorAleatorio());
            }
          }
        }
        this.generarGraficoBar(datasetCotizaciones.x, datasetCotizaciones.y, datasetCotizaciones.z, 'bar', 'Cotizaciones Por Ciudad', 'Gráfico de Cotizaciones por Ciudad');

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public graficarReporteEmisionesBrokerCiudad(broker: any) {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/reporte/emisiones/ciudad?IdBroker=' + broker + '&estado=5', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstReporteEmisionesCiudadBroker = JSON.parse(res);

        var datasetCotizaciones = {
          x: [],
          y: [],
          z: []
        };
        for (var listado of this.filtros.lstCiudadesEmitidas) {
          for (let emisiones of this.lstReporteEmisionesCiudadBroker) {
            if (listado.Ciudad === emisiones.Ciudad && emisiones.Total > 0) {
              datasetCotizaciones.x.push(emisiones.Ciudad);
              datasetCotizaciones.y.push(emisiones.Total);
              datasetCotizaciones.z.push(this.colorAleatorio());
            }
          }
        }
        this.generarGraficoBarEmisiones(datasetCotizaciones.x, datasetCotizaciones.y, datasetCotizaciones.z, 'bar', 'Emisiones Por Ciudad', 'Gráfico de Emisiones por Ciudad');

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public graficarReporteUsuariosBrokerCiudad(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/ciudad/broker/' + broker, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.lstReporteCiudadBroker = JSON.parse(res);
          var dataset = {
            x: [],
            y: [],
            z: []
          };

          for (let corredores of this.lstReporteCiudadBroker) {
            dataset.x.push(corredores.Ciudad);
            dataset.y.push(corredores.Total);
            dataset.z.push(this.colorAleatorio());
          }
          this.generarGraficoPie(dataset.x, dataset.y, dataset.z, 'pie', 'N° de Operadores por Ciudad', 'Gráfico Operadores por Ciudad');
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  // FUNCIONES DE LOS GRAFICOS
  public generarGraficoBar(textos: any, valores: any, colores: any, tipo: any, leyenda: any, titulo: any) {
    if (this.chartReporteBarCotizaciones || this.lstReporteCiudadBrokerC == "") {
      this.chartReporteBarCotizaciones.destroy();
    }
    this.chartReporteBarCotizaciones = new Chart('canvasCotizaciones', {
      type: '' + tipo + '',
      data: {
        labels: textos,
        datasets: [
          {
            label: leyenda,
            data: valores,
            borderColor: colores,
            backgroundColor: colores,
            border: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: titulo
        },
        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y +25);
              });
            });
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                if (Math.floor(label) === label) {
                  return label;
                }
              },
            }
          }],
        }
      }
    });
  }

  public generarGraficoBarEmisiones(textos: any, valores: any, colores: any, tipo: any, leyenda: any, titulo: any) {
    if (this.chartReporteBarEmisiones || this.lstReporteCiudadBrokerE == "") {
      this.chartReporteBarEmisiones.destroy();
    }
    this.chartReporteBarEmisiones = new Chart('canvasEmisiones', {
      type: '' + tipo + '',
      data: {
        labels: textos,
        datasets: [
          {
            label: leyenda,
            data: valores,
            borderColor: colores,
            backgroundColor: colores,
            border: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: titulo
        },
        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y +25);
              });
            });
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                if (Math.floor(label) === label) {
                  return label;
                }
              },
            }
          }],
        },
      }
    });
  }


  public generarGraficoPie(textos: any, valores: any, colores: any, tipo: any, leyenda: any, titulo: any) {
    if (this.chartReportePie) this.chartReportePie.destroy();
    this.chartReportePie = new Chart('canvasUsuarios', {
      type: '' + tipo + '',
      data: {
        labels: textos,
        datasets: [
          {
            label: leyenda,
            data: valores,
            borderColor: colores,
            backgroundColor: colores,
            border: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: titulo
        }
      }
    });
  }

  // LISTAR DATOS DE LA BASE PARA EXPORTAR A EXCEL 
  public listarReporteCotizacionesBroker(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/listar/cotizaciones?IdBroker=' + broker + '&estado=5', this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.listadoReporteCotizacionesBrokerCiudadExportar = res;
          this.exportarReportesExcel("Cotizaciones", this.listadoReporteCotizacionesBrokerCiudadExportar);
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public listarReporteEmisionesBroker(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/listar/emisiones?IdBroker=' + broker + '&estado=5', this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.listadoReporteEmisionesBrokerCiudadExportar = res;

          if (this.listadoReporteEmisionesBrokerCiudadExportar.length == 0) {
            this.mensaje.mostrarAlerta('El Broker sellecionado no tiene pólizas emitidas hasta el momento.', this.usuario.broker.Color);
          } else {
            this.exportarReportesExcel("Emisiones", this.listadoReporteEmisionesBrokerCiudadExportar);
          }
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public listarReporteUsuariosBroker(broker: any) {
    if (broker == undefined) {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      this.spinner.show();
      this.conexion.get('Broker/SBroker.svc/reporte/listar/usuarios/' + broker, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.listadoReporteUsuariosExportar = res;
          this.exportarReportesExcel("Usuarios", this.listadoReporteUsuariosExportar);
        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  // FUNCIÓN PARA EXPORTAR A EXCEL 
  public exportarReportesExcel(titulo: any, data: any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    wb.Props = {
      Title: "Reporte " + titulo + " " + this.globales.obtenerFecha('-'),
      Author: this.usuario.Usuario,
      CreatedDate: this.globales.obtenerFecha('-')
    }
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Reporte ' + titulo + " " + this.globales.obtenerFecha('-') + '.xlsx');
  }

  public exportartableToExcel(broker: any) {
    if (broker == "") {
      this.mensaje.mostrarAlerta('Seleccione un Broker para habilitar esta función.', this.usuario.broker.Color);
    } else {
      if (this.lstDetalleValoresCotizacionesBrokerCiudad == undefined || this.lstDetalleValoresEmisionesBrokerCiudad == undefined) {
        this.mensaje.mostrarAlerta('No hay datos para exportar.', this.usuario.broker.Color);
      } else {
        const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('detalleCotizaciones'));
        const ws3: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('detalleEmisiones'));
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        wb.Props = {
          Title: "Detalle Valores de Cotizaciones y Emisiones " + this.globales.obtenerFecha('-'),
          Author: this.usuario.Usuario,
          CreatedDate: this.globales.obtenerFecha('-')
        }
        XLSX.utils.book_append_sheet(wb, ws2, 'Detalle Cotizaciones');
        XLSX.utils.book_append_sheet(wb, ws3, 'Detalle Emisiones');
        XLSX.writeFile(wb, "Detalle Valores de Cotizaciones y Emisiones " + this.globales.obtenerFecha('-') + '.xlsx');
      }
    }
  }

  // GENERAR COLORES ALEATORIOS
  public colorAleatorio() {
    var color = "rgba(" + (Math.floor(Math.random() * (255 - 1)) + 1) + "," + (Math.floor(Math.random() * (255 - 1)) + 1) + "," + (Math.floor(Math.random() * (255 - 1)) + 1) + ",0.4)";
    return color;
  }

  // GESTIÓN DE BOTON COLOR 
  public gesitonColoresBroker() {
    setTimeout(() => {
      $(".btn-broker").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $(".btn-broker").css("color", "white");
    }, 100);
  }


}