import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonButton, IonContent, IonInput, IonItem, IonLabel} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-homevgpart',
  templateUrl: './homevgpart.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    NgForOf,
    NgIf
  ]
})
export class HomevgpartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  consultarHomevgparts() {

  }
}
