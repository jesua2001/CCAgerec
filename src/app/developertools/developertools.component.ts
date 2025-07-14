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
  IonToolbar,
  IonSpinner, LoadingController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../core/servicies/auth-state.service';
import { ToastController } from '@ionic/angular';

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
    IonButton,
    IonText,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonSpinner
  ]
})
export class DeveloperPanelPage implements OnInit {
  usuarios: any[] = [];
  id: number = 0;
  nuevoEmail: string = '';
  mensaje: string = '';
  loading: boolean = false;


  constructor(
    private http: HttpClient,
    private router: Router,
    private authState: AuthStateService,
   private toastController: LoadingController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    const params = new HttpParams().set('action', 'User');
    this.http.get<any[]>(`${environment.apiBase}/${environment.endpoints.user}`, { params })
      .subscribe({
        next: data => {
          this.usuarios = data;
          this.loading = false;
        },
        error: () => {
          this.mensaje = 'Error cargando usuarios';
          this.loading = false;
        }
      });
  }

  cambiarCorreo() {
    if (!this.nuevoEmail.trim()) {
      this.mensaje = 'El campo email no puede estar vacío.';
      return;
    }

    //crear toast cargando


    const token = this.authState.getToken();
    if (!token) {
      this.mensaje = 'No autenticado';
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('email', this.nuevoEmail);

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    const params = new HttpParams().set('action', 'changeUserEmail');

    this.http.post(`${environment.apiBase}/${environment.endpoints.user}`, formData, { headers, params })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.success || 'Correo actualizado correctamente';
          this.loading = false;
          this.cargarUsuarios();  // Recarga usuarios para reflejar el cambio
        },
        error: (err) => {
          this.mensaje = err.error?.description || 'Error al cambiar el correo';
          this.loading = false;
        }
      });
  }

  loginComoUsuarioSeleccionado() {
    const token = this.authState.getToken();
    if (!token) {
      this.mensaje = 'No autenticado';
      return;
    }

    const formData = new FormData();
    formData.append('id', this.id.toString());

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    const params = new HttpParams().set('action', 'impersonateUser');

    this.http.post(`${environment.apiBase}/${environment.endpoints.user}`, formData, { headers, params })
      .subscribe({
        next: async (res: any) => {
          if (res.token) {
            this.authState.loginConToken(res.token);

            const loading = await this.toastController.create({
              message: 'Cambiando de usuario...',
              duration: 2000,
              spinner: 'crescent',
            });
            await loading.present();

            this.router.navigate(['/cambiarprograma']).then(() => {
              window.location.reload();
            });
          } else {
            this.mensaje = 'Error al obtener token';
          }
        },
        error: (err) => {
          this.mensaje = err.error?.description || 'Error al impersonar usuario';
        }
      });
  }

}
