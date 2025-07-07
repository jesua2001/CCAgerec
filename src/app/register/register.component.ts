import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {AuthService} from "../core/servicies/auth.service";
import {RegisterRequest} from "@models/user.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    RouterLink,
    FormsModule
  ]
})
export class RegisterComponent {
  email = '';
  password = '';
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  isAdmin = false;

  constructor(private authService: AuthService) {}

  onRegister() {
    const user: RegisterRequest = {
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      isAdmin: this.isAdmin
    };
    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Registro correcto', res);
        // puedes redirigir o mostrar mensaje
      },
      error: (err) => {
        console.error('Error en registro', err);
      }
    });
  }
}

