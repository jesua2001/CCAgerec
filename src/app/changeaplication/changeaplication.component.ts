import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonButton, IonContent} from "@ionic/angular/standalone";
import {windows} from "rimraf";
import {Router} from "@angular/router";

@Component({
  selector: 'app-changeaplication',
  templateUrl: './changeaplication.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    IonButton,
  ]
})
export class ChangeaplicationComponent  implements OnInit {

  constructor (private router: Router) {}

  ngOnInit() {}

  changeApplicationACC() {
    this.router.navigate(['/home']);
  }

  changeApplicationVG() {
    this.router.navigate(['/changeapplicationvg']);
  }



}
