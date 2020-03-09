import { Component, OnInit } from '@angular/core';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [GlobalesPipe]
})
export class InicioGerenciaComponent implements OnInit {

  public usuario: any;
  public lstUsuariosDependientesGerentes = [];
  public lstUsuarioDependientesSupervisores = [];
  public lstUsuarioDependientesOperadores = [];

  public idUsuariosDependientesSupervisores = [];

  public lstUsuariosDependientesSupervisoresResumen = [];

  public usuariosSupervisores = "";
  public usuariosOperadores = "";

  public lstCotizacionesOperadores = [];
  public lstCotizacionesOperadoresResumen = [];

  public lstCotizacionesSupervisoresResumen = [];

  public chartResumenSupervision: Chart;

  public supervisorSeleccionado: any;

  public lstResumenOperadores = [];

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService, private globales: GlobalesPipe) { }

  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
    this.listarUsuariosDependientes();
  }

  public listarUsuariosDependientes() {
    this.spinner.show();

    this.lstUsuarioDependientesSupervisores = [];
    this.idUsuariosDependientesSupervisores = [];

    this.conexion.get('Broker/SBroker.svc/usuarios/consultar/dependientes/' + this.usuario.IdUsuario, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstUsuarioDependientesSupervisores = res;

        this.usuariosSupervisores = "";
        for (let usuario of this.lstUsuarioDependientesSupervisores) {
          this.usuariosSupervisores += ('IdPadre = ' + usuario.IdUsuario + ' OR ');
          this.idUsuariosDependientesSupervisores.push(usuario.IdUsuario);
        }
        this.listarUsuariosDependientesSupervisor(this.usuariosSupervisores);

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarUsuariosDependientesSupervisor(cadena: string) {
    this.spinner.show();

    var parametros = {
      Cadena: cadena.substr(0, (cadena.length - 4)),
    };
    this.conexion.post('Broker/SBroker.svc/usuarios/consultar/dependientes/supervisor', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstUsuariosDependientesSupervisoresResumen = res;
        var dataset = {
          x: [],
          y: []
        };
        for (let usuarios of this.lstUsuariosDependientesSupervisoresResumen) {
          dataset.x.push(usuarios.Ciudad);
          dataset.y.push(usuarios.Total);
        }

        this.generarGraficoResumenSupervision(dataset.x, dataset.y, 'bar', 'N° de Operadores por Sucursal', 'Gráfico Operadores por Sucursal/Supervisor');
        this.listarUsuariosDependientesOperadores(cadena);

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarUsuariosDependientesOperadores(cadena) {
    this.spinner.show();
    var parametros = {
      Cadena: cadena.substr(0, (cadena.length - 4)),
    };
    this.conexion.post('Broker/SBroker.svc/usuarios/consultar/dependientes/operadores', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstUsuarioDependientesOperadores = [];
        this.lstUsuarioDependientesOperadores = res;

        this.usuariosOperadores = "";
        for (let resultado of res) {
          this.usuariosOperadores += ('IdUsuario = ' + resultado.IdUsuario + ' OR ');
        }

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
      Cadena: this.usuariosOperadores.substr(0, (this.usuariosOperadores.length - 4)),
    };

    this.spinner.show();
    this.conexion.post('Broker/SBroker.svc/resumen/global/consultar/cotizaciones', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCotizacionesOperadoresResumen = [];

        this.lstCotizacionesOperadores = [];
        this.lstCotizacionesOperadores = res;
        this.consultarTotalCotizacionesOperador();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public consultarTotalCotizacionesOperador() {
    this.spinner.show();
    var parametros = {
      Cadena: this.usuariosOperadores.substr(0, (this.usuariosOperadores.length - 4))
    };
    this.conexion.post('Broker/SBroker.svc/resumen/consultar/cotizaciones/operador', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCotizacionesOperadoresResumen = [];
        this.lstCotizacionesSupervisoresResumen = [];

        var totales = [];
        for (var cotizaciones of res) {
          totales.push({ IdUsuario: cotizaciones.IdUsuario, Total: cotizaciones.PrimaTotal });
        }

        var lstTotalCotizacionesOperador = this.sumarAgruparLista(totales);

        for (var usuarios of this.lstUsuarioDependientesOperadores) {
          this.lstCotizacionesOperadoresResumen.push({ IdUsuario: usuarios.IdUsuario, Usuario: usuarios.Usuario, IdPadre: usuarios.IdPadre, Foto: usuarios.Foto, Ciudad: usuarios.Ciudad, Estado: this.insertarDatosOperador(this.lstCotizacionesOperadores, usuarios.IdUsuario), Total: this.insertarTotalOperador(lstTotalCotizacionesOperador, usuarios.IdUsuario) });

        }

        var gestionResumenSupervisores = function (miarray, prop) {
          return miarray.reduce(function (groups, item) {
            var val = item[prop];
            groups[val] = groups[val] || { IdPadre: item.IdPadre, Ciudad: item.Ciudad, Emitidas: 0, SinEmitir: 0, Total: 0 };
            groups[val].Emitidas += item.Estado.Emitidas;
            groups[val].SinEmitir += item.Estado.SinEmitir;
            groups[val].Total += item.Total;
            return groups;
          }, {});
        }

        this.lstCotizacionesSupervisoresResumen = Object.values(gestionResumenSupervisores(this.lstCotizacionesOperadoresResumen, 'IdPadre'));

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public mostrarGrafico(identificador) {
    var dataset = {
      x: [],
      y: []
    };

    if (identificador == 1) {
      for (let usuarios of this.lstUsuariosDependientesSupervisoresResumen) {
        dataset.x.push(usuarios.Ciudad);
        dataset.y.push(usuarios.Total);
      }
      this.generarGraficoResumenSupervision(dataset.x, dataset.y, 'bar', 'N° de Operadores por Sucursal', 'Gráfico Operadores por Sucursal/Supervisor');
    } else if (identificador == 2) {
      for (let usuarios of this.lstCotizacionesSupervisoresResumen) {
        dataset.x.push(usuarios.Ciudad);
        dataset.y.push(usuarios.Total);
      }
      this.generarGraficoResumenSupervision(dataset.x, dataset.y, 'line', 'Total Generado por Sucursal', 'Gráfico Total Generado por Sucursal/Supervisor');
    } else if (identificador == 3) {
      for (let usuarios of this.lstCotizacionesSupervisoresResumen) {
        dataset.x.push(usuarios.Ciudad);
        dataset.y.push(usuarios.Emitidas);
      }
      this.generarGraficoResumenSupervision(dataset.x, dataset.y, 'line', 'N° Cotizaciones Emitidas por Sucursal', 'Gráfico Cotizaciones Emitidas por Sucursal/Supervisor');
    } else if (identificador == 4) {
      for (let usuarios of this.lstCotizacionesSupervisoresResumen) {
        dataset.x.push(usuarios.Ciudad);
        dataset.y.push(usuarios.SinEmitir);
      }
      this.generarGraficoResumenSupervision(dataset.x, dataset.y, 'line', 'N° Cotizaciones Sin Emitir por Sucursal', 'Gráfico Cotizaciones Sin Emitir por Sucursal/Supervisor');
    }

  }

  public insertarDatosOperador(cotizacion: any, id: any) {
    var lista = {};
    var emitidas = 0;
    var sinEmitir = 0;

    for (var cotizaciones of cotizacion) {
      if (parseInt(cotizaciones.IdUsuario) === parseInt(id)) {
        if (parseInt(cotizaciones.Estado) === 5) {
          emitidas += 1;
        } if (cotizaciones.Estado != 5) {
          sinEmitir += 1;
        }
      }
    }
    lista = { Emitidas: emitidas, SinEmitir: sinEmitir };
    return lista;
  }

  public insertarTotalOperador(lista: any, id: any) {
    var total = 0;
    for (var datos of lista) {
      if (datos.IdUsuario == id) {
        total = datos.Total;
      }
    }
    return total;
  }

  public sumarAgruparLista(lista: any) {
    var gestion = lista.reduce(function (res, obj) {
      if (!(obj.IdUsuario in res))
        res.__array.push(res[obj.IdUsuario] = obj);
      else {
        res[obj.IdUsuario].Total += obj.Total;
      }
      return res;
    },
      {
        __array: []
      }).__array.sort(function (a, b) { return b; });

    return gestion;
  }


  public generarGraficoResumenSupervision(textos, valores, tipo, leyenda, titulo) {
    if (this.chartResumenSupervision) this.chartResumenSupervision.destroy();

    this.chartResumenSupervision = new Chart('canvas', {
      type: '' + tipo + '',
      data: {
        labels: textos,
        datasets: [
          {
            label: leyenda,
            data: valores,
            borderColor: 'rgba(' + this.usuario.broker.Color + ', 0.8)',
            backgroundColor: 'rgba(' + this.usuario.broker.Color + ', 0.2)',
            border: 1
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: titulo
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

  public obtenerSupervisorSeleccionado(){
    this.lstResumenOperadores  = [];
    for(var datos of this.lstCotizacionesOperadoresResumen){
      if(datos.IdPadre == this.supervisorSeleccionado){
        this.lstResumenOperadores.push(datos);
      }
    }
  }

  public obtenerNombresUsuarios(IdUsuario: number, lista: any) {
    var texto = "DESCONOCIDO";
    for (let datos of lista) {
      if (datos.IdUsuario === IdUsuario) {
        texto = datos.Usuario;
      }
    }
    return texto;
  }

  public separador(texto) {
    var str = texto;
    var res = str.split(" ");
    return res[0]
  }

}
