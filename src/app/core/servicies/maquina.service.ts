import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Maquina} from "@models/maquina.model";
import {Injectable} from "@angular/core";
import {environment} from "@environments/environment";
import * as url from "node:url";

@Injectable({
  providedIn: 'root'
})

export class MaquinaService {

  constructor(private http: HttpClient) {}

  obtenerEquivalencia(modelo: string, marca: string, numeroSerie: string, tipoMaquina: string): Observable<Maquina[]> {
  const formData = new FormData();
  formData.append('MODELO', modelo);
  formData.append('MARCA', marca);
  formData.append('SERIE', numeroSerie);
  formData.append('tipoMaquina', tipoMaquina); // 👈 AÑADIMOS ESTO

  const params = new HttpParams()
    .set('action', 'obtenerCruceApiladores') // mantenemos esta acción
    .set('debug', '');

  const url = `${environment.apiBase}/${environment.endpoints.maquina}`;
  return this.http.post<Maquina[]>(url, formData, { params });
}

  anadirNuevaMaquinaConCEEquivalente(data: Maquina, tipoMaquina: string): Observable<Maquina[]> {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('tipoMaquina', tipoMaquina); // 👈 esto es lo nuevo
    formData.append('foto', data.foto);

  const params = new HttpParams()
    .set('action', 'anadirMaquinaCEEquivalente')
    .set('debug', '');

  const url = `${environment.apiBase}/${environment.endpoints.maquina}`;
  return this.http.post<Maquina[]>(url, formData, { params });
  }


  obtenerCE(modelo: string, marca: string, numeroSerie: string): Observable<Maquina[]> {
    const formData = new FormData();
    formData.append('MODELO', modelo);
    formData.append('MARCA', marca);
    formData.append('SERIE', numeroSerie);

    const params = new HttpParams()
      .set('action', 'obtenerCE')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.maquina}`;
    return this.http.post<Maquina[]>(url, formData, { params });
  }

  anadirCENuevo(data: Maquina, tipoMaquina: string): Observable<any> {
    const formData = new FormData();

    const { foto, ...dataSinFoto } = data;  // 🚀 Quitamos foto con destructuring
    const fotoFile = foto as File;

    formData.append('data', JSON.stringify(dataSinFoto));
    formData.append('tipoMaquina', tipoMaquina);

    if (fotoFile) {
      formData.append('foto', fotoFile);  // ⚡ Foto como archivo real
    }

    const params = new HttpParams()
      .set('action', 'anadirCENuevo')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.maquina}`;
    return this.http.post<any>(url, formData, { params });
  }




}
