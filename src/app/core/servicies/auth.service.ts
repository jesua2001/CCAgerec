import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { environment } from '@environments/environment';
import {LoginRequest, LoginResponse, RegisterRequest} from '@models/user.model';
import {jwtDecode} from "jwt-decode";
import {JwtPayloadModel} from "@models/jwtdecode.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rol: string = '';
  private isAdminUser: boolean = false;
  constructor(private http: HttpClient , private router:Router) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const params = new HttpParams()
      .set('action', 'loginUser')
      .set('debug', '');

    const url = `${environment.apiBase}/${environment.endpoints.user}`;

    return this.http.post<LoginResponse>(url, formData, { params }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.decodeToken(response.token);
        }
      })
    );
  }
  private decodeToken(token: string) {
    try {
      const decoded = jwtDecode<JwtPayloadModel>(token);
      this.rol = decoded.data.rol;
      this.isAdminUser = decoded.data.rol === 'admin'; // ← aquí está la corrección
    } catch (e) {
      console.error('Error decodificando el token JWT', e);
      this.rol = '';
      this.isAdminUser = false;
    }
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
        this.router.navigate(['/login']); // Cambia esto si usas Angular Router
      },
      error: (error) => {
        console.error(error?.error?.error || 'Error al cerrar sesión');
        localStorage.removeItem('token'); // Por seguridad, igual lo borramos
        this.router.navigate(['/login']);
      }
    });
  }
  getRol(): string {
    if (!this.rol) this.loadToken();
    return this.rol;
  }

  isAdmin(): boolean {
    if (!this.rol) this.loadToken();
    return this.rol === 'admin';
  }


  isCcAgerec(): boolean {
    if (!this.rol) this.loadToken();
    return this.rol === 'ccagerec' || this.isAdminUser;
  }

  isVgservicies(): boolean {
    if (!this.rol) this.loadToken();
    return this.rol === 'vgservicies' || this.isAdminUser;
  }
  private loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
    }
  }
}
