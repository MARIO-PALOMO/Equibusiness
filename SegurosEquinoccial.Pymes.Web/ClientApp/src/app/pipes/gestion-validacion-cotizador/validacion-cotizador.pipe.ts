import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';




@Pipe({
  name: 'validacionCotizador'
})
export class ValidacionCotizadorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

  public validacion(empresa: any, color: any) {

    var validacion = true;

    if (empresa.Ruc == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Documento", color);
    } else if (empresa.Ruc.length != 10 && empresa.Ruc.length != 13) {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Documento Válido", color);
    } else if (empresa.Ruc.length == 13 && empresa.PrimerApellido == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Nombre del Asegurado", color);
    } else if (empresa.Ruc.length == 10 && empresa.Nombre == "" && empresa.PrimerApellido == "" && empresa.SegundoApellido == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Nombre del Asegurado", color);
    } else if (empresa.Telefono == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Teléfono", color);
    } else if (empresa.Telefono.length != 10 && empresa.Telefono.length != 9) {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Teléfono Válido", color);
    } else if (this.correoElectronico(empresa.Email)) {
      validacion = false;
      this.mostrarAlerta("Ingresar Correo Electrónico Válido", color);
    } else if (empresa.GiroNegocio == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Giro del Negocio", color);
    } else if (empresa.SectorEconomico == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Sector Económico", color);
    } else if (empresa.Direccion == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Dirección", color);
    } else {
      validacion = true;
    }

    return validacion;
  }

  public validacionCorredor(sucursal, comision, tipoAgente, agente, corredor, color) {
    var validacion = false;
    if (corredor == "0") {
      validacion = true;
    } else {
      if (comision == undefined) {
        validacion = false;
        this.mostrarAlerta("Seleccionar Porcentaje de Comisión", color);
      } else if (tipoAgente == undefined) {
        validacion = false;
        this.mostrarAlerta("Seleccionar Tipo de Agente", color);
      } else if (agente == undefined) {
        validacion = false;
        this.mostrarAlerta("Seleccionar Agente", color);
      } else if (sucursal == undefined) {
        validacion = false;
        this.mostrarAlerta("Seleccionar Punto de Venta - Sucursal", color);
      } else {
        validacion = true;
      }
    }
    return validacion;
  }

  public validacionSiniestralidad(siniestralidad, color) {
    var validacion = false;
    if (siniestralidad == "") {
      validacion = false;
      this.mostrarAlerta("Seleccionar Siniestralidad", color);
    } else if (siniestralidad == "3") {
      validacion = false;
      this.mostrarAlerta("El pocentaje de siniestralidad seleccionado supera el límite permito para realizar la cotización", color);
    } else {
      validacion = true;
    }
    return validacion;
  }

  public validacionPersonas(persona: any, color: any, tipo) {

    var validacion = true;

    if (persona.Cedula == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Documento | " + tipo, color);
    } else if (persona.Cedula.length != 10 && persona.Cedula.length != 13) {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Documento Válido | " + tipo, color);
    } else if (persona.Cedula.length == 13 && persona.PrimerApellido == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Nombre del " + tipo, color);
    } else if (persona.Cedula.length == 10 && persona.Nombre == "" && persona.PrimerApellido == "" && persona.SegundoApellido == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Nombre del " + tipo, color);
    } else if (persona.Telefono == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Teléfono | " + tipo, color);
    } else if (persona.Telefono.length != 10 && persona.Telefono.length != 9) {
      validacion = false;
      this.mostrarAlerta("Ingresar Número de Teléfono Válido | " + tipo, color);
    } else if (this.correoElectronico(persona.Email)) {
      validacion = false;
      this.mostrarAlerta("Ingresar Correo Electrónico Válido | " + tipo, color);
    } else if (persona.Direccion == "") {
      validacion = false;
      this.mostrarAlerta("Ingresar Dirección | " + tipo, color);
    } else {
      validacion = true;
    }

    return validacion;
  }

  public gestionValidacionEmpresa(empresa: any, color: any) {
    var validacion = false;
    if (!this.validarCampos(empresa.Ruc)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en RUC", color);
    } else if (empresa.Ruc.length == 13 && empresa.PrimerApellido == "") {
      validacion = true;
      this.mostrarAlerta("Ingresar Nombre del Asegurado", color);
    } else if (empresa.Ruc.length == 10 && empresa.Nombre == "" && empresa.PrimerApellido == "" && empresa.SegundoApellido == "") {
      validacion = true;
      this.mostrarAlerta("Ingresar Nombre del Asegurado", color);
    } else if (empresa.Ruc.length != 13 && empresa.Ruc.length != 10) {
      validacion = true;
      this.mostrarAlerta("Ingresar Número de RUC Válido", color);
    } else if (!this.validarCampos(empresa.Telefono)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en Teléfono", color);
    } else if (empresa.Telefono.length != 10 && empresa.Telefono.length != 7 && empresa.Telefono.length != 9) {
      validacion = true;
      this.mostrarAlerta("Ingresar Número de Teléfono Válido", color);
    } else if (!this.validarCampos(empresa.Email)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en Correo Electrónico", color);
    } else if (this.correoElectronico(empresa.Email)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Correo Electrónico Válido", color);
    } else if (!this.validarCampos(empresa.GiroNegocio)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en Giro del Negocio", color);
    } else if (!this.validarCampos(empresa.SectorEconomico)) {
      validacion = true;
      this.mostrarAlerta("Seleccionar Sector Económico", color);
    } else if (!this.validarCampos(empresa.Direccion)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Dirección", color);
    }

    return validacion;
  }

  public gestionValidacionEmpresaPersonas(persona: any, color: any, tipo) {
    var validacion = false;

    if (!this.validarCampos(persona.Cedula)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en " + tipo + " | Cédula", color);
    } else if (persona.Cedula.length != 10 && persona.Cedula.length != 13) {
      validacion = true;
      this.mostrarAlerta("Ingresar Número de " + tipo + " | Cédula Válido", color);
    } else if (persona.Cedula.length == 13 && this.validarCampos(persona.PrimerApellido)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en " + tipo + " | Nombre", color);
    } else if (persona.Cedula.length == 10 && this.validarCampos(persona.Nombre) && this.validarCampos(persona.PrimerApellido) && this.validarCampos(persona.SegundoApellido)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en " + tipo + " | Nombre", color);
    } else if (!this.validarCampos(persona.Direccion)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en " + tipo + " | Dirección", color);
    } else if (!this.validarCampos(persona.Telefono)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Valor en " + tipo + " | Teléfono", color);
    } else if (this.correoElectronico(persona.Email)) {
      validacion = true;
      this.mostrarAlerta("Ingresar Correo Electrónico | " + tipo + " Válido", color);
    }
    return validacion;
  }

  public gestionValidacionDirecciones(lstDirecciones: any, color: any) {
    var validacion = true;
    for (var direcciones of lstDirecciones) {
      if (direcciones.provincia == "" || direcciones.provincia == null || direcciones.provincia == undefined) {
        validacion = false;
      }
    }

    if (lstDirecciones.length <= 0) {
      validacion = false;
      this.mostrarAlerta("Seleccionar al menos una dirección", color);
    } else if (validacion == false) {
      validacion = false;
      this.mostrarAlerta("Verificar la provincia de una dirección seleccionada", color);
    }

    return validacion;
  }

  public gestionValidacionTotalCotizacion(iva12: number, iva0: number, color) {
    var validacion = true;
    if (iva12 == 0 && iva0 == 0) {
      this.mostrarAlerta("Ingresar valores en el módulo COBERTURAS", color);
      validacion = false;
    }
    return validacion;
  }

  public gestionValidacionResumen(empresa: any, color) {
    var validacion = true;
    if (!this.validarCampos(empresa)) {
      this.mostrarAlerta("Ingresar datos en el módulo EMPRESA", color);
      validacion = false;
    }
    return validacion;
  }

  public formatoCampo(valor, restriccion, caracteres, tipo) {
    var out = '';
    var filtro = '' + restriccion + '';
    for (var i = 0; i < valor.length; i++) {
      if (filtro.indexOf(valor.charAt(i)) != -1) {
        if (out.length >= caracteres) {
          out.substr(0, caracteres);
        } else {
          out += valor.charAt(i);
        }
      }
    }
    return (tipo == 1) ? out.toUpperCase() : out;
  }

  public correoElectronico(value: any) {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  public validarCampos(campo) {
    var validacion = true;
    if (campo == "" || campo == null || campo == undefined || campo.length == 0) {
      validacion = false;
    }
    return validacion;
  }

  public mostrarAlertaDinamica(descripcion: any, tipo, color: any) {
    
    Swal.fire({
      type: tipo,
      text: descripcion,
      confirmButtonText: "Continuar",
      confirmButtonColor: "rgb(" + color + ")"
    });
  }

  public mostrarAlerta(descripcion: any, color: any) {
    Swal.fire({
      type: 'error',
      text: descripcion,
      confirmButtonText: "Continuar",
      confirmButtonColor: "rgb(" + color + ")"
    });
  }

  public mostrarAlertaInformativa(descripcion: any, color: any) {
    Swal.fire({
      type: 'info',
      text: descripcion,
      confirmButtonText: "Continuar",
      confirmButtonColor: "rgb(" + color + ")"
    });
  }

  public mostrarAlertaCorrecta(descripcion: any, color: any) {
    Swal.fire({
      type: 'success',
      text: descripcion,
      confirmButtonText: "Continuar",
      confirmButtonColor: "rgb(" + color + ")"
    });
  }

  public notificacion(texto, tipo, fondo) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 10000
    });

    Toast.fire({
      title: '<i class="mdi mdi-close-circle" style="color: #ffffff !important; font-size: 25px !important; padding-right: 10px !important"></i><span style="color: #ffffff !important; font-size: 12px !important;"> ' + texto + '</span>',
      background: fondo
    })
  }

  public gestionValidarFormularioUsuarios(fmrUsuario:any,color:any){
    var validacion = true;
    if (fmrUsuario.Usuario == "") { 
      validacion = false;
      this.mostrarAlerta("Llene el campo Nombre.", color);
    } else if (fmrUsuario.Usuario.length <= 4) {
      validacion = false;
      this.mostrarAlerta("Ingrese un nombre válido.", color);
    } else if (fmrUsuario.Cedula.length < 10) {
      validacion = false;
      this.mostrarAlerta("Ingrese una cédula válida.", color);
    } else if (this.correoElectronico(fmrUsuario.Email)) {
      validacion = false;
      this.mostrarAlerta("Ingrese correo Electrónico válido.", color);
    } else if (fmrUsuario.Contrasena == "") {
      validacion = false;
      this.mostrarAlerta("Llene el campo Contraseña.", color);
    } else if (fmrUsuario.Contrasena.length < 8) {
      validacion = false;
      this.mostrarAlerta("La contraseña debe tener un mínimo de 8 caráteres.", color);
    } else if (fmrUsuario.rol.IdRol == undefined) {
      validacion = false;
      this.mostrarAlerta("LLene el campo Rol.", color);
    } else if (fmrUsuario.broker.IdBroker == undefined) {
      validacion = false;
      this.mostrarAlerta("Eliga el broker al que pertenecerá el usuario.", color);
    } else if (fmrUsuario.rol.IdRol != 2 && fmrUsuario.IdPadre == undefined) {
      validacion = false;
      this.mostrarAlerta("Seleccione el Supervisor ó Gerente.", color);
    } else if (fmrUsuario.Ciudad == undefined) {
      validacion = false;
      this.mostrarAlerta("Debe elegir una Ciudad.", color);
    } else if (fmrUsuario.CodigoTipoAgente == undefined) {
      validacion = false;
      this.mostrarAlerta("El campo Tipo Agente no puede estar vacío.", color);
    } else if (fmrUsuario.CodigoAgente == undefined) {
      validacion = false;
      this.mostrarAlerta("Eliga el corredor al que pertenece el usuario.", color);
    } else if (fmrUsuario.CodigoPuntoVenta == undefined) {
      validacion = false;
      this.mostrarAlerta("El campo Punto de Venta - Sucursal no puede estar vacío.", color);
    } else {
      validacion = true;
    }
    return validacion;
  }

/* else if (fmrUsuario.Comision == null) {
      validacion = false;
      this.mostrarAlerta("El campo comisión no puede estar vacío.", color);
    } else if (fmrUsuario.Corredores == null) {
      validacion = false;
      this.mostrarAlerta("El campo Mostrar Combo - Corredores no puede estar vacío.", color);
    }  */


}
