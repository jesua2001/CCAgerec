import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  constructor() {}

  // Método para iniciar sesión con un token
  loginConToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  // Obtener el token actual
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  // Saber si está autenticado
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}
