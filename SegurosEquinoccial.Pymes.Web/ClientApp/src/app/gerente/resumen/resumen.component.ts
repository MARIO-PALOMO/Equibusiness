import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupResult, groupBy, GroupDescriptor, process, State } from '@progress/kendo-data-query';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  providers: [GlobalesPipe]
})
export class ResumenGerenteComponent implements OnInit {

  public lstSupervisores = [];
  public lstResumenSupervisores = [];

  public lstOperadores = [];

  public lstUsuariosSupervisores = "";
  public lstUsuariosOperadores = [];

  public lstCotizacionesOperadores = [];

  public lstCotizacionesOperadoresResumen = [];
  public lstCotizacionesSupervisoresResumen = [];

  public groupedData: GroupResult[] = groupBy(this.lstUsuariosOperadores, [{ field: "IdPadre" }]);

  public chartResumenSupervisores: Chart;

  public filtros = {
    supervisores: [],
    operadores: [],
    fechaInicio: "",
    fechaFin: ""
  }

  public usuario: any;

  public groups: GroupDescriptor[] = [{ field: 'Usuario.UsuarioPadre' }];
  public groupsOperadores: GroupDescriptor[] = [{ field: 'UsuarioPadre' }];

  public state: State = {
    skip: 0,
    take: 10,
    group: this.groups
  };

  public gridData: GridDataResult = process(this.lstCotizacionesOperadores, this.state);
  public vencimiento = 60;

  public stateResumenSupervisor: State = {
    skip: 0,
    take: 10
  };
  public gridDataResumenSupervisor: GridDataResult = process(this.lstCotizacionesSupervisoresResumen, this.stateResumenSupervisor);

