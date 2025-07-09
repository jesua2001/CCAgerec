import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";
import { BoxService } from "../core/servicies/box.service";
import { BoxObtener } from "../models/box.model";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultarbox',
  templateUrl: './consultarbox.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule
  ]
})
export class ConsultarboxComponent implements OnInit {

  numeroSerie: string = '';
  mensajeError: string = '';
  informationCaja: BoxObtener[] = [];

  constructor(private boxService: BoxService) {
  }

  ngOnInit() {
  }

  consultarCaja() {
    if (!this.numeroSerie.trim()) {
      this.mensajeError = 'El número de serie no puede estar vacío.';
      return;
    }

    this.boxService.getcaneth(this.numeroSerie).subscribe({
      next: (response) => {
        this.informationCaja = response;
        this.mensajeError = '';
      },
      error: () => {
        this.mensajeError = 'No se pudo obtener la IP de la caja.';
        this.informationCaja = [];
      }
    });


  }
}
