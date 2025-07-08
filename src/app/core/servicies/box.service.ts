import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BoxObtener} from "@models/box.model";
import {Injectable} from "@angular/core";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) {
  }

  getcaneth(data:BoxObtener) : Observable<BoxObtener>{
    const formData = new FormData();
    formData.append('NSERIE', data.NSERIE);
    const params = new HttpParams()
      .set('action', 'obtenercaja')
      .set('debug', '');
    const url = `${environment.apiBase}/${environment.endpoints.caja}`;
    return this.http.post<BoxObtener>(url, formData, { params });

  }
}
