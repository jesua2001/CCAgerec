import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterLink
} from "@ionic/angular/standalone";
import { ToastController } from "@ionic/angular";
import { AuthService } from "../core/servicies/auth.service";
import { RegisterRequest } from "@models/user.model";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    RouterLink,
    FormsModule,
    IonRouterLink
  ]
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(message: string, color: 'primary' | 'danger' | 'success' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      position: 'top',
      color: color, // Asegura que el color se pase correctamente
    });
    await toast.present();
  }
  async presentToast(message: string, color: 'primary' | 'success' | 'danger' = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      position: 'bottom', // Posición del toast: 'top', 'middle', 'bottom'
      color: color // Color del toast
    });
    await toast.present();
  }
  async onRegister() {
    if (this.password !== this.confirmPassword) {
      await this.showToast("Las contraseñas no coinciden", 'danger');
      return;
    }

    const user: RegisterRequest = {
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      isAdmin: this.isAdmin
    };

    this.authService.register(user).subscribe({
      next: async () => {
        await this.showToast('Registrado correctamente. Redirigiendo...', 'primary');
        this.router.navigate(['/login']);

      },
      error: async (err) => {
        const errorMessage = err.error?.error || 'Error desconocido';
        if (errorMessage === 'User Exists') {
          await this.presentToast('Registro exitoso', 'success');
          await this.showToast('El usuario ya está registrado. Intenta con otro correo.', 'danger');
        } else {
          await this.showToast('Error al registrar: ' + errorMessage, 'danger');
        }
      }
    });
  }
}
