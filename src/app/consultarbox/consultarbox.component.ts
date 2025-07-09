import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-consultarbox',
  templateUrl: './consultarbox.component.html',
  standalone: true,
  imports: [
    HeaderComponent
  ]
})
export class ConsultarboxComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
