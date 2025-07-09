import { Component, OnInit } from '@angular/core';
import {IonHeader, IonIcon, IonToolbar} from "@ionic/angular/standalone";
import {AuthService} from "../core/servicies/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar
  ]
})
export class HeaderComponent  implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}
  onLogout() {
    this.authService.logout();
  }
}
