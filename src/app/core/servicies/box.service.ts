import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BoxAnadir, BoxObtener} from "@models/box.model";
import {Injectable} from "@angular/core";
import {environment} from "@environments/environment";
import * as url from "node:url";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) {
  }

  getcaneth(numeroSerie: string): Observable<BoxObtener[]> {
    const formData = new FormData();
    formData.append('NSERIE', numeroSerie);

    const params = new HttpParams()
      .set('action', 'obtenercaja')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.caja}`;
    return this.http.post<BoxObtener[]>(url, formData, { params });
  }

  crearCaja(caja: BoxAnadir): Observable<BoxAnadir> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(caja)); // 👈 importante: mandar todo como JSON

    const params = new HttpParams()
      .set('action', 'anadirCaja')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.caja}`;
    return this.http.post<BoxAnadir>(url, formData, { params });
  }

  modificarCaja(caja: BoxAnadir): Observable<BoxAnadir[]> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(caja));

    const params = new HttpParams()
      .set('action', 'modificarCaja')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.caja}`;
    return this.http.post<BoxAnadir[]>(url, formData, { params });
  }


  buscarCajaPorCertificado(certificado: string): Observable<BoxAnadir[]> {
    const formData = new FormData();
    formData.append('certificado', certificado);
    const params = new HttpParams().set('action', 'obtenercajaid');
    const url = `${environment.apiBase}/${environment.endpoints.caja}`;
    return this.http.post<BoxAnadir[]>(url, formData, { params });
  }




}
