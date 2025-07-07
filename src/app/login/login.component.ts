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
import { AuthService} from "../core/servicies/auth.service";
import {LoginRequest, LoginResponse} from '@models/user.model';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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



  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogin() {
    const loginData: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']); // Cambia la ruta según tu app
        } else if (response.error) {
          response.error;
        } else {
          'Inicio de sesión fallido.';
        }
      },
      error: (error) => {
        error.error?.error || 'Ocurrió un error.';
      }
    });

  }
}
