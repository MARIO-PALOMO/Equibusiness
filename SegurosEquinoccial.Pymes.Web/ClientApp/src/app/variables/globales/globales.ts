export class VariablesGlobales {

  public ambiente = "DESARROLLO";

  public obtenerCredenciales(documento) {

    var credenciales: any = {};
    
    if (this.ambiente == "DESARROLLO") {
      credenciales.conexionAPI = "http://localhost/SegurosEquinoccial.Pymes.Servicio/";
      credenciales.conexionWeb = "https://localhost:44341";
      credenciales.conexionLinkPago = "https://localhost:44332";
      credenciales.conexionAPILinkPago = "http://localhost/SegurosEquinoccial.Pagos.Servicio.V2/";
    }
    else if (this.ambiente == "PRUEBAS") {
      credenciales.conexionAPI = "https://equi-prodbpymesapiappservice.azurewebsites.net/";
      credenciales.conexionWeb = "https://equipymestest.azurewebsites.net";
      credenciales.conexionLinkPago = "https://equi-prodbpaymentappservice.azurewebsites.net";
      credenciales.conexionAPILinkPago = "https://equi-prodbpaymentapiappservice.azurewebsites.net/";
    }
    else if (this.ambiente == "PRODUCCION") {
      credenciales.conexionAPI = "https://equipymesservicio.azurewebsites.net/";
      credenciales.conexionWeb = "https://equipymes.azurewebsites.net";
      credenciales.conexionLinkPago = "https://equipayment.azurewebsites.net";
      credenciales.conexionAPILinkPago = "https://equipaymentservice.azurewebsites.net/";
    }

    return credenciales;
  }
}

