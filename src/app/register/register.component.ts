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
    RouterLink
  ]
})
export class RegisterComponent   {

  constructor() {

  }



}
