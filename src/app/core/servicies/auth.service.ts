import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { LoginRequest, LoginResponse } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    console.log('Login data:', data.email);
    formData.append('email', data.email);
    formData.append('password', data.password);

    const params = new HttpParams()
      .set('action', 'loginUser')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.user}`;
    return this.http.post<LoginResponse>(url, formData, { params });
  }
}
