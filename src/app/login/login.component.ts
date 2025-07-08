import { Component, OnInit } from '@angular/core';
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
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../core/servicies/auth.service";
import { LoginRequest, LoginResponse } from '@models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogin() {
    const loginData: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        if (response.token) {
          // Guardamos token en localStorage
          localStorage.setItem('token', response.token);
          // Navegamos al home
          this.router.navigate(['/home']);
        } else if (response.error) {
          alert('Error: ' + response.error);
        } else {
          alert('Inicio de sesión fallido.');
        }
      },
      error: (error) => {
        alert('Error en la petición: ' + (error.error?.error || 'Ocurrió un error.'));
        console.error(error);
      }
    });
  }

}
