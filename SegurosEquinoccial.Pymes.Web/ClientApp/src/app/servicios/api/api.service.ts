import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { VariablesGlobales } from "../../variables/globales/globales";
import { retry } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable()
export class ApiService extends VariablesGlobales {

  public url: string = "";
  
  private keyCliente: string = "l:key";
  private timeCliente: string = "l:time";

  constructor(private http: HttpClient, private router: Router) {
    super();

    this.url = this.obtenerCredenciales("").conexionAPI;
  }

  post(endpoint: string, body: any, token: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "" + token + ""
      })
    };
    return this.http.post(this.url + "" + endpoint, body, httpOptions).pipe(retry(3));
  }

  get(endpoint: string, token: any, params?: any, reqOpts?: any): Observable<any> {

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "" + token + ""
      })
    };

    return this.http.get(this.url + "" + endpoint, reqOpts).pipe(retry(3));
  }

  postPay(endpoint: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "A1TLHztUKEZRl5YnMU8fqnFcyFMsIXeF"
      })
    };
    return this.http.post(this.obtenerCredenciales("").conexionAPILinkPago + "" + endpoint, body, httpOptions).pipe(retry(3));;
  }

  getPay(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "A1TLHztUKEZRl5YnMU8fqnFcyFMsIXeF"
      })
    };

    return this.http.get(this.obtenerCredenciales("").conexionAPILinkPago + "" + endpoint, reqOpts).pipe(retry(3));;
  }

  error(errores: any) {
    this.post("Gestion/SGesTransacciones.svc/errores/guardar", errores, "").subscribe(
      (res: any) => {
        var error = res;
        var validacion = error.match(/The exception message is 'Access is denied.'./g);
        if (validacion == null) {
          console.log(res);
        } else {
          console.log(res);
          Swal.fire({
            title: "",
            text: "La sesión ha caducado, ingresar nuevamente a la plataforma.",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              localStorage.removeItem(this.keyCliente);
              localStorage.removeItem(this.timeCliente);
              this.router.navigate(['/']);
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
