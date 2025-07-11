import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-changeaplication',
  templateUrl: './changeaplication.component.html',
  standalone: true,
  imports: [
    HeaderComponent
  ]
})
export class ChangeaplicationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
