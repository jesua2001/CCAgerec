import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import {LoginRequest, LoginResponse, RegisterRequest} from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const params = new HttpParams()
      .set('action', 'loginUser')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.user}`;
    return this.http.post<LoginResponse>(url, formData, { params });
  }
  register(data: RegisterRequest): Observable<RegisterRequest> {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('apellido1', data.apellido1);
    formData.append('apellido2', data.apellido2);
    formData.append('nombre',data.nombre);
    const params = new HttpParams()
      .set('action', 'registerUser')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.user}`;
    return this.http.post<RegisterRequest>(url, formData, { params });
  }

  logout(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No hay token para cerrar sesión');
      return;
    }

    const url = `${environment.apiBase}/${environment.endpoints.user}`;
    const params = new HttpParams()
      .set('action', 'logoutUser');

    this.http.post<any>(url, {}, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        console.log(response?.success || 'Sesión cerrada');
        localStorage.removeItem('token');
        // Redirigir al login u otra vista
        window.location.href = '/login'; // Cambia esto si usas Angular Router
      },
      error: (error) => {
        console.error(error?.error?.error || 'Error al cerrar sesión');
        localStorage.removeItem('token'); // Por seguridad, igual lo borramos
        window.location.href = '/login';
      }
    });
  }


}
