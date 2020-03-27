import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, process, State } from '@progress/kendo-data-query';
import * as Chart from 'chart.js';

declare var moment: any;

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  providers: [GlobalesPipe]
})
export class ResumenSupervisionComponent implements OnInit {

  public chartEmitidas: Chart;
  public chartSinEmitir: Chart;
  public chartTotal: Chart;

  public lstUsuarios: Array<{ texto: string, valor: number, sql: string, foto: string }> = [];

  public filtros = {
    usuarios: [],
    fechaInicio: null,
    fechaFin: null
  }

  public usuario: any;
  public lstCotizaciones = [];

  public cotizacionesResumen = {
    total: "0",
    concretadas: 0,
    noConcretadas: 0,
    usuarios: 0,
  };

  public listaEstados = [];

  public groups: GroupDescriptor[] = [{ field: 'Usuario.Usuario' }];

  public state: State = {
    skip: 0,
    take: 10,
    group: this.groups
  };

  public gridData: GridDataResult = process(this.lstCotizaciones, this.state);
  public vencimiento = 60;

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService, private globales: GlobalesPipe) {
  }


  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
    this.gestionFecha();
    this.listarUsuariosDependientes();
  }

  gestionFecha() {
    var today = moment();
    this.filtros.fechaInicio = new Date(moment(today).subtract(90, 'days'));
    this.filtros.fechaFin = new Date();
  }  

  public listarUsuariosDependientes() {
    this.spinner.show();
    this.lstUsuarios = [];
    this.conexion.get('Broker/SBroker.svc/usuarios/consultar/dependientes/' + this.usuario.IdUsuario, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        for (let resultado of res) {
          this.lstUsuarios.push({ texto: resultado.Usuario, valor: resultado.IdUsuario, sql: 'IdUsuario = ' + resultado.IdUsuario + ' OR ', foto: resultado.Foto });
        }

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarResumenCotizaciones() {
    var usuarios = "";
    for (let resultado of this.filtros.usuarios) {
      usuarios += resultado.sql;
    }

    var parametros = {
      FechaInicio: this.globales.obtenerFechaValor(this.filtros.fechaInicio, "-"),
      FechaFin: this.globales.obtenerFechaValor(this.filtros.fechaFin, "-"),
      IdBroker: this.usuario.broker.IdBroker,
      Cadena: usuarios.substr(0, (usuarios.length - 4)),
    };

    this.cotizacionesResumen.total = "0";
    this.cotizacionesResumen.concretadas = 0;
    this.cotizacionesResumen.noConcretadas = 0;
    this.cotizacionesResumen.usuarios = 0;
    this.cotizacionesResumen.usuarios = this.filtros.usuarios.length;

    if (this.filtros.fechaInicio == "") {
      console.log('Seleccionar Fecha Inicio');
    } else if (this.filtros.fechaFin == "") {
      console.log('Seleccionar Fecha Fin');
    } else if (this.filtros.usuarios.length == 0) {
      console.log('Seleccionar Usuario/s');
    } else {
      this.spinner.show();
      this.conexion.post('Broker/SBroker.svc/resumen/consultar/cotizaciones', parametros, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.lstCotizaciones = res;
          this.cargarItems();

          var suma = 0.0;
          var emitidas = [];
          var sinEmitir = [];

          for (let datos of res) {
            if (datos.Estado == 5) {
              suma += datos.PrimaTotal;
              this.cotizacionesResumen.total = suma + "";
              emitidas.push(datos.Estado);
            } if (datos.Estado == 5 || datos.Estado == 4 || datos.Estado == 3 || datos.Estado == 2 || datos.Estado == 1) {
              sinEmitir.push(datos.Estado);
            }
          }

          this.cotizacionesResumen.concretadas = emitidas.length;
          this.cotizacionesResumen.noConcretadas = sinEmitir.length;

          this.gestionarDatosGraficos();

        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public generarDataGraficoGeneral(textos, valores): any {
    return {
      type: 'bar',
      data: {
        labels: textos,
        datasets: [
          {
            label: 'Cotizaciones',
            data: valores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              callback: function (value, index, values) {
                var str = value;
                var res = str.split(" ");
                return res[0];
              }
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    };
  }

  public generarGraficoEmitidas(textos, valores) {
    var datos: any = this.generarDataGraficoGeneral(textos, valores);
    if (this.chartEmitidas) this.chartEmitidas.destroy();
    this.chartEmitidas = new Chart('canvasEmitidas',  datos );
  }

  public generarGraficoSinEmitir(textos, valores) {
    var datos: any = this.generarDataGraficoGeneral(textos, valores);
    if (this.chartSinEmitir) this.chartSinEmitir.destroy();
    this.chartSinEmitir = new Chart('canvasSinEmitir',  datos );
  }

  public generarGraficoTotales(textos, valores) {
    var datos: any = this.generarDataGraficoGeneral(textos, valores);
    if (this.chartTotal) this.chartTotal.destroy();
    this.chartTotal = new Chart('canvasTotal',  datos );
  }

  public gestionarDatosGraficos() {
    var resultados = [];
    var emitidas = {
      x: [],
      y: []
    };
    var sinEmitir = {
      x: [],
      y: []
    };
    var Totales = {
      x: [],
      y: []
    };

    for (let datos of this.filtros.usuarios) {
      resultados.push(this.gestionarDatosLista(datos.valor));
    }

    for (let resultado of resultados) {
      emitidas.x.push(this.obtenerNombre(resultado[0].IdUsuario_));
      emitidas.y.push(resultado[0].Emitidas);

      sinEmitir.x.push(this.obtenerNombre(resultado[0].IdUsuario_));
      sinEmitir.y.push(resultado[0].SinEmitir);

      Totales.x.push(this.obtenerNombre(resultado[0].IdUsuario_));
      Totales.y.push(resultado[0].Total);
    }

    this.listaEstados = resultados;
    this.generarGraficoEmitidas(emitidas.x, emitidas.y);
    this.generarGraficoSinEmitir(sinEmitir.x, sinEmitir.y);
    this.generarGraficoTotales(Totales.x, Totales.y);
  }

  public gestionarDatosLista(IdUsuario: number): any {

    var lstCotizaciones = this.lstCotizaciones;
    var total = 0.0;
    var cEmitidas = 0;
    var cSinEmitir = 0;
    var cotizaciones = function (IdUsuario) {
      var lista = [];
      for (let datos of lstCotizaciones) {
        if (datos.IdUsuario == IdUsuario) {
          if (datos.Estado == 5) {
            cEmitidas += 1;
            total += datos.PrimaTotal;
          }
          if (datos.Estado == 5 || datos.Estado == 4 || datos.Estado == 3 || datos.Estado == 2 || datos.Estado == 1) {
            cSinEmitir += 1;
          }
        }
      }
      lista.push({ IdUsuario_: IdUsuario, Emitidas: cEmitidas, SinEmitir: cSinEmitir, Total: total });

      return lista;
    };

    return cotizaciones(IdUsuario);
  }

  private cargarItems(): void {
    this.gridData = process(this.lstCotizaciones, this.state);
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.cargarItems();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstCotizaciones, this.state);
  }

  public separador(texto) {
    var str = texto;
    var res = str.split(" ");
    return res[0]
  }

  public verificarVencimientoCotizacion(dato: any) {
    var datos = { color: '#000000', texto: 'Vigente' };
    var str = dato;
    var txt = str.replace(/[aA-zZ-í]/g, "");
    var numero = parseInt(txt);
    var maximo = this.vencimiento;
    var medio = this.vencimiento / 2;
    if (numero > maximo) {
      datos.color = '#CB4335';
      datos.texto = 'Vencida';
    } else if (numero > medio && numero < maximo) {
      datos.color = '#D4AC0D';
      datos.texto = 'Por Vencerse';
    } else if (numero < medio) {
      datos.color = '#17AE22';
      datos.texto = 'Vigente';
    }
    return datos;
  }

  public convertirNumeroEstado(numero: any) {
    var datos = [];
    datos = [];
    if (numero == 0) {
      datos.push("Eliminada");
      datos.push("mdi-minus-circle");
      datos.push("rgba(227, 0, 0, 0.5)");
    } else if (numero == 1) {
      datos.push("Sin Emitir");
      datos.push("mdi-pencil");
      datos.push("rgba(218, 191, 0, 0.5)");
      datos.push("Editada");
    } else if (numero == 2) {
      datos.push("Sin Emitir");
      datos.push("mdi-pencil");
      datos.push("rgba(6, 96, 200, 0.5)");
      datos.push("Editada");
    } else if (numero == 3) {
      datos.push("Sin Emitir");
      datos.push("mdi-email");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Generada");
    } else if (numero == 4) {
      datos.push("Sin Emitir");
      datos.push("mdi-credit-card");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Pagada");
    } else if (numero == 5) {
      datos.push("Emitida");
      datos.push("mdi-file-multiple");
      datos.push("rgba(37, 148, 43, 0.5)");
      datos.push("Emitida");
    }

    return datos;
  }

  public obtenerNombre(IdUsuario: number) {
    var texto = "DESCONOCIDO";
    for (let usuario of this.lstUsuarios) {
      if (usuario.valor === IdUsuario) {
        texto = usuario.texto;
      }
    }
    return texto;
  }

}
