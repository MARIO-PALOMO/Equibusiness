import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../servicios/sesion/sesion.service';
import { ApiService } from '../../servicios/api/api.service';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ValidacionCotizadorPipe } from '../../pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';
import { GlobalesPipe } from '../../metodos/globales/globales.pipe';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
      selector: 'app-usuario',
      templateUrl: './usuario.component.html',
      styleUrls: ['./usuario.component.css'],
      providers: [ValidacionCotizadorPipe, GlobalesPipe]
})
export class UsuarioComponent implements OnInit {

      public state: State = { skip: 0, take: 10, };
      public state2: State = { skip: 0, take: 4, };

      public usuario: any;

      public lstUsuarios = [];
      public lstUsuariosActivos = [];
      public lstUsuariosInactivos = [];
      public lstUsuariosAuxiliar = [];

      public data: any;
      public dataActivos: any;
      public dataInactivos: any;

      public IdRol: any;
      public IdBroker: any;
      public IdPadre: any;
      public CodigoAgente: any;
      public Sucursal: any;
      public CodigoTipoAgente: any;
      public IdUsuarioCambio: any;
      public Corredores = null;
      public Comision = null;
      public Ciudad: any;
      public Email: any;

      public lstRol: Array<{ text: string, value: number }> = [
            { text: "ADMINISTRADOR", value: 2 },
            { text: "SUPERVISOR", value: 4 },
            { text: "COTIZADOR", value: 3 }
      ];

      public lstCorredores: Array<{ text: string, value: number }> = [
            { text: "NO", value: 0 },
            { text: "SI", value: 1 }
      ];

      public lstComisiones: Array<{ text: string, value: number }> = [
            { text: " 0 %", value: 0 },
            { text: "20 %", value: 20 },
            { text: "25 %", value: 25 }
      ];

      public lstTipoAgente: Array<{ text: string, value: number }> = [
            { text: "PRODUCTOR", value: 2 },
            { text: "UNIDAD DE PRODUCCIÓN", value: 3 }
      ];

      public lstPadres = [];
      public dataPadre: any;

