import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-homevgpart',
  templateUrl: './homevgpart.component.html',
  standalone: true,
  imports: [
    HeaderComponent
  ]
})
export class HomevgpartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
