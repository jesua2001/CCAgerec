import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer-panel',
  templateUrl: 'developertools.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    FormsModule,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonText,
    IonToolbar,
    IonTitle,
    IonHeader
  ]
})
export class DeveloperPanelPage implements OnInit {
  usuarios: any[] = [];
  id: number = 0;
  nuevoEmail: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const params = new HttpParams().set('action', 'User');
    this.http.get<any[]>(`${environment.apiBase}/${environment.endpoints.user}`, { params })
      .subscribe(data => this.usuarios = data);
  }

  cambiarCorreo() {
    if (!this.nuevoEmail.trim()) {
      this.mensaje = 'El campo email no puede estar vacío.';
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.mensaje = 'No autenticado';
      return;
    }

    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('email', this.nuevoEmail);

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    const params = new HttpParams().set('action', 'changeUserEmail');

    this.http.post(`${environment.apiBase}/${environment.endpoints.user}`, formData, { headers, params })
      .subscribe({
        next: (res: any) => this.mensaje = res.success || 'Correo actualizado correctamente',
        error: (err) => this.mensaje = err.error?.description || 'Error al cambiar el correo'
      });
  }

  loginComoUsuarioSeleccionado() {
    console.log('idUsuario:', this.id);
    console.log('usuarios:', this.usuarios);

    // 🔧 Línea corregida: se usa this.id en lugar de this.idUsuario
    const usuario = this.usuarios.find(u => Number(u.id) === Number(this.id));

    if (!usuario) {
      this.mensaje = 'Usuario no encontrado.';
      return;
    }

    const token = this.generarTokenFalso(usuario);
    localStorage.setItem('token', token);
    this.router.navigate(['/home']);
  }

  private generarTokenFalso(usuario: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.name,
        isAdmin: usuario.isAdmin,
        isDeveloper: usuario.email === 'developer@miapp.com'
      }
    }));
    const signature = btoa('firma-falsa');
    return `${header}.${payload}.${signature}`;
  }
}
