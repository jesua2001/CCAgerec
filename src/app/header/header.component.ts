import { Component, OnInit } from '@angular/core';
import {IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {AuthService} from "../core/servicies/auth.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    CommonModule,
    IonButtons,
    IonTitle,
  ]
})
export class HeaderComponent  implements OnInit {

  constructor(private authService: AuthService , private router:Router) { }
  isAdmin: boolean = false;
  isDeveloper: boolean = false;

  private loadRoles() {
    const token = localStorage.getItem('token');
    const roles = this.getRolesFromToken(token);
    this.isAdmin = roles.isAdmin;
    this.isDeveloper = roles.isDeveloper;
  }

  ngOnInit() {
    this.loadRoles();
  }
  onLogout() {
    this.authService.logout();

  }

  private getRolesFromToken(token: string | null): { isAdmin: boolean; isDeveloper: boolean } {
    if (!token) return { isAdmin: false, isDeveloper: false };
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        isAdmin: payload.data?.isAdmin || false,
        isDeveloper: payload.data?.isDeveloper || false
      };
    } catch (e) {
      return { isAdmin: false, isDeveloper: false };
    }
  }

  goToHome() {
    this.router.navigate(['/cambiarprograma']);
  }
}
