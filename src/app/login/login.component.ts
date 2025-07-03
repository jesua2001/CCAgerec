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
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
