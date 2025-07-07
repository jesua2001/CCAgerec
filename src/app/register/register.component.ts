import { Component, OnInit } from '@angular/core';
import {IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class RegisterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