  public stateResumenOperador: State = {
    skip: 0,
    take: 10,
    group: this.groupsOperadores
  };
  public gridDataResumenOperador: GridDataResult = process(this.lstCotizacionesOperadoresResumen, this.stateResumenOperador);

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService, private globales: GlobalesPipe) { }

  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
    this.listarSupervisoresDependientes();
  }

  public listarSupervisoresDependientes() {
    this.spinner.show();

    this.lstSupervisores = [];

    this.conexion.get('Broker/SBroker.svc/usuarios/consultar/dependientes/' + this.usuario.IdUsuario, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstSupervisores = res;

        this.lstUsuariosSupervisores = "";
        for (let usuario of this.lstSupervisores) {
          this.lstUsuariosSupervisores += ('IdPadre = ' + usuario.IdUsuario + ' OR ');
        }

        this.listarResumenSupervisor();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarResumenSupervisor() {

    this.spinner.show();

    var parametros = {
      Cadena: this.lstUsuariosSupervisores.substr(0, (this.lstUsuariosSupervisores.length - 4)),
    };
    this.lstResumenSupervisores = [];
    this.conexion.post('Broker/SBroker.svc/usuarios/consultar/dependientes/supervisor', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstResumenSupervisores = res;
        this.listarOperadoresSupervisor();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarOperadoresSupervisor() {
    this.spinner.show();
    var parametros = {
      Cadena: this.lstUsuariosSupervisores.substr(0, (this.lstUsuariosSupervisores.length - 4)),
    };
    this.lstOperadores = [];
    this.conexion.post('Broker/SBroker.svc/usuarios/consultar/dependientes/operadores', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstOperadores = res;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public filtarDatosSupervisores() {
    this.lstUsuariosOperadores = [];
    for (var supervisores of this.filtros.supervisores) {
      for (var operadores of this.lstOperadores) {
        if (supervisores.IdUsuario === operadores.IdPadre) {
          this.lstUsuariosOperadores.push(
            {
              IdUsuario: operadores.IdUsuario,
              IdPadre: operadores.IdPadre,
              UsuarioPadre: this.obtenerNombresUsuarios(operadores.IdPadre, this.filtros.supervisores),
              Usuario: operadores.Usuario,
              Foto: operadores.Foto,
              Ciudad: operadores.Ciudad
            }
          );
        }
      }
    }
    this.groupedData = groupBy(this.lstUsuariosOperadores, [{ field: "UsuarioPadre" }]);
  }

  public listarCotizacionesOperadores() {

    this.filtarDatosSupervisores();

    var datos = "";
    for (var operadores of this.lstUsuariosOperadores) {
      datos += ('IdUsuario = ' + operadores.IdUsuario + ' OR ');
    }

    var parametros = {
      FechaInicio: this.filtros.fechaInicio,
      FechaFin: this.filtros.fechaFin,
      IdBroker: this.usuario.broker.IdBroker,
      Cadena: datos.substr(0, (datos.length - 4))
    };

    if (parametros.Cadena == "") {
      console.log("Seleccionar Operadores");
    } else if (parametros.FechaInicio == "") {
      console.log("Fecha Inicio");
    } else if (parametros.FechaFin == "") {
      console.log("Fecha Fin");
    } else {
      console.log("Llego");
      this.spinner.show();
      this.conexion.post('Broker/SBroker.svc/resumen/consultar/cotizaciones', parametros, this.usuario.Uid).subscribe(
        (res: any) => {
          this.spinner.hide();

          this.lstCotizacionesOperadores = [];
          this.lstCotizacionesOperadores = res;
          this.cargarItems();
          this.consultarTotalCotizacionesOperadores(parametros);

        },
        err => {
          this.spinner.hide();
          console.log(err);
          this.conexion.error(err);
        }
      );
    }
  }

  public consultarTotalCotizacionesOperadores(parametros) {
    this.spinner.show();

    this.conexion.post('Broker/SBroker.svc/resumen/consultar/parametros/cotizaciones/operador', parametros, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCotizacionesOperadoresResumen = [];
        this.lstCotizacionesSupervisoresResumen = [];

        var totales = [];
        for (var cotizaciones of res) {
          totales.push({ IdUsuario: cotizaciones.IdUsuario, Total: cotizaciones.PrimaTotal });
        }

        var lstTotalCotizacionesOperador = this.sumarAgruparLista(totales);

        for (var usuarios of this.lstUsuariosOperadores) {
          this.lstCotizacionesOperadoresResumen.push({ IdUsuario: usuarios.IdUsuario, Usuario: usuarios.Usuario, IdPadre: usuarios.IdPadre, UsuarioPadre: this.obtenerNombresUsuarios(usuarios.IdPadre, this.lstSupervisores), Foto: usuarios.Foto, Ciudad: usuarios.Ciudad, Estado: this.insertarDatosOperador(this.lstCotizacionesOperadores, usuarios.IdUsuario), Total: this.insertarTotalOperador(lstTotalCotizacionesOperador, usuarios.IdUsuario) });
        }

        var gestionResumenSupervisores = function (miarray, prop) {
          return miarray.reduce(function (groups, item) {
            var val = item[prop];
            groups[val] = groups[val] || { IdPadre: item.IdPadre, Ciudad: item.Ciudad, UsuarioPadre: item.UsuarioPadre, Emitidas: 0, SinEmitir: 0, Total: 0 };
            groups[val].Emitidas += item.Estado.Emitidas;
            groups[val].SinEmitir += item.Estado.SinEmitir;
            groups[val].Total += item.Total;
            return groups;
          }, {});
        }

        this.lstCotizacionesSupervisoresResumen = Object.values(gestionResumenSupervisores(this.lstCotizacionesOperadoresResumen, 'IdPadre'));

        this.cargarItemsResumenSupervisor();
        this.cargarItemsResumenOperador();

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
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


  private cargarItems(): void {
    this.gridData = process(this.lstCotizacionesOperadores, this.state);
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.cargarItems();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstCotizacionesOperadores, this.state);
  }

  private cargarItemsResumenSupervisor(): void {
    this.gridDataResumenSupervisor = process(this.lstCotizacionesSupervisoresResumen, this.stateResumenSupervisor);
  }

  public dataStateChangeResumenSupervisor(state: DataStateChangeEvent): void {
    this.stateResumenSupervisor = state;
    this.gridDataResumenSupervisor = process(this.lstCotizacionesSupervisoresResumen, this.stateResumenSupervisor);
  }

  private cargarItemsResumenOperador(): void {
    this.gridDataResumenOperador = process(this.lstCotizacionesOperadoresResumen, this.stateResumenOperador);
  }

  public groupChangeResumenOperador(groups: GroupDescriptor[]): void {
    this.groupsOperadores = groups;
    this.cargarItemsResumenOperador();
  }

  public dataStateChangeResumenOperador(state: DataStateChangeEvent): void {
    this.stateResumenOperador = state;
    this.gridDataResumenOperador = process(this.lstCotizacionesOperadoresResumen, this.stateResumenOperador);
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
}
