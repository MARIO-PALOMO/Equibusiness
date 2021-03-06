import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public state: State = {
    skip: 0,
    take: 10,
  };


  public usuario: any;
  public lstUsuarios = [];
  public usuario2: any;
  public data: any;

  public IdRol: any;
  public IdBroker: any;
  public IdPadre: any;
  public CodigoAgente: any;
  public Sucursal: any;
  public CodigoTipoAgente: any;
  public Ciudad: any;

  public lstRol: Array<{ text: string, value: number }> = [
    { text: "PERFIL 1", value: 2 },
    { text: "PERFIL 2", value: 4 },
    { text: "PERFIL 3", value: 3 }
  ];

  public lstPadres = [];
  public dataPadre: any;

  public lstBroker = [];
  public dataBroker: any;

  public lstTipoAgente: Array<{ text: string, value: number }> = [
    { text: "PRODUCTOR", value: 2 },
    { text: "UNIDAD DE PRODUCCIÓN", value: 3 }
  ];

  public lstAgente = [];
  public dataAgente: any;

  public lstCiudad = [];
  public dataCiudad: any;

  public lstSucursal = [];

  public fmrUsuario = {
    "Ciudad": "",
    "CodigoAgente": "",
    "CodigoPuntoVenta": "",
    "CodigoSucursal": "",
    "CodigoTipoAgente": "",
    "Comision": 0,
    "Contrasena": "",
    "Email": "",
    "Estado": 1,
    "EstadoSesion": 0,
    "Foto": "",
    "IdPadre": 0,
    "IdUsuario": 0,
    "Identificador": 0,
    "Total": 0,
    "Uid": null,
    "Usuario": "",
    "UsuarioPadre": null,
    "broker": {
      "IdBroker": 0
    },
    "rol": {
      "IdRol": 0,
    }
  };

  public gridData: GridDataResult = process(this.lstUsuarios, this.state);

  public botonGuardar = false;
  public botonModificar = false;
  public contrasenaGuardar = false;
  public contrasenaModificar = false;

  constructor(private conexion: ApiService, private sesion: SesionService, private spinner: NgxSpinnerService) {

  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
    this.listarBroker();
  }

  public listarBroker() {
    this.spinner.show();
    this.conexion.get('Broker/SBroker.svc/consultar/brokers', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.spinner.hide();
        this.lstBroker = res;
        this.dataBroker = this.lstBroker.slice();
        this.listarUsuarios();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarUsuarios() {
    this.spinner.show();

    this.lstUsuarios = [];

    this.conexion.get('Broker/SBroker.svc/consultar/usuarios', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstUsuarios = res;
        this.data = this.lstUsuarios.slice();
        this.gridData = process(this.lstUsuarios, this.state);
        this.listarCiudades();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstUsuarios, this.state);
  }

  public listarCiudades() {
    this.spinner.show();

    this.lstCiudad = [];

    this.conexion.get('Broker/SBroker.svc/consultar/catalogo/ciudades', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCiudad = res;
        this.dataCiudad = this.lstCiudad.slice();
        this.listarSucursales();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }


  public listarSucursales() {
    this.spinner.show();

    this.lstSucursal = [];

    this.conexion.get('Broker/SBroker.svc/consultar/catalogo/sucursal', this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstSucursal = res;

      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public listarAgentes() {
    this.spinner.show();

    this.lstAgente = [];

    this.conexion.get('Broker/SBroker.svc/consultar/codigo/agente/' + this.CodigoTipoAgente.value, this.usuario.Uid).subscribe(
      (res: any) => {
        this.spinner.hide();

        var xml = $.parseXML(res);
        var data = [];

        $(xml).find("Table").each(function (i, e) {
          data.push({ codigoAgente: $(this).find('cod_agente').text(), nombreAgente: $(this).find('fullname').text() });
        });

        this.lstAgente = data;
        this.dataAgente = this.lstAgente.slice();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }



  public filtrar(value) {
    this.data = this.lstUsuarios.filter((s) => s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public filtrarPadre(value) {
    this.dataPadre = this.lstPadres.filter((s) => s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public filtrarBroker(value) {
    this.dataBroker = this.lstBroker.filter((s) => s.RazonSocial.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public filtrarAgente(value) {
    this.dataAgente = this.lstAgente.filter((s) => s.nombreAgente.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public filtrarCiudad(value) {
    this.dataCiudad = this.lstCiudad.filter((s) => s.Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }


  public filtarRoles() {
    this.lstPadres = [];

    if (this.IdBroker != undefined && this.IdRol != undefined) {
      for (let usuarios of this.lstUsuarios) {
        if (this.IdRol.value == 2 && this.IdBroker.IdBroker == usuarios.broker.IdBroker) {
          //this.lstPadres.push(usuarios);
        } else if (this.IdRol.value == 4 && this.IdBroker.IdBroker == usuarios.broker.IdBroker) {
          if (usuarios.rol.IdRol == 2) {
            this.lstPadres.push(usuarios);
          }
        } else if (this.IdRol.value == 3 && this.IdBroker.IdBroker == usuarios.broker.IdBroker) {
          if (usuarios.rol.IdRol == 4) {
            this.lstPadres.push(usuarios);
          }
        }
      }
      this.dataPadre = this.lstPadres.slice();
    }
  }

  public mostrarDatos(datos) {
    this.fmrUsuario = datos;
    this.fmrUsuario.Comision = parseInt(datos.Comision);
    this.IdRol = { text: "", value: this.fmrUsuario.rol.IdRol };
    this.IdBroker = datos.broker
    this.IdPadre = { Usuario: "", IdUsuario: datos.IdPadre }
    this.Ciudad = { Nombre: datos.Ciudad }
    this.CodigoTipoAgente = { text: "", value: parseInt(this.fmrUsuario.CodigoTipoAgente) };
    this.listarAgentes();
    this.CodigoAgente = { nombreAgente: "", codigoAgente: this.fmrUsuario.CodigoAgente };
    this.Sucursal = { Union: this.fmrUsuario.CodigoPuntoVenta + "-" + this.fmrUsuario.CodigoSucursal, CodigoPuntoVenta: this.fmrUsuario.CodigoPuntoVenta, CodigoSucursal: this.fmrUsuario.CodigoSucursal };

    this.filtarRoles();

    this.contrasenaGuardar = false;
    this.contrasenaModificar = true;
    this.botonGuardar = false;
    this.botonModificar = true;
    this.fmrUsuario.Identificador = 10;

    this.abrirModal();
  }

  public agregarUsuarioVista() {
    this.limpiarCampos();

    this.contrasenaGuardar = true;
    this.contrasenaModificar = false;
    this.botonGuardar = true;
    this.botonModificar = false;
    this.fmrUsuario.Identificador = 9;
    this.abrirModal();
  }

  public gestionUsuario() {


    this.fmrUsuario.rol.IdRol = this.IdRol.value;
    this.fmrUsuario.broker.IdBroker = this.IdBroker.IdBroker;
    this.fmrUsuario.IdPadre = this.IdPadre.IdUsuario;
    this.fmrUsuario.Ciudad = this.Ciudad.Nombre;
    this.fmrUsuario.CodigoAgente = this.CodigoAgente.codigoAgente;
    this.fmrUsuario.CodigoTipoAgente = this.CodigoTipoAgente.value;
    this.fmrUsuario.CodigoPuntoVenta = this.Sucursal.CodigoPuntoVenta;
    this.fmrUsuario.CodigoSucursal = this.Sucursal.CodigoSucursal;

    this.spinner.show();
    this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', this.fmrUsuario, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        $("#modalUsuario").css("display", "none");
        this.listarBroker();
        console.log(res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.conexion.error(err);
      }
    );
  }

  public limpiarCampos() {
    this.fmrUsuario = {
      "Ciudad": "",
      "CodigoAgente": "",
      "CodigoPuntoVenta": "",
      "CodigoSucursal": "",
      "CodigoTipoAgente": "",
      "Comision": 0,
      "Contrasena": "",
      "Email": "",
      "Estado": 1,
      "EstadoSesion": 0,
      "Foto": "",
      "IdPadre": 0,
      "IdUsuario": 0,
      "Identificador": 0,
      "Total": 0,
      "Uid": null,
      "Usuario": "",
      "UsuarioPadre": null,
      "broker": {
        "IdBroker": 0
      },
      "rol": {
        "IdRol": 0,
      }
    };

    this.IdRol = {};
    this.IdBroker = {};
    this.IdPadre = {};
    this.Ciudad = {};
    this.CodigoTipoAgente = {};
    this.CodigoAgente = {};;
    this.Sucursal = {};
  }

  public abrirModal() {
    $("#modalUsuario").css("display", "block");
  }

  public cerrarModal() {
    $("#modalUsuario").css("display", "none");
  }

}
