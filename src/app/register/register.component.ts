import { Component } from '@angular/core';
        import {
          IonButton,
          IonContent,
          IonInput,
          IonItem,
          IonLabel,
          IonRouterLink,
          ToastController
        } from "@ionic/angular/standalone";
        import { AuthService } from "../core/servicies/auth.service";
        import { RegisterRequest } from "@models/user.model";
        import { FormsModule } from "@angular/forms";
        import {Router, RouterLink} from '@angular/router';

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
            private toastController: ToastController,
            private router: Router
          ) {}

          async presentLoadingToast(message: string) {
            const toast = await this.toastController.create({
              message,
              duration: 2000, // Duración del toast
              color: 'primary',
              position: 'top'
            });
            await toast.present();
            await toast.onDidDismiss(); // Espera a que el toast desaparezca
          }

          async onRegister() {
            if (this.password !== this.confirmPassword) {
              this.presentToast('Las contraseñas no coinciden', 'danger');
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
                await this.presentLoadingToast('Cargando...');
                this.router.navigate(['/login']); // Redirige al login después del registro
              },
              error: (err) => {
                if (err.error && err.error.description) {
                  if (err.error.description.includes('El usuario ya existe')) {
                    this.presentToast('El usuario ya existe', 'danger');
                  } else {
                    this.presentToast(err.error.description, 'danger');
                  }
                } else {
                  this.presentToast('Error al registrar el usuario', 'danger');
                }
              }
            });
          }

          async presentToast(message: string, color: string) {
            const toast = await this.toastController.create({
              message,
              duration: 2000,
              color,
              position: 'top'
            });
            await toast.present();
          }
        }
