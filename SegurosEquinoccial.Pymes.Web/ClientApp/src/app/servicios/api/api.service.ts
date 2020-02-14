import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { VariablesGlobales } from "../../variables/globales/globales";
import { retry } from "rxjs/operators";

@Injectable()
export class ApiService extends VariablesGlobales {

  public url: string = "";

  constructor(private http: HttpClient) {
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
    return this.http.post(this.url + "" + endpoint, body, httpOptions).pipe(retry(3));;
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
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
