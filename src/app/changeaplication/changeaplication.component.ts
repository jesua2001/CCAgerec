import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonButton, IonContent } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import {AuthService} from "../core/servicies/auth.service";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-changeaplication',
  templateUrl: './changeaplication.component.html',
  standalone: true,
  imports: [

    HeaderComponent,
    IonContent,
    IonButton,
    NgIf
  ]
})
export class ChangeaplicationComponent implements OnInit {

  showCcAgerec = false;
  showVgServicies = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const isAdmin = this.authService.isAdmin();
    this.showCcAgerec = isAdmin || this.authService.isCcAgerec();
    this.showVgServicies = isAdmin || this.authService.isVgservicies();
  }

  changeApplicationACC() {
    this.router.navigate(['/home']);  // ruta para ccagerec
  }

  changeApplicationVG() {
    this.router.navigate(['/changeapplicationvg']);  // ruta para vgservicies
  }
}
