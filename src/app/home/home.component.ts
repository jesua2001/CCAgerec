import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgIf } from "@angular/common";
import {
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from "@angular/router";
import {windows} from "rimraf";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    IonContent,
    IonButton,
  ]
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  isDeveloper: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadRoles();
  }

  private loadRoles() {
    const token = localStorage.getItem('token');
    const roles = this.getRolesFromToken(token);
    this.isAdmin = roles.isAdmin;
    this.isDeveloper = roles.isDeveloper;
  }

  consultar() {
  this.router.navigate(['/consultarbox']);
  }

  anadircaja() {
    this.router.navigate(['/anadircaja']);
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

  private generateFakeToken(email: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ data: { email } }));
    const signature = btoa('firma-falsa'); // Para pruebas
    return `${header}.${payload}.${signature}`;
  }

  abrirDeveloperTools() {
    this.router.navigate(['/developer-tools']);
  }

  modificarCaja() {
    this.router.navigate(['/modificarcaja']);
  }
}
