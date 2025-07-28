import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonButton, IonContent, IonInput, IonItem, IonLabel, IonTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-anadirvgpart',
  templateUrl: './anadirvgpart.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle
  ]
})
export class AnadirvgpartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