      public lstBroker = [];
      public dataBroker: any;

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
            "Corredores": "",
            "Cedula": "",
            "IdUsuarioBroker": 0,
            "broker": {
                  "IdBroker": 0
            },
            "rol": {
                  "IdRol": 0,
            }
      };

      public gridData: GridDataResult = process(this.lstUsuarios, this.state2);
      public gridDataActivos: GridDataResult = process(this.lstUsuariosActivos, this.state);
      public gridDataInactivos: GridDataResult = process(this.lstUsuariosInactivos, this.state);

      public botonGuardar = false;
      public botonModificar = false;
      public contrasenaGuardar = false;
      public contrasenaModificar = false;

      public fotoUsuarioAgregar = false;
      public fotoUsuarioModificar = false;
      public tabContrasenaAgregar = false;
      public tabContrasenaModificar = false;
      public tabEliminarAgregar = false;
      public tabEliminarModificar = false;

      constructor(private conexion: ApiService, private sesion: SesionService,
            private spinner: NgxSpinnerService, public validador: ValidacionCotizadorPipe,
            public globales: GlobalesPipe
      ) { }

      ngOnInit() {
            this.usuario = this.sesion.obtenerDatos();
            setTimeout(() => {
                  this.listarBroker();
            }, 2000);
            this.consultarUsuarios();
      }

      // INICIO DE FUNCIONES AL CARGAR LA PÁGINA //

      public listarBroker() {
            this.spinner.show();
            this.conexion.get('Broker/SBroker.svc/consultar/brokers', this.usuario.Uid).subscribe(
                  (res: any) => {
                        this.spinner.hide();
                        this.spinner.hide();
                        this.lstBroker = res;
                        this.dataBroker = this.lstBroker.slice();
                        this.listarCiudades();
                  },
                  err => {
                        this.spinner.hide();
                        console.log(err);
                        this.conexion.error(err);
                  }
            );
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

      // FIN DE FUNCIONES AL CARGAR LA PÁGINA //


      // INICIO DE FUNCIONES PARA CREAR UN NUEVO USUARIO 
      // PASO 1: CONSULTA DE USUARIOS ACTIVOS E INACTIVOS  
      public consultarUsuarios() {
            this.spinner.show();
            this.lstUsuariosActivos = [];
            this.lstUsuariosInactivos = [];
            this.conexion.get('Broker/SBroker.svc/listar/usuarios', this.usuario.Uid).subscribe(
                  (res: any) => {
                        this.spinner.hide();
                        var usuariosActivos = [];
                        var usuariosInactivos = [];
                        for (let i = 0; i < res.length; i++) {
                              if (res[i].Estado == 1) {
                                    usuariosActivos.push(res[i]);
                              } else if (res[i].Estado == 0) {
                                    usuariosInactivos.push(res[i]);
                              }
                        }
                        this.lstUsuariosActivos = usuariosActivos;
                        this.lstUsuariosInactivos = usuariosInactivos;

                        this.dataActivos = this.lstUsuariosActivos.slice();
                        this.dataInactivos = this.lstUsuariosInactivos.slice();

                        this.gridDataActivos = process(this.lstUsuariosActivos, this.state);
                        this.gridDataInactivos = process(this.lstUsuariosInactivos, this.state);

                  },
                  err => {
                        this.spinner.hide();
                        console.log(err);
                        this.conexion.error(err);
                  }
            );
      }

      // PASO 2: GESTIÓN DEL MODAL PARA CREAR NUEVOS USUARIOS 
      public agregarUsuario() {
            this.lstUsuarios = [];
            this.limpiarCampos();
            this.contrasenaGuardar = true;
            this.contrasenaModificar = false;
            this.botonGuardar = true;
            this.botonModificar = false;
            this.fotoUsuarioAgregar = true;
            this.tabContrasenaAgregar = true;
            this.tabEliminarAgregar = true;
            this.fotoUsuarioModificar = false;
            this.tabContrasenaModificar = false;
            this.tabEliminarModificar = false;
            this.abrirModalUsuario();

      }

      // PASO 3: GESTIÓN DEL MODAL PARA CREAR NUEVO PERFIL 
      public agregarUsuarioVista() {

            if (this.fmrUsuario.Usuario == "" && this.fmrUsuario.Cedula == "" && this.fmrUsuario.Email == "" && this.fmrUsuario.Contrasena == "") {
                  this.validador.mostrarAlertaInformativa("No puede crear el rol sin antes llenar la pestaña de Información Personal", this.usuario.broker.Color);
                  $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
            } else if (this.fmrUsuario.Usuario == "") {
                  this.validador.mostrarAlertaInformativa("Debe llenar el campo Nombre en la pestaña Información Personal antes de crear el Rol", this.usuario.broker.Color);
                  $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
            } else if (this.fmrUsuario.Cedula == "") {
                  this.validador.mostrarAlertaInformativa("Debe llenar el campo Cedula en la pestaña Información Personal antes de crear el Rol", this.usuario.broker.Color);
                  $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
            } else if (this.fmrUsuario.Email == "") {
                  this.validador.mostrarAlertaInformativa("Debe llenar el campo Email en la pestaña Información Personal antes de crear el Rol", this.usuario.broker.Color);
                  $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
            } else if (this.fmrUsuario.Contrasena == "") {
                  this.validador.mostrarAlertaInformativa("Debe llenar el campo Contraseña en la pestaña Información Personal antes de crear el Rol", this.usuario.broker.Color);
                  $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
            } else {
                  this.limpiarCamposNuevo();
                  this.contrasenaGuardar = true;
                  this.contrasenaModificar = false;
                  this.botonGuardar = true;
                  this.botonModificar = false;

                  if (this.lstUsuarios.length >= 1) {
                        this.fmrUsuario.Identificador = 11;
                  } else {
                        this.fmrUsuario.Identificador = 9;
                  }

                  this.abrirModalPerfiles();
            }
      }

      // PASO 4 : FUNCIÓN PARA CREAR USUARIOS
      public gestionUsuario() {

            this.Email = this.fmrUsuario.Email.split('@');

            this.fmrUsuario.rol.IdRol = parseInt(this.IdRol.value);
            this.fmrUsuario.broker.IdBroker = this.IdBroker.IdBroker;
            this.fmrUsuario.IdPadre = this.IdPadre.IdUsuario;
            this.fmrUsuario.Ciudad = this.Ciudad.Nombre;
            this.fmrUsuario.CodigoAgente = this.CodigoAgente == null ? null : this.CodigoAgente.codigoAgente;
            this.fmrUsuario.CodigoTipoAgente = this.CodigoTipoAgente.value;
            this.fmrUsuario.CodigoPuntoVenta = this.Sucursal.CodigoPuntoVenta;
            this.fmrUsuario.CodigoSucursal = this.Sucursal.CodigoSucursal;
            this.fmrUsuario.Corredores = this.Email[1] == "segurosequinoccial.com" ? "1" : "0";
            this.fmrUsuario.Comision = this.fmrUsuario.broker.IdBroker == 1 ? 25 : this.fmrUsuario.CodigoAgente == "99" ? 0 : 20;
            this.fmrUsuario.IdUsuarioBroker = this.IdUsuarioCambio;

            console.log(this.fmrUsuario);

            if (this.validador.gestionValidarFormularioUsuarios(this.fmrUsuario, this.usuario.broker.Color)) {
                  this.spinner.show();
                  this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', this.fmrUsuario, "").subscribe(
                        (res: any) => {
                              this.spinner.hide();
                              if (res != undefined) {
                                    this.validador.mostrarAlertaCorrecta("Proceso realizado exitosamente", this.usuario.broker.Color);
                              } else {
                                    this.validador.mostrarAlerta("Surgió un problema al crear el usuario", this.usuario.broker.Color);
                              }
                              this.cerrarModalUsuario()
                              this.cerrarModalPerfiles();
                              this.consultarUsuarios();
                        },
                        err => {
                              this.spinner.hide();
                              console.log(err);
                              this.conexion.error(err);
                        }
                  );
            }





      }

      // FINAL DE FUNCIONES PARA CREAR UN NUEVO USUARIO

      // INICIO DE FUNCIONES PARA MODIFICAR UN USUARIO
      // PASO 1: CARGA LOS DATOS DEL USUARIO SELECCIONADO Y ADEMÁS CARGA TODOS LOS PERFILES DE ESTE MISMO USUARIO
      public obtenerListadoUsuarios(datos: any) {
            this.spinner.show();
            this.lstUsuarios = [];
            this.conexion.get('Broker/SBroker.svc/consultar/usuarios/' + datos.IdUsuario, this.usuario.Uid).subscribe(
                  (res: any) => {
                        this.spinner.hide();
                        console.log("RES",res);

                        this.lstUsuarios = res;
                        this.fmrUsuario = datos;

                        console.log(this.lstUsuarios); 
                        
                        this.data = this.lstUsuarios.slice();
                        this.gridData = process(this.lstUsuarios, this.state2);

                        this.contrasenaGuardar = false;
                        this.contrasenaModificar = true;
                        this.botonGuardar = false;
                        this.botonModificar = true;
                        this.fotoUsuarioAgregar = false;
                        this.tabContrasenaAgregar = false;
                        this.tabEliminarAgregar = false;
                        this.fotoUsuarioModificar = true;
                        this.tabContrasenaModificar = true;
                        this.tabEliminarModificar = true;

                        this.abrirModalUsuario();
                  },
                  err => {
                        this.spinner.hide();
                        console.log(err);
                        this.conexion.error(err);
                  }
            );
      }

      // PASo 2: OBTENCIÓN DE LOS DATOS DEL USUARIO PADRE
      public obtenerUsuarioPadreBroker(broker: any) {
            this.spinner.show();
            this.conexion.get('Broker/SBroker.svc/consultar/usuario/broker/' + broker.IdBroker, this.usuario.Uid).subscribe(
                  (res: any) => {
                        this.spinner.hide();
                        this.lstUsuariosAuxiliar = res;
                        this.filtarRoles();
                  },
                  err => {
                        this.spinner.hide();
                        console.log(err);
                        this.conexion.error(err);
                  }
            );
      }

      //PASO 3: CARGA DE DATOS DEL MODAL PERFIL 
      public cargarModalPerfiles(datos: any) {

            this.fmrUsuario = datos;
            this.IdBroker = datos.broker;
            this.IdRol = { text: "", value: this.fmrUsuario.rol.IdRol };
            this.obtenerUsuarioPadreBroker(this.IdBroker);
            this.IdPadre = { Usuario: "", IdUsuario: datos.IdPadre };
            this.CodigoTipoAgente = { text: "", value: parseInt(this.fmrUsuario.CodigoTipoAgente) };
            this.listarAgentes();
            this.CodigoAgente = { nombreAgente: "", codigoAgente: this.fmrUsuario.CodigoAgente };
            this.Ciudad = { Nombre: datos.Ciudad };
            this.Sucursal = { Union: this.fmrUsuario.CodigoPuntoVenta + "-" + this.fmrUsuario.CodigoSucursal, CodigoPuntoVenta: this.fmrUsuario.CodigoPuntoVenta, CodigoSucursal: this.fmrUsuario.CodigoSucursal };

            this.Corredores = { text: datos.Corredores == 1 ? "SI" : "NO", value: parseInt(datos.Corredores) };
            this.Comision = { text: datos.Comision == 0 ? " 0 %" : datos.Comision == 20 ? "20 %" : "25 %", value: parseInt(datos.Comision) };

            this.fmrUsuario.Comision = parseInt(datos.Comision);
            this.IdUsuarioCambio = datos.IdUsuarioBroker;

            this.fmrUsuario.Identificador = 10;
            this.contrasenaGuardar = false;
            this.contrasenaModificar = true;
            this.botonGuardar = false;
            this.botonModificar = true;

            this.abrirModalPerfiles();
      }

      // FINAL DE FUNCIONES PARA MODIFICAR UN USUARIO 

      //PASO 1 :  FUNCIÓN PARA RESETEAR LA CONTRASEÑA DEL USUARIO 
      public resetearContrasena() {
            var datos = {
                  "Ciudad": "",
                  "CodigoAgente": "",
                  "CodigoPuntoVenta": "",
                  "CodigoSucursal": "",
                  "CodigoTipoAgente": "",
                  "Comision": 0,
                  "Contrasena": "Qw12345678",
                  "Email": "",
                  "Estado": 1,
                  "EstadoSesion": 0,
                  "Foto": "",
                  "IdPadre": 0,
                  "IdUsuario": this.fmrUsuario.IdUsuario,
                  "Identificador": 6,
                  "Total": 0,
                  "Uid": null,
                  "Usuario": "",
                  "UsuarioPadre": null,
                  "Corredores": "",
                  "Cedula": "",
                  "IdUsuarioBroker": 0,
                  "broker": {
                        "IdBroker": 0
                  },
                  "rol": {
                        "IdRol": 0,
                  }
            };
            Swal.fire({
                  title: 'Confirmación',
                  html: "Esta seguro de resetear la contraseña.",
                  type: 'info',
                  showCancelButton: true,
                  allowOutsideClick: false,
                  confirmButtonText: 'Aceptar',
            }).then((result) => {
                  if (result.value) {
                        this.spinner.show();
                        this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', datos, "").subscribe(
                              (res: any) => {
                                    this.spinner.hide();
                                    this.validador.mostrarAlertaCorrecta("Contraseña Reseteada Exitosamente", this.usuario.broker.Color);
                              },
                              err => {
                                    this.spinner.hide();
                                    console.log(err);
                                    this.validador.mostrarAlerta("No se pudo actualizar la contraseña", this.usuario.broker.Color);
                                    this.conexion.error(err);
                              }
                        );
                  }
            });
      }

      // PASO 2: FUNCIÓN PARA CAMBIAR EL ESTADO DEL USUARIO 
      public cambiarEstadoUsuario() {
            var datos = {
                  "Ciudad": "",
                  "CodigoAgente": "",
                  "CodigoPuntoVenta": "",
                  "CodigoSucursal": "",
                  "CodigoTipoAgente": "",
                  "Comision": 0,
                  "Contrasena": "Qw12345678",
                  "Email": "",
                  "Estado": 1,
                  "EstadoSesion": 0,
                  "Foto": "",
                  "IdPadre": 0,
                  "IdUsuario": this.fmrUsuario.IdUsuario,
                  "Identificador": 4,
                  "Total": 0,
                  "Uid": null,
                  "Usuario": "",
                  "UsuarioPadre": null,
                  "Corredores": "",
                  "Cedula": "",
                  "IdUsuarioBroker": 0,
                  "broker": {
                        "IdBroker": 0
                  },
                  "rol": {
                        "IdRol": 0,
                  }
            };
            Swal.fire({
                  title: 'Confirmación',
                  html: "Esta seguro de realizar el siguiente proceso.",
                  type: 'warning',
                  showCancelButton: true,
                  allowOutsideClick: false,
                  confirmButtonText: 'Aceptar',
            }).then((result) => {
                  if (result.value) {
                        this.spinner.show();
                        this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', datos, "").subscribe(
                              (res: any) => {
                                    this.spinner.hide();
                                    this.cerrarModalUsuario();
                                    this.validador.mostrarAlertaCorrecta("Proceso Exitoso !!!", this.usuario.broker.Color);
                                    this.consultarUsuarios();
                              },
                              err => {
                                    this.spinner.hide();
                                    console.log(err);
                                    this.validador.mostrarAlerta("No se pudo realizar esta acción contáctese con su Administrador", this.usuario.broker.Color);
                                    this.conexion.error(err);
                              }
                        );
                  } else {
                        this.cerrarModalUsuario();
                  }
            });
      }

      // PASO 3: FUNCIÓN PARA ELIMINAR PERFILES DE Los USUARIO
      public eliminarPerfil(item: any) {
            if (this.lstUsuarios.length == 1) {
                  this.cambiarEstadoUsuario();
            } else if (this.lstUsuarios.length > 1) {
                  this.fmrUsuario = item;
                  var datos = {
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
                        "IdUsuario": this.fmrUsuario.IdUsuario,
                        "Identificador": 12,
                        "Total": 0,
                        "Uid": null,
                        "Usuario": "",
                        "UsuarioPadre": null,
                        "Corredores": "",
                        "Cedula": "",
                        "IdUsuarioBroker": this.fmrUsuario.IdUsuarioBroker,
                        "broker": {
                              "IdBroker": 0
                        },
                        "rol": {
                              "IdRol": 0,
                        }
                  };

                  Swal.fire({
                        title: 'Confirmación',
                        html: "Esta seguro de eliminar el siguiente perfil.",
                        type: 'warning',
                        showCancelButton: true,
                        allowOutsideClick: false,
                        confirmButtonText: 'Aceptar',
                  }).then((result) => {
                        if (result.value) {
                              this.spinner.show();
                              this.conexion.post('Gestion/SGesTransacciones.svc/usuario/gestion', datos, "").subscribe(
                                    (res: any) => {
                                          console.log(res);
                                          this.spinner.hide();
                                          this.validador.mostrarAlertaCorrecta("Perfil Eliminado Exitosamente", this.usuario.broker.Color);
                                          this.cerrarModalUsuario();
                                          this.consultarUsuarios();
                                    },
                                    err => {
                                          this.spinner.hide();
                                          console.log(err);
                                          this.validador.mostrarAlerta("No se pudo eliminar el perfil. Contactece con su administrador", this.usuario.broker.Color);
                                          this.conexion.error(err);
                                    }
                              );
                        } else {
                              this.cerrarModalUsuario();
                        }
                  });

            }

      }

      public activarUsuario(item: any) {
            this.fmrUsuario = item;
            this.cambiarEstadoUsuario();
      }

      // INICIO FUNCIONES VARIAS // 
      // OBTENER LISTA DE USUARIOS POR BROKER
      public obtenerUsuarioPadre(broker: any) {
            this.spinner.show();
            this.conexion.get('Broker/SBroker.svc/consultar/usuario/broker/' + broker.IdBroker, this.usuario.Uid).subscribe(
                  (res: any) => {
                        this.spinner.hide();
                        this.lstUsuariosAuxiliar = res;
                  },
                  err => {
                        this.spinner.hide();
                        console.log(err);
                        this.conexion.error(err);
                  }
            );
      }

      // OBTENER USUARIOS PADRES A PARTIR DEL IdBroker
      public filtarRoles() {
            this.lstPadres = [];
            if (this.IdBroker != undefined && this.IdRol != undefined) {
                  for (let usuarios of this.lstUsuariosAuxiliar) {
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

      public filtrarPadre(value: any) {
            this.dataPadre = this.lstPadres.filter((s) => s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }

      public filtrarBroker(value: any) {
            this.dataBroker = this.lstBroker.filter((s) => s.RazonSocial.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }

      public filtrarAgente(value: any) {
            this.dataAgente = this.lstAgente.filter((s) => s.nombreAgente.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }

      public filtrarCiudad(value: any) {
            this.dataCiudad = this.lstCiudad.filter((s) => s.Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }

      public listarAgentes() {
            this.spinner.show();
            this.lstAgente = [];
            this.CodigoAgente = null;
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
                  "Corredores": "",
                  "Cedula": "",
                  "IdUsuarioBroker": 0,
                  "broker": { "IdBroker": 0 },
                  "rol": { "IdRol": 0 }
            };
            this.IdRol = {};
            this.IdBroker = {};
            this.IdPadre = {};
            this.Ciudad = {};
            this.CodigoTipoAgente = {};
            this.CodigoAgente = {};;
            this.Sucursal = {};
            this.Comision = {};
            this.Corredores = {};
      }

      public limpiarCamposNuevo() {
            this.IdRol = {};
            this.IdBroker = {};
            this.IdPadre = {};
            this.Ciudad = {};
            this.CodigoTipoAgente = {};
            this.CodigoAgente = {};;
            this.Sucursal = {};
            this.Comision = {};
            this.Corredores = {};
      }

      public abrirModalUsuario() {
            $("#modalUsuario").css("display", "block");
            $('#v-pills-tab a[href="#v-pills-home"]').tab('show');
      }

      public cerrarModalUsuario() {
            $("#modalUsuario").css("display", "none");
      }

      public abrirModalPerfiles() {
            $("#modalPerfiles").css("display", "block");
      }

      public cerrarModalPerfiles() {
            $("#modalPerfiles").css("display", "none");
      }

      public dataStateChange(state: DataStateChangeEvent): void {
            this.state = state;
            this.state2 = state;
            this.gridData = process(this.lstUsuarios, this.state2);
            this.gridDataActivos = process(this.lstUsuariosActivos, this.state);
            this.gridDataInactivos = process(this.lstUsuariosInactivos, this.state);
      }

      public dataStateChangePerfiles(state: DataStateChangeEvent): void {
            this.state2 = state;
            this.gridData = process(this.lstUsuarios, this.state2);
            
      }

      // FINAL FUNCIONES VARIAS //
}