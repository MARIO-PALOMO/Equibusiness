import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [GlobalesPipe]
})
export class InicioSupervisionComponent implements OnInit {

  public usuario: any;
  public chart: Chart;

  public usuariosDependientes = "";
  public lstUsuarios = [];

  public cotizacionesResumenGrafico: any = {
    valores: [],
    textos: []
  };

  public cotizacionesResumen = {
    usuarios: 0,
    emitidas: 0,
    sinEmitir: 0,
    total: 0
  };

  public lstCotizaciones = [];
  public lstCotizacionesUsuario = [];
  public lstCotizacionesUsuarioSeleccionado = [];

  public state: State = {
    skip: 0,
    take: 1,
  };

  public gridData: GridDataResult = process(this.lstCotizacionesUsuarioSeleccionado, this.state);

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService, public globales: GlobalesPipe) { }

  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
    this.listarUsuariosDependientes();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstCotizacionesUsuarioSeleccionado, this.state);
  }

  public generarGrafico(textos, valoresEmitidas, valoresSinEmitir) {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: textos,
        datasets: [
          {
            label: '# de Cotizaciones Emitidas',
            data: valoresEmitidas,
            borderColor: 'rgba(' + this.usuario.broker.Color + ', 0.8)',
            backgroundColor: 'rgba(' + this.usuario.broker.Color + ', 0.2)',
            pointRadius: 10,
            pointHoverRadius: 11,
          },
          {
            label: '# de Cotizaciones Sin Emitir',
            data: valoresSinEmitir,
            borderColor: 'rgba(51, 51, 51, 0.8)',
            backgroundColor: 'rgba(51, 51, 51, 0.2)',
            pointRadius: 10,
            pointHoverRadius: 11,
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

  public listarUsuariosDependientes() {
    this.spinner.show();
    this.usuariosDependientes = "";
    this.cotizacionesResumen.usuarios = 0;
    this.conexion.get('Broker/SBroker.svc/usuarios/consultar/dependientes/' + this.usuario.IdUsuario, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        for (let resultado of res) {
          this.usuariosDependientes += ('IdUsuario = ' + resultado.IdUsuario + ' OR ');
        }
        this.cotizacionesResumen.usuarios = res.length;
        this.lstUsuarios = res;
        this.consultarResumenCotizaciones();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarResumenCotizaciones() {

    var parametros = {
      IdBroker: this.usuario.broker.IdBroker,
      Cadena: this.usuariosDependientes.substr(0, (this.usuariosDependientes.length - 4)),
    };

    var datos = {
      textos: [],
      emitidas: [],
      sinEmitir: []
    };


    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/resumen/global/consultar/cotizaciones', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCotizaciones = [];
        this.lstCotizacionesUsuario = [];

        this.lstCotizacionesUsuario = res;

        for (let datos of this.lstUsuarios) {
          this.lstCotizaciones.push(this.gestionarDatosLista(datos.IdUsuario, res));
        }

        for (let resultado of this.lstCotizaciones) {
          datos.textos.push(this.obtenerNombre(resultado[0].IdUsuario_));
          datos.emitidas.push(resultado[0].Emitidas);
          datos.sinEmitir.push(resultado[0].SinEmitir);
        }

        this.generarGrafico(datos.textos, datos.emitidas, datos.sinEmitir);

        var resumen = {
          emitidas: 0,
          sinEmitir: 0,
          total: 0
        };

        for (var cot of this.lstCotizaciones) {
           resumen.emitidas += cot[0].Emitidas;
           resumen.sinEmitir += cot[0].SinEmitir;
           resumen.total += cot[0].Total;
        }

        this.cotizacionesResumen.emitidas = resumen.emitidas;
        this.cotizacionesResumen.sinEmitir = resumen.sinEmitir;
        this.cotizacionesResumen.total = resumen.total;

        console.log(this.lstCotizaciones);
        console.log(this.lstCotizacionesUsuario);

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public mostrarCotizacionesUsuario(IdUsuario) {
    $('#CotizacionesUsuario').modal('show');
    this.lstCotizacionesUsuarioSeleccionado = [];
    for (let usuario of this.lstCotizacionesUsuario) {
      if (usuario.IdUsuario === IdUsuario) {
        this.lstCotizacionesUsuarioSeleccionado.push(usuario);
      }
    }

    this.gridData = process(this.lstCotizacionesUsuarioSeleccionado, this.state);
  }

  public gestionarDatosLista(IdUsuario: number, datos: any): any {

    var lstCotizaciones = datos;
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
          if (datos.Estado != 5) {
            cSinEmitir += 1;
          }
        }
      }
      lista.push({ IdUsuario_: IdUsuario, Emitidas: cEmitidas, SinEmitir: cSinEmitir, Total: total });

      return lista;
    };

    return cotizaciones(IdUsuario);
  }

  public separador(texto) {
    var str = texto;
    var res = str.split(" ");
    return res[0]
  }

  public obtenerNombre(IdUsuario: number) {
    var texto = "DESCONOCIDO";
    for (let datos of this.lstUsuarios) {
      if (datos.IdUsuario === IdUsuario) {
        texto = datos.Usuario;
      }
    }
    return texto;
  }

  public obtenerFoto(IdUsuario: number) {
    var foto = "../../../assets/images/usuarios/DefectoUsuario.png";
    for (let datos of this.lstUsuarios) {
      if (datos.IdUsuario === IdUsuario) {
        foto = datos.Foto;
      }
    }
    return foto;
  }
}
