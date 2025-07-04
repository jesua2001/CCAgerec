import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://tudominio.com/api';

  constructor(private http: HttpClient) {}

  login(datos: any) {
    return this.http.post(`${this.baseUrl}/login.php`, datos);
  }

  obtenerProductos() {
    return this.http.get(`${this.baseUrl}/productos.php`);
  }
}
